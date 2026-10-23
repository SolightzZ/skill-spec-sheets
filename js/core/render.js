/* Shared doc renderer: rows, search haystack, and long-form item pages. */
(function () {
  "use strict";
  const NS = window.DocsIndex = window.DocsIndex || {};
  const esc = NS.esc;
  const haystackCache = typeof WeakMap === "function" ? new WeakMap() : null;

  const TYPE_LABEL = {
    skill: "สกิล",
    command: "คำสั่ง",
    cli: "CLI",
    server: "MCP server",
    agent: "เอเจนต์",
    concept: "แนวคิด",
    rule: "กฎ"
  };

  function inline(text) {
    return esc(text).replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function list(items, className) {
    if (!items || !items.length) return "";
    return '<ul class="' + className + '">' + items.map(function (item) {
      return "<li>" + inline(item) + "</li>";
    }).join("") + "</ul>";
  }

  function copyButton(label) {
    return '<button class="doc-copy" type="button" data-copy aria-label="คัดลอก' +
      (label ? " " + esc(label) : "") + '">คัดลอก</button>';
  }

  function codeBlock(code, label) {
    return '<div class="doc-code">' +
      '<div class="doc-code-bar"><span>' + esc(label || "command") + "</span>" + copyButton(label) + "</div>" +
      "<pre><code>" + esc(code) + "</code></pre>" +
      "</div>";
  }

  function invokeBlock(entry) {
    return '<div class="doc-invoke">' +
      (entry.label ? '<p class="doc-invoke-label">' + inline(entry.label) + "</p>" : "") +
      codeBlock(entry.code, entry.language || "shell") +
      (entry.note ? '<p class="doc-note">' + inline(entry.note) + "</p>" : "") +
      "</div>";
  }

  function exampleBlock(example, index) {
    return '<li class="doc-example">' +
      '<div class="doc-example-head"><span class="doc-example-n">ตัวอย่าง ' + (index + 1) + "</span>" +
      (example.title ? "<h4>" + inline(example.title) + "</h4>" : "") + "</div>" +
      '<p class="doc-prompt">' + inline(example.prompt) + "</p>" +
      copyButton("prompt") +
      (example.result ? '<p class="doc-note"><strong>ผลที่ควรได้</strong> ' + inline(example.result) + "</p>" : "") +
      "</li>";
  }

  function refList(refs) {
    const links = (refs || []).map(function (ref) {
      return '<li><a href="' + esc(ref.href) + '" target="_blank" rel="noreferrer">' +
        inline(ref.label) + "</a></li>";
    });
    if (!links.length) return "";
    return '<ul class="doc-refs">' + links.join("") + "</ul>";
  }

  function flowSteps(config) {
    if (config.flow && config.flow.length) return config.flow;
    const seen = {};
    const steps = [{ id: "all", label: "ทั้งหมด" }];
    (config.data || []).forEach(function (item) {
      if (!item.cat || seen[item.cat]) return;
      seen[item.cat] = true;
      steps.push({
        id: item.cat,
        label: (config.catLabel && config.catLabel[item.cat]) || item.cat
      });
    });
    return steps;
  }

  function flowLine(item, config) {
    const steps = flowSteps(config).filter(function (step) { return step.id !== "all"; });
    const index = steps.findIndex(function (step) { return step.id === item.cat; });
    if (index === -1) return "";
    return '<nav class="doc-flow" aria-label="ตำแหน่งในเส้นทางงาน">' +
      '<span class="doc-flow-position">ขั้น ' + (index + 1) + '/' + steps.length + ' · ' + esc(steps[index].label) + '</span></nav>';
  }

  function render(item, config) {
    const catLabel = (config.catLabel && config.catLabel[item.cat]) || item.cat || "";
    const typeLabel = TYPE_LABEL[item.type] || item.type || "";
    const parts = [];

    // For meta skills, only show the meta badge, not the generic "สกิล" badge
    const showTypeLabel = typeLabel && !catLabel;
    const showCatLabel = catLabel;

    parts.push('<article class="doc" aria-labelledby="doc-title">');
    parts.push('<header class="doc-head">');
    parts.push('<p class="doc-kicker">' +
      (showTypeLabel ? '<span class="doc-type" data-type="' + esc(item.type || "") + '">' + esc(typeLabel) + "</span>" : "") +
      (showCatLabel ? '<span class="doc-cat" data-cat="' + esc(item.cat || "") + '">' + esc(catLabel) + "</span>" : "") + "</p>");
    parts.push('<h2 id="doc-title" tabindex="-1">' + esc(item.name || item.id) + "</h2>");
    const flow = flowLine(item, config);
    if (flow) parts.push(flow);
    parts.push("</header>");

    if (item.overview) {
      parts.push('<section class="doc-section"><h3>ภาพรวม</h3><p>' + inline(item.overview) + "</p></section>");
    }

    if (item.prerequisites && item.prerequisites.length) {
      parts.push('<section class="doc-section"><h3>สิ่งที่ต้องเตรียม</h3>' +
        list(item.prerequisites, "doc-list") + "</section>");
    }

    if (item.invoke && item.invoke.length) {
      parts.push('<section class="doc-section"><h3>วิธีใช้</h3>' +
        item.invoke.map(invokeBlock).join("") + "</section>");
    }

    if (item.examples && item.examples.length) {
      parts.push('<section class="doc-section"><h3>ตัวอย่าง prompt</h3>' +
        '<ol class="doc-examples">' + item.examples.map(exampleBlock).join("") + "</ol></section>");
    }

    if (item.cautions && item.cautions.length) {
      parts.push('<section class="doc-section doc-section-caution"><h3>ข้อควรระวัง</h3>' +
        list(item.cautions, "doc-list") + "</section>");
    }

    const refs = refList(item.refs);
    if (refs) {
      parts.push('<section class="doc-section"><h3>ที่มา</h3>' + refs + "</section>");
    }

    parts.push("</article>");
    return parts.join("");
  }

  function row(item, config, pressed) {
    const catLabel = (config.catLabel && config.catLabel[item.cat]) || item.cat || "";
    const typeLabel = TYPE_LABEL[item.type] || "";
    // For meta skills, only show the meta badge, not the generic "สกิล" badge
    const showTypeLabel = typeLabel && !catLabel;
    const showCatLabel = catLabel;
    const tagParts = [];
    if (showTypeLabel) tagParts.push(typeLabel);
    if (showCatLabel) tagParts.push(catLabel);
    const tag = tagParts.join(" · ");
    const id = item[config.idKey || "id"];
    return "<li><button class=\"row\" type=\"button\" data-id=\"" + esc(id) +
      "\" data-cat=\"" + esc(item.cat || "") + "\" aria-pressed=\"" + (pressed ? "true" : "false") +
      "\"><span class=\"name\">" + esc(item.name || id) + "</span>" +
      (tag ? "<span class=\"tag\">" + esc(tag) + "</span>" : "") +
      "<span class=\"desc\">" + esc(item.summary || "") + "</span></button></li>";
  }

  function haystack(item) {
    if (haystackCache && haystackCache.has(item)) return haystackCache.get(item);
    const parts = [item.id, item.name, item.summary, item.overview, item.cat, item.type,
      item.sourcePath, item.source];
    (item.prerequisites || []).forEach(function (x) { parts.push(x); });
    (item.invoke || []).forEach(function (x) { parts.push(x.label, x.code, x.note); });
    (item.examples || []).forEach(function (x) { parts.push(x.title, x.prompt, x.result); });
    (item.cautions || []).forEach(function (x) { parts.push(x); });
    (item.refs || []).forEach(function (x) { parts.push(x.label, x.href); });
    const value = parts.filter(Boolean).join(" ").toLowerCase();
    if (haystackCache) haystackCache.set(item, value);
    return value;
  }

  function match(item, q, terms) {
    const hay = haystack(item);
    if (terms && terms.length) {
      return terms.every(function (term) { return hay.indexOf(term) !== -1; });
    }
    return hay.indexOf(q) !== -1;
  }

  NS.doc = {
    render: render,
    row: row,
    match: match,
    typeLabel: TYPE_LABEL
  };
})();
