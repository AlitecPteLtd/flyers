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

  function injectStyles() {
    const style = document.createElement("style");
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

      .flyer-editor-status {
        min-width: 78px;
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
          height: 1536px !important;
          margin: 0 !important;
          box-shadow: none !important;
          transform: scale(0.775, 0.731);
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

  function cleanedHtml() {
    const clone = document.documentElement.cloneNode(true);
    clone.querySelectorAll(".flyer-editor-toolbar").forEach((node) => node.remove());
    clone.querySelectorAll("script[data-flyer-editor-script]").forEach((node) => node.remove());
    clone.querySelectorAll("*").forEach((node) => {
      TEMP_ATTRS.forEach((attr) => node.removeAttribute(attr));
      node.classList.remove("flyer-editor-editing");
    });
    if (clone.querySelector("body")) {
      clone.querySelector("body").classList.remove("flyer-editor-editing");
    }
    return "<!doctype html>\n" + clone.outerHTML;
  }

  function downloadHtml() {
    const blob = new Blob([cleanedHtml()], { type: "text/html;charset=utf-8" });
    downloadBlob(blob, (window.location.pathname.split("/").pop() || "index.html").replace(/\.html?$/i, "") + "-edited.html");
    updateStatus("HTML downloaded");
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

  function prepareCaptureClone(sourcePage, clonedDoc, clonedPage, imageCache) {
    syncComputedStyles(sourcePage, clonedPage);
    applyImageCacheToClone(clonedPage, imageCache);
    replaceObjectFitImages(sourcePage, clonedPage, clonedDoc);
    clonedPage.style.margin = "0";
    clonedPage.style.transform = "none";
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
    const height = page.offsetHeight || page.scrollHeight || 1536;
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
  const JSPDF_CDN =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

  function ensurePdfTools() {
    if (window.html2canvas && window.jspdf && window.jspdf.jsPDF) {
      return Promise.resolve();
    }
    const localCanvas = editorBaseUrl
      ? new URL("vendor/html2canvas.min.js", editorBaseUrl).href
      : HTML2CANVAS_CDN;
    const localPdf = editorBaseUrl
      ? new URL("vendor/jspdf.umd.min.js", editorBaseUrl).href
      : JSPDF_CDN;
    return loadScriptWithFallback(localCanvas, HTML2CANVAS_CDN).then(function () {
      return loadScriptWithFallback(localPdf, JSPDF_CDN);
    });
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

  async function downloadPdf() {
    if (isPdfExporting) return;
    isPdfExporting = true;
    updateStatus("Preparing PDF");

    try {
      await ensurePdfTools();
      await waitForCaptureAssets();

      const page = document.querySelector(".page") || document.body;
      const capture = await withCaptureUi(function () {
        return capturePage(page, 2);
      });

      const imageData = capture.canvas.toDataURL("image/png", 1);
      const jsPDF = window.jspdf.jsPDF;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
        compress: true,
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imageData, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST");
      const pdfBlob = pdf.output("blob");
      downloadBlob(pdfBlob, pageName() + "-a4.pdf");
      updateStatus("PDF downloaded");
    } catch (error) {
      console.error(error);
      updateStatus("Opening print");
      openPrintPdf();
    } finally {
      isPdfExporting = false;
    }
  }

  async function downloadPrintPng() {
    if (isPngExporting) return;
    isPngExporting = true;
    updateStatus("Preparing PNG");

    try {
      await ensureCanvasTool();
      await waitForCaptureAssets();

      const page = document.querySelector(".page") || document.body;
      const capture = await withCaptureUi(function () {
        return capturePage(page, 3);
      });
      const blob = await canvasToPngBlob(capture.canvas);
      downloadBlob(blob, pageName() + "-print-" + capture.scale + "x.png");
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

  function buildToolbar() {
    const toolbar = document.createElement("div");
    toolbar.className = "flyer-editor-toolbar";
    toolbar.innerHTML = `
      <div class="flyer-editor-status">Ready</div>
      <button type="button" tabindex="-1" data-flyer-toggle>Edit Text</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-save>Save Draft</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-load>Load Draft</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-pdf>Download A4 PDF</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-png>Download Print PNG</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-download>Download HTML</button>
      <button type="button" tabindex="-1" class="secondary" data-flyer-copy>Copy HTML</button>
      <button type="button" tabindex="-1" class="warn" data-flyer-clear>Clear Draft</button>
    `;
    toolbar.setAttribute("tabindex", "-1");
    document.body.appendChild(toolbar);

    statusNode = toolbar.querySelector(".flyer-editor-status");

    toolbar.querySelector("[data-flyer-toggle]").addEventListener("click", function () {
      setEditMode(!isEditMode);
    });
    toolbar.querySelector("[data-flyer-save]").addEventListener("click", saveDraft);
    toolbar.querySelector("[data-flyer-load]").addEventListener("click", loadDraft);
    toolbar.querySelector("[data-flyer-pdf]").addEventListener("click", downloadPdf);
    toolbar.querySelector("[data-flyer-png]").addEventListener("click", downloadPrintPng);
    toolbar.querySelector("[data-flyer-download]").addEventListener("click", downloadHtml);
    toolbar.querySelector("[data-flyer-copy]").addEventListener("click", copyHtml);
    toolbar.querySelector("[data-flyer-clear]").addEventListener("click", clearDraft);
  }

  function init() {
    injectStyles();
    tagEditables();
    buildToolbar();
    loadDraft();
    setEditMode(false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
