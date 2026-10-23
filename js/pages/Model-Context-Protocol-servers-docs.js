/* Page module: Model-Context-Protocol-servers-docs. Verified against modelcontextprotocol/servers (2026-10-23). */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  var REPO = "https://github.com/modelcontextprotocol/servers";

  function ref(name) {
    return [{ label: "README ของเซิร์ฟเวอร์บน GitHub", href: REPO + "/blob/main/src/" + name + "/README.md" }];
  }

  function config(name, command, args, env) {
    var servers = {};
    servers[name] = { command: command, args: args };
    if (env) servers[name].env = env;
    return JSON.stringify({ mcpServers: servers }, null, 2);
  }

  NS.pages["Model-Context-Protocol-servers-docs"] = {
    data: [
      {
        id: "filesystem",
        cat: "files",
        type: "server",
        name: "Filesystem",
        summary: "อ่าน เขียน ค้นหา และจัดการไฟล์ในโฟลเดอร์ที่อนุญาตเท่านั้น",
        overview: "เซิร์ฟเวอร์อ้างอิงสำหรับปฏิบัติการไฟล์ ได้แก่ list, read, write, edit, move, search และรับ metadata ภายใต้ขอบเขตโฟลเดอร์ที่กำหนดผ่าน argument หรือ MCP Roots ใช้เมื่อ agent ต้องทำงานกับไฟล์ในเครื่องโดยไม่ให้เข้าถึงทั้งดิสก์",
        prerequisites: [
          "Node.js และ npx",
          "ระบุ absolute path ของโฟลเดอร์ที่อนุญาตอย่างน้อยหนึ่งโฟลเดอร์",
          "บน Windows ให้เรียก npx ผ่าน cmd /c ใน config"
        ],
        invoke: [
          {
            label: "เริ่มเซิร์ฟเวอร์",
            code: "npx -y @modelcontextprotocol/server-filesystem C:\\Users\\User\\Documents",
            language: "shell"
          },
          {
            label: "MCP config",
            code: config("filesystem", "npx", ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\User\\Documents"]),
            language: "json",
            note: "บน Windows ใช้ \"command\": \"cmd\", \"args\": [\"/c\", \"npx\", ...]"
          }
        ],
        examples: [
          {
            title: "สำรวจโปรเจกต์",
            prompt: "ผ่าน Filesystem: ช่วยดูว่ามีไฟล์อะไรบ้างในโฟลเดอร์ src และสรุปโครงสร้าง",
            result: "agent เรียก list_directory และอ่านเฉพาะไฟล์ที่ต้องการ"
          },
          {
            title: "แก้ไฟล์ตรงจุด",
            prompt: "ผ่าน Filesystem: เปลี่ยนชื่อฟังก์ชัน parseConfig เป็น loadConfig ในไฟล์ config.js",
            result: "agent อ่านไฟล์ก่อน แล้วแก้เฉพาะช่วงที่ตรงกัน"
          },
          {
            title: "ค้นหาไฟล์",
            prompt: "ผ่าน Filesystem: หาไฟล์ทั้งหมดที่มีคำว่า TODO ในโฟลเดอร์ docs",
            result: "agent ใช้ search_files ภายใต้ขอบเขตที่อนุญาต"
          }
        ],
        cautions: [
          "ไม่กำหนดโฟลเดอร์จะเริ่มไม่ทำงาน เพราะไม่มี default directory",
          "ให้สิทธิ์กว้างเกินไปเท่ากับให้ agent เข้าถึงไฟล์ส่วนตัว ควรจำกัด path",
          "เป็น reference implementation ไม่ได้ออกแบบมาสำหรับ production โดยตรง"
        ],
        refs: ref("filesystem"),
        sourcePath: "src/filesystem/README.md"
      },
      {
        id: "git",
        cat: "files",
        type: "server",
        name: "Git",
        summary: "อ่านประวัติ diff สถานะ และกระทำคำสั่ง git ผ่านเครื่องมือ",
        overview: "ให้ agent ตรวจ history, diff, status, log และอ่านเนื้อหาไฟล์ใน repository ผ่าน tools แทนการรัน shell ตรง ๆ ลดความเสี่ยงจากการประกอบคำสั่งเอง และทำให้เห็นบริบทของ branch ก่อนแก้โค้ด",
        prerequisites: [
          "Python 3.10+ และ uv/uvx",
          "ระบุ repository ด้วย --repository หรือส่ง repo_path ในแต่ละ call"
        ],
        invoke: [
          {
            label: "เริ่มเซิร์ฟเวอร์",
            code: "uvx mcp-server-git --repository C:\\Users\\User\\Documents\\GitHub\\mcps",
            language: "shell"
          },
          {
            label: "MCP config",
            code: config("git", "uvx", ["mcp-server-git", "--repository", "C:\\Users\\User\\Documents\\GitHub\\mcps"]),
            language: "json"
          }
        ],
        examples: [
          {
            title: "ดูการเปลี่ยนแปลง",
            prompt: "ผ่าน Git: สรุปว่า branch นี้เปลี่ยนอะไรบ้างเทียบกับ main",
            result: "agent เรียก git_diff และ git_log แล้วสรุปเป็นประเด็น"
          },
          {
            title: "ตรวจสถานะ",
            prompt: "ผ่าน Git: ตอนนี้มีไฟล์ไหนแก้ค้างและยังไม่ commit",
            result: "agent เรียก git_status และอ่านรายการไฟล์"
          },
          {
            title: "ดูประวัติไฟล์",
            prompt: "ผ่าน Git: ไฟล์ auth.ts ถูกแก้ล่าสุดเมื่อไหร่และโดย commit ไหน",
            result: "agent ใช้ git_log กับ path แล้วอ้าง commit"
          }
        ],
        cautions: [
          "อย่าให้ agent รันคำสั่งทำลายประวัติโดยไม่ยืนยัน",
          "ถ้าไม่ระบุ repository ต้องส่ง repo_path ทุกครั้ง",
          "บน Windows บางคำสั่ง git ต้องมี Git for Windows อยู่ใน PATH"
        ],
        refs: ref("git"),
        sourcePath: "src/git/README.md"
      },
      {
        id: "fetch",
        cat: "context",
        type: "server",
        name: "Fetch",
        summary: "ดึงหน้าเว็บและแปลงเป็น markdown เพื่อให้ agent อ่านเนื้อหา",
        overview: "ใช้เมื่อ agent ต้องอ่านหน้าเอกสาร บทความ หรือหน้า API ที่ไม่ได้อยู่ในเครื่อง เซิร์ฟเวอร์ดึง HTML แล้วแปลงเป็น markdown พร้อมรองรับ robots.txt และ user agent ที่กำหนดได้ ช่วยลดการเดาเนื้อหาจาก URL",
        prerequisites: [
          "Python 3.10+ และ uv/uvx",
          "การเข้าถึงเครือข่ายจากเครื่องที่รันเซิร์ฟเวอร์"
        ],
        invoke: [
          {
            label: "เริ่มเซิร์ฟเวอร์",
            code: "uvx mcp-server-fetch",
            language: "shell"
          },
          {
            label: "MCP config",
            code: config("fetch", "uvx", ["mcp-server-fetch"]),
            language: "json",
            note: "เพิ่ม --ignore-robots-txt เฉพาะเมื่อมีสิทธิ์และเข้าใจความเสี่ยง"
          }
        ],
        examples: [
          {
            title: "อ่านเอกสาร",
            prompt: "ผ่าน Fetch: ช่วยอ่านหน้า https://example.com/api และสรุปพารามิเตอร์ที่ต้องใช้",
            result: "agent fetch หน้าเว็บและสรุปเป็นหัวข้อ"
          },
          {
            title: "เทียบเอกสารสองเวอร์ชัน",
            prompt: "ผ่าน Fetch: เทียบ API reference ของ v1 กับ v2 ว่าอะไรถูกเลิกใช้",
            result: "agent ดึงสองหน้าและเปรียบเทียบรายการ"
          },
          {
            title: "ตรวจหน้า release",
            prompt: "ผ่าน Fetch: ดู release notes ล่าสุดว่ามี breaking change อะไร",
            result: "agent fetch หน้า release แล้วสรุปเฉพาะรายการที่กระทบโปรเจกต์"
          }
        ],
        cautions: [
          "ค่าเริ่มต้นเคารพ robots.txt อย่าปิดโดยไม่จำเป็น",
          "เซิร์ฟเวอร์เข้าถึง local หรือ internal IP ได้ ถือเป็นความเสี่ยงด้าน SSRF",
          "เนื้อหาบางหน้าเรนเดอร์ด้วย JavaScript และอาจได้ผลไม่ครบ"
        ],
        refs: ref("fetch"),
        sourcePath: "src/fetch/README.md"
      },
      {
        id: "time",
        cat: "context",
        type: "server",
        name: "Time",
        summary: "บอกเวลาปัจจุบันและแปลงเวลาระหว่าง timezone",
        overview: "ให้ agent ถามเวลาปัจจุบันหรือแปลงเวลาข้ามเขตได้โดยไม่ต้องเดา ช่วยงาน scheduling, log และการตีความ timestamp ที่ระบุ timezone ต่างกัน รองรับการตั้ง timezone ท้องถิ่นผ่าน argument หรือ environment",
        prerequisites: [
          "Python 3.10+ และ uv/uvx",
          "รู้ timezone เริ่มต้นที่ต้องการ เช่น Asia/Bangkok"
        ],
        invoke: [
          {
            label: "เริ่มเซิร์ฟเวอร์",
            code: "uvx mcp-server-time --local-timezone=Asia/Bangkok",
            language: "shell"
          },
          {
            label: "MCP config",
            code: config("time", "uvx", ["mcp-server-time", "--local-timezone=Asia/Bangkok"]),
            language: "json"
          }
        ],
        examples: [
          {
            title: "เวลาปัจจุบัน",
            prompt: "ผ่าน Time: ตอนนี้เวลากี่โมงที่กรุงเทพฯ",
            result: "agent เรียก tool แล้วตอบพร้อม timezone"
          },
          {
            title: "แปลงเวลา",
            prompt: "ผ่าน Time: ประชุม 9:00 UTC ตรงกับกี่โมงที่กรุงเทพฯ",
            result: "agent แปลงและอธิบาย offset"
          },
          {
            title: "ตีความ log",
            prompt: "ผ่าน Time: log นี้เป็นเวลา 2026-10-23T02:00:00Z หมายถึงกี่โมงบ้านเรา",
            result: "agent แปลงเป็น Asia/Bangkok และระบุวันที่"
          }
        ],
        cautions: [
          "ถ้าไม่ตั้ง timezone จะใช้ค่าของระบบ ซึ่งอาจไม่ตรงกับผู้ใช้",
          "อย่าใช้เวลาจากโมเดลแทนการเรียก tool เมื่อต้องการความแม่นยำ"
        ],
        refs: ref("time"),
        sourcePath: "src/time/README.md"
      },
      {
        id: "memory",
        cat: "mind",
        type: "server",
        name: "Memory",
        summary: "เก็บความรู้เป็น knowledge graph ข้ามเซสชันด้วยไฟล์ JSONL",
        overview: "ให้ agent สร้าง entity, relation และ observation แล้วเรียกคืนภายหลังได้ เหมาะกับความชอบของผู้ใช้ บริบทโปรเจกต์ และข้อเท็จจริงที่ไม่อยากให้หายเมื่อจบเซสชัน ข้อมูลเก็บในไฟล์ JSONL ที่กำหนด path ได้",
        prerequisites: [
          "Node.js และ npx",
          "กำหนด MEMORY_FILE_PATH หากไม่ต้องการใช้ memory.jsonl ในโฟลเดอร์ทำงาน"
        ],
        invoke: [
          {
            label: "เริ่มเซิร์ฟเวอร์",
            code: "npx -y @modelcontextprotocol/server-memory",
            language: "shell",
            note: "ตั้ง MEMORY_FILE_PATH ใน environment หรือใน config ด้านล่าง"
          },
          {
            label: "MCP config",
            code: config("memory", "npx", ["-y", "@modelcontextprotocol/server-memory"], { MEMORY_FILE_PATH: "C:\\Users\\User\\.mcp\\memory.jsonl" }),
            language: "json"
          }
        ],
        examples: [
          {
            title: "จำบริบทโปรเจกต์",
            prompt: "ผ่าน Memory: จำไว้ว่าโปรเจกต์นี้ใช้ pnpm และห้ามเพิ่ม dependency ใหม่",
            result: "agent สร้าง entity/observation ใน memory"
          },
          {
            title: "เรียกคืนความชอบ",
            prompt: "ผ่าน Memory: ผู้ใช้คนนี้ชอบคำตอบภาษาไทยแบบสั้นหรือยาว",
            result: "agent ค้น memory แล้วตอบจากข้อมูลที่เคยเก็บ"
          },
          {
            title: "เชื่อมความสัมพันธ์",
            prompt: "ผ่าน Memory: จำว่า service A เรียก service B ผ่าน queue ชื่อ events",
            result: "agent สร้าง relation ระหว่างสอง entity"
          }
        ],
        cautions: [
          "ข้อมูลอาจมีข้อมูลส่วนตัว ควรเลือก path และสิทธิ์การเข้าถึงให้เหมาะสม",
          "อย่าเก็บความลับหรือ token ลงใน memory",
          "Memory ไม่ใช่ฐานข้อมูลกลางสำหรับทีม ไฟล์แยกตามเครื่อง"
        ],
        refs: ref("memory"),
        sourcePath: "src/memory/README.md"
      },
      {
        id: "sequentialthinking",
        cat: "mind",
        type: "server",
        name: "Sequential Thinking",
        summary: "ให้ agent คิดเป็นขั้น ติดตามสมมติฐาน และแก้ไขแผนได้ระหว่างทาง",
        overview: "เครื่องมือสำหรับแบ่งปัญหาซับซ้อนเป็นขั้นคิดที่ตรวจสอบได้ แต่ละขั้นมีหมายเลข มีการทบทวนสมมติฐาน และสามารถแตกแขนงหรือย้อนกลับได้ เหมาะกับงานวางแผนและวิเคราะห์ที่ต้องการร่องรอยการคิด ไม่ใช่คำตอบสุดท้าย",
        prerequisites: [
          "Node.js และ npx",
          "ไม่ต้องใช้ API key"
        ],
        invoke: [
          {
            label: "เริ่มเซิร์ฟเวอร์",
            code: "npx -y @modelcontextprotocol/server-sequential-thinking",
            language: "shell"
          },
          {
            label: "MCP config",
            code: config("sequential-thinking", "npx", ["-y", "@modelcontextprotocol/server-sequential-thinking"]),
            language: "json",
            note: "ตั้ง DISABLE_THOUGHT_LOGGING=true หากไม่ต้องการ log ขั้นคิด"
          }
        ],
        examples: [
          {
            title: "วางแผน migration",
            prompt: "ผ่าน Sequential Thinking: ช่วยคิดทีละขั้นว่าจะย้ายฐานข้อมูลโดยไม่มี downtime ได้อย่างไร",
            result: "agent ใช้ขั้นคิดแยกสมมติฐานและความเสี่ยงก่อนสรุปแผน"
          },
          {
            title: "วิเคราะห์ trade-off",
            prompt: "ผ่าน Sequential Thinking: ช่วยเปรียบเทียบ monorepo กับหลาย repo สำหรับทีม 8 คน",
            result: "agent แตกเกณฑ์ตัดสินและตรวจสมมติฐานทีละข้อ"
          },
          {
            title: "แก้โจทย์ซับซ้อน",
            prompt: "ผ่าน Sequential Thinking: ช่วยคิดวิธี reconcile ข้อมูลลูกค้าที่ชื่อซ้ำกัน",
            result: "agent ทบทวนสมมติฐานและปรับแนวทางเมื่อเจอข้อมูลใหม่"
          }
        ],
        cautions: [
          "เป็นเครื่องมือช่วยคิด ไม่ได้ตรวจความจริงแทนแหล่งข้อมูล",
          "อย่าเปิด log ขั้นคิดในสภาพแวดล้อมที่มีข้อมูลอ่อนไหว",
          "เป็น reference implementation ไม่ได้แปลว่าเหมาะกับ production ทุกกรณี"
        ],
        refs: ref("sequentialthinking"),
        sourcePath: "src/sequentialthinking/README.md"
      },
      {
        id: "everything",
        cat: "protocol",
        type: "server",
        name: "Everything",
        summary: "เซิร์ฟเวอร์ทดสอบที่เปิดทุกฟีเจอร์ของ MCP ทั้ง tools, resources และ prompts",
        overview: "ใช้ตรวจว่า MCP client ของคุณรองรับฟีเจอร์ครบหรือไม่ มี tool ตัวอย่าง resource หลายชนิด prompt และการทดสอบ transport ทั้ง stdio, SSE และ streamable HTTP เหมาะกับงานพัฒนา client หรือ debug การเชื่อมต่อ ไม่ใช่เซิร์ฟเวอร์สำหรับงานจริง",
        prerequisites: [
          "Node.js และ npx",
          "รู้ transport ที่ client รองรับ"
        ],
        invoke: [
          {
            label: "เริ่มแบบ stdio",
            code: "npx -y @modelcontextprotocol/server-everything stdio",
            language: "shell"
          },
          {
            label: "MCP config",
            code: config("everything", "npx", ["-y", "@modelcontextprotocol/server-everything", "stdio"]),
            language: "json"
          },
          {
            label: "transport อื่น",
            code: "npx -y @modelcontextprotocol/server-everything sse\nnpx -y @modelcontextprotocol/server-everything streamableHttp",
            language: "shell"
          }
        ],
        examples: [
          {
            title: "ทดสอบ client",
            prompt: "ผ่าน Everything: ช่วยตรวจว่า client นี้เรียก tool และอ่าน resource ได้ครบไหม",
            result: "agent เรียก tool ตัวอย่างและรายงานฟีเจอร์ที่ไม่ทำงาน"
          },
          {
            title: "ทดสอบ transport",
            prompt: "ผ่าน Everything: ลองเชื่อมต่อด้วย stdio แล้วดูว่า handshake ผ่านไหม",
            result: "ได้ผลการเชื่อมต่อและ error ที่ชัดเจนหากล้มเหลว"
          },
          {
            title: "ดู prompt ตัวอย่าง",
            prompt: "ผ่าน Everything: มี prompt อะไรให้ทดสอบบ้าง ช่วยลองหนึ่งอัน",
            result: "agent แสดง prompt ที่เซิร์ฟเวอร์เปิดให้และทดลองเรียก"
          }
        ],
        cautions: [
          "ใช้สำหรับทดสอบเท่านั้น อย่าเปิดใน production",
          "บาง transport ต้องมี URL หรือ port และอาจไม่รองรับบน client ทุกตัว"
        ],
        refs: ref("everything"),
        sourcePath: "src/everything/README.md"
      }
    ],
    idKey: "id",
    unit: "เซิร์ฟเวอร์",
    catLabel: { files: "ไฟล์และโค้ด", context: "เว็บและเวลา", mind: "ความจำและการคิด", protocol: "ทดสอบโปรโตคอล" },
    collection: {
      repo: REPO,
      version: "0.6.2",
      license: "MIT / Apache-2.0",
      verifiedAt: "2026-10-23"
    }
  };
})();
