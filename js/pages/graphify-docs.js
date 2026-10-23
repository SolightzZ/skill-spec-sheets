/* Page module: graphify-docs. Verified against Graphify-Labs/graphify 0.9.93 (2026-10-23). */
(function () {
  "use strict";
  const NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};

  const REPO = "https://github.com/Graphify-Labs/graphify";

  /* Repo default branch is v8, but js/core/render.js builds source links as
     /blob/main/<sourcePath>. main is an older line (2026-05) where several
     files below do not exist, so collection.repo stays empty and every item
     carries an explicit v8 link in refs instead. */
  function file(path, label) {
    return { label: label, href: REPO + "/blob/v8/" + path };
  }

  function docs(path, label) {
    return { label: label, href: "https://docs.graphify.com/" + path };
  }

  NS.pages["graphify-docs"] = {
    data: [
      {
        id: "graphify-root",
        cat: "pipeline",
        type: "command",
        name: "/graphify .",
        summary: "สร้าง knowledge graph ของโฟลเดอร์ปัจจุบัน พร้อม HTML, report และ JSON",
        overview: "สกิลตรวจ `graphify-out/graph.json` ก่อน ถ้ามีและเป็นคำถามเกี่ยวกับโค้ด จะข้ามไป `graphify query` ถ้ายังไม่มีจะเดิน pipeline: detect ไฟล์, parse โค้ดด้วย tree-sitter (ไม่เรียก LLM), ทำ semantic pass เฉพาะ docs/PDF/รูป/วิดีโอ แล้ว merge เป็นกราฟเดียวพร้อม community detection ผลลัพธ์คือ `graph.html`, `GRAPH_REPORT.md` และ `graph.json` ใต้ `graphify-out/`",
        prerequisites: [
          "Python 3.10+ และติดตั้งแพ็กเกจ `graphifyy` แล้ว",
          "รัน `graphify install` เพื่อลงทะเบียน skill ให้ assistant",
          "assistant ที่โหลด skill `/graphify` ได้"
        ],
        invoke: [
          { label: "โฟลเดอร์ปัจจุบัน", code: "/graphify ." },
          { label: "ระบุ path เอง", code: "/graphify <path>" }
        ],
        examples: [
          {
            title: "สร้างกราฟครั้งแรก",
            prompt: "/graphify .",
            result: "ได้ `graphify-out/` พร้อม `graph.html`, `GRAPH_REPORT.md` และ `graph.json`"
          },
          {
            title: "โปรเจกต์ที่มีแต่โค้ด",
            prompt: "/graphify ./src",
            result: "parse เฉพาะโฟลเดอร์ src ด้วย AST ในเครื่อง ไม่ต้องใช้ API key"
          },
          {
            title: "กราฟมีอยู่แล้ว",
            prompt: "/graphify . ฟังก์ชัน `parse_config` ถูกเรียกจากที่ไหน",
            result: "สกิลเห็น `graph.json` จึงเรียก `graphify query` ทันทีโดยไม่ rebuild"
          }
        ],
        cautions: [
          "semantic pass ของ docs/PDF/รูป/วิดีโอใช้โมเดลของ assistant หรือ API key ที่ตั้งไว้ จึงมีค่าใช้จ่าย token ต่างจาก code-only",
          "ไฟล์จำนวนมากทำให้รอบแรกนาน ถ้าต้องการแค่โค้ดให้ใช้ `graphify extract . --code-only`",
          "อย่าลบ `graphify-out/` ระหว่างทาง เพราะ `query`, `path` และ `explain` อ่านจาก `graph.json`"
        ],
        refs: [
          file("graphify/skill.md", "สกิล /graphify — Usage"),
          docs("quickstart", "Quickstart"),
          docs("concepts/supported-inputs", "Supported inputs")
        ],
        sourcePath: "graphify/skill.md"
      },
      {
        id: "graphify-path",
        cat: "pipeline",
        type: "command",
        name: "/graphify <path>",
        summary: "สร้างกราฟจาก path ที่ระบุ หรือ clone GitHub repo ก่อนสร้าง",
        overview: "ใช้เมื่อไม่ได้อยู่ที่ root ของโปรเจกต์ หรืออยากสร้างกราฟจากโฟลเดอร์ย่อย เช่น `./docs` หรือ service ใด service หนึ่ง ถ้า argument เป็น URL ของ GitHub สกิลจะ clone repo ลงเครื่องแล้วรัน pipeline บน path ที่ได้ และรับหลาย URL หรือหลาย path เพื่อสร้างกราฟแยกแล้ว merge เป็น cross-repo graph เดียวได้",
        prerequisites: [
          "path ปลายทางมีอยู่จริง หรือเป็น URL ของ GitHub repo",
          "สำหรับ URL ต้องมี network และ git ในเครื่อง",
          "มีพื้นที่พอสำหรับ `graphify-out/` และ repo ที่ clone"
        ],
        invoke: [
          { label: "path ในเครื่อง", code: "/graphify <path>" },
          { label: "GitHub repo", code: "/graphify https://github.com/<owner>/<repo>" },
          { label: "หลาย URL รวมเป็นกราฟเดียว", code: "/graphify <url1> <url2> ..." }
        ],
        examples: [
          {
            title: "โฟลเดอร์เอกสาร",
            prompt: "/graphify ./docs",
            result: "กราฟของ docs ทั้งโฟลเดอร์ โดยไม่ปนกับโค้ดที่เหลือ"
          },
          {
            title: "monorepo บางส่วน",
            prompt: "/graphify services/billing",
            result: "สร้างกราฟเฉพาะ service นั้น ไม่ต้อง scan ทั้ง monorepo"
          },
          {
            title: "repo บน GitHub",
            prompt: "/graphify https://github.com/Graphify-Labs/graphify",
            result: "สกิล clone repo แล้วสร้างกราฟบน path ที่ clone มาให้"
          }
        ],
        cautions: [
          "`--mode deep` เพิ่ม INFERRED edge ที่กว้างขึ้น แต่ใช้ token และเวลามากกว่าปกติ",
          "หลาย URL ในคำสั่งเดียวจะถูกรวมเป็นกราฟเดียว ตรวจว่าต้องการแยกหรือรวมก่อนรัน",
          "URL ของ GitHub จะถูก clone ด้วย branch default ถ้าต้องการ branch อื่นให้ใส่ `--branch <branch>`"
        ],
        refs: [
          file("graphify/skill.md", "สกิล /graphify — Usage"),
          file("graphify/install.py", "install.py — clone/install flow"),
          docs("quickstart", "Quickstart")
        ],
        sourcePath: "graphify/skill.md"
      },
      {
        id: "graphify-update",
        cat: "pipeline",
        type: "command",
        name: "/graphify ./docs --update",
        summary: "re-extract เฉพาะไฟล์ใหม่หรือที่เปลี่ยน โดยใช้ cache จาก hash ของเนื้อหา",
        overview: "เมื่อกราฟมีอยู่แล้ว `--update` จะเทียบไฟล์กับ cache ที่เก็บ hash ของเนื้อหา (SHA256) และ manifest แล้ว re-extract เฉพาะไฟล์ที่ใหม่หรือเปลี่ยน ทำให้กราฟตามทันโดยไม่ต้องเสียแรงทั้งโปรเจกต์ โหนด semantic เดิมของไฟล์ที่ไม่ได้แก้จะถูกเก็บไว้ ไม่ถูกสร้างทับ",
        prerequisites: [
          "มี `graphify-out/graph.json` จากรอบก่อนแล้ว",
          "ไฟล์ที่เปลี่ยนต้องถูกอ่านได้ และมีสิทธิ์เขียน `graphify-out/`"
        ],
        invoke: [
          { label: "อัปเดตเฉพาะโฟลเดอร์ docs", code: "/graphify ./docs --update" },
          { label: "อัปเดตทั้งโปรเจกต์", code: "/graphify . --update" }
        ],
        examples: [
          {
            title: "เพิ่มเอกสารใหม่",
            prompt: "/graphify ./docs --update",
            result: "มีโหนดของเอกสารใหม่ โดยไฟล์ที่ไม่ได้แก้ไม่ถูกประมวลผลซ้ำ"
          },
          {
            title: "แก้ README หลายไฟล์",
            prompt: "/graphify . --update",
            result: "เฉพาะ README ที่เปลี่ยนถูกส่งเข้า semantic pass อีกครั้ง"
          },
          {
            title: "หลัง refactor ที่ลบโค้ด",
            prompt: "/graphify . --update",
            result: "ถ้ากราฟใหม่มีโหนดน้อยลงจนน่าสงสัย ให้ใช้ `graphify update . --force` จาก CLI"
          }
        ],
        cautions: [
          "`--update` ผ่านสกิลเท่านั้นที่จัดการ docs/PDF/รูปได้ ส่วน `graphify update .` จาก CLI ทำเฉพาะโค้ด",
          "ไฟล์ที่ถูกอ่านไม่ครบจะถูก cache เป็น partial และถูกดึงมาทำใหม่ใน `--update` รอบถัดไป",
          "หลังลบโค้ดจำนวนมาก ต้องใช้ `--force` ไม่งั้น graphify อาจปฏิเสธการเขียนทับกราฟที่เล็กลง"
        ],
        refs: [
          file("graphify/skill.md", "สกิล /graphify — Usage"),
          file("graphify/cache.py", "cache.py — content hash cache"),
          docs("reference/configuration", "Configuration")
        ],
        sourcePath: "graphify/cache.py"
      },
      {
        id: "graphify-add",
        cat: "pipeline",
        type: "command",
        name: "/graphify add <url>",
        summary: "ดึง paper บทความ หรือวิดีโอเข้า corpus แล้วอัปเดตกราฟ",
        overview: "`add` fetch URL ไปเก็บไว้ที่ `./raw` แล้วบอกให้อัปเดตกราฟต่อ รองรับ paper, บทความ, ไฟล์ PDF และวิดีโอ YouTube ซึ่งถูกถอดเสียงในเครื่องด้วย faster-whisper ใช้ `--author` และ `--contributor` เพื่อติด tag ที่มาของเนื้อหา และ `--dir` เพื่อเปลี่ยนโฟลเดอร์ปลายทาง",
        prerequisites: [
          "URL ที่เข้าถึงได้จากเครื่อง",
          "วิดีโอ/เสียงต้องติดตั้ง extra `video` (faster-whisper + yt-dlp)",
          "มีกราฟเดิมหรือพร้อมสร้างใหม่หลังเพิ่มไฟล์"
        ],
        invoke: [
          { label: "เพิ่ม paper", code: "/graphify add https://arxiv.org/abs/1706.03762" },
          { label: "ติด tag ผู้เขียน", code: "/graphify add <url> --author \"Name\"" },
          { label: "เปลี่ยนโฟลเดอร์เก็บไฟล์", code: "graphify add <url> --dir ./raw" }
        ],
        examples: [
          {
            title: "เพิ่มเปเปอร์",
            prompt: "/graphify add https://arxiv.org/abs/1706.03762",
            result: "ไฟล์ถูกเก็บใน `./raw` แล้วกราฟมีโหนดของเปเปอร์นั้น"
          },
          {
            title: "เพิ่มวิดีโอ",
            prompt: "/graphify add <youtube-url>",
            result: "เสียงถูกถอดในเครื่องแล้วเนื้อหาถูก map เข้ากราฟเดียวกับโค้ด"
          },
          {
            title: "ระบุที่มา",
            prompt: "/graphify add <url> --contributor \"team-docs\"",
            result: "โหนดที่ได้มี tag ผู้เพิ่มเนื้อหาไว้ตรวจย้อนหลัง"
          }
        ],
        cautions: [
          "หลัง `graphify add` ต้องรัน `/graphify --update` ต่อ ไม่งั้นกราฟยังไม่เห็นไฟล์ใหม่",
          "ไฟล์ใน `./raw` ถูกเขียนลง repo ตรวจ `.gitignore` ก่อน commit",
          "การถอดวิดีโอต้องใช้ extra `video` และอาจใช้เวลานานตามความยาวคลิป"
        ],
        refs: [
          file("graphify/cli.py", "cli.py — add"),
          file("graphify/ingest.py", "ingest.py"),
          docs("concepts/supported-inputs", "Supported inputs")
        ],
        sourcePath: "graphify/ingest.py"
      },
      {
        id: "graphify-query",
        cat: "query",
        type: "command",
        name: "/graphify query \"...\"",
        summary: "ถามคำถามภาษาธรรมชาติกับกราฟ แล้วตอบจาก subgraph ที่เกี่ยวข้อง",
        overview: "เป็น fast path ของสกิล เมื่อมี `graph.json` อยู่แล้ว คำถามเกี่ยวกับโค้ดจะถูกแปลงเป็น `graphify query` ทันที ไม่ detect ไฟล์ใหม่และไม่ rebuild ก่อน traverse สกิลจะขยายคำถามให้ตรงกับคำศัพท์ในกราฟ แล้วเดินแบบ BFS (หรือ DFS ด้วย `--dfs`) ภายใต้ budget คำตอบต้องอ้างจากกราฟเท่านั้น และ quote `source_location` เมื่ออ้างข้อเท็จจริงเฉพาะ",
        prerequisites: [
          "มี `graphify-out/graph.json`",
          "คำถามเกี่ยวกับเนื้อหาที่อยู่ในกราฟ ไม่ใช่คำถามทั่วไป"
        ],
        invoke: [
          { label: "คำถามกว้าง (BFS)", code: "/graphify query \"what connects auth to the database?\"" },
          { label: "ตามเส้นทางเดียว (DFS)", code: "/graphify query \"<question>\" --dfs" },
          { label: "จำกัด token", code: "/graphify query \"<question>\" --budget 1500" }
        ],
        examples: [
          {
            title: "หาความเชื่อมโยง",
            prompt: "/graphify query \"what connects auth to the database?\"",
            result: "ได้ subgraph ของโหนดที่เกี่ยวข้องพร้อม edge และ source location"
          },
          {
            title: "ไล่เส้นทางเดียว",
            prompt: "/graphify query \"how does a request reach the payment worker?\" --dfs",
            result: "DFS ไล่ลึกตามเส้นทางเดียวแทนการกระจายรอบโหนด"
          },
          {
            title: "คำตอบยาวเกิน",
            prompt: "/graphify query \"list every module that touches billing\" --budget 1500",
            result: "เอาต์พุตถูกตัดตาม budget โดยยังคงโหนดที่เกี่ยวข้องที่สุด"
          }
        ],
        cautions: [
          "คำถามที่กว้างเกินไปจะได้ subgraph กระจัดกระจาย ให้ระบุชื่อ subsystem หรือ symbol",
          "อย่าถามเรื่องที่ไม่มีในกราฟ เช่น สถานะ deploy ล่าสุด เพราะกราฟไม่มีข้อมูลนั้น",
          "ถ้า CLI ใช้งานไม่ได้ สกิลจะ fallback ไป traverse `graph.json` ด้วย NetworkX ให้ผลใกล้เคียงแต่ช้ากว่า"
        ],
        refs: [
          file("graphify/skill.md", "สกิล /graphify — Usage"),
          docs("guides/querying", "Ask better graph questions"),
          docs("reference/query", "Query reference")
        ],
        sourcePath: "graphify/skill.md"
      },
      {
        id: "graphify-cli-query",
        cat: "query",
        type: "cli",
        name: "graphify query \"...\"",
        summary: "ถามกราฟจาก terminal โดยตรง พร้อม exit code สำหรับสคริปต์",
        overview: "ทำงานบน `graph.json` เหมือนเวอร์ชันใน assistant แต่เรียกจาก terminal ได้ เหมาะกับสคริปต์และ CI เพราะอ่านผลจาก exit code ได้: `0` มีคำตอบ, `3` ชื่อกำกวม (พร้อมรายการ candidate), `4` ไม่พบโหนดที่ตรง ชื่อที่ตรงหลายโหนดจะถูกปฏิเสธ ไม่เดาให้ และปรับการเดินกราฟได้ด้วย `--dfs`, `--seed` และ `--context`",
        prerequisites: [
          "ติดตั้ง CLI แล้วและมี `graphify-out/graph.json`",
          "สำหรับสคริปต์ ต้องรองรับ exit code 3 และ 4 แยกจาก error จริง"
        ],
        invoke: [
          { label: "BFS", code: "graphify query \"what connects auth to the database?\"" },
          { label: "DFS พร้อม budget", code: "graphify query \"auth\" --dfs --budget 1200" },
          { label: "เริ่มจากโหนดที่กำหนด", code: "graphify query \"auth\" --seed src/auth.py" }
        ],
        examples: [
          {
            title: "ตรวจก่อนอ่านไฟล์",
            prompt: "graphify query \"where is the retry policy defined?\"",
            result: "ได้ subgraph พร้อม `source_location` ให้เปิดดูเฉพาะไฟล์ที่เกี่ยวข้อง"
          },
          {
            title: "จำกัดบริบท",
            prompt: "graphify query \"billing\" --context calls --budget 800",
            result: "กรองเฉพาะ edge ชนิด `calls` และคุมขนาดเอาต์พุต"
          },
          {
            title: "ใช้ในสคริปต์",
            prompt: "graphify query \"RateLimiter\"; echo $?",
            result: "`0` มีคำตอบ, `3` ชื่อกำกวม, `4` ไม่พบโหนด จึงแยกผลลัพธ์จาก error ได้"
          }
        ],
        cautions: [
          "ชื่อที่กำกวมทำให้ exit 3 และไม่มีคำตอบ ต้องระบุชื่อให้แคบลง",
          "`--budget` เป็นการประมาณ token ไม่ใช่จำนวนโหนดที่แน่นอน",
          "README ระบุว่าทุก query ถูก log ที่ `~/.cache/graphify-queries.log` และปิดด้วย `GRAPHIFY_QUERY_LOG_DISABLE=1`; ในโค้ด 0.9.93 การเขียน log เป็นแบบ opt-in (`GRAPHIFY_QUERY_LOG_ENABLE=1` หรือกำหนด `GRAPHIFY_QUERY_LOG=<path>`)"
        ],
        refs: [
          file("graphify/cli.py", "cli.py — query"),
          file("graphify/querylog.py", "querylog.py"),
          docs("reference/query", "Query reference")
        ],
        sourcePath: "graphify/cli.py"
      },
      {
        id: "graphify-path-cli",
        cat: "query",
        type: "cli",
        name: "graphify path \"A\" \"B\"",
        summary: "หาเส้นทางสั้นสุดระหว่างสองโหนด พร้อม relation ของแต่ละ hop",
        overview: "เดินกราฟจากโหนด A ไป B แล้วพิมพ์จำนวน hop กับ relation ของแต่ละช่วง เช่น `FastAPI --uses--> DefaultPlaceholder <--references-- get_request_handler()` ค่าเริ่มต้นค้นแบบมีทิศทาง และไม่สนใจ flag `directed` ที่อยู่ใน JSON ของกราฟ ใช้ `--undirected` เมื่อไม่สนใจทิศทางของ edge",
        prerequisites: [
          "มี `graph.json` ที่มีทั้งสองโหนด",
          "รู้ชื่อโหนดหรือ path ของไฟล์ที่ต้องการเชื่อม"
        ],
        invoke: [
          { label: "เส้นทางสั้นสุด", code: "graphify path \"FastAPI\" \"ModelField\"" },
          { label: "ไม่สนทิศทาง", code: "graphify path \"UserService\" \"DatabasePool\" --undirected" },
          { label: "ระบุไฟล์กราฟ", code: "graphify path \"A\" \"B\" --graph graphify-out/graph.json" }
        ],
        examples: [
          {
            title: "สองคลาสเชื่อมกันอย่างไร",
            prompt: "graphify path \"FastAPI\" \"ModelField\"",
            result: "ได้ `Shortest path (3 hops)` พร้อม relation ของทุก hop"
          },
          {
            title: "ไม่สนทิศทางของ edge",
            prompt: "graphify path \"UserService\" \"DatabasePool\" --undirected",
            result: "ค้นแบบ undirected เมื่อทิศทางในกราฟไม่ตรงกับที่สงสัย"
          },
          {
            title: "กราฟจาก repo อื่น",
            prompt: "graphify path \"A\" \"B\" --graph ~/.graphify/global-graph.json",
            result: "ใช้กราฟที่ระบุแทนค่าเริ่มต้น `graphify-out/graph.json`"
          }
        ],
        cautions: [
          "ค่าเริ่มต้นเป็น directed และไม่สนใจ flag `directed` ใน JSON ถ้าผลไม่ตรงที่คาดให้ลอง `--undirected`",
          "ชื่อที่ซ้ำกันหลายโหนดจะถูกปฏิเสธพร้อม candidate ต้องระบุให้ชัด",
          "path ไม่ได้บอกนัยของ business logic เป็นเพียงเส้นเชื่อมในกราฟ ต้องเปิด source ประกอบ"
        ],
        refs: [
          file("graphify/cli.py", "cli.py — path"),
          docs("reference/query", "Query reference")
        ],
        sourcePath: "graphify/cli.py"
      },
      {
        id: "graphify-explain",
        cat: "query",
        type: "cli",
        name: "graphify explain \"X\"",
        summary: "อธิบายโหนดเดียว: source, community, degree และ connection",
        overview: "แสดงที่มาของโหนดในซอร์ส เช่น `routing.py L2210`, หมายเลข community และ degree พร้อมรายการ connection ค่าเริ่มต้นแสดง 20 รายการที่เชื่อมมากที่สุด และ `--all` แสดงทั้งหมด ทุก edge มี tag บอกความมั่นใจ: `EXTRACTED` คือเห็นชัดในซอร์ส, `INFERRED` คือ graphify อนุมานจากการ resolve, `AMBIGUOUS` คือยังไม่ชัดและถูก flag ไว้ให้ตรวจ",
        prerequisites: [
          "มี `graph.json`",
          "รู้ชื่อ symbol, ไฟล์ หรือ concept ที่ต้องการอธิบาย"
        ],
        invoke: [
          { label: "อธิบายโหนด", code: "graphify explain \"APIRouter\"" },
          { label: "ทุก connection", code: "graphify explain \"APIRouter\" --all" },
          { label: "ระบุไฟล์กราฟ", code: "graphify explain \"X\" --graph graphify-out/graph.json" }
        ],
        examples: [
          {
            title: "ดูบทบาทของ symbol",
            prompt: "graphify explain \"APIRouter\"",
            result: "ได้ source location, community, degree และ connection 20 รายการที่เชื่อมมากที่สุด"
          },
          {
            title: "โหนดที่เชื่อมเยอะ",
            prompt: "graphify explain \"APIRouter\" --all",
            result: "แสดงทุก connection ซึ่งอาจยาวมากสำหรับ hub node"
          },
          {
            title: "ตรวจ edge ที่อนุมาน",
            prompt: "graphify explain \"RateLimiter\"",
            result: "เห็นว่า connection ใดเป็น `INFERRED` และควรเปิดซอร์สยืนยัน"
          }
        ],
        cautions: [
          "`INFERRED` ไม่ใช่ข้อเท็จจริงจากซอร์ส ต้องเปิดไฟล์ประกอบก่อนสรุป",
          "`AMBIGUOUS` คือสัญญาณให้ตรวจด้วยคน ไม่ใช่คำตอบสุดท้าย",
          "`--all` บนโหนด degree สูงอาจทำให้เอาต์พุตยาวเกินบริบทของ assistant"
        ],
        refs: [
          file("graphify/cli.py", "cli.py — explain"),
          docs("reference/query", "Query reference")
        ],
        sourcePath: "graphify/cli.py"
      },
      {
        id: "graphify-update-cli",
        cat: "maintain",
        type: "cli",
        name: "graphify update .",
        summary: "re-extract เฉพาะโค้ดที่เปลี่ยน โดยไม่เรียก LLM",
        overview: "เป็นคำสั่งที่ควรใช้หลังแก้โค้ดทุกครั้ง: parse โค้ดใหม่ด้วย AST แล้วเขียนกราฟกลับโดยไม่ต้องใช้ API key ถ้าไม่ระบุ path จะอ่าน root ที่บันทึกไว้ใน `graphify-out/.graphify_root` จากรอบก่อน และมี `--force` กับ `--no-cluster` สำหรับกรณีที่กราฟใหม่อาจเล็กกว่าของเดิมหรือต้องการ raw extraction เท่านั้น",
        prerequisites: [
          "มี `graphify-out/graph.json` อยู่แล้ว",
          "อยู่ใน git repo หรือ path ที่ graphify เคย scan"
        ],
        invoke: [
          { label: "อัปเดตโค้ด", code: "graphify update ." },
          { label: "หลังลบโค้ดจำนวนมาก", code: "graphify update . --force" },
          { label: "เขียน raw extraction", code: "graphify update . --no-cluster" }
        ],
        examples: [
          {
            title: "หลังแก้ฟังก์ชัน",
            prompt: "graphify update .",
            result: "กราฟสะท้อนโค้ดล่าสุดโดยไม่ต้องจ่าย token"
          },
          {
            title: "หลังลบไฟล์",
            prompt: "graphify update . --force",
            result: "เขียนทับกราฟแม้จำนวนโหนดจะลดลง"
          },
          {
            title: "ไม่ระบุ path",
            prompt: "graphify update",
            result: "ใช้ root ที่บันทึกไว้ใน `graphify-out/.graphify_root` จากรอบสร้างกราฟล่าสุด"
          }
        ],
        cautions: [
          "คำสั่งนี้ไม่ทำ semantic extraction ของ docs/PDF/รูป ต้องใช้ `/graphify --update` ใน assistant",
          "ถ้าไม่มีกราฟเดิมจะ error ให้สร้างกราฟก่อน",
          "`--force` เขียนทับกราฟแม้จำนวนโหนดจะลดลง จึงควรตรวจ diff ของ `graphify-out/` หลังรัน"
        ],
        refs: [
          file("graphify/cli.py", "cli.py — update"),
          file("graphify/watch.py", "watch.py — _rebuild_code"),
          docs("reference/overview", "CLI reference")
        ],
        sourcePath: "graphify/watch.py"
      },
      {
        id: "graphify-watch",
        cat: "maintain",
        type: "cli",
        name: "graphify watch .",
        summary: "เฝ้าโฟลเดอร์แล้ว rebuild กราฟเมื่อโค้ดเปลี่ยน",
        overview: "ใช้ watchdog เฝ้า filesystem event แล้ว rebuild กราฟให้ระหว่างทำงาน โค้ดที่เปลี่ยนจะถูก re-extract ด้วย AST ทันทีโดยไม่ใช้ LLM ส่วน docs/PDF/รูปที่เปลี่ยนจะถูกตั้ง `needs_update` และแจ้งให้รัน `/graphify --update` เพราะต้องใช้ semantic pass เหมาะกับช่วงพัฒนาที่อยากถามกราฟตลอดเวลา",
        prerequisites: [
          "ติดตั้ง watchdog (`pip install watchdog` หรือ extra `watch`)",
          "มีกราฟเดิมใน path ที่เฝ้า"
        ],
        invoke: [
          { label: "เฝ้าโฟลเดอร์ปัจจุบัน", code: "graphify watch ." },
          { label: "ผ่านสกิล", code: "/graphify <path> --watch" }
        ],
        examples: [
          {
            title: "แก้โค้ดแล้วถามต่อ",
            prompt: "graphify watch .",
            result: "กราฟอัปเดตทุกครั้งที่บันทึกไฟล์โค้ด โดยไม่กิน token"
          },
          {
            title: "แก้เอกสารระหว่าง watch",
            prompt: "/graphify ./docs --update",
            result: "ไฟล์ docs ที่เปลี่ยนถูกประมวลผลเมื่อสั่ง update ไม่ใช่ในรอบ watch"
          },
          {
            title: "หยุด watch",
            prompt: "Ctrl+C",
            result: "process จบและกราฟยังอยู่ที่ `graphify-out/`"
          }
        ],
        cautions: [
          "ถ้าไม่มี watchdog จะได้ `ImportError: watchdog not installed`",
          "ไม่เหมาะกับ CI ที่มีอายุสั้น เพราะ process ต้องค้างไว้",
          "watch ไม่ได้ติดตั้ง git hook ให้เอง ต้องใช้ `graphify hook install` แยก และไม่ได้ทำ semantic extraction ของ docs"
        ],
        refs: [
          file("graphify/watch.py", "watch.py"),
          docs("reference/overview", "CLI reference")
        ],
        sourcePath: "graphify/watch.py"
      },
      {
        id: "graphify-hook-install",
        cat: "maintain",
        type: "cli",
        name: "graphify hook install",
        summary: "ติดตั้ง git hook ให้ rebuild กราฟอัตโนมัติหลัง commit และ checkout",
        overview: "ติดตั้ง hook สี่ตัวใน git repo ที่ใกล้ที่สุด: `post-commit`, `post-checkout`, `post-merge` และ `post-rewrite` พร้อม merge driver สำหรับ union-merge `graph.json` สองไฟล์ ผลคือกราฟถูก rebuild หลัง commit, เปลี่ยน branch, merge และ rebase โดยไม่ต้องสั่งเอง ตรวจสถานะและถอดออกได้ด้วย `hook status` และ `hook uninstall`",
        prerequisites: [
          "อยู่ใน git repository",
          "`graphify` อยู่ใน PATH ที่ hook เห็นตอน git รัน",
          "มีกราฟเดิมหรือพร้อมให้ hook สร้าง"
        ],
        invoke: [
          { label: "ติดตั้ง", code: "graphify hook install" },
          { label: "ตรวจสถานะ", code: "graphify hook status" },
          { label: "ถอด", code: "graphify hook uninstall" }
        ],
        examples: [
          {
            title: "ติดตั้งในโปรเจกต์",
            prompt: "graphify hook install",
            result: "ได้ hook ครบสี่ตัวและ merge driver ใน `.git/hooks/`"
          },
          {
            title: "ตรวจว่ายังอยู่ไหม",
            prompt: "graphify hook status",
            result: "รายงานสถานะของแต่ละ hook และ merge driver"
          },
          {
            title: "ข้าม hook ครั้งเดียว",
            prompt: "GRAPHIFY_SKIP_HOOK=1 git commit -m \"wip\"",
            result: "commit ผ่านโดยไม่ trigger rebuild"
          }
        ],
        cautions: [
          "hook เรียก `graphify` จาก PATH ถ้าไม่เจอจะ rebuild ไม่เกิดและอาจเงียบ",
          "hook เขียนไฟล์ใน `.git/hooks/` ซึ่งไม่ถูก commit แต่กระทบทุกคนที่ใช้ repo เดียวกันในเครื่อง",
          "หลัง `git pull` แนะนำให้รัน `graphify update .` เพราะ hook ไม่ได้ครอบทุกกรณี"
        ],
        refs: [
          file("graphify/hooks.py", "hooks.py"),
          docs("reference/overview", "CLI reference")
        ],
        sourcePath: "graphify/hooks.py"
      },
      {
        id: "graphify-merge-graphs",
        cat: "maintain",
        type: "cli",
        name: "graphify merge-graphs a.json b.json",
        summary: "รวมกราฟตั้งแต่สองไฟล์ขึ้นไปเป็น cross-repo graph เดียว",
        overview: "ใช้เมื่อแยกสร้างกราฟตาม repo หรือโฟลเดอร์แล้วต้องการกราฟเดียวสำหรับถามข้ามโปรเจกต์ โหนดจากแต่ละไฟล์จะถูกติด tag ตาม repo ต้นทางเพื่อกัน id ชนกัน ค่าเริ่มต้นเขียนไปที่ `graphify-out/merged-graph.json` และ `--previous` ช่วยคงหมายเลข community ของ merge รอบก่อนเพื่อให้ label ที่มีอยู่ยังใช้ต่อได้",
        prerequisites: [
          "มี `graph.json` อย่างน้อยสองไฟล์ที่สร้างจาก graphify",
          "รู้ว่าแต่ละไฟล์มาจาก repo ใด เพราะ tag จะติดไปกับโหนด"
        ],
        invoke: [
          { label: "สองกราฟ", code: "graphify merge-graphs a.json b.json" },
          { label: "กำหนด output", code: "graphify merge-graphs a.json b.json --out merged-graph.json" },
          { label: "คง community เดิม", code: "graphify merge-graphs a.json b.json --previous previous-merged-graph.json" }
        ],
        examples: [
          {
            title: "รวมสอง service",
            prompt: "graphify merge-graphs api/graphify-out/graph.json web/graphify-out/graph.json",
            result: "ได้ `graphify-out/merged-graph.json` ที่ถามข้ามสอง service ได้"
          },
          {
            title: "กำหนดที่เก็บเอง",
            prompt: "graphify merge-graphs a.json b.json --out cross-repo.json",
            result: "เขียนกราฟรวมไปที่ path ที่ระบุ"
          },
          {
            title: "merge ซ้ำหลังมี label แล้ว",
            prompt: "graphify merge-graphs a.json b.json --previous merged-graph.json",
            result: "community id ของ merge รอบก่อนถูกคงไว้ให้ cluster-only ใช้ label ต่อได้"
          }
        ],
        cautions: [
          "ต้องมีอย่างน้อยสองไฟล์ ไม่งั้นคำสั่งจะพิมพ์ usage และ exit 1",
          "หมายเลข community ในผลลัพธ์เป็นของแต่ละแหล่ง ไม่สัมพันธ์กับ clustering รอบก่อน ถ้าต้องการ label ต่อให้ใช้ `--previous`",
          "กราฟรวมไม่ได้รับการอัปเดตอัตโนมัติ ต้อง merge ใหม่เมื่อกราฟต้นทางเปลี่ยน"
        ],
        refs: [
          file("graphify/cli.py", "cli.py — merge-graphs"),
          docs("guides/team-workflows", "Team workflows")
        ],
        sourcePath: "graphify/cli.py"
      },
      {
        id: "graphify-prs",
        cat: "maintain",
        type: "cli",
        name: "graphify prs --triage",
        summary: "PR dashboard พร้อม graph impact และการจัดคิวรีวิวด้วย AI",
        overview: "รวมสถานะ PR, CI, review และ worktree mapping ไว้ที่เดียว โดยดึงข้อมูลผ่าน `gh` และเทียบ diff กับกราฟเพื่อดูว่า PR กระทบ community ใด `--triage` ให้ backend ที่ตั้งไว้จัดอันดับคิวรีวิว ส่วน `--conflicts` หา PR ที่แตะ community เดียวกันเพื่อดูความเสี่ยงเรื่องลำดับ merge และระบุเลข PR เพื่อเจาะดูใบเดียวได้",
        prerequisites: [
          "ติดตั้ง GitHub CLI และรัน `gh auth login` แล้ว",
          "อยู่ใน git repo ที่มี remote เป็น GitHub",
          "มี `graph.json` ถ้าต้องการ graph impact"
        ],
        invoke: [
          { label: "dashboard", code: "graphify prs" },
          { label: "จัดคิวด้วย AI", code: "graphify prs --triage" },
          { label: "เจาะ PR เดียว", code: "graphify prs 42" }
        ],
        examples: [
          {
            title: "ดูภาพรวมคิวรีวิว",
            prompt: "graphify prs",
            result: "ได้ตาราง PR พร้อม CI, review status และ worktree ที่ผูกอยู่"
          },
          {
            title: "ให้ AI จัดลำดับ",
            prompt: "graphify prs --triage",
            result: "คิวถูกรัดอันดับด้วย backend ที่ตั้งไว้ พร้อมเหตุผลประกอบ"
          },
          {
            title: "หา merge order",
            prompt: "graphify prs --conflicts",
            result: "เห็น PR ที่แตะ community เดียวกันและควร merge ก่อนหลัง"
          }
        ],
        cautions: [
          "ถ้า `gh` ไม่พร้อมจะได้ `gh CLI not found or not authenticated. Run: gh auth login`",
          "`--triage` เรียก LLM ตาม backend ที่ตั้งไว้ จึงมีค่าใช้จ่าย token",
          "graph impact ต้องมี `graph.json` ในเครื่อง ไม่งั้นได้เฉพาะข้อมูลจาก GitHub"
        ],
        refs: [
          file("graphify/prs.py", "prs.py"),
          docs("guides/pull-requests", "Review pull requests"),
          docs("guides/team-workflows", "Team workflows")
        ],
        sourcePath: "graphify/prs.py"
      },
      {
        id: "graphify-install",
        cat: "install",
        type: "cli",
        name: "graphify install",
        summary: "ตรวจ assistant ที่ใช้อยู่แล้วลงทะเบียน skill ให้พร้อมเรียก /graphify",
        overview: "หลังติดตั้งแพ็กเกจ `graphifyy` แล้ว คำสั่งนี้จะตรวจ assistant ที่รันอยู่และเขียน skill กับ config ให้ตรง platform โดยไม่ต้องตั้งทีละตัว ค่าเริ่มต้นติดตั้งระดับ user และเลือก Claude Code เป็น platform เดียวโดยตั้งใจ ใช้ `--project` เพื่อเขียนลง repo ปัจจุบัน หรือ `--platform` เพื่อเลือกเอง เมื่อจบจะบอกให้เปิด assistant แล้วพิมพ์ `/graphify .`",
        prerequisites: [
          "Python 3.10+",
          "`uv tool install graphifyy` หรือ `pipx install graphifyy`",
          "สิทธิ์เขียนโฟลเดอร์ config ของ assistant"
        ],
        invoke: [
          { label: "ติดตั้ง CLI + skill", code: "uv tool install graphifyy\ngraphify install" },
          { label: "ติดตั้งลง repo", code: "graphify install --project" },
          { label: "เลือก platform", code: "graphify install --platform opencode" }
        ],
        examples: [
          {
            title: "เครื่องใหม่",
            prompt: "uv tool install graphifyy && graphify install",
            result: "skill ถูกเขียนลง config ของ assistant และพิมพ์ `/graphify .` ได้ทันที"
          },
          {
            title: "ติดตั้งลง repo",
            prompt: "graphify install --project",
            result: "เขียนไฟล์ใต้ repo เช่น `.claude/skills/graphify/SKILL.md` พร้อม hint `git add`"
          },
          {
            title: "เลือก platform เอง",
            prompt: "graphify install --platform opencode",
            result: "เขียน skill และ plugin/config ของ OpenCode แทนการ auto-detect"
          }
        ],
        cautions: [
          "แพ็กเกจ PyPI ชื่อ `graphifyy` (double-y) CLI ยังชื่อ `graphify` แพ็กเกจ `graphify*` อื่นไม่เกี่ยวข้อง",
          "ถ้าหา `graphify` ไม่เจอหลังติดตั้งด้วย uv ให้รัน `uv tool update-shell`",
          "`graphify install` ติดตั้ง integration ในเครื่อง ไม่ได้สร้าง MCP connection"
        ],
        refs: [
          file("graphify/install.py", "install.py"),
          file("README.md", "README — Install"),
          docs("installation", "Installation")
        ],
        sourcePath: "graphify/install.py"
      },
      {
        id: "graphify-platform-install",
        cat: "install",
        type: "cli",
        name: "graphify <platform> install",
        summary: "เขียน config ให้ assistant อ้างกราฟก่อน grep ทุกครั้ง",
        overview: "คำสั่งระดับ platform เขียน instruction หรือ hook ให้ assistant ใช้กราฟเป็นทางแรก: Claude Code และ CodeBuddy ได้ section ใน `CLAUDE.md`/`CODEBUDDY.md` พร้อม `PreToolUse` hook, Codex/OpenCode/Aider/OpenClaw/Factory Droid/Trae เขียน `AGENTS.md`, Cursor เขียน `.cursor/rules/graphify.mdc`, Gemini CLI เขียน `GEMINI.md` พร้อม `BeforeTool` hook และยังมี Kilo, Copilot, Kiro, Pi, Devin, Antigravity, `agents` สำหรับ `.agents/skills`",
        prerequisites: [
          "ติดตั้ง `graphifyy` และรัน `graphify install` แล้ว",
          "อยู่ใน repo ที่ต้องการให้ assistant ใช้กราฟ",
          "มีกราฟอย่างน้อยหนึ่งรอบเพื่อให้คำแนะนำชี้ไปที่กราฟจริง"
        ],
        invoke: [
          { label: "Claude Code", code: "graphify claude install" },
          { label: "Codex", code: "graphify codex install" },
          { label: "Cursor", code: "graphify cursor install" }
        ],
        examples: [
          {
            title: "Claude Code",
            prompt: "graphify claude install",
            result: "ได้ section ใน `CLAUDE.md` และ `PreToolUse` hook ที่เตือนให้ถามกราฟก่อน"
          },
          {
            title: "Codex",
            prompt: "graphify codex install",
            result: "`AGENTS.md` มีคำแนะนำให้ใช้ `graphify query` ก่อนอ่านไฟล์ (Codex ใช้ `$graphify`)"
          },
          {
            title: "ถอดออกทั้งหมด",
            prompt: "graphify uninstall --purge",
            result: "ลบ config ของทุก platform และลบ `graphify-out/` ด้วย"
          }
        ],
        cautions: [
          "คำสั่งนี้แก้ไฟล์ instruction/config ของโปรเจกต์ ต้อง review diff ก่อน commit",
          "แต่ละ platform เขียนไฟล์ต่างกัน ตรวจว่าไฟล์ที่ถูกแก้เป็นของ platform ที่ใช้จริงก่อน commit",
          "`--purge` ลบ `graphify-out/` ถาวร ตรวจก่อนใช้"
        ],
        refs: [
          file("graphify/install.py", "install.py — per-platform"),
          file("README.md", "README — Pick your platform"),
          docs("guides/always-on", "Always-on setup")
        ],
        sourcePath: "graphify/install.py"
      },
      {
        id: "graphify-export",
        cat: "export",
        type: "cli",
        name: "graphify export <format>",
        summary: "ส่งออกกราฟเป็น HTML, Mermaid call flow, wiki, SVG หรือ graph database",
        overview: "คำสั่งเดียวเลือกได้แปดรูปแบบ: `html` สำหรับ interactive graph, `callflow-html` สำหรับแผนภาพ Mermaid ของ architecture/call flow, `obsidian` สำหรับ vault, `wiki` สำหรับบทความ markdown ต่อ community, `svg`, `graphml` สำหรับ Gephi/yEd, และ `neo4j`/`falkordb` ที่ emit Cypher หรือ push ตรงได้ ทุกแบบรับ `--graph` เพื่อชี้ไฟล์ต้นทางเอง และบางแบบรับ `--labels` เพิ่ม",
        prerequisites: [
          "มี `graph.json` และถ้ามี label ให้มี `.graphify_labels.json`",
          "`svg` ต้องติดตั้ง extra `svg`; `neo4j`/`falkordb` ต้องติดตั้ง extra ของแต่ละตัวเมื่อจะ push"
        ],
        invoke: [
          { label: "Mermaid call flow", code: "graphify export callflow-html" },
          { label: "interactive graph", code: "graphify export html" },
          { label: "wiki markdown", code: "graphify export wiki" }
        ],
        examples: [
          {
            title: "แผนภาพสำหรับ review",
            prompt: "graphify export callflow-html",
            result: "ได้ HTML ที่มี Mermaid diagram ของ architecture และ call flow"
          },
          {
            title: "กราฟให้ทีมเปิดดู",
            prompt: "graphify export html --node-limit 800",
            result: "`graph.html` ที่จำกัดจำนวนโหนดตาม `--node-limit` ที่กำหนด"
          },
          {
            title: "ส่งเข้า Neo4j",
            prompt: "NEO4J_PASSWORD=... graphify export neo4j --push bolt://localhost:7687",
            result: "กราฟถูก push เข้า Neo4j โดยรหัสผ่านไม่อยู่ใน argv"
          }
        ],
        cautions: [
          "`callflow-html` อ่าน `GRAPH_REPORT.md` ถ้าไม่มี report ให้ระบุ `--report` เอง",
          "`svg` ต้องมี matplotlib/pillow จาก extra `svg` ไม่งั้นจะ error",
          "อย่าใส่รหัสผ่านฐานข้อมูลใน argv ใช้ `NEO4J_PASSWORD` หรือ `FALKORDB_PASSWORD`"
        ],
        refs: [
          file("graphify/cli.py", "cli.py — export"),
          file("graphify/export.py", "export.py"),
          docs("reference/overview", "CLI reference")
        ],
        sourcePath: "graphify/cli.py"
      }
    ],
    idKey: "id",
    unit: "คำสั่ง",
    catLabel: {
      pipeline: "ไปป์ไลน์",
      query: "ถามกราฟ",
      maintain: "ดูแลกราฟ",
      install: "ติดตั้ง",
      export: "ส่งออก"
    },
    collection: {
      repo: "",
      version: "0.9.93",
      license: "Apache-2.0",
      verifiedAt: "2026-10-23"
    }
  };
})();
