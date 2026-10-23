/* Page module: security-audit-skill-docs. Verified against cloudflare/security-audit-skill c1c8a8c (2026-09-14). */
(function () {
  "use strict";
  const NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  const REPO = "https://github.com/cloudflare/security-audit-skill";
  const SKILL = REPO + "/blob/main/skills/security-audit/";

  function ref(file, label) {
    return [{ label: label || file, href: SKILL + file }];
  }

  NS.pages["security-audit-skill-docs"] = {
    data: [
      {
        id: "security-audit",
        cat: "start",
        type: "skill",
        name: "security-audit",
        summary: "เปลี่ยน coding agent เป็นผู้ตรวจความปลอดภัยที่ไล่หกเฟสและยืนยันเฉพาะ boundary failure",
        overview: "พา agent ผ่าน 6 เฟส: reconnaissance, coverage-led hunting, candidate validation, structured output, independent record verification และ target-neutral reporting ค่าเริ่มต้นเป็น guidance mode — ยังไม่รันครบ workflow หรือเขียนไฟล์ full audit mode ทำงานเมื่อขอ audit/pen-test เต็มหรือขอ report artifacts เท่านั้น หลักที่คุมทุกเฟสคือ adversarial validation: ผู้ตรวจต้องไม่ใช่ผู้พบ และยืนยันได้เฉพาะ boundary failure ที่ระบุ principal, resource และผลลัพธ์จริง",
        prerequisites: [
          "coding agent ที่โมเดลรองรับ tool use และ parallel sub-agents",
          "Node.js สำหรับ validator ที่ไม่พึ่ง dependency",
          "OS-enforced sandbox ที่ปิด external network, ให้ target และ toolchain แบบ read-only, เขียนได้เฉพาะ scratch และจำกัด CPU, memory, process, file size และเวลา",
          "output directory ที่เขียนได้และอยู่นอก target โดยค่าเริ่มต้นคือ ~/security-audit-skill/<repo-name>/run-<N>"
        ],
        invoke: [
          {
            label: "ติดตั้งผ่าน Skills CLI",
            code: "npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit",
            language: "shell"
          },
          {
            label: "ติดตั้งระดับผู้ใช้",
            code: "npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit --global",
            language: "shell",
            note: "npx skills --help แสดงตัวเลือก agent และโหมด non-interactive"
          },
          {
            label: "เรียกใช้ด้วยภาษาธรรมชาติ",
            code: "security audit this codebase",
            language: "text",
            note: "ไม่มี slash command; สกิลเปิดเองเมื่อคำขอตรง trigger เช่น security audit, find vulnerabilities หรือ pen-test the code"
          }
        ],
        examples: [
          {
            title: "Audit ทั้ง repo",
            prompt: "security audit this codebase",
            result: "เข้า full audit mode ครบหกเฟส และเขียน artifact ลง ~/security-audit-skill/<repo-name>/run-<N>"
          },
          {
            title: "เจาะเฉพาะโฟลเดอร์",
            prompt: "find security vulnerabilities in ./src",
            result: "เป็น scoped run: ledger ครอบเฉพาะ ./src และรายงานต้องบอกชัดว่า coverage ไม่ครบทั้ง repo"
          },
          {
            title: "กำหนดที่เก็บรายงานเอง",
            prompt: "do a security review, output to ~/audits/my-project",
            result: "ใช้ output directory ที่ระบุ และไม่เขียนใน target เว้นแต่ผู้ใช้เลือก path ที่ version control ignore ทั้ง directory"
          }
        ],
        cautions: [
          "guidance mode เป็นค่าเริ่มต้น: คำถามความปลอดภัยทั่วไปไม่สร้าง output directory และไม่เขียน artifact",
          "ถ้าควบคุม sandbox ไม่ครบ ห้ามรัน target code — ต้องคง lead เป็น needs_validation พร้อม blocker ที่ระบุ และห้ามยิง deployed endpoint, shared service หรือ production identity",
          "validator ผ่านพิสูจน์แค่ format และ ledger consistency ไม่ได้พิสูจน์ว่าเป็นช่องโหว่จริง"
        ],
        refs: [{ label: "README.md บน GitHub", href: REPO + "/blob/main/README.md" }],
        sourcePath: "skills/security-audit/SKILL.md"
      },
      {
        id: "recon",
        cat: "map",
        type: "concept",
        name: "Reconnaissance — เฟส 1",
        summary: "ทำแผนที่ source, trust boundary และ entry surface แล้วสร้าง coverage ledger ก่อนล่า",
        overview: "เฟสนี้เป็น read-only: parent ผ่าน budget gate แล้วสร้าง `run-metadata.json`, scratch root ของแต่ละ agent และ `coverage-ledger.json` ตั้งต้น จากนั้นยิง research agent สี่ตัวขนานกันเก็บ product/stack, principal กับ control, entry surface กับ sink และข้อจำกัดของ local execution parent สังเคราะห์ `architecture.md` (cap ประมาณ 1,000 คำ) และเขียน ledger หนึ่ง unit ต่อ entry surface × trust boundary × subsystem × attack class ตัว ledger คือ coverage claim จริง ไม่ใช่จำนวน agent",
        prerequisites: [
          "absolute path ของ target, skill directory และ output directory ที่อยู่นอก target",
          "source ref ที่ระบุ commit ที่ตรวจและสถานะ dirty ของ worktree",
          "budget ถ้าผู้ใช้ตั้งไว้ (นับเป็นจำนวน agent invocation ทั้ง run)",
          "prior coverage-ledger.json และ findings.json ถ้าเคยรัน repo นี้มาก่อน"
        ],
        cautions: [
          "recon ไม่อ่าน deployed endpoint, registry, broker หรือ cloud API และไม่รัน build หรือ test",
          "prior source ref เดิมไม่ใช่หลักฐานว่า path ไม่เปลี่ยน ต้องเทียบ source ปัจจุบันของทุก record และ unit",
          "พื้นที่ที่อยู่นอก scope ต้องเป็น out_of_scope ห้ามนับเป็น covered"
        ],
        refs: ref("ATTACK-CLASSES.md", "ATTACK-CLASSES.md — เลือก companion ตาม boundary"),
        sourcePath: "skills/security-audit/RECONNAISSANCE.md"
      },
      {
        id: "hunting",
        cat: "hunt",
        type: "concept",
        name: "Coverage-led hunting — เฟส 2",
        summary: "แจก ledger unit ให้ hunter แยกกัน แล้วใช้ coverage critic หา unit ที่ยังขาด",
        overview: "parent แจก unit ที่เป็น planned ให้ general agent ตามลำดับความสำคัญ: entry surface ที่ trust ต่ำสุด, boundary ที่ป้องกัน resource มีค่าที่สุด, ช่องว่างจาก prior run และ class ที่เคยได้ผลกับ target ประเภทนี้ hunter แต่ละตัวได้ prompt ครบตามสัญญา (architecture.md, assignment block, attack-class block, promotion procedure และ schema) และคืน JSON ก้อนเดียวที่ผูกทุก check กับ coverage_id หลังจบ wave coverage critic ใหม่จะตรวจ unit ที่ขาด parallel path, lifecycle mode และ exclusion ที่ไม่มีเหตุผล",
        prerequisites: [
          "coverage ledger ที่ผ่าน validate-coverage-ledger.cjs",
          "profile ที่เลือก: quick, standard หรือ deep (ค่าเริ่มต้น standard)",
          "budget ที่ reserve critic และ validation ไว้แล้วก่อนปล่อย hunter",
          "canonical agent ID แบบ lowercase ตาม ^[a-z0-9][a-z0-9_-]{0,63}$ และห้ามซ้ำกับชื่อ device ของ Windows เช่น con, prn, aux, nul, com1–com9 หรือ lpt1–lpt9"
        ],
        cautions: [
          "unit ที่ budget ไปไม่ถึงต้องเป็น deferred พร้อม reason ห้ามปล่อยว่างเงียบ ๆ หรือใช้ agent cap เป็นหลักฐานว่า coverage ครบ",
          "hunter อ่าน source และเขียนได้เฉพาะ scratch ของตัวเอง ห้ามแตะ shared file, target source หรือ directory ของ agent อื่น",
          "critic เสนอ coverage ไม่ใช่ finding; parent ต้องตรวจ scope, สร้าง canonical ID และ dedupe ก่อนรับเข้า ledger"
        ],
        refs: ref("ATTACK-CLASSES.md", "ATTACK-CLASSES.md — ชุด attack class ที่ใช้แจกงาน"),
        sourcePath: "skills/security-audit/HUNTING.md"
      },
      {
        id: "validation",
        cat: "verify",
        type: "concept",
        name: "Candidate validation — เฟส 3",
        summary: "ให้ general verifier ใหม่ที่ไม่ได้ล่า พยายามหักล้างทุก candidate",
        overview: "หลัง coverage critic ผ่านหรือ early stop ที่บันทึกไว้ parent รวม candidate ตาม fingerprint และ root cause แล้วส่งให้ verifier ที่ไม่ได้พบมัน verifier อ่าน source ที่อ้างซ้ำ รัน bounded check ที่ปลอดภัย และคืน JSON {decision, record} ตาม branch ของ `report-schema.json` verifier เปลี่ยน confirmed เป็น needs_validation ได้เมื่อยังมี deployment หรือ runtime fact ที่ไม่รู้ และใช้ rejected เมื่อหลักฐานหักล้าง claim",
        prerequisites: [
          "candidate ที่ consolidate แล้วพร้อม fingerprint และ coverage unit ที่เชื่อมอยู่",
          "general verifier ใหม่หนึ่งตัวต่อ candidate และ budget สำหรับรอบนี้",
          "report-schema.json เพื่อคัดลอก branch confirmed, needs_validation และ rejected ให้ verifier"
        ],
        cautions: [
          "verifier ต้องไม่เห็นข้อสรุปของ verifier คนอื่น และต้องไม่ใช่คนที่พบ candidate",
          "needs_validation ไม่ใช่ที่พักของไอเดียที่ยังไม่ชัด ต้องมี blocker เจาะจงและ plan ที่ทำได้จริง",
          "candidate ที่ยังไม่ถูก validate อยู่ได้แค่ใน ledger ห้ามใส่ findings.json ไม่ว่าด้วย verdict ใด"
        ],
        refs: ref("report-schema.json", "report-schema.json — สัญญาของสามคำตัดสิน"),
        sourcePath: "skills/security-audit/VALIDATION-AND-REPORTING.md"
      },
      {
        id: "output",
        cat: "report",
        type: "concept",
        name: "Structured output — เฟส 4",
        summary: "เขียน findings.json ให้ตรง schema แล้วรัน validator ทั้ง findings และ ledger",
        overview: "parent เขียน record ที่ตัดสินแล้วทั้งหมดลง findings.json เรียงตาม fingerprint โดยสามคำตัดสินใช้ field ต่างกัน: confirmed มี root_cause, severity และ execution; needs_validation มี blockers กับ validation_plan; rejected มี reason schema ใช้ additionalProperties: false จึงห้ามลาก wrapper field ของ hunter เข้ามา หลังเขียนให้รัน validator ทั้งสองตัวและแก้ทุก error ก่อนไปเฟส 5 — validator ที่ผ่านยังพิสูจน์ได้แค่ format และ ledger consistency",
        prerequisites: [
          "record ที่ผ่านการตัดสินจากเฟส 3 ครบทุก fingerprint",
          "Node.js สำหรับ validate-findings.cjs และ validate-coverage-ledger.cjs",
          "report-schema.json จาก skill directory เดียวกับที่ใช้รัน"
        ],
        invoke: [
          {
            label: "ตรวจ findings.json",
            code: "node <skill-dir>/validate-findings.cjs <output-dir>/findings.json",
            language: "shell"
          },
          {
            label: "ตรวจ coverage ledger",
            code: "node <skill-dir>/validate-coverage-ledger.cjs <output-dir>/coverage-ledger.json",
            language: "shell",
            note: "รันหลัง seeding, หลัง parent อัปเดตทุกครั้ง และก่อนเฟส 6"
          }
        ],
        cautions: [
          "confirmed ห้ามมี claimed_root_cause, blockers หรือ validation_plan; needs_validation และ rejected ห้ามมี severity",
          "validator ปฏิเสธ input เกิน 5 MiB, เกิน 1,000 findings หรือ nesting เกิน 64 ระดับ และตัด error ที่รายงานไว้ 100 ข้อ",
          "findings.json ที่ไม่ผ่าน validator ใช้ขับการ assign ต่อไม่ได้ และห้ามใช้เป็น coverage claim"
        ],
        refs: [
          { label: "report-schema.json", href: SKILL + "report-schema.json" },
          { label: "validate-findings.cjs", href: SKILL + "validate-findings.cjs" },
          { label: "validate-coverage-ledger.cjs", href: SKILL + "validate-coverage-ledger.cjs" }
        ],
        sourcePath: "skills/security-audit/VALIDATION-AND-REPORTING.md"
      },
      {
        id: "record",
        cat: "verify",
        type: "concept",
        name: "Independent record verification — เฟส 5",
        summary: "ส่ง final record ให้ research verifier ใหม่ตรวจ source claim ซ้ำอีกชั้น",
        overview: "หนึ่ง research verifier ใหม่ต่อ final record (confirmed และ needs_validation) รันขนานกัน และตรวจ structured record ไม่ใช่ write-up ของ hunter คำตอบมีสองแบบ: verified หรือ replace พร้อม record ใหม่ replacement ที่เลื่อน verdict แรงขึ้นหรือเปลี่ยน root cause, trace, impact หรือ severity ต้องผ่าน verifier ใหม่ที่ไม่ได้ล่า ไม่ได้ตรวจเฟส 3 และไม่ได้เสนอ replacement นั้น หลังใช้ replacement ต้องรัน validator ซ้ำ และตั้ง run_status complete ได้เมื่อทุก record ผ่านเฟสนี้",
        prerequisites: [
          "findings.json ที่ validator ผ่านจากเฟส 4",
          "research verifier ใหม่หนึ่งตัวต่อ record และ budget ที่พอ",
          "quick profile รวมเฟส 3 กับ 5 ได้ แต่ยังต้องมี independent review ของ confirmed"
        ],
        cautions: [
          "ห้ามตรวจแค่ confirmed — needs_validation ที่ misleading ทำให้ owner เสียเวลาและอาจคง premise ที่ผิด",
          "ถ้า independence หรือ budget ไม่พอ ต้องถอด record ที่โต้แย้งออก เก็บ ledger unit เป็น candidate และตั้ง run_status incomplete",
          "ผลที่ malformed หรือห่อด้วย prose ต้องทิ้งโดยไม่ซ่อม แล้วรันใหม่ด้วย verifier ใหม่เมื่อ budget พอ"
        ],
        refs: ref("report-schema.json", "report-schema.json — branch ที่ replacement ต้องตรง"),
        sourcePath: "skills/security-audit/VALIDATION-AND-REPORTING.md"
      },
      {
        id: "report",
        cat: "report",
        type: "concept",
        name: "Target-neutral reporting — เฟส 6",
        summary: "derive รายงานสามไฟล์จาก final record และ ledger โดยไม่ให้ prose เปลี่ยน verdict",
        overview: "เขียน prose จาก final record, coverage ledger และ hardening note เท่านั้น ห้ามเปลี่ยน verdict, severity, blocker หรือ demonstrated impact `REPORT.md` มี profile, scope, budget, posture summary, ตาราง confirmed, ตาราง NEEDS VALIDATION และ coverage summary `FINDINGS-DETAIL.md` เก็บ trace และการ reproduce ของ confirmed ระดับ medium ขึ้นไป `NEEDS-VALIDATION.md` เก็บ lead ที่ยังไม่ปิดพร้อม blocker และ plan run จบได้สองสถานะ: artifact ครบและ validator ผ่าน หรือ run_status incomplete พร้อม reason",
        prerequisites: [
          "final record ที่ผ่านเฟส 5 ทุกอัน",
          "coverage ledger ที่ผ่าน validator พร้อม hardening note ของ hunter",
          "REPORT.md, FINDINGS-DETAIL.md และ NEEDS-VALIDATION.md ใน output directory เดียวกัน"
        ],
        cautions: [
          "ห้ามใส่คำแนะนำให้ยิง live target — deployment plan เป็น owner-observed check ไม่ใช่คำสั่ง probe",
          "run ที่ incomplete ต้องระบุ fingerprint และ unit ที่ยังไม่ validate โดยไม่เรียกมันว่า finding",
          "run ที่สะอาดอาจมี confirmed ศูนย์รายการ ห้ามแต่ง LOW ขึ้นมาเพื่อให้รายงานดูมีเนื้อหา"
        ],
        refs: ref("validate-coverage-ledger.cjs", "validate-coverage-ledger.cjs — ที่มาของ coverage summary"),
        sourcePath: "skills/security-audit/VALIDATION-AND-REPORTING.md"
      }
    ],
    idKey: "id",
    unit: "รายการ",
    catLabel: { start: "เริ่มต้น", map: "วางแผน", hunt: "ล่าช่องโหว่", verify: "ตรวจสอบ", report: "รายงาน" },
    collection: {
      repo: REPO,
      version: "",
      license: "MIT",
      verifiedAt: "2026-10-23"
    }
  };
})();
