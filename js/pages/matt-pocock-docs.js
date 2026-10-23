/* Page module: matt-pocock-docs. Verified against aihero.dev/skills and mattpocock/skills (2026-10-23). */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  var REPO = "https://github.com/mattpocock/skills";
  var SITE = "https://www.aihero.dev/skills";

  var SHIPPED = "อยู่ในชุด 27 skills ที่หน้า AI Hero แสดง และติดตั้งผ่าน skills CLI หรือ Claude plugin ได้";
  var IN_PROGRESS = "รายการเก่าจาก source repo ที่ไม่อยู่ใน AI Hero catalog ปัจจุบัน";
  var IN_PROGRESS_CAUTION = "ไม่แสดงใน catalog ปัจจุบัน; ตรวจ source repo ก่อนติดตั้ง";
  var MISC = "รายการเก่าจาก source repo ที่ไม่อยู่ใน AI Hero catalog ปัจจุบัน";
  var MISC_CAUTION = "ไม่แสดงใน catalog ปัจจุบัน; ตรวจ source repo ก่อนติดตั้ง";

  function ref(path, label) {
    return { label: label, href: REPO + "/blob/main/" + path };
  }

  function invoke(id, note) {
    return [{ label: "เรียกใช้", code: "/" + id, language: "text", note: note }];
  }

  function setupStep() {
    return {
      label: "เตรียม repo (ครั้งแรก)",
      code: "/setup-matt-pocock-skills",
      language: "text",
      note: "ต้องรันก่อน flow ที่อ่านหรือเขียน issue tracker"
    };
  }

  NS.pages["matt-pocock-docs"] = {
    data: [
      /* ---------- engineering · user-invoked ---------- */
      {
        id: "ask-matt",
        cat: "engineering",
        type: "skill",
        name: "ask-matt",
        summary: "เราเตอร์ที่บอกว่าควรใช้ทักษะหรือ flow ไหนกับสถานการณ์ตรงหน้า",
        overview: "ทักษะนี้ไม่ได้ทำงานแทนทักษะอื่น แต่ช่วยเลือกเส้นทาง: มี main flow idea → ship, on-ramp สำหรับ triage, บั๊ก และงานใหญ่, codebase health และ vocabulary layer ที่อยู่ใต้ทุก flow. ก่อนตอบว่าทักษะปลายทางทำอะไรได้ ต้องอ่าน SKILL.md ของทักษะนั้นจริง เพราะสรุปใน router ใช้เพียง orientation. ใช้เมื่อไม่แน่ใจว่าจะเริ่มตรงไหน หรือกำลังจะข้ามขั้นและอยากรู้ว่าข้ามได้หรือไม่",
        prerequisites: [
          "ติดตั้งชุดนี้แล้วและเห็นทักษะในรายการของ harness",
          "มีสถานการณ์หรือโจทย์อย่างน้อยหนึ่งประโยคให้ router จัดเส้น"
        ],
        invoke: invoke("ask-matt", SHIPPED),
        examples: [
          {
            title: "ไม่รู้ว่าจะเริ่มตรงไหน",
            prompt: "/ask-matt มีบั๊กที่ reproduce ไม่ได้ และมี issue ค้างอยู่ ควรเริ่มอะไรก่อน",
            result: "แยกเส้น /diagnosing-bugs กับ /triage พร้อมบอกว่าอะไรควรมาจากอะไร"
          },
          {
            title: "งานใหญ่เกินหนึ่งเซสชัน",
            prompt: "/ask-matt ฟีเจอร์นี้ยังไม่รู้ว่าจะทำอย่างไร ควรใช้ /wayfinder หรือ /to-spec",
            result: "อธิบายว่า wayfinder ใช้เมื่อทางยังไม่ชัด และ to-spec ใช้เมื่อตัดสินใจได้แล้ว"
          },
          {
            title: "อยากข้ามขั้น",
            prompt: "/ask-matt ข้าม /to-tickets แล้วเข้า /implement-spec ได้ไหม",
            result: "อ่านข้อกำหนดของ implement-spec แล้วตอบตามจริง ไม่เดาจากชื่อ"
          }
        ],
        cautions: [
          "สรุปใน router ใช้ orient เท่านั้น ต้องเปิด SKILL.md ของทักษะปลายทางก่อนอ้างว่ามันทำอะไร",
          "ask-matt เป็น user-invoked จึงไม่ควรถูกเรียกเป็นทางอ้อมจากทักษะอื่น"
        ],
        refs: [
          ref("skills/engineering/ask-matt/PHASE-BOUNDARIES.md", "PHASE-BOUNDARIES.md — วิธีเลือก continue, clear, handoff, subagent หรือ compact"),
          ref("README.md#reference", "README — Reference"),
          { label: "AI Hero — skills", href: SITE }
        ],
        sourcePath: "skills/engineering/ask-matt/SKILL.md"
      },
      {
        id: "grill-with-docs",
        cat: "engineering",
        type: "skill",
        name: "grill-with-docs",
        summary: "สัมภาษณ์แผนหรือดีไซน์แบบไม่ปล่อยผ่าน พร้อมอัปเดต GLOSSARY.md และ ADR ระหว่างคุย",
        overview: "เรียก Skill tool สองครั้ง คือ grilling และ domain-modeling แล้วทำสองอย่างพร้อมกัน: ซักทุกกิ่งของ design tree ทีละรอบ และจับคำศัพท์ที่ยังฟุ้งให้เป็น canonical term พร้อมเขียน glossary กับ ADR ทันทีที่ตัดสินได้. ต่างจาก /grill-me ตรงที่เก็บ paper trail ไว้ใน repo จึงเหมาะเมื่อมี working directory. เป็นทางเริ่มหลักของ main flow เพราะสิ่งที่คุยได้กลายเป็นเอกสารที่ session ถัดไปอ่านต่อ",
        prerequisites: [
          "อยู่ใน repo ที่มีหรือยอมให้สร้าง GLOSSARY.md และ docs/adr/",
          "พร้อมตอบคำถามหลายรอบและยืนยันคำศัพท์ที่ตกลง"
        ],
        invoke: invoke("grill-with-docs", SHIPPED),
        examples: [
          {
            title: "เพิ่มฟีเจอร์ที่มีขอบเขตไม่ชัด",
            prompt: "/grill-with-docs อยากเพิ่มระบบ partial refund ให้ billing",
            result: "ถามทีละรอบเรื่องขอบเขต refund กับ void และบันทึกคำศัพท์ที่นิ่งแล้วลง GLOSSARY.md"
          },
          {
            title: "คำเดียวกันหมายหลายอย่าง",
            prompt: "/grill-with-docs ทีมใช้คำว่า account ปนกันหลายความหมาย",
            result: "แยก Customer กับ User แล้วอัปเดต glossary พร้อมเสนอ ADR เฉพาะเรื่องที่กลับยาก"
          },
          {
            title: "ชนกับ ADR เดิม",
            prompt: "/grill-with-docs จะเปลี่ยนจาก REST เป็น tRPC แต่มี ADR ห้ามไว้",
            result: "ตรวจ ADR และถามว่าจะ revisit หรือไม่ก่อนเสนอทางเลือก"
          }
        ],
        cautions: [
          "ต้องมี working directory; ถ้าไม่มีให้ใช้ /grill-me ซึ่งไม่มี state",
          "อย่าเขียน ADR ทุกเรื่อง: ต้องครบ hard to reverse, surprising without context และเป็น trade-off จริง",
          "GLOSSARY.md ต้องไม่มี implementation detail หรือทำหน้าที่เป็น spec"
        ],
        refs: [
          ref("skills/productivity/grilling/SKILL.md", "grilling — primitive ที่ถูกเรียกใช้"),
          ref("skills/engineering/domain-modeling/SKILL.md", "domain-modeling — ส่วนที่เขียนเอกสาร")
        ],
        sourcePath: "skills/engineering/grill-with-docs/SKILL.md"
      },
      {
        id: "triage",
        cat: "engineering",
        type: "skill",
        name: "triage",
        summary: "พา issue และ PR ภายนอกผ่าน state machine ของ triage พร้อมเขียน brief ให้ agent ลงมือ",
        overview: "จัดบทบาทเป็น category (bug หรือ enhancement) และ state (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix) โดย issue หนึ่งมีอย่างละหนึ่งบทบาท. ขั้นตอนคือรวมบริบท ตรวจว่า codebase มี behavior นี้อยู่แล้วหรือไม่ และเทียบกับ .out-of-scope/ แนะนำสถานะ ตรวจข้อกล่าวอ้างด้วยการ reproduce หรือ checkout PR แล้ว grill ถ้ายังต้องเติมรายละเอียด ก่อนเขียน agent brief. ทุกคอมเมนต์ที่ triage สร้างต้องขึ้นต้นด้วย disclaimer ว่า AI สร้าง",
        prerequisites: [
          "รัน /setup-matt-pocock-skills เพื่อตั้ง issue tracker และ label vocabulary",
          "สิทธิ์อ่านและเขียน issue บน tracker ที่ตั้งไว้"
        ],
        invoke: invoke("triage", SHIPPED).concat(setupStep()),
        examples: [
          {
            title: "ดูคิวทั้งหมด",
            prompt: "/triage แสดงสิ่งที่ต้องดูวันนี้",
            result: "สาม bucket: unlabeled, needs-triage และ needs-info ที่มีผู้รายงานตอบกลับ พร้อม count"
          },
          {
            title: "issue เดียว",
            prompt: "/triage ดู #42 ให้หน่อย",
            result: "ตรวจ codebase ว่ามี implementation อยู่แล้วหรือไม่ แล้วแนะนำ category และ state"
          },
          {
            title: "ย้ายสถานะตรง ๆ",
            prompt: "/triage ย้าย #42 ไป ready-for-agent",
            result: "ยืนยันการเปลี่ยน label และถามว่าจะเขียน agent brief ด้วยหรือไม่"
          }
        ],
        cautions: [
          "อย่า triage ตั๋วที่ /to-tickets สร้าง เพราะถูกทำมาให้ agent คว้าไปทำอยู่แล้ว",
          "ห้ามโพสต์คอมเมนต์โดยไม่มี disclaimer ว่า AI สร้างระหว่าง triage",
          "ถ้า tracker ใช้ label คนละชื่อ ต้องใช้ mapping จาก setup ห้ามสร้าง label ซ้ำ"
        ],
        refs: [
          ref("skills/engineering/triage/AGENT-BRIEF.md", "AGENT-BRIEF.md — โครง brief ที่ agent ใช้ได้"),
          ref("skills/engineering/triage/OUT-OF-SCOPE.md", "OUT-OF-SCOPE.md — วิธีเก็บคำขอที่ปฏิเสธ")
        ],
        sourcePath: "skills/engineering/triage/SKILL.md"
      },
      {
        id: "improve-codebase-architecture",
        cat: "engineering",
        type: "skill",
        name: "improve-codebase-architecture",
        summary: "สแกนหา deepening opportunity ทำรายงาน HTML ให้เลือก แล้ว grill ตัวที่เลือก",
        overview: "ใช้คำศัพท์ของ codebase-design และภาษาจาก GLOSSARY.md กับ ADR ของ repo. เลือกขอบเขตแบบ YAGNI จาก hot spot ใน git log หรือทิศที่ผู้ใช้ระบุ แล้วให้ sub-agent หา friction เช่น shallow module หรือจุดที่ทดสอบผ่าน interface ไม่ได้. เขียนรายงาน self-contained ลง temp directory พร้อม before/after และ Top recommendation ก่อน grill candidate ที่ผู้ใช้เลือก",
        prerequisites: [
          "repo ที่มีประวัติ commit พอให้เห็น hot spot",
          "เบราว์เซอร์สำหรับเปิดรายงาน HTML"
        ],
        invoke: invoke("improve-codebase-architecture", SHIPPED),
        examples: [
          {
            title: "สำรวจทั้ง codebase",
            prompt: "/improve-codebase-architecture หาจุดที่ควรทำให้โมดูลลึกขึ้นให้หน่อย",
            result: "ได้รายงาน HTML ที่มี candidate หลายใบพร้อม before/after และข้อเสนอแรก"
          },
          {
            title: "เจาะพื้นที่ที่เพิ่งแก้",
            prompt: "/improve-codebase-architecture ดูเฉพาะ billing หลัง sprint ที่ผ่านมา",
            result: "โฟกัส hot spot ใน billing และไม่กระจายไปทั้ง repo"
          },
          {
            title: "ต่อจาก candidate",
            prompt: "/improve-codebase-architecture เอา candidate ใบที่สองมาคุยต่อ",
            result: "grill เรื่อง constraint, seam และเทสที่จะรอด พร้อมอัปเดต glossary"
          }
        ],
        cautions: [
          "นี่คือ survey ไม่ใช่ rescue: มันชี้ candidate แต่ไม่รื้อ codebase ให้",
          "รายงานถูกเขียนนอก repo ใน temp directory อย่าให้ไฟล์หลุดเข้า working tree",
          "อย่าเพิ่งออกแบบ interface ก่อนผู้ใช้เลือก candidate"
        ],
        refs: [
          ref("skills/engineering/improve-codebase-architecture/HTML-REPORT.md", "HTML-REPORT.md — โครงรายงานและรูปแบบ diagram"),
          ref("skills/engineering/codebase-design/SKILL.md", "codebase-design — คำศัพท์ที่รายงานต้องใช้")
        ],
        sourcePath: "skills/engineering/improve-codebase-architecture/SKILL.md"
      },
      {
        id: "setup-matt-pocock-skills",
        cat: "engineering",
        type: "skill",
        name: "setup-matt-pocock-skills",
        summary: "ตั้งค่า repo สำหรับชุด engineering: issue tracker, triage labels และที่อยู่ domain docs",
        overview: "เป็น prompt-driven skill ไม่ใช่ script ตายตัว: สำรวจ git remote, CLAUDE.md/AGENTS.md, GLOSSARY.md, docs/adr, .scratch และสัญญาณ monorepo ก่อนเสนอคำแนะนำทีละส่วน. เขียน docs/agents/issue-tracker.md, docs/agents/domain.md และ docs/agents/triage-labels.md เมื่อมี triage ติดตั้งอยู่ พร้อมเพิ่มบล็อก Agent skills ในไฟล์ steering ที่มีอยู่. ถ้าเลือก GitHub หรือ GitLab จะสร้าง label ที่ยังขาดให้ด้วย",
        prerequisites: [
          "สิทธิ์แก้ไฟล์ config และ docs ใน repo",
          "gh หรือ glab CLI ถ้าเลือก tracker นั้น"
        ],
        invoke: invoke("setup-matt-pocock-skills", SHIPPED),
        examples: [
          {
            title: "repo ใหม่ที่ใช้ GitHub",
            prompt: "/setup-matt-pocock-skills ตั้ง repo นี้ให้ใช้ GitHub Issues",
            result: "ได้ docs/agents/*.md และบล็อก Agent skills ใน CLAUDE.md หรือ AGENTS.md"
          },
          {
            title: "โปรเจกต์ส่วนตัวไม่มี remote",
            prompt: "/setup-matt-pocock-skills ใช้ local markdown เป็น tracker",
            result: "ตั้ง convention ไฟล์ใต้ .scratch/ และบันทึกใน issue-tracker.md"
          },
          {
            title: "monorepo หลาย context",
            prompt: "/setup-matt-pocock-skills repo นี้มีหลาย package แต่ละทีมมี glossary เอง",
            result: "เสนอ GLOSSARY-MAP.md และ layout ต่อ context ก่อนเขียน"
          }
        ],
        cautions: [
          "รันครั้งเดียวต่อ repo; รันซ้ำเมื่อเปลี่ยน tracker หรือต้องการเริ่มใหม่เท่านั้น",
          "ถ้ามี CLAUDE.md อยู่แล้วให้แก้ไฟล์นั้น ห้ามสร้าง AGENTS.md คู่กัน",
          "อย่าเขียนทับ section อื่นในไฟล์ steering และอย่าสร้าง label ที่มีอยู่แล้ว"
        ],
        refs: [
          ref("skills/engineering/setup-matt-pocock-skills/issue-tracker-github.md", "issue-tracker-github.md — seed template"),
          ref("skills/engineering/setup-matt-pocock-skills/domain.md", "domain.md — กติกาการอ่าน domain docs"),
          ref(".claude-plugin/plugin.json", "plugin.json — รายชื่อ 27 ทักษะที่ ship")
        ],
        sourcePath: "skills/engineering/setup-matt-pocock-skills/SKILL.md"
      },
      {
        id: "to-spec",
        cat: "engineering",
        type: "skill",
        name: "to-spec",
        summary: "สังเคราะห์บทสนทนาปัจจุบันเป็นสเปกแล้ว publish เข้า issue tracker โดยไม่สัมภาษณ์ใหม่",
        overview: "ใช้บริบทที่คุยมาแล้วและความเข้าใจ codebase เขียน spec ตาม template: Problem Statement, Solution, User Stories, Implementation Decisions, Testing Decisions, Out of Scope และ Further Notes. ก่อนเขียนต้องตกลง seam ที่จะใช้ทดสอบ โดยเลือก seam เดิมและเลือกให้สูงที่สุดเท่าที่ทำได้ เพราะยิ่งมี seam น้อยยิ่งดี. จากนั้น publish ไป tracker พร้อม label ready-for-agent",
        prerequisites: [
          "issue tracker ถูกตั้งค่าแล้ว",
          "บทสนทนาที่มีการตัดสินใจและขอบเขตมากพอจะสังเคราะห์"
        ],
        invoke: invoke("to-spec", SHIPPED).concat(setupStep()),
        examples: [
          {
            title: "จากบทสนทนายาว",
            prompt: "/to-spec ทำสเปกจากที่คุยกันเรื่อง export CSV เมื่อกี้",
            result: "ได้ spec พร้อม user stories และ testing decisions ที่ publish ไป tracker"
          },
          {
            title: "ตกลง seam ก่อน",
            prompt: "/to-spec ฟีเจอร์นี้ควรทดสอบที่ seam ไหน",
            result: "เสนอ seam ที่สูงที่สุดและขอให้ผู้ใช้ยืนยันก่อนเขียนสเปก"
          },
          {
            title: "บทสนทนายังไม่พอ",
            prompt: "/to-spec ทำสเปกจากไอเดียที่เพิ่งพูดไปเมื่อครู่",
            result: "ระบุว่าข้อมูลส่วนใดยังขาด แทนการแต่งรายละเอียดขึ้นเอง"
          }
        ],
        cautions: [
          "ห้ามสัมภาษณ์ผู้ใช้ใหม่ในขั้นนี้: งานคือสังเคราะห์สิ่งที่คุยแล้ว",
          "สเปกไม่ควรมี file path หรือ code snippet เพราะจะเก่าเร็ว ยกเว้น snippet จาก prototype ที่ encode decision",
          "ต้องให้ผู้ใช้ยืนยัน seam ก่อน publish"
        ],
        refs: [
          ref("skills/engineering/to-spec/SKILL.md", "to-spec — spec template ฉบับเต็ม"),
          ref("skills/engineering/to-tickets/SKILL.md", "to-tickets — ขั้นถัดไปหลังได้สเปก")
        ],
        sourcePath: "skills/engineering/to-spec/SKILL.md"
      },
      {
        id: "to-tickets",
        cat: "engineering",
        type: "skill",
        name: "to-tickets",
        summary: "แตกแผน สเปก หรือบทสนทนาเป็น tracer-bullet ticket พร้อม blocking edge แล้ว publish",
        overview: "ตั๋วคือ vertical slice ที่ตัดผ่านทุกชั้นและ demo หรือ verify ได้ในตัวเอง ขนาดพอดีหนึ่ง context window พร้อม blocking edges ที่บอกว่าตั๋วไหนต้องเสร็จก่อน. wide refactor เป็นข้อยกเว้น: ใช้ expand–contract แทนการฝืนบังคับเป็น tracer bullet. ก่อน publish ต้อง quiz ผู้ใช้เรื่อง granularity และ edges จนอนุมัติ. local tracker เขียนหนึ่งไฟล์ต่อตั๋วใต้ .scratch/<feature-slug>/issues/ ส่วน tracker จริงใช้ native blocking link",
        prerequisites: [
          "issue tracker ถูกตั้งค่าแล้ว",
          "มีแผน สเปก หรือบทสนทนาที่มีขอบเขตงานชัด"
        ],
        invoke: invoke("to-tickets", SHIPPED).concat(setupStep()),
        examples: [
          {
            title: "แตกสเปกเป็นตั๋ว",
            prompt: "/to-tickets แตกสเปก export CSV เป็นตั๋วที่ทำได้ทีละใบ",
            result: "ได้รายการตั๋วพร้อม blocked by และ What to build ให้ตรวจก่อน publish"
          },
          {
            title: "งาน refactor กว้าง",
            prompt: "/to-tickets จะ rename คอลัมน์ที่ถูกใช้ทั้ง repo ควรแตกอย่างไร",
            result: "เสนอ expand–contract เป็นชุดตั๋วและอธิบายว่าทำไมไม่ใช้ tracer bullet"
          },
          {
            title: "แก้ granularity",
            prompt: "/to-tickets ตั๋วใบที่สามใหญ่เกินไป ช่วยแยก",
            result: "แยกตั๋วใหม่พร้อมปรับ blocking edges แล้วขออนุมัติอีกครั้ง"
          }
        ],
        cautions: [
          "อย่าแตกตั๋วเป็น horizontal layer เช่น schema ทั้งหมดแล้วค่อย API",
          "ตั๋ว local ต้องหนึ่งไฟล์ต่อตั๋ว ห้ามรวมเป็นไฟล์เดียว",
          "อย่าปิดหรือแก้ parent issue ระหว่างแตกตั๋ว"
        ],
        refs: [
          ref("skills/engineering/to-tickets/SKILL.md", "to-tickets — กติกา vertical slice และ template"),
          ref("skills/engineering/implement/SKILL.md", "implement — ผู้บริโภคตั๋ว")
        ],
        sourcePath: "skills/engineering/to-tickets/SKILL.md"
      },
      {
        id: "implement",
        cat: "engineering",
        type: "skill",
        name: "implement",
        summary: "ลงมือตามสเปกหรือตั๋ว ขับด้วย /tdd ที่ seam ที่ตกลง แล้วปิดด้วย /code-review",
        overview: "อ่านงานที่ผู้ใช้อธิบายใน spec หรือ ticket ถ้าส่ง reference ของตั๋วมา ต้อง fetch จาก tracker และบอกชื่อตั๋วก่อนเริ่ม ถ้า reference กำกวมให้ถาม. ระหว่างทำให้เรียก /tdd ที่ seam ที่ตกลงไว้ รัน typecheck และ test file ที่เกี่ยวข้องบ่อย ๆ แต่รัน full suite ครั้งเดียวตอนจบ จากนั้นเรียก /code-review และ commit เข้า branch ปัจจุบัน",
        prerequisites: [
          "มีสเปกหรือตั๋วที่ขอบเขตชัด",
          "มี seam ที่ตกลงไว้สำหรับ TDD",
          "tracker ถูกตั้งค่าแล้วถ้าต้อง fetch ตั๋ว"
        ],
        invoke: invoke("implement", SHIPPED).concat(setupStep()),
        examples: [
          {
            title: "ทำตั๋วเดียว",
            prompt: "/implement ตั๋วนี้",
            result: "fetch ตั๋ว บอกชื่อ แล้วสร้างงานด้วย /tdd ก่อนปิดด้วย /code-review"
          },
          {
            title: "ทำจากสเปกในบทสนทนา",
            prompt: "/implement ทำสเปก export CSV ที่เพิ่งสรุปกันไป",
            result: "เริ่มที่ seam ที่ตกลงและ commit งานเมื่อรีวิวผ่าน"
          },
          {
            title: "reference กำกวม",
            prompt: "/implement ตั๋วนั้นแหละ",
            result: "ถามกลับว่าตั๋วไหนก่อนเริ่ม เพื่อไม่ทำงานผิดใบ"
          }
        ],
        cautions: [
          "อย่าเริ่มเขียนเทสก่อนตกลง seam เพราะ /tdd ห้ามทดสอบที่ seam ที่ยังไม่ยืนยัน",
          "full test suite รันครั้งเดียวตอนจบ ไม่ใช่ทุก edit",
          "อย่า commit ก่อน /code-review ผ่าน"
        ],
        refs: [
          ref("skills/engineering/implement/SKILL.md", "implement — ขั้นตอนฉบับเต็ม"),
          ref("skills/engineering/tdd/SKILL.md", "tdd — วิธีที่ implement ขับ")
        ],
        sourcePath: "skills/engineering/implement/SKILL.md"
      },
      {
        id: "implement-spec",
        cat: "engineering",
        type: "skill",
        name: "implement-spec",
        summary: "ทำทั้งสเปกบน integration branch เดียว โดยมองตั๋วเป็น task graph และยิง subagent ตาม frontier",
        overview: "เป้าหมายคือทุกตั๋วของสเปกถูกปิดตามวิธีที่ tracker ปิดงาน บน integration branch เดียว. ใช้ exploration subagent เมื่อต้องสำรวจและให้มันเก็บ note นอกรีโป, ใช้ implementer subagent ต่อตั๋วใน worktree และ branch ของตัวเองโดยอิง integration branch และ merge tip ก่อนรายงาน, ใช้ merger subagent รวมงาน แล้วเติม implementer เมื่อ frontier ขยาย. ปิดด้วย /code-review ทั้ง branch และแก้ทุกข้อใน implementer ตัวเดียว",
        prerequisites: [
          "มีสเปกและตั๋วที่ผูก blocking edges ครบ",
          "harness ที่มี subagent และ git worktree",
          "tracker ถูกตั้งค่าแล้ว"
        ],
        invoke: invoke("implement-spec", SHIPPED).concat(setupStep()),
        examples: [
          {
            title: "ทำทั้งสเปก",
            prompt: "/implement-spec ทำสเปกนี้ให้ครบทุกตั๋วบน integration branch",
            result: "ยิง implementer ตาม frontier และ merge เข้า integration branch ทีละใบ"
          },
          {
            title: "มี exploration ที่ต้องทำก่อน",
            prompt: "/implement-spec ตั๋วบางใบต้องอ่าน API ภายนอกก่อน ช่วยเก็บ note ให้ subagent",
            result: "exploration subagent เขียน note นอกรีโปและส่ง pointer ให้ implementer"
          },
          {
            title: "ปิดงาน",
            prompt: "/implement-spec งานครบแล้ว ช่วยรีวิวและปิดตั๋วทั้งหมด",
            result: "เรียก /code-review บน integration branch แล้วแก้ใน implementer ตัวเดียว"
          }
        ],
        cautions: [
          "อย่า merge ตรงเข้า main: งานทั้งหมดต้องอยู่บน integration branch ก่อน",
          "สื่อสารกับ subagent ผ่าน context pointer ไม่ก็อปข้อมูลซ้ำ",
          "ต้อง cleanup worktree ของ implementer ทุกตัวเมื่อจบ"
        ],
        refs: [
          ref("skills/engineering/implement-spec/SKILL.md", "implement-spec — ลำดับขั้นและบทบาท subagent"),
          ref("skills/engineering/code-review/SKILL.md", "code-review — ด่านปิดท้าย")
        ],
        sourcePath: "skills/engineering/implement-spec/SKILL.md"
      },
      {
        id: "wayfinder",
        cat: "engineering",
        type: "skill",
        name: "wayfinder",
        summary: "วางแผนงานที่ใหญ่เกินหนึ่งเซสชันเป็น map ของ decision ticket แล้วไล่แก้ทีละใบจนทางชัด",
        overview: "map คือ issue เดียวที่ติด label wayfinder:map และ ticket เป็น child issue ของมัน. แต่ละใบเป็นคำถามที่ resolve เป็น decision ไม่ใช่ deliverable และติด label wayfinder:<research|prototype|grilling|task>. ใช้ native blocking ของ tracker เพื่อให้ frontier มองเห็นได้ใน UI. map จบเมื่อทางชัดและไม่มีอะไรต้องตัดสินก่อนลงมือ จากนั้นส่งต่อ /to-spec ไม่ใช่กระโดดเข้า /implement",
        prerequisites: [
          "tracker ที่รองรับ child issue และ blocking หรือ local-markdown fallback",
          "งานที่ยังเป็น fog จริง ไม่ใช่ฟีเจอร์ที่ scope ชัดแล้ว"
        ],
        invoke: invoke("wayfinder", SHIPPED).concat(setupStep()),
        examples: [
          {
            title: "โครงการใหม่ที่ยังมัว",
            prompt: "/wayfinder อยากทำแพลตฟอร์มคอร์สแต่ยังไม่รู้สถาปัตยกรรม",
            result: "สร้าง map พร้อม destination และ decision ticket ชุดแรกบน frontier"
          },
          {
            title: "ทำงานจาก map",
            prompt: "/wayfinder เอา ticket ถัดไปของ map นี้มาทำ",
            result: "claim ตั๋วก่อนทำงาน แล้วบันทึก resolution กับอัปเดต Decisions so far"
          },
          {
            title: "ทางชัดแล้ว",
            prompt: "/wayfinder map นี้เหลืออะไรอีกไหม",
            result: "ตรวจ frontier และ fog แล้วบอกว่าพร้อมส่งต่อ /to-spec หรือยัง"
          }
        ],
        cautions: [
          "อย่าใช้กับฟีเจอร์ที่ scope ชัด: wayfinder ช้ากว่าและกินแรงกว่ามาก",
          "หนึ่งเซสชัน resolve ได้ไม่เกินหนึ่ง ticket ยกเว้น research ticket",
          "ticket แบบ HITL ต้องคุยกับคนจริง ห้าม agent ตอบแทนผู้ใช้"
        ],
        refs: [
          ref("skills/engineering/wayfinder/SKILL.md", "wayfinder — กติกา map, fog of war และ ticket type"),
          ref("skills/engineering/to-spec/SKILL.md", "to-spec — ปลายทางหลัง map ชัด")
        ],
        sourcePath: "skills/engineering/wayfinder/SKILL.md"
      },
      {
        id: "retro",
        cat: "engineering",
        type: "skill",
        name: "retro",
        summary: "ทบทวนเซสชันแล้วเสนอปรับ environment ของ agent ไม่ใช่ตัวโค้ด",
        overview: "ใช้ writing-for-agents เป็น style guide และอ่าน primary source ของเซสชันที่ผู้ใช้ระบุ หรือเซสชันปัจจุบันถ้าไม่ระบุ. มองหา candidate เจ็ดด้าน: navigation, automated checks, coding standards, global AGENTS.md, tool economy, no-ops และ information access แล้วเรียงตาม severity. หลักคิดคือ implementation agent แบก context หนักที่สุด จึงควรให้ review agent เป็นผู้บังคับ standards และเปลี่ยนความผิดพลาดเชิง mechanical ให้เป็น check ที่รันได้",
        prerequisites: [
          "เข้าถึง session log หรือกำลังอยู่ในเซสชันที่จะทบทวน",
          "อ่าน steering files, lint/typecheck/test scripts และ CI workflow ของ repo ได้"
        ],
        invoke: invoke("retro", SHIPPED),
        examples: [
          {
            title: "หลังเซสชันที่ติดขัด",
            prompt: "/retro ทบทวนเซสชันนี้ว่าอะไรทำให้เสียเวลา",
            result: "ได้ข้อเสนอเรียงตามความรุนแรง พร้อมชี้ว่าเรื่องไหนควรเป็น automated check"
          },
          {
            title: "AGENTS.md บวม",
            prompt: "/retro ช่วยดูว่า AGENTS.md ควรย้ายอะไรออกไปเป็น standards",
            result: "แยก navigation pointer, standards และ no-op ที่ควรลบ"
          },
          {
            title: "ไม่มี guardrail",
            prompt: "/retro repo นี้ควรมี check อะไรเพิ่มก่อน commit",
            result: "ตรวจว่ามี lint/typecheck/test ที่ยังไม่ถูก wire และเสนอ hook หรือ CI job"
          }
        ],
        cautions: [
          "ข้อเสนอต้องเป็น environment ของ agent ไม่ใช่การ rewrite ฟีเจอร์",
          "ความผิดพลาดเชิง mechanical ควรกลายเป็น deterministic check ไม่ใช่ prose rule",
          "อย่าเสนอเพิ่มกฎใน steering file ถ้าสิ่งนั้นตรวจได้ด้วย tooling"
        ],
        refs: [
          ref("skills/productivity/writing-for-agents/SKILL.md", "writing-for-agents — style guide ที่ retro เรียก"),
          ref("skills/engineering/retro/SKILL.md", "retro — รายการ candidate ทั้งเจ็ดด้าน")
        ],
        sourcePath: "skills/engineering/retro/SKILL.md"
      },
      /* ---------- engineering · model-invoked ---------- */
      {
        id: "prototype",
        cat: "engineering",
        type: "skill",
        name: "prototype",
        summary: "สร้างต้นแบบทิ้งได้เพื่อตอบคำถามดีไซน์เดียว: logic/state เป็น HTML ไฟล์เดียว หรือ UI หลายแบบ",
        overview: "คำถามกำหนดรูปแบบ: ถ้าถามว่า logic หรือ state model รู้สึกถูกไหม ใช้ LOGIC.md (HTML ไฟล์เดียว มี free-play และ guided walkthrough); ถ้าถามว่าหน้าตาควรเป็นอย่างไร ใช้ UI.md (หลาย variant บน route เดียว สลับด้วย search param). กฎร่วม: ทำเครื่องหมายว่าทิ้งได้ รันง่าย ไม่มี persistence และโชว์ state ทุกครั้งที่เปลี่ยน. เก็บ prototype บน branch ทิ้ง แล้วพา decision กลับเข้า main",
        prerequisites: [
          "คำถามดีไซน์หนึ่งข้อที่ตอบบนกระดาษไม่ได้",
          "คำสั่งรันโปรเจกต์ หรือเบราว์เซอร์สำหรับเปิด HTML"
        ],
        invoke: invoke("prototype", SHIPPED),
        examples: [
          {
            title: "state model ยังไม่แน่ใจ",
            prompt: "/prototype ช่วยดูว่า state machine ของ checkout รู้สึกถูกไหม",
            result: "ได้ HTML ไฟล์เดียวที่กดเดิน state และเห็นการเปลี่ยนทุกรอบ"
          },
          {
            title: "อยากเทียบ UI",
            prompt: "/prototype ทำหน้า pricing 3 แบบที่สลับดูได้",
            result: "ได้ variant หลายแบบบน route เดียวพร้อมแถบสลับด้านล่าง"
          },
          {
            title: "ตอบแล้วเก็บงาน",
            prompt: "/prototype ต้นแบบนี้ตอบคำถามแล้ว ช่วยเก็บเป็นหลักฐาน",
            result: "commit ลง branch prototype/<name> และผูก pointer จาก issue ที่ implement"
          }
        ],
        cautions: [
          "ถ้าเลือกรูปร่างผิดตั้งแต่ต้นจะเสียงานทั้งชิ้น จึงต้องระบุคำถามให้ชัดก่อน",
          "อย่าใส่ test, error handling หรือ abstraction เกินกว่าที่ทำให้ prototype รันได้",
          "main branch เก็บเฉพาะ decision ที่ผ่านแล้ว ไม่เก็บ prototype"
        ],
        refs: [
          ref("skills/engineering/prototype/LOGIC.md", "LOGIC.md — สาย logic/state"),
          ref("skills/engineering/prototype/UI.md", "UI.md — สาย UI variant")
        ],
        sourcePath: "skills/engineering/prototype/SKILL.md"
      },
      {
        id: "diagnosing-bugs",
        cat: "engineering",
        type: "skill",
        name: "diagnosing-bugs",
        summary: "ลูปวินิจฉัยสำหรับบั๊กยาก: สร้าง feedback loop ที่แดงกับบั๊กนี้ก่อน แล้วค่อยย่อและแก้",
        overview: "มีหกเฟส: สร้าง feedback loop, reproduce และ minimise, ตั้ง 3–5 hypothesis ที่ falsifiable, instrument ทีละตัวแปร, แก้พร้อม regression test ที่ seam ถูกต้อง และ cleanup. หัวใจอยู่เฟสแรก: ต้องมีคำสั่งเดียวที่รันแล้วแดงกับอาการจริง เร็ว deterministic และ agent รันเองได้. ถ้าสร้าง loop ไม่ได้ ต้องหยุดและขอ environment หรือ artifact ที่ redact แล้ว ไม่ใช่เดาต่อ",
        prerequisites: [
          "environment ที่ reproduce อาการได้",
          "สิทธิ์รันเทส, curl, CLI หรือ browser automation"
        ],
        invoke: invoke("diagnosing-bugs", SHIPPED),
        examples: [
          {
            title: "บั๊กเป็นครั้งคราว",
            prompt: "/diagnosing-bugs บางครั้ง login ค้าง 20 วินาที ช่วยหาสาเหตุ",
            result: "สร้าง loop ที่เพิ่ม reproduction rate ก่อน แล้วค่อยย่อ repro"
          },
          {
            title: "เทสพังหลังอัปเกรด",
            prompt: "/diagnosing-bugs อัปเกรด Node แล้วเทส 3 ตัวพัง ช่วยหาว่าอะไรเปลี่ยน",
            result: "ได้ hypothesis หลายข้อพร้อม prediction และ probe ทีละตัวแปร"
          },
          {
            title: "performance regression",
            prompt: "/diagnosing-bugs dashboard ช้าลงหลัง deploy ล่าสุด",
            result: "วัด baseline ก่อน แล้วใช้ profiler หรือ bisect แทนการเดาจาก log"
          }
        ],
        cautions: [
          "ห้ามตั้ง hypothesis ก่อนมี loop ที่แดงกับบั๊กนี้",
          "redact secret ทุกครั้งที่โชว์ command หรือ output",
          "ถ้าไม่มี seam ที่ถูกต้องสำหรับ regression test นั่นคือ finding ไม่ใช่เหตุผลข้ามขั้น"
        ],
        refs: [
          ref("skills/engineering/diagnosing-bugs/scripts/hitl-loop.template.sh", "hitl-loop.template.sh — ทางสุดท้ายเมื่อคนต้องคลิก"),
          ref("skills/engineering/diagnosing-bugs/SKILL.md", "diagnosing-bugs — เกณฑ์ครบทั้งหกเฟส")
        ],
        sourcePath: "skills/engineering/diagnosing-bugs/SKILL.md"
      },
      {
        id: "research",
        cat: "engineering",
        type: "skill",
        name: "research",
        summary: "สืบคำถามจาก primary source แล้วเก็บเป็นไฟล์ Markdown ที่อ้างอิงครบ โดยใช้ background agent",
        overview: "งานนี้ออกแบบมาให้ delegate: spin background agent ขึ้นมาอ่านแทน แล้วเราทำงานอื่นต่อได้. agent ต้องตามแต่ละ claim กลับไปยัง source ที่ owns เรื่องนั้น เช่น official docs, source code, spec หรือ first-party API ไม่ใช่บทความสรุปที่เขียนถึงมัน. ผลลัพธ์คือไฟล์ Markdown ไฟล์เดียวที่ cite ทุก claim และวางตาม convention ของ repo หรือบอกที่อยู่ให้ชัดถ้ายังไม่มี convention",
        prerequisites: [
          "harness ที่มี background agent",
          "สิทธิ์เขียนไฟล์ใน repo"
        ],
        invoke: invoke("research", SHIPPED),
        examples: [
          {
            title: "เก็บข้อเท็จจริง API",
            prompt: "/research หา rate limit ของ Stripe API รุ่นปัจจุบันจากเอกสารทางการ",
            result: "ได้ไฟล์ Markdown ที่อ้าง official docs ทุกข้อ ไม่ใช่ blog สรุป"
          },
          {
            title: "เทียบพฤติกรรมไลบรารี",
            prompt: "/research เทียบว่า Vite กับ webpack จัดการ asset import ต่างกันอย่างไร",
            result: "ตาม claim ไปยัง source code หรือ docs ของทั้งสองโปรเจกต์"
          },
          {
            title: "อ่านไปด้วยทำงานไปด้วย",
            prompt: "/research สรุปข้อกำหนด GDPR ที่เกี่ยวกับ log retention ให้หน่อย",
            result: "background agent อ่านและเขียนไฟล์ โดยเซสชันหลักทำงานต่อได้"
          }
        ],
        cautions: [
          "อย่าใช้ secondary write-up แทน source ที่ owns claim",
          "ถ้า repo ไม่มีที่เก็บ note ต้องบอกผู้ใช้ว่าวางไฟล์ที่ไหน",
          "งานนี้ให้ข้อเท็จจริง ไม่ใช่คำแนะนำเชิงผลิตภัณฑ์"
        ],
        refs: [
          ref("skills/engineering/research/SKILL.md", "research — ขอบเขตงานของ background agent"),
          ref("skills/engineering/grill-with-docs/SKILL.md", "grill-with-docs — ที่ที่ผลวิจัยถูกนำไปใช้ต่อ")
        ],
        sourcePath: "skills/engineering/research/SKILL.md"
      },
      {
        id: "tdd",
        cat: "engineering",
        type: "skill",
        name: "tdd",
        summary: "red-green-refactor ทีละ vertical slice ทั้งเพิ่มฟีเจอร์และแก้บั๊ก",
        overview: "เป็น reference ที่ทำให้ loop ได้เทสที่ควรเก็บ: เทสต้องยืนยัน behavior ผ่าน public interface ไม่ผูกกับ implementation. ก่อนเขียนเทสต้องตกลง seam และเขียนว่า seam ไหนถูกทดสอบ เพราะเทสที่ seam ที่ยังไม่ยืนยันจะไม่ถูกเขียน. anti-pattern ที่ต้องจับคือ implementation-coupled, tautological และ horizontal slicing. หนึ่งรอบคือหนึ่ง seam หนึ่งเทส หนึ่ง minimal implementation ส่วน refactor อยู่นอก loop ไปอยู่ที่ review",
        prerequisites: [
          "คำสั่งรันเทสของโปรเจกต์",
          "seam ที่ตกลงกับผู้ใช้แล้ว"
        ],
        invoke: invoke("tdd", SHIPPED),
        examples: [
          {
            title: "ฟีเจอร์ใหม่",
            prompt: "/tdd เพิ่มการคำนวณส่วนลดจากคูปองแบบทีละ slice",
            result: "เขียนเทสแดงที่ seam ที่ตกลงก่อน แล้วทำโค้ดน้อยที่สุดให้เขียว"
          },
          {
            title: "แก้บั๊ก",
            prompt: "/tdd ผู้ใช้รายงานว่า export CSV แล้วหัวคอลัมน์หาย",
            result: "ได้ reproduction test ที่ fail ก่อน แล้วแก้จนผ่านโดยไม่แตะ behavior อื่น"
          },
          {
            title: "ทดสอบยากเกินไป",
            prompt: "/tdd ฟังก์ชันนี้ทดสอบผ่าน interface ไม่ได้",
            result: "ชี้ว่า seam หรือรูปร่างโมดูลเป็นปัญหา และชวนคุย codebase-design"
          }
        ],
        cautions: [
          "ห้ามเขียนเทสที่ seam ที่ยังไม่ยืนยันกับผู้ใช้",
          "expected value ต้องมาจาก source of truth อิสระ ไม่คำนวณด้วยวิธีเดียวกับโค้ด",
          "refactor ไม่ใช่ส่วนของ red → green; เก็บไว้ที่ขั้น review"
        ],
        refs: [
          ref("skills/engineering/tdd/tests.md", "tests.md — ตัวอย่างเทสที่ดีและไม่ดี"),
          ref("skills/engineering/tdd/mocking.md", "mocking.md — แนวทาง mock")
        ],
        sourcePath: "skills/engineering/tdd/SKILL.md"
      },
      {
        id: "domain-modeling",
        cat: "engineering",
        type: "skill",
        name: "domain-modeling",
        summary: "สร้างและลับ domain model: ท้าทายคำศัพท์ ทดสอบด้วย scenario และอัปเดต GLOSSARY/ADR ทันที",
        overview: "เป็นงาน active ไม่ใช่แค่อ่าน glossary เพื่อเอาคำไปใช้: จับคำที่ขัดกับ glossary เดิม คำที่กำกวมหรือ overloaded แล้วเสนอ canonical term รวมถึงทดสอบความสัมพันธ์ด้วยสถานการณ์ขอบและ cross-check กับโค้ด. เขียน GLOSSARY.md ทันทีที่คำนิ่ง โดย glossary ต้องไม่มี implementation detail และไม่ทำหน้าที่เป็น spec. เสนอ ADR เฉพาะเมื่อการตัดสินใจนั้น hard to reverse, surprising without context และเป็น trade-off จริง",
        prerequisites: [
          "repo ที่ยอมให้สร้างหรือแก้ GLOSSARY.md และ docs/adr/",
          "ผู้ใช้ที่พร้อมยืนยันความหมายของคำ"
        ],
        invoke: invoke("domain-modeling", SHIPPED),
        examples: [
          {
            title: "คำกำกวม",
            prompt: "/domain-modeling team พูดว่า account แต่หมายถึงคนละอย่างกัน",
            result: "แยก Customer กับ User และเขียนคำนิยามที่ใช้ร่วมกันลง GLOSSARY.md"
          },
          {
            title: "ทดสอบด้วย scenario",
            prompt: "/domain-modeling ส่วนลดแบบ pro-rated ควรนับวันอย่างไร",
            result: "สร้างสถานการณ์ขอบเพื่อบังคับให้ boundary ระหว่าง concept ชัด"
          },
          {
            title: "บันทึกการตัดสินใจ",
            prompt: "/domain-modeling เราจะไม่รองรับ partial cancellation",
            result: "ตรวจสามเงื่อนไขของ ADR แล้วบันทึกเฉพาะเมื่อครบ"
          }
        ],
        cautions: [
          "อย่าใส่ spec, scratch pad หรือ implementation decision ลง GLOSSARY.md",
          "อย่าเสนอ ADR ทุกครั้ง: ต้องครบสามเงื่อนไขเท่านั้น",
          "ถ้าโค้ดขัดกับสิ่งที่ผู้ใช้บอก ให้ยกขึ้นมาให้ตัดสิน ไม่เลือกข้างเอง"
        ],
        refs: [
          ref("skills/engineering/domain-modeling/GLOSSARY-FORMAT.md", "GLOSSARY-FORMAT.md — รูปแบบ glossary"),
          ref("skills/engineering/domain-modeling/ADR-FORMAT.md", "ADR-FORMAT.md — รูปแบบ ADR")
        ],
        sourcePath: "skills/engineering/domain-modeling/SKILL.md"
      },
      {
        id: "codebase-design",
        cat: "engineering",
        type: "skill",
        name: "codebase-design",
        summary: "คำศัพท์ร่วมสำหรับออกแบบ deep module: behaviour มากผ่าน interface เล็กที่ seam สะอาด",
        overview: "ให้นิยามที่ใช้คำเดียวกันทั้ง repo: module, interface, implementation, depth, seam, adapter, leverage และ locality พร้อมห้ามใช้ component, service, API หรือ boundary แทน. หลักที่ใช้ตัดสินคือ deletion test, interface คือ test surface และหนึ่ง adapter คือ seam สมมติ สองตัวจึงเป็น seam จริง. ใช้เป็น reference ประกอบการออกแบบ ไม่ใช่ process ที่ต้องรันจนจบ",
        prerequisites: [
          "โค้ดหรือดีไซน์ที่กำลังตัดสินเรื่องขอบเขตโมดูล",
          "ความรู้บริบทของ repo พอที่จะเห็น seam"
        ],
        invoke: invoke("codebase-design", SHIPPED),
        examples: [
          {
            title: "ตัดสินใจเรื่อง seam",
            prompt: "/codebase-design โมดูลนี้ควรมี seam ตรงไหน",
            result: "แยก interface ออกจาก implementation และถามว่ามีกี่ adapter จริง"
          },
          {
            title: "โมดูลตื้นเกินไป",
            prompt: "/codebase-design ช่วยดูว่า service นี้เป็น pass-through ไหม",
            result: "ใช้ deletion test และชี้ว่าจะเกิดอะไรขึ้นถ้าลบมันทิ้ง"
          },
          {
            title: "ออกแบบ interface",
            prompt: "/codebase-design ลองออกแบบ interface ของ payment module หลายแบบ",
            result: "ใช้ design-it-twice เพื่อเทียบ depth, locality และตำแหน่ง seam"
          }
        ],
        cautions: [
          "depth วัดที่ leverage ของ caller ไม่ใช่ ratio ของจำนวนบรรทัด",
          "อย่าเพิ่ม seam ถ้ายังมี adapter เดียว",
          "คำว่า boundary ถูกทิ้งเพราะชนกับ bounded context ของ DDD"
        ],
        refs: [
          ref("skills/engineering/codebase-design/DEEPENING.md", "DEEPENING.md — การ deepen กลุ่มโมดูล"),
          ref("skills/engineering/codebase-design/DESIGN-IT-TWICE.md", "DESIGN-IT-TWICE.md — ออกแบบ interface หลายทาง")
        ],
        sourcePath: "skills/engineering/codebase-design/SKILL.md"
      },
      {
        id: "code-review",
        cat: "engineering",
        type: "skill",
        name: "code-review",
        summary: "รีวิว diff จาก fixed point สองแกนพร้อมกันด้วย subagent: Standards และ Spec",
        overview: "กำหนด fixed point เป็น commit, branch, tag หรือ merge-base แล้วใช้ `git diff <point>...HEAD` แบบสามจุด. ตรวจว่า ref resolve และ diff ไม่ว่างก่อนยิง subagent. แกน Standards ใช้ standards ของ repo บวก Fowler smell baseline โดย repo override baseline. แกน Spec หา issue หรือ spec จาก commit message, path ที่ผู้ใช้ให้, ไฟล์ใน docs/specs/.scratch หรือถามผู้ใช้. รายงานสองแกนแยกกัน ห้าม merge หรือ rerank",
        prerequisites: [
          "diff ที่ไม่ว่างเทียบกับ fixed point",
          "standards source ของ repo และ spec ถ้ามี",
          "harness ที่มี subagent"
        ],
        invoke: invoke("code-review", SHIPPED).concat(setupStep()),
        examples: [
          {
            title: "รีวิว branch",
            prompt: "/code-review รีวิว branch นี้เทียบกับ main",
            result: "ได้รายงาน Standards กับ Spec แยกกันพร้อม worst issue ของแต่ละแกน"
          },
          {
            title: "ไม่มี spec",
            prompt: "/code-review รีวิว diff ตั้งแต่ HEAD~5 โดยไม่มี issue",
            result: "Spec subagent ถูกข้ามและรายงานว่า no spec available"
          },
          {
            title: "ref ผิด",
            prompt: "/code-review รีวิวเทียบกับ branch ที่ถูกลบไปแล้ว",
            result: "หยุดที่ขั้นตรวจ fixed point และบอกว่า ref ไม่ resolve"
          }
        ],
        cautions: [
          "อย่ารวมหรือจัดอันดับข้ามสองแกน เพราะการแยกคือเหตุผลที่มันจับปัญหาต่างกันได้",
          "baseline smell เป็น heuristic ไม่ใช่ hard violation",
          "ถ้าไม่มี spec ให้บอกตรง ๆ ไม่ใช่แต่งเกณฑ์ขึ้นมา"
        ],
        refs: [
          ref("skills/engineering/code-review/SKILL.md", "code-review — smell baseline และ prompt ของ subagent"),
          ref("skills/engineering/implement/SKILL.md", "implement — ผู้เรียกใช้ code-review")
        ],
        sourcePath: "skills/engineering/code-review/SKILL.md"
      },
      {
        id: "pr",
        cat: "engineering",
        type: "skill",
        name: "pr",
        summary: "รูปร่างของ PR body: summary ที่เล็กที่สุดที่ทำให้เข้าใจ, evidence ก่อน/หลัง และ merge danger",
        overview: "ใช้ template สามส่วน: Summary ที่เลือก visual เล็กที่สุดที่ทำให้ประเด็นชัด (pseudocode, call tree, component tree, file tree, Mermaid หรือ diff), Evidence ที่โชว์ before/after โดย screenshot ดีที่สุดและ execution output รองลงมา, Merge Danger ที่บอกว่าเป็น one-way หรือ two-way door พร้อม blast radius. ใช้ภาษาจาก GLOSSARY.md และตัด preamble กับ prose ที่ไม่จำเป็นออก",
        prerequisites: [
          "diff และผลรันจริงของงาน",
          "ภาพหรือ output ก่อนและหลังถ้ามี"
        ],
        invoke: invoke("pr", SHIPPED),
        examples: [
          {
            title: "ฟีเจอร์ใหม่",
            prompt: "/pr เขียน PR body จาก branch นี้",
            result: "ได้ Summary เป็น component tree, Evidence เป็น before/after และ Merge Danger ครบ"
          },
          {
            title: "เปลี่ยน behavior",
            prompt: "/pr สรุปว่าการเปลี่ยน cache logic กระทบอะไรบ้าง",
            result: "ใช้ diff ของ control flow และระบุ blast radius ให้ชัด"
          },
          {
            title: "การเปลี่ยนที่มีความเสี่ยง",
            prompt: "/pr PR นี้ลบ column ในฐานข้อมูล ควรเขียน merge danger อย่างไร",
            result: "ระบุว่าเป็น one-way door และอธิบายผลของการ rollback"
          }
        ],
        cautions: [
          "อย่าแทน visual ที่ทำให้เห็นการเปลี่ยนด้วย prose ยาว",
          "Evidence ต้องเป็นผลจริง ไม่ใช่คำอธิบายว่าควรจะทำงาน",
          "งานที่ย้อนยากต้องถูกทำเครื่องหมาย one-way door ให้ชัด"
        ],
        refs: [
          ref("skills/engineering/pr/CREDITS.md", "CREDITS.md — ที่มาของ template"),
          ref("skills/engineering/pr/SKILL.md", "pr — ตัวอย่าง visual ทุกแบบ")
        ],
        sourcePath: "skills/engineering/pr/SKILL.md"
      },
      {
        id: "wizard",
        cat: "engineering",
        type: "skill",
        name: "wizard",
        summary: "สร้าง bash wizard แบบโต้ตอบสำหรับขั้นที่คนเท่านั้นทำได้",
        overview: "wizard คือ bash script ที่พาคนทำทีละ stage: เปิด URL บอกว่าต้องคลิกหรือคัดลอกอะไร เก็บค่า เขียนลง .env หรือ GitHub secret และยืนยันทุกจุด พร้อมบอกจำนวน stage ที่เหลือ. ใช้ template.sh ที่แก้เฉพาะส่วนหลัง marker STAGES เพราะ library ด้านบนเหมือนกันทุกตัว. ก่อนเขียนต้อง scope ขั้นตอนและค่าที่ต้องเก็บให้ครบ แล้วตรวจด้วย bash -n และ shellcheck โดยไม่รันจริง",
        prerequisites: [
          "รายการขั้นตอน manual และที่มาของค่าแต่ละตัว",
          "bash และ shellcheck ถ้ามี"
        ],
        invoke: invoke("wizard", SHIPPED),
        examples: [
          {
            title: "ตั้งค่า service ใหม่",
            prompt: "/wizard ทำสคริปต์พาฉันตั้งค่า Stripe แล้วเก็บ key ลง .env",
            result: "ได้ wizard ที่เปิด dashboard ทีละหน้าและเขียนค่าลง .env"
          },
          {
            title: "CI secrets",
            prompt: "/wizard ตั้ง GitHub secrets ที่ workflow ต้องใช้",
            result: "แต่ละ stage เก็บค่าด้วย ask_secret และเขียนผ่าน gh secret"
          },
          {
            title: "ย้ายข้อมูลครั้งเดียว",
            prompt: "/wizard ทำขั้นตอน cutover ฐานข้อมูลให้คนรันตาม",
            result: "มี confirm ก่อนทุกการกระทำที่ย้อนยากและสรุปเมื่อจบ"
          }
        ],
        cautions: [
          "อย่าใช้ wizard กับสิ่งที่ agent ทำเองได้",
          "อย่าแก้ library เหนือ marker STAGES เพราะความสม่ำเสมอคือส่วนที่ทำให้ wizard ทำงาน",
          "secret ต้องใช้ ask_secret และไม่ echo ค่าออกมา"
        ],
        refs: [
          ref("skills/engineering/wizard/template.sh", "template.sh — library และ marker STAGES"),
          ref("skills/engineering/wizard/SKILL.md", "wizard — วิธี scope และตรวจ")
        ],
        sourcePath: "skills/engineering/wizard/SKILL.md"
      },
      /* ---------- productivity · user-invoked ---------- */
      {
        id: "grill-me",
        cat: "productivity",
        type: "skill",
        name: "grill-me",
        summary: "ซักแผนหรือดีไซน์แบบไม่ปล่อยผ่านจนทุกกิ่งของ design tree ถูกตัดสิน",
        overview: "เป็น wrapper บาง ๆ ที่เรียก grilling ตัวเดียว จึงไม่มี state และไม่เขียน GLOSSARY.md หรือ ADR. ใช้เมื่อไม่ได้อยู่ใน working directory เช่นซักแผนธุรกิจ งานเขียน หรือดีไซน์ที่ยังไม่มี repo รองรับ. ถ้ามี repo อยู่แล้ว ควรใช้ /grill-with-docs ซึ่งรันการสัมภาษณ์แบบเดียวกันแต่ทิ้ง paper trail ไว้",
        prerequisites: [
          "มีแผนหรือไอเดียที่อยากถูกซัก",
          "พร้อมตอบคำถามหลายรอบ"
        ],
        invoke: invoke("grill-me", SHIPPED),
        examples: [
          {
            title: "ซักแผนธุรกิจ",
            prompt: "/grill-me อยากเปิดคอร์สออนไลน์ปีหน้า ช่วยซักแผนให้หน่อย",
            result: "ถามเป็นรอบ ๆ เรื่องกลุ่มผู้เรียน ราคา และช่องทาง จนทุกกิ่งชัด"
          },
          {
            title: "ซักงานเขียน",
            prompt: "/grill-me จะเขียนบทความเรื่อง AI coding workflow",
            result: "ถามเรื่องผู้อ่าน thesis และหลักฐานที่ต้องมีก่อนลงมือเขียน"
          },
          {
            title: "ไม่มี repo",
            prompt: "/grill-me ช่วยซักดีไซน์ของ workshop สองวันให้หน่อย",
            result: "ไม่สร้างไฟล์ใด ๆ และจบเมื่อทุก decision ถูกตัดสิน"
          }
        ],
        cautions: [
          "ถ้าอยู่ใน working directory ให้ใช้ /grill-with-docs ซึ่งเก็บผลไว้ใช้ต่อได้",
          "ไม่มีความจำระหว่างเซสชัน: จบแล้วไม่เหลือเอกสาร"
        ],
        refs: [
          ref("skills/productivity/grilling/SKILL.md", "grilling — primitive ที่ grill-me เรียก"),
          ref("skills/engineering/grill-with-docs/SKILL.md", "grill-with-docs — ทางเลือกที่มี state")
        ],
        sourcePath: "skills/productivity/grill-me/SKILL.md"
      },
      {
        id: "handoff",
        cat: "productivity",
        type: "skill",
        name: "handoff",
        summary: "ย่อบทสนทนาปัจจุบันเป็นเอกสาร handoff ให้ agent ตัวอื่นทำงานต่อ",
        overview: "เขียนเอกสารสรุปลง temp directory ของ OS ไม่ใช่ workspace เพื่อให้ย้ายข้าม harness หรือ directory ได้จริง. เอกสารต้องมีหัวข้อ suggested skills ที่บอกว่าตัวต่อไปควรเรียกทักษะไหน และห้าม duplicate สิ่งที่มีอยู่แล้วใน spec, plan, ADR, issue, commit หรือ diff ให้อ้าง path หรือ URL แทน. ต้อง redact ข้อมูลอ่อนไหวและปรับเอกสารตาม argument ที่ผู้ใช้ส่งมา",
        prerequisites: [
          "บทสนทนาที่มีสถานะงานพอจะส่งต่อ",
          "รู้ว่าอีกฝั่งจะทำอะไรต่อ"
        ],
        invoke: invoke("handoff", SHIPPED),
        examples: [
          {
            title: "ย้ายข้าม harness",
            prompt: "/handoff จะไปทำต่อในอีกเครื่องหนึ่ง",
            result: "ได้ไฟล์ใน temp directory พร้อม suggested skills และ pointer ไปยัง artifact เดิม"
          },
          {
            title: "ส่งให้เพื่อนร่วมทีม",
            prompt: "/handoff สรุปให้คนที่จะมาทำต่อเรื่อง billing",
            result: "เอกสารเน้นบริบทที่คนใหม่ไม่รู้ และไม่ก็อปสเปกที่เขาอ่านเองได้"
          },
          {
            title: "ทำงานต่อใน background",
            prompt: "/handoff งานนี้จะถูกทำต่อแบบ background",
            result: "สรุปสั้น ระบุ path ของ commit และ issue ที่ต้องอ่านก่อน"
          }
        ],
        cautions: [
          "อย่าเซฟใน workspace เพราะจะกลายเป็นไฟล์ค้างใน repo",
          "summary จะกลายเป็น prompt ของ agent ใหม่ จึงต้อง redact secret และข้อมูลส่วนตัว",
          "อย่าซ้ำเนื้อหาที่มีอยู่แล้ว ให้ชี้ path หรือ URL"
        ],
        refs: [
          ref("skills/productivity/handoff/SKILL.md", "handoff — รายละเอียดของเอกสาร"),
          ref("skills/in-progress/claude-handoff/SKILL.md", "claude-handoff — variant ที่ launch background agent ต่อทันที")
        ],
        sourcePath: "skills/productivity/handoff/SKILL.md"
      },
      {
        id: "teach",
        cat: "productivity",
        type: "skill",
        name: "teach",
        summary: "สอนหัวข้อหนึ่งข้ามหลายเซสชันโดยใช้โฟลเดอร์ปัจจุบันเป็น teaching workspace",
        overview: "workspace เก็บ MISSION.md ซึ่งอธิบายเหตุผลที่เรียน, reference/*.html สำหรับ cheat sheet, RESOURCES.md, learning-records/*.md, lessons/*.html และ NOTES.md. บทเรียนหนึ่งคือ HTML ไฟล์เดียวที่สอนเรื่องแคบ ๆ ตาม mission และอยู่ใน zone of proximal development โดยออกแบบให้มี retrieval practice, spacing และ interleaving เพื่อ storage strength ไม่ใช่แค่ fluency. ก่อนสอนต้องรู้ mission และหา high-trust resource ก่อนเชื่อความรู้จาก parametric memory",
        prerequisites: [
          "โฟลเดอร์ที่ใช้เป็น workspace ของการเรียนได้",
          "ความชัดของ mission หรือความพร้อมที่จะถูกถามหาเหตุผลที่เรียน"
        ],
        invoke: invoke("teach", SHIPPED),
        examples: [
          {
            title: "เริ่มเรียนหัวข้อใหม่",
            prompt: "/teach สอนฉันเรื่อง distributed systems",
            result: "ถาม mission ก่อน แล้วสร้าง MISSION.md กับบทเรียนแรกที่สั้นและจบได้จริง"
          },
          {
            title: "เรียนต่อจากเดิม",
            prompt: "/teach วันนี้เรียนต่อจาก lesson ล่าสุด",
            result: "อ่าน learning records แล้วเลือกบทถัดไปใน zone of proximal development"
          },
          {
            title: "อยากได้ cheat sheet",
            prompt: "/teach ทำ reference สรุป syntax ที่ใช้บ่อยให้หน่อย",
            result: "สร้าง reference/*.html ที่พิมพ์ได้และลิงก์จากบทเรียน"
          }
        ],
        cautions: [
          "อย่าเชื่อ parametric knowledge: ต้องหา source ที่เชื่อถือได้ก่อนสอน",
          "อย่าทำบทเรียนยาวเกิน working memory ของผู้เรียน",
          "การเปลี่ยน mission ต้องยืนยันผู้ใช้และบันทึกเป็น learning record"
        ],
        refs: [
          ref("skills/productivity/teach/MISSION-FORMAT.md", "MISSION-FORMAT.md — รูปแบบ mission"),
          ref("skills/productivity/teach/LEARNING-RECORD-FORMAT.md", "LEARNING-RECORD-FORMAT.md — บันทึกสิ่งที่เรียน")
        ],
        sourcePath: "skills/productivity/teach/SKILL.md"
      },
      {
        id: "to-questionnaire",
        cat: "productivity",
        type: "skill",
        name: "to-questionnaire",
        summary: "เปลี่ยนการตัดสินใจที่ตอบคนเดียวไม่ได้เป็น questionnaire Markdown สำหรับคนที่ตอบได้",
        overview: "grill เฉพาะการส่ง ไม่ใช่ subject: ถามว่าใครเป็นผู้รับและต้องการอะไรกลับมา แล้วเขียนคำถามที่ยิงไปยังช่องว่างระหว่างความรู้ของผู้รับกับสิ่งที่ผู้ใช้ต้องตัดสิน. เอกสารเป็น discovery questionnaire ที่เรียงคำถามสำคัญก่อน เพราะ async อาจได้ตอบครั้งเดียว พร้อม answer stub ใต้ทุกคำถาม. บันทึกเป็น to-questionnaire-<slug>.md ใน directory ปัจจุบันและรายงาน path",
        prerequisites: [
          "ระบุผู้รับที่จะตอบได้",
          "รู้ว่าต้องได้ decision หรือ fact อะไรกลับมา"
        ],
        invoke: invoke("to-questionnaire", SHIPPED),
        examples: [
          {
            title: "ถามผู้เชี่ยวชาญต่างทีม",
            prompt: "/to-questionnaire อยากถามทีม security ว่า log retention ควรตั้งเท่าไร",
            result: "ได้ questionnaire ที่มี context และคำถามเรื่อง compliance เรียงตามความสำคัญ"
          },
          {
            title: "ถามลูกค้า",
            prompt: "/to-questionnaire ทำแบบสอบถามถามลูกค้าเรื่อง workflow ปัจจุบัน",
            result: "คำถามหนึ่ง idea ต่อข้อ พร้อมที่ว่างให้ตอบและช่อง Anything else"
          },
          {
            title: "ประชุมครั้งเดียว",
            prompt: "/to-questionnaire จะคุยกับ vendor 20 นาที อยากได้อะไรครบ",
            result: "เอกสารสั้นที่ถามเฉพาะเรื่องที่ตัดสินใจในที่ประชุมไม่ได้"
          }
        ],
        cautions: [
          "อย่าสัมภาษณ์ผู้ใช้เรื่อง subject ที่เขาตอบไม่ได้: งานนี้ซักเรื่องการส่งเท่านั้น",
          "คำถามต้องหนึ่ง idea ต่อข้อ ห้าม compound",
          "ถ้าไม่รู้ว่าผู้รับรู้อะไร ให้ถามก่อนเขียน"
        ],
        refs: [
          ref("skills/productivity/to-questionnaire/SKILL.md", "to-questionnaire — template และลำดับคำถาม"),
          ref("skills/productivity/grilling/SKILL.md", "grilling — วิธีถามที่ใช้เป็นฐาน")
        ],
        sourcePath: "skills/productivity/to-questionnaire/SKILL.md"
      },
      {
        id: "wait-what",
        cat: "productivity",
        type: "skill",
        name: "wait-what",
        summary: "เมื่อข้อความไม่เข้าหัว agent หยุดและอธิบายใหม่ด้วยบริบทที่ขาด",
        overview: "เป็น corrective แบบสั้น: สั่งให้ agent re-pitch ข้อความล่าสุดด้วย context ที่ผู้ใช้ขาด ใช้ ASD-STE100 Simplified Technical English และ ubiquitous language จาก GLOSSARY.md หรือตาม GLOSSARY-MAP.md ถ้า repo มีหลาย context. ใช้กลางบทสนทนาหรือระหว่างทักษะอื่นได้ และแก้ปัญหาหลังเกิด แต่ไม่แทนการตกลงภาษาร่วมตั้งแต่ต้น",
        prerequisites: [
          "มีข้อความก่อนหน้าที่อ่านแล้วไม่เข้าใจ",
          "GLOSSARY.md ถ้า repo มี"
        ],
        invoke: invoke("wait-what", SHIPPED),
        examples: [
          {
            title: "คำตอบเต็มไปด้วย jargon",
            prompt: "/wait-what",
            result: "agent อธิบายใหม่ด้วยประโยคง่ายและคำจาก glossary พร้อมบริบทที่ขาด"
          },
          {
            title: "กระโดดข้ามขั้น",
            prompt: "/wait-what นายมาถึงขั้นนี้ได้อย่างไร",
            result: "อธิบาย reasoning และสมมติฐานที่ใช้ก่อนหน้าโดยไม่กล่าวโทษ"
          },
          {
            title: "ระหว่างใช้ทักษะอื่น",
            prompt: "/wait-what ขอใหม่แบบสั้น ๆ ฉันหลงแล้ว",
            result: "หยุดงานปัจจุบัน อธิบายสถานะและขั้นถัดไปก่อนทำต่อ"
          }
        ],
        cautions: [
          "ใช้แก้การสื่อสาร ไม่ใช่ทดแทนการซัก requirements",
          "ถ้า glossary ขัดกับคำที่ใช้ ให้แก้ glossary ไม่ใช่เดาความหมาย",
          "ถ้าคำอธิบายยังไม่พอ ให้ถามเจาะจงแทนการขอให้อธิบายใหม่ทั้งเรื่อง"
        ],
        refs: [
          ref("skills/productivity/wait-what/SKILL.md", "wait-what — ข้อความสั่งฉบับเต็ม"),
          ref("skills/productivity/writing-for-agents/SKILL.md", "writing-for-agents — หลักการเขียนให้ agent อ่าน")
        ],
        sourcePath: "skills/productivity/wait-what/SKILL.md"
      },
      /* ---------- productivity · model-invoked ---------- */
      {
        id: "grilling",
        cat: "productivity",
        type: "skill",
        name: "grilling",
        summary: "primitive การสัมภาษณ์ที่ซักจนทุกกิ่งของ design tree ถูกตัดสิน",
        overview: "มองการตัดสินใจเป็น design tree และทำงานเป็นรอบ: frontier คือคำถามที่ prerequisite ถูกตัดสินแล้ว ถามทั้ง frontier ในรอบเดียวโดยมีหมายเลขและคำตอบแนะนำ แล้วรอคำตอบก่อนรอบถัดไป. การหาข้อเท็จจริงเป็นงานของ agent โดยใช้ subagent ค้น environment ส่วนการตัดสินใจเป็นของผู้ใช้. จบเมื่อ frontier ว่างและผู้ใช้ยืนยันว่ามีความเข้าใจร่วมกัน",
        prerequisites: [
          "หัวข้อหรือแผนที่ตัดสินใจได้",
          "พร้อมตอบคำถามหลายรอบ"
        ],
        invoke: invoke("grilling", SHIPPED),
        examples: [
          {
            title: "เริ่มรอบแรก",
            prompt: "/grilling ช่วยซักแผนย้ายระบบ auth",
            result: "ถามเฉพาะคำถามที่ตอบได้ตอนนี้ พร้อมคำตอบแนะนำและรอผู้ใช้ตอบ"
          },
          {
            title: "มีคำถามที่ต้องค้นก่อน",
            prompt: "/grilling คำถามนี้ต้องดูโค้ดก่อนตอบไหม",
            result: "ส่ง subagent ไปหา fact แล้วเลื่อนเฉพาะคำถามที่ขึ้นกับ fact นั้นไปรอบถัดไป"
          },
          {
            title: "จบการซัก",
            prompt: "/grilling เหลืออะไรให้ตัดสินอีกไหม",
            result: "ตรวจ frontier และสรุปว่าทุกกิ่งถูกตัดสินแล้วก่อนลงมือ"
          }
        ],
        cautions: [
          "อย่าถามคำถามที่ agent หาเองได้จาก environment",
          "อย่าถามคำถามที่ยังขึ้นกับข้อที่เปิดอยู่ในรอบเดียวกัน",
          "อย่าลงมือทำก่อนผู้ใช้ยืนยันความเข้าใจร่วม"
        ],
        refs: [
          ref("skills/productivity/grilling/SKILL.md", "grilling — รูปแบบรอบและกติกา frontier"),
          ref("skills/productivity/grill-me/SKILL.md", "grill-me — wrapper แบบไม่มี state")
        ],
        sourcePath: "skills/productivity/grilling/SKILL.md"
      },
      {
        id: "writing-for-agents",
        cat: "productivity",
        type: "skill",
        name: "writing-for-agents",
        summary: "วิธีเขียนเอกสารให้ agent อ่าน: skill, AGENTS.md/CLAUDE.md และ doc ที่เข้าถึงผ่าน pointer",
        overview: "เอกสารทุกแบบใช้ lever เดียวกัน: context pointer ที่บอกว่า material คืออะไรและ branch ไหนควรไปอ่าน, สอง load คือ context load กับ cognitive load, information hierarchy จาก step ไปใน in-file reference ไป disclosed reference, completion criteria ที่ checkable และ exhaustive, leading word และการ prune. ถ้าเขียน skill ต้องอ่าน SKILL-MECHANICS.md เพิ่มเรื่อง frontmatter และการเลือก invocation",
        prerequisites: [
          "เอกสารที่กำลังเขียนหรือแก้",
          "รู้ว่า agent จะอ่านเอกสารนี้เมื่อไหร่และอย่างไร"
        ],
        invoke: invoke("writing-for-agents", SHIPPED),
        examples: [
          {
            title: "เขียน SKILL.md ใหม่",
            prompt: "/writing-for-agents ช่วยตรวจ skill ที่เพิ่งร่าง",
            result: "ชี้ pointer ที่กำกวม step ที่ไม่มี completion criterion และ no-op ที่ควรลบ"
          },
          {
            title: "AGENTS.md ยาวเกิน",
            prompt: "/writing-for-agents AGENTS.md นี้ควรตัดอะไรออก",
            result: "แยก material ที่ควรอยู่หลัง pointer ออกจากสิ่งที่ต้องอยู่ในไฟล์"
          },
          {
            title: "เอกสารที่ถูกอ่านผ่าน pointer",
            prompt: "/writing-for-agents เอกสารนี้จะถูกเปิดจาก pointer จาก CLAUDE.md",
            result: "ปรับ pointer ให้ front-load คำที่ใช้ trigger และตัดเนื้อที่ซ้ำ"
          }
        ],
        cautions: [
          "pointer ที่กำกวมทำให้ material สำคัญไม่ถูกอ่าน แม้เนื้อหาจะดี",
          "อย่าใช้ negation เป็นตัวนำ: บอกพฤติกรรมเป้าหมายเป็นบวก",
          "อย่าเก็บความหมายเดียวกันไว้หลายที่ ให้เหลือ single source of truth"
        ],
        refs: [
          ref("skills/productivity/writing-for-agents/SKILL-MECHANICS.md", "SKILL-MECHANICS.md — frontmatter และ invocation"),
          ref("skills/productivity/writing-for-agents/SKILL.md", "writing-for-agents — หลักการเขียนฉบับเต็ม")
        ],
        sourcePath: "skills/productivity/writing-for-agents/SKILL.md"
      },
      /* ---------- misc · manual install ---------- */
      {
        id: "git-guardrails-claude-code",
        cat: "misc",
        type: "skill",
        name: "git-guardrails-claude-code",
        summary: "ตั้ง PreToolUse hook ของ Claude Code ให้บล็อกคำสั่ง git อันตรายก่อนรัน",
        overview: "hook สคริปต์ดัก tool Bash แล้วปฏิเสธ git push ทุก variant, reset --hard, clean -f/-fd, branch -D และ checkout . หรือ restore . โดย agent จะเห็นข้อความว่าไม่มีสิทธิ์ใช้คำสั่งเหล่านี้. ติดตั้งได้สองระดับ: project ที่ .claude/settings.json หรือ global ที่ ~/.claude/settings.json และต้อง merge เข้า hooks.PreToolUse เดิมแทนการทับ settings อื่น. จบด้วยการยิง test payload เพื่อยืนยันว่า script exit 2 และพิมพ์ BLOCKED",
        prerequisites: [
          "Claude Code",
          "bash สำหรับรัน hook script",
          "สิทธิ์แก้ .claude/settings.json หรือ ~/.claude/settings.json"
        ],
        invoke: invoke("git-guardrails-claude-code", MISC),
        examples: [
          {
            title: "ติดตั้งเฉพาะโปรเจกต์",
            prompt: "/git-guardrails-claude-code ติดตั้งให้ repo นี้เท่านั้น",
            result: "คัดลอก script ไป .claude/hooks/ และเพิ่ม hook ใน .claude/settings.json"
          },
          {
            title: "ติดตั้งทั้งเครื่อง",
            prompt: "/git-guardrails-claude-code ใช้กับทุกโปรเจกต์เลย",
            result: "ติดตั้งที่ ~/.claude/hooks/ และ ~/.claude/settings.json"
          },
          {
            title: "ปรับรายการที่บล็อก",
            prompt: "/git-guardrails-claude-code ปลดบล็อก git push แต่คง reset --hard ไว้",
            result: "แก้ pattern ใน script ที่คัดลอกแล้วและแนะนำให้ทดสอบซ้ำ"
          }
        ],
        cautions: [
          MISC_CAUTION,
          "hook ต้อง exit 2 และเขียนข้อความไป stderr จึงจะบล็อกได้จริง",
          "ถ้า settings มีอยู่แล้วให้ merge เข้า array เดิม ห้ามเขียนทับทั้งไฟล์"
        ],
        refs: [
          ref("skills/misc/git-guardrails-claude-code/scripts/block-dangerous-git.sh", "block-dangerous-git.sh — script ที่ใช้อ้างอิง"),
          ref("skills/misc/git-guardrails-claude-code/SKILL.md", "SKILL.md — ตัวอย่าง settings ทั้งสองระดับ")
        ],
        sourcePath: "skills/misc/git-guardrails-claude-code/SKILL.md"
      },
      {
        id: "migrate-to-shoehorn",
        cat: "misc",
        type: "skill",
        name: "migrate-to-shoehorn",
        summary: "ย้ายเทสจาก as type assertion ไปใช้ @total-typescript/shoehorn",
        overview: "shoehorn ให้ส่ง partial data ในเทสโดย TypeScript ยังผ่าน: fromPartial สำหรับ partial ที่ type ถูก, fromAny สำหรับข้อมูลที่จงใจผิด และ fromExact เมื่ออยากบังคับ object เต็ม. ใช้เฉพาะ test code ห้ามใช้ใน production. workflow คือหาไฟล์เทสที่มี as, ติดตั้ง package, แทน as Type ด้วย fromPartial และ as unknown as Type ด้วย fromAny แล้วรัน type check",
        prerequisites: [
          "โปรเจกต์ TypeScript ที่มีเทส",
          "npm หรือ package manager ที่ติดตั้ง @total-typescript/shoehorn ได้"
        ],
        invoke: invoke("migrate-to-shoehorn", MISC),
        examples: [
          {
            title: "object ใหญ่ที่ใช้ไม่กี่ field",
            prompt: "/migrate-to-shoehorn เทสนี้ fake Request ทั้ง 20 field ทั้งที่ใช้แค่ body.id",
            result: "เปลี่ยนเป็น fromPartial({ body: { id: \"123\" } }) และลบ field ที่ไม่ได้ใช้"
          },
          {
            title: "จงใจส่งข้อมูลผิด",
            prompt: "/migrate-to-shoehorn เทส error ใช้ as unknown as Type อยู่",
            result: "เปลี่ยนเป็น fromAny พร้อมคง autocomplete และรัน type check"
          },
          {
            title: "หาจุดที่ต้องย้าย",
            prompt: "/migrate-to-shoehorn หา as ในไฟล์เทสทั้งหมดให้หน่อย",
            result: "รัน grep ตาม pattern ใน SKILL.md แล้วสรุปไฟล์ที่ต้องแก้"
          }
        ],
        cautions: [
          MISC_CAUTION,
          "ห้ามใช้ shoehorn ใน production code",
          "หลังย้ายทุกไฟล์ต้องรัน type check ไม่ใช่แค่เทส"
        ],
        refs: [
          ref("skills/misc/migrate-to-shoehorn/SKILL.md", "migrate-to-shoehorn — ตาราง fromPartial/fromAny/fromExact"),
          ref("skills/misc/README.md", "misc/README — ยืนยันว่าทักษะนี้ไม่ถูก promote ใน plugin")
        ],
        sourcePath: "skills/misc/migrate-to-shoehorn/SKILL.md"
      },
      {
        id: "scaffold-exercises",
        cat: "misc",
        type: "skill",
        name: "scaffold-exercises",
        summary: "สร้างโครงแบบฝึกหัดพร้อม section, problem/solution/explainer และ readme ที่ผ่าน lint",
        overview: "section ใช้ XX-section-name/ และ exercise ใช้ XX.YY-exercise-name/ ใต้ exercises/ โดยชื่อเป็น dash-case. แต่ละ exercise มีอย่างน้อยหนึ่งใน problem/, solution/ หรือ explainer/ และทุก subfolder ต้องมี readme.md ที่ไม่ว่างและไม่มีลิงก์เสีย ส่วน main.ts ต้องมีเมื่อ subfolder นั้นมีโค้ด. หลังสร้างให้รัน pnpm ai-hero-cli internal lint จนผ่าน และใช้ git mv เมื่อย้ายหรือเปลี่ยนเลข",
        prerequisites: [
          "repo ที่มี ai-hero-cli และ pnpm",
          "แผนของ section และ exercise ที่จะสร้าง"
        ],
        invoke: invoke("scaffold-exercises", MISC),
        examples: [
          {
            title: "สร้าง section ใหม่",
            prompt: "/scaffold-exercises ตั้ง section 05 Memory Skill Building ตามแผนนี้",
            result: "สร้างโฟลเดอร์และ readme stub ครบ แล้วรัน lint จนผ่าน"
          },
          {
            title: "เพิ่ม exercise เดียว",
            prompt: "/scaffold-exercises เพิ่ม 05.04 long-term memory เป็น explainer",
            result: "สร้าง explainer/readme.md พร้อมหัวข้อและรัน lint"
          },
          {
            title: "เรียงเลขใหม่",
            prompt: "/scaffold-exercises ย้าย 01.03 เป็น 01.04",
            result: "ใช้ git mv และรัน lint ซ้ำหลังเปลี่ยนเลข"
          }
        ],
        cautions: [
          MISC_CAUTION,
          "อย่าใช้ mv แทน git mv เพราะจะเสีย history",
          "readme ต้องมีเนื้อหาจริงและห้ามมีลิงก์เสีย"
        ],
        refs: [
          ref("skills/misc/scaffold-exercises/SKILL.md", "scaffold-exercises — โครงโฟลเดอร์และ lint rules"),
          ref("skills/misc/README.md", "misc/README — ยืนยันว่าทักษะนี้ไม่ถูก promote ใน plugin")
        ],
        sourcePath: "skills/misc/scaffold-exercises/SKILL.md"
      },
      {
        id: "setup-pre-commit",
        cat: "misc",
        type: "skill",
        name: "setup-pre-commit",
        summary: "ตั้ง Husky + lint-staged (Prettier) + typecheck + test เป็น pre-commit hook",
        overview: "ตรวจ package manager จาก lockfile แล้วติดตั้ง husky, lint-staged และ prettier เป็น devDependency ก่อนรัน npx husky init. เขียน .husky/pre-commit ให้รัน lint-staged, typecheck และ test โดยข้ามบรรทัดที่ repo ไม่มี script พร้อม .lintstagedrc และ .prettierrc ถ้ายังไม่มี config. จบด้วยการ commit ผ่าน hook ใหม่เป็น smoke test ว่าใช้งานได้จริง",
        prerequisites: [
          "repo Node ที่มี package.json",
          "package manager ที่ระบุได้จาก lockfile"
        ],
        invoke: invoke("setup-pre-commit", MISC),
        examples: [
          {
            title: "repo ใหม่",
            prompt: "/setup-pre-commit ตั้ง pre-commit ให้ repo นี้",
            result: "ได้ .husky/pre-commit, .lintstagedrc และ .prettierrc พร้อม commit แรกที่ผ่าน hook"
          },
          {
            title: "ไม่มี typecheck script",
            prompt: "/setup-pre-commit repo นี้ยังไม่มี typecheck",
            result: "ข้ามบรรทัด typecheck และบอกผู้ใช้ว่าต้องเพิ่ม script ก่อน"
          },
          {
            title: "ใช้ pnpm",
            prompt: "/setup-pre-commit ใช้ pnpm ไม่ใช่ npm",
            result: "ติดตั้งและเขียน hook ด้วย pnpm ตาม lockfile ที่พบ"
          }
        ],
        cautions: [
          MISC_CAUTION,
          "อย่าใส่ typecheck หรือ test ใน hook ถ้า repo ไม่มี script นั้น",
          "Husky v9+ ไม่ต้องใช้ shebang ในไฟล์ hook"
        ],
        refs: [
          ref("skills/misc/setup-pre-commit/SKILL.md", "setup-pre-commit — ขั้นตอนและ config"),
          ref("skills/misc/README.md", "misc/README — ยืนยันว่าทักษะนี้ไม่ถูก promote ใน plugin")
        ],
        sourcePath: "skills/misc/setup-pre-commit/SKILL.md"
      },
      /* ---------- in-progress · manual install ---------- */
      {
        id: "chief-of-staff",
        cat: "in-progress",
        type: "skill",
        name: "chief-of-staff",
        summary: "ไล่เป้าหมายระยะยาวในเซสชันเดียวโดยประสาน subagent และเก็บความจำใน wiki",
        overview: "บทบาทคือ Directly Responsible Individual ที่คิดสองชั้นพร้อมกัน: tactical คืองานตรงหน้า และ strategic คือการปรับ environment ให้งานถัดไปดีขึ้น. งานทั้งหมดควรทำใน subagent โดยเฉพาะ background agent เพื่อรักษา context และสื่อสารผ่าน context pointer. ความรู้ที่ควรอยู่ข้ามเซสชันเก็บใน wiki ที่ index.md ลิงก์ทุกหน้า และเขียนเป็นประวัติที่มีวันที่หรือ commit ไม่ใช่คำอธิบายปัจจุบัน",
        prerequisites: [
          "harness ที่มี subagent และ background agent",
          "ตำแหน่ง wiki ที่ตกลงกับผู้ใช้ก่อนเขียนครั้งแรก"
        ],
        invoke: invoke("chief-of-staff", IN_PROGRESS),
        examples: [
          {
            title: "เป้าหมายหลายสัปดาห์",
            prompt: "/chief-of-staff ช่วยไล่เป้าหมายเปิด beta ของผลิตภัณฑ์ภายในสองเดือน",
            result: "แตกงานให้ subagent และเริ่ม wiki สำหรับ decision กับ tribal knowledge"
          },
          {
            title: "ปรับ environment",
            prompt: "/chief-of-staff งานนี้ติดเพราะไม่มี log จาก dev server",
            result: "เสนอการเพิ่มข้อมูลที่ agent เข้าถึงได้ก่อนทำงานส่วนถัดไป"
          },
          {
            title: "บันทึกสิ่งที่เรียนรู้",
            prompt: "/chief-of-staff บันทึกสิ่งที่เพิ่งตัดสินใจลง wiki",
            result: "อัปเดตหน้าที่เกี่ยวข้องและ index พร้อมระบุวันที่ของ claim"
          }
        ],
        cautions: [
          IN_PROGRESS_CAUTION,
          "อย่าเก็บ tribal knowledge ไว้ใน context อย่างเดียว เพราะจะหายตอน compaction",
          "อย่าเขียน currently หรือ now เกี่ยวกับโค้ดโดยไม่มีวันที่หรือ commit กำกับ"
        ],
        refs: [
          ref("skills/in-progress/chief-of-staff/SKILL.md", "chief-of-staff — หลักคิดและโครง wiki"),
          ref("skills/in-progress/README.md", "in-progress/README.md — สถานะ beta และวิธีติดตั้ง")
        ],
        sourcePath: "skills/in-progress/chief-of-staff/SKILL.md"
      },
      {
        id: "claude-handoff",
        cat: "in-progress",
        type: "skill",
        name: "claude-handoff",
        summary: "ส่งบทสนทนาให้ background agent ตัวใหม่รับงานต่อทันทีผ่าน claude --bg",
        overview: "เขียน summary ลง temp directory ของ OS แล้ว launch background agent ด้วย claude --bg --name <name> -- \"$(cat <summary file>)\". การส่งเป็นไฟล์กัน shell ตีความ backtick หรือ $ ใน summary. ต้องใส่ --name เสมอเพราะเป็นชื่อที่โชว์ใน job list, session picker และ terminal title. summary ต้องมี suggested skills, อ้าง artifact เดิมแทนการ duplicate และ redact ข้อมูลอ่อนไหว เพราะมันจะกลายเป็น prompt ของ agent ใหม่",
        prerequisites: [
          "Claude Code ที่รองรับ claude --bg",
          "งานที่ส่งต่อได้โดยไม่ต้องรอคำตอบจากผู้ใช้ทันที"
        ],
        invoke: invoke("claude-handoff", IN_PROGRESS).concat([
          {
            label: "คำสั่ง launch ที่ skill ใช้",
            code: 'claude --bg --name "<descriptive name>" -- "$(cat <summary file>)"',
            language: "shell",
            note: "ส่งไฟล์เป็น argument เพื่อกัน shell ตีความ backtick หรือ $ ใน summary"
          }
        ]),
        examples: [
          {
            title: "ย้ายงานไป background",
            prompt: "/claude-handoff ทำต่อเรื่อง fix login bug ใน background",
            result: "เขียน summary แล้ว launch agent ชื่อ Fix login bug พร้อม suggested skills"
          },
          {
            title: "ส่งงานข้าม directory",
            prompt: "/claude-handoff งานนี้ต้องไปทำในอีก repo",
            result: "summary ระบุ path ของ artifact และ directory ที่ agent ใหม่ควรเริ่ม"
          },
          {
            title: "Redact ก่อนส่ง",
            prompt: "/claude-handoff สรุปงานที่มี token อยู่ใน log",
            result: "ตัดข้อมูลอ่อนไหวออกและอ้าง path ของ log แทนการก็อปทั้งไฟล์"
          }
        ],
        cautions: [
          IN_PROGRESS_CAUTION,
          "summary จะกลายเป็น prompt จึงต้อง redact secret และข้อมูลส่วนตัวก่อนทุกครั้ง",
          "อย่าลืม --name เพราะชื่อใช้แยก job ใน claude agents",
          "อย่า duplicate เนื้อหาที่มีอยู่ใน spec, issue หรือ commit แล้ว"
        ],
        refs: [
          ref("skills/in-progress/claude-handoff/SKILL.md", "claude-handoff — คำสั่งและข้อกำหนดของ summary"),
          ref("skills/productivity/handoff/SKILL.md", "handoff — variant ที่ไม่ launch agent")
        ],
        sourcePath: "skills/in-progress/claude-handoff/SKILL.md"
      },
      {
        id: "loop-me",
        cat: "in-progress",
        type: "skill",
        name: "loop-me",
        summary: "ซักผู้ใช้เรื่อง workflow ที่อยากสร้าง จนได้ spec ที่ implementer สร้างได้โดยไม่ต้องถาม",
        overview: "รัน /grilling แบบ stateful ที่ผลลัพธ์เป็น workflow spec ใน workflows/*.md. ใช้ loop lens มองชีวิตเป็น loop ซ้อน loop เพื่อหา pattern ที่ควร delegate และใช้ vocabulary อย่าง trigger, checkpoint, push right และ brief เมื่อ workflow ต้องใช้ โดยไม่บังคับโครงสร้าง. NOTES.md เก็บคำศัพท์และบริบทของผู้ใช้ และ spec จะเสร็จเมื่อ implementer ลงมือได้โดยไม่ต้องถามเพิ่ม",
        prerequisites: [
          "workspace ที่เขียน workflows/ และ NOTES.md ได้",
          "เวลาหลายรอบสำหรับการซัก"
        ],
        invoke: invoke("loop-me", IN_PROGRESS),
        examples: [
          {
            title: "ออกแบบ workflow รายสัปดาห์",
            prompt: "/loop-me อยากมี workflow สรุปงานทุกวันศุกร์",
            result: "ซัก trigger, brief และ checkpoint แล้วเขียน workflows/weekly-review.md"
          },
          {
            title: "ยังไม่มีไอเดีย",
            prompt: "/loop-me หา loop ในชีวิตฉันที่ควร delegate ให้หน่อย",
            result: "ใช้ loop lens เสนอ pattern ที่เกิดซ้ำและถามว่าจะ spec ตัวไหน"
          },
          {
            title: "เติมบริบทของผู้ใช้",
            prompt: "/loop-me ฉันทำงานผ่านอีเมลกับ Slack เป็นหลัก",
            result: "บันทึกคำศัพท์และช่องทางลง NOTES.md ก่อนเขียน spec"
          }
        ],
        cautions: [
          IN_PROGRESS_CAUTION,
          "อย่าบังคับให้ workflow ต้องมี AI, checkpoint หรือ schedule ถ้าโจทย์ไม่ต้องใช้",
          "spec ยังไม่เสร็จตราบใดที่ยังมีคำถามที่ implementer ต้องถาม",
          "ถ้า NOTES.md ยังว่าง ให้สัมภาษณ์โลกของผู้ใช้ก่อน"
        ],
        refs: [
          ref("skills/in-progress/loop-me/SKILL.md", "loop-me — loop lens และ vocabulary"),
          ref("skills/productivity/grilling/SKILL.md", "grilling — วิธีซักที่ loop-me ใช้")
        ],
        sourcePath: "skills/in-progress/loop-me/SKILL.md"
      },
      {
        id: "setup-ts-deep-modules",
        cat: "in-progress",
        type: "skill",
        name: "setup-ts-deep-modules",
        summary: "ต่อ dependency-cruiser ให้ทุก package ใน repo TS เป็น deep module ที่เข้าถึงผ่าน entry point เท่านั้น",
        overview: "public surface ของ package คือไฟล์ที่อยู่ root ของมัน ไม่ใช่ barrel index เดียว ส่วนทุกอย่างใน subfolder เช่น lib/ และ tests/ เป็น private. ติดตั้ง dependency-cruiser แล้วเพิ่มสี่กฎระดับ error: entry-point boundary, intra-package freedom, tests through entry points และ no cycles. ต้องพิสูจน์ว่ากฎ bite ด้วยการเพิ่ม deep import ชั่วคราวให้ lint fail แล้ว revert จากนั้นเขียน README ของ packages และชี้จาก CLAUDE.md หรือ AGENTS.md",
        prerequisites: [
          "repo TypeScript ที่มี packages",
          "package manager และ dependency-cruiser",
          "สิทธิ์แก้ config และ README"
        ],
        invoke: invoke("setup-ts-deep-modules", IN_PROGRESS),
        examples: [
          {
            title: "ติดตั้งทั้ง repo",
            prompt: "/setup-ts-deep-modules ทำให้ทุก package เป็น deep module",
            result: "ได้ .dependency-cruiser.cjs และ lint:boundaries ที่ผูกกับ check เดิม"
          },
          {
            title: "มี config อยู่แล้ว",
            prompt: "/setup-ts-deep-modules repo นี้มี dependency-cruiser อยู่แล้ว",
            result: "merge สี่กฎเข้า config เดิมและบอกว่าอะไรถูกเพิ่ม"
          },
          {
            title: "พิสูจน์ว่ากฎทำงาน",
            prompt: "/setup-ts-deep-modules ตรวจให้แน่ใจว่า deep import ถูกบล็อก",
            result: "เห็น lint ผ่าน แล้ว fail ด้วย tests-through-entrypoints แล้วผ่านอีกครั้ง"
          }
        ],
        cautions: [
          IN_PROGRESS_CAUTION,
          "อย่า overwrite config เดิมถ้ามีอยู่ ให้ merge และรายงานสิ่งที่เพิ่ม",
          "อย่าแตะ tsconfig หรือเพิ่ม path alias",
          "ถ้า lint ไม่ fail ตอนทดสอบ deep import แปลว่ากฎยังไม่ถูก wire ห้ามถือว่าเสร็จ"
        ],
        refs: [
          ref("skills/in-progress/setup-ts-deep-modules/dependency-cruiser.config.cjs", "dependency-cruiser.config.cjs — config ต้นแบบ"),
          ref("skills/in-progress/setup-ts-deep-modules/SKILL.md", "setup-ts-deep-modules — ขั้นตอนและเกณฑ์เสร็จ")
        ],
        sourcePath: "skills/in-progress/setup-ts-deep-modules/SKILL.md"
      },
      {
        id: "writing-beats",
        cat: "in-progress",
        type: "skill",
        name: "writing-beats",
        summary: "งานเขียนแบบ exploit: ประกอบวัตถุดิบเป็นลำดับ beat โดย ground คำศัพท์ก่อน beat ที่พึ่งมัน",
        overview: "รับไฟล์ Markdown ของวัตถุดิบที่ fix แล้ว เดินเรื่องแบบ choose-your-own-adventure: ตกลง prerequisite ที่ผู้อ่านมีอยู่แล้ว เสนอ 2–3 beat เริ่มต้นให้เลือก เขียนเฉพาะ beat ที่เลือกแล้วหยุด จากนั้นเสนอ 2–3 beat ถัดไปที่ไปถึงได้จาก grounded set. ทุก concept ต้อง grounded ก่อนถูกใช้ โดย prerequisite มาจากผู้อ่านหรือมาจาก beat ก่อนหน้า และ beat หนึ่งทำหนึ่งอย่างแล้วหยุด",
        prerequisites: [
          "ไฟล์วัตถุดิบ Markdown ที่ไม่ต้องการเก็บเพิ่ม",
          "path ของบทความปลายทาง"
        ],
        invoke: invoke("writing-beats", IN_PROGRESS),
        examples: [
          {
            title: "เริ่มจากวัตถุดิบ",
            prompt: "/writing-beats ใช้วัตถุดิบใน notes.md เขียนบทความ",
            result: "ถาม prerequisite ของผู้อ่าน แล้วเสนอ 2–3 beat เริ่มต้นให้เลือก"
          },
          {
            title: "เดินเรื่องต่อ",
            prompt: "/writing-beats เขียน beat ถัดไปจากที่เลือกไว้",
            result: "เขียนเฉพาะ beat ที่เลือก อ่านไฟล์จากดิสก์ก่อน แล้วหยุด"
          },
          {
            title: "ย้อนแก้ beat",
            prompt: "/writing-beats beat 3 ยังไม่ดี ช่วยเขียนใหม่",
            result: "แก้เฉพาะ beat นั้นและปล่อยส่วนที่เหลือไว้"
          }
        ],
        cautions: [
          IN_PROGRESS_CAUTION,
          "อย่าเขียนล่วงหน้าหลาย beat: หนึ่ง beat ต่อหนึ่งรอบ",
          "ก่อนเขียนทุกครั้งต้องอ่านไฟล์จากดิสก์และรักษาการแก้ไขของผู้ใช้",
          "อย่าใช้ concept ที่ยังไม่ grounded แม้จะเป็นคำที่ผู้อ่านเคยเห็นในที่อื่น"
        ],
        refs: [
          ref("skills/in-progress/writing-beats/SKILL.md", "writing-beats — grounding และจังหวะการเขียน"),
          ref("skills/in-progress/writing-shape/SKILL.md", "writing-shape — อีกทางของ exploit")
        ],
        sourcePath: "skills/in-progress/writing-beats/SKILL.md"
      },
      {
        id: "writing-fragments",
        cat: "in-progress",
        type: "skill",
        name: "writing-fragments",
        summary: "งานเขียนแบบ explore: ขุด fragment ดิบมา append ลงไฟล์เดียว ยังไม่จัดโครง",
        overview: "เป็น pure explore: ขยาย space ของสิ่งที่เป็นไปได้ที่จะเขียนโดยไม่ commit structure. ซักผู้ใช้เรื่องที่จะเขียน แล้ว append fragment ทุกชิ้นลง Markdown ไฟล์เดียว คั่นด้วย --- โดยไม่มี heading ในเนื้อ ไม่มี tag และไม่มีลำดับ. fragment อาจเป็นประโยคคม ๆ claim พร้อมเหตุผลสั้น ๆ vignette half-thought quote dialogue หรือ leading word ซึ่งมีค่าที่สุดเพราะกำหนดโครงในภายหลัง. ต้อง re-read ไฟล์ก่อนเขียนทุกครั้งและ append เท่านั้น",
        prerequisites: [
          "หัวข้อหรือความสนใจที่จะเขียน",
          "path ของไฟล์ที่ใช้เก็บ fragment"
        ],
        invoke: invoke("writing-fragments", IN_PROGRESS),
        examples: [
          {
            title: "เริ่มเก็บวัตถุดิบ",
            prompt: "/writing-fragments อยากเขียนเรื่องการทำงานกับ agent",
            result: "ซักไปเรื่อย ๆ และ append fragment แรกพร้อม working title"
          },
          {
            title: "เก็บประโยคที่ยังไม่รู้ที่ใช้",
            prompt: "/writing-fragments เก็บประโยคนี้ไว้ก่อน",
            result: "เพิ่มเป็น fragment ใหม่คั่นด้วย --- โดยไม่จัดหมวด"
          },
          {
            title: "หา leading word",
            prompt: "/writing-fragments ความคิดนี้ยังไม่มีชื่อ ช่วยหาคำสั้น ๆ",
            result: "เสนอ leading word ที่ใช้เป็นแกนของบทความในภายหลัง"
          }
        ],
        cautions: [
          IN_PROGRESS_CAUTION,
          "อย่าใส่ outline, phase หรือโครงบทความในขั้นนี้",
          "อย่า overwrite ไฟล์: append หรือแก้ fragment ที่ผู้ใช้ระบุเท่านั้น",
          "อย่าเพิ่ม metadata, TOC หรือวันที่"
        ],
        refs: [
          ref("skills/in-progress/writing-fragments/SKILL.md", "writing-fragments — นิยาม fragment และ file format"),
          ref("skills/in-progress/writing-beats/SKILL.md", "writing-beats — ขั้น exploit ที่นำ fragment ไปใช้")
        ],
        sourcePath: "skills/in-progress/writing-fragments/SKILL.md"
      },
      {
        id: "writing-shape",
        cat: "in-progress",
        type: "skill",
        name: "writing-shape",
        summary: "งานเขียนแบบ exploit: ปั้นวัตถุดิบเป็นบทความทีละ paragraph พร้อมเถียงเรื่อง format",
        overview: "อ่านไฟล์วัตถุดิบทั้งกองก่อน แล้วตกลงว่าผู้อ่านต้องรู้อะไรอยู่แล้วจึงจะอ่านบทความนี้รู้เรื่อง. เสนอ opening 2–3 แบบที่สื่อ thesis ต่างกันให้ผู้ใช้เลือก จากนั้นเถียงทีละ block ว่าผู้อ่านต้องได้ยินอะไรต่อไป โดยหยิบมาใช้ได้เฉพาะ concept ที่มีหลักฐานในไฟล์วัตถุดิบ และเขียนลงไฟล์บทความทันทีที่ตกลงแต่ละ block. ไฟล์วัตถุดิบเป็น read-only และการเลือก prose, list, table, callout, quote หรือ code ต้องมีเหตุผล",
        prerequisites: [
          "ไฟล์วัตถุดิบ Markdown",
          "path ของบทความที่แยกจากไฟล์วัตถุดิบ"
        ],
        invoke: invoke("writing-shape", IN_PROGRESS),
        examples: [
          {
            title: "เริ่มจาก pile",
            prompt: "/writing-shape ปั้น notes.md เป็นบทความ",
            result: "อ่านทั้งไฟล์และเสนอ opening ที่มี thesis ต่างกันให้เลือก"
          },
          {
            title: "เถียงเรื่อง format",
            prompt: "/writing-shape ส่วนนี้ควรเป็น list หรือ prose",
            result: "เปรียบเทียบว่ารายการขนานกันจริงไหมก่อนเลือก format"
          },
          {
            title: "ตัดส่วนที่ไม่ทำงาน",
            prompt: "/writing-shape paragraph นี้ทำให้บทความยืดเกินไปไหม",
            result: "ถามว่าถ้าตัดออกอะไรจะพัง และตัดถ้ามันไม่ได้ทำหน้าที่"
          }
        ],
        cautions: [
          IN_PROGRESS_CAUTION,
          "อย่าแก้ไฟล์วัตถุดิบ: มันเป็น read-only ของทักษะนี้",
          "อย่าเขียนทีละหลาย block: ตกลงแล้ว append ทันที",
          "อย่าเติม fragment ใหม่ที่ไม่มีใน pile; ถ้าขาด ให้บอกว่าเป็น gap"
        ],
        refs: [
          ref("skills/in-progress/writing-shape/SKILL.md", "writing-shape — grounding และ format arguments"),
          ref("skills/in-progress/writing-fragments/SKILL.md", "writing-fragments — ขั้น explore ก่อนหน้า")
        ],
        sourcePath: "skills/in-progress/writing-shape/SKILL.md"
      }
    ],
    idKey: "id",
    unit: "ทักษะ",
    catLabel: {
      engineering: "Engineering",
      productivity: "Productivity",
      misc: "Misc",
      "in-progress": "In progress"
    },
    collection: {
      repo: REPO,
      version: "1.3",
      license: "MIT",
      verifiedAt: "2026-10-23"
    }
  };

  /* The AI Hero catalog currently exposes the 27 shipped skills only. */
  NS.pages["matt-pocock-docs"].data = NS.pages["matt-pocock-docs"].data.filter(function (item) {
    return [
      "ask-matt", "grill-with-docs", "triage", "improve-codebase-architecture", "setup-matt-pocock-skills",
      "to-spec", "to-tickets", "implement", "implement-spec", "wayfinder", "retro", "prototype", "diagnosing-bugs",
      "research", "tdd", "domain-modeling", "codebase-design", "code-review", "pr", "wizard", "grill-me", "handoff",
      "teach", "to-questionnaire", "wait-what", "grilling", "writing-for-agents"
    ].indexOf(item.id) !== -1;
  });
})();
