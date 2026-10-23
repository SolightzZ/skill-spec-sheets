/* Page module: caveman-docs. Verified against Caveman docs and JuliusBrussee/caveman (2026-10-23). */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  var REPO = "https://github.com/JuliusBrussee/caveman";
  var DOCS = "https://docs.caveman.so/caveman";

  function readme(label, anchor) {
    return { label: "README — " + label, href: REPO + "/blob/main/README.md#" + anchor };
  }

  function docs(label, anchor) {
    return { label: "Caveman docs — " + label, href: DOCS + (anchor ? "#" + anchor : "") };
  }

  function skillDoc(id) {
    return { label: "skills/" + id + "/SKILL.md", href: REPO + "/blob/main/skills/" + id + "/SKILL.md" };
  }

  function skillInvoke(id) {
    return [
      { label: "เรียกผ่าน skill tool", code: 'skill("' + id + '")' },
      { label: "อ้างถึงจาก skill อื่น", code: id }
    ];
  }

  NS.pages["caveman-docs"] = {
    data: [
      /* ---------- toggle · 2 rocks + documented extensions ---------- */
      {
        id: "toggle-output",
        cat: "toggle",
        type: "concept",
        name: "output · Say less",
        summary: "skill ก้อนเล็ก: ย่อสิ่งที่เอเจนต์พูด โดยไม่แตะโค้ด คำสั่ง path หรือความหมาย",
        overview: "Caveman skill เป็น output compression อย่างเดียว ไม่ใช้ proxy และทำงานในเครื่องของคุณ ทุกคำตอบขึ้นต้นด้วยคำตอบ ตัดคำทักและ recap แต่เก็บคำปฏิเสธ ตัวเลข หน่วย โค้ด คำสั่ง และ path ไว้ตรงตัว ใช้ `/caveman` หรือ `$caveman` ใน Codex และสั่ง `stop caveman` เพื่อกลับโหมดปกติ",
        invoke: [
          { label: "เปิด skill", code: "npx skills add JuliusBrussee/caveman -g\n/caveman\nstop caveman" }
        ],
        cautions: [
          "การย่อต้องไม่กลับความหมาย ถ้าประโยคสั้นแล้วกำกวม ให้ใช้ประโยคเต็ม",
          "สั้นไม่ใช่เป้าหมาย ถ้าภาษาปกติสั้นหรือชัดกว่า ให้ใช้ภาษาปกติ",
          "ตัวเลข token ใน skill ใช้ tiktoken o200k; ผลจริงขึ้นกับโมเดลและวิธีคิดราคา"
        ],
        refs: [docs("The skill", "the-skill-small-rock"), docs("How caveman talks", "how-caveman-talks"), readme("Say less", "say-less-the-caveman-voice"), skillDoc("caveman")],
        sourcePath: "skills/caveman/SKILL.md"
      },
      {
        id: "toggle-input",
        cat: "toggle",
        type: "concept",
        name: "input · Read less",
        summary: "proxy ก้อนใหญ่: ย่อ logs, test output, JSON, diffs และเว็บเพจก่อนเอเจนต์อ่าน — input ลด 33.2% ทั้งเซสชัน",
        overview: "Caveman proxy ทำงานในเครื่อง ใช้ keys และ Claude Pro/Max login ของคุณ ต้นฉบับยังอยู่บนดิสก์และดึงกลับได้เมื่อจำเป็น ตัว benchmark ของ docs ลด input ทั้งเซสชันจาก 885,793 เหลือ 591,673 token หรือ 33.2% โดยคำตอบถูก 18 จาก 18; ติดตั้งด้วย `npm install -g @caveman-ai/cli` แล้วรัน `caveman setup --install`",
        invoke: [
          { label: "ติดตั้ง proxy", code: "npm install -g @caveman-ai/cli\ncaveman setup --install" }
        ],
        cautions: [
          "HTML ยังไม่มีตัวบีบ ในตารางวัดผลจึงแย่ลง 9.9% สำหรับไฟล์ชนิดนี้",
          "ไฟล์ทดสอบแต่ละชิ้นซ่อนหนึ่ง record ไว้ใน noise 61-72 KB จึงเป็นกรณีที่เอื้อต่อการบีบ",
          "เซสชันรวม system prompt, tool definitions, conversation และกฎของ Caveman จึงลดน้อยกว่าการบีบไฟล์เดี่ยว"
        ],
        refs: [docs("The proxy", "the-proxy-big-rock"), docs("Proxy benchmark", "proxy-benchmark-332-fewer-input-tokens"), readme("Read less", "read-less-332-fewer-input-tokens")],
        sourcePath: "README.md"
      },
      {
        id: "toggle-waste-fixes",
        cat: "toggle",
        type: "concept",
        name: "waste-fixes · Waste fixes",
        summary: "หาว่า token ไปไหนจากประวัติในเครื่อง แล้วแก้ทีละ diff เมื่ออนุมัติ พร้อม warm cache ระหว่างพัก",
        overview: "`caveman learn` จัดอันดับ sink ของ token จากประวัติเอเจนต์ที่มีอยู่บนดิสก์ ส่วน `caveman learn implement` เสนอการแก้ทีละจุดและลงมือเฉพาะเมื่อผู้ใช้อนุมัติ สวิตช์นี้ยังคุม warm cache ที่รักษา prompt cache ของ Anthropic ระหว่างที่ผู้ใช้หยุดพัก โดยดูจากประวัติว่ามักกลับมาในเวลาเท่าไร ทุกครั้งที่ warm จะแสดงใน `caveman stats`",
        invoke: [
          { label: "สลับสวิตช์", code: "caveman on waste-fixes\ncaveman off waste-fixes" }
        ],
        cautions: [
          "README ระบุว่ายังไม่ได้วัดผลประหยัดของก้อนนี้",
          "warm cache ทำงานเฉพาะเมื่อประวัติของคุณบอกว่าจะกลับมาในเวลา ไม่ได้เปิดค้างตลอด",
          "การแก้ไฟล์ memory ต้องอนุมัติทีละครั้ง และต้องยืนยันว่า token ต่อ turn ลดลงจริงก่อนเก็บไว้"
        ],
        refs: [readme("Smaller rocks", "smaller-rocks"), skillDoc("caveman-learn")],
        sourcePath: "skills/caveman-learn/SKILL.md"
      },
      {
        id: "toggle-routing",
        cat: "toggle",
        type: "concept",
        name: "routing · Auto",
        summary: "เลือกโมเดลและ effort ให้แต่ละคำถาม: งานยากใช้สมองใหญ่ งานง่ายประหยัด — ถูกกว่า Opus 5.5 ที่ xhigh 54%",
        overview: "Auto เพิ่มโมเดลใหม่ใน model picker แล้วให้ caveman เลือกโมเดลและระดับ effort ต่อคำขอ ต้องมีบัญชีฟรีและเลือก Auto เอง จึงจะเริ่มทำงาน บน 85 งานจริง Auto ทำได้ 43.7% ด้วย $3.59 ต่อครั้ง เทียบ Opus 5.5 ที่ xhigh 44.3% และ $7.83 ใช้เวลามัธยฐาน 15.9 นาที เทียบ 35.2 นาที",
        invoke: [
          { label: "เปิดบัญชีและสลับสวิตช์", code: "caveman login\ncaveman on routing\ncaveman off routing" }
        ],
        cautions: [
          "ยังไม่ลงชื่อเข้าใช้ จะไม่มี Auto และไม่มีข้อมูลถูกส่ง",
          "`caveman off routing` หยุดการส่งข้อมูลให้ Caveman Cloud เพื่อจัดเส้นทาง",
          "run ยังทำเสร็จครึ่งเดียว ช่องว่าง 0.5 จุดเล็กกว่าความคลาดเคลื่อน ±7 และส่วนใหญ่ของการประหยัดมาจากการลด effort ในงานง่าย"
        ],
        refs: [readme("Auto", "auto-54-cheaper-same-score")],
        sourcePath: "README.md"
      },
      {
        id: "toggle-scripts",
        cat: "toggle",
        type: "concept",
        name: "scripts · Blocks",
        summary: "code mode ที่เก็บสคริปต์ที่เอเจนต์เขียนไว้ใน repo แล้วใช้ซ้ำ — 397 → 76 token ต่อการรันเทสหนึ่งครั้ง",
        overview: "Blocks เก็บสคริปต์ที่เอเจนต์เขียนบ่อยไว้ใน repo ตรวจในทุก pull request และส่งกลับมาใช้เมื่อเจองานเดิม มี block พร้อมใช้แปดตัว เช่น `test-summary`, `json-peek` และ `first-error` เมื่อเอเจนต์เริ่มพิมพ์สคริปต์ที่ block ครอบอยู่แล้ว มันจะได้คำแนะนำหนึ่งบรรทัดให้ใช้ block โดยไม่มีการปฏิเสธหรือเขียนคำสั่งทับ",
        invoke: [
          { label: "สลับสวิตช์", code: "caveman on scripts\ncaveman off scripts" },
          { label: "สำรวจและติดตั้ง block ใน repo", code: "caveman-blocks scan\ncaveman-blocks init" }
        ],
        cautions: [
          "ยังเป็น pre-release v0.1.0-rc.5 ใช้ได้เฉพาะ Python และยังไม่มี sandbox",
          "`grep-defs` แพ้ grep ธรรมดาในตารางวัด ผลจึงยังเป็นสีแดง",
          "`caveman-blocks scan` ดูเฉพาะข้อความสคริปต์ในเครื่องและไม่ส่งออกไป"
        ],
        refs: [readme("Blocks", "blocks-code-mode-script-written-once")],
        sourcePath: "README.md"
      },
      {
        id: "toggle-browse",
        cat: "toggle",
        type: "concept",
        name: "browse · Browse",
        summary: "หน้าเว็บกลับมาแบบบีบอัดสำหรับเอเจนต์: 121 token แทน 15,704 สำหรับ snapshot ตาราง 200 แถว",
        overview: "`caveman browse <url>` ดึงหน้าเว็บแล้วย่อให้เหลือเฉพาะเนื้อหาที่เอเจนต์ต้องใช้ ตัวอย่างใน README คือ Playwright snapshot ของตาราง 200 แถว ลดจาก 15,704 เหลือ 121 token หรือเล็กลง 129.8 เท่า ฟอร์มเล็กกลับแย่ลง 2.3 เท่า เพราะ overhead ไม่คุ้มกับเนื้อหาที่มีน้อย",
        invoke: [
          { label: "สลับสวิตช์", code: "caveman on browse\ncaveman off browse" },
          { label: "ดึงหน้าเว็บแบบบีบอัด", code: "caveman browse <url>" }
        ],
        cautions: [
          "หน้าเว็บที่โครงสร้างซับซ้อนอาจย่อได้ไม่คุ้ม โดยเฉพาะฟอร์มเล็กที่แพ้ 2.3 เท่า",
          "ตัวเลข 129.8× มาจาก snapshot ตาราง 200 แถวกรณีเดียว ไม่ใช่ค่ากลางของทุกหน้า"
        ],
        refs: [readme("Smaller rocks", "smaller-rocks")],
        sourcePath: "README.md"
      },

      /* ---------- rule · 6 กฎการเขียน ---------- */
      {
        id: "rule-answer-first",
        cat: "rule",
        type: "concept",
        name: "Answer first",
        summary: "ขึ้นต้นด้วยคำตอบ แล้วจึงเหตุผลและขั้นถัดไป: `[thing] [action] [reason]. [next step].`",
        overview: "ประโยคแรกต้องตอบสิ่งที่ถาม ไม่ใช่ประกาศว่าจะทำอะไร รูปแบบคือ `[thing] [action] [reason]. [next step].` ไม่มีคำทัก ไม่มี let me และไม่มี recap ตอนจบ ถ้าประโยคแรกมีไว้บอกว่าจะเริ่มทำอะไร ให้ลบทิ้ง",
        cautions: [
          "คำเกริ่นอย่าง Sure หรือ I'd be happy to help กิน token โดยไม่เพิ่มข้อมูล",
          "recap ตอนจบซ้ำกับสิ่งที่เพิ่งพูด ให้ตัดออก",
          "ถ้าผู้ใช้ถามคำถามหรือขอตัวเลือก ให้ประโยคเต็มเพื่อให้ได้คำตอบถูกตั้งแต่ครั้งแรก"
        ],
        refs: [readme("Say less", "say-less-the-caveman-voice"), skillDoc("caveman")],
        sourcePath: "skills/caveman/SKILL.md"
      },
      {
        id: "rule-one-idea",
        cat: "rule",
        type: "concept",
        name: "หนึ่งประโยค หนึ่งความคิด",
        summary: "อิง ASD-STE100: ไม่เกิน 20 คำ ใช้ active voice และหนึ่งคำต่อหนึ่งสิ่ง",
        overview: "ประโยคยาวทำให้ต้องอ่านสองรอบ ภาษาควบคุมของคู่มือซ่อมเครื่องบิน (ASD-STE100) จึงเป็นพื้นขั้นต่ำ: ไม่เกิน 20 คำ ใช้ active voice ใช้คำสั่งตรง ๆ สำหรับขั้นตอน และใช้คำเดียวกับสิ่งเดียวตลอดเนื้อหา ถ้าการบีบกับความชัดชนกัน ให้ความชัดชนะ",
        cautions: [
          "คำย่อที่คิดขึ้นเอง เช่น cfg หรือ impl ไม่ได้ประหยัดจริงและอ่านยากขึ้น",
          "ลูกศรและสัญลักษณ์แทนคำอ่านยากกว่า และไม่ได้ลด token",
          "ประโยคที่มีสองความหมายต้องแยกเป็นประโยคเต็ม"
        ],
        refs: [readme("Say less", "say-less-the-caveman-voice"), skillDoc("caveman")],
        sourcePath: "skills/caveman/SKILL.md"
      },
      {
        id: "rule-meaning",
        cat: "rule",
        type: "concept",
        name: "ความหมายไม่หาย",
        summary: "ตัด article ได้ แต่ not, never, no, only, except ห้ามตัด และตัวเลขกับหน่วยต้องตรงเป๊ะ",
        overview: "การย่อที่เปลี่ยนความหมายแพงกว่าการไม่ย่อทุกกรณี a/an/the ตัดได้เมื่อยังอ่านเข้าใจในรอบเดียว แต่คำปฏิเสธและคำจำกัดขอบเขตต้องอยู่ครบ ตัวเลข หน่วย และเงื่อนไขต้องตรงตามต้นฉบับ",
        cautions: [
          "ตัวอย่างใน README: `Migration drop column backup first.` อ่านได้สองทาง ต้องเขียน `Back up first. Then run migration: it drops the column.`",
          "คำว่า only และ except เปลี่ยนขอบเขตของคำสั่ง จึงห้ามตัดแม้ประโยคจะยาวขึ้น"
        ],
        refs: [readme("Say less", "say-less-the-caveman-voice"), skillDoc("caveman")],
        sourcePath: "skills/caveman/SKILL.md"
      },
      {
        id: "rule-payload",
        cat: "rule",
        type: "concept",
        name: "Payload ตรงตัว",
        summary: "โค้ด คำสั่ง path ชื่อ API และ error message ต้องไม่ถูกแตะแม้แต่ตัวอักษรเดียว",
        overview: "Payload คือส่วนที่ผู้ใช้เอาไปใช้ต่อทันที: code block, คำสั่ง, path, ชื่อ API, ตัวเลข และ error message ต้องเหมือนต้นฉบับทุกตัวอักษร เมื่อแสดงโค้ดที่แก้ ให้แสดงเฉพาะบรรทัดที่เปลี่ยนพร้อมบริบทหนึ่งถึงสองบรรทัด ไม่ใช่ทั้งไฟล์ เว้นแต่ผู้ใช้ขอ เป็นไฟล์ใหม่ หรือเกือบทั้งไฟล์เปลี่ยน",
        cautions: [
          "คอมเมนต์เดิมในไฟล์ที่แก้ก็เป็น payload ห้ามลบหรือย่อคอมเมนต์ที่ไม่ได้ถูกขอให้แก้",
          "error message ให้ยกมาเฉพาะบรรทัดที่ชี้สาเหตุ แต่ต้องคัดลอกตรงตัว",
          "การเปลี่ยนชื่อตัวแปรหรือ path เพียงเล็กน้อยทำให้คำสั่งที่ผู้ใช้คัดลอกไปพัง"
        ],
        refs: [readme("Say less", "say-less-the-caveman-voice"), skillDoc("caveman")],
        sourcePath: "skills/caveman/SKILL.md"
      },
      {
        id: "rule-no-theater",
        cat: "rule",
        type: "concept",
        name: "No theater",
        summary: "ไม่มี me think ไม่มีเสียงรบกวนระหว่าง tool call และไม่แต่งคำให้ดูเป็นคนถ้ำ",
        overview: "ภาษาคนถ้ำต้องสั้นเพราะจำเป็น ไม่ใช่เพราะแสดง มีบรรทัดสถานะก่อนชุดคำสั่งหลายขั้น หนึ่งบรรทัดเมื่อเปลี่ยนช่วง และหนึ่งบรรทัดเมื่อจบ นอกนั้นไม่พิมพ์อะไรระหว่างการเรียก tool ตามปกติ ไม่มี prefix Caveman: ไม่มีตารางหรือ emoji ประดับ และไม่มีการตอบปกติคู่กับฉบับคนถ้ำ",
        cautions: [
          "ถ้าภาษาคนถ้ำไม่สั้นกว่าภาษาปกติ ให้ใช้ภาษาปกติ",
          "ข้อความก่อนเรียก tool ควรมีเฉพาะเมื่อต้องขอความชัดเจน เตือน หรือแยกทางเลือก",
          "ห้ามเพิ่มคำเพื่อให้ดูเป็นคนถ้ำ เพราะขัดเป้าหมายเรื่อง token"
        ],
        refs: [readme("Say less", "say-less-the-caveman-voice"), skillDoc("caveman")],
        sourcePath: "skills/caveman/SKILL.md"
      },
      {
        id: "rule-stop",
        cat: "rule",
        type: "concept",
        name: "รู้ว่าเมื่อไหร่ต้องหยุด",
        summary: "คำเตือนความปลอดภัย การกระทำที่ย้อนกลับไม่ได้ และผู้ใช้ที่สับสน ได้ประโยคเต็ม แล้วจึงกลับไปพูดสั้น",
        overview: "มีเจ็ดกรณีที่กฎการย่อถูกพัก: คำเตือนความปลอดภัย การกระทำที่ย้อนกลับไม่ได้ ลำดับขั้นที่ fragment ทำให้สลับ ผู้ใช้ที่สับสนหรือถามซ้ำ ข้อความที่ถูกเก็บนอกแชท (โค้ด คอมเมนต์ commit เอกสาร issue PR) การที่ harness ขอสถานะหรือคำยืนยัน และตอนที่เอเจนต์ถามคำถามหรือเสนอตัวเลือก ทั้งหมดใช้ประโยคเต็มก่อน แล้วจึงกลับไปพูดสั้น",
        cautions: [
          "การยืนยันการกระทำที่ย้อนกลับไม่ได้ต้องเป็นประโยคเต็มก่อนลงมือ",
          "เอกสาร commit และข้อความที่คนอื่นอ่านต้องเป็นภาษาปกติ ไม่ใช่ภาษาคนถ้ำ",
          "ถ้าผู้ใช้ถามซ้ำเพราะไม่เข้าใจ ให้หยุดย่อและอธิบายเต็ม"
        ],
        refs: [readme("Say less", "say-less-the-caveman-voice"), skillDoc("caveman")],
        sourcePath: "skills/caveman/SKILL.md"
      },

      /* ---------- command · 7 slash commands ---------- */
      {
        id: "cmd-caveman",
        cat: "command",
        type: "command",
        name: "/caveman",
        summary: "เปิดโหมดเสียงคนถ้ำ ใช้ได้ตลอดเซสชันจนกว่าจะสั่งหยุด",
        overview: "เป็น slash command หลักของชุด เปลี่ยนเสียงของคำตอบโดยไม่แตะ prompt ของผู้ใช้ `caveman.toml` ระบุว่า argument ว่างคือเปิด, `off` คือปิด และ `status` คือรายงานโหมดปัจจุบันโดยไม่เปลี่ยนอะไร alias `ultra` และ `wenyan` ถูกส่งต่อไปยัง `/ultracave` และ `/megacave`",
        invoke: [
          { label: "เปิดโหมด", code: "/caveman" },
          { label: "ดูโหมดปัจจุบัน / ปิด", code: "/caveman status\n/caveman off" }
        ],
        examples: [
          {
            title: "เปิดใช้กลางเซสชัน",
            prompt: "/caveman ตอบสั้นลงตั้งแต่ตอนนี้ แต่คงคำสั่งและ path ไว้ครบ",
            result: "เอเจนต์เปลี่ยนเป็นเสียงคนถ้ำและตอบสั้นลงในคำตอบถัดไป"
          },
          {
            title: "ตรวจว่าตอนนี้โหมดอะไร",
            prompt: "/caveman status",
            result: "รายงาน `Caveman mode: <mode>` โดยไม่เปลี่ยนโหมด และต่อท้าย `(not tracked by this host)` เมื่อ host ไม่มี hook"
          },
          {
            title: "ปิดเมื่อต้องการคำอธิบายยาว",
            prompt: "stop caveman",
            result: "กลับไปตอบภาษาปกติ และยืนยันการปิดในหนึ่งบรรทัด"
          }
        ],
        cautions: [
          "โหมดติดไปตลอดเซสชันจนสั่ง stop caveman หรือ normal mode",
          "โหมดไม่เขียน prompt ของผู้ใช้ และไม่แปลงข้อความที่ผู้ใช้พิมพ์",
          "ใน Codex ใช้ `$caveman` แทน `/caveman`"
        ],
        refs: [readme("Commands", "commands")],
        sourcePath: "commands/caveman.toml"
      },
      {
        id: "cmd-ultracave",
        cat: "command",
        type: "command",
        name: "/ultracave",
        summary: "โหมดบีบสูงสุด: fragments คำเดียวเมื่อพอ และแต่ละข้อเท็จจริงพูดครั้งเดียว",
        overview: "ต่อจาก `/caveman` แต่ตัด grammar มากขึ้น เหลือ fragment และคำเดียวเมื่อคำเดียวพอ ทุกข้อเท็จจริงยังอยู่และพูดครั้งเดียว โค้ด คำสั่ง path ตัวเลข error string และคำปฏิเสธไม่ถูกแตะ และใช้ประโยคปกติเมื่อเตือนเรื่องความปลอดภัยหรือการกระทำที่ย้อนกลับไม่ได้",
        invoke: [
          { label: "เปิดโหมด", code: "/ultracave" },
          { label: "alias", code: "/caveman ultra" }
        ],
        examples: [
          {
            title: "รีวิวไฟล์สั้น ๆ",
            prompt: "/ultracave แล้วบอกว่าฟังก์ชันนี้มีปัญหาไหน",
            result: "ตอบเป็น fragment สั้น ระบุบรรทัดและปัญหา ไม่อธิบายซ้ำ"
          },
          {
            title: "งานที่ต้องเห็นทั้งสองด้าน",
            prompt: "อธิบาย trade-off ของสองทางเลือกนี้แบบ ultracave",
            result: "แต่ละข้อเท็จจริงถูกพูดครั้งเดียว แต่ยังครบทั้งข้อดีและข้อเสีย"
          },
          {
            title: "คำเตือนความปลอดภัย",
            prompt: "/ultracave ลบ branch นี้ให้หน่อย",
            result: "หยุดใช้ fragment และยืนยันด้วยประโยคเต็มก่อนลบ"
          }
        ],
        cautions: [
          "วัดผลบน rules 3.1.0 และยังไม่ได้วัดซ้ำ ตัวเลข 2,693 token จึงเป็นค่าของรอบนั้น",
          "โหมดนี้ไม่เหมาะกับเอกสารที่คนอื่นอ่าน ต้องกลับเป็นภาษาปกติเมื่อเขียนนอกแชท"
        ],
        refs: [readme("Commands", "commands"), skillDoc("ultracave")],
        sourcePath: "commands/ultracave.toml"
      },
      {
        id: "cmd-megacave",
        cat: "command",
        type: "command",
        name: "/megacave",
        summary: "โหมดคนถ้ำเป็น 文言文: ตัวอักษรน้อยลงมาก ศัพท์เทคนิคคงเดิม",
        overview: "ใช้ register 文言文 (Classical Chinese) เพื่อลดจำนวนตัวอักษร โค้ด คำสั่ง path ตัวเลข และ error string ยังอยู่ใน script เดิม ศัพท์เทคนิคไม่ถูกแปล และใช้ประโยคปกติเมื่อเตือนความปลอดภัยหรือการกระทำที่ย้อนกลับไม่ได้",
        invoke: [
          { label: "เปิดโหมด", code: "/megacave" },
          { label: "alias", code: "/caveman wenyan" }
        ],
        examples: [
          {
            title: "ถามสั้น",
            prompt: "/megacave แล้วสรุปว่าทำไม test นี้พัง",
            result: "สรุปสั้นแบบ文言文 โดย path และ error string ตรงต้นฉบับ"
          },
          {
            title: "เทียบสามโหมด",
            prompt: "ตอบคำถามเดิมด้วย /caveman, /ultracave และ /megacave",
            result: "ได้สามความยาวจากคำตอบเดียวกัน โดยข้อเท็จจริงเท่ากัน"
          },
          {
            title: "งานที่มีคำสั่ง",
            prompt: "แสดงคำสั่ง deploy ที่ถูกต้องแบบ megacave",
            result: "คำสั่งถูกคัดลอกมาทั้งบรรทัด ไม่ถูกย่อหรือแปล"
          }
        ],
        cautions: [
          "ผู้ใช้อาจไม่คุ้น 文言文 จึงควรใช้เมื่อผู้ใช้เลือกเอง",
          "ห้ามแปลศัพท์เทคนิคหรือ error string เพื่อให้เข้ากับ register"
        ],
        refs: [readme("Commands", "commands"), skillDoc("megacave")],
        sourcePath: "commands/megacave.toml"
      },
      {
        id: "cmd-caveman-commit",
        cat: "command",
        type: "command",
        name: "/caveman-commit",
        summary: "ข้อความ commit แบบ Conventional Commits บรรทัดเดียว ไม่มี period ท้าย subject",
        overview: "สร้างข้อความ commit จาก staged changes ใช้รูปแบบ Conventional Commits subject ไม่เกิน 50 ตัวอักษร เป็น imperative และตัวพิมพ์เล็กหลัง type ใส่ body เฉพาะเมื่อเหตุผลอ่านไม่ได้จาก subject โดยเน้น why มากกว่า what",
        invoke: [
          { label: "สร้างข้อความ commit", code: "/caveman-commit" }
        ],
        examples: [
          {
            title: "แก้บั๊กเล็ก",
            prompt: "/caveman-commit stage การแก้ token expiry แล้วขอ commit message",
            result: "`fix(auth): reject expired token`"
          },
          {
            title: "เปลี่ยนพฤติกรรม",
            prompt: "/caveman-commit stage แล้วขอ commit message สั้น ๆ",
            result: "subject บรรทัดเดียว และมี body เฉพาะเมื่อ why ไม่ชัดจาก subject"
          },
          {
            title: "หลายไฟล์",
            prompt: "/caveman-commit refactor หลายไฟล์ ช่วยเขียน commit",
            result: "subject เดียวที่ครอบการเปลี่ยนทั้งหมด ไม่ไล่รายไฟล์"
          }
        ],
        cautions: [
          "subject ต้องไม่เกิน 50 ตัวอักษร และไม่ใส่ period ท้าย",
          "body ใส่เฉพาะเมื่อเหตุผลไม่ชัดจาก subject"
        ],
        refs: [readme("Commands", "commands"), skillDoc("caveman-commit")],
        sourcePath: "commands/caveman-commit.toml"
      },
      {
        id: "cmd-caveman-review",
        cat: "command",
        type: "command",
        name: "/caveman-review",
        summary: "รีวิวโค้ดหนึ่ง finding ต่อบรรทัด: `L42: 🔴 null deref. Guard it.`",
        overview: "ตรวจการเปลี่ยนแปลงปัจจุบันแล้วรายงานหนึ่ง finding ต่อบรรทัดในรูปแบบ `L<line>: <severity> <problem>. <fix>.` severity มี bug, risk, nit และ q ไม่มีคำชมและไม่พูดถึงเรื่องที่เห็นชัดอยู่แล้ว ถ้าโค้ดเรียบร้อยให้ตอบ `LGTM` แล้วหยุด",
        invoke: [
          { label: "รีวิวการเปลี่ยนแปลง", code: "/caveman-review" }
        ],
        examples: [
          {
            title: "รีวิวดิฟ",
            prompt: "/caveman-review",
            result: "`L42: 🔴 bug: null deref. Guard it.`"
          },
          {
            title: "โค้ดเรียบร้อย",
            prompt: "/caveman-review รีวิว branch นี้ให้หน่อย",
            result: "`LGTM` บรรทัดเดียว"
          },
          {
            title: "จัดลำดับความสำคัญ",
            prompt: "/caveman-review รีวิวแล้วบอกว่าอันไหนควรแก้ก่อน",
            result: "findings เรียงตามบรรทัด พร้อม severity ให้เลือกแก้ bug ก่อน"
          }
        ],
        cautions: [
          "ไม่มีคำชมหรือสรุปยาว เพราะเป้าหมายคือ finding ที่ลงมือได้",
          "finding ต้องมีเลขบรรทัดจริง ไม่ประมาณ"
        ],
        refs: [readme("Commands", "commands"), skillDoc("caveman-review")],
        sourcePath: "commands/caveman-review.toml"
      },
      {
        id: "cmd-caveman-stats",
        cat: "command",
        type: "command",
        name: "/caveman-stats",
        summary: "token ที่ใช้จริงของเซสชัน Claude Code นี้ พร้อม mode attribution — ไม่ประมาณการประหยัด",
        overview: "อ่านรายงานที่ hook บันทึกไว้ แล้วพิมพ์กลับตามจริงโดยไม่คำนวณหรือปัดเศษเอง รายงานมี output token, cache-read token, จำนวน response และโหมดที่ใช้ เมื่อไม่มีการวัดเทียบคู่ การประหยัดจึงรายงานว่าไม่ทราบ ใน Gemini CLI ให้ใช้ `/stats model` หรือ `/stats session` ของ host เอง",
        invoke: [
          { label: "ดูเซสชันนี้", code: "/caveman-stats" },
          { label: "ตัวเลือกเพิ่ม", code: "/caveman-stats --since 7d\n/caveman-stats --all\n/caveman-stats --share" }
        ],
        examples: [
          {
            title: "ดูเซสชันนี้",
            prompt: "/caveman-stats",
            result: "รายงาน output และ cache-read token ของเซสชัน พร้อมโหมดที่ใช้"
          },
          {
            title: "ดูย้อนหลัง",
            prompt: "/caveman-stats --since 7d",
            result: "รวมจำนวน output ล่าสุดต่อเซสชันในช่วง 7 วัน"
          },
          {
            title: "ใช้ Gemini CLI",
            prompt: "/caveman-stats",
            result: "แจ้งให้ใช้ `/stats model` ของ Gemini เพราะ custom command อ่าน metric สดไม่ได้"
          }
        ],
        cautions: [
          "ห้ามอนุมาน token ที่ประหยัดได้จาก output count เพราะไม่มีการวัดเทียบคู่",
          "ประวัติแบบ lifetime ใช้ได้เฉพาะ Claude Code",
          "ส่วนต่างขนาดไฟล์ memory ไม่ได้แปลว่า provider คิดเงินน้อยลง"
        ],
        refs: [readme("Commands", "commands"), skillDoc("caveman-stats")],
        sourcePath: "commands/caveman-stats.toml"
      },
      {
        id: "cmd-caveman-init",
        cat: "command",
        type: "command",
        name: "/caveman-init",
        summary: "วางกฎเปิด caveman อัตโนมัติลง repo ปัจจุบันสำหรับ IDE agent ทุกตัว",
        overview: "เขียนไฟล์กฎราย repo สำหรับ Cursor, Windsurf, Cline, Copilot และ AGENTS.md แล้วรายงานผล คำสั่งรองรับ `--dry-run`, `--force` และ `--only <agent>` ถ้าอยู่ใน caveman checkout จะรัน `src/tools/caveman-init.js` ในเครื่อง ไม่อย่างนั้นจะดาวน์โหลดสคริปต์ standalone มารัน",
        invoke: [
          { label: "ดูก่อนเขียน", code: "/caveman-init --dry-run" },
          { label: "จำกัด agent", code: "/caveman-init --only cursor" }
        ],
        examples: [
          {
            title: "ดูก่อนว่าจะเขียนอะไร",
            prompt: "/caveman-init --dry-run",
            result: "รายการไฟล์ที่จะถูกเขียน โดยยังไม่แตะ repo"
          },
          {
            title: "เขียนจริง",
            prompt: "/caveman-init",
            result: "ไฟล์กฎของ agent ที่ตรวจพบถูกเขียน และรายงานผลต่อไฟล์"
          },
          {
            title: "เฉพาะ agent เดียว",
            prompt: "/caveman-init --only cursor",
            result: "เขียนเฉพาะกฎของ Cursor"
          }
        ],
        cautions: [
          "ใช้ `--dry-run` ก่อนเสมอถ้าไม่ได้ตั้งใจใช้ `--force` เพราะอาจเขียนทับไฟล์กฎเดิม",
          "คำสั่งเขียนไฟล์หลายตัวใน repo ควรตรวจ diff ก่อน commit"
        ],
        refs: [
          { label: "commands/caveman-init.md", href: REPO + "/blob/main/commands/caveman-init.md" }
        ],
        sourcePath: "commands/caveman-init.md"
      },

      /* ---------- skill · 7 สกิล ---------- */
      {
        id: "skill-cavecrew",
        cat: "skill",
        type: "skill",
        name: "cavecrew",
        summary: "สาม subagent preset ที่ตอบแบบ ultracave: หาโค้ด แก้ 1-2 ไฟล์ และรีวิว diff",
        overview: "cavecrew ประกอบด้วย `cavecrew-investigator` สำหรับหาโค้ด `cavecrew-builder` สำหรับแก้ไม่เกินสองไฟล์ และ `cavecrew-reviewer` สำหรับตรวจ diff ทั้งสามตอบด้วยรูปแบบตายตัว เช่น `path:line — symbol — note` ทำให้ผลลัพธ์ที่ถูกฉีดกลับเข้า main context สั้นกว่า prose มาก และ context หลักจึงอยู่ได้นานขึ้น",
        invoke: [
          { label: "เรียกผ่าน skill tool", code: 'skill("cavecrew")' },
          { label: "subagent ที่มีให้ใช้", code: "cavecrew-investigator\ncavecrew-builder\ncavecrew-reviewer" }
        ],
        examples: [
          {
            title: "หาโค้ด",
            prompt: "ใช้ cavecrew หาว่าฟังก์ชัน pickModel ถูกนิยามที่ไหนและใครเรียก",
            result: "ตาราง `path:line` พร้อม symbol ไม่มี prose"
          },
          {
            title: "แก้จุดเดียว",
            prompt: "ใช้ cavecrew แก้ guard ที่ src/auth/token.ts:42 ให้ปฏิเสธ token หมดอายุ",
            result: "`path:line-range — change` พร้อม `verified: re-read OK`"
          },
          {
            title: "รีวิวดิฟ",
            prompt: "ใช้ cavecrew รีวิว diff นี้ว่ามีบั๊กไหม",
            result: "findings เรียงตามบรรทัด พร้อม severity และ fix"
          }
        ],
        cautions: [
          "อย่าใช้ builder เมื่อยังไม่รู้ไฟล์ ต้องให้ investigator หาก่อน",
          "ถ้าต้องการ prose หรือคำอธิบายสถาปัตยกรรม ให้ใช้ agent ปกติไม่ใช่ cavecrew",
          "ผลลัพธ์ถูกออกแบบให้ grep ได้ ไม่ใช่ให้อ่านยาว"
        ],
        refs: [skillDoc("cavecrew")],
        sourcePath: "skills/cavecrew/SKILL.md"
      },
      {
        id: "skill-caveman-explore",
        cat: "skill",
        type: "skill",
        name: "caveman-explore",
        summary: "explorer อ่านอย่างเดียวสำหรับหา location คืนเฉพาะ citation `path:line`",
        overview: "เป็น agent อ่านอย่างเดียวที่ใช้ Read, Glob และ Grep ทำงานคู่ขนานในเทิร์นแรกเพื่อกวาดสมมติฐานหลายทาง แล้วหยุดทันทีที่ระบุตำแหน่งได้ คำตอบต้องเป็นบล็อกหลักฐานเท่านั้น บรรทัดละหนึ่ง citation ในรูป `path:line-range  reason` งานอ่านทั้งหมดจึงไม่กิน context ของ solver",
        invoke: [
          { label: "เรียกผ่าน skill tool", code: 'skill("caveman-explore")' }
        ],
        examples: [
          {
            title: "หาโค้ดที่ยังไม่รู้ path",
            prompt: "ใช้ caveman-explore หา route ที่เลือกโมเดลใน repo นี้",
            result: "`src/router/pick.go:42-71  route selection`"
          },
          {
            title: "ตามหาจาก symbol",
            prompt: "ใช้ caveman-explore หา test ที่ครอบ pick()",
            result: "citation ของไฟล์ test พร้อมช่วงบรรทัดที่อ่านจริง"
          },
          {
            title: "ค้นไม่เจอ",
            prompt: "ใช้ caveman-explore หา handler ของ webhook Stripe",
            result: "`no relevant locations found` แทนการเดา"
          }
        ],
        cautions: [
          "ข้าม skill นี้เมื่อรู้ชื่อไฟล์หรือ symbol อยู่แล้ว",
          "ห้ามคืนช่วงบรรทัดที่ยังไม่ได้อ่านจริงหรือเกินความยาวไฟล์",
          "คำตอบต้องไม่มี preamble หรือสรุปอธิบาย"
        ],
        refs: [skillDoc("caveman-explore")],
        sourcePath: "skills/caveman-explore/SKILL.md"
      },
      {
        id: "skill-caveman-learn",
        cat: "skill",
        type: "skill",
        name: "caveman-learn",
        summary: "อ่านรายงาน learn แล้วแก้ token sink ทีละจุด โดยขออนุมัติทุกครั้ง",
        overview: "`caveman learn` เป็นส่วนที่วัดว่า token ไปไหน ส่วน skill นี้เป็นส่วนที่ลงมือแก้ เริ่มจาก `caveman learn report --json` แล้วอ่าน Cave Score กับ sink ที่จัดอันดับไว้ จากนั้นจำแนก sink ตาม class เช่น REDUCIBLE หรือ RECURRING_CONTEXT และเสนอ diff ทีละรายการ ผู้ใช้ต้องตอบ yes ก่อนทุกครั้ง และต้องวัดซ้ำว่า token ต่อ turn ลดลงจริง",
        invoke: [
          { label: "อ่านรายงาน", code: "caveman learn report --json" },
          { label: "ทดลองแก้", code: "caveman learn apply <sink_id> --dry-run" },
          { label: "เรียกผ่าน skill tool", code: 'skill("caveman-learn")' }
        ],
        examples: [
          {
            title: "CLAUDE.md หนัก",
            prompt: "ใช้ caveman-learn ช่วยลด token ที่ใช้ในโปรเจกต์นี้",
            result: "รายงาน sink ที่หนักที่สุดพร้อมข้อเสนอทีละ diff"
          },
          {
            title: "ทดลองก่อนแก้",
            prompt: "ใช้ caveman-learn sink นี้ถ้าแก้จะประหยัดเท่าไร",
            result: "`caveman learn simulate <sink_id>` แสดง scale จากประวัติที่สแกน ไม่พยากรณ์อนาคต"
          },
          {
            title: "ย้าย context ที่พิมพ์ซ้ำ",
            prompt: "ใช้ caveman-learn block นี้ถูกพิมพ์ซ้ำทุกเซสชัน ช่วยย้ายไป cavemem",
            result: "candidate แบบ cavemem_offload พร้อม locator และขออนุมัติก่อนเขียน"
          }
        ],
        cautions: [
          "ห้ามอ้างการประหยัดที่ยังไม่ได้วัด และห้ามเก็บ edit ที่ไม่ได้ทำให้ token ต่อ turn ลดลง",
          "spend ที่รายงานคือต้นทุนของหน้าต่างที่สแกน ไม่ใช่ผลตอบแทนของ fix และห้ามคูณเป็นรายเดือน",
          "sink เชิงพฤติกรรม เช่น session_outcomes เป็นสหสัมพันธ์ ให้รายงานเป็นข้อสังเกตไม่ใช่คำสั่ง"
        ],
        refs: [skillDoc("caveman-learn"), readme("Smaller rocks", "smaller-rocks")],
        sourcePath: "skills/caveman-learn/SKILL.md"
      },
      {
        id: "skill-investigate-first",
        cat: "skill",
        type: "skill",
        name: "investigate-first",
        summary: "หา root cause จากหลักฐานก่อนแก้โค้ด ใช้กับอาการที่ยังไม่รู้สาเหตุ",
        overview: "แยก symptom ที่สังเกตได้ออกจาก cause ที่อนุมาน แล้วไล่ input, state transition, ownership boundary และ failure output จัดอันดับสมมติฐานตามหลักฐานและความคุ้มค่าของการหักล้างที่ถูกที่สุด ห้ามแก้โค้ดจนกว่าจะมีกลไกหนึ่งที่อธิบายหลักฐานได้ครบ และหยุดสำรวจเมื่อระบุ cause หรือ blocker ได้ชัด",
        invoke: skillInvoke("investigate-first"),
        examples: [
          {
            title: "บั๊กเป็นครั้งคราว",
            prompt: "ใช้ investigate-first บางครั้ง request ค้าง 20 วินาที ช่วยหาสาเหตุก่อนแก้",
            result: "ได้สมมติฐานที่จัดอันดับพร้อมหลักฐานและจุดที่ยังขาด"
          },
          {
            title: "Performance regression",
            prompt: "ใช้ investigate-first หน้า dashboard ช้าลงหลัง deploy ล่าสุด",
            result: "แยกอาการจาก cause และชี้จุดที่ต้องวัดต่อ"
          },
          {
            title: "ยังไม่รู้สาเหตุ",
            prompt: "ใช้ investigate-first เทสพังเฉพาะบน CI",
            result: "รายงาน cause และ proof โดยไม่แก้โค้ดถ้างานไม่ได้สั่งให้แก้"
          }
        ],
        cautions: [
          "งานนี้ไม่ใช่การแก้บั๊ก ถ้าโจทย์ไม่ได้ให้แก้ ให้รายงานเฉพาะ cause กับ proof",
          "ห้ามเริ่มแก้ก่อนมีกลไกที่อธิบายหลักฐานได้",
          "หยุดเมื่อหลักฐานพอระบุ cause ไม่ต้องสำรวจต่อจนครบทุกมุม"
        ],
        refs: [skillDoc("investigate-first")],
        sourcePath: "skills/investigate-first/SKILL.md"
      },
      {
        id: "skill-safe-refactor",
        cat: "skill",
        type: "skill",
        name: "safe-refactor",
        summary: "เปลี่ยนโครงสร้างโดยรักษาพฤติกรรม ด้วยการวางหลักฐานตรวจสอบก่อนและหลัง",
        overview: "กำหนดขอบเขตการรักษาพฤติกรรมและตั้งการตรวจสอบก่อนแก้โครงสร้าง แยกงานเปลี่ยนฟีเจอร์ออกจาก refactor ย้าย ownership boundary ทีละชั้น รักษา public interface, failure behavior, ลำดับ และ compatibility เว้นแต่ถูกระบุไว้ชัด ทุกสถานะกลางต้อง build และ test ได้",
        invoke: skillInvoke("safe-refactor"),
        examples: [
          {
            title: "แยกโมดูล",
            prompt: "ใช้ safe-refactor แยกฟังก์ชัน parse ออกจากไฟล์นี้โดยพฤติกรรมต้องไม่เปลี่ยน",
            result: "ย้ายทีละ boundary พร้อมเทสเดิมเป็นตาข่าย"
          },
          {
            title: "ย้าย ownership",
            prompt: "ใช้ safe-refactor ย้าย auth ไป service ใหม่ แต่ API ต้องเหมือนเดิม",
            result: "public interface และ failure behavior ถูกตรึงไว้ก่อนย้าย"
          },
          {
            title: "เก็บกวาด",
            prompt: "ใช้ safe-refactor จัดระเบียบโค้ดนี้โดยไม่เพิ่มฟีเจอร์",
            result: "ไม่มีการเพิ่ม dependency หรือ config ที่ไม่จำเป็นต่อความถูกต้อง"
          }
        ],
        cautions: [
          "ห้ามรวมงานเปลี่ยนฟีเจอร์ไว้ใน refactor เดียวกัน",
          "อย่าย้ายหลาย boundary พร้อมกันจนแยกสาเหตุของ regression ไม่ได้",
          "ต้องรัน proof ชุดเดิมหลังแก้ ไม่ใช่ชุดใหม่ที่หลวมกว่า"
        ],
        refs: [skillDoc("safe-refactor")],
        sourcePath: "skills/safe-refactor/SKILL.md"
      },
      {
        id: "skill-verify-and-stop",
        cat: "skill",
        type: "skill",
        name: "verify-and-stop",
        summary: "พิสูจน์ว่างานที่มีอยู่ผ่านเกณฑ์ แล้วหยุดทันทีโดยไม่ขยายขอบเขต",
        overview: "แปลง acceptance condition เป็นชุดหลักฐานที่เล็กพอ ใช้ผลที่ยังสดและตรงกับ state ของ repo ปัจจุบัน รัน focused check ก่อน gate ที่กว้างกว่า และแยกผล pass, fail, unavailable และ blocked ให้ตรง ถ้างานเป็น validation-only ก็ไม่แก้โค้ดและไม่เพิ่ม polish หรือเทสที่ไม่เกี่ยวข้องหลังผ่านเกณฑ์",
        invoke: skillInvoke("verify-and-stop"),
        examples: [
          {
            title: "ตรวจงานเสร็จ",
            prompt: "ใช้ verify-and-stop ตรวจว่างานนี้ผ่านเกณฑ์ทั้งหมดหรือยัง",
            result: "รายงานคำสั่ง ผล และความเสี่ยงที่ยังค้าง โดยไม่แก้โค้ด"
          },
          {
            title: "ตรวจเฉพาะจุด",
            prompt: "ใช้ verify-and-stop รันเฉพาะ gate ที่เกี่ยวกับ auth",
            result: "เริ่มจาก focused check แล้วจึงขยายเมื่อจำเป็น"
          },
          {
            title: "หลักฐานยังใช้ได้ไหม",
            prompt: "ใช้ verify-and-stop ผลเทสรอบก่อนยังใช้ได้ไหม",
            result: "ใช้ได้เฉพาะเมื่อ repo state ตรงกัน ไม่งั้นรันใหม่"
          }
        ],
        cautions: [
          "ห้ามรายงาน pass เมื่อคำสั่งรันไม่ได้ ให้ใช้ unavailable หรือ blocked ตามจริง",
          "หยุดเมื่อหลักฐานครบ อย่าเพิ่ม cleanup หรือเทสใหม่ที่ไม่ได้ขอ",
          "ผลจากรอบก่อนใช้ได้เฉพาะเมื่อ state ของ repo ไม่เปลี่ยน"
        ],
        refs: [skillDoc("verify-and-stop")],
        sourcePath: "skills/verify-and-stop/SKILL.md"
      },
      {
        id: "skill-caveman-compress",
        cat: "skill",
        type: "skill",
        name: "caveman-compress",
        summary: "บีบไฟล์ memory เช่น CLAUDE.md เป็นภาษาคนถ้ำ เก็บ backup ที่อ่านได้ และคง heading โค้ด path ครบ",
        overview: "เรียกด้วย `/caveman-compress <file>` แล้วสคริปต์จะตรวจชนิดไฟล์ เรียกโมเดลให้บีบ ตรวจผลและซ่อมเฉพาะจุดที่ผิด พร้อม retry ไม่เกินสองครั้ง ต้นฉบับถูกเขียนทับด้วยฉบับบีบ แต่ backup ถูกเก็บนอก tree ของโปรเจกต์เพื่อไม่ให้ skill loader อ่านกลับเข้า context ในห้าไฟล์ทดสอบ ผลรวมลดจาก 6,198 เหลือ 4,138 token โดย heading, code block และ path ยังครบ",
        invoke: [
          { label: "เรียกผ่าน slash command", code: "/caveman-compress CLAUDE.md" },
          { label: "เรียกสคริปต์ตรงจากโฟลเดอร์ skill", code: "python3 -m scripts <absolute_filepath>" }
        ],
        examples: [
          {
            title: "ไฟล์ memory ยาว",
            prompt: "/caveman-compress CLAUDE.md",
            result: "CLAUDE.md ฉบับบีบ พร้อม backup นอก tree"
          },
          {
            title: "ไฟล์ todo",
            prompt: "/caveman-compress notes/todo.md",
            result: "ข้อความสั้นลง แต่ path และคำสั่งยังตรง"
          },
          {
            title: "ไฟล์ที่อาจมี secret",
            prompt: "/caveman-compress .env",
            result: "ถูกปฏิเสธก่อนอ่านไฟล์ เพราะชื่อเข้าข่าย secret"
          }
        ],
        cautions: [
          "ข้อความทั้งไฟล์ถูกส่งไปยัง model provider ที่ตั้งค่าไว้ อย่าบีบไฟล์ที่ provider ไม่ควรเห็น",
          "ต้องระบุ filepath ชัดเจน ถ้าผู้ใช้วางข้อความมาเฉย ๆ ให้ถามหา path ไม่ควรบีบ inline",
          "ถ้าซ่อมสองครั้งแล้วยังไม่ผ่าน ระบบจะรายงาน error และไม่แตะไฟล์ต้นฉบับ"
        ],
        refs: [skillDoc("caveman-compress"), readme("Smaller rocks", "smaller-rocks")],
        sourcePath: "skills/caveman-compress/SKILL.md"
      },

      /* ---------- cli · 10 คำสั่งเทอร์มินัล ---------- */
      {
        id: "cli-status",
        cat: "cli",
        type: "cli",
        name: "caveman status",
        summary: "บอกว่าอะไรเปิดอยู่ เอเจนต์ไหนถูกแตะ และขั้นถัดไปหนึ่งอย่าง",
        overview: "เป็นคำสั่งตรวจสภาพที่อ่านสวิตช์ทั้งหกและ routing ที่ติดตั้งไว้ แล้วสรุปสั้น ๆ พร้อมข้อเสนอขั้นถัดไปเพียงข้อเดียว ใช้เมื่อไม่แน่ใจว่าตอนนี้เปิดอะไรไว้ หรือทำไมเอเจนต์ตัวหนึ่งยังไม่เปลี่ยนเสียง",
        invoke: [
          { label: "ตรวจสถานะ", code: "caveman status" }
        ],
        examples: [
          {
            title: "ตรวจหลังติดตั้ง",
            prompt: "caveman status",
            result: "รายการสวิตช์ที่เปิด เอเจนต์ที่ถูกแตะ และขั้นถัดไปหนึ่งข้อ"
          },
          {
            title: "สงสัยว่าปิดอะไรไว้",
            prompt: "ทำไม caveman ไม่ทำงานใน Claude Code",
            result: "สถานะชี้ว่าสวิตช์หรือ agent ใดไม่ได้ถูกแตะ"
          },
          {
            title: "ก่อนเปิด Auto",
            prompt: "Auto เปิดอยู่หรือยัง",
            result: "สถานะบอกว่าต้อง login ก่อนหรือพร้อมใช้แล้ว"
          }
        ],
        cautions: [
          "สถานะไม่ใช่การวัดผลประหยัด ใช้ `caveman stats` สำหรับ token",
          "คำสั่งอ่านค่าที่ติดตั้งไว้ ไม่ได้แก้ไขอะไร"
        ],
        refs: [readme("Commands", "commands")],
        sourcePath: "README.md"
      },
      {
        id: "cli-on-off",
        cat: "cli",
        type: "cli",
        name: "caveman on / caveman off",
        summary: "สลับสวิตช์ทีละตัว: output · input · waste-fixes · routing · scripts · browse",
        overview: "แต่ละก้อนของ caveman มีสวิตช์ของตัวเองและเปิดทั้งหมดหลังติดตั้ง `caveman on <name>` เปิด และ `caveman off <name>` ปิดเฉพาะก้อนนั้น ก้อนอื่นยังทำงานตามเดิม ชื่อที่รับมีหกชื่อ: output, input, waste-fixes, routing, scripts และ browse",
        invoke: [
          { label: "เปิด / ปิดทีละก้อน", code: "caveman on browse\ncaveman off browse" }
        ],
        examples: [
          {
            title: "ปิด browse",
            prompt: "caveman off browse",
            result: "เอเจนต์เลิกดึงหน้าเว็บแบบบีบอัด สวิตช์อื่นยังเปิด"
          },
          {
            title: "ปิด routing เพราะไม่อยากส่งข้อมูล",
            prompt: "caveman off routing",
            result: "Auto หยุดทำงานและไม่มีการส่งคำขอให้ Caveman Cloud จัดเส้นทาง"
          },
          {
            title: "เปิดกลับ",
            prompt: "caveman on input",
            result: "การบีบสิ่งที่เอเจนต์อ่านกลับมาทำงาน"
          }
        ],
        cautions: [
          "ชื่อสวิตช์ต้องเป็นหนึ่งในหกชื่อนี้ สะกดผิดจะไม่เปลี่ยนอะไร",
          "ปิด routing ทำให้ Auto หายจาก picker จนกว่าจะเปิดใหม่"
        ],
        refs: [readme("Six rocks", "six-rocks-one-install")],
        sourcePath: "README.md"
      },
      {
        id: "cli-learn",
        cat: "cli",
        type: "cli",
        name: "caveman learn",
        summary: "จัดอันดับว่า token ไปไหนจากประวัติในเครื่อง และแก้ทีละ diff เมื่ออนุมัติ",
        overview: "อ่านประวัติเอเจนต์ที่มีอยู่บนดิสก์แล้วจัดอันดับ sink ของ token `caveman learn` แสดงรายงาน ส่วน `caveman learn implement` ลงมือแก้ทีละจุดเมื่อผู้ใช้อนุมัติ การวัดกับการแก้แยกจากกัน จึงตรวจผลได้ว่าหลังแก้ token ต่อ turn ลดลงจริง",
        invoke: [
          { label: "ดูรายงาน", code: "caveman learn" },
          { label: "แก้ทีละจุด", code: "caveman learn implement" },
          { label: "รายงานแบบเครื่องอ่าน", code: "caveman learn report --json" }
        ],
        examples: [
          {
            title: "ดูรายงาน",
            prompt: "caveman learn",
            result: "อันดับ sink ที่กิน token มากที่สุดจากประวัติในเครื่อง"
          },
          {
            title: "แก้ทีละจุด",
            prompt: "caveman learn implement",
            result: "ข้อเสนอทีละ diff และรออนุมัติก่อนเขียน"
          },
          {
            title: "รายงานแบบ JSON",
            prompt: "caveman learn report --json",
            result: "JSON `caveman.learn.v1` พร้อม Cave Score และ sink"
          }
        ],
        cautions: [
          "spend ในรายงานคือต้นทุนของหน้าต่างที่สแกน ไม่ใช่ผลตอบแทนของ fix",
          "ห้ามเก็บ edit ที่ไม่ได้ทำให้ token ต่อ turn ลดลง",
          "ห้ามคูณตัวเลขหน้าต่างที่สแกนเป็นรายเดือนหรือรายปี"
        ],
        refs: [readme("Smaller rocks", "smaller-rocks"), skillDoc("caveman-learn")],
        sourcePath: "README.md"
      },
      {
        id: "cli-stats",
        cat: "cli",
        type: "cli",
        name: "caveman stats",
        summary: "ประวัติ token ของคุณ และทุกครั้งที่ warm cache ทำงาน",
        overview: "แสดงประวัติการใช้ token จากเซสชันที่บันทึกไว้ รวมถึงรายการ warm cache ที่ทำงานระหว่างพัก ใช้ตรวจว่าการตั้งค่าปัจจุบันให้ผลอย่างไรกับงานจริงของคุณ ตัวเลขเป็นสิ่งที่บันทึกไว้ ไม่ใช่การประมาณการประหยัด",
        invoke: [
          { label: "ดูประวัติ", code: "caveman stats" }
        ],
        examples: [
          {
            title: "ดูประวัติ",
            prompt: "caveman stats",
            result: "ประวัติ token และรายการ warm cache"
          },
          {
            title: "ตรวจหลังปิดสวิตช์",
            prompt: "caveman stats",
            result: "เทียบช่วงก่อนและหลังปิดสวิตช์จากข้อมูลที่บันทึกไว้"
          },
          {
            title: "ตรวจ warm cache",
            prompt: "caveman stats",
            result: "ทุกครั้งที่ warm ทำงานถูกระบุพร้อมเวลา"
          }
        ],
        cautions: [
          "ตัวเลขเป็น usage ที่บันทึกไว้ ไม่ได้พิสูจน์การประหยัดถ้าไม่มีคู่เทียบ",
          "ประวัติ lifetime ใช้ได้เฉพาะ Claude Code"
        ],
        refs: [readme("Smaller rocks", "smaller-rocks")],
        sourcePath: "README.md"
      },
      {
        id: "cli-doctor",
        cat: "cli",
        type: "cli",
        name: "caveman doctor",
        summary: "รายงานปัญหาหนึ่งบรรทัดต่อหนึ่งอย่าง พร้อมวิธีแก้",
        overview: "ตรวจการติดตั้งและความเข้ากันได้ แล้วพิมพ์ปัญหาหนึ่งข้อต่อหนึ่งบรรทัดพร้อมทางแก้ ใช้เมื่อติดตั้งแล้วสวิตช์ไม่ทำงาน เอเจนต์ไม่ถูกตรวจพบ หรือ hook ไม่โหลด",
        invoke: [
          { label: "ตรวจการติดตั้ง", code: "caveman doctor" }
        ],
        examples: [
          {
            title: "ติดตั้งแล้วไม่ทำงาน",
            prompt: "caveman doctor",
            result: "รายการปัญหาและวิธีแก้ทีละบรรทัด"
          },
          {
            title: "ย้ายเครื่องแล้ว hook หาย",
            prompt: "caveman doctor",
            result: "ชี้ว่า node path หรือ hook ที่ติดตั้งไว้ไม่ตรง"
          },
          {
            title: "ตรวจหลังอัปเกรด",
            prompt: "caveman doctor",
            result: "ยืนยันว่าองค์ประกอบครบหรือระบุสิ่งที่ขาด"
          }
        ],
        cautions: [
          "อ่านทีละบรรทัดเพราะปัญหาหนึ่งข้ออาจทำให้ข้อถัดไปดูผิด",
          "ถ้า Node ไม่มีใน PATH ให้ติดตั้ง Node.js ก่อนแล้วรันซ้ำ"
        ],
        refs: [readme("Commands", "commands")],
        sourcePath: "README.md"
      },
      {
        id: "cli-login",
        cat: "cli",
        type: "cli",
        name: "caveman login",
        summary: "เปิดบัญชีฟรีเพื่อให้ Auto ปรากฏใน model picker",
        overview: "Auto เป็นก้อนเดียวที่ต้องมีบัญชี เมื่อ login แล้ว Auto จะเพิ่มเข้า model picker ของเอเจนต์ และ caveman จะเลือกโมเดลกับ effort ให้แต่ละคำขอ ถ้าไม่ login จะไม่มี Auto และไม่มีข้อมูลถูกส่งให้ Caveman Cloud",
        invoke: [
          { label: "เปิดบัญชี", code: "caveman login" },
          { label: "เพิ่มโมเดลให้ Auto", code: "caveman providers add openai" }
        ],
        examples: [
          {
            title: "เปิด Auto",
            prompt: "caveman login",
            result: "Auto ปรากฏใน model picker"
          },
          {
            title: "เพิ่มโมเดลให้ Auto",
            prompt: "caveman providers add openai",
            result: "Auto มีโมเดล OpenAI เพิ่มโดยใช้ key ของผู้ใช้"
          },
          {
            title: "หยุดใช้ Cloud",
            prompt: "caveman off routing",
            result: "หยุดส่งคำขอให้ Caveman Cloud จัดเส้นทาง"
          }
        ],
        cautions: [
          "การ login เป็นการเลือกใช้ Auto ไม่ได้เปิดการส่งข้อมูลของทั้งชุด",
          "คำขอที่ถูกจัดเส้นทางไปโมเดลของ Caveman Cloud จะผ่าน Cloud ทั้งก้อน",
          "`caveman providers cloud off` หยุดการใช้ key ของ project"
        ],
        refs: [readme("Auto", "auto-54-cheaper-same-score")],
        sourcePath: "README.md"
      },
      {
        id: "cli-trial",
        cat: "cli",
        type: "cli",
        name: "caveman trial -- claude",
        summary: "ทำ A/B เซสชันจริงบนงานของคุณเอง เพื่อเทียบก่อนและหลัง",
        overview: "รันคำสั่งที่ให้มาสองแบบบนงานจริงเพื่อให้เห็นผลกับบริบทของคุณ ไม่ใช่ตัวเลขจาก benchmark สาธารณะ ใช้เมื่ออยากรู้ว่าการตั้งค่าปัจจุบันช่วยงานประเภทที่ทำอยู่จริงหรือไม่",
        invoke: [
          { label: "ทดลองกับ Claude", code: "caveman trial -- claude" }
        ],
        examples: [
          {
            title: "เทียบ Claude",
            prompt: "caveman trial -- claude",
            result: "ได้ผลเทียบสองรอบบนงานเดียวกัน"
          },
          {
            title: "ลองกับงานจริง",
            prompt: "caveman trial -- claude",
            result: "ใช้เซสชันจริง ไม่ใช่ชุดทดสอบสังเคราะห์"
          },
          {
            title: "ตรวจก่อนเปลี่ยนค่าเริ่มต้น",
            prompt: "caveman trial -- claude",
            result: "มีข้อมูลของงานตัวเองก่อนตัดสินใจ"
          }
        ],
        cautions: [
          "ผลขึ้นกับงานที่รันหนึ่งครั้ง ไม่ใช่ค่ากลางของทุกงาน",
          "อย่าใช้ผลรอบเดียวสรุปว่าชุดนี้ประหยัดกว่าในทุกกรณี"
        ],
        refs: [readme("Commands", "commands")],
        sourcePath: "README.md"
      },
      {
        id: "cli-shrink",
        cat: "cli",
        type: "cli",
        name: "caveman shrink -- pnpm test",
        summary: "บีบ output ของคำสั่งที่รบกวนการอ่าน ก่อนส่งให้โมเดล",
        overview: "รันคำสั่งที่ให้มาแล้วย่อ output ที่มีสัญญาณน้อย เช่น test runner หรือ log ยาว ให้เหลือส่วนที่ต้องอ่าน ใช้เมื่อ output ปกติกิน context เกินสัดส่วนของข้อมูลจริง",
        invoke: [
          { label: "บีบ output ของ test", code: "caveman shrink -- pnpm test" }
        ],
        examples: [
          {
            title: "บีบ test output",
            prompt: "caveman shrink -- pnpm test",
            result: "เฉพาะส่วนที่ต้องอ่านถูกส่งต่อ"
          },
          {
            title: "output ยาวจาก test runner",
            prompt: "caveman shrink -- pnpm test",
            result: "output ถูกย่อโดยยังเห็น failure และ stack ที่ต้องอ่าน"
          },
          {
            title: "ตรวจก่อนใช้ตัดสินใจ",
            prompt: "caveman shrink -- pnpm test",
            result: "คำสั่งเดิมยังถูกเรียกใช้ ไม่ใช่การรันซ้ำคนละแบบ"
          }
        ],
        cautions: [
          "การบีบอาจตัดบริบทที่จำเป็น ตรวจผลก่อนใช้ตัดสินใจ",
          "ใช้กับ output ที่มี noise สูง ไม่ใช่ทุกคำสั่ง"
        ],
        refs: [readme("Commands", "commands")],
        sourcePath: "README.md"
      },
      {
        id: "cli-convert",
        cat: "cli",
        type: "cli",
        name: "caveman convert --dry-run",
        summary: "โหมด pixel: แปลง skill เป็นภาพที่โมเดลอ่าน ตรวจก่อนเขียนจริง",
        overview: "`caveman convert` แปลง skill ให้โมเดลอ่านเป็นภาพ (pixel mode) และ `--dry-run` แสดงสิ่งที่จะเกิดโดยยังไม่เขียนไฟล์ ใช้เมื่ออยากลด token ของ skill ที่โหลดบ่อยและยอมแลกกับความสามารถในการค้นข้อความ",
        invoke: [
          { label: "ดูก่อนแปลง", code: "caveman convert --dry-run" }
        ],
        examples: [
          {
            title: "ดูก่อนแปลง",
            prompt: "caveman convert --dry-run",
            result: "รายการไฟล์ที่จะถูกแปลง โดยยังไม่เขียน"
          },
          {
            title: "ยืนยันขอบเขตก่อนแปลง",
            prompt: "caveman convert --dry-run",
            result: "เห็นรายการ skill ที่จะถูกแปลงเป็นภาพก่อนเขียนจริง"
          },
          {
            title: "ตรวจเฉพาะ skill ที่โหลดบ่อย",
            prompt: "caveman convert --dry-run",
            result: "เห็นผลกระทบต่อ skill ที่โหลดบ่อยก่อนตัดสินใจ"
          }
        ],
        cautions: [
          "ข้อความในภาพค้นด้วย grep ไม่ได้ จึงไม่เหมาะกับ skill ที่ต้องอ้างคำสั่งเป๊ะ ๆ",
          "`--dry-run` ไม่เขียนไฟล์ แต่ก็ไม่ได้ยืนยันว่าโมเดลอ่านภาพได้ถูกทุกกรณี"
        ],
        refs: [readme("Commands", "commands")],
        sourcePath: "README.md"
      },
      {
        id: "cli-claude",
        cat: "cli",
        type: "cli",
        name: "caveman claude",
        summary: "เริ่มเอเจนต์บน caveman: codex · gemini · opencode · aider · kilo · qwen · hermes · openclaw · pi",
        overview: "เปิดเอเจนต์ตัวที่เลือกโดยให้ caveman ทำงานอยู่แล้วตั้งแต่เริ่มเซสชัน รายชื่อที่ README ระบุคือ codex, gemini, opencode, aider, kilo, qwen, hermes, openclaw และ pi ใช้เมื่อไม่อยากพิมพ์ `/caveman` เองในเซสชันใหม่",
        invoke: [
          { label: "เปิด Claude บน caveman", code: "caveman claude" }
        ],
        examples: [
          {
            title: "เปิดเซสชันใหม่",
            prompt: "caveman claude",
            result: "เซสชัน Claude Code ใหม่ทำงานบน caveman ตั้งแต่ต้น"
          },
          {
            title: "ไม่ต้องพิมพ์ซ้ำ",
            prompt: "caveman claude",
            result: "ไม่ต้องพิมพ์ `/caveman` อีกในเซสชันนั้น"
          },
          {
            title: "ตรวจว่าเอเจนต์ถูกแตะ",
            prompt: "caveman status",
            result: "ระบุว่าเอเจนต์ที่เพิ่งเปิดทำงานบน caveman"
          }
        ],
        cautions: [
          "ชื่อเอเจนต์ต้องเป็นตัวที่ README รองรับ",
          "ถ้าเปิด caveman ไว้แล้ว คำสั่งซ้ำไม่จำเป็น"
        ],
        refs: [readme("Commands", "commands")],
        sourcePath: "README.md"
      },

      /* ---------- proof · 4 ตัวเลข ---------- */
      {
        id: "proof-voice",
        cat: "proof",
        type: "concept",
        name: "63 → 20 token",
        summary: "คำตอบเดียวกันเรื่อง React re-render: ปกติ 63 token, /caveman 20, /ultracave 14, /megacave 13",
        overview: "ตารางใน README เทียบคำตอบเรื่อง inline object prop กับ React re-render ทั้งสี่แบบให้คำแนะนำเดียวกันคือห่อ prop ด้วย `useMemo` แต่ใช้ token ต่างกัน ตัวเลขวัดด้วย tiktoken o200k และเป็นผลของเสียง ไม่ใช่การเปลี่ยนความยาวโค้ด",
        cautions: [
          "นับด้วย tiktoken o200k ไม่ใช่ตัวนับของ provider ทุกเจ้า",
          "วัดบน rules 3.1.0 และยังไม่ได้วัดซ้ำ",
          "ถ้าจ่ายตาม request เช่น GitHub Copilot คำตอบสั้นลงไม่ได้ลดเงิน"
        ],
        refs: [readme("Say less", "say-less-the-caveman-voice")],
        sourcePath: "README.md"
      },
      {
        id: "proof-input",
        cat: "proof",
        type: "concept",
        name: "33.2% input น้อยลง",
        summary: "ทั้งเซสชัน 885,793 → 591,673 token และตอบถูก 18 จาก 18",
        overview: "รวมหกชนิดไฟล์ที่บีบ 130,611 → 22,994 token หรือ 82.4% ต่อไฟล์ ส่วนเซสชันเต็มลด 33.2% เพราะยังมี system prompt และ tool อยู่ งานวัดอ้าง 54 Claude Code runs และคำตอบถูก 18 จาก 18",
        cautions: [
          "ตัวเลขเซสชันมาจาก run เดือน ส.ค. 2026 บน engine รุ่นเก่า",
          "HTML ยังไม่มีตัวบีบ จึงแย่ลง 9.9%",
          "แต่ละไฟล์ทดสอบซ่อนหนึ่ง record ใน noise 61-72 KB ผลจริงจึงต่าง"
        ],
        refs: [readme("Read less", "read-less-332-fewer-input-tokens")],
        sourcePath: "README.md"
      },
      {
        id: "proof-auto",
        cat: "proof",
        type: "concept",
        name: "54% ถูกกว่า",
        summary: "Auto 43.7% ด้วย $3.59 ต่อครั้ง เทียบ Opus 5.5 ที่ xhigh 44.3% และ $7.83 บน 85 งาน",
        overview: "Auto ใช้ 0.46 เท่าของต้นทุน Opus 5.5 ที่ xhigh และใช้เวลามัธยฐาน 15.9 นาที เทียบ 35.2 นาที บน 85 งานเขียนโค้ดจริงจาก SWE-Interact และ SWE-Together หนึ่งครั้งต่องาน ตัวเลขนี้เป็น interim เพราะ run ยังทำเสร็จครึ่งเดียว",
        cautions: [
          "ช่องว่าง 0.5 จุดเล็กกว่าความคลาดเคลื่อน ±7 จึงยังแยกสองแบบไม่ออก",
          "ส่วนใหญ่ของการประหยัดมาจากการลด effort ในงานง่าย ถ้าใช้ Opus ที่ medium อยู่แล้วผลจะน้อยกว่านี้และยังไม่ได้วัด",
          "แถวที่เพิ่ม OpenAI และโมเดลเปิดได้ 42.9% ด้วย $3.47 ไม่ใช่ค่าที่ใช้สรุป 54%"
        ],
        refs: [readme("Auto", "auto-54-cheaper-same-score")],
        sourcePath: "README.md"
      },
      {
        id: "proof-blocks",
        cat: "proof",
        type: "concept",
        name: "397 → 76 token",
        summary: "หนึ่งการรัน go test 326 เทส: raw 10,561, | tail -20 397, block 76",
        overview: "ตาราง Blocks เทียบ token ที่เอเจนต์อ่านกลับในสามวิธี สำหรับ `go test -v ./...` ที่มี 326 เทส วิธีที่เอเจนต์พิมพ์อยู่ตอนนี้คือ `| tail -20` ใช้ 397 token ส่วน block `test-summary` ใช้ 76 token ตารางเดียวกันยังมีแถวที่ block แพ้ เช่น `grep-defs` 489 token เทียบ grep ธรรมดา 250 token",
        cautions: [
          "block ชนะเฉพาะงานที่ทำซ้ำและมีรูปแบบคงที่ ไม่ใช่ทุกคำสั่ง",
          "`grep-defs` แพ้ grep ธรรมดา และ README เก็บแถวนั้นไว้เป็นผลลบ",
          "Blocks ยังเป็น pre-release v0.1.0-rc.5 ใช้ได้เฉพาะ Python และยังไม่มี sandbox"
        ],
        refs: [readme("Blocks", "blocks-code-mode-script-written-once")],
        sourcePath: "README.md"
      }
    ],
    idKey: "id",
    filters: "static",
    unit: "รายการ",
    flow: [
      { id: "all", label: "ทั้งหมด" },
      { id: "toggle", label: "ก้อนหลัก/ส่วนเสริม" },
      { id: "rule", label: "กฎการเขียน" },
      { id: "command", label: "คำสั่ง" },
      { id: "skill", label: "สกิล" },
      { id: "cli", label: "CLI" },
      { id: "proof", label: "ตัวเลข" }
    ],
    catLabel: {
      toggle: "ก้อนหลัก/ส่วนเสริม",
      rule: "กฎการเขียน",
      command: "คำสั่ง",
      skill: "สกิล",
      cli: "CLI",
      proof: "ตัวเลข"
    },
    collection: {
      repo: REPO,
      version: "4.0.1",
      license: "Apache-2.0",
      verifiedAt: "2026-10-23"
    }
  };
})();
