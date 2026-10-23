/* Page module: andrej-karpathy-skills-docs. Verified against forrestchang/andrej-karpathy-skills 1.0.0 (2026-10-23). */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  var REPO = "https://github.com/forrestchang/andrej-karpathy-skills";
  var SKILL_PATH = "skills/karpathy-guidelines/SKILL.md";

  function skillRef(section, anchor) {
    return { label: "SKILL.md — " + section, href: REPO + "/blob/main/" + SKILL_PATH + "#" + anchor };
  }

  function exampleRef(section, anchor) {
    return { label: "EXAMPLES.md — " + section, href: REPO + "/blob/main/EXAMPLES.md#" + anchor };
  }

  NS.pages["andrej-karpathy-skills-docs"] = {
    data: [
      {
        id: "karpathy-guidelines",
        cat: "workflow",
        type: "skill",
        name: "karpathy-guidelines",
        summary: "สกิลเดียวที่รวมหลักปฏิบัติสี่ข้อเพื่อลดความผิดพลาดในการเขียนโค้ดของ LLM",
        overview: "`karpathy-guidelines` เก็บเนื้อหาใน `SKILL.md` ไฟล์เดียว แบ่งเป็นสี่หัวข้อ: Think Before Coding, Simplicity First, Surgical Changes และ Goal-Driven Execution เนื้อหาอ้างข้อสังเกตของ Andrej Karpathy เรื่องโมเดลเดาแทนผู้ใช้ ทำโค้ดซับซ้อนเกิน และแก้โค้ดนอกขอบเขต เผยแพร่เป็น Claude Code plugin หรือไฟล์คำสั่งประจำโปรเจกต์ (`CLAUDE.md` หรือ Cursor rule) โดยไม่มี slash command",
        prerequisites: [
          "Claude Code ที่เพิ่ม marketplace และติดตั้ง plugin ได้ หรือโปรเจกต์ที่มี `CLAUDE.md` หรือ `.cursor/rules/`",
          "เข้าใจว่าสกิลนี้เป็นข้อกำหนดพฤติกรรม ไม่ใช่คำสั่งที่รันแล้วได้ผลลัพธ์ตายตัว"
        ],
        invoke: [
          {
            label: "Claude Code — เพิ่ม marketplace",
            code: "/plugin marketplace add forrestchang/andrej-karpathy-skills",
            language: "text"
          },
          {
            label: "Claude Code — ติดตั้ง plugin",
            code: "/plugin install andrej-karpathy-skills@karpathy-skills",
            language: "text",
            note: "ติดตั้ง plugin `andrej-karpathy-skills` จาก marketplace `karpathy-skills` แล้วสกิลจะใช้ได้ทุกโปรเจกต์ใน Claude Code"
          },
          {
            label: "โปรเจกต์ใหม่ — ดาวน์โหลด CLAUDE.md",
            code: "curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md",
            language: "shell",
            note: "บน Windows PowerShell ให้เรียก `curl.exe` เพื่อเลี่ยง alias ของ `curl`"
          },
          {
            label: "โปรเจกต์ที่มี CLAUDE.md อยู่แล้ว — ต่อท้าย",
            code: "echo \"\" >> CLAUDE.md\ncurl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md",
            language: "shell"
          }
        ],
        examples: [
          {
            title: "โจทย์ยังกว้าง",
            prompt: "ใช้ karpathy-guidelines ช่วยเพิ่มระบบ export ข้อมูลผู้ใช้ให้หน่อย",
            result: "agent ระบุสมมติฐานเรื่องขอบเขต ฟิลด์ และรูปแบบไฟล์ก่อน แล้วถามจุดที่ยังไม่ชัดแทนการเดา"
          },
          {
            title: "แก้บั๊กจุดเดียว",
            prompt: "ใช้ karpathy-guidelines แก้บั๊กที่อีเมลว่างแล้ว validator พัง",
            result: "diff แตะเฉพาะบรรทัดที่ทำให้อีเมลว่างพัง ไม่เปลี่ยนคอมเมนต์หรือจัดรูปแบบไฟล์ทั้งไฟล์"
          },
          {
            title: "งานที่ต้องมีเกณฑ์สำเร็จ",
            prompt: "ใช้ karpathy-guidelines refactor ฟังก์ชัน sort ให้รองรับคะแนนซ้ำ",
            result: "agent เสนอเกณฑ์ว่าอะไรคือผ่าน เช่น เทสที่ reproduce อาการเดิมแล้วเขียว และเทสชุดเดิมยังผ่าน"
          }
        ],
        cautions: [
          "ไม่มี slash command; ใช้งานผ่าน host ที่โหลด `SKILL.md`, `CLAUDE.md` หรือ Cursor rule",
          "ชุดนี้เอนไปทางระวังมากกว่าเร็ว งานจิ๋วอย่างแก้ typo ให้ใช้ดุลพินิจ ไม่ต้องครบทุกขั้น",
          "metadata ระบุ MIT แต่ไม่มีไฟล์ `LICENSE` แยก"
        ],
        refs: [
          { label: "README — วิธีติดตั้งและภาพรวมสี่หลักการ", href: REPO + "/blob/main/README.md" },
          { label: "SKILL.md บน GitHub", href: REPO + "/blob/main/" + SKILL_PATH },
          { label: "CLAUDE.md — ฉบับสำหรับโปรเจกต์", href: REPO + "/blob/main/CLAUDE.md" },
          { label: "CURSOR.md — ใช้ rule กับ Cursor", href: REPO + "/blob/main/CURSOR.md" },
          { label: "EXAMPLES.md — ตัวอย่างโค้ดประกอบแต่ละหลักการ", href: REPO + "/blob/main/EXAMPLES.md" },
          { label: "plugin.json — เวอร์ชันและสัญญาอนุญาต", href: REPO + "/blob/main/.claude-plugin/plugin.json" }
        ],
        sourcePath: SKILL_PATH
      },
      {
        id: "think-before-coding",
        cat: "assumption",
        type: "rule",
        name: "Think Before Coding",
        summary: "ระบุสมมติฐานให้ชัดก่อนลงมือ และถามเมื่อโจทย์ยังกำกวม",
        overview: "หลักการข้อ 1 ของ `SKILL.md` กำหนดว่าโมเดลต้องไม่เดาแทนผู้ใช้และไม่ซ่อนความสับสน ก่อน implement ต้องบอกสมมติฐานที่ใช้อย่างชัดเจน ถ้ามีหลายการตีความให้เสนอทั้งหมดแทนการเลือกเงียบ ๆ ถ้ามีวิธีที่ง่ายกว่าให้พูดและผลักกลับเมื่อสมเหตุสมผล และถ้าอะไรยังไม่ชัดให้หยุด ระบุสิ่งที่สับสน แล้วถาม เป้าหมายคือตัดวงจรที่ agent เลือกความหมายหนึ่งเองแล้ววิ่งไปทั้งทาง",
        cautions: [
          "ถามเฉพาะจุดที่เปลี่ยนวิธีแก้หรือผลลัพธ์ การถามทุกบรรทัดจะถ่วงงานที่ข้อมูลพอแล้ว",
          "การเสนอทางเลือกต้องมาพร้อมเหตุผลและข้อแลกเปลี่ยน ไม่ใช่โยนตัวเลือกให้ผู้ใช้ตัดสินเปล่า ๆ"
        ],
        refs: [
          skillRef("1. Think Before Coding", "1-think-before-coding"),
          exampleRef("1. Think Before Coding", "1-think-before-coding")
        ],
        sourcePath: SKILL_PATH
      },
      {
        id: "simplicity-first",
        cat: "simplicity",
        type: "rule",
        name: "Simplicity First",
        summary: "เขียนโค้ดเท่าที่ปัญหาต้องการ ไม่เผื่ออนาคตและไม่เพิ่ม abstraction ที่ไม่มีใครขอ",
        overview: "หลักการข้อ 2 ของ `SKILL.md` ให้ยึดโค้ดน้อยที่สุดที่แก้ปัญหาได้ ไม่มีฟีเจอร์เกินคำขอ ไม่มี abstraction สำหรับโค้ดที่ใช้ครั้งเดียว ไม่มี flexibility หรือ configurability ที่ไม่มีใครขอ และไม่มี error handling สำหรับกรณีที่เป็นไปไม่ได้ ถ้าเขียน 200 บรรทัดแต่ย่อได้เหลือ 50 ให้เขียนใหม่ บททดสอบของหลักนี้คือคำถามว่า senior engineer จะบอกว่าโค้ดนี้ซับซ้อนเกินไปหรือไม่ ถ้าใช่ให้ลดความซับซ้อนลง",
        cautions: [
          "หลักนี้ไม่ได้ห้ามเพิ่มความซับซ้อนตลอดไป `EXAMPLES.md` ระบุให้เพิ่มเมื่อความต้องการหลายรูปแบบมาถึงจริง",
          "ความเรียบง่ายไม่ควรถูกใช้เป็นเหตุผลตัด validation ของ input ที่มาจากผู้ใช้จริง"
        ],
        refs: [
          skillRef("2. Simplicity First", "2-simplicity-first"),
          exampleRef("2. Simplicity First", "2-simplicity-first")
        ],
        sourcePath: SKILL_PATH
      },
      {
        id: "surgical-changes",
        cat: "scope",
        type: "rule",
        name: "Surgical Changes",
        summary: "แตะเฉพาะบรรทัดที่งานต้องการ และเก็บกวาดเฉพาะขยะที่การแก้ของคุณสร้างขึ้น",
        overview: "หลักการข้อ 3 ของ `SKILL.md` กำหนดขอบเขตการแก้โค้ดเดิม ห้ามปรับปรุงโค้ดข้างเคียง คอมเมนต์ หรือ formatting ห้าม refactor สิ่งที่ไม่พัง ให้ตามสไตล์เดิมแม้จะชอบแบบอื่น และถ้าเจอ dead code ที่ไม่เกี่ยวข้องให้บอกแต่อย่าลบ เมื่อการแก้ทำให้เกิด orphan ให้ลบ import ตัวแปร หรือฟังก์ชันที่การเปลี่ยนแปลงของคุณทำให้ไม่ถูกใช้ แต่ไม่ลบ dead code ที่มีอยู่ก่อน บททดสอบคือทุกบรรทัดที่เปลี่ยนต้องโยงกลับไปที่คำขอของผู้ใช้",
        cautions: [
          "ก่อนลบ orphan ต้องยืนยันว่าการเปลี่ยนแปลงของคุณเป็นสาเหตุที่ทำให้มันไม่ถูกใช้ ไม่ใช่ของเดิม",
          "dead code หรือบั๊กข้างเคียงที่เจอระหว่างทางให้รายงานแยก ไม่ใช่แก้ไปพร้อมงานหลัก"
        ],
        refs: [
          skillRef("3. Surgical Changes", "3-surgical-changes"),
          exampleRef("3. Surgical Changes", "3-surgical-changes")
        ],
        sourcePath: SKILL_PATH
      },
      {
        id: "goal-driven-execution",
        cat: "verification",
        type: "rule",
        name: "Goal-Driven Execution",
        summary: "แปลงคำสั่งเป็นเป้าหมายที่ตรวจได้ แล้ววนจนหลักฐานยืนยันว่าผ่าน",
        overview: "หลักการข้อ 4 ของ `SKILL.md` ให้เปลี่ยน imperative task เป็นเป้าหมายที่ตรวจสอบได้ เช่น \"Add validation\" เปลี่ยนเป็น \"เขียนเทสสำหรับ input ที่ผิดแล้วทำให้ผ่าน\" \"Fix the bug\" เปลี่ยนเป็น \"เขียนเทสที่ reproduce อาการแล้วทำให้ผ่าน\" และ \"Refactor X\" เปลี่ยนเป็น \"เทสผ่านก่อนและหลัง\" งานหลายขั้นให้ระบุแผนสั้น ๆ ที่ทุกขั้นมี verify ของตัวเอง เกณฑ์สำเร็จที่แข็งแรงทำให้ agent วนแก้ได้เอง ส่วนเกณฑ์คลุมเครืออย่าง \"make it work\" ทำให้ต้องถามซ้ำตลอดทาง",
        cautions: [
          "เกณฑ์ที่วัดไม่ได้ เช่น \"ทำให้มันทำงานได้\" อ่อนเกินไป ต้องระบุพฤติกรรมหรือคำสั่งที่ใช้ตัดสินว่าผ่าน",
          "งานหลายขั้นที่ไม่มี verify รายขั้นจะวนแก้โดยไม่รู้ว่าติดอยู่ตรงไหน"
        ],
        refs: [
          skillRef("4. Goal-Driven Execution", "4-goal-driven-execution"),
          exampleRef("4. Goal-Driven Execution", "4-goal-driven-execution")
        ],
        sourcePath: SKILL_PATH
      }
    ],
    idKey: "id",
    filters: "none",
    unit: "รายการ",
    catLabel: {
      workflow: "กระบวนการ",
      assumption: "สมมติฐาน",
      simplicity: "ความเรียบง่าย",
      scope: "ขอบเขตการแก้",
      verification: "เกณฑ์สำเร็จ"
    },
    collection: {
      repo: REPO,
      version: "1.0.0",
      license: "MIT",
      verifiedAt: "2026-10-23"
    }
  };
})();
