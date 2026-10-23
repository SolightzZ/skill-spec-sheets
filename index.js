/* JS entry. Classic scripts keep the site working from file://. */
(function () {
  "use strict";

  const PAGE_FILES = {
    "Model-Context-Protocol-servers-docs": "./js/pages/Model-Context-Protocol-servers-docs.js",
    "agent-skills-docs": "./js/pages/agent-skills-docs.js",
    "andrej-karpathy-skills-docs": "./js/pages/andrej-karpathy-skills-docs.js",
    "caveman-docs": "./js/pages/caveman-docs.js",
    "graphify-docs": "./js/pages/graphify-docs.js",
    "impeccable-docs": "./js/pages/impeccable-docs.js",
    "matt-pocock-docs": "./js/pages/matt-pocock-docs.js",
    "ponytail-docs": "./js/pages/ponytail-docs.js",
    "security-audit-skill-docs": "./js/pages/security-audit-skill-docs.js",
    "superpowers-docs": "./js/pages/superpowers-docs.js",
    "taste-skill-docs": "./js/pages/taste-skill-docs.js",
    "ui-ux-pro-max-skill-docs": "./js/pages/ui-ux-pro-max-skill-docs.js"
  };

  const page = document.body.getAttribute("data-page");
  if (!page || !Object.prototype.hasOwnProperty.call(PAGE_FILES, page)) return;

  const entry = document.currentScript || document.querySelector('script[src$="index.js"]');
  const base = new URL("./", entry && entry.src ? entry.src : document.baseURI);
  const sources = [
    new URL("js/core/escape.js", base).href,
    new URL("js/core/render.js", base).href,
    new URL("js/core/init.js", base).href,
    new URL(PAGE_FILES[page], base).href
  ];

  // Performance: create all four elements up front so the browser discovers
  // every dependency in the first pass and downloads them in parallel;
  // "async" false still runs classic scripts in insertion order, so the
  // init cascade (escape -> render -> init -> page) is unchanged.
  // Init runs on the page module's onload: load fires after execution, and
  // DOMContentLoaded is not reliable here (dynamic scripts do not block it).
  sources.forEach(function (src, i) {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    if (i === sources.length - 1) {
      script.onload = function () {
        const NS = window.DocsIndex;
        if (NS && NS.init && NS.pages && NS.pages[page]) NS.init(NS.pages[page]);
      };
    }
    script.onerror = function () {
      console.error("[docs] failed to load " + src);
    };
    document.head.appendChild(script);
  });
})();
