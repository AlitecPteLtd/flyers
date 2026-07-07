(function () {
  const STORAGE_PREFIX = "flyer-editor:";
  const TEMP_ATTRS = [
    "contenteditable",
    "spellcheck",
    "tabindex",
    "data-flyer-edit-id",
    "data-flyer-editor-ready",
  ];
  const EDITABLE_SELECTOR = [
    "title",
    "h1",
    "h3",
    "h4",
    "p",
    ".subtitle",
    ".section-title",
    ".benefit-title",
    ".contact",
    ".app",
    ".feature",
    ".legend div",
    ".pill",
    ".row > div",
  ].join(", ");

  const editorScript = document.querySelector("script[data-flyer-editor-script]");
  const draftVersion =
    (editorScript && editorScript.getAttribute("data-flyer-version")) ||
    document.documentElement.getAttribute("data-flyer-version") ||
    "1";
  const editorBaseUrl = editorScript ? new URL(".", editorScript.src).href : "";
  const pageKey = window.location.pathname || "flyer";
  const storageKey = STORAGE_PREFIX + pageKey + ":" + draftVersion;
  let isEditMode = false;
  let isPdfExporting = false;
  let isPngExporting = false;
  let isToolbarVisible = true;
  let toolbarNode = null;

  function injectStyles() {
    const style = document.createElement("style");
    style.setAttribute("data-flyer-editor-style", "1");
    style.textContent = `
      .flyer-editor-toolbar {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 9999;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 8px;
        align-items: center;
        max-width: calc(100vw - 36px);
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(7, 25, 79, 0.94);
        box-shadow: 0 12px 32px rgba(6, 21, 59, 0.28);
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        transition: opacity 0.15s ease, transform 0.15s ease;
      }

      .flyer-editor-toolbar.is-hidden {
        display: none;
      }

      .flyer-editor-toolbar button {
        border: 0;
        border-radius: 10px;
        padding: 8px 10px;
        background: #1f5fd6;
        color: #fff;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      }

      .flyer-editor-toolbar button:focus {
        outline: none;
      }

      .flyer-editor-toolbar button.secondary {
        background: #35507f;
      }

      .flyer-editor-toolbar button.warn {
        background: #8b2f92;
      }

      .flyer-editor-toolbar button.active {
        background: #f6aa17;
        color: #07194f;
      }

      .flyer-editor-toolbar button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .flyer-editor-toolbar button.pdf-export {
        font-size: 12px;
        padding: 8px 9px;
      }

      .flyer-editor-status {
        min-width: 148px;
        font-size: 12px;
        font-weight: 700;
        color: #d9e6ff;
      }

      .flyer-editor-editing [data-flyer-edit-id] {
        outline: 2px dashed rgba(31, 95, 214, 0.55);
        outline-offset: 3px;
        cursor: text;
      }

      .flyer-editor-editing [data-flyer-edit-id]:focus {
        outline-color: rgba(246, 170, 23, 0.95);
        background: rgba(255, 255, 255, 0.92);
      }

      @page {
        size: A4 portrait;
        margin: 0;
      }

      @media print {
        html,
        body {
          width: 210mm !important;
          height: 297mm !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          background: #fff !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .flyer-editor-toolbar {
          display: none !important;
        }

        .page {
          width: 1024px !important;
          height: 1448px !important;
          margin: 0 !important;
          box-shadow: none !important;
          transform: scale(0.775);
          transform-origin: top left;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function editableElements() {
    return Array.from(document.querySelectorAll(EDITABLE_SELECTOR))
      .filter((node) => !node.closest(".flyer-editor-toolbar"))
      .filter((node) => node.textContent.trim().length > 0 || node.tagName === "TITLE");
  }

  function tagEditables() {
    editableElements().forEach((node, index) => {
      if (!node.hasAttribute("data-flyer-edit-id")) {
        node.setAttribute("data-flyer-edit-id", String(index));
      }
      if (!node.hasAttribute("data-flyer-editor-ready")) {
        node.setAttribute("data-flyer-editor-ready", "1");
        node.setAttribute("spellcheck", "false");
      }
    });
  }

  function currentDraft() {
    const draft = {};
    editableElements().forEach((node) => {
      const id = node.getAttribute("data-flyer-edit-id");
      if (!id) return;
      draft[id] = node.tagName === "TITLE" ? node.textContent : node.innerHTML;
    });
    return draft;
  }

  function saveDraft() {
    localStorage.setItem(storageKey, JSON.stringify(currentDraft()));
    updateStatus("Draft saved");
  }

  function loadDraft() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      updateStatus("No draft");
      return;
    }
    try {
      const draft = JSON.parse(raw);
      editableElements().forEach((node) => {
        const id = node.getAttribute("data-flyer-edit-id");
        if (!id || !(id in draft)) return;
        if (node.tagName === "TITLE") {
          node.textContent = draft[id];
        } else {
          node.innerHTML = draft[id];
        }
      });
      updateStatus("Draft loaded");
    } catch (error) {
      console.error(error);
      updateStatus("Draft error");
    }
  }

  function clearDraft() {
    localStorage.removeItem(storageKey);
    updateStatus("Draft cleared");
  }

  function setEditMode(nextState) {
    isEditMode = nextState;
    document.body.classList.toggle("flyer-editor-editing", isEditMode);
    editableElements().forEach((node) => {
      if (node.tagName === "TITLE") return;
      if (isEditMode) {
        node.setAttribute("contenteditable", "true");
        node.setAttribute("tabindex", "0");
      } else {
        node.removeAttribute("contenteditable");
        node.removeAttribute("tabindex");
      }
    });
    const button = document.querySelector("[data-flyer-toggle]");
    if (button) {
      button.classList.toggle("active", isEditMode);
      button.textContent = isEditMode ? "Stop Editing" : "Edit Text";
    }
    updateStatus(isEditMode ? "Editing on" : "Editing off");
  }

  function htmlSnapshot(options) {
    const config = options || {};
    const clone = document.documentElement.cloneNode(true);
    clone.querySelectorAll(".flyer-editor-toolbar").forEach((node) => node.remove());
    clone.querySelectorAll("style[data-flyer-editor-style]").forEach((node) => node.remove());
    clone.querySelectorAll("script[data-flyer-lib]").forEach((node) => node.remove());
    if (config.removeEditorScript) {
      clone.querySelectorAll("script[data-flyer-editor-script]").forEach((node) => node.remove());
    }
    clone.querySelectorAll("*").forEach((node) => {
      TEMP_ATTRS.forEach((attr) => node.removeAttribute(attr));
      node.classList.remove("flyer-editor-editing");
    });
    if (clone.querySelector("body")) {
      clone.querySelector("body").classList.remove("flyer-editor-editing");
    }
    return "<!doctype html>\n" + clone.outerHTML;
  }

  function cleanedHtml() {
    return htmlSnapshot({ removeEditorScript: true });
  }

  function editableHtml() {
    return htmlSnapshot({ removeEditorScript: false });
  }

  function downloadHtml() {
    const blob = new Blob([cleanedHtml()], { type: "text/html;charset=utf-8" });
    downloadBlob(blob, (window.location.pathname.split("/").pop() || "index.html").replace(/\.html?$/i, "") + "-edited.html");
    updateStatus("HTML downloaded");
  }

  async function updateHtmlFile() {
    const html = editableHtml();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });

    if (!window.showSaveFilePicker) {
      downloadBlob(blob, pageName() + "-updated.html");
      updateStatus("Downloaded HTML");
      alert("Your browser cannot overwrite a file directly here. I downloaded the updated HTML instead.");
      return;
    }

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: "index.html",
        types: [
          {
            description: "HTML file",
            accept: { "text/html": [".html"] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      updateStatus("HTML updated");
    } catch (error) {
      if (error && error.name === "AbortError") {
        updateStatus("Save cancelled");
        return;
      }
      console.error(error);
      updateStatus("Save failed");
      alert("HTML file update failed. Try Download HTML instead.");
    }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 60000);
  }

  function isFileProtocol() {
    return window.location.protocol === "file:";
  }

  function absoluteUrl(url) {
    try {
      return new URL(url, window.location.href).href;
    } catch (error) {
      return url;
    }
  }

  function extractCssUrl(value) {
    const match = /url\(["']?([^"')]+)["']?\)/.exec(value || "");
    return match ? match[1] : "";
  }

  async function imageUrlToDataUrl(url) {
    if (!url || url.startsWith("data:")) {
      return url;
    }

    const absolute = absoluteUrl(url);

    if (!isFileProtocol()) {
      try {
        const response = await fetch(absolute);
        if (response.ok) {
          const blob = await response.blob();
          return await new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onload = function () {
              resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        }
      } catch (error) {
        // Fall through to image-element conversion.
      }
    }

    return new Promise(function (resolve) {
      const image = new Image();
      image.onload = function () {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth || image.width;
          canvas.height = image.naturalHeight || image.height;
          canvas.getContext("2d").drawImage(image, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } catch (error) {
          resolve(absolute);
        }
      };
      image.onerror = function () {
        resolve(absolute);
      };
      if (!isFileProtocol()) {
        image.crossOrigin = "anonymous";
      }
      image.src = absolute;
    });
  }

  function rememberCacheEntry(cache, url, dataUrl) {
    if (!url || !dataUrl) {
      return;
    }
    cache[url] = dataUrl;
    cache[absoluteUrl(url)] = dataUrl;
    try {
      const parsed = new URL(url, window.location.href);
      cache[parsed.pathname] = dataUrl;
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        cache[parts.slice(-2).join("/")] = dataUrl;
      }
      if (parts.length >= 3) {
        cache[parts.slice(-3).join("/")] = dataUrl;
      }
    } catch (error) {
      // Ignore malformed URLs.
    }
  }

  function lookupImageCache(imageCache, url) {
    if (!url) {
      return null;
    }
    if (imageCache[url]) {
      return imageCache[url];
    }
    const absolute = absoluteUrl(url);
    if (imageCache[absolute]) {
      return imageCache[absolute];
    }
    try {
      const parsed = new URL(url, window.location.href);
      if (imageCache[parsed.pathname]) {
        return imageCache[parsed.pathname];
      }
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts.length >= 2 && imageCache[parts.slice(-2).join("/")]) {
        return imageCache[parts.slice(-2).join("/")];
      }
      if (parts.length >= 3 && imageCache[parts.slice(-3).join("/")]) {
        return imageCache[parts.slice(-3).join("/")];
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  async function buildImageDataUrlCache(root) {
    const urls = new Set();

    root.querySelectorAll("img[src]").forEach(function (image) {
      const src = image.getAttribute("src");
      if (src && !src.startsWith("data:")) {
        urls.add(src);
      }
    });

    Array.from(root.querySelectorAll("*")).forEach(function (node) {
      const backgroundImage = window.getComputedStyle(node).backgroundImage;
      if (!backgroundImage || backgroundImage === "none" || backgroundImage.indexOf("url(") === -1) {
        return;
      }
      const originalUrl = extractCssUrl(backgroundImage);
      if (originalUrl && !originalUrl.startsWith("data:")) {
        urls.add(originalUrl);
      }
    });

    const cache = Object.create(null);
    await Promise.all(
      Array.from(urls).map(async function (url) {
        rememberCacheEntry(cache, url, await imageUrlToDataUrl(url));
      })
    );
    return cache;
  }

  const CAPTURE_STYLE_PROPS = [
    "background",
    "background-color",
    "background-image",
    "background-size",
    "background-position",
    "background-repeat",
    "color",
    "border",
    "border-top",
    "border-right",
    "border-bottom",
    "border-left",
    "border-radius",
    "box-shadow",
    "transform",
    "transform-origin",
    "opacity",
    "font",
    "font-size",
    "font-weight",
    "font-family",
    "line-height",
    "letter-spacing",
    "text-transform",
    "width",
    "height",
    "min-height",
    "max-width",
    "max-height",
    "position",
    "inset",
    "top",
    "right",
    "bottom",
    "left",
    "z-index",
    "display",
    "flex",
    "flex-direction",
    "align-items",
    "justify-content",
    "gap",
    "grid-template-columns",
    "padding",
    "margin",
    "overflow",
    "text-align",
    "filter",
    "-webkit-background-clip",
    "-webkit-text-fill-color",
    "box-sizing",
    "visibility",
    "clip-path",
    "mix-blend-mode",
    "isolation",
    "flex-grow",
    "flex-shrink",
    "flex-basis",
    "order",
    "white-space",
    "vertical-align",
  ];

  const PSEUDO_STYLE_PROPS = [
    "content",
    "display",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "width",
    "height",
    "margin",
    "padding",
    "background",
    "background-color",
    "background-image",
    "background-size",
    "background-position",
    "background-repeat",
    "border",
    "border-radius",
    "box-shadow",
    "opacity",
    "transform",
    "transform-origin",
    "color",
    "font",
    "font-size",
    "font-family",
    "font-weight",
    "line-height",
    "flex",
    "flex-grow",
    "flex-shrink",
    "flex-basis",
    "align-self",
    "z-index",
  ];

  function syncComputedStyles(sourceRoot, cloneRoot) {
    const sourceNodes = [sourceRoot].concat(Array.from(sourceRoot.querySelectorAll("*")));
    const cloneNodes = [cloneRoot].concat(Array.from(cloneRoot.querySelectorAll("*")));
    const limit = Math.min(sourceNodes.length, cloneNodes.length);

    for (let index = 0; index < limit; index += 1) {
      const computed = window.getComputedStyle(sourceNodes[index]);
      CAPTURE_STYLE_PROPS.forEach(function (prop) {
        const value = computed.getPropertyValue(prop);
        if (value) {
          cloneNodes[index].style.setProperty(prop, value);
        }
      });
    }
  }

  function applyImageCacheToClone(cloneRoot, imageCache) {
    cloneRoot.querySelectorAll("img[src]").forEach(function (image) {
      const src = image.getAttribute("src");
      const dataUrl = lookupImageCache(imageCache, src);
      if (dataUrl) {
        image.setAttribute("src", dataUrl);
      }
    });

    cloneRoot.querySelectorAll("*").forEach(function (node) {
      const backgroundImage = node.style.backgroundImage;
      if (!backgroundImage || backgroundImage === "none") {
        return;
      }
      const originalUrl = extractCssUrl(backgroundImage);
      const dataUrl = lookupImageCache(imageCache, originalUrl);
      if (dataUrl) {
        node.style.backgroundImage = backgroundImage.replace(originalUrl, dataUrl);
      }
    });
  }

  function replaceObjectFitImages(sourceRoot, cloneRoot, clonedDoc) {
    const sourceImages = sourceRoot.querySelectorAll("img");
    const cloneImages = cloneRoot.querySelectorAll("img");

    sourceImages.forEach(function (sourceImage, index) {
      const cloneImage = cloneImages[index];
      if (!cloneImage) {
        return;
      }

      const computed = window.getComputedStyle(sourceImage);
      const objectFit = computed.objectFit;
      if (!objectFit || objectFit === "fill") {
        return;
      }

      const replacement = clonedDoc.createElement("div");
      [
        "width",
        "height",
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "z-index",
        "display",
        "margin",
        "padding",
        "border",
        "border-radius",
        "opacity",
        "transform",
        "transform-origin",
      ].forEach(function (prop) {
        replacement.style.setProperty(prop, computed.getPropertyValue(prop));
      });

      const src = cloneImage.getAttribute("src");
      if (src) {
        replacement.style.backgroundImage = 'url("' + src + '")';
        replacement.style.backgroundSize = objectFit;
        replacement.style.backgroundPosition = computed.objectPosition || "center";
        replacement.style.backgroundRepeat = "no-repeat";
      }

      cloneImage.replaceWith(replacement);
    });
  }

  function flattenPseudoElements(sourceRoot, cloneRoot, clonedDoc) {
    const sourceNodes = [sourceRoot].concat(Array.from(sourceRoot.querySelectorAll("*")));
    const cloneNodes = [cloneRoot].concat(Array.from(cloneRoot.querySelectorAll("*")));
    const limit = Math.min(sourceNodes.length, cloneNodes.length);

    for (let index = 0; index < limit; index += 1) {
      const source = sourceNodes[index];
      const clone = cloneNodes[index];

      ["::before", "::after"].forEach(function (pseudo) {
        const style = window.getComputedStyle(source, pseudo);
        const content = style.getPropertyValue("content");
        const hasBox =
          parseFloat(style.width) > 0 ||
          parseFloat(style.height) > 0 ||
          style.getPropertyValue("background-image") !== "none" ||
          style.getPropertyValue("box-shadow") !== "none";

        if ((!content || content === "none") && !hasBox) {
          return;
        }
        if (content && content !== "none" && content !== '""' && content !== "''") {
          if (/\\f[0-9a-f]/i.test(content) || /\\[0-9a-f]{1,6}/i.test(content)) {
            return;
          }
        }

        const pseudoEl = clonedDoc.createElement("span");
        pseudoEl.setAttribute("data-flyer-flat-pseudo", pseudo.slice(2));
        pseudoEl.setAttribute("aria-hidden", "true");

        PSEUDO_STYLE_PROPS.forEach(function (prop) {
          const value = style.getPropertyValue(prop);
          if (value && value !== "none" && value !== "normal" && value !== "auto") {
            pseudoEl.style.setProperty(prop, value);
          }
        });

        pseudoEl.style.pointerEvents = "none";
        pseudoEl.style.content = "none";

        if (pseudo === "::before") {
          clone.insertBefore(pseudoEl, clone.firstChild);
        } else {
          clone.appendChild(pseudoEl);
        }
      });
    }
  }

  function rasterizeSvgElements(sourceRoot, cloneRoot, clonedDoc) {
    const sourceSvgs = Array.from(sourceRoot.querySelectorAll("svg"));
    const cloneSvgs = Array.from(cloneRoot.querySelectorAll("svg"));

    sourceSvgs.forEach(function (sourceSvg, index) {
      const cloneSvg = cloneSvgs[index];
      if (!cloneSvg) {
        return;
      }

      const computed = window.getComputedStyle(sourceSvg);
      let xml = "";
      try {
        xml = new XMLSerializer().serializeToString(cloneSvg);
      } catch (error) {
        return;
      }

      const image = clonedDoc.createElement("img");
      [
        "width",
        "height",
        "min-width",
        "min-height",
        "max-width",
        "max-height",
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "margin",
        "padding",
        "display",
        "transform",
        "transform-origin",
        "opacity",
        "z-index",
        "overflow",
      ].forEach(function (prop) {
        const value = computed.getPropertyValue(prop);
        if (value) {
          image.style.setProperty(prop, value);
        }
      });

      const rect = sourceSvg.getBoundingClientRect();
      if (!image.style.width && rect.width) {
        image.style.width = rect.width + "px";
      }
      if (!image.style.height && rect.height) {
        image.style.height = rect.height + "px";
      }

      image.setAttribute("alt", "");
      image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
      cloneSvg.replaceWith(image);
    });
  }

  function flattenLayerTree(sourceRoot, cloneRoot) {
    const sourceNodes = [sourceRoot].concat(Array.from(sourceRoot.querySelectorAll("*")));
    const cloneNodes = [cloneRoot].concat(Array.from(cloneRoot.querySelectorAll("*")));
    const limit = Math.min(sourceNodes.length, cloneNodes.length);

    for (let index = 0; index < limit; index += 1) {
      const computed = window.getComputedStyle(sourceNodes[index]);
      const clone = cloneNodes[index];
      const backgroundImage = computed.getPropertyValue("background-image");
      const hasGradient = backgroundImage && backgroundImage.indexOf("gradient") !== -1;
      const position = computed.getPropertyValue("position");

      if (hasGradient || position === "absolute" || position === "fixed") {
        clone.style.setProperty("isolation", "isolate");
      }

      if (parseFloat(computed.getPropertyValue("opacity")) < 1) {
        clone.style.setProperty("opacity", computed.getPropertyValue("opacity"));
      }
    }
  }

  function prepareCaptureClone(sourcePage, clonedDoc, clonedPage, imageCache) {
    syncComputedStyles(sourcePage, clonedPage);
    applyImageCacheToClone(clonedPage, imageCache);
    flattenPseudoElements(sourcePage, clonedPage, clonedDoc);
    rasterizeSvgElements(sourcePage, clonedPage, clonedDoc);
    flattenLayerTree(sourcePage, clonedPage);
    replaceObjectFitImages(sourcePage, clonedPage, clonedDoc);
    clonedPage.style.margin = "0";
    clonedPage.style.transform = "none";
    clonedPage.style.backgroundColor = "#ffffff";
  }

  function waitForCaptureAssets() {
    const waits = [];
    if (document.fonts && document.fonts.ready) {
      waits.push(document.fonts.ready);
    }
    Array.from(document.images).forEach(function (image) {
      if (!image.complete) {
        waits.push(
          new Promise(function (resolve) {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          })
        );
      }
    });
    return Promise.all(waits);
  }

  function getMaxCaptureScale(page, preferredScale) {
    const width = page.offsetWidth || page.scrollWidth || 1024;
    const height = page.offsetHeight || page.scrollHeight || 1448;
    const maxDimension = 4096;
    const maxArea = 16777216;
    let scale = preferredScale;
    while (
      scale > 1 &&
      (width * scale > maxDimension ||
        height * scale > maxDimension ||
        width * height * scale * scale > maxArea)
    ) {
      scale -= 1;
    }
    return Math.max(1, scale);
  }

  function getCaptureOptions(page, scale, imageCache) {
    return {
      backgroundColor: "#ffffff",
      scale: scale,
      useCORS: false,
      allowTaint: false,
      logging: false,
      imageTimeout: 20000,
      scrollX: 0,
      scrollY: 0,
      windowWidth: page.scrollWidth,
      windowHeight: page.scrollHeight,
      ignoreElements: function (node) {
        return !!node.closest && !!node.closest(".flyer-editor-toolbar");
      },
      onclone: function (clonedDoc, clonedPage) {
        prepareCaptureClone(page, clonedDoc, clonedPage, imageCache);
      },
    };
  }

  async function capturePage(page, preferredScale) {
    let scale = getMaxCaptureScale(page, preferredScale);
    let lastError = null;
    const imageCache = await buildImageDataUrlCache(page);
    const previousScrollX = window.scrollX;
    const previousScrollY = window.scrollY;

    window.scrollTo(0, 0);

    try {
      while (scale >= 1) {
        try {
          const canvas = await window.html2canvas(
            page,
            getCaptureOptions(page, scale, imageCache)
          );
          return { canvas: canvas, scale: scale };
        } catch (error) {
          lastError = error;
          scale -= 1;
        }
      }
      throw lastError || new Error("Unable to capture flyer");
    } finally {
      window.scrollTo(previousScrollX, previousScrollY);
    }
  }

  function createFlattenedCanvas(sourceCanvas) {
    const flat = document.createElement("canvas");
    flat.width = sourceCanvas.width;
    flat.height = sourceCanvas.height;
    const context = flat.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, flat.width, flat.height);
    context.drawImage(sourceCanvas, 0, 0);
    return flat;
  }

  function canvasToDataUrl(canvas) {
    try {
      return canvas.toDataURL("image/png", 1);
    } catch (error) {
      return null;
    }
  }

  async function canvasToDataUrlAsync(canvas) {
    const direct = canvasToDataUrl(canvas);
    if (direct) {
      return direct;
    }
    const blob = await canvasToPngBlob(canvas);
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function canvasToPngBlob(canvas) {
    return new Promise(function (resolve, reject) {
      if (canvas.toBlob) {
        canvas.toBlob(function (blob) {
          if (blob) {
            resolve(blob);
            return;
          }
          try {
            const dataUrl = canvas.toDataURL("image/png");
            resolve(dataUrlToBlob(dataUrl));
          } catch (error) {
            reject(error);
          }
        }, "image/png");
        return;
      }

      try {
        resolve(dataUrlToBlob(canvas.toDataURL("image/png")));
      } catch (error) {
        reject(error);
      }
    });
  }

  function dataUrlToBlob(dataUrl) {
    const parts = dataUrl.split(",");
    const mime = parts[0].match(/:(.*?);/)[1];
    const binary = atob(parts[1]);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type: mime });
  }

  const PDF_EXPORT_VARIANTS = {
    full: "full",
    clean: "clean",
    alternate: "alternate",
  };

  function getBrandingElements() {
    const page = document.querySelector(".page") || document;
    return {
      mark: page.querySelector(".mark"),
      odooWrap: page.querySelector(".odoo"),
      odooLogo: page.querySelector(".odoo-logo"),
      footer: page.querySelector(".footer"),
      divider: page.querySelector(".brand > .divider"),
    };
  }

  function snapshotBrandingElements(els) {
    const snap = {};
    if (els.mark) {
      snap.mark = {
        display: els.mark.style.display,
        src: els.mark.getAttribute("src"),
        alt: els.mark.getAttribute("alt"),
      };
    }
    if (els.odooWrap) {
      snap.odooWrap = { display: els.odooWrap.style.display };
    }
    if (els.odooLogo) {
      snap.odooLogo = {
        display: els.odooLogo.style.display,
        src: els.odooLogo.getAttribute("src"),
        alt: els.odooLogo.getAttribute("alt"),
      };
    }
    if (els.footer) {
      snap.footer = { display: els.footer.style.display, html: els.footer.innerHTML };
    }
    if (els.divider) {
      snap.divider = { display: els.divider.style.display };
    }
    return snap;
  }

  function restoreBrandingElements(els, snap) {
    if (els.mark && snap.mark) {
      els.mark.style.display = snap.mark.display;
      if (snap.mark.src) {
        els.mark.setAttribute("src", snap.mark.src);
      }
      if (snap.mark.alt) {
        els.mark.setAttribute("alt", snap.mark.alt);
      }
    }
    if (els.odooWrap && snap.odooWrap) {
      els.odooWrap.style.display = snap.odooWrap.display;
    }
    if (els.odooLogo && snap.odooLogo) {
      els.odooLogo.style.display = snap.odooLogo.display;
      if (snap.odooLogo.src) {
        els.odooLogo.setAttribute("src", snap.odooLogo.src);
      }
      if (snap.odooLogo.alt) {
        els.odooLogo.setAttribute("alt", snap.odooLogo.alt);
      }
    }
    if (els.footer && snap.footer) {
      els.footer.style.display = snap.footer.display;
      els.footer.innerHTML = snap.footer.html;
    }
    if (els.divider && snap.divider) {
      els.divider.style.display = snap.divider.display;
    }
  }

  function hideBrandingNode(node) {
    if (node) {
      node.style.setProperty("display", "none", "important");
    }
  }

  function applyCleanExportBranding(els) {
    hideBrandingNode(els.mark);
    hideBrandingNode(els.odooWrap);
    hideBrandingNode(els.odooLogo);
    hideBrandingNode(els.footer);
    hideBrandingNode(els.divider);
  }

  function getAssetsBaseFromMark(mark) {
    const src = mark.getAttribute("src") || "";
    const slash = src.lastIndexOf("/");
    return slash >= 0 ? src.slice(0, slash + 1) : "";
  }

  function escapeExportHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function parseFooterExportConfig(raw) {
    if (!raw) {
      return null;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return { contacts: parsed };
      }
      if (parsed && Array.isArray(parsed.contacts)) {
        return parsed;
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  function renderFooterExportContacts(footer, contacts) {
    footer.innerHTML = contacts
      .map(function (contact) {
        const icon =
          contact && contact.icon ? contact.icon : "fa-solid fa-circle";
        const text =
          contact && contact.text
            ? contact.text
            : typeof contact === "string"
              ? contact
              : "";
        return (
          '<div class="contact"><i class="' +
          icon +
          '"></i>' +
          escapeExportHtml(text) +
          "</div>"
        );
      })
      .join("");
  }

  function imageResourceExists(url) {
    return new Promise(function (resolve) {
      const image = new Image();
      image.onload = function () {
        resolve(true);
      };
      image.onerror = function () {
        resolve(false);
      };
      image.src = url;
    });
  }

  function waitForBrandingImage(image) {
    if (!image || image.complete) {
      return Promise.resolve();
    }
    return new Promise(function (resolve) {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    });
  }

  async function resolveExportImagePath(basePath, explicitPath, baseName) {
    if (explicitPath === "") {
      return "";
    }
    const candidates = [];
    if (explicitPath) {
      candidates.push(explicitPath);
    }
    ["png", "jpg", "jpeg", "webp", "svg"].forEach(function (ext) {
      candidates.push(basePath + baseName + "." + ext);
    });
    for (let i = 0; i < candidates.length; i += 1) {
      const candidate = candidates[i];
      const url = new URL(candidate, window.location.href).href;
      if (await imageResourceExists(url)) {
        return candidate;
      }
    }
    return null;
  }

  async function loadAlternateFooterConfig() {
    const inline =
      editorScript && editorScript.getAttribute("data-export-alt-footer");
    if (inline) {
      const parsed = parseFooterExportConfig(inline);
      if (parsed) {
        return parsed;
      }
    }
    const mark = document.querySelector(".mark");
    if (!mark) {
      return null;
    }
    const base = getAssetsBaseFromMark(mark);
    const footerUrl = new URL(
      base + "export-brand-footer.json",
      window.location.href
    ).href;
    try {
      const response = await fetch(footerUrl);
      if (response.ok) {
        return parseFooterExportConfig(await response.text());
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  async function resolveAlternateExportBranding() {
    const mark = document.querySelector(".mark");
    const base = mark ? getAssetsBaseFromMark(mark) : "";
    const altMark =
      editorScript && editorScript.getAttribute("data-export-alt-mark");
    const altOdooAttr =
      editorScript && editorScript.getAttribute("data-export-alt-odoo");
    const markPath = await resolveExportImagePath(
      base,
      altMark,
      "export-brand-mark"
    );
    let odooPath = null;
    if (altOdooAttr === "") {
      odooPath = "";
    } else if (altOdooAttr) {
      odooPath = await resolveExportImagePath(base, altOdooAttr, "export-brand-odoo");
    } else {
      odooPath = await resolveExportImagePath(base, null, "export-brand-odoo");
    }
    const footer = await loadAlternateFooterConfig();
    return {
      markPath: markPath,
      odooPath: odooPath,
      footer: footer,
    };
  }

  async function hasAlternateExportBranding() {
    const branding = await resolveAlternateExportBranding();
    return !!(
      branding.markPath ||
      (branding.footer && branding.footer.contacts && branding.footer.contacts.length)
    );
  }

  async function applyAlternateExportBranding(els, branding) {
    if (branding.markPath && els.mark) {
      els.mark.setAttribute("src", branding.markPath);
      els.mark.style.removeProperty("display");
      if (els.divider) {
        els.divider.style.removeProperty("display");
      }
      await waitForBrandingImage(els.mark);
    } else {
      hideBrandingNode(els.mark);
      hideBrandingNode(els.divider);
    }

    if (branding.odooPath === "") {
      hideBrandingNode(els.odooWrap);
    } else if (branding.odooPath && els.odooLogo) {
      els.odooLogo.setAttribute("src", branding.odooPath);
      if (els.odooWrap) {
        els.odooWrap.style.removeProperty("display");
      }
      await waitForBrandingImage(els.odooLogo);
    } else {
      hideBrandingNode(els.odooWrap);
    }

    if (branding.footer && branding.footer.contacts && els.footer) {
      renderFooterExportContacts(els.footer, branding.footer.contacts);
      els.footer.style.removeProperty("display");
    }
  }

  async function withExportBranding(variant, task) {
    if (!variant || variant === PDF_EXPORT_VARIANTS.full) {
      return task();
    }

    const els = getBrandingElements();
    const snapshot = snapshotBrandingElements(els);

    try {
      if (variant === PDF_EXPORT_VARIANTS.clean) {
        applyCleanExportBranding(els);
      } else if (variant === PDF_EXPORT_VARIANTS.alternate) {
        const branding = await resolveAlternateExportBranding();
        const hasAlternate =
          branding.markPath ||
          (branding.footer &&
            branding.footer.contacts &&
            branding.footer.contacts.length);
        if (!hasAlternate) {
          throw new Error(
            "No alternate branding found. Add export-brand-mark.png and export-brand-footer.json to the project assets folder, or set data-export-alt-mark / data-export-alt-footer on the editor script tag."
          );
        }
        await applyAlternateExportBranding(els, branding);
        await waitForCaptureAssets();
      }
      return await task();
    } finally {
      restoreBrandingElements(els, snapshot);
    }
  }

  async function withCaptureUi(task) {
    const toolbar = document.querySelector(".flyer-editor-toolbar");
    const wasEditing = isEditMode;

    try {
      if (toolbar) {
        toolbar.style.visibility = "hidden";
      }
      if (wasEditing) {
        setEditMode(false);
      }
      return await task();
    } finally {
      if (toolbar) {
        toolbar.style.visibility = "";
      }
      if (wasEditing) {
        setEditMode(true);
      }
    }
  }

  function pageName() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return parts[parts.length - 2];
    }
    return (parts.pop() || "flyer").replace(/\.html?$/i, "") || "flyer";
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const existing = document.querySelector('script[data-flyer-lib="' + src + '"]');
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        if (existing.getAttribute("data-flyer-loaded") === "1") {
          resolve();
        }
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-flyer-lib", src);
      script.addEventListener("load", function () {
        script.setAttribute("data-flyer-loaded", "1");
        resolve();
      }, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function loadScriptWithFallback(primarySrc, fallbackSrc) {
    return loadScript(primarySrc).catch(function () {
      return loadScript(fallbackSrc);
    });
  }

  const HTML2CANVAS_CDN =
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  const HTML_TO_IMAGE_CDN =
    "https://cdn.jsdelivr.net/npm/html-to-image@1.11.13/dist/html-to-image.min.js";
  const JSPDF_CDN =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

  function ensurePdfTools() {
    if (window.htmlToImage && window.jspdf && window.jspdf.jsPDF) {
      return Promise.resolve();
    }
    const localImage = editorBaseUrl
      ? new URL("vendor/html-to-image.min.js", editorBaseUrl).href
      : HTML_TO_IMAGE_CDN;
    const localPdf = editorBaseUrl
      ? new URL("vendor/jspdf.umd.min.js", editorBaseUrl).href
      : JSPDF_CDN;
    return loadScriptWithFallback(localImage, HTML_TO_IMAGE_CDN).then(function () {
      return loadScriptWithFallback(localPdf, JSPDF_CDN);
    });
  }

  function ensureHtmlToImageTool() {
    if (window.htmlToImage) {
      return Promise.resolve();
    }
    const localImage = editorBaseUrl
      ? new URL("vendor/html-to-image.min.js", editorBaseUrl).href
      : HTML_TO_IMAGE_CDN;
    return loadScriptWithFallback(localImage, HTML_TO_IMAGE_CDN);
  }

  function ensureCanvasTool() {
    if (window.html2canvas) {
      return Promise.resolve();
    }
    const localCanvas = editorBaseUrl
      ? new URL("vendor/html2canvas.min.js", editorBaseUrl).href
      : HTML2CANVAS_CDN;
    return loadScriptWithFallback(localCanvas, HTML2CANVAS_CDN);
  }

  function openPrintPdf() {
    const toolbar = document.querySelector(".flyer-editor-toolbar");
    const wasEditing = isEditMode;

    if (wasEditing) {
      setEditMode(false);
    }
    if (toolbar) {
      toolbar.style.visibility = "hidden";
    }

    const restore = function () {
      if (toolbar) {
        toolbar.style.visibility = "";
      }
      if (wasEditing) {
        setEditMode(true);
      }
      window.removeEventListener("afterprint", restore);
    };

    window.addEventListener("afterprint", restore);
    window.print();
    window.setTimeout(restore, 1200);
  }

  async function capturePageAsDataUrl(page, preferredScale) {
    return await window.htmlToImage.toPng(page, {
      backgroundColor: "#ffffff",
      cacheBust: true,
      pixelRatio: preferredScale,
      width: page.offsetWidth || page.scrollWidth,
      height: page.offsetHeight || page.scrollHeight,
      style: {
        margin: "0",
        transform: "none",
      },
      filter: function (node) {
        return !(node.closest && node.closest(".flyer-editor-toolbar"));
      },
    });
  }

  async function capturePageAsDataUrlWithFallback(page, preferredScale, exportVariant) {
    const variant = exportVariant || PDF_EXPORT_VARIANTS.full;
    const captureTask = async function () {
      try {
        await ensureHtmlToImageTool();
        return await capturePageAsDataUrl(page, preferredScale);
      } catch (htmlToImageError) {
        console.warn("html-to-image export failed; falling back to html2canvas.", htmlToImageError);
        await ensureCanvasTool();
        const capture = await capturePage(page, Math.ceil(preferredScale));
        return await canvasToDataUrlAsync(createFlattenedCanvas(capture.canvas));
      }
    };

    return await withCaptureUi(function () {
      return withExportBranding(variant, captureTask);
    });
  }

  async function downloadPdfWithVariant(exportVariant, filenameSuffix, statusLabel) {
    if (isPdfExporting) return;
    isPdfExporting = true;
    updateStatus(statusLabel || "Preparing PDF");

    try {
      await ensurePdfTools();
      await waitForCaptureAssets();

      const page = document.querySelector(".page") || document.body;
      const imageData = await capturePageAsDataUrlWithFallback(page, 2.5, exportVariant);
      if (!imageData) {
        throw new Error("Unable to flatten flyer image for PDF export");
      }

      const jsPDF = window.jspdf.jsPDF;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
        compress: true,
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imageData, "PNG", 0, 0, pageWidth, pageHeight, undefined, "SLOW");
      const pdfBlob = pdf.output("blob");
      downloadBlob(pdfBlob, pageName() + filenameSuffix + ".pdf");
      updateStatus("PDF downloaded");
    } catch (error) {
      console.error(error);
      updateStatus("PDF failed");
      alert(
        "PDF export failed. Refresh the page and try again.\n\n" +
          (error && error.message ? error.message : error)
      );
    } finally {
      isPdfExporting = false;
    }
  }

  async function downloadPrintPng() {
    if (isPngExporting) return;
    isPngExporting = true;
    updateStatus("Preparing PNG");

    try {
      await ensureHtmlToImageTool();
      await waitForCaptureAssets();

      const page = document.querySelector(".page") || document.body;
      const imageData = await capturePageAsDataUrlWithFallback(page, 3);
      downloadBlob(dataUrlToBlob(imageData), pageName() + "-print-3x.png");
      updateStatus("PNG downloaded");
    } catch (error) {
      console.error(error);
      updateStatus("PNG failed");
      const hint = isFileProtocol()
        ? "Open the flyer through a local web server instead of double-clicking the HTML file."
        : "Refresh the page and try again.";
      alert("Print PNG export failed. " + hint + "\n\n" + (error && error.message ? error.message : error));
    } finally {
      isPngExporting = false;
    }
  }

  function copyHtml() {
    navigator.clipboard.writeText(cleanedHtml()).then(
      function () {
        updateStatus("HTML copied");
      },
      function () {
        updateStatus("Copy failed");
      }
    );
  }

  let statusNode;
  function updateStatus(text) {
    if (statusNode) statusNode.textContent = text;
  }

  function setToolbarVisible(nextState) {
    isToolbarVisible = nextState;
    if (toolbarNode) {
      toolbarNode.classList.toggle("is-hidden", !isToolbarVisible);
    }
    if (!isToolbarVisible && isEditMode) {
      setEditMode(false);
    }
  }

  function toggleToolbarVisible() {
    setToolbarVisible(!isToolbarVisible);
    if (isToolbarVisible) {
      updateStatus("Toolbar shown · ESC to hide");
    }
  }

  async function refreshAlternatePdfButton(toolbar) {
    const button = toolbar.querySelector("[data-flyer-pdf-alt]");
    if (!button) {
      return;
    }
    const hasAlternate = await hasAlternateExportBranding();
    button.disabled = !hasAlternate;
    button.title = hasAlternate
      ? "Download PDF with alternate logo and footer from project assets"
      : "Add export-brand-mark.png and export-brand-footer.json to the project assets folder, or set data-export-alt-mark / data-export-alt-footer on the editor script tag.";
  }

  function bindToolbarShortcuts() {
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }
      if (isEditMode) {
        setEditMode(false);
        updateStatus("Editing off");
        event.preventDefault();
        return;
      }
      toggleToolbarVisible();
      event.preventDefault();
    });
  }

  function buildToolbar() {
    const toolbar = document.createElement("div");
    toolbar.className = "flyer-editor-toolbar";
    toolbar.innerHTML = `
      <div class="flyer-editor-status">Ready</div>
      <button type="button" tabindex="-1" data-flyer-toggle>Edit Text</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-save>Save Draft</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-load>Load Draft</button>
      <button type="button" tabindex="-1" class="secondary pdf-export" data-flyer-pdf-full title="Download PDF with Alitec logo, Odoo logo, and footer">PDF (Alitec)</button>
      <button type="button" tabindex="-1" class="secondary pdf-export" data-flyer-pdf-clean title="Hide Alitec logo, Odoo logo, and footer contacts">PDF (Clean)</button>
      <button type="button" tabindex="-1" class="secondary pdf-export" data-flyer-pdf-alt title="Use alternate logo and footer from project assets">PDF (Alt Brand)</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-png>Download Print PNG</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-update-html>Update HTML File</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-download>Download HTML</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-copy>Copy HTML</button>
      <button type="button" tabindex="-1" class="warn" data-flyer-clear>Clear Draft</button>
    `;
    toolbar.setAttribute("tabindex", "-1");
    document.body.appendChild(toolbar);
    toolbarNode = toolbar;

    statusNode = toolbar.querySelector(".flyer-editor-status");

    toolbar.querySelector("[data-flyer-toggle]").addEventListener("click", function () {
      setEditMode(!isEditMode);
    });
    toolbar.querySelector("[data-flyer-save]").addEventListener("click", saveDraft);
    toolbar.querySelector("[data-flyer-load]").addEventListener("click", loadDraft);
    toolbar.querySelector("[data-flyer-pdf-full]").addEventListener("click", function () {
      downloadPdfWithVariant(PDF_EXPORT_VARIANTS.full, "-a4-alitec", "Preparing Alitec PDF");
    });
    toolbar.querySelector("[data-flyer-pdf-clean]").addEventListener("click", function () {
      downloadPdfWithVariant(PDF_EXPORT_VARIANTS.clean, "-a4-clean", "Preparing clean PDF");
    });
    toolbar
      .querySelector("[data-flyer-pdf-alt]")
      .addEventListener("click", function () {
        downloadPdfWithVariant(
          PDF_EXPORT_VARIANTS.alternate,
          "-a4-alt-brand",
          "Preparing alt-brand PDF"
        );
      });
    refreshAlternatePdfButton(toolbar);
    toolbar.querySelector("[data-flyer-png]").addEventListener("click", downloadPrintPng);
    toolbar.querySelector("[data-flyer-update-html]").addEventListener("click", updateHtmlFile);
    toolbar.querySelector("[data-flyer-download]").addEventListener("click", downloadHtml);
    toolbar.querySelector("[data-flyer-copy]").addEventListener("click", copyHtml);
    toolbar.querySelector("[data-flyer-clear]").addEventListener("click", clearDraft);
  }

  function init() {
    document.querySelectorAll(".flyer-editor-toolbar-hint").forEach(function (node) {
      node.remove();
    });
    injectStyles();
    tagEditables();
    buildToolbar();
    bindToolbarShortcuts();
    loadDraft();
    setEditMode(false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
