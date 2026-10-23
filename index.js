/* JS entry. Classic scripts keep the site working from file://. */
(function () {
  "use strict";

  var PAGE_FILES = {
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

  var page = document.body.getAttribute("data-page");
  if (!page || !Object.prototype.hasOwnProperty.call(PAGE_FILES, page)) return;

  var entry = document.currentScript || document.querySelector('script[src$="index.js"]');
  var base = new URL("./", entry && entry.src ? entry.src : document.baseURI);
  var sources = [
    new URL("js/core/escape.js", base).href,
    new URL("js/core/render.js", base).href,
    new URL("js/core/init.js", base).href,
    new URL(PAGE_FILES[page], base).href
  ];
  var index = 0;

  function next() {
    if (index >= sources.length) {
      var NS = window.DocsIndex;
      if (NS && NS.init && NS.pages && NS.pages[page]) NS.init(NS.pages[page]);
      return;
    }

    var src = sources[index++];
    var script = document.createElement("script");
    script.src = src;
    // Download dependencies in parallel while preserving execution order.
    script.async = false;
    script.onload = next;
    script.onerror = function () {
      console.error("[docs] failed to load " + src);
    };
    document.head.appendChild(script);
  }

  next();
})();
