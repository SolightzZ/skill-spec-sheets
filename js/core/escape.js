/* Escape HTML text for renderer strings. */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};

  NS.esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
})();
