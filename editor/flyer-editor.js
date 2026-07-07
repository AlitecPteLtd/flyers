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

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .flyer-editor-toolbar {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 9999;
        display: flex;
        gap: 8px;
        align-items: center;
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
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
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

  function ensurePdfTools() {
    if (window.html2canvas && window.jspdf && window.jspdf.jsPDF) {
      return Promise.resolve();
    }
    if (!editorBaseUrl) {
      return Promise.reject(new Error("Editor base URL unavailable"));
    }
    return loadScript(new URL("vendor/html2canvas.min.js", editorBaseUrl).href)
      .then(function () {
        return loadScript(new URL("vendor/jspdf.umd.min.js", editorBaseUrl).href);
      });
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
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const page = document.querySelector(".page") || document.body;
      const toolbar = document.querySelector(".flyer-editor-toolbar");
      const wasEditing = isEditMode;
      let canvas;

      try {
        if (toolbar) {
          toolbar.style.visibility = "hidden";
        }
        if (wasEditing) {
          setEditMode(false);
        }

        canvas = await window.html2canvas(page, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: false,
          ignoreElements: function (node) {
            return !!node.closest && !!node.closest(".flyer-editor-toolbar");
          },
        });
      } finally {
        if (toolbar) {
          toolbar.style.visibility = "";
        }
        if (wasEditing) {
          setEditMode(true);
        }
      }

      const imageData = canvas.toDataURL("image/png", 1);
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
      <button type="button" data-flyer-toggle>Edit Text</button>
      <button type="button" class="secondary" data-flyer-save>Save Draft</button>
      <button type="button" class="secondary" data-flyer-load>Load Draft</button>
      <button type="button" class="secondary" data-flyer-pdf>Download A4 PDF</button>
      <button type="button" class="secondary" data-flyer-download>Download HTML</button>
      <button type="button" class="secondary" data-flyer-copy>Copy HTML</button>
      <button type="button" class="warn" data-flyer-clear>Clear Draft</button>
    `;
    document.body.appendChild(toolbar);

    statusNode = toolbar.querySelector(".flyer-editor-status");

    toolbar.querySelector("[data-flyer-toggle]").addEventListener("click", function () {
      setEditMode(!isEditMode);
    });
    toolbar.querySelector("[data-flyer-save]").addEventListener("click", saveDraft);
    toolbar.querySelector("[data-flyer-load]").addEventListener("click", loadDraft);
    toolbar.querySelector("[data-flyer-pdf]").addEventListener("click", downloadPdf);
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
