# Item schema

ทุกหน้า docs ใช้ schema เดียวกัน เพื่อให้ `js/core/render.js` วาด list row และหน้าเอกสารได้เอง

```js
NS.pages["<stem>"] = {
  data: [item, ...],
  idKey: "id",
  unit: "ทักษะ",
  catLabel: { catId: "ป้ายไทย" },
  collection: { repo, version, license, verifiedAt },
  prompt: "/..."  // ตัวเลือก — prompt แนะนำใน empty state ของแผงรายละเอียด
};
```

## Item

| field | type | จำเป็น | หมายเหตุ |
|---|---|---|---|
| `id` | string | yes | ต้องไม่ซ้ำ ใช้เป็น hash `#<id>` |
| `cat` | string | yes | รหัสหมวดหมู่สำหรับเส้นทางงานและป้ายกำกับ |
| `type` | string | yes | `skill`, `command`, `cli`, `server`, `agent`, `concept`, `rule` |
| `name` | string | yes | ชื่อที่แสดง ใช้ชื่อจริงจาก repo |
| `summary` | string | yes | 1 บรรทัด สำหรับ list row |
| `overview` | string | yes | 2-4 ประโยค ภาพรวมและกลไก |
| `prerequisites` | string[] | no | สิ่งที่ต้องมีก่อนใช้ |
| `invoke` | object[] | no | `{ label, code, language?, note? }` คำสั่งจริงจาก repo |
| `examples` | object[] | no | `{ title, prompt, result }` 3 อันสำหรับ type ที่เรียกใช้ได้ |
| `cautions` | string[] | no | ข้อควรระวัง 2-3 ข้อ |
| `refs` | object[] | no | `{ label, href }` ลิงก์ GitHub จริง |
| `sourcePath` | string | yes | path ใน repo ต้นทาง |

## กติกา

- `type: concept` และ `type: rule` ไม่ต้องมี `examples` แต่ต้องมี `overview` + `refs`
- `invoke` ต้องคัดลอกคำสั่งจาก README/SKILL.md ของ repo ไม่แปลงข้าม harness
- คำสั่งที่ผู้ใช้พิมพ์ ใช้ `/name` ตาม repo; skill ที่เรียกผ่าน tool ใช้ `skill("name")`
- ตัวอย่าง prompt ทุกตัวต้องอ้างวิธีเรียกของ item ตัวเองนำหน้า เพื่อให้รู้ทันทีว่าเป็นคำสั่งหรือ skill:
  - `type: command` → ขึ้นต้นด้วย `name` เต็ม เช่น `/impeccable craft ช่วยทำ landing page…`
  - `type: skill` → ขึ้นต้นด้วย `/name` ถ้า repo แสดง skill ในเมนู slash (มีหลักฐานเช่น README สอนเรียก `/name` มี `argument-hint` ใน frontmatter หรือมี `/name` ใช้จริงในไฟล์ skill) เช่น `/ui-ux-pro-max Build a landing page…`; ถ้า repo ไม่มีช่องทางเรียกเป็นคำสั่ง ให้อ้างชื่อในประโยค เช่น `ใช้ karpathy-guidelines ช่วยเพิ่มระบบ export…` ห้ามสมมติคำสั่งที่ repo ไม่มี
  - ข้อยกเว้น: prompt ที่คัดลอกข้อความ Usage ตรงจาก README (คั่นด้วย code block) ให้คงข้อความเดิม ไม่เติม prefix — ความถูกต้องตามต้นทางมากกว่ากติกาข้อบน
  - `type: server` → อ้างชื่อเซิร์ฟเวอร์ในประโยค เช่น `ผ่าน Filesystem: ช่วยดูว่ามีไฟล์…` เพราะ server ไม่ใช่คำสั่งที่ผู้ใช้พิมพ์
  - `type: cli` → ถ้า prompt เป็นคำสั่ง shell หรือขั้นตอนจริงตาม repo ให้คงไว้ ไม่ต้องเติม prefix
  - ถ้าใน prompt มี token ของคำสั่งหรือชื่อ skill อยู่แล้ว (ทั้งแบบมี/ไม่มี `/`) ห้ามเติมซ้ำ
- ทุกข้อความภาษาไทย ศัพท์เทคนิคคงภาษาอังกฤษ
- ห้ามแต่งคำสั่ง ตัวเลข หรือ path ที่ไม่มีใน repo
- `sourcePath` ต้องมีไฟล์จริงใน clone ใต้ `../<repo>/`
- เพิ่ม/ลบ item แล้วต้องอัปเดต `components/pages/<stem>/data.json`: `rail.status`, `noscript`, stamp ที่เกี่ยวกับจำนวน
