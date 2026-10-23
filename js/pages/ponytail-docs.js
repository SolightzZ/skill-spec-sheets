/* Page module: ponytail-docs. Verified against DietrichGebert/ponytail 5.3.2 (2026-10-23). */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  var REPO = "https://github.com/DietrichGebert/ponytail";

  function file(path, label) {
    return { label: label || path, href: REPO + "/blob/main/" + path };
  }

  function readme(label, hash) {
    return { label: label, href: REPO + (hash ? "#" + hash : "") };
  }

  /* Claude Code / OpenCode use the slash form; Codex exposes the same skill under the plugin namespace. */
  function command(name) {
    return [
      { label: "Claude Code / OpenCode", code: "/" + name, language: "text" },
      {
        label: "Codex CLI / IDE extension",
        code: "$ponytail:" + name,
        language: "text",
        note: "ใน Codex คำสั่งเป็น skill ใต้ namespace ของ plugin จึงเรียกด้วย $ แทน /"
      }
    ];
  }

  NS.pages["ponytail-docs"] = {
    data: [
      /* ---------- commands ---------- */
      {
        id: "ponytail",
        cat: "command",
        type: "command",
        name: "/ponytail",
        summary: "สลับระดับความเข้ม lite / full / ultra หรือปิดชั่วคราว ไม่ใส่ argument จะเปิดใช้ที่ระดับเดิมหรือรายงานระดับปัจจุบัน",
        overview: "คำสั่งหลักของชุดนี้: เปลี่ยนระดับความเข้มของ ponytail ทั้งเซสชัน และเป็นทางเปิดใช้เมื่อโหมดถูกปิดไว้ ตัว prompt สั่งให้ agent ทำงานแบบ lazy senior dev — เริ่มจาก YAGNI, stdlib, native feature, dependency ที่มีอยู่ แล้วจึงเขียนขั้นต่ำที่ทำงานได้ ระดับที่ใช้อยู่จะถูกบอกในข้อความตอนเริ่มเซสชันและตอนเปลี่ยนโหมด ปิดได้ด้วย `/ponytail off` หรือพูดว่า \"stop ponytail\" / \"normal mode\"",
        prerequisites: [
          "ติดตั้ง ponytail ใน host ที่รองรับ slash command หรือ skill",
          "รู้ระดับที่ต้องการ: lite, full (default) หรือ ultra"
        ],
        invoke: command("ponytail"),
        examples: [
          {
            title: "เพิ่มความเข้มชั่วคราว",
            prompt: "/ponytail ultra",
            result: "โหมด ultra ตั้งคำถามกับส่วนของ requirement ที่ยังไม่มีเหตุผลรองรับก่อนสร้าง และข้อความเปลี่ยนโหมดบอกระดับใหม่"
          },
          {
            title: "กลับมาระดับเดิม",
            prompt: "/ponytail",
            result: "ถ้า ponytail ปิดอยู่จะเปิดที่ default (full) ถ้าเปิดอยู่จะรายงานระดับปัจจุบันโดยไม่เปลี่ยน"
          },
          {
            title: "ปิดกลางงาน",
            prompt: "/ponytail off",
            result: "ponytail หยุดจนจบเซสชัน เปิดใหม่ได้ด้วย /ponytail หรือพิมพ์คำว่า ponytail"
          }
        ],
        cautions: [
          "ระดับไม่คงอยู่ข้ามเซสชันใน host ที่ไม่ใช้ lifecycle hooks เช่น Gemini, Qwen, Antigravity, Goose และ Kimi",
          "default เป็น full, override ด้วย `PONYTAIL_DEFAULT_MODE` หรือ `~/.config/ponytail/config.json`",
          "การปิดด้วยคำพูด \"stop ponytail\" หรือ \"normal mode\" เทียบเท่า /ponytail off"
        ],
        refs: [file("commands/ponytail.toml"), readme("README — Commands", "commands")],
        sourcePath: "commands/ponytail.toml"
      },
      {
        id: "ponytail-review",
        cat: "command",
        type: "command",
        name: "/ponytail-review",
        summary: "รีวิว diff แบบ senior dev ที่จะถูกเพจตอนของพัง — bug, security, load จริง, โค้ดเสี่ยงที่ไม่มีเทส, ทางที่ช้า และสิ่งที่ควรตัด",
        overview: "อ่านโค้ดที่การเปลี่ยนไปแตะ ไม่ใช่แค่ diff: caller ของทุกฟังก์ชันที่เปลี่ยน ฟังก์ชันที่มันเรียก เทส และ README เพื่อดู load ที่โปรเจกต์คาดไว้ ลำดับความสำคัญคือ ถูกต้อง ปลอดภัย ทน load มีเทส เร็ว และ lean ผลลัพธ์เริ่มด้วย \"What this change does:\" ตามด้วย finding ที่จัดกลุ่ม Must fix / Should fix / Nice to have — แต่ละข้อมี What this is, Problem, Fix, If we skip it — แล้วปิดด้วย Verdict, Lean และ Not checked คำสั่งนี้ไม่แก้โค้ด",
        prerequisites: [
          "มี diff, branch, PR หรือไฟล์ที่จะรีวิว (ไม่ระบุ = uncommitted changes หรือ commit ล่าสุด)",
          "agent อ่านโค้ดและเทสของ repo ได้"
        ],
        invoke: command("ponytail-review"),
        examples: [
          {
            title: "งานที่ยังไม่ commit",
            prompt: "/ponytail-review uncommitted",
            result: "รีวิวเฉพาะ changes ที่ยังไม่ commit พร้อม load ที่สันนิษฐาน และ finding ที่มี file:lines"
          },
          {
            title: "ก่อน merge",
            prompt: "/ponytail-review branch",
            result: "รีวิวทั้ง branch เทียบกับ base แล้วปิดท้ายด้วย Verdict ว่าควรแก้ข้อไหนก่อน"
          },
          {
            title: "รีวิว PR",
            prompt: "/ponytail-review https://github.com/org/repo/pull/42",
            result: "อ่าน diff ของ PR นั้นแล้วรายงาน finding พร้อมผลถ้าไม่แก้"
          }
        ],
        cautions: [
          "คอมเมนต์ shortcut: ที่ระบุเพดานไว้แล้วถือเป็นการตัดสินใจ ไม่ใช่ finding เว้นแต่ load จริงข้ามเพดานนั้นไปแล้ว",
          "finding ที่ไม่มีเคสจริง (input หรือสถานการณ์ที่ทำให้ผลผิด) จะไม่ถูกรายงาน",
          "เป็นรายงานอย่างเดียว ไม่แตะโค้ด"
        ],
        refs: [
          file("commands/ponytail-review.toml"),
          readme("README — The review, rebuilt", "the-review-rebuilt")
        ],
        sourcePath: "commands/ponytail-review.toml"
      },
      {
        id: "ponytail-audit",
        cat: "command",
        type: "command",
        name: "/ponytail-audit",
        summary: "ตรวจทั้ง repo ด้วยเกณฑ์เดียวกับ review: map entry point และ load ก่อน แล้วจัดอันดับสิ่งที่ควรซ่อมก่อน",
        overview: "เริ่มจาก README, deploy/build config, dependency, entry point และเทส เพื่อหา load ที่คาดไว้และ trace flow หลัก จากนั้นอ่าน path ที่รับ input จากผู้ใช้ เกี่ยวกับเงิน auth การเขียนข้อมูล background job และ state ที่ใช้ร่วมกันอย่างเต็มที่ ผลลัพธ์เริ่มด้วย \"What this repo does:\" ตามด้วย finding ไม่เกิน 20 ข้อ เรียงจากสำคัญสุด ปิดด้วย Verdict, Lean และ Not checked คำสั่งนี้ไม่แก้โค้ด",
        prerequisites: [
          "repo หรือโฟลเดอร์ที่ agent อ่านได้ทั้งต้นไม้",
          "รู้ load ที่โปรเจกต์คาดไว้ ถ้ามีระบุใน README หรือ deploy config"
        ],
        invoke: command("ponytail-audit"),
        examples: [
          {
            title: "Audit ทั้ง repo",
            prompt: "/ponytail-audit",
            result: "ได้ finding ไม่เกิน 20 ข้อ เรียงตามความสำคัญ พร้อม Verdict ว่าซ่อมอะไรก่อน"
          },
          {
            title: "เจาะเฉพาะแพ็กเกจ",
            prompt: "/ponytail-audit packages/api",
            result: "ขอบเขตจำกัดที่ packages/api และ Not checked บอกส่วนที่ยังไม่ได้อ่าน"
          },
          {
            title: "หาโค้ดที่ลบได้",
            prompt: "/ponytail-audit what can I delete",
            result: "หมวด lean ระบุ dead code, helper ซ้ำ และ dependency ที่แทนได้ด้วย stdlib หรือ platform"
          }
        ],
        cautions: [
          "รายงานสูงสุด 20 finding — ถ้ามีข้อเล็กที่ตัดออก ต้องบอกจำนวนที่เหลือ",
          "ก่อนบอกว่าโค้ดไม่ถูกใช้ ต้อง grep ทั้ง tree รวมเทส fixture config และการอ้างถึงแบบ string",
          "ส่วนที่ยังไม่ได้อ่านต้องอยู่ใน Not checked ไม่ใช่ปล่อยว่าง"
        ],
        refs: [
          file("commands/ponytail-audit.toml"),
          readme("README — The audit, rebuilt", "the-audit-rebuilt")
        ],
        sourcePath: "commands/ponytail-audit.toml"
      },
      {
        id: "ponytail-debt",
        cat: "command",
        type: "command",
        name: "/ponytail-debt",
        summary: "เก็บทุกคอมเมนต์ shortcut: (และ ponytail: รุ่นเก่า) มาเป็น ledger หนี้ทางเทคนิค เพื่อไม่ให้ \"ไว้ทีหลัง\" กลายเป็น \"ไม่เคย\"",
        overview: "grep ทั้ง tree ด้วย `git grep --no-index --exclude-standard -nE '(#|//|/[*]) ?(shortcut|ponytail):'` โดยข้าม .git และสิ่งที่ .gitignore ครอบไว้ แต่ละ marker เป็นหนึ่งแถว จัดกลุ่มตามไฟล์ในรูป `<file>:<line>, <what was simplified>. ceiling: <limit>. upgrade: <trigger>.` marker ที่ไม่มี upgrade path ถูกตี tag `no-trigger` เพราะจะเน่าเงียบ ปิดท้ายด้วยจำนวน marker และจำนวนที่ไม่มี trigger ถ้าไม่พบเลยจะตอบว่า \"No shortcut debt. Clean ledger.\"",
        prerequisites: [
          "repo ที่มีคอมเมนต์แบบ shortcut: หรือ ponytail:",
          "git grep ใช้ได้ หรือให้ agent ใช้ grep ปกติแทน"
        ],
        invoke: [
          { label: "Claude Code / OpenCode", code: "/ponytail-debt", language: "text" },
          { label: "ใช้ marker คำอื่นของทีม", code: "/ponytail-debt TODO", language: "text" },
          { label: "Codex CLI / IDE extension", code: "$ponytail:ponytail-debt", language: "text" }
        ],
        examples: [
          {
            title: "Ledger ปกติ",
            prompt: "/ponytail-debt",
            result: "แถวต่อ marker พร้อม ceiling / upgrade และสรุปจำนวนที่ไม่มี trigger"
          },
          {
            title: "Marker ของทีมเอง",
            prompt: "/ponytail-debt TODO",
            result: "grep คำว่า TODO แทน และนับเฉพาะที่ระบุเพดานกับทางอัปเกรด"
          },
          {
            title: "เก็บ ledger ลงไฟล์",
            prompt: "/ponytail-debt แล้วเขียนผลลง PONYTAIL-DEBT.md",
            result: "ค่าเริ่มต้นคือรายงานอย่างเดียว แต่เมื่อขอชัดเจนจึงเขียนไฟล์ ledger"
          }
        ],
        cautions: [
          "hit ที่ไม่ใช่การเลื่อนงาน เช่นโน้ตเรื่อง keyboard shortcut ต้องถูกข้าม",
          "marker ที่ไม่มี trigger คือหนี้ที่จะเน่าเงียบ ต้องถูก tag no-trigger",
          "ค่าเริ่มต้นไม่เขียนไฟล์ใด ๆ ต้องขอให้เขียนก่อน"
        ],
        refs: [
          file("commands/ponytail-debt.toml"),
          file("skills/ponytail-debt/SKILL.md"),
          readme("README — FAQ", "faq")
        ],
        sourcePath: "commands/ponytail-debt.toml"
      },
      {
        id: "ponytail-gain",
        cat: "command",
        type: "command",
        name: "/ponytail-gain",
        summary: "แสดง scoreboard ผลกระทบที่วัดจาก benchmark: โค้ด 47%, token 55%, cost 74%, เวลา 59% ของ baseline",
        overview: "ตัวเลขชุดเดียวกับ README: benchmark แบบ agentic ของ Ponytail 5 บน 39 task (FastAPI + React จริง, bug fix, security/privacy และแอปเล็ก) เทียบ agent เดียวกันที่ไม่มี skill ผลคือบรรทัดโค้ด 47% ของ baseline (ลด 53%), output token 55% (ลด 45%), cost 74% (ลด 26%), เวลา 59% (ลด 41%), hidden check ผ่าน 97% (baseline 96%) และ logic ที่ควรมีเทสได้เทส 98% (baseline 68%) เป็น one-shot ไม่เขียนอะไรลงดิสก์",
        prerequisites: [
          "ไม่ต้องมีอะไรเพิ่ม — เป็นการแสดงผลอย่างเดียว",
          "อ่านตัวเลขเต็มได้ที่ benchmarks/results/2026-10-07-agentic.md"
        ],
        invoke: command("ponytail-gain"),
        examples: [
          {
            title: "ดู scoreboard",
            prompt: "/ponytail-gain",
            result: "แถบ ASCII หกบรรทัดพร้อมตัวเลขเทียบ baseline และชี้ไป /ponytail-debt กับ /ponytail-audit สำหรับตัวเลขจริงของ repo"
          },
          {
            title: "อธิบายให้ทีม",
            prompt: "/ponytail-gain แล้วสรุปเป็นภาษาอังกฤษสั้น ๆ",
            result: "ได้ตัวเลขชุดเดิมพร้อมวิธีวัด (39 task × 5 runs, Opus 5.5)"
          },
          {
            title: "ถามถึง savings ของ repo นี้",
            prompt: "/ponytail-gain ประหยัดโค้ดให้ repo นี้ไปกี่บรรทัด",
            result: "ปฏิเสธการคำนวณต่อ repo และชี้ไปที่ ledger ของ /ponytail-debt กับสิ่งที่ยังตัดได้จาก /ponytail-audit"
          }
        ],
        cautions: [
          "ตัวเลขเป็นค่าเฉลี่ย benchmark ไม่ใช่ repo ที่กำลังทำงานอยู่",
          "ห้ามพิมพ์ตัวเลขประหยัดต่อ repo เพราะเวอร์ชันที่ไม่ได้เขียนไม่มีอยู่จริงให้ลบ",
          "one-shot: ไม่สลับโหมด ไม่เขียน flag file และไม่บันทึกอะไร"
        ],
        refs: [
          file("commands/ponytail-gain.toml"),
          file("benchmarks/results/2026-10-07-agentic.md"),
          readme("README — Numbers", "numbers")
        ],
        sourcePath: "commands/ponytail-gain.toml"
      },
      {
        id: "ponytail-help",
        cat: "command",
        type: "command",
        name: "/ponytail-help",
        summary: "การ์ดอ้างอิงเร็ว: ระดับ lite/full/ultra, คำสั่งทั้งชุด, band, การตั้ง default mode และการอัปเดต",
        overview: "รวมสิ่งที่ต้องใช้บ่อยไว้ที่เดียว: ตารางระดับและสิ่งที่แต่ละระดับเปลี่ยน, ตาราง skill ทั้งหก, วิธีปิด (\"stop ponytail\", \"normal mode\", `/ponytail off`), คำสั่ง band, วิธีตั้ง default mode ด้วย PONYTAIL_DEFAULT_MODE หรือ config file, ลำดับการแก้ค่า (env var > config file > full) และวิธีเปิด auto-update ของ plugin ใน Claude Code เป็น one-shot ที่ไม่เปลี่ยนโหมด",
        prerequisites: [
          "ไม่ต้องมีอะไรเพิ่ม — ใช้เมื่อลืมคำสั่งหรือค่าที่ตั้งไว้"
        ],
        invoke: command("ponytail-help"),
        examples: [
          {
            title: "ลืมคำสั่ง",
            prompt: "/ponytail-help",
            result: "ได้การ์ด levels / skills / band / config / update ครบในครั้งเดียว"
          },
          {
            title: "ลืมวิธีปิด",
            prompt: "/ponytail-help how do I turn it off",
            result: "ชี้ไปที่ stop ponytail, normal mode และ /ponytail off"
          },
          {
            title: "หา auto-update",
            prompt: "/ponytail-help update",
            result: "บอกขั้นตอน /plugin → Marketplaces → ponytail → Enable auto-update แล้ว /reload-plugins"
          }
        ],
        cautions: [
          "one-shot: ไม่สลับโหมดและไม่เขียน flag file",
          "ถ้า /plugin ไม่รู้จัก แปลว่า Claude Code เก่า ต้องอัปเดตก่อนใช้คำสั่งติดตั้ง",
          "การ์ดอธิบายพฤติกรรมบน host ที่ติดตั้งแล้ว บาง host ไม่มี band หรือระดับไม่คงอยู่"
        ],
        refs: [
          file("commands/ponytail-help.toml"),
          file("skills/ponytail-help/SKILL.md")
        ],
        sourcePath: "commands/ponytail-help.toml"
      },

      /* ---------- band: subcommands of /ponytail ---------- */
      {
        id: "band",
        cat: "system",
        type: "command",
        name: "/ponytail band",
        summary: "Claude Code เท่านั้น: ซ่อนหรือแสดงแถบเหนือช่องพิมพ์ที่บอก cost, token, agent time, reuse และผลเทสของงานปัจจุบัน",
        overview: "แถบอยู่เหนือช่องพิมพ์และสรุปงานที่กำลังทำ: ต้นทุนสะสมและต่อเทิร์น จำนวน token และ output token จำนวนเทิร์น agent time อัตราการใช้โค้ดเดิม (reuse) และผลเทสหลังการเปลี่ยนล่าสุด ปุ่มบนแถบสลับระดับได้ สั่ง /ponytail-review หรือ /ponytail-audit คัดลอกงานเป็น Markdown และพับแถบเหลือบรรทัดเดียว `/ponytail band` ไม่ใส่ argument จะสลับ on/off และระดับความเข้มไม่เปลี่ยน ต้องใช้ Claude Code 2.1.290 ขึ้นไป ใน terminal หรือ desktop app",
        prerequisites: [
          "Claude Code 2.1.290 หรือใหม่กว่า",
          "terminal หรือ desktop app (ไม่ใช่ VS Code chat panel, cloud session หรือ claude -p)",
          "node อยู่บน PATH สำหรับ lifecycle hooks"
        ],
        invoke: [
          { label: "สลับเปิด/ปิด", code: "/ponytail band", language: "text" },
          { label: "เปิดตรง ๆ", code: "/ponytail band on", language: "text" },
          {
            label: "ปิดตรง ๆ",
            code: "/ponytail band off",
            language: "text",
            note: "ระดับความเข้มยังเท่าเดิม"
          }
        ],
        examples: [
          {
            title: "ซ่อนแถบ",
            prompt: "/ponytail band off",
            result: "แถบหายไปจากเหนือช่องพิมพ์ แต่ ponytail ยังทำงานที่ระดับเดิม"
          },
          {
            title: "เอาคืน",
            prompt: "/ponytail band",
            result: "ถ้าซ่อนอยู่จะกลับมาแสดง และถ้าแสดงอยู่จะซ่อน"
          },
          {
            title: "ดูประวัติย้อนหลัง",
            prompt: "/ponytail band import",
            result: "เซสชัน Claude Code ที่ผ่านมาถูกเพิ่มเข้า board พร้อม cost, agent time และ token"
          }
        ],
        cautions: [
          "ไม่แสดงใน VS Code chat panel, cloud session หรือ claude -p",
          "ถ้า node ไม่อยู่บน PATH ทุก hook call จะขึ้น node: command not found แต่ skill ยังทำงานได้",
          "การซ่อนแถบไม่เปลี่ยนระดับความเข้ม และไม่ปิด ponytail"
        ],
        refs: [
          file("hooks/band/register.tsx"),
          readme("README — New in 5.3: the band", "new-in-53-the-band")
        ],
        sourcePath: "hooks/band/register.tsx"
      },
      {
        id: "band-import",
        cat: "system",
        type: "command",
        name: "/ponytail band import",
        summary: "นำเซสชัน Claude Code ที่ผ่านมาเข้า board พร้อม cost, agent time และ token",
        overview: "อ่านเซสชันเก่าบนเครื่องแล้วเพิ่มเป็นแถวใน ledger ของ band ซึ่ง board ใช้สร้างหน้า สรุป เซสชันที่อยู่ใน ledger แล้วจะถูกข้าม จึงรันซ้ำได้โดยไม่เกิดข้อมูลซ้ำ งานนี้ทำเป็น background จาก hook จึงเป็นงานที่ใช้เวลาสักครู่ ไม่ใช่คำสั่งที่จบในเทิร์นเดียว ข้อมูลทั้งหมดยังอยู่บนเครื่องใน ~/.config/ponytail/band/",
        prerequisites: [
          "Claude Code ที่มีเซสชันเก่าอยู่ในเครื่อง",
          "band ใช้งานได้ (Claude Code 2.1.290 ขึ้นไป)"
        ],
        invoke: [
          {
            label: "นำเข้าจาก Claude Code",
            code: "/ponytail band import",
            language: "text",
            note: "ทำงานเบื้องหลัง แล้วพิมพ์สรุปจำนวน session ที่พบและแถวที่เพิ่ม"
          }
        ],
        examples: [
          {
            title: "นำเข้าครั้งแรก",
            prompt: "/ponytail band import",
            result: "แถวของเซสชันเก่าถูกเพิ่มใน board พร้อม cost, agent time และ token"
          },
          {
            title: "รันซ้ำหลังทำงานต่อ",
            prompt: "/ponytail band import",
            result: "เฉพาะเซสชันที่ยังไม่มีใน ledger ถูกเพิ่ม ส่วนที่เคยนำเข้าแล้วถูกข้าม"
          },
          {
            title: "สั่งแล้วได้คำตอบทันที",
            prompt: "/ponytail band import",
            result: "hook ตอบทันทีว่ากำลังเพิ่มเซสชันเก่า (cost, agent time, tokens) ลง board ในพื้นหลัง แล้วให้เปิด board ดูในอีกสักครู่"
          }
        ],
        cautions: [
          "เป็น subcommand ของ /ponytail band ไม่ใช่ slash command แยก",
          "ทำงานเบื้องหลัง ต้องรอสักครู่ก่อนเปิด board",
          "ข้อมูลอยู่ในเครื่องที่ ~/.config/ponytail/band/ ไม่ได้อัปโหลดไปที่ไหน เว้นแต่ตั้ง webhook เอง"
        ],
        refs: [
          file("hooks/ponytail-band-import.js"),
          readme("README — New in 5.3: the band", "new-in-53-the-band")
        ],
        sourcePath: "hooks/ponytail-band-import.js"
      },

      /* ---------- board ---------- */
      {
        id: "board",
        cat: "system",
        type: "concept",
        name: "Board",
        summary: "หน้า HTML ภายในเครื่องที่รวมทุกงานข้ามโปรเจกต์: cost, agent time, token, เทสของแต่ละเซสชัน และวันที่ทำงาน",
        overview: "board ถูกสร้างจาก CSV ledger ของ band แล้วเขียนเป็นไฟล์ HTML ไฟล์เดียวที่อ่านซ้ำได้ทุกครั้งที่รีเฟรช มีต้นทุน เวลา agent และ token ของทุกงานย้อนหลัง กราฟเวลาต่อโปรเจกต์ รายการเซสชันล่าสุดพร้อมผลเทส และจำนวนวันทำงานกับสตรีค เปิดจากปุ่ม Board บนแถบ band — ไม่ใช่ slash command ค่าเริ่มต้นข้อมูลอยู่ใน ~/.config/ponytail/band/ บนเครื่อง และไม่มีการส่งออก เว้นแต่ผู้ใช้ตั้ง webhook เอง",
        cautions: [
          "เปิดจากปุ่ม Board บนแถบ ไม่มีคำสั่ง /ponytail board",
          "ต้องมี band และ Claude Code 2.1.290 ขึ้นไปก่อนจึงจะมีข้อมูล",
          "ถ้าตั้ง webhookUrl (และ sendNames) ใน userConfig แถวงานจะถูกส่งออกนอกเครื่อง — ค่าเริ่มต้นคือไม่ส่ง"
        ],
        refs: [
          file("hooks/band/board.ts"),
          file(".claude-plugin/plugin.json"),
          readme("README — New in 5.3: the band", "new-in-53-the-band")
        ],
        sourcePath: "hooks/band/board.ts"
      },

      /* ---------- principles ---------- */
      {
        id: "ladder",
        cat: "concept",
        type: "concept",
        name: "บันได 7 ขั้น",
        summary: "ก่อนเขียนโค้ด หยุดที่ขั้นแรกที่ยังรับได้ ตั้งแต่ \"ต้องมีจริงไหม\" ถึง \"เขียนขั้นต่ำที่ทำงานได้\"",
        overview: "ลำดับที่ ponytail ใช้ตัดสินว่าจะเขียนอะไร: 1 ต้องมีจริงไหม (ตัดฟีเจอร์ option และความยืดหยุ่นที่ไม่มีใครขอ แล้วบอกสิ่งที่ข้ามในหนึ่งบรรทัด) 2 มีอยู่ใน codebase นี้แล้วหรือยัง 3 standard library หรือ platform feature ทำได้ไหม 4 dependency ที่ติดตั้งอยู่แล้ว 5 เขียนเป็นบรรทัดเดียวที่อ่านแล้วเข้าใจได้ไหม 6 ค่อยเขียนขั้นต่ำที่ทำงานได้ ใน SKILL.md ยุบ stdlib กับ platform เป็นขั้นเดียว จึงนับเป็น 6 ข้อ ขั้นบันไดทำงานหลังเข้าใจปัญหา ไม่ใช่แทนการอ่านโค้ด",
        cautions: [
          "บันไดไม่ได้แปลว่าตัดสิ่งที่ผู้ใช้ขอ — สิ่งที่ขอต้องครบ",
          "ถ้าโปรเจกต์มี component หรือ helper ของตัวเองอยู่แล้ว ให้ใช้ของโปรเจกต์ก่อน native widget",
          "การข้ามอะไรเพราะ YAGNI ต้องบอกในหนึ่งบรรทัด ไม่ใช่เงียบ"
        ],
        refs: [
          readme("README — How it works", "how-it-works"),
          file("skills/ponytail/SKILL.md")
        ],
        sourcePath: "skills/ponytail/SKILL.md"
      },
      {
        id: "lazy-not-negligent",
        cat: "concept",
        type: "concept",
        name: "ขี้เกียจ แต่ไม่มักง่าย",
        summary: "ความขี้เกียจหยุดที่ขอบเขตความปลอดภัย: validation, data loss, security และ accessibility ไม่ถูกตัด",
        overview: "ความสั้นไม่ใช่เป้าหมาย — เป้าหมายคือเขียนเท่าที่งานต้องใช้ แล้วห้ามตัดสิ่งที่ไม่ควรตัด: validation ที่ trust boundary, error handling ที่กัน data loss, security, accessibility, calibration ที่ hardware จริงต้องใช้ และสิ่งที่ผู้ใช้ขอ โค้ดที่ย้ายหรือรวมเข้าด้วยกันต้องพา error handling กับ validation ไปด้วย เมื่อมีสองทางที่ขนาดพอ ๆ กัน ให้เลือกทางที่ถูกต้องบน edge case มากกว่า",
        cautions: [
          "ห้ามใช้ความสั้นเป็นเหตุผลตัด validation หรือ error handling",
          "โค้ดที่ merge หรือย้ายต้องคงการตรวจเดิมไว้",
          "ถ้าตัดสินใจตัดอะไรเพราะเชื่อว่าไม่จำเป็น ต้องบอกความเสี่ยงที่เหลือ"
        ],
        refs: [
          readme("README — Numbers", "numbers"),
          file("AGENTS.md")
        ],
        sourcePath: "AGENTS.md"
      },
      {
        id: "one-test",
        cat: "concept",
        type: "concept",
        name: "เทสหนึ่งตัวสำหรับ logic เสี่ยง",
        summary: "logic ที่มี branch, loop, parser, เงิน หรือ security ต้องทิ้งเทสเล็ก ๆ ไว้หนึ่งตัว",
        overview: "ponytail ไม่ได้ขอ coverage แต่ขอหลักฐานหนึ่งชิ้นตรงจุดที่พังแล้วเจ็บ: logic ที่มี branch หรือ loop, parser, เงิน, security, การเขียนข้อมูล หรือ script/app ใหม่ ต้องมีเทสเล็ก ๆ หนึ่งตัวหรือ assert-based self-check ส่วนการเปลี่ยนที่ไม่มีความเสี่ยงไม่ต้องมี ใน benchmark logic ที่ควรมีเทสได้เทส 98% เทียบกับ 68% เมื่อใช้ agent เดียวกันโดยไม่มี skill และเทสที่ agent เขียนจับ injected bug ได้ 66% เทียบกับ 46%",
        cautions: [
          "one good test ไม่ใช่ coverage — อย่าเพิ่มเทสเพื่อตัวเลข",
          "การเปลี่ยน trivial ไม่ต้องมีเทส",
          "bug fix ต้องมีเทสที่ fail ก่อนแก้"
        ],
        refs: [
          readme("README — Numbers", "numbers"),
          file("skills/ponytail/SKILL.md")
        ],
        sourcePath: "skills/ponytail/SKILL.md"
      },
      {
        id: "read-first",
        cat: "concept",
        type: "concept",
        name: "อ่านก่อนตัด",
        summary: "เข้าใจปัญหาก่อนเลือกขั้นบันได: อ่านโค้ดที่การเปลี่ยนไปแตะ ตาม flow จริง และ grep caller ก่อนแก้",
        overview: "ขี้เกียจกับทางแก้ แต่ไม่ขี้เกียจอ่าน ก่อนแตะโค้ดต้องอ่านงานและโค้ดที่มันไปแตะ แล้วไล่ทุกที่ที่การเปลี่ยนต้องไปถึง: caller, เทส, fixture, config, export พร้อมดูว่าการเปลี่ยนอาจทำลายหรือเปิดเผยข้อมูลอะไร และ caller ไหนจะพัง นั่นคือ scope — ฟีเจอร์เกินความต้องการไม่ใช่ scope เวลาแก้บั๊กให้ grep caller ทุกตัวของฟังก์ชันที่จะแก้ แล้วแก้ root cause ครั้งเดียวในโค้ดที่ใช้ร่วมกัน",
        cautions: [
          "อ่านให้พอต่อการตัดสินใจ ไม่ใช่หยุดอ่านเพราะ diff ดูเล็ก",
          "แก้ที่ caller เดียวโดยปล่อยฟังก์ชันร่วมที่ยังพัง ถือว่ายังไม่แก้",
          "scope ต้องรวมเทสและ fixture ที่การเปลี่ยนทำให้พัง ไม่ใช่แค่ไฟล์ที่แก้"
        ],
        refs: [
          readme("README — How it works", "how-it-works"),
          file("AGENTS.md")
        ],
        sourcePath: "AGENTS.md"
      },
      {
        id: "say-what-skipped",
        cat: "concept",
        type: "concept",
        name: "บอกสิ่งที่ข้ามไป",
        summary: "ทุกคำตอบจบด้วยหนึ่งหรือสองบรรทัด: อะไรที่ยังไม่ได้ทำหรือไม่ได้ตรวจ และความเสี่ยงที่ควรรู้",
        overview: "ponytail บังคับให้ทุกคำตอบปิดท้ายด้วยสิ่งที่ข้ามไปหรือยังไม่ได้ตรวจ พร้อมความเสี่ยงที่ผู้ใช้ต้องรู้ เป็นการเปิดเผยขอบเขตของงานแทนที่จะปล่อยให้ความมั่นใจเกินหลักฐาน ใน review และ audit ส่วนนี้อยู่ในหัวข้อ Not checked ซึ่งต้องบอกส่วนที่อ่านไม่ครบหรือรันไม่ได้",
        cautions: [
          "ต้องระบุความเสี่ยงจริงและเฉพาะเจาะจง ไม่ใช่ disclaimer ลอย ๆ",
          "ถ้าตรวจอะไรไม่ได้ ให้บอกว่าไม่ได้ตรวจ ไม่ใช่เดาว่าผ่าน",
          "การบอกสิ่งที่ข้ามไม่ใช่การขอโทษ — เป็นข้อมูลตัดสินใจของผู้ใช้"
        ],
        refs: [
          readme("README — How it works", "how-it-works"),
          file("skills/ponytail/SKILL.md")
        ],
        sourcePath: "skills/ponytail/SKILL.md"
      },
      {
        id: "shortcut-comment",
        cat: "concept",
        type: "concept",
        name: "shortcut: comment",
        summary: "ทางลัดที่มีเพดานต้องมีคอมเมนต์ shortcut: <limit>, <when to upgrade> เพื่อให้ /ponytail-debt ตามกลับมาได้",
        overview: "เมื่อตั้งใจลดความซับซ้อนโดยรู้ว่ามีเพดาน ให้ทิ้งคอมเมนต์รูปแบบ `shortcut: <the limit>, <when to upgrade>` ไว้ในโค้ด รุ่นเก่าอาจใช้ `ponytail:` นำหน้า marker นี้ทำให้การเลื่อนงานเป็นการตัดสินใจที่บันทึกไว้ และเป็นสิ่งที่ /ponytail-debt เก็บเป็น ledger ถ้าทีมใช้คำอื่น ให้ระบุใน CLAUDE.md หรือ AGENTS.md แล้วรัน /ponytail-debt <word>",
        cautions: [
          "marker ที่ไม่มี upgrade path ถูกตีเป็น no-trigger และจะเน่าเงียบ",
          "อย่าติด marker กับการเลื่อนงานทุกอย่าง — ใช้เมื่อมีเพดานจริงและรู้ว่าเมื่อไหร่ต้องกลับมา",
          "ใน review/audit marker ที่ระบุเพดานแล้วไม่ใช่ finding เว้นแต่ load จริงข้ามเพดานนั้นไปแล้ว"
        ],
        refs: [
          readme("README — FAQ", "faq"),
          file("skills/ponytail-debt/SKILL.md")
        ],
        sourcePath: "skills/ponytail-debt/SKILL.md"
      },

      /* ---------- modes ---------- */
      {
        id: "modes",
        cat: "concept",
        type: "concept",
        name: "โหมด lite / full / ultra / off",
        summary: "สี่ระดับความเข้ม ตั้งด้วย /ponytail, PONYTAIL_DEFAULT_MODE หรือ config file โดย default คือ full",
        overview: "lite สร้างตามที่ขอแล้วเสนอทางที่เล็กกว่าในหนึ่งบรรทัด full คือกฎเต็มและเป็นค่าเริ่มต้น ultra เพิ่มการถาม requirement ก่อนลงมือ off คือปิดจนกว่าจะเปิดใหม่ ลำดับค่า default: `PONYTAIL_DEFAULT_MODE` → `~/.config/ponytail/config.json` (Windows: `%APPDATA%\\ponytail\\config.json`) → full ระดับที่เลือกอยู่จนเปลี่ยนหรือจบเซสชัน",
        cautions: [
          "host ที่ไม่มี lifecycle hooks (Gemini, Qwen, Antigravity, Goose, Kimi) ไม่เก็บระดับข้ามเซสชัน",
          "ตั้ง defaultMode เป็น \"off\" เพื่อไม่ให้เปิดเองตอนเริ่มเซสชัน แล้วเปิดเองด้วย /ponytail",
          "env var ชนะ config file เสมอ"
        ],
        refs: [
          file("skills/ponytail/SKILL.md"),
          file("commands/ponytail-help.toml")
        ],
        sourcePath: "skills/ponytail/SKILL.md"
      },

      /* ---------- install ---------- */
      {
        id: "install-claude",
        cat: "install",
        type: "concept",
        name: "ติดตั้ง · Claude Code",
        summary: "เพิ่ม marketplace แล้วติดตั้ง plugin ด้วยสองคำสั่งที่ต้องส่งแยกกัน",
        overview: "เพิ่ม GitHub repo เป็น marketplace ก่อน แล้วจึงติดตั้ง plugin จาก marketplace นั้น สองคำสั่งต้องส่งเป็นคนละ prompt จึงจะทำงาน ใน desktop app ใช้คำสั่งเดิมในช่อง prompt ของแท็บ Code หรือกด + แล้วเลือก Plugins → Add plugin เพื่อเลือกจาก marketplace ที่ตั้งไว้ CodeBuddy ใช้สองคำสั่งเดียวกันและสลับระดับด้วย /ponytail ultra ได้ แต่ไม่มีการฉีดกฎเข้า subagent",
        invoke: [
          { label: "1. เพิ่ม marketplace", code: "/plugin marketplace add DietrichGebert/ponytail", language: "text" },
          {
            label: "2. ติดตั้ง plugin",
            code: "/plugin install ponytail@ponytail",
            language: "text",
            note: "ต้องส่งเป็นสอง prompt แยกกัน คำสั่งเดียวรวมสองขั้นจะไม่ทำงาน"
          }
        ],
        cautions: [
          "ต้องมี node บน PATH ไม่งั้นทุก hook call จะขึ้น node: command not found (skill ยังทำงานได้)",
          "ติดตั้งจาก DietrichGebert/ponytail บน GitHub หรือ @dietrichgebert/ponytail บน npm เท่านั้น — ตัวที่แถม .exe หรือ .dll ไม่ใช่ของจริง",
          "band ต้องใช้ Claude Code 2.1.290 ขึ้นไป"
        ],
        refs: [
          readme("README — Install", "install"),
          file("INSTALL.md"),
          file(".claude-plugin/plugin.json")
        ],
        sourcePath: "INSTALL.md"
      },
      {
        id: "install-codex",
        cat: "install",
        type: "concept",
        name: "ติดตั้ง · Codex",
        summary: "ติดตั้ง plugin ด้วยสองคำสั่งของ codex แล้ว trust lifecycle hooks สองตัวใน /hooks",
        overview: "ใช้ codex CLI เพิ่ม marketplace และติดตั้ง plugin จากนั้นเปิด /hooks ใน Codex เพื่อตรวจและ trust lifecycle hooks สองตัว แล้วเริ่ม thread ใหม่ การติดตั้งชุดเดียวกันนี้ครอบ desktop app ของ Codex ด้วย — รีสตาร์ตแอปหลังติดตั้ง คำสั่ง ponytail ใน Codex เป็น skill ใต้ namespace ของ plugin จึงเรียกด้วย $ponytail:ponytail-review",
        invoke: [
          { label: "1. เพิ่ม marketplace", code: "codex plugin marketplace add DietrichGebert/ponytail", language: "shell" },
          { label: "2. ติดตั้ง plugin", code: "codex plugin add ponytail@ponytail", language: "shell" },
          {
            label: "3. trust hooks",
            code: "/hooks",
            language: "text",
            note: "เปิดใน Codex แล้ว review และ trust lifecycle hooks สองตัว จากนั้นเริ่ม thread ใหม่"
          }
        ],
        cautions: [
          "ถ้าไม่ trust hooks กฎจะไม่ถูกฉีดทุกเทิร์น",
          "คำสั่งเป็น skill ไม่ใช่ slash command: ใช้ $ponytail:<name>",
          "node ต้องอยู่บน PATH เช่นเดียวกับ Claude Code"
        ],
        refs: [
          file("INSTALL.md"),
          readme("README — Install", "install")
        ],
        sourcePath: "INSTALL.md"
      },
      {
        id: "install-other",
        cat: "install",
        type: "concept",
        name: "ติดตั้ง · เอเจนต์อื่น",
        summary: "ใช้ AGENTS.md หรือติดตั้ง skills/ponytail/SKILL.md เป็น skill — มีขั้นตอนแยกทุก host ใน INSTALL.md",
        overview: "ponytail เป็น prompt เดียว: skills/ponytail/SKILL.md สำหรับ host ที่โหลด skill ได้ และ AGENTS.md สำหรับ host ที่อ่าน rules file ทุกเทิร์น เอเจนต์ที่ไม่รองรับ plugin จึงใช้สองไฟล์นี้ตรง ๆ หรือให้ skills CLI คัดลอกทั้งหก skill ไปยังโฟลเดอร์ของ host นั้น INSTALL.md มีคำสั่งแยกสำหรับ Copilot CLI, Cursor, OpenCode, Gemini, Qoder, Devin, Grok, Goose, Pi, Kimi และ OpenClaw",
        invoke: [
          {
            label: "Rules file สำหรับ host ที่อ่าน AGENTS.md",
            code: "AGENTS.md",
            language: "text",
            note: "คัดลอกเข้าโปรเจกต์ หรือให้ agent ติดตั้ง skills/ponytail/SKILL.md เป็น skill"
          },
          {
            label: "ติดตั้งด้วย skills CLI",
            code: "npx skills add DietrichGebert/ponytail",
            language: "shell",
            note: "ติดตั้งเฉพาะ skill ไม่รวม always-on ruleset; เลือก host ด้วย --agent และติดตั้งระดับผู้ใช้ด้วย --global"
          },
          {
            label: "OpenCode",
            code: "opencode plugin add @dietrichgebert/ponytail",
            language: "shell"
          },
          {
            label: "Gemini CLI",
            code: "gemini extensions install https://github.com/DietrichGebert/ponytail",
            language: "shell"
          }
        ],
        cautions: [
          "adapter แบบ instruction-only (Cursor rule, Windsurf, Cline, Copilot Chat, Kiro) ได้ ruleset แต่ไม่มีคำสั่ง",
          "skills CLI ติดตั้งแค่ skill — ถ้าต้องการกฎทุกเทิร์นต้องเพิ่ม AGENTS.md เอง",
          "path ของ rules file ต่างกันต่อ host เช่น .cursor/rules/, .windsurf/rules/, .clinerules/, .kiro/steering/"
        ],
        refs: [
          file("INSTALL.md"),
          file("AGENTS.md"),
          file("skills/ponytail/SKILL.md"),
          file("docs/agent-portability.md")
        ],
        sourcePath: "INSTALL.md"
      }
    ],
    idKey: "id",
    filters: "static",
    unit: "รายการ",
    catLabel: { command: "คำสั่ง", concept: "หลักการ", system: "ระบบ", install: "ติดตั้ง" },
    collection: {
      repo: REPO,
      version: "5.3.2",
      license: "MIT",
      verifiedAt: "2026-10-23"
    }
  };
})();
