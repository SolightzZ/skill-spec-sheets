/* Escape HTML text for renderer strings. */
(function () {
  "use strict";
  const NS = window.DocsIndex = window.DocsIndex || {};

  /* Security (security-best-practices JS-XSS-001): escape `'` as well, so item
     values stay safe inside single-quoted attributes if one is ever added. */
  NS.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
})();
