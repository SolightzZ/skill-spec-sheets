/* Page module: ui-ux-pro-max-skill-docs. Verified against nextlevelbuilder/ui-ux-pro-max-skill 2.15.0 (2026-10-23). */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  var REPO = "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill";
  var MAIN = ".claude/skills/ui-ux-pro-max/SKILL.md";

  function doc(path, label) {
    return { label: label, href: REPO + "/blob/main/" + path };
  }

  function readme(label) {
    return { label: "README — " + label, href: REPO + "/blob/main/README.md" };
  }

  function skillDoc(id) {
    return doc(".claude/skills/" + id + "/SKILL.md", "skills/" + id + "/SKILL.md");
  }

  var BUNDLED = "สกิล Premium ที่ไม่มีเอกสาร public แยก; ไฟล์มีจริงใน `.claude/skills/` และติดตั้งผ่าน `plugin.json`";

  NS.pages["ui-ux-pro-max-skill-docs"] = {
    data: [
      /* ---------- skill · 7 ---------- */
      {
        id: "ui-ux-pro-max",
        cat: "skill",
        type: "skill",
        name: "ui-ux-pro-max",
        summary: "ค้นฐานข้อมูล UI/UX ในเครื่องแล้วประกอบเป็น design system เดียวสำหรับออกแบบหรือตรวจหน้า UI",
        overview: "พา reasoning engine ในเครื่องค้นข้อมูลที่มาในชุด: 192 product types, 79 styles, 192 palettes, 74 font pairings, 119 UX guidelines, 25 chart types, 17 GSAP presets, 105 icons และ 22 stacks พร้อม stack guidelines 1,272 แถว โหมดปกติเป็น skill mode ที่ถูกเรียกอัตโนมัติเมื่อคำขอเกี่ยวกับหน้าตา interaction หรือ accessibility ส่วน `/ui-ux-pro-max` ใช้เฉพาะ Kiro, Roo Code และ KiloCode ผลลัพธ์ต้องตรวจกับ product และ stack จริงก่อนใช้ ไม่ใช่คำสั่งที่เขียนทับกฎโปรเจกต์",
        prerequisites: [
          "Python 3.x สำหรับ `search.py` (standard library เท่านั้น ไม่ติดตั้งอะไรและไม่เรียกเครือข่าย)",
          "ติดตั้งผ่าน Claude Marketplace หรือ CLI `ui-ux-pro-max-cli` ก่อน",
          "รู้ stack ของโปรเจกต์จาก dependency จริง หรือถามผู้ใช้ถ้าตรวจไม่ได้"
        ],
        invoke: [
          {
            label: "สร้าง design system ด้วย path เต็ม",
            code: "python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"beauty spa wellness\" --design-system -p \"Serenity Spa\"",
            note: "path ต้องเต็มเสมอ อย่าย่อเป็น <skill>/scripts/search.py"
          },
          {
            label: "เรียกจาก plugin root",
            code: "python \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"<query>\" --domain <domain>",
            note: "ถ้าไม่พบ `python` ให้ลอง `python3` แล้ว `py -3`"
          },
          {
            label: "ค้นหา domain เดียว",
            code: "python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"glassmorphism\" --domain style"
          }
        ],
        examples: [
          {
            title: "หน้า landing ของ SaaS",
            prompt: "/ui-ux-pro-max Build a landing page for my SaaS product",
            result: "ได้ pattern, style, colors, typography, effects และ anti-patterns จาก `--design-system` พร้อม checklist ก่อนส่งงาน"
          },
          {
            title: "แก้ปัญหา accessibility ของ dialog",
            prompt: "/ui-ux-pro-max modal ของเรา focus หลุดออกนอก dialog ตอนกด Tab",
            result: "สกิลค้น `keyboard focus modal --domain ux` แล้วเสนอ focus trap และการคืน focus ตาม UX guideline"
          },
          {
            title: "งานที่รู้ stack แล้ว",
            prompt: "/ui-ux-pro-max ฟอร์มใน React ของเราขาด validation state ที่อ่านออกด้วย screen reader",
            result: "ได้ guidance จาก `--stack react` เสริมด้วย `--domain ux` เฉพาะประเด็น error summary"
          }
        ],
        cautions: [
          "คำสั่งที่ย่อ path เช่น `python <skill>/scripts/search.py` ใช้ไม่ได้จริง เพราะ script อยู่ในโฟลเดอร์ของสกิล ไม่ใช่ project directory",
          "โหมด skill ถูกเรียกเองบน Claude Code, Cursor, OpenCode; `/ui-ux-pro-max` ใช้เฉพาะ Kiro, Roo Code และ KiloCode ส่วน Trae ต้องสลับเป็น SOLO mode",
          "ห้ามเดา stack — default ที่ hardcode ไว้จะทำให้ recommendation ทั้งชุดผิดทาง"
        ],
        refs: [readme("Installation"), skillDoc("ui-ux-pro-max"), doc(MAIN, "SKILL.md (source)")],
        sourcePath: MAIN
      },
      {
        id: "banner-design",
        cat: "skill",
        type: "skill",
        name: "banner-design",
        summary: "ออกแบบ banner หลายขนาดด้วย HTML/CSS พร้อม safe zone และ export PNG ตามขนาดจริง",
        overview: "สกิลนี้ทำงานกับ banner อย่างเดียว: social cover, display ad, website hero และงาน print โดยเริ่มจากถาม purpose, platform, content, brand, style และจำนวนชิ้น แล้วเลือก 2-3 art directions ที่เข้ากับเป้าหมาย แต่ละแบบถูกสร้างเป็น HTML/CSS ที่ขนาดจริง วางเนื้อหาสำคัญใน safe zone กลาง 70-80% ใช้ฟอนต์ไม่เกิน 2 ตัว และ CTA เดียว จากนั้นจึง capture เป็น PNG ต่อขนาด",
        prerequisites: [
          "ขนาดและ safe zone ของแพลตฟอร์มปลายทาง",
          "โลโก้ สี และฟอนต์ของแบรนด์ถ้ามี (ห้ามแต่งกฎแบรนด์เอง)",
          "browser หรือ screenshot capability สำหรับ export; ถ้าไม่มีให้ส่ง HTML/CSS และระบุว่า PNG ยังค้าง"
        ],
        invoke: [
          {
            label: "เรียกผ่าน skill tool",
            code: "skill(\"banner-design\")",
            note: "skill mode เรียกจากคำขอ เช่น ขอ banner งานเปิดตัวสินค้า"
          }
        ],
        examples: [
          {
            title: "Facebook cover",
            prompt: "/banner-design ทำ cover Facebook 820×312 สำหรับร้านกาแฟเปิดใหม่ โทนมินิมัล",
            result: "ได้ PNG ตามขนาดพร้อม safe zone และเหตุผลของ art direction ที่เลือก"
          },
          {
            title: "Instagram story",
            prompt: "/banner-design ขอ IG story 1080×1920 สองแบบสำหรับโปรลด 20%",
            result: "ได้สองทางเลือกพร้อม CTA เดียวและข้อความไม่เกิน 20% ของพื้นที่โฆษณา"
          },
          {
            title: "Google Ads",
            prompt: "/banner-design ทำ leaderboard 728×90 กับ medium rectangle 300×250 ให้ข้อความสั้นที่สุด",
            result: "ได้ไฟล์แยกตามขนาดใน assets/banners/<campaign>/ พร้อมชื่อแบบ kebab-case"
          }
        ],
        cautions: [
          BUNDLED,
          "ห้ามสร้างภาพที่มีตัวอักษรฝังในภาพ — copy ต้องอยู่ใน HTML เพื่อให้แก้และอ่านออกได้",
          "ถ้า runtime ไม่มี image generation หรือ screenshot ให้ใช้ CSS-built visual และรายงานว่า export ยังไม่ได้ทำ"
        ],
        refs: [skillDoc("banner-design"), doc(".claude/skills/banner-design/references/banner-sizes-and-styles.md", "references/banner-sizes-and-styles.md")],
        sourcePath: ".claude/skills/banner-design/SKILL.md"
      },
      {
        id: "brand",
        cat: "skill",
        type: "skill",
        name: "brand",
        summary: "คุม voice, visual identity และ messaging แล้ว sync ลง design token ให้ตรงกันทั้งโปรเจกต์",
        overview: "brand ทำงานจาก `docs/brand-guidelines.md` เป็น source of truth แล้ว sync ค่าออกเป็น `assets/design-tokens.json` และ `assets/design-tokens.css` ผ่าน `sync-brand-to-tokens.cjs` มีสคริปต์ช่วย inject บริบทแบรนด์เข้า prompt, validate ชื่อ/ขนาด/ฟอร์แมตของ asset และเทียบสีในภาพกับ palette งานหลักคือทำให้คำตอบของ agent ไม่หลุดเสียงและสีของแบรนด์",
        prerequisites: [
          "Node.js สำหรับสคริปต์ `.cjs`",
          "ไฟล์ `docs/brand-guidelines.md` หรือใช้ template เริ่มต้น",
          "รันจาก project root เพราะสคริปต์อ่านเขียนไฟล์โปรเจกต์"
        ],
        invoke: [
          {
            label: "ดึงบริบทแบรนด์",
            code: "node scripts/inject-brand-context.cjs",
            note: "path ของสคริปต์อ้างจากโฟลเดอร์ที่มี SKILL.md ไม่ใช่ project root"
          },
          {
            label: "sync แบรนด์ลง token",
            code: "node scripts/sync-brand-to-tokens.cjs",
            note: "จะหยุดเมื่อพบ token เดิม, `:root` หรือ Tailwind `@theme`"
          }
        ],
        examples: [
          {
            title: "ตรวจงานการตลาด",
            prompt: "/brand ช่วยเช็กว่าแบนเนอร์นี้ใช้สีและเสียงแบรนด์ถูกไหม",
            result: "ได้ผลเทียบสีกับ palette และรายการจุดที่หลุด guideline พร้อมไฟล์อ้างอิง"
          },
          {
            title: "เริ่มแบรนด์ใหม่",
            prompt: "/brand ตั้ง voice และ visual identity ให้สตูดิโอสถาปัตยกรรมเล็ก ๆ",
            result: "ได้ brand guidelines ตั้งต้นแล้ว sync เป็น design token สองรูปแบบ"
          },
          {
            title: "ตรวจ asset ก่อนส่ง",
            prompt: "/brand ตรวจชื่อไฟล์และขนาดรูปชุดนี้ก่อนส่งให้ทีม",
            result: "ได้รายการไฟล์ที่ผิด naming, size หรือ format ตามกฎที่กำหนด"
          }
        ],
        cautions: [
          BUNDLED,
          "`sync-brand-to-tokens.cjs` หยุดเมื่อเจอ token ที่มีอยู่ — ต้องอ่าน source ที่มันรายงานก่อนใช้ `--force`",
          "สคริปต์เขียนทับไฟล์โปรเจกต์จริง ควร commit หรือ backup ก่อน sync"
        ],
        refs: [skillDoc("brand"), doc(".claude/skills/brand/references/brand-guideline-template.md", "references/brand-guideline-template.md")],
        sourcePath: ".claude/skills/brand/SKILL.md"
      },
      {
        id: "design",
        cat: "skill",
        type: "skill",
        name: "design",
        summary: "รวมงานออกแบบไว้จุดเดียว: logo, CIP, slides, banner, icon และ social photos",
        overview: "design เป็นทางเข้าหลักที่แยกงานไปยัง brand, design-system และ ui-styling หรือทำงาน built-in เองเมื่อเป็น logo (55+ styles, 30 palettes, 25 industries), CIP (50+ deliverables, 20 styles, 20 industries), slides, banner, icon (15 styles, 12 categories) และ social photos ที่สร้าง HTML แล้ว capture เป็นภาพ งานที่ต้องสร้างภาพใช้ Gemini ผ่าน `GEMINI_API_KEY` หรือผู้ให้บริการ MuAPI",
        prerequisites: [
          "Python 3.x สำหรับสคริปต์ `logo/`, `cip/`, `icon/`",
          "`pip install google-genai pillow` และ `GEMINI_API_KEY` เมื่อต้องสร้างภาพ",
          "Node.js และ browser capture เมื่อทำ social photos"
        ],
        invoke: [
          {
            label: "สร้าง design brief ของ logo",
            code: "python3 scripts/logo/search.py \"tech startup modern\" --design-brief -p \"BrandName\"",
            note: "บน Windows ใช้ `python` แทน `python3`"
          },
          {
            label: "สร้าง logo ด้วย AI",
            code: "python3 scripts/logo/generate.py --brand \"TechFlow\" --style minimalist --industry tech"
          }
        ],
        examples: [
          {
            title: "ชุดแบรนด์ครบ",
            prompt: "/design ทำโลโก้ให้ร้านอาหารไทยร่วมสมัย แล้วต่อด้วยนามบัตรและป้ายหน้าร้าน",
            result: "ได้ logo variants ต่อด้วย CIP mockups ที่ใช้โลโก้เดียวกัน"
          },
          {
            title: "icon set",
            prompt: "/design ขอ icon แบบ outlined 4 ตัวสำหรับ dashboard: settings, export, filter, alert",
            result: "ได้ SVG จาก `scripts/icon/generate.py` พร้อมสีและขนาดที่กำหนด"
          },
          {
            title: "ภาพโซเชียลหลายแพลตฟอร์ม",
            prompt: "/design ทำภาพโปรโมตกิจกรรมลง IG post, IG story และ LinkedIn",
            result: "ได้ HTML ต่อขนาดแล้ว export PNG ตามขนาดของแต่ละแพลตฟอร์ม"
          }
        ],
        cautions: [
          BUNDLED,
          "ฟีเจอร์สร้างภาพต้องมี API key และอาจมีค่าใช้จ่าย — ต้องให้ผู้ใช้อนุมัติก่อนเรียกผู้ให้บริการ",
          "SKILL.md สั่งว่าเมื่อสคริปต์พังให้แก้เองทันที ซึ่งควรถูกจำกัดด้วยขอบเขตงานและความเห็นชอบของผู้ใช้"
        ],
        refs: [skillDoc("design"), doc(".claude/skills/design/references/design-routing.md", "references/design-routing.md")],
        sourcePath: ".claude/skills/design/SKILL.md"
      },
      {
        id: "design-system",
        cat: "skill",
        type: "skill",
        name: "design-system",
        summary: "วาง token สามชั้น primitive → semantic → component พร้อม validator และระบบ slide",
        overview: "สกิลนี้ให้โครง token แบบสามชั้นที่สลับ theme ได้โดยไม่แตะ component: primitive เก็บค่าดิบ, semantic ตั้งชื่อตามบทบาท และ component ผูกกับชิ้นส่วนจริง มี `generate-tokens.cjs` สร้าง CSS จาก JSON, `validate-tokens.cjs` หาค่าที่ hardcode และมีระบบ slide ที่ผูก Chart.js กับ token พร้อมคลัง 15 deck structures และ 25 layouts",
        prerequisites: [
          "Node.js สำหรับ `generate-tokens.cjs` และ `validate-tokens.cjs`",
          "Python สำหรับ `search-slides.py` และตัวตรวจ slide HTML",
          "ไฟล์ token config หรือ brand guidelines ที่จะดึง primitive มาสร้าง"
        ],
        invoke: [
          {
            label: "สร้าง token CSS",
            code: "node scripts/generate-tokens.cjs --config tokens.json -o tokens.css"
          },
          {
            label: "ตรวจการใช้งาน token",
            code: "node scripts/validate-tokens.cjs --dir src/"
          }
        ],
        examples: [
          {
            title: "วาง token layer",
            prompt: "/design-system ออกแบบ token สามชั้นให้แอปที่มีทั้ง light และ dark mode",
            result: "ได้ primitive, semantic และ component token พร้อม CSS variables ที่สลับ theme ได้"
          },
          {
            title: "ตามหาค่า hardcode",
            prompt: "/design-system ตรวจว่าใน src/ ยังมีสีหรือ spacing ที่เขียนตรง ๆ อยู่ไหม",
            result: "ได้รายการไฟล์และค่าที่ควรเปลี่ยนไปใช้ token"
          },
          {
            title: "สไลด์ที่ใช้แบรนด์",
            prompt: "/design-system ทำสไลด์ pitch 9 หน้าจาก design token ของแบรนด์",
            result: "ได้ HTML ที่ import design-tokens.css และใช้ Chart.js แทนกราฟ CSS"
          }
        ],
        cautions: [
          BUNDLED,
          "ห้ามใช้ hex ตรง ๆ ใน component — ต้องอ้าง token เพื่อให้ theme switching ยังทำงาน",
          "สไลด์ต้อง import `assets/design-tokens.css` และผ่าน `slide-token-validator.py` ก่อนใช้"
        ],
        refs: [skillDoc("design-system"), doc(".claude/skills/design-system/references/token-architecture.md", "references/token-architecture.md")],
        sourcePath: ".claude/skills/design-system/SKILL.md"
      },
      {
        id: "slides",
        cat: "skill",
        type: "skill",
        name: "slides",
        summary: "สร้าง HTML presentation ที่ผูก design token และ Chart.js พร้อมโครงสร้าง deck เชิงโน้มน้าว",
        overview: "slides ผลิตสไลด์เป็น HTML ที่นำเสนอได้จริงในเบราว์เซอร์: จัดวางตาม layout patterns, เขียน copy ตามสูตรอย่าง PAS หรือ AIDA, ใส่กราฟด้วย Chart.js และอ้างสี/ฟอนต์จาก design token เดียวกับทั้งระบบ มี subcommand `create` ที่โหลด `references/create.md` แล้วเดินตามขั้นออกแบบจนได้ deck ที่มี navigation และตัวเลขจากข้อมูลจริง",
        prerequisites: [
          "design token พร้อมใช้ (`assets/design-tokens.css`)",
          "เนื้อหาและตัวเลขที่ต้องการนำเสนอ",
          "Chart.js จาก CDN เมื่อต้องมีกราฟ"
        ],
        invoke: [
          {
            label: "สร้างสไลด์",
            code: "/slides:create \"10-slide investor pitch for ClaudeKit Marketing\"",
            note: "รูปแบบคำสั่งที่ design-system SKILL.md ใช้เรียกงานสไลด์"
          }
        ],
        examples: [
          {
            title: "Pitch deck",
            prompt: "/slides ทำสไลด์ pitch 10 หน้าสำหรับสตาร์ทอัพด้าน logistics",
            result: "ได้ deck ที่มีโครง story, กราฟจากข้อมูลจริง และตัวเลขที่อ้างแหล่งได้"
          },
          {
            title: "สไลด์จากรายงาน",
            prompt: "/slides ย่อรายงานผลประกอบการไตรมาสนี้เป็นสไลด์ 6 หน้า",
            result: "ได้สไลด์ที่เน้นตัวเลขสำคัญและกราฟแนวโน้มแทนการยกข้อความทั้งย่อหน้า"
          },
          {
            title: "ตรวจความสอดคล้อง",
            prompt: "/slides ตรวจว่าสไลด์ชุดนี้ใช้สีและฟอนต์ตรง token ไหม",
            result: "ได้รายการจุดที่หลุด token และข้อเสนอให้เปลี่ยนไปใช้ตัวแปร CSS"
          }
        ],
        cautions: [
          BUNDLED,
          "ต้องมี design token ก่อน — สไลด์ที่ hardcode สีจะสลับ theme ไม่ได้",
          "กราฟต้องใช้ Chart.js ตามที่กำหนด ไม่ใช่แท่ง CSS ที่อ่านค่าไม่ได้"
        ],
        refs: [skillDoc("slides"), doc(".claude/skills/slides/references/create.md", "references/create.md")],
        sourcePath: ".claude/skills/slides/SKILL.md"
      },
      {
        id: "ui-styling",
        cat: "skill",
        type: "skill",
        name: "ui-styling",
        summary: "ประกอบ UI ด้วย shadcn/ui และ Tailwind พร้อม theme, dark mode และ accessibility",
        overview: "สกิลนี้รวมสามชั้นที่ใช้ด้วยกันบ่อย: shadcn/ui บน Radix primitives สำหรับ component ที่เข้าถึงได้, Tailwind utilities สำหรับ styling และ canvas design system สำหรับงานภาพที่มีข้อความน้อย แต่เน้น composition มีสคริปต์ช่วยติดตั้ง component และสร้าง Tailwind config พร้อม reference เรื่อง theming, responsive และ ARIA patterns",
        prerequisites: [
          "โปรเจกต์ React-based (Next.js, Vite, Remix, Astro)",
          "Node.js และ `npx` สำหรับ shadcn CLI",
          "Python 3.x เมื่อใช้ `shadcn_add.py` หรือ `tailwind_config_gen.py`"
        ],
        invoke: [
          {
            label: "ติดตั้ง shadcn/ui พร้อม Tailwind",
            code: "npx shadcn@latest init",
            note: "CLI จะถาม framework, TypeScript, path และ theme"
          },
          {
            label: "เพิ่ม component",
            code: "npx shadcn@latest add button card dialog form"
          },
          {
            label: "สร้าง Tailwind config จากสคริปต์",
            code: "python scripts/tailwind_config_gen.py --colors brand:blue --fonts display:Inter"
          }
        ],
        examples: [
          {
            title: "ตารางข้อมูล",
            prompt: "/ui-styling ทำหน้า dashboard ที่มี data table พร้อม dialog แก้ไขแถว",
            result: "ได้ component จาก shadcn/ui ที่มี focus state และ keyboard navigation ครบ"
          },
          {
            title: "Dark mode",
            prompt: "/ui-styling เพิ่ม dark mode ให้ทั้งแอปโดยใช้ CSS variable ชุดเดียว",
            result: "ได้ theme toggle และคู่สีที่สลับได้โดยไม่ต้องเขียนสีซ้ำใน component"
          },
          {
            title: "ฟอร์มที่เข้าถึงได้",
            prompt: "/ui-styling ทำฟอร์มล็อกอินที่ error อยู่ติดช่องและอ่านออกด้วย screen reader",
            result: "ได้ FormField ที่ผูก label, description และ message ตาม pattern ของ Radix"
          }
        ],
        cautions: [
          BUNDLED,
          "`tailwind_config_gen.py` จะไม่เขียนทับถ้ามี `tailwind.config.*` อยู่แล้ว เว้นแต่สั่ง `--force`",
          "หลีกเลี่ยง dynamic class name เพราะ Tailwind ตัด class ที่มองไม่เห็นตอน build"
        ],
        refs: [skillDoc("ui-styling"), doc(".claude/skills/ui-styling/references/shadcn-theming.md", "references/shadcn-theming.md")],
        sourcePath: ".claude/skills/ui-styling/SKILL.md"
      },

      /* ---------- step · 7 ---------- */
      {
        id: "frame",
        cat: "step",
        type: "concept",
        name: "Frame — อ่านโจทย์และ stack",
        summary: "แยก product, audience และข้อจำกัด แล้วตรวจ stack จาก dependency จริงก่อนค้น",
        overview: "ขั้นแรกคือสกัดจากคำขอว่าสร้างอะไร ให้ใครใช้ และมีข้อจำกัดอะไร จากนั้นตรวจ stack จากไฟล์จริงของโปรเจกต์: `package.json` (react, next, vue, svelte, nuxt, @angular), `pubspec.yaml` (Flutter), `*.xcodeproj` หรือ `Package.swift` (SwiftUI), `composer.json` (Laravel) และ marker ของ React Native (`app.json` คู่กับ dependency `react-native`) ถ้าตรวจไม่พบและ stack มีผลต่อคำแนะนำ ต้องถามผู้ใช้ ไม่ใช่เดา",
        prerequisites: [
          "คำขอที่บอกงานและผู้ใช้อย่างน้อยหนึ่งประโยค",
          "สิทธิ์อ่านไฟล์ dependency ของโปรเจกต์"
        ],
        cautions: [
          "stack ที่เดาผิดทำให้ stack guidelines ทั้งชุดผิด และ agent จะไม่รู้ตัว",
          "งาน backend, API/DB, infra หรือ performance ที่ไม่เกี่ยวกับ visual อยู่นอกขอบเขตสกิลนี้",
          "ถ้าโปรเจกต์ไม่มีไฟล์ dependency ให้ถามก่อนเลือก default"
        ],
        refs: [doc(MAIN, "SKILL.md — Step 1"), readme("Usage")],
        sourcePath: MAIN
      },
      {
        id: "system",
        cat: "step",
        type: "concept",
        name: "Design system — รวมห้าฐานข้อมูล",
        summary: "คำสั่งเดียวรวม product, style, color, landing และ typography เป็นทิศทางเดียว",
        overview: "`--design-system` รันห้าคำค้นแล้วให้ reasoning engine จาก `ui-reasoning.csv` กรองผลด้วย 192 reasoning profiles: จับ product type เข้ากับกฎอุตสาหกรรม จัดอันดับ style ด้วย BM25 คัด anti-pattern ของ industry และเดิน decision rules ผลลัพธ์คือ pattern, style, colors, typography, effects และรายการสิ่งที่ต้องเลี่ยง พร้อม checklist ก่อนส่งงาน ใช้เมื่อเป็นโปรเจกต์ใหม่หรือเปลี่ยน visual direction ทั้งระบบ",
        prerequisites: [
          "ผ่านขั้น frame แล้ว: product type, industry และ keywords",
          "ติดตั้งสกิลและมี Python 3.x"
        ],
        invoke: [
          {
            label: "สร้าง design system",
            code: "python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"beauty spa wellness\" --design-system -p \"Serenity Spa\""
          },
          {
            label: "ระบุ project name เพื่อใช้ต่อกับ --persist",
            code: "python \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"<product_type> <industry> <keywords>\" --design-system -p \"Project Name\""
          }
        ],
        cautions: [
          "SKILL.md ระบุว่า `--design-system` เป็นสิ่งที่ต้องทำสำหรับหน้าใหม่หรือโปรเจกต์ใหม่ ไม่ใช่ทางเลือก",
          "pattern มาจาก landing dataset 34 แบบ ไม่ได้แข่งอันดับกับ visual style",
          "ผลลัพธ์เป็นคำแนะนำ ต้องตรวจว่าเข้ากับ product และ platform จริงก่อนใช้"
        ],
        refs: [doc(MAIN, "SKILL.md — Step 2"), readme("How Design System Generation Works")],
        sourcePath: MAIN
      },
      {
        id: "dials",
        cat: "step",
        type: "concept",
        name: "Dials — variance, motion, density",
        summary: "สามสไลเดอร์ 1-10 ปรับผลลัพธ์ design system โดยไม่ต้องเปลี่ยนคำค้น",
        overview: "`--variance`, `--motion` และ `--density` รับค่า 1-10 และใช้ร่วมกับ `--design-system` เท่านั้น: variance ต่ำจะเอนไปทาง minimal และสูงจะเอนไปทาง bold หรือ asymmetric, motion ต่ำเป็น micro-interaction และสูงเป็น choreography ที่มี pin หรือ Flip, density ต่ำให้ spacing กว้างและสูงให้สเกลแบบ dashboard การไม่ใส่ dial ใดจะคงผลส่วนนั้นไว้เหมือนเดิมทุกประการ",
        prerequisites: [
          "คำสั่ง `--design-system` ที่ทำงานได้แล้ว",
          "ตัดสินใจว่าผลิตภัณฑ์เน้นความหนาแน่นหรือความโปร่ง"
        ],
        invoke: [
          {
            label: "ปรับทั้งสาม dial",
            code: "python \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"<query>\" --design-system --variance <1-10> --motion <1-10> --density <1-10>"
          },
          {
            label: "ตัวอย่าง dashboard",
            code: "python \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"internal analytics dashboard\" --design-system --variance 8 --motion 7 --density 8 -p \"Ops Console\""
          }
        ],
        cautions: [
          "dial ใช้ได้เฉพาะกับ `--design-system` ไม่มีผลกับ `--domain` หรือ `--stack`",
          "`--density` เขียนทับตารางตัวแปร `--space-*` ใน output และใน MASTER.md จึงควรเลือกให้ตรงชนิดหน้า",
          "`--motion` แนบ GSAP snippet ตาม tier ที่ resolve ได้ ไม่ได้ปรับ motion ของทั้งโปรเจกต์ให้เอง"
        ],
        refs: [doc(MAIN, "SKILL.md — Step 2c"), readme("Design System Command")],
        sourcePath: MAIN
      },
      {
        id: "domain",
        cat: "step",
        type: "concept",
        name: "Domain — เจาะปัญหาทีละด้าน",
        summary: "เลือก domain เดียวเมื่อต้องการรายละเอียดเฉพาะเรื่อง ไม่ใช่ภาพรวมทั้งระบบ",
        overview: "หลังได้ design system แล้ว งานที่เหลือมักเป็นปัญหาเฉพาะจุด: สี ฟอนต์ chart, UX rule, landing structure, icon, GSAP, performance ของ React หรือ guideline ของ native app แต่ละเรื่องมี domain ของตัวเองและคืนผลคนละชุด คำค้นควรมี 2-5 คำที่สื่อเจตนาเดียว และควรระบุ `--domain` เองเมื่อคำนั้นกำกวม เพราะ auto-detection อาจแยกไม่ออก เช่นคำว่า font ที่ตรงทั้ง `typography` และ `google-fonts`",
        prerequisites: [
          "รู้ว่าปัญหาอยู่ด้านไหนของงานออกแบบ",
          "ผ่านขั้น frame เพื่อรู้ product และ stack"
        ],
        invoke: [
          {
            label: "ค้นหา domain ที่ระบุชัด",
            code: "python \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"<keyword>\" --domain <domain> [-n <max_results>]"
          },
          {
            label: "ตัวอย่าง typography",
            code: "python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"elegant serif\" --domain typography"
          }
        ],
        cautions: [
          "`-n` รับ 1-20 เท่านั้น",
          "ถ้าผลดูไม่ตรงเรื่อง ให้ระบุ `--domain` แทนการเปลี่ยนคำค้นไปเรื่อย ๆ",
          "domain `web` เป็น guideline ของ app/native interface ไม่ใช่ guideline ของเว็บทั่วไป"
        ],
        refs: [doc(MAIN, "SKILL.md — Step 3"), readme("Design System Command (Advanced)")],
        sourcePath: MAIN
      },
      {
        id: "stack",
        cat: "step",
        type: "concept",
        name: "Stack — guideline ตาม framework",
        summary: "ค้น guideline เฉพาะ stack ที่ตรวจได้ พร้อมกฎ version-aware สำหรับของเก่า",
        overview: "`--stack` รับ 22 ค่า: react, nextjs, vue, svelte, astro, nuxtjs, nuxt-ui, angular, laravel, swiftui, react-native, flutter, jetpack-compose, html-tailwind, shadcn, threejs, javafx, wpf, winui, avalonia, uno และ uwp ข้อมูลใน `data/stacks/*.csv` รวม 1,272 แถว คำค้นที่ไม่มีเลข version เก่าจะได้ guideline ปัจจุบัน ส่วนคำที่มีเลข major เก่าจะคืนเฉพาะแถว legacy ที่คัดไว้และติดป้าย `Status` กับ `Applies To` ถ้าไม่มีแถวที่ตรง จะได้ผลว่างแทนการผสมข้ามรุ่น",
        prerequisites: [
          "stack ที่ยืนยันจาก dependency จริงในขั้น frame",
          "คำค้นที่เป็นปัญหาของ implementation ไม่ใช่ชื่อ framework"
        ],
        invoke: [
          {
            label: "ค้น guideline ของ stack",
            code: "python \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"<keyword>\" --stack <stack>"
          },
          {
            label: "ตัวอย่าง React",
            code: "python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"form validation\" --stack react"
          }
        ],
        cautions: [
          "ผลว่างจาก stack เก่าคือพฤติกรรมที่ตั้งใจ ไม่ใช่บั๊ก — ห้ามเติมคำตอบจากรุ่นอื่นเอง",
          "ระบุ stack ให้ตรงชื่อในรายการ เช่น `html-tailwind` ไม่ใช่ `tailwind`",
          "`nextjs` มีข้อมูลแยกจาก `react` แม้โปรเจกต์จะใช้ทั้งคู่"
        ],
        refs: [doc(MAIN, "SKILL.md — Step 4"), { label: "src/ui-ux-pro-max/data/stacks/", href: REPO + "/tree/main/src/ui-ux-pro-max/data/stacks" }],
        sourcePath: MAIN
      },
      {
        id: "persist",
        cat: "step",
        type: "concept",
        name: "Persist — MASTER + override",
        summary: "บันทึก design system ลงไฟล์เพื่อหยิบใช้ข้ามเซสชัน โดย MASTER เป็น source of truth",
        overview: "`--persist` เขียน `design-system/<project-slug>/MASTER.md` และเตรียมโฟลเดอร์ `pages/` ให้ไฟล์ override รายหน้า เมื่อสร้างหน้าใดให้อ่าน MASTER ก่อน แล้วถ้ามี `pages/<page>.md` ให้กฎในไฟล์นั้นทับ MASTER เฉพาะจุด ต้องส่ง `--output-dir` ให้ชี้ project root เสมอ เพราะถ้าไม่ส่ง ไฟล์จะไปอยู่ใน directory ที่เครื่องมือถูกเรียก ถ้ามี MASTER อยู่แล้ว คำสั่งจะข้ามการเขียนและทิ้งไฟล์เดิมไว้",
        prerequisites: [
          "คำสั่ง `--design-system` ที่ให้ผลตรงกับ product แล้ว",
          "path ของ project root ที่จะเก็บโฟลเดอร์ design-system"
        ],
        invoke: [
          {
            label: "บันทึก MASTER และ page override",
            code: "python \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"<query>\" --design-system --persist -p \"Project Name\" --output-dir \"<project-root>\""
          },
          {
            label: "เพิ่ม override ของหน้า",
            code: "python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"SaaS dashboard\" --design-system --persist -p \"MyApp\" --page \"dashboard\""
          }
        ],
        cautions: [
          "ถ้า MASTER.md มีอยู่แล้ว `--persist` จะข้ามและไม่แตะไฟล์ เว้นแต่ใส่ `--force`",
          "ห้ามใช้ `--force` ก่อนอ่าน MASTER เดิมและได้อนุมัติจากผู้ใช้ เพราะเป็นการทับการตัดสินใจของทีม",
          "ห้าม persist ผลที่ยังไม่ตรวจว่าตรง product จริง"
        ],
        refs: [doc(MAIN, "SKILL.md — Step 2b"), readme("Persist Design System")],
        sourcePath: MAIN
      },
      {
        id: "deliver",
        cat: "step",
        type: "concept",
        name: "Deliver — checklist ก่อนส่งงาน",
        summary: "ตรวจ contrast, focus, reduced motion, safe area และ responsive ก่อนบอกว่างานเสร็จ",
        overview: "ก่อนส่งงานต้องอ่าน `references/pro-rules.md` แล้วเดินตาม Pre-Delivery Checklist: ไม่ใช้ emoji แทน icon, มี `cursor-pointer` บน element ที่กดได้, ข้อความ contrast อย่างน้อย 4.5:1, focus state มองเห็นด้วย keyboard, เคารพ `prefers-reduced-motion`, ข้อความและ chip ต้อง reflow ไม่ถูกตัด และทดสอบที่ 375, 768, 1024 และ 1440px ส่วน `references/quick-reference.md` เก็บกฎ 119 ข้อที่ใช้ตรวจเชิงลึกเมื่อเจอปัญหาเฉพาะ",
        prerequisites: [
          "UI ที่สร้างหรือแก้เสร็จและรันได้จริง",
          "เบราว์เซอร์สำหรับตรวจ keyboard focus และ responsive width"
        ],
        cautions: [
          "ห้ามประกาศว่าเสร็จก่อนผ่าน checklist — โดยเฉพาะ contrast และ focus",
          "balanced heading wrapping เป็น progressive enhancement ไม่ใช่การรับประกันว่าคำจะอยู่บรรทัดสุดท้าย",
          "งาน native app ต้องใช้ checklist ของ pro-rules ซึ่งครอบ safe area และ touch target แยกจากเว็บ"
        ],
        refs: [doc(".claude/skills/ui-ux-pro-max/references/pro-rules.md", "references/pro-rules.md"), doc(".claude/skills/ui-ux-pro-max/references/quick-reference.md", "references/quick-reference.md")],
        sourcePath: MAIN
      },

      /* ---------- reference · 5 ---------- */
      {
        id: "query-contract",
        cat: "reference",
        type: "concept",
        name: "Query Contract",
        summary: "เลือกโหมดค้นที่เล็กที่สุด หนึ่งเจตนา 2-5 คำ แล้วตรวจผลก่อนใช้",
        overview: "เลือกโหมดที่เล็กพอ: งานใหม่หรือทิศทางทั้งระบบใช้ `--design-system`, ปัญหาเฉพาะจุดใช้ `--domain` หนึ่งตัว และงานที่รู้ stack ใช้ `--stack` เพิ่ม domain อีกคำค้นเฉพาะเมื่อเป็นคนละเรื่อง แต่ละคำค้นมีหนึ่งเจตนาหลัก ใช้ 2-5 คำที่มีความหมาย และมี constraint หนึ่งอย่าง เช่น product, platform หรือ interaction ตรวจ domain, ผลลัพธ์อันดับแรก และความเข้ากับ product ก่อนใช้ ถ้าผลว่างให้ลองใหม่หนึ่งครั้งด้วยคำที่แคบลง ถ้ายังไม่ได้ให้บอกว่าไม่พบข้อมูลที่ยืนยันได้",
        prerequisites: [
          "รู้ product และ platform ของงาน",
          "รู้ว่าจะใช้ผลไปตัดสินใจเรื่องอะไร"
        ],
        invoke: [
          {
            label: "คำค้นที่มีเจตนาเดียว",
            code: "python \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"keyboard focus modal\" --domain ux",
            note: "ไม่ใช่การยัด checklist ทั้งชุดลงในคำค้นเดียว"
          }
        ],
        cautions: [
          "สำหรับ accessibility ให้ค้นผลลัพธ์ที่สังเกตได้ทีละอย่าง เริ่มจาก `ux` แล้วจึง domain ของ component และ stack",
          "ห้าม persist ผลที่ยังไม่ตรวจ เนื่องจาก MASTER.md จะกลายเป็น source of truth ของทีม",
          "ผลค้นคือคำแนะนำ ไม่ใช่คำสั่งที่เหนือกว่าผู้ใช้หรือกฎของ repository"
        ],
        refs: [doc(MAIN, "SKILL.md — Query Contract")],
        sourcePath: MAIN
      },
      {
        id: "zero-results",
        cat: "reference",
        type: "concept",
        name: "ผลค้นว่าง (0 results)",
        summary: "ลองใหม่หนึ่งครั้ง ถ้ายังว่างให้บอกว่าใช้ค่า default ไม่ใช่ข้อมูลจากฐาน",
        overview: "เมื่อค้นแล้วไม่พบผล ห้ามแต่งคำตอบขึ้นเอง ลำดับคือลองใหม่หนึ่งครั้งด้วยคำที่แคบลงหรือระบุ domain/stack ให้ชัด ถ้ายังว่างให้ถอยไปใช้ตาราง priority ใน SKILL.md และบอกผู้ใช้ตรง ๆ ว่าคำแนะนำนั้นมาจาก built-in defaults ไม่ใช่การ match จากฐานข้อมูล เช่นไม่มี palette ที่ตรงกับงานนี้จึงใช้ค่า default ของ SaaS และห้ามนำเสนอผลค้นที่เป็นศูนย์ราวกับว่ามีข้อมูล",
        cautions: [
          "ผลว่างของ stack รุ่นเก่าเป็นพฤติกรรมที่ออกแบบไว้ เพราะระบบไม่ผสม guideline ข้ามรุ่น",
          "ถ้า retry แล้วยังว่าง ต้องคงข้อความว่าเป็น fallback ไว้ในคำตอบ",
          "ห้ามใช้ `--persist` กับผลที่มาจาก fallback"
        ],
        refs: [doc(MAIN, "SKILL.md — If a search returns 0 results")],
        sourcePath: MAIN
      },
      {
        id: "output-formats",
        cat: "reference",
        type: "concept",
        name: "Output formats",
        summary: "ascii สำหรับอ่านใน terminal, markdown สำหรับเอกสาร และ json สำหรับข้อมูลเต็ม",
        overview: "`--design-system` เลือกรูปแบบผลได้: `-f ascii` เป็นค่าเริ่มต้นสำหรับดูใน terminal, `-f markdown` สำหรับวางในเอกสาร และ `--json` สำหรับข้อมูลที่เครื่องอ่านได้ ซึ่งมี design system ดิบพร้อมสถานะการ persist อยู่ในนั้น output แบบมนุษย์จะตัด field ยาวที่ 300 ตัวอักษร จึงต้องใช้ `--json` เมื่อต้องการค่าครบ หรือใช้ `--full` เพื่อปิดการตัดใน text output",
        invoke: [
          {
            label: "Markdown สำหรับเอกสาร",
            code: "python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"fintech banking\" --design-system -f markdown"
          },
          {
            label: "JSON สำหรับประมวลผลต่อ",
            code: "python3 .claude/skills/ui-ux-pro-max/scripts/search.py \"SaaS\" --domain style --json"
          }
        ],
        cautions: [
          "`-f` ถูกมองข้ามเมื่อใช้ `--json`",
          "อย่าตัดสินใจจาก field ที่ถูกตัดที่ 300 ตัวอักษร ให้ขอข้อมูลเต็มก่อน",
          "`--json` ของ `--design-system` มีสถานะการ persist ต้องอ่านค่านั้นก่อนสรุปว่าไฟล์ถูกเขียนแล้ว"
        ],
        refs: [doc(MAIN, "SKILL.md — Output Formats"), readme("Design system output is cut off")],
        sourcePath: MAIN
      },
      {
        id: "example-workflow",
        cat: "reference",
        type: "concept",
        name: "Example Workflow",
        summary: "เส้นทางจริงสามคำสั่ง: design system → UX domain → stack guidelines",
        overview: "ตัวอย่างใน SKILL.md เริ่มจากคำขอ \"Make an AI search homepage\" ที่ตรวจพบ stack เป็น Next.js จาก `package.json` ลำดับคือสร้าง design system ด้วยคำที่สื่อ product และ mood, เสริมด้วย domain `ux` เฉพาะ interaction ที่เสี่ยง และปิดท้ายด้วย stack guidelines ของ Next.js สำหรับเรื่อง streaming และ bundle จากนั้นจึงสังเคราะห์ทั้งสามผลเป็น implementation เดียว ตัวอย่างนี้แสดงหลักการจบในสามคำสั่งโดยไม่ต้องค้นซ้ำไปมา",
        invoke: [
          {
            label: "ทั้งสามขั้น",
            code: "# Step 2: design system\npython \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"AI search tool modern minimal\" --design-system -p \"AI Search\"\n\n# Step 3: supplement\npython \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"keyboard focus modal\" --domain ux\n\n# Step 4: stack guidelines\npython \"${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/scripts/search.py\" \"suspense streaming bundle\" --stack nextjs"
          }
        ],
        cautions: [
          "คำค้นในตัวอย่างนี้ผูกกับ Next.js — เปลี่ยน stack ต้องเปลี่ยนคำค้นขั้นที่ 4",
          "ต้องตรวจ stack จากไฟล์จริงก่อนเดินตามตัวอย่าง มิฉะนั้นขั้นที่ 4 จะผิดทั้งขั้น",
          "อย่าคัดลอกผลของตัวอย่างไปใช้กับ product อื่นโดยไม่รันคำสั่งใหม่"
        ],
        refs: [doc(MAIN, "SKILL.md — Example Workflow")],
        sourcePath: MAIN
      },
      {
        id: "tips",
        cat: "reference",
        type: "concept",
        name: "Tips for better results",
        summary: "หนึ่งเจตนา 2-5 คำ, retry ครั้งเดียว, เลือกโหมดให้ตรงงาน และส่ง stack ที่ตรวจได้",
        overview: "คำแนะนำจาก SKILL.md: หนึ่งเจตนาหลักและคำที่มีความหมาย 2-5 คำต่อคำค้น, ลองใหม่หนึ่งครั้งด้วยคำที่แคบลง, ใช้ `--design-system` สำหรับงานใหม่และ `--domain` สำหรับปัญหาเฉพาะ และส่ง stack ที่ตรวจพบเพื่อขอ guideline ของ implementation ตารางท้ายเอกสารชี้ไปยัง `quick-reference.md` สำหรับปัญหาที่พบบ่อย เช่น dark mode contrast, animation, ฟอร์ม, navigation, layout บนจอเล็ก และ performance",
        cautions: [
          "คำค้นยาวที่มีหลายเจตนาจะทำให้อันดับผลเพี้ยน ควรแยกเป็นหลายคำสั่ง",
          "อย่าวนเปลี่ยนคำค้นหลายรอบเมื่อผลไม่ตรง ให้เปลี่ยนโหมดหรือระบุ domain แทน",
          "ตารางใน tips อ้างหัวข้อใน quick-reference ไม่ได้แทนการอ่านกฎเต็มเมื่อต้องตัดสินใจเรื่อง accessibility"
        ],
        refs: [doc(MAIN, "SKILL.md — Tips for Better Results")],
        sourcePath: MAIN
      }
    ],
    idKey: "id",
    filters: "static",
    unit: "รายการ",
    catLabel: { skill: "สกิล", step: "ขั้นตอน", reference: "อ้างอิง" },
    collection: {
      repo: REPO,
      version: "2.15.0",
      license: "MIT",
      verifiedAt: "2026-10-23"
    }
  };
})();
