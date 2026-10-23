/* Page module: agent-skills-docs. Verified against addyosmani/agent-skills 0.6.13 (2026-10-23). */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  var REPO = "https://github.com/addyosmani/agent-skills";

  function skillInvoke(id) {
    return [
      { label: "OpenCode / skill tool", code: 'skill("' + id + '")' },
      { label: "Claude Code TUI", code: "/" + id },
      { label: "Codex", code: "@" + id }
    ];
  }

  function skillRef(id) {
    return [{ label: "SKILL.md บน GitHub", href: REPO + "/blob/main/skills/" + id + "/SKILL.md" }];
  }

  function commandRef(name) {
    return [{ label: "คำสั่งบน GitHub", href: REPO + "/blob/main/.claude/commands/" + name + ".md" }];
  }

  function agentRef(name) {
    return [{ label: "persona บน GitHub", href: REPO + "/blob/main/agents/" + name + ".md" }];
  }

  var skills = [
    ["using-agent-skills", "meta", "สกิลแม่ที่ช่วยเลือก workflow ให้ตรงเฟสของงานก่อนลงมือ", "จับคู่งานกับเฟสพัฒนาและโหลด skill ที่ตรงที่สุด ใช้เมื่อเริ่มเซสชันหรือไม่แน่ใจว่าควรเริ่มจากอะไร", ["ทุกเซสชันใหม่", "งานที่คร่อมหลายเฟส"], [
      ["เริ่มงานใหม่", "มีฟีเจอร์ใหม่ที่ยังไม่มีสเปก ควรเริ่มจาก skill ไหน", "agent เลือก spec-driven-development หรือ interview-me ก่อน"],
      ["งานที่ดูเหมือนแก้บั๊ก", "ผู้ใช้บอกว่าปุ่มไม่ทำงาน ควรใช้ workflow อะไร", "agent แยก debugging ออกจาก frontend testing ตามหลักฐาน"],
      ["งานหลายส่วน", "ต้องทำ API และ UI พร้อมกัน ควรเรียง skill อย่างไร", "agent เสนอลำดับ spec → plan → build → review"]
    ], ["ไม่ใช่คำสั่งตายตัว ให้เลือกตามบริบทของงาน", "ถ้าเลือกแล้วยังไม่ชัด ให้ถามผู้ใช้ก่อนเริ่ม"]],
    ["interview-me", "define", "สัมภาษณ์ทีละคำถามเพื่อหาสิ่งที่ผู้ใช้ต้องการจริง ๆ ก่อนมีสเปก", "ใช้เมื่อคำขอยังคลุมเครือ เช่น \"ทำ dashboard\" โดยไม่รู้ว่าสำหรับใครและเพื่ออะไร ถามทีละข้อจนมั่นใจประมาณ 95% แล้วจึงสรุปความต้องการ", ["คำขอสั้นและกำกวม", "ยังไม่มีสเปกหรือแผน"], [
      ["คำขอกว้าง", "ช่วยทำระบบแจ้งเตือนให้หน่อย", "agent ถามผู้ใช้ เป้าหมาย และช่องทางก่อนเสนอทางเลือก"],
      ["ตรวจความเข้าใจ", "ฉันอยากให้เว็บเร็วขึ้น", "agent ถามตัวเลขเป้าหมายและหน้าที่ยุ่งที่สุด"],
      ["ก่อนเขียนสเปก", "ช่วยสัมภาษณ์ฉันเรื่องฟีเจอร์ค้นหา", "ได้สรุปความต้องการที่ใช้เขียนสเปกต่อได้"]
    ], ["อย่าถามหลายคำถามพร้อมกัน", "ถ้าผู้ใช้ตอบไม่ได้ ให้เสนอทางเลือกพร้อมผลกระทบ"]],
    ["idea-refine", "define", "ขยายและคัดไอเดียด้วยการคิดแบบ divergent แล้ว convergent", "ใช้เมื่อมีไอเดียตั้งต้นแต่ยังไม่คม ช่วยแตกทางเลือกหลายทาง ตรวจสมมติฐาน แล้วเลือกทิศทางที่คุ้มที่สุดก่อนทำแผน", ["มีไอเดียแต่ยังไม่ชัด", "ต้องเปรียบเทียบหลายทางเลือก"], [
      ["ขยายทางเลือก", "ช่วย refine ไอเดียแอปจดค่าใช้จ่ายสำหรับ freelancer", "ได้ทางเลือกหลายแบบพร้อมเกณฑ์ตัดสิน"],
      ["ทดสอบสมมติฐาน", "สมมติฐานว่า user อยากได้ widget บนมือถือฟังขึ้นไหม", "agent ระบุสมมติฐานที่ต้องพิสูจน์ก่อนลงทุน"],
      ["เลือกทิศทาง", "มี 5 ไอเดียสำหรับ onboarding ช่วยเลือกหนึ่ง", "ได้ข้อเสนอพร้อมเหตุผลและความเสี่ยง"]
    ], ["ไม่ใช่เครื่องมือเลือกสิ่งที่ไม่รู้เลยว่าต้องการอะไร ใช้ interview-me แทน", "อย่าจบที่รายการไอเดีย ต้องมีข้อสรุป"]],
    ["spec-driven-development", "define", "เขียนสเปกที่มีโครงสร้างก่อนเขียนโค้ด เพื่อให้ทุกคนเห็นภาพเดียวกัน", "ใช้เมื่อเริ่มโปรเจกต์ ฟีเจอร์ หรือการเปลี่ยนแปลงที่มีความเสี่ยง สเปกระบุเป้าหมาย ขอบเขต เกณฑ์สำเร็จ และสิ่งที่ไม่ทำ เพื่อใช้เป็นแหล่งความจริงร่วม", ["ยังไม่มีสเปก", "งานแตะหลายไฟล์หรือหลายทีม"], [
      ["ฟีเจอร์ใหม่", "เขียนสเปกสำหรับระบบ export รายงาน", "ได้เอกสารที่มีเป้าหมาย ขอบเขต และเกณฑ์ตรวจ"],
      ["งานกำกวม", "ช่วยทำ spec จากโจทย์ย้าย auth ไป service ใหม่", "สเปกแยกสิ่งที่อยู่ในและนอกขอบเขตชัดเจน"],
      ["ก่อนวางแผน", "มีสเปกคร่าว ๆ แล้ว ช่วยจัดโครงให้ตรวจได้", "ได้สเปกที่พร้อมแตกเป็น task"]
    ], ["สเปกที่ไม่ระบุสิ่งที่ไม่ทำจะขยายขอบเขตไม่จบ", "อย่าเริ่มโค้ดก่อนสเปกได้รับการยืนยัน"]],
    ["constraint-driven-development", "define", "กำหนด quality bar เป็นสัญญาที่เขียนไว้และตรวจได้", "ใช้เมื่อโปรเจกต์ยังไม่มีมาตรฐานที่เป็นตัวเลข หรือเมื่อ agent ชอบปิด warning และข้ามเทสเพื่อให้ผ่าน ช่วยเลือกมิติที่สำคัญ ตั้งเกณฑ์ และบันทึกใน CONSTRAINTS.md", ["ยังไม่มี CONSTRAINTS.md", "มีปัญหาการลดมาตรฐานเพื่อให้ผ่าน"], [
      ["ตั้งมาตรฐาน", "ตั้ง constraints เรื่อง accessibility และ coverage ให้โปรเจกต์นี้", "ได้ CONSTRAINTS.md พร้อมเกณฑ์ที่วัดได้"],
      ["เจอการข้ามเทส", "agent เพิ่ม skip test เพื่อให้ CI เขียว ควรทำอย่างไร", "agent ตั้งกฎห้ามและเพิ่มตัวตรวจ"],
      ["เลือกตัวเลข", "ควรตั้ง coverage ขั้นต่ำเท่าไร", "ได้ข้อเสนอพร้อมเหตุผลและทางเลือก"]
    ], ["เกณฑ์ต้องวัดได้ ไม่ใช่คำคุณศัพท์", "อย่าตั้งเกณฑ์ที่ทีมไม่ได้ตกลง"]],
    ["planning-and-task-breakdown", "plan", "แตกสเปกเป็น task เล็กที่ทำเสร็จและตรวจได้ทีละอัน", "ใช้เมื่อมีสเปกหรือข้อกำหนดชัดแล้ว แต่ยังไม่รู้ลำดับงาน แตกเป็น vertical slice พร้อมเกณฑ์ยอมรับ คำสั่งตรวจ และ dependency", ["มีสเปกที่อนุมัติแล้ว", "งานใหญ่หรือต้องทำขนาน"], [
      ["แตกแผน", "แตกสเปก export เป็น task ที่ทำเสร็จได้ทีละอัน", "ได้รายการ task พร้อมเกณฑ์ยอมรับ"],
      ["จัดลำดับ", "งาน auth กับ billing ควรทำอะไรก่อน", "ได้ dependency graph และลำดับที่ปลอดภัย"],
      ["งานขนาน", "แบ่งงานให้สอง agent ทำพร้อมกันได้ไหม", "agent แยก task ที่ไม่แชร์ไฟล์"]
    ], ["task ที่ตรวจไม่ได้ยังไม่ใช่ task", "อย่าแบ่งตาม layer ถ้าตัดผ่าน vertical slice ได้"]],
    ["incremental-implementation", "build", "ส่งงานเป็นชิ้นเล็กที่ทำงานได้และตรวจได้ทีละชิ้น", "ใช้กับงานที่แตะหลายไฟล์หรือ task จากแผน แต่ละ increment ต้องทิ้งระบบไว้ในสภาพที่รันและทดสอบได้ ลดความเสี่ยงจากการเขียนโค้ดก้อนใหญ่ครั้งเดียว", ["มีแผนหรือ task ชัด", "มีคำสั่งรันเทส"], [
      ["ฟีเจอร์ใหญ่", "ทำระบบ export ทีละส่วนโดยไม่ให้ main พัง", "แต่ละรอบมีโค้ดที่รันได้และ commit แยก"],
      ["refactor", "ย้ายโมดูล auth ทีละขั้น", "ทำทีละจุดพร้อมเทสก่อนไปต่อ"],
      ["feature flag", "ปล่อยฟีเจอร์ใหม่แบบเปิดเฉพาะทีม", "มี flag และทางปิดที่ทดสอบแล้ว"]
    ], ["อย่าเขียนเกินประมาณ 100 บรรทัดก่อนรันเทส", "ทุก increment ต้องไม่ทิ้งระบบในสภาพพัง"]],
    ["test-driven-development", "build", "เขียนเทสที่ fail ก่อน แล้วเขียนโค้ดให้น้อยที่สุดจนผ่าน", "วงจร red-green-refactor สำหรับฟีเจอร์และบั๊ก ใช้เทสเป็นหลักฐานพฤติกรรม และใช้ Prove-It pattern สำหรับ bug ที่ต้อง reproduce ก่อนแก้", ["มีคำสั่งรันเทส", "รู้พฤติกรรมที่ต้องการ"], [
      ["ฟีเจอร์", "เพิ่มส่วนลดตามคูปองแบบ TDD", "เห็นเทสแดงก่อนแล้วจึงเขียว"],
      ["บั๊ก", "export CSV แล้วหัวคอลัมน์หาย ช่วยแก้แบบมีเทส", "มี reproduction test ก่อน patch"],
      ["เปลี่ยนพฤติกรรม", "เปลี่ยนรูปแบบวันที่ใน API อย่างปลอดภัย", "เทสเดิมและใหม่ครอบคลุมเคสเดิม"]
    ], ["ห้ามเขียนเทสตามหลังโค้ดแล้วเรียกว่า TDD", "ถ้าเทสไม่เคย fail ให้ตรวจว่ามันวัดสิ่งที่ต้องการจริง"]],
    ["context-engineering", "build", "จัดบริบทและ rules file ให้ agent เห็นข้อมูลที่ถูกต้องและพอดี", "ใช้เมื่อเริ่มเซสชันใหม่ คุณภาพคำตอบลดลง หรือ agent ไม่ทำตาม convention ช่วยจัดลำดับข้อมูลใน AGENTS.md/CLAUDE.md และลดบริบทที่ไม่เกี่ยว", ["มี rules file หรือเอกสารโปรเจกต์", "เห็นอาการ agent หลงบริบท"], [
      ["เซสชันใหม่", "ช่วยจัด AGENTS.md ให้ agent ทำงานกับ repo นี้ได้", "ได้ rules file ที่กระชับและตรงงาน"],
      ["คุณภาพตก", "agent เริ่มใช้ API เก่า ช่วยปรับบริบท", "agent ระบุข้อมูลที่ขาดและเพิ่มเอกสาร ล่าสุด"],
      ["สลับงาน", "จะย้ายจาก frontend ไป backend ต้องโหลดบริบทอะไร", "ได้รายการไฟล์และข้อกำหนดที่ต้องอ่าน"]
    ], ["บริบทมากเกินไปทำให้โฟกัสลดลง", "อย่าใส่ข้อมูลลับหรือ token ลงใน rules file"]],
    ["source-driven-development", "build", "ยึดเอกสารทางการเป็นแหล่งอ้างอิงก่อนตัดสินใจเขียนโค้ด", "ใช้เมื่อสร้างโค้ดที่อิง framework หรือไลบรารี ซึ่ง API เปลี่ยนบ่อย agent ต้องตรวจเอกสารเวอร์ชันปัจจุบันและอ้างแหล่งให้ผู้ใช้ตรวจได้", ["รู้เวอร์ชันของ framework", "เข้าถึงเอกสารทางการได้"], [
      ["Next.js", "เขียน middleware สำหรับ auth ตามเอกสาร Next.js เวอร์ชันนี้", "ได้โค้ดพร้อมลิงก์เอกสาร"],
      ["API ใหม่", "ใช้ fetch ของ React 19 อย่างไรให้ถูก", "agent ตรวจ docs ก่อนเขียน"],
      ["ตรวจโค้ดเก่า", "โค้ดนี้ใช้ pattern ที่เลิกใช้แล้วหรือไม่", "ได้รายการจุดที่ต้องอัปเดตพร้อมแหล่งอ้างอิง"]
    ], ["อย่าอ้างจากความจำของโมเดล", "ถ้าเอกสารไม่ชัด ให้บอกว่าไม่ชัด ไม่เดา"]],
    ["doubt-driven-development", "build", "ให้ reviewer ที่มีบริบทใหม่พยายามหักล้างการตัดสินใจก่อนปล่อย", "ใช้กับการตัดสินใจที่ไม่ trivial โดยเฉพาะ auth, security, migration และสิ่งที่ย้อนยาก reviewer ถูก bias ให้พยายามพิสูจน์ว่าผิด ไม่ใช่เห็นด้วย", ["มีการตัดสินใจหรือแผนที่ชัด", "มีบริบทพอให้ reviewer ตรวจ"], [
      ["Auth", "ก่อนใช้ JWT ใน localStorage ช่วยหักล้างข้อเสนอนี้", "ได้รายการความเสี่ยงและทางเลือก"],
      ["Migration", "แผนย้ายฐานข้อมูลนี้มีอะไรพังได้บ้าง", "reviewer ชี้ failure mode ที่ยังไม่ถูกทดสอบ"],
      ["สถาปัตยกรรม", "ช่วยตรวจข้อเสนอย้าย state ไป server", "ได้คำถามที่ต้องตอบก่อนตัดสินใจ"]
    ], ["ไม่ใช่การรีวิวงานที่เสร็จแล้ว แต่ใช้ระหว่างทาง", "ต้องให้ reviewer เห็นบริบทจริง ไม่ใช่สรุปสั้นจนตรวจไม่ได้"]],
    ["frontend-ui-engineering", "build", "สร้าง UI คุณภาพ production ที่เข้าถึงได้และไม่ดูเป็นงาน AI", "ครอบคลุม design system, accessibility, responsive, state และ interaction ใช้เมื่อสร้างหรือแก้หน้าจอที่ผู้ใช้เห็นจริง", ["รู้ design system หรือแบรนด์", "มีเบราว์เซอร์สำหรับตรวจ"], [
      ["หน้าใหม่", "สร้างหน้า settings ที่รองรับ keyboard และ mobile", "ได้ markup ที่มี label และโฟกัสครบ"],
      ["แก้ UI", "ฟอร์มนี้ใช้งานยากบนมือถือ ช่วยปรับ", "ได้เลย์เอาต์และ interaction ที่ทดสอบแล้ว"],
      ["Component", "ทำ combobox ที่เข้าถึงได้", "มี ARIA และการนำทางด้วยคีย์บอร์ด"]
    ], ["อย่าใช้ div เป็นปุ่ม", "ตรวจ contrast และ focus state ทุกครั้ง"]],
    ["api-and-interface-design", "build", "ออกแบบ API และ interface ที่เสถียรและใช้งานยากที่จะใช้ผิด", "ใช้กับ REST, GraphQL, module boundary และ props ของ component เน้นสัญญาที่ชัด เวอร์ชัน และการเปลี่ยนที่ไม่มี breaking change", ["รู้ผู้ใช้ของ interface", "รู้ข้อจำกัดด้าน compatibility"], [
      ["REST", "ออกแบบ endpoint สำหรับ subscription", "ได้ schema, error model และตัวอย่าง"],
      ["Module", "แยกขอบเขต service ของ billing", "ได้ interface ที่ทดสอบแยกได้"],
      ["Component", "ออกแบบ props ของ DataTable", "ได้สัญญาที่ชัดและค่า default ที่ปลอดภัย"]
    ], ["อย่าเพิ่ม field โดยไม่คิดเรื่อง compatibility", "error contract สำคัญเท่า success contract"]],
    ["browser-testing-with-devtools", "verify", "ทดสอบในเบราว์เซอร์จริงผ่าน Chrome DevTools MCP", "ใช้เมื่อต้องเห็น DOM, console, network หรือ performance จาก runtime จริง แทนการเดาจากโค้ด ต้องตั้งค่า chrome-devtools MCP ก่อน", ["ติดตั้ง chrome-devtools MCP", "มี URL หรือไฟล์ที่เปิดในเบราว์เซอร์"], [
      ["ตรวจ UI", "เปิดหน้า checkout แล้วดูว่ามี console error ไหม", "ได้ error และ DOM ที่เกี่ยวข้อง"],
      ["Network", "คำขอนี้ช้าเพราะอะไร", "ได้ timing และ waterfall"],
      ["Performance", "วัด LCP ของหน้าแรก", "ได้ตัวเลขและองค์ประกอบที่ทำให้ช้า"]
    ], ["ถ้า MCP ไม่ได้ตั้งค่า จะใช้ความสามารถนี้ไม่ได้", "อย่าสรุปผลจาก screenshot อย่างเดียว ต้องอ่าน console/network"]],
    ["debugging-and-error-recovery", "verify", "หา root cause ของเทสพัง build พัง และ bug อย่างเป็นระบบ", "เริ่มจากเก็บหลักฐานและทำ triage ก่อนแก้ ใช้ได้กับ test failure, runtime error และ incident โดยแยกอาการออกจากสาเหตุ", ["มี error หรือ reproduction", "เข้าถึง log และคำสั่งที่ทำให้เกิด"], [
      ["เทสพัง", "เทส 3 ตัวพังหลัง merge ช่วยหา root cause", "ได้สาเหตุพร้อมหลักฐาน"],
      ["Build พัง", "build ล้มด้วย error นี้ ช่วยไล่", "agent ระบุขั้นที่พังและสิ่งที่เปลี่ยน"],
      ["Incident", "production คืน 500 หลัง deploy", "ได้สมมติฐานที่ตรวจสอบได้และจุด rollback"]
    ], ["ห้ามแก้ก่อนรู้สาเหตุ", "เก็บหลักฐานก่อนลบ log หรือ restart"]],
    ["code-review-and-quality", "review", "รีวิวโค้ดห้าแกนก่อน merge", "ตรวจ correctness, readability, architecture, security และ performance พร้อมเกณฑ์อนุมัติที่ชัด ใช้กับ PR และโค้ดที่ agent สร้าง", ["มี diff หรือ PR", "รู้ convention ของโปรเจกต์"], [
      ["ก่อน merge", "รีวิว PR นี้ทั้งห้าแกน", "ได้รายการปัญหาพร้อมระดับความรุนแรง"],
      ["โค้ดจาก agent", "ตรวจงานที่ agent เพิ่งเขียนว่าปลอดภัยไหม", "ได้ข้อสังเกตด้าน security และเทส"],
      ["Diff ยาว", "ช่วยรีวิว การเปลี่ยนแปลง นี้แบบเน้น regression", "ได้จุดเสี่ยงและเทสที่ขาด"]
    ], ["อย่าบล็อกเพราะสไตล์ส่วนตัว ถ้าโค้ดดีขึ้นและตาม convention ให้ผ่าน", "ทุก finding ควรมีตำแหน่งและเหตุผล"]],
    ["code-simplification", "review", "ลดความซับซ้อนโดยไม่เปลี่ยนพฤติกรรม", "ใช้เมื่อโค้ดทำงานได้แต่ยากเกินจำเป็น เกณฑ์คือคนใหม่เข้าใจเร็วขึ้นไหม ไม่ใช่จำนวนบรรทัดลดลง", ["มีเทสครอบพฤติกรรมเดิม", "ระบุขอบเขตที่จะ simplify"], [
      ["ฟังก์ชันยาว", "ช่วย simplify ฟังก์ชันนี้โดยพฤติกรรมไม่เปลี่ยน", "ได้โค้ดที่อ่านง่ายขึ้นและเทสยังผ่าน"],
      ["ซ้อนลึก", "ลด nesting ในตัวจัดการคำสั่งนี้", "ได้โครงที่แบนขึ้นโดยไม่เพิ่มความเสี่ยง"],
      ["ตั้งชื่อ", "ชื่อตัวแปรชุดนี้สื่อไม่ชัด ช่วยปรับ", "ได้ชื่อที่ตรงความหมายขึ้น"]
    ], ["อย่า refactor เกินขอบเขตงาน", "ถ้าไม่มีเทส ให้เพิ่มก่อนหรือหยุด"]],
    ["security-and-hardening", "review", "ป้องกันช่องโหว่ตั้งแต่ input จนถึง dependency", "ใช้กับทุกฟีเจอร์ที่รับข้อมูลผู้ใช้ จัดการ session หรือเรียกบริการภายนอก ครอบคลุม OWASP, secrets, authz และ supply chain", ["รู้จุดที่รับ input", "เข้าถึง dependency และ config"], [
      ["Login", "ตรวจ flow ล็อกอินนี้เทียบ OWASP Top Ten", "ได้รายการความเสี่ยงและวิธีแก้"],
      ["อัปโหลดไฟล์", "ตรวจการอัปโหลดว่ารับไฟล์อันตรายได้ไหม", "ได้ข้อจำกัด type, size และ storage"],
      ["Dependency", "มีช่องโหว่ใน package นี้ไหม", "ได้ผล audit และทางเลือกในการอัปเกรด"]
    ], ["อย่าเก็บ secret ในโค้ดหรือ log", "ทุก endpoint ต้องตรวจ authorization ไม่ใช่แค่ authentication"]],
    ["performance-optimization", "review", "วัดก่อนเพิ่มประสิทธิภาพ แล้วแก้เฉพาะคอขวดที่พิสูจน์ได้", "ครอบคลุม frontend, backend, query และฐานข้อมูล เริ่มจาก profiling และตัวเลขจริง ไม่ใช่ premature optimization", ["มีตัวชี้วัดหรือ profiling", "มี environment ที่วัดซ้ำได้"], [
      ["หน้าเว็บช้า", "หน้า dashboard โหลดช้า ช่วยหาคอขวด", "ได้ตัวเลขและจุดที่ควรแก้"],
      ["N+1", "API นี้ยิง query เยอะผิดปกติ ช่วยตรวจ", "ได้หลักฐานและวิธีลด query"],
      ["Regress", "หลังเปลี่ยน ORM เวลาตอบเพิ่ม ช่วยวัด", "ได้ comparison ก่อน/หลัง"]
    ], ["อย่าปรับก่อนวัด", "วัดซ้ำหลังแก้ทุกครั้ง"]],
    ["git-workflow-and-versioning", "ship", "จัดการ commit, branch, PR และ release อย่างเป็นระบบ", "ใช้ทุกครั้งที่แก้โค้ด ครอบคลุม atomic commit, trunk-based development, conflict, semantic version และ changelog", ["อยู่ใน git repository", "รู้ remote และ branch หลัก"], [
      ["Commit", "แยกการแก้ใน working tree เป็น commit ที่มีความหมาย", "ได้ commit ย่อยที่ review ง่าย"],
      ["PR", "เขียน PR body จาก diff นี้", "ได้สรุป การเปลี่ยนแปลง และวิธีทดสอบ"],
      ["Release", "ตัดเวอร์ชันสำหรับ การเปลี่ยนแปลง นี้", "ได้เลข semantic version และ changelog"]
    ], ["อย่า commit งานหลายเรื่องปนกัน", "อย่า force push บน branch ที่คนอื่นใช้"]],
    ["ci-cd-and-automation", "ship", "ตั้ง quality gate ใน CI ให้ทุก การเปลี่ยนแปลงผ่านตรวจเดียวกัน", "ใช้เมื่อสร้างหรือแก้ pipeline ครอบคลุม lint, typecheck, test, build และ staged deploy โดยจับปัญหาตั้งแต่เนิ่น ๆ", ["มี repository และ CI provider", "รู้คำสั่ง build/test"], [
      ["Pipeline ใหม่", "ตั้ง CI สำหรับ repo นี้ให้รัน lint test build", "ได้ workflow ที่ fail ถูกจุด"],
      ["Deploy", "ทำ staged rollout พร้อม rollback", "ได้ขั้นตอนและเงื่อนไขหยุด"],
      ["Flaky", "เทสใน CI พังบ้างไม่พังบ้าง ช่วย stabilize", "ได้สาเหตุและแนวทางแก้"]
    ], ["อย่าข้าม gate เพื่อให้ merge ได้", "secrets ต้องมาจาก secret store ไม่ใช่ไฟล์"]],
    ["deprecation-and-migration", "ship", "เลิกใช้ของเก่าและย้ายผู้ใช้อย่างปลอดภัย", "ใช้เมื่อลบ API/ระบบหรือเปลี่ยน schema โดยไม่ทำให้ผู้ใช้พัง ครอบคลุม expand/contract, การสื่อสาร และ rollback", ["รู้ผู้ใช้ของสิ่งที่จะเลิก", "มีแผน rollback"], [
      ["ลบ API", "วางแผนเลิกใช้ endpoint v1", "ได้ช่วงเปลี่ยนและเกณฑ์ปิด v1"],
      ["Schema", "เปลี่ยนชื่อคอลัมน์โดยไม่มี downtime", "ได้ขั้น expand/contract"],
      ["รวมระบบ", "ย้ายลูกค้าจาก service เก่าไปใหม่", "ได้ลำดับและวิธีตรวจ"]
    ], ["อย่าลบก่อนมีหลักฐานว่าไม่มีผู้ใช้", "ทุกขั้นต้องย้อนกลับได้"]],
    ["documentation-and-adrs", "ship", "บันทึกการตัดสินใจและบริบทที่โค้ดบอกไม่ได้", "ใช้เมื่อมีการตัดสินใจสถาปัตยกรรม เปลี่ยน public API หรือส่งฟีเจอร์ ADR เก็บเหตุผล ทางเลือก และผลกระทบสำหรับคนและ agent รุ่นต่อไป", ["มีการตัดสินใจที่ควรบันทึก", "รู้ทางเลือกที่พิจารณา"], [
      ["ADR", "เขียน ADR สำหรับการเลือก queue นี้", "ได้เอกสารที่มีบริบทและผลกระทบ"],
      ["Public API", "อัปเดตเอกสารเมื่อเปลี่ยน response shape", "ได้ changelog และตัวอย่างใหม่"],
      ["Onboarding", "เขียนเอกสารให้ agent ใหม่เข้าใจ repo", "ได้คู่มือที่อ้างไฟล์จริง"]
    ], ["อย่าเขียนแค่สิ่งที่ทำ ต้องเขียนว่าทำไม", "ADR เก่าไม่ต้องแก้ย้อนหลัง ให้เขียนอันใหม่แทน"]],
    ["observability-and-instrumentation", "ship", "ใส่ log, metric, trace และ alert ตั้งแต่เขียนฟีเจอร์", "ใช้กับทุกอย่างที่รันบน production เพื่อให้ตอบได้ว่าระบบทำอะไรอยู่ ถ้าไม่มี telemetry ปัญหาจากผู้ใช้จะกลายเป็นการไล่เดา", ["รู้ระบบเก็บ log/metric", "รู้คำถามที่ต้องตอบเวลาเกิดเหตุ"], [
      ["ฟีเจอร์ใหม่", "เพิ่ม logging และ metric ให้ endpoint นี้", "ได้ข้อมูลพอ debug โดยไม่หลุด PII"],
      ["Incident", "เหตุการณ์นี้ควรมี alert อะไร", "ได้เงื่อนไข alert และ runbook"],
      ["ตรวจ PR", "PR นี้เพิ่ม retry ควรมี telemetry อะไร", "ได้จุดวัดที่ครอบคลุม"]
    ], ["อย่า log ข้อมูลส่วนตัวหรือ token", "alert ที่ไม่มีคนรับผิดชอบคือ noise"]],
    ["shipping-and-launch", "ship", "เตรียมปล่อย production พร้อม monitoring และ rollback", "ใช้ก่อน deploy ครั้งสำคัญ ครอบคลุม checklist, staged rollout, success metric และแผนถอยกลับ เป้าหมายคือปล่อยอย่างย้อนได้และสังเกตได้", ["มี build ที่พร้อม deploy", "รู้ owner และช่องทางแจ้งเหตุ"], [
      ["Launch", "เตรียม checklist สำหรับปล่อยฟีเจอร์นี้", "ได้รายการพร้อมเจ้าของและเกณฑ์ผ่าน"],
      ["Beta", "วางแผนเปิด beta ให้ลูกค้ากลุ่มเล็ก", "ได้ลำดับเปิดและตัวชี้วัด"],
      ["Rollback", "ถ้าปล่อยแล้ว error พุ่ง ต้องทำอะไร", "ได้ขั้นตอนย้อนที่ทดสอบแล้ว"]
    ], ["อย่าปล่อยโดยไม่มีคนเฝ้า", "ทุก launch ต้องมีทางถอย"]]
  ];

  var commands = [
    ["spec", "เขียนสเปกที่มีโครงสร้างก่อนลงโค้ด", ["/spec", "/agent-skills:spec"], [
      ["ฟีเจอร์ใหม่", "/spec ระบบ export รายงานเป็น CSV และ PDF", "ได้ SPEC.md พร้อมเป้าหมาย ขอบเขต และเกณฑ์ตรวจ"],
      ["หลาย capability", "/spec ระบบแจ้งเตือนทั้ง in-app และ email", "agent เสนอ capability map ก่อนเขียนสเปกแยกโมดูล"],
      ["ตรวจขอบเขต", "/spec ปรับ checkout ให้รองรับหลายสกุลเงิน", "สเปกระบุสิ่งที่ไม่ทำและความเสี่ยงชัดเจน"]
    ]],
    ["plan", "แตกงานเป็น task พร้อมเกณฑ์ยอมรับและลำดับ", ["/plan", "/agent-skills:plan"], [
      ["จากสเปก", "/plan จาก SPEC.md ระบบ export", "ได้ tasks/plan.md และ tasks/todo.md พร้อมลำดับ"],
      ["งานขนาน", "/plan แยกงาน migration ฐานข้อมูลเป็น task ที่ขนานได้", "task ไม่แชร์ไฟล์และมี dependency ชัด"],
      ["แผนเดิมค้าง", "/plan งานต่อจาก plan เดิมที่มี task ค้าง", "agent หยุดถามก่อนเขียนทับแผนเดิม"]
    ]],
    ["build", "ทำ task ถัดไปแบบ incremental หรือใช้ auto ทำทั้งแผน", ["/build", "/build auto"], [
      ["ทำทีละ task", "/build", "agent ทำ task ถัดไปหนึ่งอันจนเทสผ่านแล้วหยุด"],
      ["ทำทั้งแผน", "/build auto", "agent ขออนุมัติครั้งเดียวแล้วทำทุก task โดยไม่หยุด"],
      ["งานเฉพาะ", "/build task 3 เรื่อง rate limit", "agent อ่านเกณฑ์ยอมรับของ task 3 และทำเฉพาะส่วนนั้น"]
    ]],
    ["test", "รันวงจร TDD หรือ Prove-It สำหรับบั๊ก", ["/test", "/agent-skills:test"], [
      ["ฟีเจอร์ใหม่", "/test ส่วนลดตามคูปอง", "ได้เทสแดงก่อน แล้วโค้ดน้อยที่สุดทำให้เขียว"],
      ["บั๊ก", "/test bug export CSV หัวคอลัมน์หาย", "ได้ reproduction test ที่ fail ก่อนแก้"],
      ["ตรวจ regression", "/test ฟังก์ชัน parse หลัง refactor", "ชุดเทสเดิมยังผ่านและพฤติกรรมไม่เปลี่ยน"]
    ]],
    ["constraints", "กำหนด quality bar และสร้าง CONSTRAINTS.md", ["/constraints", "/agent-skills:constraints"], [
      ["ตั้งมาตรฐาน", "/constraints coverage 80 และ accessibility", "ได้ CONSTRAINTS.md พร้อมคำสั่งตรวจจริง"],
      ["วัดค่าปัจจุบัน", "/constraints วัด coverage วันนี้แล้วตรึงไว้", "ได้ตัวเลขฐานและเกณฑ์ไม่ให้ลดลง"],
      ["ตรวจ repo", "/constraints ตรวจว่ามีมิติไหนที่ยังไม่มีเครื่องมือ", "ได้รายการช่องว่างและเครื่องมือที่ต้องเพิ่ม"]
    ]],
    ["review", "รีวิวห้าแกน ใช้ชื่อ namespaced ถ้าชนคำสั่ง built-in", ["/review", "/agent-skills:review"], [
      ["ก่อน merge", "/review การเปลี่ยนแปลงที่ staged", "ได้รีวิว five-axis พร้อม file:line"],
      ["โค้ดจาก agent", "/agent-skills:review commit ล่าสุด", "ได้ข้อสังเกตด้าน security และเทสที่ขาด"],
      ["เฉพาะด้าน", "/review เฉพาะ correctness กับ architecture", "ได้ findings จัดระดับ Critical ถึง Nit"]
    ]],
    ["webperf", "ตรวจ performance ของเว็บผ่าน persona ผู้เชี่ยวชาญ", ["/webperf", "/agent-skills:webperf"], [
      ["มี Lighthouse", "/webperf ใช้ report.json ที่เพิ่งสร้าง", "ได้ผลวิเคราะห์ Core Web Vitals จากข้อมูลจริง"],
      ["มี URL", "/webperf ตรวจ https://example.com ด้วย chrome-devtools MCP", "agent วัด metric โดยตรงแล้วสรุปคอขวด"],
      ["quick mode", "/webperf สแกนโค้ดหน้านี้ก่อน deploy", "ได้ anti-pattern ที่ทำเครื่องหมาย potential impact"]
    ]],
    ["code-simplify", "ลดความซับซ้อนของโค้ดที่เพิ่งเปลี่ยน", ["/code-simplify", "/agent-skills:code-simplify"], [
      ["ฟังก์ชันยาว", "/code-simplify ฟังก์ชัน handleCheckout", "ได้โครงที่อ่านง่ายขึ้นและเทสยังผ่าน"],
      ["ลด nesting", "/code-simplify ตัวจัดการ error ใน api.ts", "ได้ guard clause แทน nesting ลึก"],
      ["ตามขอบเขต", "/code-simplify เฉพาะไฟล์ที่เปลี่ยนใน commit นี้", "ไม่แตะโค้ดนอกขอบเขตและ diff สะอาด"]
    ]],
    ["ship", "รวมผลจาก persona สามตัวเป็น go/no-go พร้อม rollback", ["/ship", "/agent-skills:ship"], [
      ["ก่อนปล่อย", "/ship ตรวจการเปลี่ยนแปลงก่อน deploy คืนนี้", "ได้ go/no-go จาก reviewer, auditor และ tester"],
      ["มี rollback", "/ship พร้อมแผนถอยกลับถ้า error rate เกิน 2%", "ได้เงื่อนไขหยุดและขั้นตอนย้อน"],
      ["beta", "/ship ปล่อยให้ทีมภายในก่อน", "ได้ checklist และตัวชี้วัดสำหรับ staged rollout"]
    ]]
  ];

  var personas = [
    ["code-reviewer", "รีวิวโค้ดห้ามิติก่อน merge", "ใช้เมื่อต้องการรีวิวละเอียดจากมุมมอง staff engineer"],
    ["security-auditor", "ตรวจช่องโหว่และ threat model", "ใช้เมื่อโค้ดแตะ auth, input หรือข้อมูลอ่อนไหว"],
    ["test-engineer", "ออกแบบชุดเทสและวิเคราะห์ coverage", "ใช้เมื่อเทสไม่พอหรือต้องการกลยุทธ์ทดสอบ"],
    ["web-performance-auditor", "ตรวจ Core Web Vitals และคอขวดฝั่งเว็บ", "ใช้เมื่อหน้าเว็บช้าหรือต้อง audit performance"]
  ];

  var data = [];

  skills.forEach(function (s) {
    var id = s[0];
    data.push({
      id: id,
      cat: s[1],
      type: "skill",
      name: "/" + id,
      summary: s[2],
      overview: s[3],
      prerequisites: s[4],
      invoke: skillInvoke(id),
      examples: s[5].map(function (e) { return { title: e[0], prompt: "/" + id + " " + e[1], result: e[2] }; }),
      cautions: s[6],
      refs: skillRef(id),
      sourcePath: "skills/" + id + "/SKILL.md"
    });
  });

  commands.forEach(function (c) {
    var id = c[0];
    data.push({
      id: "cmd-" + id,
      cat: "command",
      type: "command",
      name: "/" + id,
      summary: c[1],
      overview: "คำสั่งสำเร็จรูปที่ห่อ skill ที่เกี่ยวข้องไว้ให้เรียกได้เร็วใน Claude Code คำสั่งจะโหลด skill และทำตามขั้นตอนที่กำหนดในไฟล์ command โดยไม่ต้องพิมพ์ workflow ยาว",
      prerequisites: [
        "ติดตั้ง plugin agent-skills ใน Claude Code",
        "อยู่ใน repository ที่ต้องการให้ทำงาน"
      ],
      invoke: c[2].map(function (code) {
        return { label: "Claude Code", code: code, note: code.indexOf("agent-skills:") !== -1 ? "ใช้เมื่อชื่อชนกับคำสั่ง built-in" : "" };
      }),
      examples: c[3].map(function (e) { return { title: e[0], prompt: e[1], result: e[2] }; }),
      cautions: [
        "คำสั่งบางตัวชนชื่อ built-in ให้ใช้รูปแบบ namespaced",
        "คำสั่งเป็นส่วนของ Claude Code plugin ถ้าใช้ harness อื่นให้เรียก skill แทน"
      ],
      refs: commandRef(id),
      sourcePath: ".claude/commands/" + id + ".md"
    });
  });

  personas.forEach(function (p) {
    var id = p[0];
    data.push({
      id: "agent-" + id,
      cat: "agent",
      type: "agent",
      name: id,
      summary: p[1],
      overview: p[2] + " เป็น subagent ที่มีบทบาทเฉพาะและรับบริบทแยกจากเซสชันหลัก ใช้เมื่อต้องการมุมมองเชี่ยวชาญโดยไม่ปนกับงานหลัก",
      prerequisites: [
        "harness รองรับ subagent หรือ Agent tool",
        "ส่งบริบทและไฟล์ที่ต้องตรวจให้ครบ"
      ],
      invoke: [
        { label: "Claude Code / Agent tool", code: 'subagent_type: "' + id + '"', note: "เรียกผ่าน Task/Agent tool พร้อม brief" }
      ],
      examples: [
        { title: "รีวิวก่อน merge", prompt: "ส่ง diff นี้ให้ " + id + " ตรวจก่อน merge", result: "ได้รายงานเฉพาะทางพร้อมจุดที่ต้องแก้" },
        { title: "ตรวจเฉพาะด้าน", prompt: "ให้ " + id + " ตรวจเฉพาะความเสี่ยงด้านนี้", result: "ได้ findings ที่โฟกัสและมีหลักฐาน" },
        { title: "งานขนาน", prompt: "ให้ " + id + " ตรวจพร้อมกับอีก persona", result: "ได้ผลแยกกันแล้วจึงรวมเป็นข้อสรุป" }
      ],
      cautions: [
        "persona ต้องได้ brief ที่สร้างใหม่ ไม่ใช่ประวัติเซสชันหลัก",
        "อย่าใช้ persona แทนการตัดสินใจของผู้ใช้ในเรื่องที่ย้อนยาก"
      ],
      refs: agentRef(id),
      sourcePath: "agents/" + id + ".md"
    });
  });

  NS.pages["agent-skills-docs"] = {
    data: data,
    idKey: "id",
    unit: "รายการ",
    flow: [
      { id: "all", label: "ทั้งหมด" },
      { id: "define", label: "นิยาม" },
      { id: "plan", label: "วางแผน" },
      { id: "build", label: "สร้าง" },
      { id: "verify", label: "พิสูจน์" },
      { id: "review", label: "ตรวจ" },
      { id: "ship", label: "ปล่อย" },
      { id: "meta", label: "พื้นฐาน" },
      { id: "command", label: "คำสั่ง" },
      { id: "agent", label: "บทบาท" }
    ],
    catLabel: {
      define: "นิยาม",
      plan: "วางแผน",
      build: "สร้าง",
      verify: "พิสูจน์",
      review: "ตรวจ",
      ship: "ปล่อย",
      meta: "พื้นฐาน",
      command: "คำสั่ง",
      agent: "บทบาท"
    },
    collection: {
      repo: REPO,
      version: "0.6.13",
      license: "MIT"
    }
  };
})();
