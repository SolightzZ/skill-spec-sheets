#!/usr/bin/env node
"use strict";

/*
 * Minify every .js file of a staged site directory in place.
 *
 * This is a deploy-artifact step only: run it against a copy of the site
 * (e.g. CI's _dist), never against the working tree, so the hand-editable
 * sources in js/ stay readable. The repo has no committed build outputs by
 * design; see PERF.md for the measured wire-size numbers.
 *
 * Usage: node tools/minify-dist.cjs <dir>
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const root = process.argv[2];
if (!root) {
  console.error("Usage: node tools/minify-dist.cjs <dir>");
  process.exit(1);
}
if (path.resolve(root) === path.resolve(process.cwd())) {
  // Guard the "artifact only" contract: refuse the working tree itself.
  console.error("Refusing to minify the working tree in place; pass a staged copy (e.g. _dist).");
  process.exit(1);
}

const out = path.join(os.tmpdir(), `minify-dist-${process.pid}.js`);
let saved = 0;
let total = 0;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      walk(file);
      continue;
    }
    if (!name.endsWith(".js")) continue;
    total += 1;
    execFileSync("npx", ["--yes", "esbuild", file, "--minify", "--charset=utf8",
      "--legal-comments=none", `--outfile=${out}`], { stdio: "pipe", shell: true });
    const minified = fs.readFileSync(out, "utf8");
    const before = fs.statSync(file).size;
    fs.writeFileSync(file, minified, "utf8");
    saved += before - fs.statSync(file).size;
    console.log(`${path.relative(root, file)}: ${before} -> ${fs.statSync(file).size} bytes`);
  }
}

walk(root);
fs.rmSync(out, { force: true });
console.log(`Done: ${total} files, ${saved} bytes saved before gzip.`);
