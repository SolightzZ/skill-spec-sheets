# 0-src-web-skill-docs

โครงสร้าง docs index หลังแยก component ตามหน้าที่ ยังเปิดด้วย `file://` ได้ แต่หน้า docs ถูก generate จาก component + data ก่อน

## Entry points

- `index.html` — หน้า home (แก้มือ)
- `apps/*-docs.html` — 12 หน้าฝั่ง docs (generated; ห้ามแก้มือ)
- `index.css` — CSS entry ที่ `@import` ไฟล์ย่อยตามลำดับ cascade เดิม
- `index.js` — JS entry loader ที่โหลด core + page module ของหน้านั้น
- `DOC-SCHEMA.md` — สัญญาข้อมูลของ item ทุกหน้า

## Folders

```text
0-src-web-skill-docs/
├─ index.html
├─ apps/
│  └─ *-docs.html              # generated จาก components/
├─ index.css                   # CSS manifest
├─ index.js                    # JS loader + page map
├─ DOC-SCHEMA.md                # item schema
├─ components/
│  ├─ docs/                    # shared HTML components
│  │  ├─ page.html
│  │  ├─ head.html
│  │  ├─ masthead.html
│  │  ├─ rail.html
│  │  ├─ results.html
│  │  ├─ detail.html
│  │  ├─ footer.html
│  │  └─ scripts.html
│  └─ pages/
│     └─ <stem>/
│        ├─ data.json           # title, masthead, filters, labels, footer
│        ├─ install.html        # optional rail slot
│        ├─ rail-extra.html     # optional rail slot เช่น secondary filter
│        └─ signals.html        # optional เนื้อหาใต้ list
├─ js/
│  ├─ core/
│  │  ├─ escape.js
│  │  ├─ render.js              # row + long-form doc renderer
│  │  └─ init.js                # search, filter, hash routing, doc mode, copy
│  └─ pages/                    # 1 ไฟล์ต่อ 1 docs page (data only)
├─ styles/
│  ├─ base.css
│  ├─ layout.css
│  ├─ masthead.css
│  ├─ components/               # รวม doc.css สำหรับ reader
│  └─ pages/
└─ tools/
   ├─ build-pages.cjs           # static HTML builder, no dependencies
   └─ check-docs.cjs            # schema, counts, source-path validator
```

## Build

```bash
node tools/build-pages.cjs
node tools/build-pages.cjs --check
node tools/check-docs.cjs
```

- `build-pages.cjs` อ่าน `components/pages/*/data.json`
- compose กับ `components/docs/*.html`
- เขียน `apps/<stem>.html` (โฟลเดอร์ `apps/` ถูกสร้างให้ถ้ายังไม่มี)
- `--check` ใช้ตรวจว่า generated HTML ตรงกับ component ล่าสุด
- `check-docs.cjs` ตรวจ schema, id ซ้ำ, จำนวน chip/status/noscript, ตัวอย่าง 3 อันของ item ที่เรียกใช้ได้, และ `sourcePath` ที่มีจริงใน clone ต้นทาง

## Data JSON

`components/pages/<stem>/data.json` เก็บข้อมูลที่ไม่ใช่ markup:

- `title`, `description`
- `masthead.title`, `masthead.lede`, `masthead.stamp`
- `rail.label`, `rail.placeholder`, `rail.status`
- `rail.filters` (`static`, `dynamic`, หรือ `none`)
- `index.ariaLabel`, `index.srTitle`, `index.empty`
- `detail.ariaLabel`
- `footer.note`, `footer.meta`, `footer.source`
- `noscript`

Markup ที่ต่างกันรายหน้าแยกเป็น slot component ในโฟลเดอร์เดียวกัน

## Item data

`js/pages/<stem>.js` เป็น data-only module ตาม `DOC-SCHEMA.md`:

```js
NS.pages["<stem>"] = {
  data: [{ id, cat, type, name, summary, overview, ... }],
  idKey: "id",
  filters: "static" | "dynamic" | "none",
  unit: "รายการ",
  catLabel: { catId: "ป้ายไทย" },
  collection: { repo, version, license, verifiedAt }
};
```

ถ้าต้องการ prompt แนะนำใน empty state ของแผงรายละเอียด ให้กำหนด `prompt: "..."` เพิ่มใน page module

`js/core/render.js` วาด list row และหน้า reader จากข้อมูลนี้ หน้าไหนไม่ต้องใช้รูปแบบพิเศษจึงไม่ต้องเขียน renderer เอง

## Reading mode

- คลิกรายการแล้วเปิด reader ในคอลัมน์รายละเอียดด้านขวาของหน้าเดิม แถว list ยังเห็นได้ และแถวที่เลือกไฮไลต์ผ่าน `aria-pressed`
- เมื่อยังไม่เลือก แสดง empty state ของแผงรายละเอียด พร้อม prompt แนะนำจาก `prompt` ของ page module (ถ้ากำหนด)
- reader เปิดรายละเอียดใน panel เดิม และปิดกลับสู่ empty state ได้ด้วย Escape
- reader มีปุ่มคัดลอกคำสั่ง/prompt ทุกบล็อกถาม
- ใต้ 1200px reader อยู่ใต้ list; การเปิดจะ scroll ไปยังแผง detail ให้เอง เฉพาะเมื่อเช็ค `prefers-reduced-motion` ผ่าน

## Why classic scripts

ทุกหน้าใช้ `file://` เป็น runtime หลัก จึงยังใช้ classic script ผ่าน `index.js` loader ไม่ใช้ ES modules เพราะ `import` จาก `file://` ถูก browser block ด้วย CORS

Loader จะอ่าน `data-page` จาก `<body>` แล้วโหลดตามลำดับ:

1. `js/core/escape.js`
2. `js/core/render.js`
3. `js/core/init.js`
4. `js/pages/<page>.js`
5. เรียก `DocsIndex.init(DocsIndex.pages[page])`

CSS ใช้ `@import` จาก `index.css` เพราะ browser โหลด CSS ภายใน `file://` ได้

## Adding a docs page

1. เพิ่ม `components/pages/<stem>/data.json`
2. เพิ่ม slot component ที่ต้องใช้ (`install.html`, `rail-extra.html`, `signals.html`)
3. เพิ่ม `js/pages/<stem>.js` โดยสร้าง `DocsIndex.pages["<stem>"]` ตาม `DOC-SCHEMA.md` (ไม่ต้องเขียน renderer)
4. เพิ่ม `styles/pages/<stem>.css`
5. เพิ่ม `@import` ใน `index.css` ตามลำดับ cascade
6. เพิ่ม `<stem>` ใน `PAGE_FILES` ภายใน `index.js`
7. รัน `node tools/build-pages.cjs && node tools/check-docs.cjs`

## Notes

- Page module เก็บเฉพาะ data ตาม schema; renderer กลางอยู่ใน `js/core/render.js`
- `styles/masthead.css` ต้องอยู่ท้าย `index.css` เพื่อให้ override ของ masthead ชนะ page-specific rules
- อย่าแก้ `apps/*-docs.html` ตรง ๆ ให้แก้ `components/` หรือ `data.json` แล้ว build ใหม่
- การแก้ข้อความหรือจำนวน statistic ให้แก้ `data.json`, page module และ `index.html` การ์ดที่เกี่ยวข้องให้ตรงกัน
- `tools/check-docs.cjs` ใช้ mapping ชื่อ page → โฟลเดอร์ clone ต้นทางในตัวมันเอง; เพิ่มหน้าใหม่แล้วต้องอัปเดต mapping ด้วย
