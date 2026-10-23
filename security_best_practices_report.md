# รายงานรีวิว Security Best Practices — 0-src-web-skill-docs

> ผู้ตรวจ: agent (security-best-practices skill, reference: `javascript-general-web-frontend-security.md`)
> วันที่: 2026-10-23 · Scope: โค้ดทั้ง repo นี้เท่านั้น (ไม่รวม sibling clones เช่น `../servers`)

## Executive summary

เว็บนี้เป็น static site (HTML/CSS + vanilla JS แบบ classic script, เปิดผ่าน `file://` หรือ serve ธรรมดา) ไม่มี backend, ไม่มี dependency, ไม่มี user input ที่สร้างเนื้อหา — เนื้อหาทั้งหมด author เองใน repo จึงพบ **ไม่มีช่องโหว่ระดับ Critical หรือ High** จุดที่ต้องแก้เป็นเรื่อง hardening เป็นหลัก: ยังไม่มี CSP เลย, ตัว escape ของ renderer ไม่ escape single quote (ปัจจุบันยังปลอดภัยเพราะทุก attribute ใช้ double quote), ตัว build เขียนไฟล์ตาม `stem` จาก data โดยไม่ validate, และ GitHub Actions pin ด้วย major tag ไม่ใช่ SHA

สิ่งที่ตรวจแล้วปลอดภัยตาม spec อยู่แล้ว (ดูหัวข้อ "ผ่าน" ด้านล่าง): ทุก sink `innerHTML` ผ่าน `esc()`/`inline()` ครบ, ไม่มี `eval`/`document.write`/`postMessage`/storage/inline script/third-party script, ทุก anchor `target="_blank"` มี `rel="noreferrer"`, ไม่พบ secret/api key ในไฟล์ที่ถูก track

---

## สรุป stack

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html`, `apps/*.html` (12 หน้า) | Static pages, script/style external ทั้งหมด, `defer` |
| `js/core/escape.js`, `render.js`, `init.js` + `index.js` loader | Renderer และ engine, vanilla ES5 |
| `js/pages/*.js` (12 modules) | data-only module ตาม `DOC-SCHEMA.md` |
| `tools/build-pages.cjs`, `check-docs.cjs` | Node CJS build/validate (local, no deps) |
| `.github/workflows/main.yml` | CI validate only |

เนื้อหามีสามระดับความน่าเชื่อถือ: (1) ค่าคงที่ในเทมเพลต — น่าเชื่อถือ, (2) ข้อมูล author ใน repo (module/data.json) — ต้อง commit ถึงเปลี่ยนได้, (3) ค่าจาก `location.hash` — เป็นสิ่งเดียวที่ attacker ควบคุมได้โดยตรงใน runtime และตรวจแล้วถูกใช้ผ่าน `itemById()`/cat allowlist เท่านั้น ไม่เข้า HTML sink

---

## Medium

### F-01 · ไม่มี CSP ทั้ง header และ meta (JS-CSP-001)

- **Location:** ตรวจ `index.html` + `apps/*.html` ทั้ง 12 หน้า — ไม่มี `<meta http-equiv="Content-Security-Policy">` ที่ไหนเลย; ไม่มี repo file หรือ config ใดที่ตั้ง header (เตือนตาม spec: runtime edge ไม่เห็นจาก repo — ต้องยืนยันที่ตัว host จริงด้วย)
- **Evidence:** `apps/agent-skills-docs.html:1-10` (head มีแค่ title/description/stylesheet) และหน้าอื่นทุกไฟล์แบบเดียวกัน
- **Impact:** renderer ทั้งหมดสร้าง HTML ด้วย string concatenation (`init.js:75,102,119,129` → `js/core/render.js`) ถ้าวันหนึ่งมีการเติม field ใหม่แล้วลืม escape หรือ author เผลอใส่ HTML ลงใน data จะไม่มี backstop กันการรันโค้ดในเบราว์เซอร์ผู้อ่านเลย ส่วนปัจจุบันไม่มี third-party script/asset เลย จึงเขียน CSP แบบ allowlist เข้มได้ทันทีโดยไม่พังฟังก์ชันเดิม
- **Fix:** เพิ่ม CSP แบบ meta หลัง `<meta charset>` ใน `components/docs/head.html` ให้ทุกหน้า:
  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'">
  ```
  ต้อง test ก่อนกับ runtime จริงทั้ง `file://` และ hosting เพราะ `'self'` ภายใต้ `file://` อาจไม่ตรงทุก browser — ถ้าทำให้ `file://` พัง ให้เสิร์ฟเวอร์ผ่าน header เมื่อ host เท่านั้น (meta-TOCTOU อ่อนกว่า header ตาม spec §3.1) และห้ามใช้ `unsafe-inline` เป็นทางแก้ — ให้แก้ F-06 ก่อนไม่งั้น style จะถูกบล็อก
- **Location สำหรับร่วมด้วย:** `components/docs/head.html` (template ที่ทุกหน้าใช้)

---

## Low

### F-02 · `esc()` ไม่ escape `'` (JS-XSS-001 — hardening gap)

- **Location:** `js/core/escape.js:6-10`
- **Evidence:** `return String(s).replace(/[&<>"]/g, ...)` — ครอบคลุม `& < > "` แต่ไม่มี `'`
- **Impact:** ปัจจุบันปลอดภัยเพราะทุก attribute ที่ interpolate ค่า item ใช้ double quote (เช่น `render.js:61` `href="`, `render.js:154` `data-id="`, `init.js:119` `data-prompt="`) แต่ถ้ามีการเพิ่ม attribute ที่เปิดด้วย `'` ค่าจาก item จะแหก context ทันที ใช้ช่องนี้แบบ defense-in-depth
- **Fix:** เพิ่ม `'` : `&#39;` เข้าใน map เดียวกัน (เป็น one-line, ไม่มีผลต่อการ render ข้อความไทย/number entities ที่มีอยู่)

### F-03 · `href` ไม่ได้ validate scheme ตอน render (JS-URL-002 · false-positive-prone, ปัจจุบัน informational)

- **Location:** `js/core/render.js:59-66` (`refList`), ค่าใน `js/pages/*.js` (`ref()` คือ `REPO + "/blob/main/" + path`)
- **Evidence:** `return '<li><a href="' + esc(ref.href) + ...` — esc กัน HTML injection แต่ไม่กัน scheme แปลก (เช่น `javascript:`)
- **Impact:** คุณมีเกณฑ์กันอยู่แล้วที่ checker: `tools/check-docs.cjs:124-138` fail ถ้า ref ไม่ใช่ `https://` และ checker ผ่านทั้งหมดล่าสุด — ผู้ใช้ทั่วไปไม่มีทางแก้ data นี้ได้ เหลือแค่ภัยจาก PR ที่เติม link แปลก จึงเป็น defense-in-depth เท่านั้น
- **Fix (ถ้าต้องการเข้มขึ้น):** ใน `refList` ตรวจด้วย `!/^https:\/\//.test(ref.href || "")` → ถ้าไม่ผ่านให้ render เป็น plain text แทน (หรือพิมพ์ `console.error` ระบุให้ชัดว่าเกิดกับ case ไหน)

### F-04 · `build-pages.cjs` เขียนไฟล์ตาม `stem` จาก data.json โดยไม่ validate (Local tool)

- **Location:** `tools/build-pages.cjs:158-160`
- **Evidence:** `const out = path.join(APPS, \`${data.stem}.html\`);` — `data.stem` มาจาก `components/pages/*/data.json`
- **Impact:** ถ้า data.json มี `stem: "../evil"` จะเขียนไฟล์ออกนอก `apps/` ในเครื่องที่รัน (attacker ต้องเป็นคนอยู่ใน repo ได้ก่อน จึงไม่เรียกเป็นช่องโหว่จริง) และ เทมเพลต `page.html` ยังใช้ stem เป็น `bodyClass` (`page-` + stem) ด้วย
- **Fix:** validate stem ครั้งเดียวใน `pageData()`: `if (!/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(data.stem)) throw ...`
  เพิ่มเติม: อีกทางคือให้ derive stem จากชื่อ folder แทน data.json เพื่อ single source of truth

### F-05 · GitHub Actions pin ด้วย major tag (Supply chain)

- **Location:** `.github/workflows/main.yml:26` (`actions/checkout@v4`) , line 29 (`actions/setup-node@v4`)
- **Evidence:** mutable tag — เจ้าของ action ขยับ tag ได้แต่ตัว workflow ยังรับ
- **Impact:** workflow นี้อ่านแค่ repo + ไม่มี secret ใด ๆ เมื่อเทียบกับช่องโหว่จาก mutable tag ความเสียหายจริงจำกัดมาก จึงวางไว้ที่ Low ไม่ถึง Medium
- **Fix:** pin เป็น commit SHA เต็มแล้วอัปเดตผ่าน PR (หรืออย่างน้อยสร้าง `.github/dependabot.yml` ให้เตรียมอัปเดตให้อัตโนมัติ)

---

## Informational

### F-06 · `<noscript>` ใช้ inline `style="..."` (12 ไฟล์) — จะโดน CSP แบบเข้มบล็อก

- **Location:** `apps/agent-skills-docs.html:76`, `caveman-docs.html:72` ฯลฯ (ทุกหน้ามี pattern เดียวกัน)
- **Evidence:** `<p style="padding:24px">หน้านี้ต้องใช้ JavaScript…</p>`
- **Impact:** inline `style="..."` นี้จะถูก CSP จาก F-01 บล็อก เพราะ `style-src-attr` default-block และ spec ห้ามปลดล็อกด้วย `unsafe-inline` และขัดกับ declaration ของ repo เอง (`PRODUCT.md`: "ไม่มี inline `<style>` block หรือ inline `<script>`")
- **Fix:** เพิ่ม class เช่น `.noscript-plain { padding: 24px; }` ใน `styles/base.css` แล้วแก้ template ต้นทาง (`components/docs/*.html` ตามที่ `build-pages` ใช้) — ห้ามแก้ `apps/*.html` ตรง

### F-07 · checker ข้าม sourcePath/ref เมื่อ clone หาย (ปิดตัวโดยเจตนา)

- **Location:** `tools/check-docs.cjs:38-58` (`sourcePathExists`), `.github/workflows/main.yml:47-49` (comment in CI)
- **Impact:** CI วิ่งแบบไม่มี clone → ลิงก์ที่ชี้ path ผิดใน PR จะไม่ถูกจับใน CI จับได้แค่เมื่อผู้ maintain รัน local พร้อม clone ครบ (เอกสารขั้นตอนอยู่ใน README แล้ว)
- **Note:** แค่จดไว้; ถ้าอยากปิดช่องให้ใช้ submodule ครบ 12 repo พร้อม `--recurse-submodules`

---

## ผ่าน (ตรวจแล้วหายห่วง)

- **XSS sinks:** `innerHTML` เพียง 3 จุด (`init.js:75,102,119,129`) และทุกการ interpolate ใน `render.js`/`init.js` ผ่าน `esc()` (text + attribute double-quoted) พร้อม `inline()` (`code` markup จาก backtick เท่านั้น) และ `codeBlock` ใช้ `esc(code)` — ไม่พบจุดที่ใส่ item ไปตรง ๆ ทั้ง 12 module
- **รับ URL จาก attacker:** จุดเดียวคือ `location.hash` (`init.js:50-59`) ใช้ผ่าน `URLSearchParams` → whitelist ผ่าน `categoryCounts` / `itemById` เท่านั้น; ไม่ propagation ไปหา URL/element ใด
- **Code execution:** ไม่มี `eval`/`new Function`/`setTimeout(string)`; `setTimeout` เดียวคือทำ transition text (`init.js:226-230`)
- **Document manipulation:** ไม่มี `document.write`; ทุก anchor `target="_blank"` มี `rel="noreferrer"` (app/ + render.js:61)
- **Third-party:** ไม่มี at all — ค่าที่สูงที่สุดของ SRI/Supply chain (JS-SUPPLY-001/JS-SRI-001) คือไม่มีความเสี่ยง ; assets ทั้งหมด same-origin (CSS/JS/รูปเดียว; ไม่มี `@import url(http…)` หรือ `font` external)
- **Storage / postMessage / iframe / WebRTC:** ไม่พบเลย (ตาม reference §5)
- **Secrets:** สแกน `git ls-files` แล้วไม่พบ `.env`, token, `sk-`, `ghp_`, Bearer, api key; server credential ที่มีอยู่อยู่ใน sibling clone (`../servers/src/.env`) อยู่นอก repo นี้ — อย่าเอาเข้ามา
- **CI:** `permissions: contents: read` แคบแล้ว, ไม่มี secret เลย, `pull_request` ไม่ได้ decrypt secret ใด ๆ

---

## ลำดับแนะนำ (เมื่อจะใช้แก้)

1. F-06 แล้ว F-01 (CSP มาทีเดียวกัน ไม่งั้น inline style บล็อก CSS)
2. F-02 (one-liner)
3. F-04, F-05
4. (optional) F-03

F-03/F-07 ทำเป็น optional ได้ทุกเวลา
