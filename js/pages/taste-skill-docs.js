/* Page module: taste-skill-docs. Verified against Leonxlnx/taste-skill 2.1.4 (2026-10-23). */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  var REPO = "https://github.com/Leonxlnx/taste-skill";
  var SKILL = REPO + "/blob/main/skills/taste-skill/SKILL.md";

  function refs(label, path) {
    return [{ label: label, href: REPO + "/blob/main/" + path }];
  }

  NS.pages["taste-skill-docs"] = {
    data: [
      {
        id: "design-taste-frontend",
        cat: "setup",
        type: "skill",
        name: "design-taste-frontend",
        summary: "สกิล art direction สำหรับหน้าเว็บและ app screen ที่แจกทิศทางจากงานวิจัย 247 ไซต์ แล้วตรวจผลในเบราว์เซอร์จริง",
        overview: "สกิลเดียวของ repo ทำงานสามชั้น: แจก direction จาก library ที่กลั่นจาก 247 ไซต์ตามวัตถุดิบของลูกค้า, บังคับให้ idea มาจากสิ่งที่มีเฉพาะลูกค้ารายนั้น และปิดท้ายด้วย inspector ที่วัด house rules ใน Chrome จริงที่ 1440, 768 และ 390 พิกเซล ใช้กับ landing page, portfolio, product page, redesign และ app screen โดยไม่ผูกกับ stack — HTML/CSS, React, Next.js, Vue, Svelte, Astro หรือ Tailwind",
        prerequisites: [
          "Node 22+ สำหรับ `inspect.mjs` และ `scenes.mjs`; `draw.mjs`, `lint.mjs`, `assets.mjs` รันบน Node 18+",
          "Chrome, Edge หรือ Chromium ที่ติดตั้งในเครื่อง และตั้ง `CHROME_PATH` ถ้า browser อยู่ที่อื่น",
          "รันคำสั่งจาก root ของโปรเจกต์ เพื่อให้ไฟล์ทำงานลงใน `.taste-skill/` ที่นั่น",
          "`assets.mjs` ต้องต่อเครือข่าย; สคริปต์ทั้งหมดไม่ติดตั้ง dependency และไม่ใช้ API key"
        ],
        invoke: [
          {
            label: "ติดตั้งด้วย npx skills",
            code: 'npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"',
            language: "shell"
          },
          {
            label: "Claude Code plugin",
            code: "/plugin marketplace add Leonxlnx/taste-skill\n/plugin install taste-skill@taste-skill",
            language: "text",
            note: "สกิลอยู่ใต้ namespace `taste-skill:` จึงไม่ชนกับสกิลอื่น; `/plugin update` ใช้อัปเดตภายหลัง"
          },
          {
            label: "แจก direction สำหรับหน้าเว็บ",
            code: 'node <skill>/scripts/draw.mjs --sector <sector> --brief "<one line about the subject>" \\\n  --sections <roles in the order of your argument> [--tone <tone>] [--have <assets>] [--keep palette,type] \\\n  --options 3',
            language: "shell",
            note: "`<skill>` คือโฟลเดอร์ของสกิล; ดูตัวเลือกด้วย `--list sectors` และ `--list roles`"
          },
          {
            label: "ด่านตรวจ",
            code: "node <skill>/scripts/lint.mjs <source files or folder>\nnode <skill>/scripts/inspect.mjs <url or path/to/index.html>",
            language: "shell"
          },
          {
            label: "ค้นภาพจริงจาก open collections",
            code: 'node <skill>/scripts/assets.mjs "<query>"',
            language: "shell",
            note: "`--get <ref>` ดาวน์โหลดภาพพร้อมบันทึก credit; `--credits` พิมพ์รายการ credit สำหรับ footer"
          }
        ],
        examples: [
          {
            title: "หน้าเว็บใหม่จากบรีฟเดียว",
            prompt: "ใช้ design-taste-frontend ช่วยทำ landing page ให้โรงคั่วกาแฟเล็ก ๆ ที่เปิดเฉพาะวันเสาร์ ใช้วัตถุดิบจริงของร้าน ไม่เอา template",
            result: "agent ทำ inventory ก่อน, `draw.mjs` แจก 3 direction จาก 20 แบบ, แล้ว build จาก direction sheet พร้อมภาพจริงที่มี credit"
          },
          {
            title: "รีดีไซน์หน้าที่ดู AI-made",
            prompt: "ใช้ design-taste-frontend หน้านี้ดูเป็น template ช่วย redesign โดยไม่ย้าย stack และเก็บ route กับฟอร์มเดิมไว้",
            result: "agent เก็บ before ด้วย `inspect.mjs --out .taste-skill/before`, lint source แล้วเทียบ after ที่ทุกความกว้าง"
          },
          {
            title: "dashboard ที่ไม่เหมือน template",
            prompt: "ใช้ design-taste-frontend ทำ analytics screen สำหรับทีมขาย 6 คน ให้เห็นว่าดีลไหนกำลังจะหลุด",
            result: "agent อ่าน `references/app-screens.md`, แจก style ด้วย `draw.mjs --app`, แล้วตรวจด้วย `inspect.mjs --app`"
          }
        ],
        cautions: [
          "ไม่มี slash command: สกิลถูกเรียกด้วย natural language จากคำขอของผู้ใช้",
          "`assets.mjs` ใช้ได้เฉพาะภาพที่ licence อนุญาต (CC0, public domain, CC BY, CC BY-SA) และต้องวาง credit บนหน้า; ภาพที่พบไม่ใช่ของลูกค้า",
          "build หนึ่งครั้งใช้เวลาราว 30–45 นาทีและหลายแสน token เมื่อรวม look-and-fix loop",
          "ห้ามอ้างผลตรวจที่ไม่ได้รัน; ถ้าไม่มี Chrome หรือ Node 22 ให้บอกว่า inspector รันไม่ได้"
        ],
        refs: [
          { label: "SKILL.md — the run, house rules, laws", href: SKILL },
          { label: "README — install และวิธีทำงาน v2", href: REPO + "/blob/main/README.md" },
          { label: "CHANGELOG — 2.1.4", href: REPO + "/blob/main/CHANGELOG.md" }
        ],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "inventory",
        cat: "page",
        type: "concept",
        name: "อ่านบรีฟและโปรเจกต์ (Inventory)",
        summary: "จด 8–12 อย่างที่อยู่ในโลกของลูกค้ารายนี้และไม่มีในคู่แข่ง",
        overview: "เริ่มจากสิ่งที่จริง: subject, audience, สิ่งเดียวที่หน้าต้องทำให้เกิด, stack, แบรนด์ที่มีอยู่ และเหนืออื่นใดคือ imagery ที่มีจริง ถ้าคำขอคลุมเครือให้ตัดสินใจและเขียน reading หนึ่งบรรทัดแทนการถาม แล้วจึงทำ inventory 8–12 อย่าง เช่น ความหมายของชื่อ ที่อยู่และ street ตัวเลขในบรีฟ ข้อจำกัด วัสดุและสี พิธีและเวลาเปิด รวมถึงสิ่งพิมพ์ในโลกของมัน รายการนี้เป็นที่มาของ idea ในขั้นที่ 4 และเป็นชุดคำค้นภาพในขั้น build",
        prerequisites: [
          "บรีฟหรือคำขอของผู้ใช้อย่างน้อยหนึ่งประโยค",
          "รู้ stack และแบรนด์ที่มีอยู่ (ถ้ามี)",
          "รู้ว่ามีภาพถ่าย ภาพสินค้า UI จริง หรือเครื่องมือสร้างภาพหรือไม่"
        ],
        cautions: [
          "อย่าวางแผนรอบภาพที่ยังไม่มี; ถ้าโปรเจกต์ไม่มีภาพของตัวเอง ให้ใช้ภาพของโลก subject จาก open collections พร้อม credit",
          "ถามเฉพาะเมื่อข้อมูลที่ขาดบล็อกงานจริง เช่นไม่มีชื่อสินค้า",
          "หน้าที่ชนะใน blind test มาจากรายการนี้ ไม่ใช่ idea ของ category"
        ],
        refs: [{ label: "SKILL.md — 1. Read the brief and the project", href: SKILL }],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "argument",
        cat: "page",
        type: "concept",
        name: "เขียน argument",
        summary: "วางหน้าเป็น claims กับ proof ทีละ section ก่อนมี design",
        overview: "ก่อน design ให้ list หน้าเป็น claims พร้อม proof หนึ่งบรรทัดต่อ section ตามรูปแบบใน `references/copy.md` §1 claims เป็นตัวตัดสินว่ามี section ใดและเรียงอย่างไร section ที่ไม่มี claim ถูกตัดทิ้ง วิธีนี้กันลำดับสำเร็จรูป hero → logos → three features → testimonial → pricing → call to action",
        cautions: [
          "section ที่ไม่มี claim ต้องถูกลบ ไม่ใช่เติมข้อความให้มี",
          "ลำดับ stock คือค่าตั้งต้นที่สกิลนี้มีไว้กัน ไม่ใช่โครงที่ใช้ซ้ำ"
        ],
        refs: [
          { label: "SKILL.md — 2. Write the argument", href: SKILL },
          { label: "references/copy.md — §1", href: REPO + "/blob/main/skills/taste-skill/references/copy.md" }
        ],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "direction",
        cat: "page",
        type: "concept",
        name: "จับ direction",
        summary: "ให้สคริปต์แจก 3 จาก 20 direction แล้วเลือกแบบที่รับวัตถุดิบของลูกค้าได้",
        overview: "`draw.mjs --options 3` แจก 3 direction จาก 20 แบบที่วิจัยมา พร้อมสรุปสั้นของแต่ละแบบ agent ต้องเทียบแต่ละแบบกับ inventory ว่าการ compose แบบไหนรับสิ่งที่ลูกค้ารายนี้มีได้ แล้วเลือกแบบนั้นพร้อมเขียนเหตุผลหนึ่งบรรทัด จากนั้นแจก sheet เต็มด้วย `--direction <id>` ซึ่งให้ type system, palette, hero และ section compositions จาก library ที่กลั่นจาก 247 ไซต์",
        invoke: [
          {
            label: "แจก sheet เต็มของ direction ที่เลือก",
            code: "node <skill>/scripts/draw.mjs <the same arguments, without --options> --direction <chosen id>",
            language: "shell"
          },
          {
            label: "พิมพ์ sheet ที่บันทึกไว้ซ้ำ",
            code: "node <skill>/scripts/draw.mjs --show",
            language: "shell",
            note: "ในเซสชันยาวให้อ่าน sheet ใหม่ก่อน build แต่ละ section"
          }
        ],
        cautions: [
          "Adopt sheet ตามที่แจก อย่าผสมกับ layout ที่คิดไว้เอง; ถ้ารู้สึกไม่คุ้นเคย นั่นคือจุดประสงค์ของมัน",
          "`--redraw` ได้เฉพาะเมื่ออธิบายเหตุผลได้ เช่นขัดแบรนด์หรือต้องใช้ asset ที่ไม่มี และต้องบันทึกทุกครั้งใน report",
          "ภาพจาก open collections ไม่ใช่ของโปรเจกต์ จึงไม่ใส่ใน `--have`; ใส่ `--keep palette,type` เมื่อแบรนด์กำหนดสีหรือฟอนต์ไว้แล้ว"
        ],
        refs: [{ label: "SKILL.md — 3. Draw the direction", href: SKILL }],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "idea",
        cat: "page",
        type: "concept",
        name: "หา idea",
        summary: "เขียนประโยคที่ผูกวัตถุดิบของลูกค้ากับ device ของ direction และผ่าน competitor test",
        overview: "direction บอกวิธี compose แต่ idea ทำให้หน้าเป็นของ subject นี้เท่านั้น agent เขียนประโยค “On this page, [something that belongs to the subject] becomes [the device the direction calls for]” และห้าม build จนเติมทั้งสองช่องได้ ช่องแรกมาจาก output, รูปร่างวัตถุ, ชื่อ, สถานที่, พิธี หรือ opposites ของลูกค้า แล้วผ่าน competitor test: ใส่คู่แข่งที่ใกล้ที่สุดลงไป ถ้ายังใช้ได้ แปลว่า idea เป็นของ category หน้าต้องมี one live thing ที่ทำจาก idea",
        cautions: [
          "`clean and modern` ไม่ใช่ idea; ไซต์ที่คะแนนต่ำที่สุดในงานศึกษาคือหน้าที่ idea เป็นสูตรสำเร็จ",
          "one live thing ต้องใช้เนื้อหาจริงของ subject ทำงานด้วยนิ้วบนมือถือ มี fallback โดยไม่ใช้ script ไม่บล็อกการอ่าน และมีได้อย่างเดียว ไม่ใช่ playground",
          "ห้ามเติม live thing เป็น motion ในขั้น move; มันถูกสร้างเป็นส่วนของหน้าในขั้น build",
          "scroll scene ที่เต็มไปด้วยภาพซึ่งใครก็ได้คือ screensaver ต้องกำหนดว่ามันแสดงอะไรของ subject"
        ],
        refs: [{ label: "SKILL.md — 4. Find the idea", href: SKILL }],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "copy",
        cat: "page",
        type: "concept",
        name: "เขียนคำ (Copy deck)",
        summary: "เขียนทั้งหน้าเป็น copy deck ก่อน markup โดย headline ไม่เกินสองบรรทัดทุกความกว้าง",
        overview: "เขียนหน้าเป็น copy deck plain text ตาม `references/copy.md` ก่อนแตะ markup ทุก headline ต้องไม่เกินสองบรรทัดทุกความกว้าง ประมาณ 32 ตัวอักษรปลอดภัย และค่ามัธยฐานของ hero ในงานศึกษาคือ 5 คำกับ 32 ตัวอักษร มี supporting sentence หนึ่งประโยคใต้ headline 32–48px และเห็นพร้อมกัน มี primary action เดียวที่ตั้งชื่อตามสิ่งที่มันทำ first screen ต้องตอบคำถามแรกด้วยตัวใหญ่ และทุก section ที่ผู้ชมมาเพื่อมันมี heading กับที่ใน navigation ของตัวเอง",
        cautions: [
          "section ที่บางคือสาเหตุอันดับหนึ่งที่หน้าสะอาดแพ้หน้าที่แน่นกว่า ต้องเขียนเนื้อหาให้ครบ",
          "ห้ามแต่ง proof: ไม่มีลูกค้า คำพูด รีวิว press logo หรือสถิติธุรกิจที่ไม่มีจริง",
          "sample detail ที่เติมช่องว่างของบรีฟทำได้ แต่ต้อง list ไว้ใน report ให้ลูกค้ายืนยัน"
        ],
        refs: [
          { label: "SKILL.md — 5. Write the words", href: SKILL },
          { label: "references/copy.md — the two-line arithmetic", href: REPO + "/blob/main/skills/taste-skill/references/copy.md" }
        ],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "build",
        cat: "page",
        type: "concept",
        name: "สร้างหน้า (Build)",
        summary: "สร้างจาก sheet ทีละส่วน เริ่มจาก token และ hero โดยปิด motion ไว้ในหัว",
        overview: "build โดยคิด motion ไว้ตั้งแต่ต้น ลำดับงาน: token สีและ type เป็น CSS custom properties, hero ตาม blueprint ที่ desktop และ phone, แล้วทุก section ด้วยเนื้อหาของโปรเจกต์โดย geometry คงเดิมแต่ subject เปลี่ยน และ section ข้างกันห้ามใช้ layout ซ้ำ ภาพเรียงตามความจริง: ภาพของโปรเจกต์เอง, ภาพที่สร้าง, ภาพจริงของ subject จาก open collections, ภาพวาดในโค้ด, ภาพแจกที่ generic และสุดท้ายคือ type กับสีล้วน",
        cautions: [
          "floor ของ inspector คือภาพจริงอย่างน้อย 4 ภาพ ปกติ 6–12 ภาพ และ SVG ไม่นับ",
          "อย่าเขียนบนหน้าว่าภาพมาจากไหนหรือไม่ใช่ภาพอะไร; caption บอกว่าภาพคืออะไร และ credit ตัวเล็กอยู่ใน footer",
          "frame ต้องมี margin สองข้างเท่ากันทุกความกว้าง ไม่มีช่วงว่างเกินครึ่งจอ และทุก section เปิดด้วย heading",
          "`assets.mjs` ช่วยได้เฉพาะเมื่อมีเครือข่าย; ถ้าค้นไม่ได้ ให้วาดภาพและบอกใน report"
        ],
        refs: [{ label: "SKILL.md — 6. Build it, still", href: SKILL }],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "gate",
        cat: "page",
        type: "concept",
        name: "Gate — ตรวจด้วย lint และ inspector",
        summary: "รัน lint และ inspector จนไม่มี FAIL ที่ 1440, 768 และ 390",
        overview: "`lint.mjs` สแกน source หา pattern และวลีสำเร็จรูปที่ถูกแบน `inspect.mjs` เปิดหน้าใน browser จริงที่ 1440, 768 และ 390 วัด headline line count, ขนาด type, ฟอนต์ที่โหลดจริง, สี, เส้น, shadow, gradient, contrast, overflow และ frame แล้วบันทึก screenshot ไว้ใน `.taste-skill/inspect/` ต้องแก้ทุก FAIL และถือ WARN ว่าผิดถ้าอธิบายให้นักออกแบบฟังไม่ได้ในหนึ่งประโยค แล้วรันซ้ำจนไม่มี FAIL ถ้าหน้าใช้ scroll scene ต้องรัน `scenes.mjs` เพิ่ม",
        invoke: [
          {
            label: "ด่านตรวจของหน้า",
            code: "node <skill>/scripts/lint.mjs <source files or folder>\nnode <skill>/scripts/inspect.mjs <url or path/to/index.html>",
            language: "shell"
          },
          {
            label: "ด่านตรวจของ scroll scene",
            code: "node <skill>/scripts/scenes.mjs <url or path/to/index.html>",
            language: "shell",
            note: "ถ่ายทุก scene ที่ 0, 10 … 100% ของ hold ทั้ง desktop และ phone พร้อมหน้า reduced motion"
          }
        ],
        cautions: [
          "อย่าเถียงกับ meter และอย่าซ่อนสิ่งใดจากมัน",
          "ผ่าน gate แปลว่าวัดแล้วไม่มีของต้องห้าม ไม่ได้แปลว่าหน้าดี; การตัดสินอยู่ที่ขั้น look",
          "ถ้าไม่มี Chrome หรือ Node 22 ให้รัน `lint.mjs` (Node 18+) ใช้ browser tool อื่นถ่าย screenshot แล้วบอกใน report ว่า inspector รันไม่ได้"
        ],
        refs: [
          { label: "SKILL.md — 7. Gate", href: SKILL },
          { label: "scripts/inspect.mjs — usage", href: REPO + "/blob/main/skills/taste-skill/scripts/inspect.mjs" }
        ],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "look",
        cat: "page",
        type: "concept",
        name: "Look — วิจารณ์จาก screenshot",
        summary: "เปิดภาพทุกความกว้าง วิจารณ์ด้วย rubric แล้วแก้สามปัญหาสูงสุด",
        overview: "หลังผ่าน gate ให้เปิด screenshot ที่ inspector list ไว้ทุก viewport ด้วย image viewer หรือ Read tool แล้ววิจารณ์ตาม `references/critique.md` ซึ่งมี 14 pass, คะแนนแบบถ่วงน้ำหนัก Awwwards และ caps เขียน critique ในรูปแบบของมัน แก้สามปัญหาที่สำคัญที่สุด รัน inspector ใหม่ แล้วดูอีกครั้ง สูงสุดสามรอบ และตัดสินจากภาพเท่านั้น: ถ้าเห็นปัญหาใน screenshot มันจริงไม่ว่าโค้ดจะว่าอย่างไร",
        cautions: [
          "อย่าดูแค่ first screen; ต้องเปิดทุกภาพที่ inspector list หลังการแก้ครั้งสุดท้าย",
          "ไม่เกินสามรอบ: ถ้ายังไม่ผ่าน ให้รายงานสิ่งที่ยังขาดแทนการวนต่อ",
          "ปัญหาในภาพคือจริง แม้โค้ดจะดูถูก"
        ],
        refs: [
          { label: "SKILL.md — 8. Look", href: SKILL },
          { label: "references/critique.md — passes, score, caps", href: REPO + "/blob/main/skills/taste-skill/references/critique.md" }
        ],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "move",
        cat: "page",
        type: "concept",
        name: "Move — ชั้น motion",
        summary: "ใส่ motion layer ที่ inspector นับได้อย่างน้อย 8 องค์ประกอบ",
        overview: "motion เป็นส่วนบังคับ: inspector นับ element ที่ขยับตอนโหลดและ scroll และ fail ถ้าต่ำกว่า 8 (เตือนต่ำกว่า 16) layer มีสี่ส่วน: signature move, entrance ของทุก section (heading → text → picture ห่าง 60–90ms ยกขึ้น 16–32px พร้อม opacity), feedback ทุก control และภาพเคลื่อนไหวหนึ่งภาพ ใช้เฉพาะ transform กับ opacity และทุก motion มี fallback `prefers-reduced-motion` ที่เก็บเนื้อหาไว้",
        cautions: [
          "ห้ามใช้ fade ก้อนเดียวทั้งบล็อก และห้ามมีเนื้อหาที่ซ่อนอยู่ถ้า script พัง",
          "motion ที่เปลี่ยนสีหรือ layout ของทั้งหน้าจอเป็นส่วนของ composition ต้องสร้างในขั้น build ไม่ใช่ที่นี่",
          "หลังใส่ motion ต้องรัน inspector อีกครั้งและไล่ดูทุก screenshot หาเนื้อหาที่ไม่โผล่"
        ],
        refs: [
          { label: "SKILL.md — 9. Move", href: SKILL },
          { label: "references/motion.md — tokens และ recipes", href: REPO + "/blob/main/skills/taste-skill/references/motion.md" }
        ],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "report",
        cat: "page",
        type: "concept",
        name: "Report — รายงานและหลักฐาน",
        summary: "รายงานเมื่อหลักฐานครบ: 0 FAIL, ภาพทุกใบถูกเปิด และ critique รอบสุดท้ายเขียนแล้ว",
        overview: "ห้ามรายงานจนกว่าจะผ่านทุกข้อ: `inspect.mjs` 0 FAIL ที่ 1440, 768 และ 390, เปิดทุก screenshot หลังแก้ครั้งสุดท้าย, รัน `scenes.mjs` ถ้ามี scroll scene, คนแปลกหน้าอ่าน first screen 5 วินาทีแล้วบอกได้ว่าคืออะไรและต้องทำอะไร และ critique รอบสุดท้ายตาม `references/critique.md` §4 รายงานสรุป direction พร้อม seed, ประโยค idea กับ live thing, คะแนนและสิ่งที่ยังขาด, ภาพพร้อม credit และเนื้อหาที่ต้องเปลี่ยนก่อน launch",
        cautions: [
          "ห้ามอ้างการตรวจที่ไม่ได้รัน",
          "ทุกข้อในรายการถูกข้ามใน test run ที่ออกมาแย่ จึงข้ามไม่ได้"
        ],
        refs: [
          { label: "SKILL.md — 10. Report", href: SKILL },
          { label: "references/critique.md — §4", href: REPO + "/blob/main/skills/taste-skill/references/critique.md" }
        ],
        sourcePath: "skills/taste-skill/SKILL.md"
      },
      {
        id: "app-screens",
        cat: "app",
        type: "concept",
        name: "App screens — เส้นทางของ dashboard",
        summary: "run แยกสำหรับ dashboard, admin, settings และหน้าจอที่คนทำงานในนั้น",
        overview: "ตัดสินก่อนว่าชิ้นงานเป็น page ที่อ่านและ scroll หรือ app screen ที่คนทำงานในนั้น ถ้าเป็น app screen ต้องอ่าน `references/app-screens.md` ทั้งไฟล์ เพราะมี run แยก: inventory data และ job, ตั้งคำถามหนึ่งข้อของหน้าจอ, แจก style ด้วย `draw.mjs --app`, สร้าง shell, ใส่ data, ทำ state, ตรวจด้วย `lint.mjs --app` และ `inspect.mjs --app` house rules ของ app screen คือ border บาง label เล็ก panel ซ้ำได้ แต่ไม่ใช้ gradient, glow, ไอคอนใน tinted square, rainbow chart หรือตัวเลข vanity",
        invoke: [
          {
            label: "แจก style สำหรับ app screen",
            code: 'node <skill>/scripts/draw.mjs --app --kind <kind> --brief "<one line about the product>" \\\n  --screens <screens> [--theme light|dark] [--keep palette,type] --options 3',
            language: "shell",
            note: "screens: `overview`, `analytics`, `list`, `detail`, `settings`, `wallet`, `builder`, `inbox`, `home`, `report`"
          },
          {
            label: "ด่านตรวจของ app screen",
            code: "node <skill>/scripts/lint.mjs --app <source files or folder>\nnode <skill>/scripts/inspect.mjs --app <url or path/to/index.html>",
            language: "shell",
            note: "sheet ที่แจกด้วย `--app` สลับเครื่องมือทั้งสองเป็นกฎของ app ให้เอง"
          }
        ],
        cautions: [
          "page run ใช้กับ app screen ไม่ได้ และต้องอ่าน `references/app-screens.md` ให้จบก่อนเริ่ม",
          "อย่าสร้างหน้าจอที่ศึกษาในงานศึกษาซ้ำ; เอาโครงจากสิ่งของของผลิตภัณฑ์นั้นแทน",
          "app screen ไม่มี motion floor: motion คือ feedback (press, hover, focus, menu opening) ไม่ใช่ entrance",
          "product site ที่โชว์ app ยังเป็น page; fragment ของ interface ใช้กฎ app และ mark root ด้วย `data-ui`"
        ],
        refs: [
          { label: "references/app-screens.md — run, shell, rules", href: REPO + "/blob/main/skills/taste-skill/references/app-screens.md" },
          { label: "SKILL.md — Page or app screen", href: SKILL }
        ],
        sourcePath: "skills/taste-skill/SKILL.md"
      }
    ],
    idKey: "id",
    unit: "ขั้น",
    catLabel: {
      setup: "ติดตั้งและเรียกใช้",
      page: "เส้นทางหน้าเว็บ",
      app: "เส้นทาง app screen"
    },
    collection: {
      repo: REPO,
      version: "2.1.4",
      license: "MIT",
      verifiedAt: "2026-10-23"
    }
  };
})();
