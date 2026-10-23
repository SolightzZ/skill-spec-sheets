/* Shared search, filter, list, hash routing, and doc reader engine. */
(function () {
  "use strict";
  const NS = window.DocsIndex = window.DocsIndex || {};
  const esc = NS.esc;

  function init(config) {
    const list = document.getElementById("list");
    const detail = document.getElementById("detail");
    const search = document.getElementById("search");

    if (!config || !list || !detail || !search) return;
    if (document.body.getAttribute("data-docs-init") === "1") return;
    document.body.setAttribute("data-docs-init", "1");

    const flow = document.getElementById("flow");
    const status = document.getElementById("status");
    const empty = document.getElementById("empty");
    const data = config.data;
    const idKey = config.idKey || "id";
    const itemIndex = Object.create(null);
    const categoryCounts = Object.create(null);
    data.forEach(function (item) {
      itemIndex[String(item[idKey])] = item;
      categoryCounts[item.cat] = (categoryCounts[item.cat] || 0) + 1;
    });
    const match = config.match || NS.doc.match;
    const row = config.row || function (item, pressed) { return NS.doc.row(item, config, pressed); };
    const renderDoc = config.detail || function (item) { return NS.doc.render(item, config); };
    const state = { q: "", cat: "all", selected: null };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const baseTitle = document.title;

    function flowSteps() {
      if (config.flow && config.flow.length) return config.flow;
      const seen = {};
      const steps = [{ id: "all", label: "ทั้งหมด" }];
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
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) return;
      const params = new URLSearchParams(raw);
      const cat = params.get("cat");
      const item = params.get("item");
      if (cat && data.some(function (x) { return x.cat === cat; })) state.cat = cat;
      if (item && itemById(item)) state.selected = item;
    }

    function writeHash() {
      const params = new URLSearchParams();
      if (state.cat !== "all") params.set("cat", state.cat);
      if (state.selected) params.set("item", state.selected);
      const hash = params.toString();
      history.replaceState(null, "", hash ? "#" + hash : window.location.pathname + window.location.search);
    }

    function resetSearch() {
      search.value = "";
      state.q = "";
    }

    function renderFlow() {
      if (!flow) return;
      const steps = flowSteps();
      flow.innerHTML = steps.map(function (step, index) {
        const count = step.id === "all" ? data.length : (categoryCounts[step.id] || 0);
        const selected = itemById(state.selected);
        const current = step.id === "all" ? state.cat === "all" : selected ? selected.cat === step.id : state.cat === step.id;
        const number = step.id === "all" ? "" : index;
        return '<button type="button" class="flow-step' + (step.id === "all" ? ' flow-step-all' : '') + '" data-flow-cat="' + esc(step.id) + '" aria-pressed="' + current + '">' +
          '<span class="flow-step-number">' + number + '</span><span>' + esc(step.label) + '</span><small>' + count + '</small></button>';
      }).join("");
    }

    function itemById(id) {
      return itemIndex[String(id)];
    }

    function visible() {
      const q = state.q.trim().toLowerCase();
      const terms = q ? q.split(/\s+/).filter(Boolean) : [];

      return data.filter(function (item) {
        if (state.cat !== "all" && item.cat !== state.cat) return false;
        if (!q) return true;
        return match(item, q, terms);
      });
    }

    function renderList() {
      const rows = visible();
      list.innerHTML = rows.map(function (item) {
        return row(item, String(state.selected) === String(item[idKey]));
      }).join("");

      if (empty) empty.hidden = rows.length !== 0;
      if (status) {
        const activeStep = flowSteps().filter(function (step) { return step.id === state.cat; })[0];
        const activeLabel = activeStep ? activeStep.label : "ทั้งหมด";
        status.textContent = activeLabel + " · " + rows.length + " จาก " + data.length + " " + config.unit;
      }
    }

    function renderDetail() {
      const item = itemById(state.selected);

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
      const item = itemById(id);
      if (!item) return;
      state.selected = item[idKey];
      writeHash();
      renderFlow();
      renderList();
      renderDetail();

      const title = detail.querySelector("#doc-title");
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
      const btn = e.target.closest(".row");
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

    if (flow) {
      flow.addEventListener("click", function (e) {
        const button = e.target.closest("[data-flow-cat]");
        if (!button) return;
        state.cat = button.getAttribute("data-flow-cat");
        state.selected = null;
        resetSearch();
        writeHash();
        renderFlow();
        renderList();
        search.focus({ preventScroll: true });
      });
    }

    detail.addEventListener("click", function (e) {
      const copy = e.target.closest("[data-copy]");
      const flowButton = e.target.closest("[data-flow-cat]");
      if (flowButton) {
        state.cat = flowButton.getAttribute("data-flow-cat");
        const first = data.filter(function (candidate) { return candidate.cat === state.cat; })[0];
        state.selected = first ? first[idKey] : null;
        resetSearch();
        writeHash();
        renderFlow();
        renderList();
        renderDetail();
        return;
      }
      if (!copy) return;
      let text = copy.getAttribute("data-prompt");
      if (!text) {
        const block = copy.closest(".doc-code") || copy.closest(".doc-example");
        const source = block && block.querySelector("code, .doc-prompt");
        if (!source) return;
        text = source.textContent;
      }

      function done() {
        const old = copy.textContent;
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
        const area = document.createElement("textarea");
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
      renderList();
      renderDetail();
    });

    readHash();
    renderFlow();
    renderList();
    renderDetail();

    [list, detail, flow].forEach(function (el) {
      el.removeAttribute("aria-busy");
    });
  }

  NS.init = init;
})();
