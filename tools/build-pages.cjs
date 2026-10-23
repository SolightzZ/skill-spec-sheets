#!/usr/bin/env node
"use strict";

/*
 * Build the static docs pages from shared HTML components and per-page data.
 *
 * Usage:
 *   node tools/build-pages.cjs
 *   node tools/build-pages.cjs --check
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const COMPONENTS = path.join(ROOT, "components");
const TEMPLATES = path.join(COMPONENTS, "docs");
const PAGES = path.join(COMPONENTS, "pages");
const APPS = path.join(ROOT, "apps");

const read = (file) => fs.readFileSync(file, "utf8");
const readTemplate = (name) => read(path.join(TEMPLATES, name)).trimEnd();
const readPageFile = (dir, name) => {
  const file = path.join(dir, name);
  return fs.existsSync(file) ? read(file).trimEnd() : "";
};

const templates = {
  page: readTemplate("page.html"),
  head: readTemplate("head.html"),
  masthead: readTemplate("masthead.html"),
  rail: readTemplate("rail.html"),
  results: readTemplate("results.html"),
  detail: readTemplate("detail.html"),
  footer: readTemplate("footer.html"),
  scripts: readTemplate("scripts.html"),
};

function render(template, vars) {
  return template.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (match, key) => {
    if (!Object.prototype.hasOwnProperty.call(vars, key)) {
      throw new Error(`No value for ${match}`);
    }
    return String(vars[key]);
  });
}

function indent(block, spaces) {
  const pad = " ".repeat(spaces);
  return block.split(/\r?\n/).map((line) => (line ? pad + line : line)).join("\n");
}

function slot(dir, name, spaces) {
  const block = readPageFile(dir, name);
  return block ? "\n" + indent(block, spaces) + "\n" : "";
}

function renderStamp(stamp) {
  return stamp.map((item) => `    <div><dt>${item.label}</dt><dd>${item.value}</dd></div>`).join("\n");
}

function pageData(dir) {
  const data = JSON.parse(read(path.join(dir, "data.json")));
  for (const key of ["stem", "title", "description", "masthead", "rail", "index", "detail", "footer", "noscript"]) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) {
      throw new Error(`${dir}/data.json is missing "${key}"`);
    }
  }
  // Security (security_best_practices_report.md F-04): the stem drives both the
  // output filename and the body class, so restrict it to a safe identifier and
  // keep it in sync with the folder name (single source of truth).
  const folder = path.basename(dir);
  if (data.stem !== folder || !/^[A-Za-z][A-Za-z0-9-]*$/.test(data.stem)) {
    throw new Error(`${dir}/data.json has an invalid stem ${JSON.stringify(data.stem)} (must match the folder name)`);
  }
  return data;
}

function buildPage(dir) {
  const data = pageData(dir);
  const bodyClass = `page-${data.stem}`;

  const head = render(templates.head, {
    title: data.title,
    description: data.description,
    stem: data.stem,
  });

  const masthead = render(templates.masthead, {
    mastheadTitle: data.masthead.title,
    mastheadLede: data.masthead.lede,
    stamp: renderStamp(data.masthead.stamp),
  });

  const rail = render(templates.rail, {
    railAriaLabel: data.rail.ariaLabel,
    railLabel: data.rail.label,
    railPlaceholder: data.rail.placeholder,
    railExtra: slot(dir, "rail-extra.html", 4),
    status: data.rail.status,
    install: slot(dir, "install.html", 4),
  });

  const results = render(templates.results, {
    indexAriaLabel: data.index.ariaLabel,
    srTitle: data.index.srTitle,
    empty: data.index.empty,
    signals: slot(dir, "signals.html", 4),
  });

  const detail = render(templates.detail, {
    detailAriaLabel: data.detail.ariaLabel,
  });

  const footer = render(templates.footer, {
    footerNote: data.footer.note,
    footerMeta: data.footer.meta || "",
    footerSource: data.footer.source,
  });

  return render(templates.page, {
    head,
    bodyClass,
    stem: data.stem,
    masthead,
    rail,
    results,
    detail,
    footer,
    noscript: data.noscript,
    scripts: templates.scripts,
  });
}

function main() {
  const check = process.argv.includes("--check");
  const dirs = fs.readdirSync(PAGES).map((name) => path.join(PAGES, name))
    .filter((dir) => fs.statSync(dir).isDirectory()).sort();

  if (!dirs.length) throw new Error("No page components found");

  const changed = [];
  fs.mkdirSync(APPS, { recursive: true });
  for (const dir of dirs) {
    const data = pageData(dir);
    const out = path.join(APPS, `${data.stem}.html`);
    const html = buildPage(dir);
    if (/\{\{[^}]+\}\}/.test(html)) throw new Error(`Unresolved placeholder in ${out}`);

    if (check) {
      const current = fs.existsSync(out) ? read(out) : "";
      if (current !== html) changed.push(data.stem);
    } else {
      fs.writeFileSync(out, html, "utf8");
    }
  }

  if (check) {
    if (changed.length) {
      console.error("Out of date: " + changed.join(", "));
      process.exitCode = 1;
    } else {
      console.log(`OK: ${dirs.length} pages match components`);
    }
  } else {
    console.log(`Built ${dirs.length} pages from components`);
  }
}

main();
