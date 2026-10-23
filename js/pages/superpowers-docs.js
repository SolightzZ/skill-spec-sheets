/* Page module: superpowers-docs. Verified against obra/superpowers 7.0.0 (2026-10-23). */
(function () {
  "use strict";
  var NS = window.DocsIndex = window.DocsIndex || {};
  NS.pages = NS.pages || {};
  var esc = NS.esc;

  var REPO = "https://github.com/obra/superpowers";

  function invoke(id) {
    return [
      { label: "OpenCode / harness ที่รองรับ skill tool", code: 'skill("' + id + '")' },
      { label: "อ้างถึงจาก skill อื่น", code: "superpowers:" + id }
    ];
  }

  function ref(id) {
    return [{ label: "SKILL.md บน GitHub", href: REPO + "/blob/main/skills/" + id + "/SKILL.md" }];
  }

  NS.pages["superpowers-docs"] = {
    data: [
      {
        id: "using-superpowers",
        cat: "meta",
        type: "skill",
        name: "using-superpowers",
        summary: "บังคับให้ agent เลือกและโหลด skill ให้ตรงงานก่อนตอบหรือลงมือทำ",
        overview: "เป็นจุดเริ่มของทั้งชุด ทุกบทสนทนาต้องถูกตรวจว่ามี skill ใดใช้ได้ก่อนจะตอบคำถาม clarifying หรือแตะโค้ด กฎคือถ้าโอกาสใช้ skill เกิน 1% ต้องโหลด skill นั้นก่อน ตัว skill ยังอธิบายลำดับความสำคัญเมื่อหลาย skill ใช้พร้อมกัน และบอกให้ subagent ข้ามกฎนี้เมื่อถูกสั่งงานเฉพาะทาง",
        prerequisites: [
          "ติดตั้งชุด superpowers ใน harness ที่ใช้อยู่",
          "harness ต้องเปิดให้ agent เรียก skill tool ได้"
        ],
        invoke: invoke("using-superpowers"),
        examples: [
          {
            title: "เริ่มงานใหม่",
            prompt: "ใช้ using-superpowers ช่วยเพิ่มระบบ export CSV ให้หน้า report หน่อย",
            result: "agent ตรวจก่อนว่าต้องใช้ brainstorming หรือ writing-plans และประกาศชื่อ skill ที่ใช้"
          },
          {
            title: "งานที่ดูเล็กจนน่าข้าม",
            prompt: "ใช้ using-superpowers แก้ typo ใน README ให้หน่อย",
            result: "agent ยังตรวจ skill ที่เกี่ยวข้องก่อน แล้วจึงแก้เฉพาะจุด"
          },
          {
            title: "หลาย skill ชนกัน",
            prompt: "ใช้ using-superpowers มี bug และต้องรีบ hotfix ก่อนเที่ยง",
            result: "agent ใช้ systematic-debugging ก่อน แล้วจึงเลือกกระบวนการปล่อยงานที่เหมาะ"
          }
        ],
        cautions: [
          "ถ้า skill ไม่ปรากฏในรายการ ให้ตรวจการติดตั้งของ harness นั้น แยกต่อ harness",
          "กฎนี้มีข้อยกเว้นสำหรับ subagent ที่ถูกส่งมาทำงานเฉพาะ ไม่ต้องโหลดซ้ำ"
        ],
        refs: ref("using-superpowers"),
        sourcePath: "skills/using-superpowers/SKILL.md"
      },
      {
        id: "brainstorming",
        cat: "process",
        type: "skill",
        name: "brainstorming",
        summary: "แปลงไอเดียเป็นดีไซน์ด้วยคำถามทีละข้อ และหยุดรออนุมัติก่อนแตะโค้ด",
        overview: "ใช้ก่อนงานสร้างสรรค์ทุกชนิด ทั้งฟีเจอร์ คอมโพเนนต์ เอกสาร หรือแผนธุรกิจ skill นี้เริ่มจากการแยกให้ออกว่าอะไรคือสิ่งที่รู้แล้ว อะไรคือสมมติฐาน แล้วถามคำถามที่เปลี่ยนการตัดสินใจทีละข้อ เมื่อได้บริบทพอจะเสนอ 2-3 แนวทางพร้อมข้อแลกเปลี่ยน จากนั้นจึงสรุปดีไซน์และขออนุมัติ เป็นด่านที่บังคับก่อนเขียนโค้ด",
        prerequisites: [
          "มีโจทย์หรือไอเดียตั้งต้นอย่างน้อยหนึ่งประโยค",
          "พร้อมตอบคำถามและยืนยันขอบเขตงาน"
        ],
        invoke: invoke("brainstorming"),
        examples: [
          {
            title: "ฟีเจอร์ใหม่",
            prompt: "ใช้ brainstorming อยากเพิ่มระบบล็อกอินด้วย magic link ให้แอป Next.js ที่มีอยู่",
            result: "agent ถามเรื่องผู้ใช้ ข้อจำกัดอีเมล และทางเลือกก่อนสร้างดีไซน์"
          },
          {
            title: "ยังไม่รู้ว่าอยากได้อะไร",
            prompt: "ใช้ brainstorming ช่วยคิดว่าหน้า dashboard ควรมีอะไรบ้าง",
            result: "agent สัมภาษณ์เป้าหมายและผู้ใช้ก่อนเสนอโครง ไม่รีบสร้างหน้าจอ"
          },
          {
            title: "ปรับของเดิม",
            prompt: "ใช้ brainstorming อยาก redesign หน้า checkout ให้รู้สึกพรีเมียมขึ้น",
            result: "agent ตกลงความหมายของพรีเมียมและข้อจำกัดแบรนด์ก่อนเสนอทิศทาง"
          }
        ],
        cautions: [
          "ห้ามเริ่มเขียนโค้ดก่อนได้อนุมัติจากผู้ใช้ แม้งานจะดูเล็ก",
          "ถ้าใช้ visual companion ต้องขออนุญาตก่อน เพราะอาจกิน token มาก"
        ],
        refs: ref("brainstorming"),
        sourcePath: "skills/brainstorming/SKILL.md"
      },
      {
        id: "writing-plans",
        cat: "process",
        type: "skill",
        name: "writing-plans",
        summary: "แตกสเปกเป็นแผนหลายขั้นที่ระบุไฟล์ คำสั่ง และจุดตรวจได้ชัดเจน",
        overview: "เขียนแผนสำหรับวิศวกรที่ไม่เคยเห็นโค้ดหรือสเปกนี้ เป้าหมายคือส่งต่อสิ่งที่ตัดสินใจแล้ว ได้แก่ ไฟล์ที่จะแก้ ชื่อและ signature ค่าจากสเปก และเทสที่พิสูจน์แต่ละงาน แผนถูกแบ่งเป็น task สั้นที่ทำเสร็จและตรวจได้ทีละอัน พร้อมคำสั่งรันเทสและจุด commit",
        prerequisites: [
          "มีสเปกหรือข้อกำหนดที่ตกลงแล้ว",
          "รู้ขอบเขตงานและเกณฑ์สำเร็จ"
        ],
        invoke: invoke("writing-plans"),
        examples: [
          {
            title: "จากสเปกเป็นแผน",
            prompt: "ใช้ writing-plans มีสเปกอยู่ใน docs/specs/export.md แล้ว ช่วยทำแผน implement",
            result: "ได้แผนราย task พร้อมไฟล์ เทส และคำสั่งตรวจต่อขั้น"
          },
          {
            title: "งานหลาย subsystem",
            prompt: "ใช้ writing-plans ช่วยแบ่งงานย้าย auth ไป service ใหม่เป็นขั้นที่ปล่อยได้ทีละขั้น",
            result: "แผนเรียงตาม dependency และมีจุด rollback ต่อขั้น"
          },
          {
            title: "งานที่ยังไม่ชัด",
            prompt: "ใช้ writing-plans ช่วยเขียนแผนเพิ่ม search ให้ docs index",
            result: "ถ้าสเปกยังไม่พอ agent ถามก่อน แล้วจึงเขียนแผนที่ตรวจได้"
          }
        ],
        cautions: [
          "อย่าเขียนแผนแบบกว้างว่า \"ทำ API\" ต้องระบุไฟล์ signature และเทส",
          "แผนที่ยาวเกินหนึ่งรอบควรถูกแตกเป็นช่วงที่ส่งงานได้จริง"
        ],
        refs: ref("writing-plans"),
        sourcePath: "skills/writing-plans/SKILL.md"
      },
      {
        id: "executing-plans",
        cat: "process",
        type: "skill",
        name: "executing-plans",
        summary: "ลงมือทำตามแผนด้วยตัวเองในเซสชันเดียว พร้อมตรวจรวมครั้งเดียวตอนจบ",
        overview: "ทางเลือกเมื่อผู้ใช้เลือกทำแบบ inline หรือไม่มี subagent tool ให้ใช้ agent ทำตาม task ในแผนทีละข้อโดยไม่ต้องมี implementer และ reviewer แยกทุก task ใช้ brief เป็นสเปก ใช้ ledger เป็นความจำ และใช้ TDD เป็นด่านต่อ task จากนั้นจึงเรียก reviewer ใหม่หนึ่งครั้งตรวจทั้ง branch",
        prerequisites: [
          "มีแผนที่อนุมัติแล้วและ task เรียงลำดับชัด",
          "ผู้ใช้เลือก inline execution หรือไม่มี subagent tool"
        ],
        invoke: invoke("executing-plans"),
        examples: [
          {
            title: "ทำแผนเดียวจบ",
            prompt: "ใช้ executing-plans ทำตามแผน docs/superpowers/plans/export.md ให้ครบ",
            result: "agent ทำ task ต่อเนื่อง รายงานสั้น ๆ และตรวจรวมตอนจบ"
          },
          {
            title: "ไม่มี subagent",
            prompt: "ใช้ executing-plans เครื่องนี้ไม่มี subagent ช่วยทำแผนนี้แบบ inline",
            result: "agent เลือกเส้นทาง inline และไม่สร้าง implementer subagent "
          },
          {
            title: "แผนยาว",
            prompt: "ใช้ executing-plans ทำแผน migration ฐานข้อมูล 12 task นี้ให้จบในเซสชันนี้",
            result: "agent เดินตามลำดับ ใช้ ledger กันหลง และหยุดเฉพาะเมื่อเจอเงื่อนไข stop"
          }
        ],
        cautions: [
          "ไม่ใช่ทางเลือกเมื่อมี subagent tool และงานแยกอิสระได้ ควรใช้ subagent-driven-development",
          "ห้ามข้ามการตรวจรวมตอนจบ เพราะระหว่าง task ไม่มี reviewer แยก"
        ],
        refs: ref("executing-plans"),
        sourcePath: "skills/executing-plans/SKILL.md"
      },
      {
        id: "subagent-driven-development",
        cat: "process",
        type: "skill",
        name: "subagent-driven-development",
        summary: "ส่งงานแต่ละ task ให้ subagent ใหม่ พร้อมรีวิวสองชั้นและตรวจรวมตอนจบ",
        overview: "ใช้เมื่อมีแผนที่มี task อิสระและ harness มี subagent tool แต่ละ task ได้ implementer ที่มีบริบทแยก ตามด้วย task review ที่ตรวจทั้ง spec compliance และคุณภาพโค้ด เมื่อครบทุก task จึงมี broad review ของทั้ง branch วิธีนี้รักษา context หลักและลดการปนกันของงาน แต่ต้องสร้าง brief ให้ครบทุกครั้ง",
        prerequisites: [
          "มีแผนที่แบ่ง task ชัดและอนุมัติแล้ว",
          "harness มี subagent tool ที่ให้บริบทแยกได้"
        ],
        invoke: invoke("subagent-driven-development"),
        examples: [
          {
            title: "แผนหลาย task",
            prompt: "ใช้ subagent-driven-development ทำแผน refactor billing 8 task ด้วย subagent ทีละ task",
            result: "แต่ละ task มี implementer ใหม่และ task review ก่อนไปต่อ"
          },
          {
            title: "งานขนานที่ไม่แชร์ไฟล์",
            prompt: "ใช้ subagent-driven-development แยกงานเขียนเทส 3 โมดูลที่ไม่แตะไฟล์เดียวกันให้ subagent",
            result: "agent แยก brief ต่อโมดูลและรวมผลหลังรีวิว"
          },
          {
            title: "ตรวจคุณภาพก่อน merge",
            prompt: "ใช้ subagent-driven-development ช่วยทำแผนนี้เสร็จแล้วรีวิวทั้ง branch ก่อนเปิด PR",
            result: "มี broad review ครั้งเดียวหลัง task ครบ"
          }
        ],
        cautions: [
          "อย่าหยุดถามความคืบหน้าระหว่าง task ถ้าไม่มีเงื่อนไขหยุดที่กำหนด",
          "subagent ต้องได้ brief ที่สร้างใหม่ ไม่ใช่ประวัติเซสชันหลัก"
        ],
        refs: ref("subagent-driven-development"),
        sourcePath: "skills/subagent-driven-development/SKILL.md"
      },
      {
        id: "dispatching-parallel-agents",
        cat: "process",
        type: "skill",
        name: "dispatching-parallel-agents",
        summary: "ยิงงานอิสระตั้งแต่สองงานขึ้นไปพร้อมกัน แทนที่จะทำทีละงาน",
        overview: "เหมาะเมื่อมีปัญหาหรือ task ที่ไม่แชร์ state ไฟล์ หรือลำดับ dependency เช่น เทสหลายไฟล์พังจากคนละสาเหตุ แต่ละ agent ได้ context ที่ประกอบขึ้นใหม่และทำงานคู่ขนานกัน ผลลัพธ์ถูกนำมารวมและตรวจในเซสชันหลัก วิธีนี้ลดเวลารอและรักษา context ของผู้ประสานงาน",
        prerequisites: [
          "มีงานอย่างน้อยสองงานที่เป็นอิสระต่อกันจริง",
          "ระบุขอบเขตไฟล์และผลลัพธ์ที่แต่ละ agent ต้องส่งได้"
        ],
        invoke: invoke("dispatching-parallel-agents"),
        examples: [
          {
            title: "เทสพังหลายไฟล์",
            prompt: "ใช้ dispatching-parallel-agents เทสพัง 4 ไฟล์จากคนละสาเหตุ ช่วยสืบขนานกัน",
            result: "agent แยกหนึ่ง agent ต่อไฟล์ และรวมสาเหตุที่พบ"
          },
          {
            title: "สำรวจหลายพื้นที่",
            prompt: "ใช้ dispatching-parallel-agents ช่วยสำรวจ auth, billing และ search ว่าแต่ละส่วนเรียก DB ตรงไหน",
            result: "ได้ผลสำรวจแยกส่วนพร้อม path:line แล้วรวมเป็นข้อสรุปเดียว"
          },
          {
            title: "งานเอกสารอิสระ",
            prompt: "ใช้ dispatching-parallel-agents เขียน README ใหม่และอัปเดต CONTRIBUTING พร้อมกันได้ไหม",
            result: "agent ตรวจว่าไม่แชร์ไฟล์ แล้วจึงส่งสองงานขนาน"
          }
        ],
        cautions: [
          "อย่าใช้เมื่อ task ต้องรอกันหรือแก้ไฟล์เดียวกัน",
          "ต้องมีขั้นรวมผลและตรวจความขัดแย้ง ไม่ใช่เชื่อผลทุก agent ตรง ๆ"
        ],
        refs: ref("dispatching-parallel-agents"),
        sourcePath: "skills/dispatching-parallel-agents/SKILL.md"
      },
      {
        id: "test-driven-development",
        cat: "code",
        type: "skill",
        name: "test-driven-development",
        summary: "เขียนเทสที่ยังไม่ผ่านก่อน แล้วเขียนโค้ดให้น้อยที่สุดจนเทสเขียว",
        overview: "วงจร RED-GREEN-REFACTOR ใช้กับฟีเจอร์และ bugfix ทุกชนิด เริ่มจากเขียนเทสที่สื่อพฤติกรรมที่ต้องการ รันให้เห็นว่า fail ด้วยเหตุผลที่ถูก จากนั้นเขียนโค้ดน้อยที่สุดให้ผ่าน และจัดระเบียบเมื่อเขียวแล้ว หลักฐานสำคัญคือการเห็นเทส fail ก่อน ไม่ใช่เขียนเทสตามหลังโค้ด",
        prerequisites: [
          "มีคำสั่งรันเทสของโปรเจกต์",
          "รู้พฤติกรรมที่ต้องการและเงื่อนไขสำเร็จ"
        ],
        invoke: invoke("test-driven-development"),
        examples: [
          {
            title: "ฟีเจอร์ใหม่",
            prompt: "ใช้ test-driven-development เพิ่มการคำนวณส่วนลดตามโค้ดคูปองแบบ TDD",
            result: "มีเทสแดงก่อน แล้วโค้ดน้อยที่สุดทำให้เขียว"
          },
          {
            title: "แก้บั๊ก",
            prompt: "ใช้ test-driven-development ผู้ใช้รายงานว่า export CSV แล้วหัวคอลัมน์หาย ช่วยแก้แบบ TDD",
            result: "ได้ reproduction test ที่ fail ก่อน แล้วจึงแก้ต้นเหตุ"
          },
          {
            title: "refactor",
            prompt: "ใช้ test-driven-development จัดโครงสร้างฟังก์ชัน parse ใหม่โดยพฤติกรรมต้องไม่เปลี่ยน",
            result: "ใช้เทสเดิมเป็นตาข่าย แล้ว refactor โดยไม่เพิ่มพฤติกรรม"
          }
        ],
        cautions: [
          "ถ้าไม่ได้เห็นเทส fail แปลว่ายังไม่รู้ว่าเทสนั้นวัดสิ่งที่ต้องการจริง",
          "ห้ามเขียนเทสหลังโค้ดแล้วอ้างว่าเป็น TDD"
        ],
        refs: ref("test-driven-development"),
        sourcePath: "skills/test-driven-development/SKILL.md"
      },
      {
        id: "systematic-debugging",
        cat: "code",
        type: "skill",
        name: "systematic-debugging",
        summary: "หา root cause จากหลักฐานก่อนเสนอทางแก้ ไม่เดาแล้วแก้รัว ๆ",
        overview: "กระบวนการสี่เฟสสำหรับบั๊ก เทสพัง และพฤติกรรมผิดคาด เริ่มจากการทำความเข้าใจอาการและเก็บหลักฐานก่อนสร้างสมมติฐาน จากนั้นทดสอบสมมติฐานทีละข้อจนพบต้นเหตุ จึงแก้และพิสูจน์ด้วยเทสหรือ reproduction ที่เสถียร กฎเหล็กคือห้ามแก้ก่อนรู้ root cause",
        prerequisites: [
          "มีอาการหรือ reproduction ที่อธิบายได้",
          "เข้าถึง log เครื่องมือ หรือเทสที่ทำให้เห็นปัญหา"
        ],
        invoke: invoke("systematic-debugging"),
        examples: [
          {
            title: "บั๊กเป็นครั้งคราว",
            prompt: "ใช้ systematic-debugging บางครั้งคำขอ login ค้าง 20 วินาที ช่วยหาสาเหตุ",
            result: "agent เก็บหลักฐานและทดสอบสมมติฐานก่อนแก้ timeout"
          },
          {
            title: "เทสพังหลังอัปเกรด",
            prompt: "ใช้ systematic-debugging อัปเกรด Node แล้วเทส 3 ตัวพัง ช่วยหาว่าอะไรเปลี่ยน",
            result: "agent เทียบพฤติกรรมและแยกสาเหตุจาก dependency ก่อน patch"
          },
          {
            title: "Performance regression",
            prompt: "ใช้ systematic-debugging หน้า dashboard ช้าลงหลัง deploy ล่าสุด ช่วยสืบ",
            result: "agent วัดและ โปรไฟล์ ก่อนสรุปจุดที่ทำให้ช้า"
          }
        ],
        cautions: [
          "ห้ามเริ่มจากเดาแล้วแก้ เพราะจะทำให้หลักฐานปนกัน",
          "ถ้าหา root cause ไม่ได้ ให้รายงานสิ่งที่รู้และสิ่งที่ยังไม่รู้ ไม่ใช่ปิดงาน"
        ],
        refs: ref("systematic-debugging"),
        sourcePath: "skills/systematic-debugging/SKILL.md"
      },
      {
        id: "requesting-code-review",
        cat: "code",
        type: "skill",
        name: "requesting-code-review",
        summary: "ขอรีวิวเทียบกับข้อกำหนด เพื่อจับงานที่ยังไม่ครบก่อนรวมเข้า main",
        overview: "ส่ง reviewer subagent ที่ได้ context สร้างใหม่ให้ตรวจงานเทียบกับสเปกและคุณภาพ โฟกัสที่ความถูกต้อง พฤติกรรมที่ขาด และความเสี่ยงก่อน merge ใช้หลังแต่ละ task ใน subagent-driven development หลังฟีเจอร์ใหญ่ และก่อน merge เข้า main",
        prerequisites: [
          "มี diff หรือ branch ที่พร้อมรีวิว",
          "มีสเปกหรือเกณฑ์ที่ใช้ตัดสินว่างานครบ"
        ],
        invoke: invoke("requesting-code-review"),
        examples: [
          {
            title: "ก่อน merge",
            prompt: "ใช้ requesting-code-review ช่วยรีวิว branch นี้เทียบกับสเปกก่อน merge เข้า main",
            result: "ได้รายการปัญหาพร้อมหลักฐานและข้อเสนอ ไม่ใช่แค่ความเห็น"
          },
          {
            title: "หลังทำ task",
            prompt: "ใช้ requesting-code-review รีวิว task ที่เพิ่งทำว่าโค้ดตรง spec และไม่มี regression",
            result: "reviewer ตรวจทั้ง spec compliance และคุณภาพโค้ดแยกกัน"
          },
          {
            title: "ฟีเจอร์ใหญ่",
            prompt: "ใช้ requesting-code-review ตรวจงานทั้ง branch ว่ามี edge case ไหนที่ยังไม่ถูกทดสอบ",
            result: "ได้รายการช่องว่างของเทสและความเสี่ยงที่ต้องแก้ก่อนปล่อย"
          }
        ],
        cautions: [
          "reviewer ต้องไม่ได้รับประวัติเซสชันหลัก ให้ส่งเฉพาะ brief และ diff",
          "อย่ารอจนจบงานใหญ่ครั้งเดียว ให้รีวิวเป็นระยะ"
        ],
        refs: ref("requesting-code-review"),
        sourcePath: "skills/requesting-code-review/SKILL.md"
      },
      {
        id: "receiving-code-review",
        cat: "code",
        type: "skill",
        name: "receiving-code-review",
        summary: "รับฟีดแบ็กแล้วตรวจสอบก่อนเชื่อ ไม่แก้ตามทั้งหมดโดยไม่คิด",
        overview: "รีวิวโค้ดต้องถูกประเมินด้วยเหตุผล ไม่ใช่ด้วยความเกรงใจ ลำดับคือทำความเข้าใจข้อเสนอ ตรวจข้อเท็จจริงในโค้ดหรือเอกสาร ถามเมื่อยังไม่ชัด แล้วจึงแก้เฉพาะข้อที่พิสูจน์ได้ว่าเป็นปัญหาจริง หลีกเลี่ยงการเห็นด้วยเพื่อให้บทสนทนาจบเร็ว",
        prerequisites: [
          "มีฟีดแบ็กหรือคอมเมนต์ที่ต้องตอบ",
          "เข้าถึงโค้ดและเอกสารที่ใช้ตรวจข้อกล่าวอ้าง"
        ],
        invoke: invoke("receiving-code-review"),
        examples: [
          {
            title: "คอมเมนต์กว้าง",
            prompt: "ใช้ receiving-code-review รีวิวบอกว่าโค้ดนี้ซับซ้อนเกินไป ช่วยประเมินว่าจริงไหม",
            result: "agent ตรวจโครงสร้างและอธิบายหลักฐานก่อน Decide จะ refactor"
          },
          {
            title: "ข้อเสนอที่อาจผิด",
            prompt: "ใช้ receiving-code-review reviewer แนะนำให้ใช้ regex แทน parser ช่วยตรวจข้อเสนอก่อน",
            result: "agent ทดสอบเคสจริงและชี้ข้อจำกัดก่อนเปลี่ยนโค้ด"
          },
          {
            title: "หลายคอมเมนต์",
            prompt: "ใช้ receiving-code-review มี 12 คอมเมนต์ใน PR ช่วยจัดลำดับว่าอันไหนควรแก้",
            result: "แยกข้อที่ถูก ข้อที่คลุมเครือ และข้อที่ไม่ควรทำ พร้อมเหตุผล"
          }
        ],
        cautions: [
          "อย่าแปลงทุกคอมเมนต์เป็น patch ทันที ต้องตรวจก่อน",
          "ถ้าไม่เห็นด้วย ให้ตอบด้วยหลักฐาน ไม่ใช่ปฏิเสธเฉย ๆ"
        ],
        refs: ref("receiving-code-review"),
        sourcePath: "skills/receiving-code-review/SKILL.md"
      },
      {
        id: "verification-before-completion",
        cat: "code",
        type: "skill",
        name: "verification-before-completion",
        summary: "รันคำสั่งตรวจสอบจริงและอ่านผลก่อนพูดว่าเสร็จ ผ่าน หรือแก้แล้ว",
        overview: "ใช้ก่อนประกาศผลงาน commit หรือเปิด PR ทุกครั้ง ต้องมีหลักฐานสดจากการรันคำสั่งจริงในสภาพปัจจุบัน ไม่ใช่ความจำหรือผลจากรอบก่อน ครอบคลุมทั้งเทส build typecheck และคำสั่งเฉพาะของโปรเจกต์ ถ้าคำสั่งใดไม่ผ่านต้องรายงานตามจริง",
        prerequisites: [
          "รู้คำสั่งตรวจสอบของโปรเจกต์",
          "มี environment ที่รันคำสั่งเหล่านั้นได้"
        ],
        invoke: invoke("verification-before-completion"),
        examples: [
          {
            title: "ก่อนบอกว่าเสร็จ",
            prompt: "ใช้ verification-before-completion งานเสร็จแล้ว ช่วยตรวจและบอกว่าอะไรผ่านบ้าง",
            result: "agent รันเทส build และ typecheck แล้วอ้างผลจริง"
          },
          {
            title: "ก่อน commit",
            prompt: "ใช้ verification-before-completion จะ commit แล้ว ช่วยยืนยันว่าไม่มีอะไรพัง",
            result: "ได้ผลคำสั่งล่าสุดพร้อม exit code ก่อน commit"
          },
          {
            title: "แก้บั๊กเสร็จ",
            prompt: "ใช้ verification-before-completion แก้บั๊กนี้แล้ว ช่วยพิสูจน์ว่าเคสเดิมผ่านและไม่มี regression",
            result: "รัน reproduction test และชุดเทสที่เกี่ยวข้องแล้วรายงานผล"
          }
        ],
        cautions: [
          "ห้ามอ้างผลจากรอบก่อนหรือจากความจำ ต้องรันใหม่",
          "ถ้าไม่สามารถรันได้ ให้บอกข้อจำกัด ไม่ใช่เดาว่าผ่าน"
        ],
        refs: ref("verification-before-completion"),
        sourcePath: "skills/verification-before-completion/SKILL.md"
      },
      {
        id: "using-git-worktrees",
        cat: "code",
        type: "skill",
        name: "using-git-worktrees",
        summary: "แยก workspace ด้วย git worktree เพื่อไม่ให้งานใหม่ปนกับงานที่ค้างอยู่",
        overview: "เริ่มจากตรวจว่าอยู่ใน isolated workspace อยู่แล้วหรือไม่ ถ้ามี native worktree tool ของ harness ให้ใช้ก่อน ถ้าไม่มีจึงสร้าง git worktree เอง เป้าหมายคือแยก branch และไฟล์งานใหม่ออกจาก workspace ปัจจุบัน โดยไม่ต่อสู้กับเครื่องมือของ harness",
        prerequisites: [
          "อยู่ใน git repository",
          "มีพื้นที่พอสำหรับ worktree ใหม่"
        ],
        invoke: invoke("using-git-worktrees"),
        examples: [
          {
            title: "เริ่มฟีเจอร์แยก",
            prompt: "ใช้ using-git-worktrees เริ่มงาน payment refactor แยกจาก workspace ปัจจุบัน",
            result: "agent ตรวจ isolation แล้วสร้าง worktree หรือใช้ native tool"
          },
          {
            title: "มีงานค้างอยู่",
            prompt: "ใช้ using-git-worktrees มีไฟล์แก้ค้างอยู่ แต่ต้องเริ่มงานใหม่อย่างปลอดภัย",
            result: "agent แยกงานใหม่โดยไม่ stash ทับงานเดิม"
          },
          {
            title: "ก่อนทำตามแผน",
            prompt: "ใช้ using-git-worktrees จะเริ่มแผน implement แล้ว ช่วยเตรียม workspace ที่แยก",
            result: "ได้ worktree พร้อม branch และ path ให้ทำงานต่อ"
          }
        ],
        cautions: [
          "ตรวจก่อนว่าอยู่ใน worktree อยู่แล้ว อย่าสร้างซ้ำ",
          "บน Windows ต้องระวัง path ยาวและสิทธิ์ของ git worktree"
        ],
        refs: ref("using-git-worktrees"),
        sourcePath: "skills/using-git-worktrees/SKILL.md"
      },
      {
        id: "finishing-a-development-branch",
        cat: "code",
        type: "skill",
        name: "finishing-a-development-branch",
        summary: "ตัดสินใจวิธีรวมงานกลับเมื่อเทสผ่านครบแล้ว",
        overview: "ใช้เมื่อ implementation จบและชุดเทสเขียว ลำดับคือยืนยันผลเทส ตรวจสภาพแวดล้อมและ branch จากนั้นเสนอทางเลือกให้ผู้ใช้ตัดสินใจ ได้แก่ merge, เปิด PR, หรือทิ้งงาน แล้วดำเนินการตามที่เลือกและเก็บกวาด worktree หรือ branch ที่ไม่ใช้",
        prerequisites: [
          "งาน implementation เสร็จและเทสผ่าน",
          "รู้ว่าปลายทางคือ branch ไหนหรือ PR"
        ],
        invoke: invoke("finishing-a-development-branch"),
        examples: [
          {
            title: "จบฟีเจอร์",
            prompt: "ใช้ finishing-a-development-branch ฟีเจอร์เสร็จและเทสเขียวแล้ว ช่วยปิดงาน",
            result: "agent เสนอ merge หรือ PR พร้อมผลกระทบ แล้วทำตามที่เลือก"
          },
          {
            title: "ยังไม่พร้อม merge",
            prompt: "ใช้ finishing-a-development-branch งานเสร็จแต่ยังไม่อยาก merge ตอนนี้ มีทางเลือกอะไร",
            result: "agent อธิบายทางเลือกและผลของการเก็บ branch ไว้"
          },
          {
            title: "ทิ้งงานทดลอง",
            prompt: "ใช้ finishing-a-development-branch prototype นี้ไม่ไปต่อแล้ว ช่วยเก็บกวาดให้เรียบร้อย",
            result: "agent ยืนยันก่อนลบ branch หรือ worktree แล้วจึงเก็บกวาด"
          }
        ],
        cautions: [
          "ถ้าเทสไม่ผ่าน ให้หยุดและรายงาน ไม่ควรเข้าสู่เมนูรวมงาน",
          "การลบ branch หรือ worktree เป็นการย้อนยาก ต้องยืนยันก่อน"
        ],
        refs: ref("finishing-a-development-branch"),
        sourcePath: "skills/finishing-a-development-branch/SKILL.md"
      },
      {
        id: "writing-skills",
        cat: "meta",
        type: "skill",
        name: "writing-skills",
        summary: "เขียน แก้ และตรวจ skill ให้คำอธิบายชัด ไม่ซ้ำ และทำงานได้จริงก่อน deploy",
        overview: "มองการเขียน skill เป็น TDD สำหรับเอกสารกระบวนการ เริ่มจากเขียน pressure scenario และดูพฤติกรรม baseline ที่ยังไม่มี skill จากนั้นเขียน skill แล้วทดสอบว่าทำให้ agent ทำถูกขึ้นจริง ปิดช่องโหว่และปรับถ้อยคำจนผ่าน จึงถือว่า skill พร้อมใช้",
        prerequisites: [
          "เข้าใจ TDD พื้นฐานของ superpowers",
          "รู้ runtime และ path ที่ skill จะถูกติดตั้ง"
        ],
        invoke: invoke("writing-skills"),
        examples: [
          {
            title: "สร้าง skill ใหม่",
            prompt: "ใช้ writing-skills อยากเขียน skill สำหรับตรวจ migration ที่ลืม index",
            result: "agent สร้าง baseline scenario ก่อนร่าง SKILL.md"
          },
          {
            title: "แก้ skill ที่ไม่ทำงาน",
            prompt: "ใช้ writing-skills skill นี้ agent มักข้ามขั้นตอน ช่วยหาช่องโหว่",
            result: "agent ทดสอบกับ subagent และแก้ถ้อยคำตามหลักฐาน"
          },
          {
            title: "ตรวจก่อน deploy",
            prompt: "ใช้ writing-skills ตรวจ skill นี้ให้หน่อยว่าพร้อมใช้จริงไหม",
            result: "มีผลทดสอบว่า agent ทำตาม และรายการช่องโหว่ที่ยังเหลือ"
          }
        ],
        cautions: [
          "ห้าม deploy skill ที่ยังไม่เคยเห็น agent ล้มเหลวโดยไม่มี skill",
          "path ของ skill ต่างกันตาม runtime เช่น ~/.claude/skills/ หรือ ~/.agents/skills/"
        ],
        refs: ref("writing-skills"),
        sourcePath: "skills/writing-skills/SKILL.md"
      },
      {
        id: "diagnosing-superpowers",
        cat: "meta",
        type: "skill",
        name: "diagnosing-superpowers",
        summary: "ย้อนดูเซสชันที่ผ่านมาว่าเสียตรงไหน พร้อมหลักฐาน path:line",
        overview: "ใช้เมื่อเซสชัน superpowers ผิดปกติ เช่น งานซ้ำ plan ถูกเพิกเฉย skill ไม่ทำงาน ใช้เวลานาน หรือผลลัพธ์ไม่ดี skill นี้ช่วยตกลงขอบเขตปัญหา อ่าน transcript บนดิสก์ แล้วรายงานสิ่งที่เกิดขึ้นพร้อม citation ทุกข้อสรุปต้องอ้าง path:line และตัวเลขต้องมาจาก transcript หรือคำสั่งที่รันจริง",
        prerequisites: [
          "มี transcript หรือ path ของเซสชันที่ต้องการตรวจ",
          "ผู้ใช้ยืนยันว่าปัญหาคืออะไร"
        ],
        invoke: invoke("diagnosing-superpowers"),
        examples: [
          {
            title: "งานใช้เวลานานผิดปกติ",
            prompt: "ใช้ diagnosing-superpowers เซสชันนี้ใช้เวลานานมาก ช่วยหาว่าเวลาหายไปไหน",
            result: "ได้ไทม์ไลน์พร้อม citation และจุดที่ทำให้ช้า"
          },
          {
            title: "skill ไม่ทำงาน",
            prompt: "ใช้ diagnosing-superpowers brainstorming ไม่ถูกเรียกทั้งที่ควร ช่วยดูว่าทำไม",
            result: "agent ตรวจ transcript และชี้จุดที่ไม่มีการโหลด skill"
          },
          {
            title: "สร้าง bug report",
            prompt: "ใช้ diagnosing-superpowers ช่วยสรุปเป็น bug report สำหรับ maintainer",
            result: "ได้รายงานที่อ้างหลักฐานและแยกข้อเท็จจริงออกจากสมมติฐาน"
          }
        ],
        cautions: [
          "บทบาทคือรายงาน ไม่ใช่แก้ superpowers เอง",
          "ทุก finding ต้องมี path:line ถ้าไม่มี citation ให้ถือว่ายังไม่ยืนยัน"
        ],
        refs: ref("diagnosing-superpowers"),
        sourcePath: "skills/diagnosing-superpowers/SKILL.md"
      }
    ],
    idKey: "id",
    unit: "ทักษะ",
    catLabel: { process: "กระบวนการ", code: "โค้ด", meta: "พื้นฐาน" },
    collection: {
      repo: REPO,
      version: "7.0.0",
      license: "MIT",
      verifiedAt: "2026-10-23"
    }
  };
})();
