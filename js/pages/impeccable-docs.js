/* Page module: impeccable-docs. Verified against impeccable.style/docs and pbakaus/impeccable (2026-10-23). */
(function () {
  "use strict";
  const NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  const REPO = "https://github.com/pbakaus/impeccable";
  const DOCS = "https://impeccable.style/docs/";
  const SKILL = "skill/SKILL.src.md";
  const REGISTRY = "crates/foundation/src/registry.rs";

  function fileRef(path, label) {
    return { label: label || path, href: REPO + "/blob/main/" + path };
  }

  function docsRef(path, label) {
    return { label: label || "Impeccable docs", href: DOCS + path };
  }

  function commandRefs(reference) {
    return [fileRef(SKILL, "SKILL.src.md · ตารางคำสั่ง"), fileRef(reference)];
  }

  /* Slash form in Claude Code / Cursor / Copilot; $ form in Codex; pinned shortcut after `/impeccable pin`. */
  function commandInvoke(name, usage) {
    const command = name ? " " + name : "";
    const tail = usage ? " " + usage : "";
    return [
      { label: "Claude Code / Cursor / Copilot", code: "/impeccable" + command + tail, language: "text" },
      {
        label: "Codex CLI",
        code: "$impeccable" + command + tail,
        language: "text",
        note: "Codex ใช้ skills ไม่ใช่ slash command — พิมพ์ $impeccable แล้วตามด้วยคำสั่ง"
      },
      {
        label: "หลัง pin คำสั่งนี้",
        code: "/" + name + tail,
        language: "text",
        note: "เกิดจาก /impeccable pin " + name + " ซึ่งสร้าง shortcut แยกใน harness ที่ติดตั้งไว้"
      }
    ];
  }

  function launcherInvoke(code, note) {
    return [{ label: "Launcher ที่มากับสกิล", code: code, language: "shell", note: note }];
  }

  NS.pages["impeccable-docs"] = {
    data: [
      /* ---------- commands · build ---------- */
      {
        id: "impeccable",
        cat: "command",
        type: "command",
        name: "/impeccable",
        summary: "คำสั่งหลักสำหรับบอกสิ่งที่ต้องการสร้างหรือปรับปรุง โดยไม่ต้องเลือก specialist command เอง",
        overview: "`impeccable` เป็นคำสั่งหลักสำหรับงาน design: ใช้สร้างหน้าใหม่ ปรับปรุงหน้าที่มีอยู่ หรือถามว่าควรเริ่มจากอะไร ระบบอ่าน project context และ surface ที่ระบุ เลือก specialist command เมื่อเหมาะสม ช่วย resolve direction ก่อน build และตรวจผลลัพธ์ตามงานที่ต้องทำ ใช้ `/impeccable` ใน agent ส่วน Codex ใช้ `$impeccable`",
        prerequisites: [
          "ติดตั้ง Impeccable ใน harness แล้ว",
          "มี project folder และ coding tool ที่ติดตั้ง Impeccable แล้ว"
        ],
        invoke: [
          { label: "Claude Code / Cursor / Copilot", code: "/impeccable <สิ่งที่ต้องการทำ>", language: "text" },
          { label: "Codex CLI", code: "$impeccable <สิ่งที่ต้องการทำ>", language: "text", note: "Codex ใช้ skills ไม่ใช่ slash command" }
        ],
        examples: [
          {
            title: "สร้างหน้าใหม่",
            prompt: "/impeccable design a signup page for our monthly book club",
            result: "ช่วยกำหนด direction แล้วสร้างและตรวจหน้า signup"
          },
          {
            title: "ปรับปรุงหน้าที่มีอยู่",
            prompt: "/impeccable polish the pricing page",
            result: "เลือกโฟลว์ refinement และรักษาสิ่งที่ทำงานอยู่แล้ว"
          },
          {
            title: "ยังไม่รู้จะเริ่มอย่างไร",
            prompt: "/impeccable",
            result: "แนะนำขั้นถัดไปพร้อมเหตุผล และรอให้เลือกก่อนเริ่มงาน"
          }
        ],
        cautions: [
          "ไม่ต้องรู้ชื่อ specialist command ก่อนเริ่ม — บอก outcome และ target เป็นภาษาธรรมดาได้",
          "ถ้าต้องการหยุดที่แผนก่อน implementation ให้ใช้ `shape`; ถ้าต้องการรีวิวใช้ `critique`"
        ],
        refs: [docsRef("impeccable/", "Docs · impeccable"), fileRef(SKILL, "SKILL.src.md · ตารางคำสั่ง")],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "shape",
        cat: "command",
        type: "command",
        name: "/impeccable shape",
        summary: "วางแผน UX/UI ก่อนเขียนโค้ด ด้วย discovery interview หลายรอบและ brief ที่ผู้ใช้ยืนยัน",
        overview: "`shape` ตอบคำถามว่าควรสร้างอะไรและควรทำงานอย่างไร ก่อนแตะโค้ดหรือเลือก visual direction ตัว command เดิน discovery interview ทีละสองสามคำถาม ใช้ visual probes เมื่อมี แล้วสรุปเป็น design brief ที่ผู้ใช้ยืนยัน `shape` เป็นเจ้าของ task discovery และจะเข้า new-work เฉพาะเมื่อมีการตัดสินใจเรื่อง visual world หรือ surface concept เท่านั้น",
        prerequisites: [
          "มีโจทย์ฟีเจอร์หรือหน้าจอที่ยังไม่ชัด",
          "พร้อมตอบคำถาม discovery อย่างน้อยหนึ่งรอบ"
        ],
        invoke: commandInvoke("shape", "<feature>"),
        examples: [
          {
            title: "ฟีเจอร์ที่ยังคลุมเครือ",
            prompt: "/impeccable shape อยากได้หน้าสำหรับทีม support ดูสถานะลูกค้า แต่ยังไม่รู้ว่าต้องเห็นอะไรบ้าง",
            result: "ได้คำถามเรื่องผู้ใช้ งานที่ต้องทำ และเกณฑ์สำเร็จ ก่อนสรุปเป็น brief"
          },
          {
            title: "ขอบเขตชัดแล้ว",
            prompt: "/impeccable shape วางโครงหน้า checkout ใหม่ให้เหลือสองขั้นตอน",
            result: "ยืนยันขอบเขตสั้น ๆ แล้วสรุป brief โดยไม่ต้องสัมภาษณ์ยาว"
          },
          {
            title: "ยังไม่ควรเขียนโค้ด",
            prompt: "/impeccable shape ช่วยคิดโครง dashboard ก่อน ยังไม่ต้องแก้ไฟล์",
            result: "จบที่ brief และลำดับหน้าจอ ไม่มีการแก้โค้ดในขั้นนี้"
          }
        ],
        cautions: [
          "shape ไม่เลือก visual direction ให้เอง — การตัดสิน world เป็นของ new-work",
          "อย่ากระโดดไปเขียนโค้ดก่อน brief ถูกยืนยัน เพราะจะเสียจุดประสงค์ของคำสั่งนี้"
        ],
        refs: commandRefs("skill/reference/shape.md"),
        sourcePath: "skill/reference/shape.md"
      },
      {
        id: "init",
        cat: "command",
        type: "command",
        name: "/impeccable init",
        summary: "เก็บ product truth ระยะยาวลง PRODUCT.md และตั้งค่า live mode เมื่อทำได้ — ไม่เขียน DESIGN.md",
        overview: "`init` เป็น setup ครั้งเดียวต่อโปรเจกต์: สำรวจโค้ด ขอเฉพาะข้อมูลผลิตภัณฑ์ที่ยังขาด แล้วเขียน PRODUCT.md ซึ่งเก็บกลุ่มเป้าหมาย วัตถุประสงค์ บริบทการใช้งาน ข้อจำกัด เสียง และหลักฐาน ทุกคำสั่งอื่นอ่านไฟล์นี้ก่อนทำงาน คำสั่งนี้ไม่สร้าง visual world และไม่เขียน DESIGN.md — `document` บันทึก design system ที่มีอยู่ และ new-work สร้างหรือขยาย world ใหม่ `teach` เป็น alias ของ `init`",
        prerequisites: [
          "อยู่ที่ root ของโปรเจกต์ที่ต้องการตั้งค่า",
          "พร้อมตอบคำถามผลิตภัณฑ์หรือยืนยันข้อมูลที่มีอยู่"
        ],
        invoke: commandInvoke("init"),
        examples: [
          {
            title: "โปรเจกต์ใหม่",
            prompt: "/impeccable init",
            result: "ได้ PRODUCT.md ที่มี product truth และคำแนะนำคำสั่งถัดไป"
          },
          {
            title: "มี PRODUCT.md เก่า",
            prompt: "/impeccable init PRODUCT.md ในโปรเจกต์นี้เขียนไว้นานแล้ว ช่วยอัปเดตให้ตรงตอนนี้",
            result: "ถามเฉพาะข้อมูลที่เก่าหรือขาด และไม่เปิดฟิลด์ที่ยืนยันแล้วโดยไม่มีเหตุ"
          },
          {
            title: "มีแต่ DESIGN.md",
            prompt: "/impeccable init โปรเจกต์มี DESIGN.md แล้ว แต่ยังไม่มี PRODUCT.md",
            result: "สร้าง PRODUCT.md โดยไม่แตะ DESIGN.md เดิม"
          }
        ],
        cautions: [
          "init ไม่เขียน DESIGN.md และไม่ควรถูกใช้เป็นข้ออ้างในการเลือก visual direction",
          "ใน monorepo ต้องยืนยันก่อนว่า product truth เป็นของ root หรือของ child app"
        ],
        refs: commandRefs("skill/reference/init.md"),
        sourcePath: "skill/reference/init.md"
      },
      {
        id: "document",
        cat: "command",
        type: "command",
        name: "/impeccable document",
        summary: "สร้าง DESIGN.md จากโค้ดจริง โดยดึงสี ฟอนต์ spacing radius และ pattern ของคอมโพเนนต์",
        overview: "`document` เปลี่ยน design system ที่มีอยู่ในโค้ดให้เป็นเอกสาร อ่าน colors, typography, spacing, radii และ component patterns แล้วขอให้ผู้ใช้ยืนยันภาษาที่ใช้บรรยาย atmosphere และลักษณะของสี ไฟล์ที่ได้ใช้รูปแบบ DESIGN.md ของ Google Stitch เพื่อให้เครื่องมืออื่นอ่านต่อได้ ใช้เมื่อมี UI อยู่แล้วแต่ยังไม่มีสเปกดีไซน์ที่ agent อ่านได้",
        prerequisites: [
          "มีโค้ด UI จริงให้ตรวจ ไม่ใช่แค่คำอธิบาย",
          "ผู้ใช้พร้อมยืนยันคำบรรยายบรรยากาศและสี"
        ],
        invoke: commandInvoke("document"),
        examples: [
          {
            title: "โปรเจกต์มี UI แต่ไม่มีสเปก",
            prompt: "/impeccable document ช่วยสร้าง DESIGN.md จากโค้ดที่มีอยู่ตอนนี้",
            result: "ได้ DESIGN.md ที่สะท้อน token และ pattern จริงในโปรเจกต์"
          },
          {
            title: "ทีมอยากให้ agent รักษาแบรนด์",
            prompt: "/impeccable document อยากให้เอเจนต์ทำงานใหม่แล้วยังตรงธีมเดิม ช่วยบันทึก design system",
            result: "ได้ไฟล์ที่ระบุสี ฟอนต์ ระยะ และคอมโพเนนต์ที่ใช้ซ้ำ"
          },
          {
            title: "ตรวจหลังเปลี่ยนธีม",
            prompt: "/impeccable document เพิ่งเปลี่ยน palette ทั้งหมด ช่วยอัปเดต DESIGN.md ให้ตรง",
            result: "อ่านค่าจากโค้ดปัจจุบันแล้วแก้เอกสารให้ตรงกับของจริง"
          }
        ],
        cautions: [
          "document บันทึกของที่มีอยู่ ไม่ได้ออกแบบใหม่ — ถ้าต้องการ world ใหม่ให้ใช้ new-work",
          "คำบรรยายบรรยากาศต้องมาจากการยืนยันของผู้ใช้ ไม่ใช่การเดาจากสีเพียงอย่างเดียว"
        ],
        refs: commandRefs("skill/reference/document.md"),
        sourcePath: "skill/reference/document.md"
      },
      {
        id: "extract",
        cat: "command",
        type: "command",
        name: "/impeccable extract",
        summary: "ดึง pattern คอมโพเนนต์ และ token ที่ซ้ำกับ design system กลับมาใช้ร่วมกัน",
        overview: "`extract` หา pattern ที่ถูกเขียนซ้ำในโค้ด แล้วรวมเป็นคอมโพเนนต์หรือ token ที่ใช้ร่วมกัน เป้าหมายคือลด drift ระหว่างหน้าจอโดยไม่เปลี่ยนพฤติกรรมหรือหน้าตาที่ผู้ใช้เห็น ใช้เมื่อโค้ดเริ่มมีหลายเวอร์ชันของสิ่งเดียวกัน และต้องการดึงกลับเข้าสู่ระบบเดียว",
        prerequisites: [
          "มี design system หรือ convention ที่จะรวมเข้า",
          "มี pattern ซ้ำอย่างน้อยสองที่ให้เทียบ"
        ],
        invoke: commandInvoke("extract", "<target>"),
        examples: [
          {
            title: "ปุ่มหลายเวอร์ชัน",
            prompt: "/impeccable extract ปุ่มในหน้า settings กับ billing หน้าตาเกือบเหมือนกันแต่โค้ดคนละชุด",
            result: "ระบุความต่างที่ตั้งใจไว้ แล้วรวมส่วนที่ซ้ำเป็นคอมโพเนนต์เดียว"
          },
          {
            title: "สีกระจัดกระจาย",
            prompt: "/impeccable extract ค่าสีเขียนตรง ๆ หลายที่ ช่วยดึงเป็น token",
            result: "ได้ token ที่มีชื่อและแทนค่าซ้ำโดยไม่เปลี่ยนผลลัพธ์บนจอ"
          },
          {
            title: "ก่อนขยายทีม",
            prompt: "/impeccable extract จะมีคนใหม่เข้ามาแก้ UI ช่วยจัดระบบสิ่งที่ใช้ซ้ำก่อน",
            result: "ได้รายการคอมโพเนนต์และ token ที่ควรเป็นแหล่งอ้างอิงเดียว"
          }
        ],
        cautions: [
          "อย่ารวมสิ่งที่หน้าตาคล้ายกันแต่ความหมายต่างกัน — จะทำให้ API ของคอมโพเนนต์คลุมเครือ",
          "extract ต้องไม่เปลี่ยนพฤติกรรมหรือ markup ที่ผู้ใช้เห็นโดยไม่จำเป็น"
        ],
        refs: commandRefs("skill/reference/extract.md"),
        sourcePath: "skill/reference/extract.md"
      },

      /* ---------- commands · evaluate ---------- */
      {
        id: "critique",
        cat: "command",
        type: "command",
        name: "/impeccable critique",
        summary: "รีวิว UX พร้อมคะแนนเชิงปริมาณ persona testing และผลตรวจ anti-pattern",
        overview: "`critique` ประเมินงานออกแบบจากมุม UX: visual hierarchy, information architecture, emotional resonance, cognitive load และคุณภาพโดยรวม ใช้การให้คะแนนเชิงปริมาณ การทดสอบผ่าน persona และ deterministic anti-pattern detection ประกอบกัน ผลลัพธ์เป็น feedback ที่ชี้จุดที่ควรแก้ ไม่ใช่การแก้โค้ดทันที ใช้เมื่อต้องการรู้ว่าหน้าดีแค่ไหนและอะไรควรถูกจัดการก่อน",
        prerequisites: [
          "มีหน้า จอ หรือคอมโพเนนต์ที่รันหรือดูได้",
          "รู้กลุ่มผู้ใช้หรือ persona ที่จะใช้ประเมิน"
        ],
        invoke: commandInvoke("critique", "landing"),
        examples: [
          {
            title: "ตรวจหน้า landing ก่อนเปิดตัว",
            prompt: "/impeccable critique landing",
            result: "ได้รีวิวพร้อมคะแนนแยกด้านและรายการจุดที่กระทบความเข้าใจ"
          },
          {
            title: "จอที่ผู้ใช้บอกว่าหลงทาง",
            prompt: "/impeccable critique ผู้ใช้ชอบถามว่าตอนนี้อยู่ตรงไหนของ flow ช่วยรีวิว UX ให้หน่อย",
            result: "ตรวจ hierarchy และ wayfinding แล้วชี้จุดที่ทำให้ตำแหน่งไม่ชัด"
          },
          {
            title: "เทียบสองทางเลือก",
            prompt: "/impeccable critique มีสองเลย์เอาต์ของหน้าเดียวกัน ช่วยเทียบว่าอันไหนสื่อ intent กว่า",
            result: "ได้คะแนนและเหตุผลเทียบกัน ไม่ใช่แค่ความเห็นว่าแบบไหนสวยกว่า"
          }
        ],
        cautions: [
          "critique เป็นการประเมิน ไม่ได้แก้โค้ด — ต้องสั่งคำสั่งอื่นเพื่อลงมือ",
          "คะแนนเป็นเครื่องมือสื่อสาร ไม่ใช่หลักประกันคุณภาพแทนการดูของจริง"
        ],
        refs: commandRefs("skill/reference/critique.md"),
        sourcePath: "skill/reference/critique.md"
      },
      {
        id: "audit",
        cat: "command",
        type: "command",
        name: "/impeccable audit",
        summary: "ตรวจคุณภาพเทคนิค accessibility performance theming responsive และ anti-pattern พร้อม severity P0–P3",
        overview: "`audit` เป็น code-level audit ไม่ใช่ design critique: ตรวจสิ่งที่วัดและพิสูจน์ได้ใน implementation ครอบคลุม accessibility, performance, theming, responsive design และ anti-patterns แล้วออกรายงานพร้อมคะแนนและระดับความรุนแรง P0–P3 เพื่อให้คำสั่งอื่นแก้ต่อ คำสั่งนี้ไม่แก้ปัญหาเอง บนโปรเจกต์ native (ios/android/adaptive) จะใช้ reference คนละไฟล์กับเว็บ",
        prerequisites: [
          "มีโค้ดและ environment ที่รันหรือเรนเดอร์หน้าได้",
          "รู้ขนาดจอและ platform ที่ต้องรองรับ"
        ],
        invoke: commandInvoke("audit", "blog"),
        examples: [
          {
            title: "ตรวจก่อนปล่อย",
            prompt: "/impeccable audit blog",
            result: "ได้รายงานแยกด้านพร้อม severity และแผนแก้ตามลำดับความสำคัญ"
          },
          {
            title: "สงสัยเรื่อง accessibility",
            prompt: "/impeccable audit ช่วยตรวจว่าหน้านี้ใช้คีย์บอร์ดได้ครบและคอนทราสต์ผ่านไหม",
            result: "ตรวจ focus order, label, semantic HTML และอัตราส่วนคอนทราสต์ในโค้ดจริง"
          },
          {
            title: "หน้าช้าบนมือถือ",
            prompt: "/impeccable audit หน้านี้กระตุกบนมือถือ ช่วยหาปัญหาด้าน performance",
            result: "ชี้ layout thrashing, animation ที่มีราคาแพง และ asset ที่ยังไม่ปรับ"
          }
        ],
        cautions: [
          "audit ไม่แก้โค้ด — ผลลัพธ์คือรายการปัญหาและแผน",
          "ผลตรวจที่สะอาดไม่ได้ยืนยันคุณภาพเชิงภาพหรือประสบการณ์ ต้องดูของจริงประกอบ"
        ],
        refs: commandRefs("skill/reference/audit.md"),
        sourcePath: "skill/reference/audit.md"
      },

      /* ---------- commands · refine ---------- */
      {
        id: "polish",
        cat: "command",
        type: "command",
        name: "/impeccable polish",
        summary: "รอบสุดท้ายก่อน ship: จัด alignment spacing consistency และ micro-detail โดยรักษา world เดิม",
        overview: "`polish` เป็น refinement ไม่ใช่ redesign ที่ซ่อนมา: รักษา visual world, เนื้อหา, พฤติกรรม และทุกอย่างนอก scope เริ่มจากอ่าน DESIGN.md และ token/คอมโพเนนต์ที่ใช้จริง จำแนก drift ว่าเป็น missing token, one-off implementation, conceptual mismatch หรือ local defect แล้วแก้ที่ระดับที่แคบที่สุด ใช้เมื่อฟีเจอร์เสร็จและกำลังจะส่งงาน",
        prerequisites: [
          "ฟีเจอร์ทำงานครบและพร้อมตรวจรอบสุดท้าย",
          "เข้าถึง design system หรือ convention ของโปรเจกต์"
        ],
        invoke: commandInvoke("polish", "settings"),
        examples: [
          {
            title: "ก่อน ship",
            prompt: "/impeccable polish settings",
            result: "เก็บระยะ การจัดแนว และความสม่ำเสมอ โดยไม่เปลี่ยนโครงหรือโทนของหน้า"
          },
          {
            title: "หน้าดูไม่เนียน",
            prompt: "/impeccable polish ทุกอย่างทำงานได้แต่หน้าดูไม่เรียบร้อย ช่วยเก็บรายละเอียด",
            result: "แก้ drift ที่ระดับ token หรือคอมโพเนนต์ พร้อมระบุสิ่งที่ตั้งใจปล่อยไว้"
          },
          {
            title: "ทีมขอให้เข้ากับระบบ",
            prompt: "/impeccable polish ช่วยทำให้หน้าใหม่นี้ใช้ pattern เดียวกับหน้าอื่นในแอป",
            result: "เทียบกับระบบเดิมแล้วแก้เฉพาะจุดที่หลุด โดยไม่รื้อแนวคิดของหน้า"
          }
        ],
        cautions: [
          "ถ้าแนวคิดของหน้าเองผิด polish ไม่ใช่เครื่องมือแก้ — ควรใช้ bolder/quieter หรือ redesign",
          "ผลจาก detector เป็นหลักฐานของ defect ไม่ใช่หลักประกันคุณภาพ ต้องดูผลเรนเดอร์จริง"
        ],
        refs: commandRefs("skill/reference/polish.md"),
        sourcePath: "skill/reference/polish.md"
      },
      {
        id: "bolder",
        cat: "command",
        type: "command",
        name: "/impeccable bolder",
        summary: "เพิ่มความกล้าและจุดยืนให้ดีไซน์ที่ปลอดภัยหรือจืดเกินไป โดยยังใช้งานได้",
        overview: "`bolder` amplify งานที่ดู bland, generic หรือปลอดภัยเกินไป ให้มี visual impact และ character มากขึ้น โดยคง usability และโครงข้อมูลเดิม ใช้เมื่อหน้า \"ถูกต้องแต่จำไม่ได้\" หรือเมื่อแบรนด์ต้องการเสียงที่ชัดขึ้น คำสั่งนี้ไม่ใช่การเปลี่ยน world ทั้งหมด — ถ้า concept ผิดตั้งแต่ต้น ต้องใช้ new-work",
        prerequisites: [
          "มีหน้าและ visual direction ที่จะ amplify",
          "รู้ว่าความกล้าที่เพิ่มต้องไม่ทำลาย usability"
        ],
        invoke: commandInvoke("bolder", "<target>"),
        examples: [
          {
            title: "การ์ด pricing ที่จืด",
            prompt: "/impeccable bolder การ์ด pricing ดูเหมือนเทมเพลตทั่วไป ช่วยทำให้มีจุดยืนขึ้น",
            result: "เพิ่มน้ำหนักให้ focal point และรายละเอียดที่มีเหตุผล โดยไม่เพิ่มความรก"
          },
          {
            title: "hero ที่ไม่น่าจำ",
            prompt: "/impeccable bolder hero หน้านี้ปลอดภัยเกินไป อยากให้กล้าขึ้นแต่อ่านง่าย",
            result: "ปรับลำดับสายตา ขนาด และการใช้สีให้ชัดขึ้นโดยคงข้อความและ action เดิม"
          },
          {
            title: "แบรนด์ต้องการเสียงชัด",
            prompt: "/impeccable bolder หน้า about ดูเหมือนบริษัทไหนก็ได้ ช่วยเพิ่ม character",
            result: "เลือกการเคลื่อนไหวหรือรายละเอียดหนึ่งจุดที่สื่อแบรนด์ แทนการตกแต่งทั้งหน้า"
          }
        ],
        cautions: [
          "ความกล้าไม่ใช่การเพิ่มเอฟเฟกต์ทุกจุด — ต้องมีจุดโฟกัสเดียวที่ชัด",
          "ถ้าปัญหาคือแนวคิดหลัก ไม่ใช่ความเข้มของงาน ต้องใช้ new-work ไม่ใช่ bolder"
        ],
        refs: commandRefs("skill/reference/bolder.md"),
        sourcePath: "skill/reference/bolder.md"
      },
      {
        id: "quieter",
        cat: "command",
        type: "command",
        name: "/impeccable quieter",
        summary: "ลดความรุนแรงของดีไซน์ที่ตะโกนหรือกระตุ้นเกินไป โดยรักษาคุณภาพและลำดับสายตา",
        overview: "`quieter` ทำงานตรงข้ามกับ `bolder`: ลด intensity ของสี เสียง และการเคลื่อนไหวที่แย่งความสนใจ โดยไม่ทำให้งานแบนหรือสูญเสียลำดับชั้น ใช้เมื่อหน้าดู overwhelming, aggressive หรือ garish และเมื่อผู้ใช้ต้องอยู่ในหน้านาน ๆ คำสั่งนี้รักษาโครงและเนื้อหาเดิม",
        prerequisites: [
          "มีหน้าที่รู้สึกว่าตะโกนเกินไป",
          "รู้ action หรือข้อมูลที่ต้องยังเด่นอยู่"
        ],
        invoke: commandInvoke("quieter", "<target>"),
        examples: [
          {
            title: "หน้าวุ่นวาย",
            prompt: "/impeccable quieter หน้า dashboard มีสีและ animation เยอะจนเหนื่อยตา ช่วยทำให้สงบลง",
            result: "ลดสิ่งเร้าที่ไม่จำเป็นและคงจุดที่ต้องมองไว้หนึ่งจุด"
          },
          {
            title: "ปุ่มแข่งกันเด่น",
            prompt: "/impeccable quieter ทุกปุ่มในหน้านี้ดูสำคัญเท่ากันหมด ช่วยจัดลำดับให้ชัด",
            result: "เหลือ primary action เดียว ที่เหลือถอยด้วยน้ำหนักและสี"
          },
          {
            title: "โทนแรงเกินแบรนด์",
            prompt: "/impeccable quieter หน้า campaign นี้ดู aggressive เกินแบรนด์ ช่วยปรับให้ refined",
            result: "ปรับ palette และ motion ให้เบาลงโดยไม่เสียข้อความขายหลัก"
          }
        ],
        cautions: [
          "อย่าลดจนทุกอย่างเท่ากัน — ต้องเหลือ hierarchy ที่อ่านออก",
          "ถ้าต้องการเปลี่ยนภาพลักษณ์ทั้งระบบ ให้ใช้ new-work ไม่ใช่ quieter"
        ],
        refs: commandRefs("skill/reference/quieter.md"),
        sourcePath: "skill/reference/quieter.md"
      },
      {
        id: "distill",
        cat: "command",
        type: "command",
        name: "/impeccable distill",
        summary: "ตัดความซับซ้อนที่ไม่จำเป็นออก ให้เหลือแก่นของหน้าและการกระทำหลัก",
        overview: "`distill` ลดจำนวนองค์ประกอบ ข้อความ และชั้นข้อมูลที่ไม่ช่วยให้ผู้ใช้ทำงานเสร็จ เป้าหมายไม่ใช่การทำให้ว่าง แต่คือการทำให้สิ่งที่เหลือชัดและทำงานได้จริง ใช้เมื่อหน้ามีอะไรมากกว่าที่งานต้องการ หรือเมื่อหลายส่วนแย่งความสนใจจาก action หลัก",
        prerequisites: [
          "รู้ว่าผู้ใช้ต้องทำอะไรบนหน้านี้",
          "มีอำนาจตัดสินใจว่าจะเอาอะไรออก"
        ],
        invoke: commandInvoke("distill", "<target>"),
        examples: [
          {
            title: "หน้า settings ยาวเกิน",
            prompt: "/impeccable distill หน้า settings มีตัวเลือกเยอะมาก ช่วยตัดให้เหลือสิ่งที่ใช้จริง",
            result: "จัดกลุ่มตัวเลือกที่จำเป็นและย้ายหรือซ่อนส่วนที่ไม่ได้ใช้บ่อย"
          },
          {
            title: "การ์ดข้อมูลซ้ำ",
            prompt: "/impeccable distill หน้า report มีการ์ดหลายใบที่พูดเรื่องเดียวกัน ช่วยลดความซ้ำ",
            result: "รวมข้อมูลเป็นชุดเดียวและใช้พื้นที่ว่างให้ทำงานแทนกรอบ"
          },
          {
            title: "คำอธิบายยืดเยื้อ",
            prompt: "/impeccable distill ข้อความในหน้า onboarding ยาวจนไม่มีใครอ่าน ช่วยทำให้กระชับ",
            result: "เหลือข้อความที่บอกการกระทำและผลลัพธ์ โดยไม่เสียข้อมูลจำเป็น"
          }
        ],
        cautions: [
          "การตัดต้องไม่ทำให้ผู้ใช้ขาดข้อมูลที่ต้องใช้ตัดสินใจ",
          "distill ไม่ใช่การลบฟีเจอร์ — ถ้าต้องเปลี่ยนพฤติกรรม ต้องตกลงกับเจ้าของผลิตภัณฑ์ก่อน"
        ],
        refs: commandRefs("skill/reference/distill.md"),
        sourcePath: "skill/reference/distill.md"
      },
      {
        id: "harden",
        cat: "command",
        type: "command",
        name: "/impeccable harden",
        summary: "ทำ UI ให้พร้อม production: error handling, i18n, ข้อความล้น และ edge case จากข้อมูลจริง",
        overview: "`harden` เตรียมหน้าให้ทนข้อมูลจริง: สถานะผิดพลาด ข้อความยาว การแปลหลายภาษา จำนวนรายการที่เปลี่ยน และ input ที่ไม่คาดคิด ตรวจทั้ง empty, loading, error และ partial state รวมถึงข้อความที่ล้นกรอบและ locale ที่รองรับ ใช้เมื่อฟีเจอร์ใกล้เสร็จและต้องการกันปัญหาที่จะโผล่ตอนใช้จริง",
        prerequisites: [
          "มีฟีเจอร์ที่ทำงานใน happy path แล้ว",
          "รู้ภาษาและขนาดข้อมูลที่ต้องรองรับ"
        ],
        invoke: commandInvoke("harden", "checkout"),
        examples: [
          {
            title: "ฟอร์ม checkout",
            prompt: "/impeccable harden checkout",
            result: "เพิ่มสถานะผิดพลาด ข้อความ validation และกรณีข้อมูลไม่ครบ"
          },
          {
            title: "รองรับหลายภาษา",
            prompt: "/impeccable harden หน้านี้จะเปิดใช้ภาษาไทยและเยอรมัน ช่วยกันข้อความล้น",
            result: "ตรวจความยาวข้อความที่แปลแล้วและปรับ layout ให้รับได้"
          },
          {
            title: "ข้อมูลจาก API ไม่คงที่",
            prompt: "/impeccable harden บางครั้ง API ส่งรายการว่างหรือฟิลด์หาย ช่วยทำให้หน้าไม่พัง",
            result: "มี empty state, fallback และข้อความที่บอกผู้ใช้เมื่อข้อมูลมาไม่ครบ"
          }
        ],
        cautions: [
          "อย่าเติมข้อความ error ที่เดาสาเหตุ — ต้องตรงกับสิ่งที่ระบบรู้จริง",
          "การรองรับ i18n ต้องรวมการเรียงลำดับและรูปแบบตัวเลข ไม่ใช่แค่คำแปล"
        ],
        refs: commandRefs("skill/reference/harden.md"),
        sourcePath: "skill/reference/harden.md"
      },
      {
        id: "onboard",
        cat: "command",
        type: "command",
        name: "/impeccable onboard",
        summary: "ออกแบบ first-run flow, empty state และเส้นทางไปถึงคุณค่าแรก",
        overview: "`onboard` ครอบคลุม welcome screen, การตั้งค่าบัญชี, progressive disclosure, contextual tooltip, การประกาศฟีเจอร์ และช่วง activation เป้าหมายคือพาผู้ใช้ใหม่ไปถึงคุณค่าของผลิตภัณฑ์โดยไม่ยัดข้อมูลทั้งหมดพร้อมกัน ใช้เมื่อคนเพิ่งเริ่มใช้และยังไม่รู้ว่าจะเริ่มตรงไหน หรือเมื่อมีคนสมัครแล้วไม่กลับมา",
        prerequisites: [
          "รู้คุณค่าหลักที่ผู้ใช้ควรได้รับครั้งแรก",
          "รู้ข้อมูลใดที่ต้องเก็บก่อนใช้ฟีเจอร์"
        ],
        invoke: commandInvoke("onboard", "<target>"),
        examples: [
          {
            title: "ผู้ใช้ใหม่หลุดกลางทาง",
            prompt: "/impeccable onboard คนสมัครแล้วส่วนใหญ่ไม่สร้างโปรเจกต์แรก ช่วยออกแบบ onboarding",
            result: "ได้ลำดับขั้นที่พาไปถึงการสร้างชิ้นงานแรก พร้อม empty state ที่บอกทาง"
          },
          {
            title: "หน้ายังว่างหลังสมัคร",
            prompt: "/impeccable onboard หน้า dashboard ว่างเปล่าสำหรับผู้ใช้ใหม่ ดูไม่ออกว่าต้องทำอะไร",
            result: "มี empty state ที่เสนอ action แรกและอธิบายผลที่จะได้"
          },
          {
            title: "ขอสิทธิ์ก่อนใช้",
            prompt: "/impeccable onboard แอปต้องขอ permission หลายอย่างตอนเปิดครั้งแรก ช่วยจัดลำดับให้ไม่น่ากดหนี",
            result: "ขอเฉพาะสิทธิ์ที่จำเป็นต่อขั้นแรก และเลื่อนส่วนที่เหลือไปตอนใช้จริง"
          }
        ],
        cautions: [
          "อย่าใช้ onboarding แก้ปัญหาที่แท้จริงคือ UI หลักซับซ้อนเกินไป",
          "อย่าขอ permission หรือข้อมูลก่อนที่ผู้ใช้เห็นคุณค่า"
        ],
        refs: commandRefs("skill/reference/onboard.md"),
        sourcePath: "skill/reference/onboard.md"
      },

      /* ---------- commands · enhance ---------- */
      {
        id: "animate",
        cat: "command",
        type: "command",
        name: "/impeccable animate",
        summary: "เพิ่ม motion ที่มีเหตุผล: บอกที่มา ทิศทาง และจังหวะ ไม่ใช่แค่ใส่ transition",
        overview: "`animate` เพิ่ม animation, micro-interaction และ motion effect ที่ช่วยให้ผู้ใช้เข้าใจการเปลี่ยนแปลงของ state ทิศทางของความสัมพันธ์ และจุดที่ควรสนใจ ตรวจทั้งระยะเวลา easing และผลต่อผู้ใช้ที่ลด motion ใช้เมื่อ UI ตอบสนองแข็งหรือขาดการนำสายตา ตัว motion ต้องมีเหตุผลเชิงการใช้งาน ไม่ใช่ของประดับ",
        prerequisites: [
          "มี state หรือการเปลี่ยนหน้าจอที่ต้องสื่อสาร",
          "รู้ข้อกำหนด prefers-reduced-motion ของโปรเจกต์"
        ],
        invoke: commandInvoke("animate", "<target>"),
        examples: [
          {
            title: "เมนูเปิดแบบทื่อ",
            prompt: "/impeccable animate เมนู sidebar เปิดมาทันทีจนดูแข็ง ช่วยเพิ่ม motion ที่เหมาะ",
            result: "ได้ transition ที่บอกทิศทางและความสัมพันธ์ โดยยังเคารพ reduced motion"
          },
          {
            title: "ผู้ใช้ไม่รู้ว่าบันทึกแล้ว",
            prompt: "/impeccable animate กด save แล้วไม่มีสัญญาณอะไรเลย ช่วยเพิ่ม feedback",
            result: "มี micro-interaction สั้น ๆ ที่ยืนยันผลโดยไม่หน่วงงาน"
          },
          {
            title: "รายการเปลี่ยนลำดับ",
            prompt: "/impeccable animate พอเพิ่มรายการใหม่ ตารางกระโดดจนตามไม่ทัน",
            result: "ใช้ motion อธิบายการย้ายตำแหน่งแทนการเปลี่ยนทันที"
          }
        ],
        cautions: [
          "อย่าใส่ animation กับทุก element — motion ที่ไม่มีเหตุผลทำให้งานดูไม่น่าเชื่อถือ",
          "ต้องมีทางเลือกสำหรับผู้ใช้ที่ตั้ง prefers-reduced-motion และต้องไม่ทำข้อมูลหาย"
        ],
        refs: commandRefs("skill/reference/animate.md"),
        sourcePath: "skill/reference/animate.md"
      },
      {
        id: "colorize",
        cat: "command",
        type: "command",
        name: "/impeccable colorize",
        summary: "ใส่สีเชิงกลยุทธ์ให้ UI ที่ขาวดำหรือจืดชืด โดยมีบทบาทของสีชัดเจน",
        overview: "`colorize` เพิ่มสีให้หน้าจอที่ monotone หรือขาดความหมาย โดยกำหนดบทบาทของสี เช่น surface, accent, state และ hierarchy ก่อนเลือกค่า เป้าหมายคือทำให้สีช่วยสื่อสาร ไม่ใช่เติมความสดใสแบบสุ่ม ใช้เมื่อแบรนด์หายไปจากหน้าจอหรือเมื่อทุกระดับใช้สีเดียวกันจนแยกไม่ออก",
        prerequisites: [
          "มี palette หรือข้อจำกัดสีของแบรนด์",
          "รู้สถานะและความหมายที่สีต้องสื่อ"
        ],
        invoke: commandInvoke("colorize", "<target>"),
        examples: [
          {
            title: "หน้าจอเทาทั้งหน้า",
            prompt: "/impeccable colorize หน้า app ดูจืดและแยกส่วนไม่ออก ช่วยใส่สีอย่างมีเหตุผล",
            result: "ได้ accent และสีสถานะที่มีบทบาทชัด โดยคงพื้นอ่านง่าย"
          },
          {
            title: "แบรนด์หายไป",
            prompt: "/impeccable colorize หน้า billing ไม่มีสีแบรนด์เลย ดูเหมือนเครื่องมือทั่วไป",
            result: "เลือกจุดที่สีแบรนด์ควรเด่นและปล่อยพื้นที่อ่านให้สงบ"
          },
          {
            title: "สีสถานะชนกัน",
            prompt: "/impeccable colorize สี success กับ warning ในหน้านี้แยกยาก ช่วยจัดระบบสีใหม่",
            result: "แยกความหมายของสีและตรวจคอนทราสต์ของข้อความบนสีนั้น"
          }
        ],
        cautions: [
          "อย่าใช้สีเป็นตัวเดียวที่บอกความหมาย — ต้องมีข้อความหรือรูปทรงประกอบ",
          "ต้องตรวจคอนทราสต์ โดยเฉพาะข้อความเทบบนพื้นสี"
        ],
        refs: commandRefs("skill/reference/colorize.md"),
        sourcePath: "skill/reference/colorize.md"
      },
      {
        id: "typeset",
        cat: "command",
        type: "command",
        name: "/impeccable typeset",
        summary: "แก้ฟอนต์ ลำดับชั้น ขนาด น้ำหนัก และความอ่านง่ายให้ดูตั้งใจ",
        overview: "`typeset` จัดการการเลือกฟอนต์ ลำดับชั้นของตัวอักษร ขนาด น้ำหนัก และความยาวบรรทัด เพื่อให้ข้อความสื่อลำดับความสำคัญและอ่านสบาย ใช้เมื่อตัวอักษรแบน ไม่มีลำดับ หรืออ่านยาก คำสั่งนี้ทำงานกับ type system ที่มีอยู่ ไม่ใช่เปลี่ยนแบรนด์ทั้งชุด",
        prerequisites: [
          "มีฟอนต์หรือข้อจำกัดด้านแบรนด์ที่ใช้อยู่",
          "รู้ขนาดจอและบริบทการอ่านหลัก"
        ],
        invoke: commandInvoke("typeset", "<target>"),
        examples: [
          {
            title: "หัวข้อกับเนื้อหาใกล้กันเกิน",
            prompt: "/impeccable typeset หัวข้อกับย่อหน้าในหน้านี้ขนาดใกล้กันจนแยกไม่ออก",
            result: "ได้ขั้นของขนาดและน้ำหนักที่สร้างลำดับชัดโดยไม่ต้องเพิ่มสี"
          },
          {
            title: "อ่านยาวแล้วเหนื่อย",
            prompt: "/impeccable typeset หน้าบทความอ่านนานแล้วล้า ช่วยปรับการตั้งตัวอักษร",
            result: "ปรับ measure, line-height และขนาดตัวอักษรให้เหมาะกับการอ่านต่อเนื่อง"
          },
          {
            title: "ฟอนต์ดูเหมือนเทมเพลต",
            prompt: "/impeccable typeset ฟอนต์หน้านี้ดูเหมือนเทมเพลต AI ทั่วไป ช่วยเลือกแนวทางที่เหมาะกับแบรนด์",
            result: "ตัดสินจาก brief และคู่ฟอนต์ที่มีเหตุผล ไม่ใช่ตามกระแส"
          }
        ],
        cautions: [
          "อย่าเปลี่ยนฟอนต์เพียงเพื่อหนี detector — brief ของแบรนด์มาก่อน",
          "ตรวจทั้งการตัดคำ ภาษาไทย/อังกฤษปนกัน และน้ำหนักที่โหลดจริง"
        ],
        refs: commandRefs("skill/reference/typeset.md"),
        sourcePath: "skill/reference/typeset.md"
      },
      {
        id: "layout",
        cat: "command",
        type: "command",
        name: "/impeccable layout",
        summary: "แก้กริด ระยะห่าง จังหวะ และลำดับสายตาที่ทำให้หน้าแน่นหรือลอย",
        overview: "`layout` จัดการ spacing, grid, alignment และ visual rhythm เพื่อให้ความสัมพันธ์ระหว่างส่วนต่าง ๆ อ่านออก ใช้เมื่อหน้าแน่นเกินไป ลอยเกินไป ไม่มีจุดโฟกัส หรือกริดซ้ำจนน่าเบื่อ คำสั่งนี้ปรับ composition ของสิ่งที่มีอยู่ ไม่ได้เปลี่ยนเนื้อหาหรือแนวคิดของหน้า",
        prerequisites: [
          "มีหน้าและเนื้อหาที่จะจัดวาง",
          "รู้ขนาดจอหลักที่ต้องรองรับ"
        ],
        invoke: commandInvoke("layout", "<target>"),
        examples: [
          {
            title: "ทุกส่วนห่างเท่ากัน",
            prompt: "/impeccable layout หน้า pricing มีระยะห่างเท่ากันทุกช่วงจนอ่านไม่ออกว่าอะไรคู่กัน",
            result: "จัดกลุ่มด้วยระยะที่ต่างกันและสร้างจังหวะแนวตั้งที่ชัด"
          },
          {
            title: "ไม่มีจุดโฟกัส",
            prompt: "/impeccable layout หน้าแรกไม่มีอะไรนำสายตา ทุกส่วนหนักเท่ากัน",
            result: "กำหนดจุดโฟกัสและลดน้ำหนักของส่วนรอง"
          },
          {
            title: "จอเล็กแน่น",
            prompt: "/impeccable layout หน้านี้พอเปิดบนมือถือแล้วอึดอัดมาก ช่วยจัด layout ใหม่",
            result: "ปรับกริดและลำดับเนื้อหาให้ทำงานที่ความกว้างเล็กโดยไม่ซ่อนข้อมูลสำคัญ"
          }
        ],
        cautions: [
          "อย่าแก้ layout ด้วยการลดระยะจนแตะพื้นที่กดยาก",
          "การเปลี่ยนลำดับเนื้อหาต้องไม่ทำให้ความหมายหรือลำดับการอ่านเสีย"
        ],
        refs: commandRefs("skill/reference/layout.md"),
        sourcePath: "skill/reference/layout.md"
      },
      {
        id: "delight",
        cat: "command",
        type: "command",
        name: "/impeccable delight",
        summary: "เพิ่ม personality และช่วงเวลาที่น่าจำ โดยไม่รบกวนงานหลัก",
        overview: "`delight` เติมความเป็นตัวตนและรายละเอียดที่น่าจำให้หน้าที่ทำงานถูกต้องอยู่แล้ว ใช้เมื่อความถูกต้องครบแต่ยังไม่มีความรู้สึกถึงแบรนด์ รายละเอียดที่เพิ่มต้องไม่ขวางการทำงาน ไม่หน่วง และไม่ทำให้ผู้ใช้ต้องเรียนรู้ใหม่ ใช้ร่วมกับ motion หรือ microcopy ได้เมื่อมีเหตุผลรองรับ",
        prerequisites: [
          "งานหลักทำงานครบและเข้าใจง่ายแล้ว",
          "รู้ขอบเขตของแบรนด์ที่อนุญาตให้เล่นได้"
        ],
        invoke: commandInvoke("delight", "<target>"),
        examples: [
          {
            title: "หน้าที่ถูกแต่จำไม่ได้",
            prompt: "/impeccable delight หน้า success ทำงานถูกแต่ไม่มีอะไรน่าจำ ช่วยเพิ่ม personality",
            result: "ได้รายละเอียดเล็กหนึ่งจุดที่สอดกับแบรนด์และไม่ขวางงาน"
          },
          {
            title: "microcopy แห้ง",
            prompt: "/impeccable delight ข้อความตอนบันทึกเสร็จแข็งมาก ช่วยทำให้มีชีวิตขึ้นโดยยังสุภาพ",
            result: "ปรับเสียงข้อความให้สอดกับแบรนด์และยังบอกผลลัพธ์ชัด"
          },
          {
            title: "empty state น่าเบื่อ",
            prompt: "/impeccable delight หน้าว่างของผู้ใช้ใหม่ดูเหมือน error ช่วยทำให้เป็นจุดเริ่มที่ดี",
            result: "ได้ empty state ที่ชวนเริ่มงานและอธิบายว่าจะเกิดอะไรต่อ"
          }
        ],
        cautions: [
          "อย่าแลกความเร็วหรือความชัดกับความน่ารักของรายละเอียด",
          "delight ต้องไม่กลายเป็น noise ในหน้าประเภท Operate หรือ Read"
        ],
        refs: commandRefs("skill/reference/delight.md"),
        sourcePath: "skill/reference/delight.md"
      },
      {
        id: "overdrive",
        cat: "command",
        type: "command",
        name: "/impeccable overdrive",
        summary: "ผลลัพธ์เทคนิคที่เกินขีดจำกัดปกติ เช่น shader, spring physics หรือ scroll-driven reveal",
        overview: "`overdrive` ใช้เมื่อหน้าต้องมีช่วงเวลาที่พิเศษจริง ๆ: shader, spring physics, scroll-driven reveal หรือ animation 60fps ที่ต้องใช้ความสามารถสูงกว่า normal polish เป้าหมายคือความประทับใจที่ยังทำงานได้บนอุปกรณ์จริง ไม่ใช่เอฟเฟกต์ที่กัด performance ใช้อย่างจำกัดและมีเหตุผลเชิง composition",
        prerequisites: [
          "มีช่วงที่ควรเป็น focal moment จริง ๆ",
          "มีงบ performance และอุปกรณ์เป้าหมายที่ชัด"
        ],
        invoke: commandInvoke("overdrive", "<target>"),
        examples: [
          {
            title: "Hero ที่ต้อง memorable",
            prompt: "/impeccable overdrive hero ของหน้า launch ต้อง memorable มากกว่าปกติ ช่วยทำอะไรที่พิเศษ",
            result: "ได้ effect ที่ผูกกับแนวคิดของหน้า พร้อมข้อจำกัดด้าน performance"
          },
          {
            title: "เล่าเรื่องด้วยการเลื่อน",
            prompt: "/impeccable overdrive อยากให้ส่วนนี้เล่าเรื่องตามการ scroll โดยไม่ทำให้หน้าอืด",
            result: "ได้ scroll-driven sequence ที่ทดสอบบนอุปกรณ์เป้าหมายแล้ว"
          },
          {
            title: "งาน exhibition",
            prompt: "/impeccable overdrive หน้านี้เป็น showcase ที่ต้องทำให้คนหยุดดู",
            result: "เลือก effect หนึ่งจุดที่นำสายตา แทนการใส่เอฟเฟกต์ทุกส่วน"
          }
        ],
        cautions: [
          "ต้องมี fallback และทางเลือกสำหรับ reduced motion ทุกครั้ง",
          "อย่าใช้ overdrive กับหน้าที่ผู้ใช้ต้องทำงานเร็วหรืออ่านนาน"
        ],
        refs: commandRefs("skill/reference/overdrive.md"),
        sourcePath: "skill/reference/overdrive.md"
      },

      /* ---------- commands · fix ---------- */
      {
        id: "clarify",
        cat: "command",
        type: "command",
        name: "/impeccable clarify",
        summary: "ปรับ UX copy ป้าย ปุ่ม และข้อความ error ให้บอกการกระทำและผลลัพธ์ชัด",
        overview: "`clarify` แก้ข้อความที่ทำให้ผู้ใช้ต้องเดา: label ที่กำกวม ปุ่มที่ไม่บอกผล ข้อความ error ที่ไม่ช่วยให้แก้ และ instruction ที่ยาวหรือวกวน โดยยึดเสียงของแบรนด์และข้อเท็จจริงของผลิตภัณฑ์ ใช้เมื่อผู้ใช้อ่านแล้วยังไม่รู้ว่าต้องทำอะไรหรือเกิดอะไรขึ้น",
        prerequisites: [
          "มีข้อความจริงใน UI และบริบทการใช้งาน",
          "รู้เสียงและข้อกำหนดด้าน legal ของผลิตภัณฑ์"
        ],
        invoke: commandInvoke("clarify", "<target>"),
        examples: [
          {
            title: "ปุ่มไม่บอกผล",
            prompt: "/impeccable clarify ปุ่มในหน้านี้เขียนว่า Submit เฉย ๆ ผู้ใช้ไม่รู้ว่าจะเกิดอะไร",
            result: "ได้ label ที่บอกการกระทำและผลลัพธ์ตรงกับสิ่งที่ระบบทำ"
          },
          {
            title: "Error ไม่ช่วยแก้",
            prompt: "/impeccable clarify ข้อความ error บอกแค่ว่าเกิดข้อผิดพลาด ช่วยทำให้บอกวิธีแก้",
            result: "ข้อความระบุสาเหตุที่รู้จริงและขั้นตอนถัดไปของผู้ใช้"
          },
          {
            title: "ศัพท์ภายในหลุดถึงผู้ใช้",
            prompt: "/impeccable clarify หน้าตั้งค่ามีคำศัพท์ภายในทีมที่ลูกค้าไม่เข้าใจ",
            result: "แปลเป็นภาษาที่ผู้ใช้รู้จักโดยไม่เปลี่ยนความหมายของตัวเลือก"
          }
        ],
        cautions: [
          "ห้ามแต่งข้อความที่อ้างผลลัพธ์ซึ่งระบบไม่ได้ทำจริง",
          "การเปลี่ยน copy ที่เป็นข้อเท็จจริงต้องถามเจ้าของผลิตภัณฑ์ก่อน"
        ],
        refs: commandRefs("skill/reference/clarify.md"),
        sourcePath: "skill/reference/clarify.md"
      },
      {
        id: "adapt",
        cat: "command",
        type: "command",
        name: "/impeccable adapt",
        summary: "ปรับ breakpoint, fluid layout และ touch target ให้ทำงานต่างอุปกรณ์",
        overview: "`adapt` ทำให้หน้าเดียวกันทำงานได้บนขนาดจอและบริบทต่างกัน: implement breakpoints, fluid layout, touch target และการเปลี่ยนรูปแบบ interaction ตามอุปกรณ์ ใช้เมื่อหน้าพังหรืออึดอัดบนจอเล็ก หรือเมื่อต้องรองรับทั้งเดสก์ท็อป แท็บเล็ต และมือถือ บนโปรเจกต์ native จะใช้ reference คนละไฟล์กับเว็บ",
        prerequisites: [
          "รู้ขนาดจอและอุปกรณ์เป้าหมาย",
          "มีหน้าเดิมที่เรนเดอร์ได้ทุกวิวพอร์ตที่เกี่ยวข้อง"
        ],
        invoke: commandInvoke("adapt", "<target> mobile"),
        examples: [
          {
            title: "ตารางพังบนมือถือ",
            prompt: "/impeccable adapt ตารางในหน้า admin ล้นจอเมื่อเปิดบนมือถือ ช่วยปรับให้ใช้ได้",
            result: "ได้รูปแบบที่รักษาข้อมูลสำคัญและเปลี่ยนวิธีแสดงแทนการบีบทั้งตาราง"
          },
          {
            title: "ปุ่มกดยาก",
            prompt: "/impeccable adapt ปุ่มเล็ก ๆ ในหน้า settings กดบนมือถือไม่ค่อยโดน",
            result: "ปรับ touch target และระยะห่างโดยไม่ทำให้หน้าดูโปร่งเกิน"
          },
          {
            title: "รองรับแท็บเล็ต",
            prompt: "/impeccable adapt หน้านี้ต้องใช้บน iPad แนวนอนด้วย ช่วยตรวจ layout",
            result: "ปรับ breakpoint และความกว้างเนื้อหาให้เหมาะกับบริบทนั้น"
          }
        ],
        cautions: [
          "อย่าแก้ปัญหาจอเล็กด้วยการซ่อนเนื้อหาที่ผู้ใช้ยังต้องใช้",
          "ต้องทดสอบที่ความกว้างจริง ไม่ใช่แค่ย่อหน้าต่างเดสก์ท็อป"
        ],
        refs: commandRefs("skill/reference/adapt.md"),
        sourcePath: "skill/reference/adapt.md"
      },
      {
        id: "optimize",
        cat: "command",
        type: "command",
        name: "/impeccable optimize",
        summary: "วินิจฉัยและแก้ performance ของ UI ตั้งแต่โหลด เรนเดอร์ animation ภาพ ถึง bundle size",
        overview: "`optimize` ตรวจและแก้ปัญหาความเร็วและการตอบสนอง: loading speed, rendering, animation, images และ bundle size เริ่มจากการวัดและหาสาเหตุจริงก่อนเปลี่ยนโค้ด เป้าหมายคือหน้าที่เร็วขึ้นโดยหน้าตาและพฤติกรรมที่ผู้ใช้เห็นยังเหมือนเดิม ใช้เมื่อหน้าโหลดช้า กระตุก หรือหนักเกิน",
        prerequisites: [
          "มีวิธีวัดหรือ profiler ของโปรเจกต์",
          "รู้ตัวเลขหรือเกณฑ์ performance ที่ต้องการ"
        ],
        invoke: commandInvoke("optimize", "<target>"),
        examples: [
          {
            title: "หน้าแรกโหลดช้า",
            prompt: "/impeccable optimize หน้าแรกใช้เวลานานกว่าจะโต้ตอบได้ ช่วยหาต้นเหตุ",
            result: "ได้หลักฐานจาก profile และจุดที่ควรแก้ก่อน เช่น ภาพหรือ bundle"
          },
          {
            title: "Animation กระตุก",
            prompt: "/impeccable optimize ตอน scroll แล้ว animation กระตุกบนเครื่องกลาง ๆ",
            result: "แยกสาเหตุจาก layout property หรือเอฟเฟกต์ที่มีราคาแพง"
          },
          {
            title: "Bundle โต",
            prompt: "/impeccable optimize หลังเพิ่มฟีเจอร์ใหม่ bundle ใหญ่ขึ้นมาก ช่วยตรวจว่าอะไรควรตัด",
            result: "ได้รายการ dependency หรือโค้ดที่โหลดเกินจำเป็นพร้อมทางเลือก"
          }
        ],
        cautions: [
          "อย่าเปลี่ยนพฤติกรรมหรือหน้าตาเพื่อให้ตัวเลขดีขึ้นโดยไม่บอกผู้ใช้",
          "ต้องวัดซ้ำหลังแก้ทุกครั้ง ไม่ใช่เชื่อจากการอ่านโค้ด"
        ],
        refs: commandRefs("skill/reference/optimize.md"),
        sourcePath: "skill/reference/optimize.md"
      },

      /* ---------- commands · iterate ---------- */
      {
        id: "live",
        cat: "command",
        type: "command",
        name: "/impeccable live",
        summary: "โหมด variant ในเบราว์เซอร์: เลือก element แล้ววนแก้ทางเลือกผ่าน HMR บนเครื่องตัวเอง",
        overview: "`live` เปิด live variant mode: ผู้ใช้เลือก element ในเบราว์เซอร์ เลือก design action แล้วได้ variant เป็น HTML+CSS ที่ hot-swap ผ่าน dev server รองรับ dev server ที่มี HMR หรือไฟล์ static HTML ที่เปิดในเบราว์เซอร์ ต้องรันบน local checkout เท่านั้น — การ inject helper เข้า production site รวมถึง HTTPS ไม่รองรับ สำหรับตรวจ production ให้ใช้ `npx impeccable detect <url>` หรือ browser extension",
        prerequisites: [
          "มี dev server ที่รันอยู่และมี HMR หรือไฟล์ static HTML",
          "เป็นโปรเจกต์ที่ไว้ใจให้รันคำสั่ง local ได้"
        ],
        invoke: commandInvoke("live"),
        examples: [
          {
            title: "ลองทางเลือกกับหน้าจริง",
            prompt: "/impeccable live อยากลองเปลี่ยนการ์ดสรุปให้เด่นขึ้น โดยดูผลบนหน้าเว็บจริง",
            result: "เลือก element ในเบราว์เซอร์แล้ววนดู variant ก่อน accept กลับเข้าโค้ด"
          },
          {
            title: "เปรียบเทียบหลายรอบ",
            prompt: "/impeccable live ช่วยลองห้าแบบของ hero แล้วให้เลือกในเบราว์เซอร์",
            result: "ได้ variant หลายทางเลือกในหน้าเดิมและเก็บเฉพาะอันที่เลือก"
          },
          {
            title: "แก้เฉพาะจุด",
            prompt: "/impeccable live ปุ่ม CTA ดูไม่กลืนกับพื้นหลัง ช่วยลองทางเลือกกับหน้านี้",
            result: "แก้บน local checkout และเห็นผลผ่าน HMR ทันที"
          }
        ],
        cautions: [
          "ห้ามใช้ live กับ production site หรือปิด browser security/CSP เพื่อให้ทำงาน",
          "live ใช้ localhost และ local checkout เท่านั้น; ตรวจ production ด้วย detect หรือ extension"
        ],
        refs: commandRefs("skill/reference/live.md"),
        sourcePath: "skill/reference/live.md"
      },
      {
        id: "generate",
        cat: "command",
        type: "command",
        name: "/impeccable generate",
        summary: "สร้าง variant ของ element ที่ระบุใน live browser โดยไม่ต้องเลือก element เอง",
        overview: "`generate` เป็นทางลัดเข้า live mode: ผู้ใช้ระบุ element, direction และจำนวน variant ในประโยคเดียว ระบบเปิด helper หา element บนหน้าที่เปิดอยู่ เลื่อนไปที่ element แล้วสร้าง variant ให้วนเลือกและ accept คำสั่งนี้เป็น web only — บน ios/android/adaptive จะถูกปฏิเสธและเสนอ bolder หรือ quieter บน source แทน จำนวนเริ่มต้นคือ 3 และเพดานคือ 8",
        prerequisites: [
          "มีหน้าเว็บที่รันอยู่และระบุ element ได้ชัด",
          "เป็นงาน web ไม่ใช่ native"
        ],
        invoke: commandInvoke("generate", "3 bolder variants of pricing cards"),
        examples: [
          {
            title: "ระบุ element และทิศทาง",
            prompt: "/impeccable generate 3 bolder variants of the pricing cards",
            result: "ได้สาม variant ของการ์ด pricing ในเบราว์เซอร์โดยไม่ต้องคลิกเลือก element"
          },
          {
            title: "ขอแบบเบาลง",
            prompt: "/impeccable generate ขอ 5 แบบที่ quieter ของ hero นี้",
            result: "สร้างห้า variant ตาม action quieter ให้วนดูและเลือก"
          },
          {
            title: "ระบุจำนวนเอง",
            prompt: "/impeccable generate 2 distilled versions of the settings header",
            result: "ได้สอง variant ที่ลดความซับซ้อนของ header ตามที่ระบุ"
          }
        ],
        cautions: [
          "ห้ามรัน init หรือ document แทนผู้ใช้ระหว่าง generate และไม่ต้องถามหา PRODUCT.md",
          "อย่าเขียน variants wrapper หรือ session id เอง — session id มาจากเบราว์เซอร์เท่านั้น"
        ],
        refs: commandRefs("skill/reference/generate.md"),
        sourcePath: "skill/reference/generate.md"
      },

      /* ---------- commands · hidden subcommands ---------- */
      {
        id: "doctor",
        cat: "command",
        type: "command",
        name: "/impeccable doctor",
        summary: "รายงานและซ่อม drift ระหว่าง PRODUCT.md, DESIGN.md, config, surface brief และ hook กับเวอร์ชันที่ติดตั้ง",
        overview: "`doctor` เป็นงาน maintenance ไม่ใช่ design: ตรวจว่า artifact ของ Impeccable ในโปรเจกต์ยังตรงกับสิ่งที่เวอร์ชันปัจจุบันอ่านหรือไม่ แล้วรายงานเป็น finding ที่มี severity `auto`, `mention` หรือ `route` พร้อมคำสั่ง `--json` สำหรับอ่านผลและ `--fix` สำหรับซ่อมเฉพาะรายการ `auto` ความต่างสามชนิดถูกแยกจากกัน: tool version, schema drift และ truth drift — อย่างหลังต้องส่งต่อให้ `init` หรือ `document` ไม่ใช่ซ่อมเงียบ ๆ ไม่อยู่ในตาราง 24 คำสั่งของ README",
        prerequisites: [
          "มี artifact ของ Impeccable ในโปรเจกต์ให้ตรวจ",
          "ใน monorepo ต้องรู้ workspace ที่ต้องการตรวจ"
        ],
        invoke: [
          { label: "ในแชท", code: "/impeccable doctor", language: "text" },
          { label: "Launcher ที่มากับสกิล", code: "{{scripts_path}}/impeccable doctor --json", language: "shell", note: "path จริงขึ้นกับตำแหน่งที่ติดตั้งสกิล; เติม --target <path> เมื่ออยู่ใน monorepo" }
        ],
        examples: [
          {
            title: "PRODUCT.md เก่าหลังอัปเกรด",
            prompt: "อัปเดต Impeccable แล้วรู้สึกว่าไฟล์ context ในโปรเจกต์ไม่ตรง ช่วยตรวจให้หน่อย",
            result: "ได้ finding แยก schema drift ออกจาก truth drift พร้อมคำสั่งที่ควรใช้ต่อ"
          },
          {
            title: "ตรวจเฉพาะแอปใน monorepo",
            prompt: "/impeccable doctor ช่วยตรวจเฉพาะ apps/web ว่า context อะไรล้าสมัย",
            result: "รายงานจำกัดที่ workspace นั้นแทนการใช้ root ของ repo"
          },
          {
            title: "ซ่อมรายการที่ไม่ต้องตัดสินใจ",
            prompt: "/impeccable doctor มี finding ที่แก้ได้เองไหม ช่วยเก็บให้เรียบร้อย",
            result: "รัน --fix กับรายการ severity auto แล้วสรุปว่าย้ายอะไรไปบ้าง"
          }
        ],
        cautions: [
          "doctor ไม่ redesign และไม่เปิดไฟล์นอกเหนือจากที่ report ระบุ",
          "อย่าซ่อม truth drift เอง — ต้องส่งต่อ init หรือ document พร้อมช่องว่างที่เฉพาะเจาะจง"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Doctor"),
          fileRef("skill/reference/doctor.md"),
          fileRef("docs/CLI-CONTRACT.md", "CLI-CONTRACT.md · doctor")
        ],
        sourcePath: "skill/reference/doctor.md"
      },
      {
        id: "hooks",
        cat: "command",
        type: "command",
        name: "/impeccable hooks",
        summary: "เปิด ปิด ตรวจสถานะ และจัดการ ignore ของ design detector hook ระดับโปรเจกต์",
        overview: "`hooks` จัดการ design detector hook ที่รันหลังการแก้ไฟล์ UI โดยตรง รองรับ action `status`, `on`, `off`, `ignore-rule`, `ignore-file`, `ignore-value` และ `reset` ค่า hook เก็บใน `.impeccable/config.json` ส่วน consent และ override ส่วนตัวอยู่ใน `.impeccable/config.local.json` ที่ไม่ commit hook ทำงานสองชั้น: ตรวจระดับการแก้ไขทันที และ deep pass ตอน Stop ใน harness ที่รองรับ ไม่อยู่ในตาราง 24 คำสั่งของ README",
        prerequisites: [
          "ติดตั้งสกิลและ hook manifest ใน harness ที่รองรับ",
          "รู้ว่า ignore ที่จะเพิ่มควรใช้ร่วมทั้งทีมหรือเฉพาะเครื่อง"
        ],
        invoke: [
          { label: "ในแชท", code: "/impeccable hooks status", language: "text", note: "ไม่ใส่ action จะถือว่า status" },
          { label: "Launcher ที่มากับสกิล", code: "{{scripts_path}}/impeccable hooks <on|off|status|ignore-rule|ignore-file|ignore-value|reset>", language: "shell" }
        ],
        examples: [
          {
            title: "ปิด hook ชั่วคราว",
            prompt: "/impeccable hooks hook เตือนถี่เกินไประหว่างทดลอง ช่วยปิดในโปรเจกต์นี้",
            result: "ตั้ง enabled: false ใน config ของโปรเจกต์ จนกว่าจะสั่ง on อีกครั้ง"
          },
          {
            title: "ยกเว้นกฎหนึ่งในไฟล์เก่า",
            prompt: "/impeccable hooks โฟลเดอร์ legacy ใช้ฟอนต์แบรนด์ที่ตั้งใจไว้ ช่วยยกเว้นกฎ overused-font ที่นั่น",
            result: "เพิ่ม ignore ของกฎเฉพาะไฟล์นั้นโดยไม่ปิดทั้งโปรเจกต์"
          },
          {
            title: "ตรวจว่าอะไรถูก ignore อยู่",
            prompt: "/impeccable hooks ตอนนี้โปรเจกต์ยกเว้นกฎหรือไฟล์อะไรไว้บ้าง",
            result: "ได้สถานะ hook พร้อมรายการ ignore และ path ของ config ที่เกี่ยวข้อง"
          }
        ],
        cautions: [
          "`off` หยุดเฉพาะ hook อัตโนมัติ ไม่ได้หยุด `impeccable detect` ที่รันมือ",
          "ignore ระดับ shared กระทบทั้งทีม — ใช้ --local เมื่อเป็นข้อยกเว้นเฉพาะเครื่อง"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Hooks"),
          fileRef("skill/reference/hooks.md"),
          fileRef("docs/CLI-CONTRACT.md", "CLI-CONTRACT.md · design hook")
        ],
        sourcePath: "skill/reference/hooks.md"
      },
      {
        id: "pin",
        cat: "command",
        type: "command",
        name: "/impeccable pin",
        summary: "สร้างหรือลบ shortcut แยก เช่น /audit จาก /impeccable pin audit",
        overview: "`pin` และ `unpin` สร้างหรือลบโฟลเดอร์ shortcut ของคำสั่งที่เลือกในทุก harness ที่ติดตั้ง Impeccable ไว้ ตัวอย่าง `pin audit` ทำให้เรียก `/audit` ได้โดยตรง และใน Codex ใช้รูปแบบ `$` shortcut ที่สร้างจะมี marker `impeccable-pinned-skill` จึงลบได้โดยไม่แตะ skill อื่น รายการที่ pin ได้คือ 24 คำสั่งในตาราง (`doctor` และ `teach` ไม่อยู่ในรายการ) ไม่อยู่ในตาราง 24 คำสั่งของ README",
        prerequisites: [
          "มี harness อย่างน้อยหนึ่งที่มี `skills/impeccable` ติดตั้งอยู่",
          "เลือกคำสั่งจากรายการที่ pin ได้"
        ],
        invoke: [
          { label: "ในแชท", code: "/impeccable pin audit", language: "text", note: "สร้าง shortcut /audit ใน harness ที่ติดตั้งไว้" },
          { label: "Launcher ที่มากับสกิล", code: "{{scripts_path}}/impeccable pin pin audit", language: "shell", note: "รูปแบบคือ pin <pin|unpin> <command>; unpin ใช้ ... pin unpin audit" }
        ],
        examples: [
          {
            title: "เรียกคำสั่งที่ใช้บ่อย",
            prompt: "/impeccable pin ใช้ audit บ่อย อยากเรียกสั้น ๆ ว่า /audit",
            result: "มี shortcut /audit ในแต่ละ harness ที่ติดตั้งไว้"
          },
          {
            title: "เลิกใช้ shortcut",
            prompt: "/impeccable pin ไม่ต้องใช้ /audit แยกแล้ว ช่วยลบ shortcut",
            result: "unpin ลบเฉพาะโฟลเดอร์ที่มี marker ของ Impeccable"
          },
          {
            title: "ย้ายไป Codex",
            prompt: "/impeccable pin ใช้ Codex แล้วอยากได้คำสั่งย่อสำหรับ polish",
            result: "ได้ shortcut รูปแบบ $polish ใน harness ของ Codex"
          }
        ],
        cautions: [
          "ถ้ามี skill ชื่อเดียวกันที่ไม่ได้สร้างโดย pin ระบบจะข้ามไม่เขียนทับ",
          "pin ไม่รองรับ doctor, hooks, context หรือ component-review"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Pin / Unpin"),
          fileRef("docs/CLI-CONTRACT.md", "CLI-CONTRACT.md · pin")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "context",
        cat: "command",
        type: "command",
        name: "/impeccable context",
        summary: "โหลด PRODUCT.md, DESIGN.md, surface brief และ native reference พร้อม directive สำหรับเซสชัน",
        overview: "`context` คือคำสั่ง setup ที่สกิลรันเองหนึ่งครั้งต่อเซสชัน เพื่อโหลด PRODUCT.md, DESIGN.md, surface brief ของ target และ native platform reference แล้วพิมพ์ resolved paths กับ directive เช่น `NO_PRODUCT_MD`, `CONTEXT_STALE` หรือ `UPDATE_AVAILABLE` ใช้ `--target <path>` เมื่ออยู่ใน monorepo หรือระบุไฟล์/route เฉพาะ ไม่ควรสั่งซ้ำในเซสชันเดียว",
        prerequisites: [
          "มีโฟลเดอร์สกิลที่ให้ launcher ทำงาน",
          "cwd อยู่ที่โปรเจกต์ ไม่ใช่โฟลเดอร์สกิล"
        ],
        invoke: launcherInvoke("{{scripts_path}}/impeccable context --target <path>", "ไม่ใส่ --target เมื่อโปรเจกต์เดียว; ใส่เมื่อต้องเลือก workspace, ไฟล์ หรือ route"),
        examples: [
          {
            title: "เริ่มเซสชันในโปรเจกต์เดิม",
            prompt: "/impeccable context เริ่มงานต่อในโปรเจกต์นี้หลังพักช่วงหนึ่ง",
            result: "ได้ context ของโปรเจกต์และ directive ที่ต้องทำก่อนแก้ UI"
          },
          {
            title: "monorepo หลายแอป",
            prompt: "/impeccable context งานนี้อยู่ที่ apps/storefront ไม่ใช่ root ของ repo",
            result: "ใช้ --target ชี้ workspace นั้นแล้วอ่าน PRODUCT.md/DESIGN.md ที่ตรง"
          },
          {
            title: "ไฟล์ context ล้าสมัย",
            prompt: "/impeccable context มี PRODUCT.md แต่โค้ดเปลี่ยนไปมากแล้ว",
            result: "ได้ directive ที่บอกว่าต้องตรวจ drift ต่อ ไม่ใช่ให้เดา context แทนผู้ใช้"
          }
        ],
        cautions: [
          "อย่ารัน context ซ้ำในเซสชันเดียว — directive บางอย่างเช่น update check ถูกออกแบบมาให้ทำครั้งเดียว",
          "ถ้า launcher ใช้ไม่ได้ ให้แจ้งผู้ใช้ก่อนอ่าน context ที่มีอยู่เอง ไม่ใช่แต่งข้อมูลที่ขาด"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Setup"),
          fileRef("docs/CLI-CONTRACT.md", "CLI-CONTRACT.md · context")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "component-review",
        cat: "command",
        type: "command",
        name: "/impeccable component-review",
        summary: "ด่านรีวิวแผนและ asset ของงาน comp-led ก่อนเขียนหน้า: ตรวจ plate และแผนว่าส่วนใดจะวาดด้วยโค้ด",
        overview: "`component-review` ใช้ในงาน comp-led เมื่อ raster region ทุกส่วนมี plate และผ่านการให้คะแนนแล้ว ก่อนมี page code ผู้ใช้ตรวจสองอย่าง: plate ที่จะ ship และ production plan ว่าส่วนใดจะวาดด้วยโค้ด ลำดับคำสั่งย่อยคือ `plan`, `capture`, `serve`, `status` และ `verify` ระบบปฏิเสธถ้ายังมี raster region ที่ไม่มี plate และไม่มีการอนุมัติแทนผู้ใช้ ไม่อยู่ในตาราง 24 คำสั่งของ README",
        prerequisites: [
          "เป็นงาน comp-led ที่มี comp และ regions file",
          "มี plate ครบสำหรับทุก raster region"
        ],
        invoke: launcherInvoke("{{scripts_path}}/impeccable component-review plan", "ตามด้วย capture, serve, status และ verify ตามผลการรีวิว"),
        examples: [
          {
            title: "เตรียมรีวิวก่อนเขียนโค้ด",
            prompt: "/impeccable component-review comp เสร็จแล้วและมี plate ครบ อยากให้ทีมรีวิวแผนก่อนเริ่ม build",
            result: "ได้ manifest และรอบรีวิวที่แยก plate ออกจากส่วนที่โค้ดจะวาด"
          },
          {
            title: "แก้แผนหลังรีวิว",
            prompt: "/impeccable component-review reviewer บอกว่า region นี้ควรเป็นภาพ ไม่ใช่โค้ด",
            result: "ปรับ regions file แล้วสร้าง plate ใหม่และเปิดรอบรีวิวถัดไป"
          },
          {
            title: "ตรวจสถานะการอนุมัติ",
            prompt: "/impeccable component-review รีวิวรอบนี้สรุปว่าอนุมัติแล้วหรือยัง",
            result: "status/verify รายงานว่า approved, pending หรือ needs-work ตาม receipt จริง"
          }
        ],
        cautions: [
          "ห้าม submit หรือเขียน receipt แทนผู้ใช้ และห้ามอนุมัติเองเมื่อไม่มีคนรีวิว",
          "ถ้า serve ปิดเพราะไม่มีเบราว์เซอร์หรือ idle 30 นาที ให้หยุดและรายงานว่า pending"
        ],
        refs: [
          fileRef("skill/reference/component-review.md"),
          fileRef("docs/CLI-CONTRACT.md", "CLI-CONTRACT.md · component review")
        ],
        sourcePath: "skill/reference/component-review.md"
      },

      /* ---------- visitor modes ---------- */
      {
        id: "persuade",
        cat: "mode",
        type: "concept",
        name: "Persuade",
        summary: "ผู้เข้าชมตัดสินใจและลงมือ — landing page, marketing, campaign, pricing",
        overview: "โหมดนี้ใช้เมื่อความสำเร็จของผู้เข้าชมคือการตัดสินใจและลงมือทำ ดีไซน์จึงเป็นตัวผลิตภัณฑ์: ช่วงเปิดต้องทำให้ข้อเสนอเข้าใจและน่าต้องการ มี action ที่ชัด และแสดงสิ่งที่คู่แข่งลอกไม่ได้ Action ต้องอยู่ในรูปแบบการใช้งานจริง เช่น ช่องค้นหาเที่ยวบิน ปฏิทินนัด หรือปุ่มเพิ่มลงตะกร้า ไม่ใช่ลิงก์ตกแต่งที่พาไปที่อื่น",
        cautions: [
          "อย่าแทนข้อเสนอด้วยภาพโปสเตอร์ที่ไม่มีส่วนใช้งานจริง — หน้าเว็บต้องทำงานเป็นหน้าเว็บ",
          "อย่าใช้ template อย่าง split hero หรือ headline เหนือการ์ดแถวเดียวแล้วเรียกว่า concept",
          "โหมดเลือกจาก surface ไม่ใช่จากประเภทผลิตภัณฑ์: landing ของเครื่องมือก็ยังเป็น Persuade"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Modes"),
          fileRef("skill/reference/mode-persuade.md")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "operate",
        cat: "mode",
        type: "concept",
        name: "Operate",
        summary: "ผู้ใช้ทำงานให้เสร็จ — app, dashboard, editor, admin, settings",
        overview: "โหมดนี้ใช้เมื่อผู้เข้าชมต้องทำงานหนึ่งให้เสร็จ ความสำเร็จคือ task completion ไม่ใช่ความประทับใจ: scanability, consistency, native expectation และบริบทการใช้งานจริงมีความสำคัญกว่าการแสดงออก แบรนด์อยู่ในรายละเอียดที่แม่นยำ ไม่ใช่ในเอฟเฟกต์ที่ขวางทาง ใช้กับ app UI, dashboard, editor, admin และ settings",
        cautions: [
          "ความกล้าในโหมดนี้แสดงเป็นความแม่นยำและความเรียบ ไม่ใช่การตกแต่งเพิ่ม",
          "pattern ที่ผู้ใช้รู้จักดีอยู่แล้วควรคงไว้ เว้นแต่มีหลักฐานว่ามันทำให้งานยากขึ้น",
          "อย่ายก pattern ของ landing page เข้ามาในหน้าที่ผู้ใช้ต้องทำซ้ำทุกวัน"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Modes"),
          fileRef("skill/reference/operate.md")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "read",
        cat: "mode",
        type: "concept",
        name: "Read",
        summary: "ผู้ใช้อ่านเข้าใจ — docs, บทความ, คู่มือ, help, changelog",
        overview: "โหมดนี้ใช้เมื่อผู้เข้าชมมาเพื่อทำความเข้าใจบางอย่าง หน้านั้นจึงต้องเป็นเอกสารของชนิดนั้นก่อน: documentation อ่านเป็น documentation, guide เป็น guide, changelog เป็น changelog โครงสร้างต้องพาไปตามคำถามของผู้อ่าน และ world ของแบรนด์ owns เฉพาะ frame — masthead, navigation rail, ground, title และวิธีวาง code/table/callout — ส่วนคอลัมน์อ่านต้องสงบ",
        cautions: [
          "อย่าให้ world เข้ามากำหนดลำดับการอ่านหรือแทน navigation ที่ผู้อ่านต้องเรียนรู้ใหม่",
          "body text ต้องใช้ reading face ที่คอนทราสต์จริง; monospace สงวนไว้ให้ code, parameter และ label",
          "measure บนเว็บควรอยู่ราว 60–75 ตัวอักษร และ body ใกล้ 16px"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Modes"),
          fileRef("skill/reference/mode-read.md")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "experience",
        cat: "mode",
        type: "concept",
        name: "Experience",
        summary: "ผู้ใช้อยู่ในตัวงาน — portfolio, gallery, showcase",
        overview: "โหมดนี้ใช้เมื่อผลงานคือสิ่งที่ผู้เข้าชมมาดู ตัวงานต้องนำตั้งแต่วิวพอร์ตแรก และอินเทอร์เฟซต้องถอยไปเป็นฉากหลัง ประสบการณ์ไม่ใช่ภาพของผลงาน แต่คือผลงานที่ถูกจัดวางให้ดูได้จริง: ถ้า world เป็นวัตถุ หน้านั้นคือวัตถุหนึ่งชิ้นที่เห็นครั้งเดียว ในมุมและสเกลเดียว ไม่ใช่ชุดภาพประกอบของวัตถุนั้น",
        cautions: [
          "อย่าให้อินเทอร์เฟซหายไปจนผู้ใช้ไปต่อไม่ได้ — navigation และ action ยังต้องใช้ได้",
          "อย่าทำหน้าเป็นภาพโปสเตอร์ของผลงานแทนที่จะเป็นที่อยู่ของผลงานจริง",
          "รายละเอียดที่เพิ่มต้องไม่แย่งความสนใจจากตัวงาน"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Modes"),
          fileRef("skill/reference/mode-persuade.md", "mode-persuade.md · Persuade and Experience")
        ],
        sourcePath: "skill/SKILL.src.md"
      },

      /* ---------- principles ---------- */
      {
        id: "finish-the-job",
        cat: "principle",
        type: "concept",
        name: "Finish the job",
        summary: "งานส่งมอบต้องครบ ไม่มี hedging หรือทางลัด ยกเว้น asset ที่ผู้ใช้ต้องให้เอง",
        overview: "หลักการข้อแรกของ SKILL.src.md: deliverable ต้องสมบูรณ์ ไม่ใช่ตัวอย่างครึ่ง ๆ หรือโค้ดที่ \"โครงไว้ให้ต่อ\" ข้อจำกัดเดียวที่ยอมรับคือ asset ที่ผู้ใช้ต้องจัดหาเอง เช่น ภาพถ่ายแบรนด์หรือข้อมูลที่ยังไม่มี หลักการนี้กำกับทุกคำสั่ง ตั้งแต่ shape ถึง polish และเป็นเหตุผลที่ผลลัพธ์ต้องมีสถานะ ข้อความ และ edge case ครบก่อนบอกว่าเสร็จ",
        cautions: [
          "อย่าประกาศว่าเสร็จเมื่อยังมี state หรือ asset ที่ขาดโดยไม่แจ้ง",
          "การขอ asset จากผู้ใช้ต้องระบุให้ชัดว่าต้องการอะไรและใช้ที่ไหน ไม่ใช่ปล่อยเป็น placeholder ลอย ๆ"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Core principles")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "scale-ambition",
        cat: "principle",
        type: "concept",
        name: "Scale ambition to the surface's mode",
        summary: "ความทะเยอทะยานต้องปรับตามโหมด: Persuade/Experience เต็มที่, Operate/Read แสดงเป็นความแม่นยำ",
        overview: "หลักการนี้ผูก ambition กับ visitor mode แทนที่จะใช้มาตรฐานเดียวทุกหน้า Persuade และ Experience ได้ full commitment: งานที่กล้า ชัด และมีจุดยืน ส่วน Operate และ Read แสดง ambition ผ่าน precision และ restraint โดย pattern ที่ผู้ใช้รู้จักอยู่แล้วมีที่ทางของมัน หลักการนี้กันทั้งงานที่จืดในหน้าที่ควร memorable และงานที่โอเวอร์ในหน้าที่ต้องใช้งานจริง",
        cautions: [
          "อย่าใช้ \"ความกล้า\" เป็นเหตุผลให้เพิ่มเอฟเฟกต์ในหน้า Operate หรือ Read",
          "อย่าตัดสินโหมดจากประเภทผลิตภัณฑ์ — ดูที่ surface ที่กำลังทำ"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Core principles"),
          fileRef(SKILL, "SKILL.src.md · Modes")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "verify-by-looking",
        cat: "principle",
        type: "concept",
        name: "Verify by looking",
        summary: "ตรวจผลเรนเดอร์จริงในขนาดที่จะ ship และรวมการตรวจเป็นชุดก่อนดูใหม่",
        overview: "หลักการที่บอกให้ตรวจสิ่งที่ผู้ใช้เห็นจริง ไม่ใช่โค้ดที่อ่านแล้วคิดว่าใช้ได้: เปิดผลลัพธ์ที่ขนาดซึ่งจะ ship, ดู state และ interaction จริง แล้วรวมการแก้จากหนึ่งรอบการดูให้ครบก่อน screenshot ใหม่ หลักการนี้กำกับทุกคำสั่งที่แตะ UI และเป็นเหตุผลที่ detector หรือ type check เพียงอย่างเดียวไม่พอ",
        cautions: [
          "การดู screenshot ครั้งเดียวไม่แทนการทดสอบ interaction และ state ที่เปลี่ยน",
          "อย่าแก้ทีละจุดแล้วถ่ายภาพใหม่ทุกครั้งจนเสียเวลา — รวมสิ่งที่เห็นรอบหนึ่งก่อน"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · Core principles")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "skill-brief-wins",
        cat: "principle",
        type: "concept",
        name: "The brief wins",
        summary: "เคารพ aesthetic ยุค วัสดุ ฟอนต์ และ palette ที่ถูกปักไว้ แม้จะชนกับคำเตือน pattern",
        overview: "หลักการนี้มี rule id จริงใน SKILL.src.md (`skill-brief-wins`) และกำกับการตัดสินใจทุกครั้งที่คำเตือนของ detector ชนกับ brief: หากลูกค้าปัก aesthetic ยุค วัสดุ ฟอนต์ หรือ palette ไว้ชัดเจน งานต้องทำตาม brief นั้น การดึงกลับไปตามรสนิยมของโมเดลถือเป็นความล้มเหลว คำเตือนเรื่อง pattern ที่อิ่มตัวจึงเป็นข้อมูลประกอบ ไม่ใช่คำสั่งให้เปลี่ยน brief",
        cautions: [
          "หลักการนี้ไม่ใช่ใบอนุญาตให้ทำผิด accessibility หรือ functional requirement",
          "ถ้า brief ขัดกับข้อจำกัดทางเทคนิค ต้องบอกผู้ใช้และหาทางที่รักษาเจตนาของ brief"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · How to design (rule:skill-brief-wins)")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "skill-world-change-semantics",
        cat: "principle",
        type: "concept",
        name: "Refinement preserves; redesign replaces",
        summary: "งานขัดเกลารักษา identity/behavior/copy นอก scope; redesign เก็บ product truth แต่ทิ้งหน้าตาเดิม",
        overview: "rule id จริงใน SKILL.src.md คือ `skill-world-change-semantics` หลักการนี้แยกสองโหมดงานให้ชัด: refinement รักษา incumbent identity, พฤติกรรม, ข้อความ และทุกอย่างนอก scope โดยถามก่อนแทนที่ข้อความที่เป็นข้อเท็จจริง ส่วน redesign เก็บ product truth, เนื้อหา, ฟังก์ชัน, native affordance และข้อจำกัดไว้ แต่ถือหน้าตาเดิมเป็นหลักฐานและ anti-reference แล้วเลือก world ใหม่ ห้ามผสมสองแบบด้วยการ polish หน้าตาที่ถูกทิ้งแล้ว",
        cautions: [
          "อย่าแอบเปลี่ยน concept ระหว่างทำงาน refinement",
          "redesign ต้องเลือก world ใหม่ใน new-work และแทนที่ DESIGN.md ไม่ใช่ต่อเติมของเดิม"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · How to design (rule:skill-world-change-semantics)")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "skill-loaded-symbols",
        cat: "principle",
        type: "concept",
        name: "Loaded symbols stay out of the decoration",
        summary: "สัญลักษณ์ที่ผูกกับลัทธิทหาร การเหยียด หรือความเกลียด ไม่ถูกใช้เป็น motif หรือ ornament",
        overview: "rule id จริงใน SKILL.src.md คือ `skill-loaded-symbols` หลักการนี้กำหนดว่าโลกของ subject ไม่ได้ให้สิทธิ์นำ emblem ที่ผูกกับ militarism, supremacy หรือ hate movement มาใช้เป็น motif, badge หรือ ornament เช่น รัศมีของ Rising Sun flag, Confederate battle flag หรือ Nazi-era insignia รวมถึงรูปแบบที่ stylize ตามมา ให้ใช้รูปทรงกลาง ๆ ของโลกนั้นแทน เนื้อหาที่บันทึกสัญลักษณ์เหล่านี้ในฐานะข้อเท็จจริงยังคงอยู่ได้",
        cautions: [
          "อย่าตีความว่า \"โลกของ subject มีสัญลักษณ์นี้\" เท่ากับ \"ใช้ได้\"",
          "การอธิบายหรือ documenting สัญลักษณ์เป็นข้อเท็จจริงต่างจากการนำมาเป็นงานตกแต่ง"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · How to design (rule:skill-loaded-symbols)")
        ],
        sourcePath: "skill/SKILL.src.md"
      },
      {
        id: "skill-new-work-gate",
        cat: "principle",
        type: "concept",
        name: "Visual authority is evidence, not a filename",
        summary: "การไม่มี DESIGN.md ไม่ได้แปลว่าโปรเจกต์เป็น greenfield — ต้องดูหลักฐานในโค้ดและตัดสินว่าจะ preserve/expand/replace",
        overview: "rule id จริงใน SKILL.src.md คือ `skill-new-work-gate` หลักการนี้เตือนว่า visual authority มาจากหลักฐาน ไม่ใช่การมีอยู่ของไฟล์: การไม่มี DESIGN.md เพียงอย่างเดียวไม่ได้ทำให้โปรเจกต์ใหม่ และ new-work ต้องตัดสินว่าจะ preserve, expand หรือ replace world ที่มีอยู่จริงในโค้ด ในทางกลับกัน การมี PRODUCT.md แต่ไม่มี DESIGN.md ก็ไม่ใช่เหตุผลให้ประดิษฐ์ world ใหม่ทับของเดิม",
        cautions: [
          "อย่าสร้าง visual world ใหม่เพียงเพราะขาดเอกสาร",
          "อย่าถือว่าโค้ดเดิมเป็น authority โดยไม่ตรวจว่ามันคือ world ที่ตั้งใจหรือแค่ drift"
        ],
        refs: [
          fileRef(SKILL, "SKILL.src.md · How to design (rule:skill-new-work-gate)")
        ],
        sourcePath: "skill/SKILL.src.md"
      },

      /* ---------- detector rules ---------- */
      {
        id: "overused-font",
        cat: "rule",
        type: "rule",
        name: "overused-font",
        summary: "ฟอนต์ที่ถูกใช้จนไม่สร้างความต่าง: Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk",
        overview: "กฎใน registry หมวด `slop` scope `type`: ฟอนต์ชุด Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans และ Space Grotesk ถูกใช้บนเว็บมากจนไม่รู้สึกว่าเป็นตัวตนของแบรนด์อีกต่อไป แต่ละระลอกของ UI ที่ AI สร้างก็มาบรรจบที่ฟอนต์ชุดเดียวกัน ทางแก้คือเลือก face ที่ให้ personality กับ interface ตามหลัก The brief wins ถ้าแบรนด์ปักฟอนต์ไว้",
        cautions: [
          "กฎนี้เป็น heuristic ไม่ได้บอกว่าฟอนต์เหล่านี้ผิดทุกกรณี — brief ของแบรนด์มาก่อน",
          "ถ้าตั้งใจใช้ ให้ยกเว้นพร้อมเหตุผลผ่าน ignores หรือ inline comment ไม่ใช่ปิดกฎทั้งโปรเจกต์"
        ],
        refs: [
          fileRef(REGISTRY, "registry.rs · overused-font"),
          fileRef("README.npm.md", "README.npm.md · what it detects")
        ],
        sourcePath: "crates/foundation/src/registry.rs"
      },
      {
        id: "ai-color-palette",
        cat: "rule",
        type: "rule",
        name: "ai-color-palette",
        summary: "Purple/violet gradient และ cyan-on-dark ที่เป็นสัญญาณเทมเพลต AI",
        overview: "กฎใน registry หมวด `slop`: purple/violet gradient และ cyan-on-dark เป็น tell ที่จำได้ง่ายที่สุดของ UI ที่ AI สร้าง gradient ในโทนเหล่านั้นเป็น tell ด้วยตัวเอง ส่วน neon ink แบบแบนบนพื้นมืดจะถูก charge เมื่อมีสี tell ที่สองมาร่วม ทางแก้คือเลือก palette ที่มีเหตุผลและเจ้าของชัดเจน ไม่ใช่ค่าเริ่มต้นที่โมเดลชอบ",
        cautions: [
          "กฎนี้จับคู่สีแบบเฉพาะ ไม่ได้ห้าม purple หรือ cyan โดยทั่วไป",
          "gradient ที่เป็น brand asset จริงควรถูกยกเว้นอย่างมีเหตุผล ไม่ใช่แก้ตามกฎโดยไม่ดู brief"
        ],
        refs: [
          fileRef(REGISTRY, "registry.rs · ai-color-palette"),
          fileRef("README.npm.md", "README.npm.md · what it detects")
        ],
        sourcePath: "crates/foundation/src/registry.rs"
      },
      {
        id: "nested-cards",
        cat: "rule",
        type: "rule",
        name: "nested-cards",
        summary: "การ์ดซ้อนในการ์ดที่สร้าง noise และ depth เกินจำเป็น",
        overview: "กฎใน registry หมวด `slop` scope `layout`: card ที่อยู่ใน card อีกชั้นทำให้ hierarchy แบนและเพิ่มความรก ทางแก้คือ flatten container แล้วใช้ spacing, typography และ divider แทนการซ้อนกรอบ ใช้เมื่อจัดกลุ่มเนื้อหาเป็น card และรู้สึกว่าต้องใส่ card อีกชั้นเพื่อแยกส่วน",
        cautions: [
          "การซ้อน container ที่ไม่ใช่ card (เช่น table ใน panel) ไม่ได้อยู่ในเจตนาของกฎนี้",
          "การ flatten ต้องไม่ทำให้ความสัมพันธ์ของข้อมูลหาย — ใช้ divider หรือหัวข้อย่อยแทน"
        ],
        refs: [
          fileRef(REGISTRY, "registry.rs · nested-cards"),
          fileRef("README.npm.md", "README.npm.md · what it detects")
        ],
        sourcePath: "crates/foundation/src/registry.rs"
      },
      {
        id: "gray-on-color",
        cat: "rule",
        type: "rule",
        name: "gray-on-color",
        summary: "ตัวอักษรเทาบนพื้นสีที่อ่านยากและหลุดคอนทราสต์",
        overview: "กฎใน registry หมวด `quality`: ข้อความสีเทาดูจางเมื่ออยู่บนพื้นสี ทางแก้คือใช้เฉดที่เข้มขึ้นของสีพื้นนั้น หรือขาว/near-white เมื่อต้องเพิ่มคอนทราสต์ ใช้เมื่อวางข้อความรอง (secondary text) บนพื้นที่มีสี ไม่ใช่พื้นกลางอย่างขาวหรือเทาอ่อน",
        cautions: [
          "กฎนี้ไม่ได้แทนการตรวจ WCAG contrast — ต้องวัดคู่สีจริงด้วย",
          "การเปลี่ยนเป็นสีเข้มของพื้นอาจทำให้ข้อความรองดูเป็น primary เกินไป ต้องคงลำดับชั้น"
        ],
        refs: [
          fileRef(REGISTRY, "registry.rs · gray-on-color"),
          fileRef("README.npm.md", "README.npm.md · what it detects")
        ],
        sourcePath: "crates/foundation/src/registry.rs"
      },
      {
        id: "bounce-easing",
        cat: "rule",
        type: "rule",
        name: "bounce-easing",
        summary: "easing แบบ bounce หรือ elastic ที่ดูเก่าและทำให้งานไม่น่าเชื่อถือ",
        overview: "กฎใน registry หมวด `slop` และมี severity `advisory`: bounce และ elastic easing ให้ความรู้สึก dated และ tacky วัตถุจริงชะลอความเร็วอย่างนุ่มนวล ทางแก้คือใช้ exponential easing เช่น ease-out-quart, quint หรือ expo ใช้เมื่อเลือก easing ให้ animation หรือ transition",
        cautions: [
          "เป็น advisory จึงไม่ควรถูกใช้เป็นเหตุผลบล็อกงานโดยไม่มีบริบท",
          "easing ที่เหมาะกับงานอาจขึ้นกับบุคลิกของแบรนด์ — ตรวจกับ motion ที่มีอยู่ทั้งระบบ"
        ],
        refs: [
          fileRef(REGISTRY, "registry.rs · bounce-easing"),
          fileRef("README.npm.md", "README.npm.md · what it detects")
        ],
        sourcePath: "crates/foundation/src/registry.rs"
      },
      {
        id: "dark-glow",
        cat: "rule",
        type: "rule",
        name: "dark-glow",
        summary: "เงาเรืองแสงสี (glow) ที่เป็น default look ของ UI ที่ AI สร้าง",
        overview: "กฎใน registry หมวด `slop`: colored glow shadow — ทั้ง chromatic halo แบบ zero-offset ของ box-shadow/text-shadow บนพื้นใด ๆ และเงาสีเบลอบนพื้นมืด — เป็น look แบบ \"cool\" ที่โมเดลเลือกเป็นค่าเริ่มต้น ทางแก้คือใช้ neutral elevation shadow และ lighting ที่มีเหตุผล ใช้เมื่อใส่ glow หรือเงาเรืองแสงรอบ element",
        cautions: [
          "แสงที่ตั้งใจและผูกกับ material ของหน้าไม่ใช่ target ของกฎนี้",
          "อย่าแก้ด้วยการลบ elevation ทั้งหมดจน hierarchy ของชั้นข้อมูลหาย"
        ],
        refs: [
          fileRef(REGISTRY, "registry.rs · dark-glow"),
          fileRef("README.npm.md", "README.npm.md · what it detects")
        ],
        sourcePath: "crates/foundation/src/registry.rs"
      },

      /* ---------- CLI ---------- */
      {
        id: "cli-install",
        cat: "cli",
        type: "cli",
        name: "npx impeccable install",
        summary: "ติดตั้งสกิลลง harness ที่ตรวจพบ พร้อมเลือก provider scope และ hook manifest แบบ native",
        overview: "คำสั่งติดตั้งหลักจาก root ของโปรเจกต์: ตรวจ harness folders หรือ CLI ที่มีในเครื่อง แสดงรายการที่พบ ให้เลือก provider และขอบเขต project/global แล้วติดตั้งสกิลกับ hook manifest ของ provider นั้น บน Claude Code, Cursor, Codex, GitHub Copilot และ Grok Build จะติดตั้ง hook สำหรับตรวจ UI หลังการแก้ไฟล์ด้วย หลังติดตั้งต้อง reload harness และใน Codex ต้องเปิด `/hooks` อนุมัติ project hook",
        prerequisites: [
          "Node.js 18.19+ สำหรับรัน npx (engine เป็น binary แยก)",
          "อยู่ที่ root ของโปรเจกต์ที่จะติดตั้ง"
        ],
        invoke: [
          { label: "ติดตั้งแบบ interactive", code: "npx impeccable install", language: "shell" },
          { label: "ไม่ถามและระบุ provider/scope", code: "npx impeccable install -y --providers=claude,codex --scope=project", language: "shell" },
          { label: "ไม่ติดตั้ง hook", code: "npx impeccable install --no-hooks", language: "shell" }
        ],
        examples: [
          {
            title: "ติดตั้งในโปรเจกต์",
            prompt: "npx impeccable install",
            result: "เลือก provider และ project scope แล้วได้สกิลในโฟลเดอร์ของ harness"
          },
          {
            title: "ติดตั้งแบบไม่ interactive",
            prompt: "npx impeccable install -y --providers=claude,codex --scope=project",
            result: "ติดตั้งเฉพาะสอง provider ที่ระบุในโปรเจกต์โดยไม่ต้องตอบคำถาม"
          },
          {
            title: "ติดตั้งโดยไม่แตะ hook",
            prompt: "npx impeccable install --no-hooks",
            result: "ติดตั้งสกิลอย่างเดียวและข้ามการเขียน hook manifest"
          }
        ],
        cautions: [
          "หลังติดตั้งต้อง reload harness และใน Codex ต้องอนุมัติ project hook ผ่าน /hooks",
          "การติดตั้งทับ hook manifest ที่ malformed จะหยุดโดยค่าเริ่มต้น; --force จะ backup เป็น .bak แล้วแทนที่"
        ],
        refs: [
          fileRef("README.md", "README.md · Installation"),
          fileRef("docs/HARNESSES.md", "HARNESSES.md")
        ],
        sourcePath: "README.md"
      },
      {
        id: "cli-update",
        cat: "cli",
        type: "cli",
        name: "npx impeccable update",
        summary: "รีเฟรชสกิลและ hook ที่ติดตั้งไว้ให้เป็นเวอร์ชันปัจจุบัน",
        overview: "`update` หา install ที่มีอยู่ทั้งระดับ project และ user แล้วรีเฟรชสกิลกับ hook manifest ให้ตรงเวอร์ชันที่เผยแพร่ ถ้ามีทั้งสองระดับจะถามว่าจะอัปเดตอันไหน และใน non-TTY จะเลือก project เป็นค่าเริ่มต้น หลังอัปเดต Codex อาจต้องอนุมัติ hook ใหม่ถ้า `.codex/hooks.json` เปลี่ยน เพราะ Codex เก็บ trust ตาม hook definition",
        prerequisites: [
          "มี Impeccable ติดตั้งอยู่แล้วใน project หรือ user scope",
          "เชื่อมต่อเครือข่ายเพื่อตรวจเวอร์ชันใหม่"
        ],
        invoke: [
          { label: "อัปเดต install ที่พบ", code: "npx impeccable update", language: "shell" },
          { label: "เลือก scope ชัดเจน", code: "npx impeccable update --project", language: "shell" },
          { label: "บังคับเขียนทับ", code: "npx impeccable update --force", language: "shell" }
        ],
        examples: [
          {
            title: "อัปเดตตามปกติ",
            prompt: "npx impeccable update",
            result: "ตรวจเวอร์ชันแล้วรีเฟรชสกิลและ hook ถ้ามีของใหม่"
          },
          {
            title: "อัปเดตเฉพาะโปรเจกต์",
            prompt: "npx impeccable update --project",
            result: "เลือก install ระดับ project โดยไม่แตะ user-level install"
          },
          {
            title: "ซ่อม hook ที่ค้าง",
            prompt: "npx impeccable update --force",
            result: "เขียนสกิลและ hook ใหม่แม้ tree hash จะตรงกันอยู่แล้ว"
          }
        ],
        cautions: [
          "การอัปเดตระหว่างเซสชันจะไม่เปลี่ยนสกิลที่เซสชันนั้นอ่านอยู่ — ต้องเริ่มเซสชันใหม่",
          "ใน Codex หลังอัปเดตให้เปิด /hooks ตรวจและอนุมัติ hook อีกครั้งเมื่อถูกถาม"
        ],
        refs: [
          fileRef("README.md", "README.md · Installation"),
          fileRef("docs/CLI-CONTRACT.md", "CLI-CONTRACT.md · install/update")
        ],
        sourcePath: "README.md"
      },
      {
        id: "cli-link",
        cat: "cli",
        type: "cli",
        name: "npx impeccable link",
        summary: "เชื่อมสกิลจาก git submodule checkout เข้า harness ด้วย symlink",
        overview: "`link` ใช้กับทีมที่ vendor Impeccable ผ่าน git submodule: หลังเพิ่ม repo เป็น submodule แล้ว คำสั่งนี้สร้าง symlink ของแต่ละ skill folder จาก `.impeccable/dist/universal/` เข้าโฟลเดอร์ของ provider ที่เลือก โฟลเดอร์ skill จริงที่มีอยู่แล้วจะไม่ถูกแตะ เว้นแต่ส่ง `--force` ทางเลือกนี้ทำให้การอัปเดตมาทาง Git แทน `npx impeccable update`",
        prerequisites: [
          "มี checkout หรือ submodule ของ Impeccable ที่มี `dist/universal/`",
          "รู้ provider ที่โปรเจกต์ใช้"
        ],
        invoke: [
          { label: "เชื่อมจาก submodule", code: "npx impeccable link --source=.impeccable --providers=claude,cursor", language: "shell" },
          { label: "ระบุ provider เดียว", code: "npx impeccable link --source=.impeccable --providers=claude", language: "shell" },
          { label: "เขียนทับ link เดิม", code: "npx impeccable link --source=.impeccable --providers=claude --force", language: "shell" }
        ],
        examples: [
          {
            title: "ติดตั้งผ่าน submodule",
            prompt: "git submodule add https://github.com/pbakaus/impeccable .impeccable",
            result: "ได้ checkout ภายใน repo ก่อนสั่ง link เข้า provider ที่ต้องการ"
          },
          {
            title: "เชื่อมสอง harness",
            prompt: "npx impeccable link --source=.impeccable --providers=claude,cursor",
            result: "สร้าง symlink ของสกิลใน .claude และ .cursor โดยไม่คัดลอกไฟล์"
          },
          {
            title: "อัปเดตตาม submodule",
            prompt: "git submodule update --remote .impeccable",
            result: "ดึงคอมมิตใหม่ แล้วรัน link ซ้ำเพื่อชี้ symlink ไปยัง build ล่าสุด"
          }
        ],
        cautions: [
          "source ต้องมี dist/universal/ หรือ provider skill folders ไม่งั้นคำสั่งจะหยุด",
          "โฟลเดอร์ skill จริงที่ไม่ใช่ symlink จะถูกข้าม เว้นแต่ใช้ --force"
        ],
        refs: [
          fileRef("README.md", "README.md · Git Submodule"),
          fileRef("docs/CLI-CONTRACT.md", "CLI-CONTRACT.md · link")
        ],
        sourcePath: "README.md"
      },
      {
        id: "cli-detect",
        cat: "cli",
        type: "cli",
        name: "npx impeccable detect",
        summary: "สแกนโฟลเดอร์ ไฟล์ HTML หรือ URL ด้วย 61 กฎแบบ deterministic โดยไม่ใช้ LLM",
        overview: "`detect` รัน detector เดียวกับที่ hook และ extension ใช้ ตรวจ HTML, CSS, JSX, TSX, Vue และ Svelte ด้วย 61 กฎ โดยไม่ต้องมี API key หรือ agent รับ target เป็น directory, ไฟล์ หรือ URL (URL ใช้ Chrome/Chromium/Edge ที่ติดตั้งไว้) ผลแบบมนุษย์อ่านเขียนที่ stderr ส่วน `--json` ให้ผลบน stdout เหมาะกับ CI exit code คือ 0 เมื่อสแกนจบโดยไม่มี primary finding, 2 เมื่อพบ และ 1 เมื่อมี target ที่สแกนไม่ได้",
        prerequisites: [
          "Node.js 18.19+ สำหรับ npx",
          "สำหรับ URL scan: Chrome, Chromium หรือ Edge ที่ติดตั้งไว้"
        ],
        invoke: [
          { label: "สแกนโฟลเดอร์", code: "npx impeccable detect src/", language: "shell" },
          { label: "สแกน URL", code: "npx impeccable detect https://example.com", language: "shell" },
          { label: "ผลแบบ JSON สำหรับ CI", code: "npx impeccable detect --json .", language: "shell" }
        ],
        examples: [
          {
            title: "สแกนทั้งโฟลเดอร์",
            prompt: "npx impeccable detect src/",
            result: "รายงาน finding พร้อมตำแหน่งบน stderr โดยไม่เรียกโมเดล"
          },
          {
            title: "ตรวจหน้าที่ deploy แล้ว",
            prompt: "npx impeccable detect https://example.com",
            result: "ตรวจ DOM ที่เรนเดอร์แล้วและ stylesheet ที่เข้าถึงได้ผ่านเบราว์เซอร์ในเครื่อง"
          },
          {
            title: "สแกนดิบโดยไม่ใช้ config",
            prompt: "npx impeccable detect --no-config src/",
            result: "ไม่ใช้ ignore และ design-system config ของโปรเจกต์ในการตัดสิน"
          }
        ],
        cautions: [
          "ผลที่สะอาดเป็นหลักฐานของการสแกน ไม่ใช่การรับรองคุณภาพเชิงภาพหรือ accessibility",
          "URL scan อ่าน cross-origin CSS ไม่ได้ถ้าไม่มี CORS และไม่แทนการดูหน้าในหลาย viewport"
        ],
        refs: [
          fileRef("README.md", "README.md · CLI"),
          fileRef("docs/CLI-CONTRACT.md", "CLI-CONTRACT.md · detect")
        ],
        sourcePath: "README.md"
      },
      {
        id: "cli-ignores",
        cat: "cli",
        type: "cli",
        name: "npx impeccable ignores",
        summary: "ดูและเพิ่มข้อยกเว้นของ detector ทั้งระดับไฟล์และค่ารายกฎ พร้อมเหตุผล",
        overview: "`ignores` จัดการรายการยกเว้นที่ detector ใช้ร่วมกับ design hook: `list` แสดงของปัจจุบัน, `add-file` ยกเว้นทั้งไฟล์ตาม glob และ `add-value` ยกเว้นค่ารายกฎ เช่น ฟอนต์ที่แบรนด์ปักไว้ พร้อม `--reason` เพื่อเก็บเหตุผล การยกเว้นถูกบันทึกใน config และใช้ทั้ง `detect` กับ hook ตามค่าเริ่มต้น ใช้เมื่อมีของที่ตั้งใจใช้และไม่ต้องการให้เตือนซ้ำ",
        prerequisites: [
          "มีโปรเจกต์ที่ใช้ Impeccable และ config ของ detector",
          "รู้กฎและค่าที่ต้องการยกเว้น"
        ],
        invoke: [
          { label: "ดูรายการยกเว้น", code: "npx impeccable ignores list", language: "shell" },
          { label: "ยกเว้นทั้งไฟล์", code: "npx impeccable ignores add-file \"src/legacy/**\"", language: "shell" },
          { label: "ยกเว้นค่ารายกฎพร้อมเหตุผล", code: "npx impeccable ignores add-value overused-font Inter --reason \"Brand font\"", language: "shell" }
        ],
        examples: [
          {
            title: "ตรวจข้อยกเว้นที่มี",
            prompt: "npx impeccable ignores list",
            result: "แสดง rule, file และ value ที่ถูกยกเว้นพร้อมเหตุผลที่บันทึกไว้"
          },
          {
            title: "ยกเว้นโฟลเดอร์เก่า",
            prompt: "npx impeccable ignores add-file \"src/legacy/**\"",
            result: "ทุกกฎถูกยกเว้นในไฟล์ที่ match glob นี้"
          },
          {
            title: "ยกเว้นฟอนต์แบรนด์",
            prompt: "npx impeccable ignores add-value overused-font Inter --reason \"Brand font\"",
            result: "กฎ overused-font ไม่เตือนกับค่า Inter และเก็บเหตุผลไว้ใน config"
          }
        ],
        cautions: [
          "การยกเว้นควรมีเหตุผลและแคบที่สุด — อย่าปิดทั้งกฎเพราะเจอกรณีเดียว",
          "ข้อยกเว้นที่ควรไปกับไฟล์สามารถใช้ inline comment ได้ และจะถูกข้ามเมื่อใช้ --no-config"
        ],
        refs: [
          fileRef("README.md", "README.md · CLI"),
          fileRef("skill/reference/hooks.md", "hooks.md · ignores")
        ],
        sourcePath: "README.md"
      },
      {
        id: "cli-telemetry",
        cat: "cli",
        type: "cli",
        name: "npx impeccable telemetry",
        summary: "ดูหรือปิด telemetry ที่เปิดโดยค่าเริ่มต้น พร้อมทางเลือกด้วย environment variable",
        overview: "Telemetry เปิดโดยค่าเริ่มต้น: เมื่อเริ่ม design ใหม่ สกิลขอ roll จาก API ที่ impeccable.style และบันทึกแบบไม่ระบุตัวตนว่า hand ไหนถูกแสดง การ์ดไหนชนะ ข้อมูลที่ส่งมี roll key, scope, รอบ re-roll, catalog revision และชนิดการ์ดที่ชนะ — ไม่ส่งชื่อโปรเจกต์ ไฟล์ โค้ด หรือ PRODUCT.md ปิดได้ด้วย `telemetry off`, `DO_NOT_TRACK=1`, `IMPECCABLE_NO_TELEMETRY=1` หรือ `\"telemetry\": false` ใน `.impeccable/config.json`",
        prerequisites: [
          "มี Impeccable CLI หรือสกิลที่เรียก engine ได้",
          "ตัดสินใจระดับนโยบายว่าจะเก็บ telemetry ระดับเครื่องหรือโปรเจกต์"
        ],
        invoke: [
          { label: "ปิด telemetry", code: "npx impeccable telemetry off", language: "shell" },
          { label: "ดูสถานะ", code: "npx impeccable telemetry status", language: "shell" },
          { label: "ปิดผ่าน environment", code: "DO_NOT_TRACK=1", language: "shell" }
        ],
        examples: [
          {
            title: "ปิดบนเครื่องนี้",
            prompt: "npx impeccable telemetry off",
            result: "บันทึกค่าปิดใน ~/.impeccable/config.json และคงอยู่ข้ามเซสชัน"
          },
          {
            title: "ตรวจว่าปิดอยู่ไหม",
            prompt: "npx impeccable telemetry status",
            result: "รายงานสถานะปัจจุบันโดยไม่เปลี่ยนค่า"
          },
          {
            title: "ปิดชั่วคราวใน CI",
            prompt: "IMPECCABLE_NO_TELEMETRY=1 npx impeccable detect src/",
            result: "คำสั่งที่รันใน environment นั้นไม่ส่งข้อมูล telemetry"
          }
        ],
        cautions: [
          "แม้ปิด telemetry แล้ว roll ยังทำงาน แต่ API จะถูกบอกไม่ให้บันทึก",
          "อย่าใช้ `--from` กับ key สั้นที่คาดเดาง่ายแล้วถือว่าเป็นความลับ — reference ของ key นั้นเดาได้"
        ],
        refs: [
          fileRef("README.md", "README.md · Telemetry"),
          fileRef("skill/reference/hooks.md", "hooks.md · config")
        ],
        sourcePath: "README.md"
      }
    ],
    idKey: "id",
    unit: "รายการ",
    catLabel: {
      command: "คำสั่ง",
      mode: "โหมด",
      principle: "หลักการ",
      rule: "กฎตรวจ",
      cli: "CLI"
    },
    collection: {
      repo: REPO,
      version: "4.7.0",
      license: "Apache-2.0",
      verifiedAt: "2026-10-23"
    }
  };
})();
