#!/usr/bin/env node
"use strict";

/*
 * Validate every docs page module against DOC-SCHEMA.md and its data.json.
 *
 * Usage:
 *   node tools/check-docs.cjs
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const PAGES = path.join(ROOT, "js", "pages");
const DATA = path.join(ROOT, "components", "pages");
const REPOS = process.env.DOCS_SOURCE_ROOT ? path.resolve(process.env.DOCS_SOURCE_ROOT) : path.resolve(ROOT, "..");

const REPO_DIR = {
  "agent-skills-docs": "agent-skills",
  "andrej-karpathy-skills-docs": "andrej-karpathy-skills",
  "caveman-docs": "caveman",
  "graphify-docs": "graphify",
  "impeccable-docs": "impeccable",
  "matt-pocock-docs": "skills",
  "Model-Context-Protocol-servers-docs": "servers",
  "ponytail-docs": "ponytail",
  "security-audit-skill-docs": "security-audit-skill",
  "superpowers-docs": "superpowers",
  "taste-skill-docs": "taste-skill",
  "ui-ux-pro-max-skill-docs": "ui-ux-pro-max-skill"
};

const TYPES = new Set(["skill", "command", "cli", "server", "agent", "concept", "rule"]);
const CAN_INVOKE = new Set(["skill", "command", "cli", "server", "agent"]);

const sandbox = { window: { DocsIndex: {} } };
vm.createContext(sandbox);
for (const file of ["js/core/escape.js", "js/core/render.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
}

const errors = [];
const warnings = [];
const missingSources = new Set();

function fail(page, message) {
  errors.push(page + ": " + message);
}

/*
 * Source-path checks need the upstream clones next to this repo. When a clone is
 * absent (fresh checkout in CI) the check is skipped with one warning per repo
 * instead of failing on every item. Set DOCS_SOURCE_ROOT to check a different tree.
 */
function sourcePathExists(stem, file) {
  const dir = REPO_DIR[stem];
  if (!dir) return true;

  const base = path.join(REPOS, dir);
  if (!fs.existsSync(base)) {
    if (!missingSources.has(dir)) {
      missingSources.add(dir);
      warnings.push("source clone not found: " + base +
        " — path checks for " + dir + " skipped (set DOCS_SOURCE_ROOT to point at the clones)");
    }
    return true;
  }

  return fs.existsSync(path.join(base, file));
}

const pageStems = [];

for (const file of fs.readdirSync(PAGES).filter((name) => name.endsWith(".js")).sort()) {
  const stem = file.replace(/\.js$/, "");
  pageStems.push(stem);
  const source = fs.readFileSync(path.join(PAGES, file), "utf8");
  const pageSandbox = { window: { DocsIndex: { esc: sandbox.window.DocsIndex.esc, doc: sandbox.window.DocsIndex.doc } } };
  vm.createContext(pageSandbox);
  try {
    vm.runInContext(source, pageSandbox, { filename: file });
  } catch (error) {
    fail(stem, "cannot load module: " + error.message);
    continue;
  }

  const config = pageSandbox.window.DocsIndex.pages[stem];
  if (!config) {
    fail(stem, "does not register DocsIndex.pages[\"" + stem + "\"]");
    continue;
  }
  if (!Array.isArray(config.data) || !config.data.length) {
    fail(stem, "data is empty");
    continue;
  }

  const ids = new Set();
  const cats = {};
  for (const item of config.data) {
    const id = item.id;
    if (!id) {
      fail(stem, "item without id: " + (item.name || "?"));
      continue;
    }
    if (ids.has(id)) fail(stem, "duplicate id " + id);
    ids.add(id);

    for (const key of ["cat", "type", "name", "summary", "overview", "sourcePath"]) {
      if (!item[key]) fail(stem + "#" + id, "missing " + key);
    }
    if (!TYPES.has(item.type)) fail(stem + "#" + id, "unknown type " + item.type);
    if (CAN_INVOKE.has(item.type)) {
      if (!item.invoke || !item.invoke.length) fail(stem + "#" + id, "invokable item without invoke");
      if (!item.examples || item.examples.length !== 3) {
        fail(stem + "#" + id, "expected 3 examples, got " + ((item.examples && item.examples.length) || 0));
      }
    }
    (item.examples || []).forEach((example, index) => {
      for (const key of ["title", "prompt"]) {
        if (!example[key]) fail(stem + "#" + id, "example " + (index + 1) + " missing " + key);
      }
    });
    (item.refs || []).forEach((ref) => {
      if (!/^https:\/\//.test(ref.href || "")) {
        fail(stem + "#" + id, "ref is not an https URL: " + ref.href);
        return;
      }
      const repoDir = REPO_DIR[stem];
      const blob = /^https:\/\/github\.com\/[^/]+\/[^/]+\/(?:blob|tree)\/[^/]+\/(.+)$/.exec((ref.href || "").split("#")[0]);
      if (repoDir && blob) {
        const rel = decodeURIComponent(blob[1]);
        if (!sourcePathExists(stem, rel)) {
          fail(stem + "#" + id, "ref path not found in " + repoDir + ": " + rel);
        }
      }
    });

    const repoDir = REPO_DIR[stem];
    if (repoDir && item.sourcePath && !sourcePathExists(stem, item.sourcePath)) {
      fail(stem + "#" + id, "sourcePath not found in " + repoDir + ": " + item.sourcePath);
    }

    if (config.filters === "static" && !(item.cat in (config.catLabel || {}))) {
      fail(stem + "#" + id, "cat without catLabel: " + item.cat);
    }
    cats[item.cat] = (cats[item.cat] || 0) + 1;

    try {
      const html = sandbox.window.DocsIndex.doc.render(item, config);
      if (html.indexOf("undefined") !== -1) fail(stem + "#" + id, "rendered output contains undefined");
    } catch (error) {
      fail(stem + "#" + id, "render failed: " + error.message);
    }
  }

  const dataFile = path.join(DATA, stem, "data.json");
  if (!fs.existsSync(dataFile)) {
    fail(stem, "missing data.json");
    continue;
  }
  let data;
  try {
    data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  } catch (error) {
    fail(stem, "data.json is invalid JSON: " + error.message);
    continue;
  }
  if (data.stem !== stem) fail(stem, "data.json stem is " + data.stem);

  const filtersMode = (data.rail && data.rail.filters && data.rail.filters.mode) || "none";
  if (filtersMode !== config.filters) {
    fail(stem, "data.json filters.mode is " + filtersMode + ", page module filters is " + config.filters);
  }

  const chips = (data.rail && data.rail.filters && data.rail.filters.chips) || [];
  if (config.filters === "static") {
    if (!chips.length) fail(stem, "static filters but no chips in data.json");
    chips.forEach((chip) => {
      const actual = chip.cat === "all" ? config.data.length : (cats[chip.cat] || 0);
      if (chip.count !== actual) {
        fail(stem, "chip " + chip.cat + " says " + chip.count + ", data has " + actual);
      }
    });
    const known = new Set(chips.filter((chip) => chip.cat !== "all").map((chip) => chip.cat));
    Object.keys(cats).forEach((cat) => {
      if (!known.has(cat)) fail(stem, "cat " + cat + " has no chip");
    });
  }

  const statusMatch = /แสดง\s+(\d+)\s+จาก\s+(\d+)/.exec((data.rail && data.rail.status) || "");
  if (statusMatch && Number(statusMatch[2]) !== config.data.length) {
    fail(stem, "status total is " + statusMatch[2] + ", data has " + config.data.length);
  }

  const noscriptMatch = /(\d+)/.exec(data.noscript || "");
  if (noscriptMatch && Number(noscriptMatch[1]) !== config.data.length) {
    fail(stem, "noscript count is " + noscriptMatch[1] + ", data has " + config.data.length);
  }

  console.log(stem + ": " + config.data.length + " items, " +
    Object.keys(cats).sort().map((cat) => cat + "=" + cats[cat]).join(" "));
}

/*
 * The loader in index.js is the only thing that wires a page module into a
 * page, so a module that is not registered (or registered under a wrong stem)
 * would silently never load.
 */
const loader = fs.readFileSync(path.join(ROOT, "index.js"), "utf8");
const registered = new Map();
for (const match of loader.matchAll(/"([^"]+)":\s*"\.\/js\/pages\/([^"]+)\.js"/g)) {
  registered.set(match[1], match[2]);
}

for (const [stem, file] of registered) {
  if (stem !== file) fail("index.js", "PAGE_FILES maps " + stem + " to " + file + ".js");
  if (!pageStems.includes(stem)) fail("index.js", "PAGE_FILES lists " + stem + " but js/pages/" + stem + ".js was not found");
}
for (const stem of pageStems) {
  if (!registered.has(stem)) fail("index.js", "PAGE_FILES is missing " + stem);
}
for (const dir of fs.readdirSync(DATA).filter((name) => fs.statSync(path.join(DATA, name)).isDirectory())) {
  if (!pageStems.includes(dir)) fail("components/pages", dir + " has no matching js/pages/" + dir + ".js");
}

if (warnings.length) {
  console.warn("\nWarnings:");
  warnings.forEach((warning) => console.warn("- " + warning));
}
if (errors.length) {
  console.error("\n" + errors.length + " error(s):");
  errors.forEach((error) => console.error("- " + error));
  process.exitCode = 1;
} else {
  console.log("\nOK: all docs pages match the schema, counts, and source paths");
}
