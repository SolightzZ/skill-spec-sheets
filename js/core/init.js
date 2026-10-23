/* Shared search, filter, list, hash routing, and doc reader engine. */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};
  var esc = NS.esc;

  function init(config) {
    var list = document.getElementById("list");
    var detail = document.getElementById("detail");
    var search = document.getElementById("search");

    if (!config || !list || !detail || !search) return;
    if (document.body.getAttribute("data-docs-init") === "1") return;
    document.body.setAttribute("data-docs-init", "1");

    var filters = document.getElementById("filters") || document.querySelector(".filters");
    var filtersBy = config.secondary ? document.getElementById(config.secondary.el) : null;
    var flow = document.getElementById("flow");
    var status = document.getElementById("status");
    var empty = document.getElementById("empty");
    var data = config.data;
    var idKey = config.idKey || "id";
    var itemIndex = Object.create(null);
    var categoryCounts = Object.create(null);
    data.forEach(function (item) {
      itemIndex[String(item[idKey])] = item;
      categoryCounts[item.cat] = (categoryCounts[item.cat] || 0) + 1;
    });
    var match = config.match || NS.doc.match;
    var row = config.row || function (item, pressed) { return NS.doc.row(item, config, pressed); };
    var renderDoc = config.detail || function (item) { return NS.doc.render(item, config); };
    var state = { q: "", cat: "all", by: "all", selected: null };
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var baseTitle = document.title;

    function flowSteps() {
      if (config.flow && config.flow.length) return config.flow;
      var seen = {};
      var steps = [{ id: "all", label: "ทั้งหมด" }];
      data.forEach(function (item) {
        if (!item.cat || seen[item.cat]) return;
        seen[item.cat] = true;
        steps.push({
          id: item.cat,
          label: (config.catLabel && config.catLabel[item.cat]) || item.cat
        });
      });
      return steps;
    }

    function readHash() {
      var raw = window.location.hash.replace(/^#/, "");
      if (!raw) return;
      var params = new URLSearchParams(raw);
      var cat = params.get("cat");
      var item = params.get("item");
      if (cat && (config.filters === "none" || data.some(function (x) { return x.cat === cat; }))) state.cat = cat;
      if (item && itemById(item)) state.selected = item;
    }

    function writeHash() {
      var params = new URLSearchParams();
      if (state.cat !== "all") params.set("cat", state.cat);
      if (state.selected) params.set("item", state.selected);
      var hash = params.toString();
      history.replaceState(null, "", hash ? "#" + hash : window.location.pathname + window.location.search);
    }

    function resetSearch() {
      search.value = "";
      state.q = "";
    }

    function renderFlow() {
      if (!flow) return;
      var steps = flowSteps();
      flow.innerHTML = steps.map(function (step, index) {
        var count = step.id === "all" ? data.length : (categoryCounts[step.id] || 0);
        var selected = itemById(state.selected);
        var current = step.id === "all" ? state.cat === "all" : selected ? selected.cat === step.id : state.cat === step.id;
        var number = step.id === "all" ? "" : index;
        return '<button type="button" class="flow-step' + (step.id === "all" ? ' flow-step-all' : '') + '" data-flow-cat="' + esc(step.id) + '" aria-pressed="' + current + '">' +
          '<span class="flow-step-number">' + number + '</span><span>' + esc(step.label) + '</span><small>' + count + '</small></button>';
      }).join("");
    }

    function itemById(id) {
      return itemIndex[String(id)];
    }

    function visible() {
      var q = state.q.trim().toLowerCase();
      var terms = q ? q.split(/\s+/).filter(Boolean) : [];

      return data.filter(function (item) {
        if (state.cat !== "all" && item.cat !== state.cat) return false;
        if (config.secondary && state.by !== "all" && item[config.secondary.key] !== state.by) return false;
        if (!q) return true;
        return match(item, q, terms);
      });
    }

    function renderFilters() {
      if (config.filters !== "dynamic" || !filters || !config.cats) return;

      filters.innerHTML = config.cats.map(function (cat) {
        var count = cat.id === "all" ? data.length : data.filter(function (item) {
          return item.cat === cat.id;
        }).length;
        var pressed = state.cat === cat.id;
        return '<button class="chip" type="button" data-cat="' + esc(cat.id) + '" aria-pressed="' + pressed + '">' +
          esc(cat.label) + '<span class="n">' + count + "</span></button>";
      }).join("");
    }

    function syncFilters() {
      if (!filters) return;
      var chips = filters.querySelectorAll(".chip");
      for (var i = 0; i < chips.length; i++) {
        chips[i].setAttribute("aria-pressed", String(chips[i].getAttribute("data-cat") === state.cat));
      }
    }

    function syncSecondary() {
      if (!filtersBy) return;
      var chips = filtersBy.querySelectorAll(".chip");
      for (var i = 0; i < chips.length; i++) {
        chips[i].setAttribute("aria-pressed", String(chips[i].getAttribute(config.secondary.attr) === state.by));
      }
    }

    function renderList() {
      var rows = visible();
      list.innerHTML = rows.map(function (item) {
        return row(item, String(state.selected) === String(item[idKey]));
      }).join("");

      if (empty) empty.hidden = rows.length !== 0;
      if (status) {
        var activeChip = filters && filters.querySelector('[data-cat="' + CSS.escape(state.cat) + '"]');
        var activeStep = flowSteps().filter(function (step) { return step.id === state.cat; })[0];
        var activeLabel = activeChip ? activeChip.childNodes[0].textContent.trim() : activeStep ? activeStep.label : "ทั้งหมด";
        status.textContent = activeLabel + " · " + rows.length + " จาก " + data.length + " " + config.unit;
      }
    }

    function renderDetail() {
      var item = itemById(state.selected);

      if (!item) {
        detail.classList.remove("is-active");
        detail.innerHTML = config.emptyDetail ||
          '<div class="detail-empty"><strong>เริ่มจากเส้นทางงาน</strong>เลือกขั้นงานหรือค้นหาชื่อ เพื่ออ่านภาพรวม วิธีใช้ และตัวอย่าง</div>' +
          (config.prompt
            ? '<div class="detail-suggestion"><button type="button" class="doc-copy" data-copy data-prompt="' + esc(config.prompt) + '" aria-label="คัดลอก prompt แนะนำ">' + esc(config.prompt) + "</button></div>"
            : "");
        document.title = baseTitle;
        return;
      }

      detail.classList.add("is-active");
      detail.innerHTML = renderDoc(item);
      document.title = (item.name || item[idKey]) + " — " + baseTitle;
    }

    function open(id) {
      var item = itemById(id);
      if (!item) return;
      state.selected = item[idKey];
      writeHash();
      renderFlow();
      renderList();
      renderDetail();

      var title = detail.querySelector("#doc-title");
      if (title) title.focus({ preventScroll: true });

      if (window.matchMedia("(max-width: 1199px)").matches) {
        detail.scrollIntoView({ block: "start", behavior: reduceMotion.matches ? "auto" : "smooth" });
      }
    }

    function close() {
      if (!state.selected) return;
      state.selected = null;
      writeHash();
      renderList();
      renderDetail();
      search.focus({ preventScroll: true });
    }

    function select(id) {
      if (String(state.selected) === String(id)) {
        close();
      } else {
        open(id);
      }
    }

    list.addEventListener("click", function (e) {
      var btn = e.target.closest(".row");
      if (btn) select(btn.getAttribute("data-id"));
    });

    search.addEventListener("input", function () {
      state.q = search.value;
      renderList();
    });

    search.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        search.value = "";
        state.q = "";
        renderList();
      }
    });

    if (config.filters !== "none" && filters) {
      filters.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (!chip) return;
        state.cat = chip.getAttribute("data-cat");
        state.selected = null;
        writeHash();
        renderFlow();
        syncFilters();
        renderList();
      });
    }

    if (flow) {
      flow.addEventListener("click", function (e) {
        var button = e.target.closest("[data-flow-cat]");
        if (!button) return;
        state.cat = button.getAttribute("data-flow-cat");
        state.selected = null;
        resetSearch();
        writeHash();
        renderFlow();
        syncFilters();
        renderList();
        search.focus({ preventScroll: true });
      });
    }

    if (config.secondary && filtersBy) {
      filtersBy.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (!chip) return;
        state.by = chip.getAttribute(config.secondary.attr);
        syncSecondary();
        renderList();
      });
    }

    detail.addEventListener("click", function (e) {
      var copy = e.target.closest("[data-copy]");
      var flowButton = e.target.closest("[data-flow-cat]");
      if (flowButton) {
        state.cat = flowButton.getAttribute("data-flow-cat");
        var first = data.filter(function (candidate) { return candidate.cat === state.cat; })[0];
        state.selected = first ? first[idKey] : null;
        resetSearch();
        writeHash();
        renderFlow();
        syncFilters();
        renderList();
        renderDetail();
        return;
      }
      if (!copy) return;
      var text = copy.getAttribute("data-prompt");
      if (!text) {
        var block = copy.closest(".doc-code") || copy.closest(".doc-example");
        var source = block && block.querySelector("code, .doc-prompt");
        if (!source) return;
        text = source.textContent;
      }

      function done() {
        var old = copy.textContent;
        copy.textContent = "คัดลอกแล้ว";
        copy.classList.add("is-copied");
        window.setTimeout(function () {
          copy.textContent = old;
          copy.classList.remove("is-copied");
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }

      function fallback() {
        var area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); done(); } catch (err) { copy.textContent = "คัดลอกไม่ได้"; }
        document.body.removeChild(area);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && state.selected) close();
    });

    window.addEventListener("hashchange", function () {
      state.cat = "all";
      state.selected = null;
      readHash();
      renderFlow();
      syncFilters();
      renderList();
      renderDetail();
    });

    readHash();
    if (config.filters === "dynamic") renderFilters();
    renderFlow();
    syncFilters();
    renderList();
    renderDetail();
  }

  NS.init = init;
})();
