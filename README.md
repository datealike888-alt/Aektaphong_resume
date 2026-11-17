# Aektaphong Portfolio — static export

Next.js / React / Tailwind CSS สร้าง HTML/CSS/JS ลง `out/` ไม่ใช้ DB, API, Docker หรือ runtime server ทั้ง build และเว็บไซต์ที่เผยแพร่

## รันในเครื่อง

ใช้ Node.js 24.x:

```powershell
npm ci
npm run dev
```

สร้างและทดสอบไฟล์จริง:

```powershell
npm run build
npm start
```

เปิด http://127.0.0.1:3002/ และ http://127.0.0.1:3002/certificates/ (`npm start` เป็น static file server สำหรับตรวจในเครื่องเท่านั้น)
ไม่ต้องตั้ง env ฐานข้อมูล Next.js สร้าง `out/index.html` และ `out/certificates/index.html`; `/index.html` เดิมยังเปิดได้โดยตรง

## ข้อมูลและเอกสาร

- `data/certificates.json`: ข้อมูลสาธารณะที่ยืนยันจาก seed ล่าสุด 17 ใบ หลักฐานเดิม `qa/certificate-ZHTRAWT/results.json` ระบุจำนวน 17; ไม่ได้อ่าน DB ใหม่ในการย้ายครั้งนี้
- `data/projects.json`: JBM Pro Auto และ GoSkillUp
- `lib/data.ts`: อ่าน JSON และเรียงตาม sortOrder/ID เช่นเดิม ไม่มี fetch API
- `public/assets/certificates/`: ภาพเต็มใบและ PDF; เก็บชื่อและตัวพิมพ์ให้ตรงกับ JSON
- เพิ่มใบใหม่โดยคัดลอกไฟล์ชื่อไม่ซ้ำ แล้วเพิ่ม object ท้าย JSON: certificateId, title, issuer, issuedOn (YYYY-MM-DD), pdfPath, imagePath, featured, sortOrder ใช้ ID จากเอกสารจริงและ sortOrder ถัดไป ห้ามทับใบเดิม ตั้ง featured=false เพื่อคงใบเด่นเดิม
- หากไม่มี PDF ที่ตรง ให้ pdfPath เป็นข้อความว่างและ imagePath ชี้ภาพจริง ปุ่มจะเปิด/ดาวน์โหลดภาพแทน ปัจจุบัน 4HVOPCH (Canva Visual Suite) ยังขาด PDF; ห้ามใช้ QQ97F9C แทน
- ลิงก์ใช้ `/assets/...` เปิดแท็บใหม่พร้อม noopener noreferrer และ download ไม่ฝัง PDF อัตโนมัติ
- เรซูเม่เลือกได้ใน `data/site.json` ช่อง resumePath (เช่น `/assets/documents/resume.pdf` เมื่อมีไฟล์จริง) ตอนนี้ว่างตามเดิม ไม่สร้างข้อมูลเรซูเม่เพิ่ม
- เปลี่ยนข้อมูลแล้วต้อง build ใหม่ เพราะไม่มีฐานข้อมูล runtime

## ตรวจเฉพาะส่วน static

```powershell
npm run lint
npm run typecheck
npm test
# เปิด npm start ในอีกหน้าต่างก่อน
$env:QA_BASE_URL = 'http://127.0.0.1:3002'
npm run test:e2e
```

E2E ใช้ Chrome ที่ติดตั้งในเครื่อง ตรวจทั้งสองหน้า เปิดตรง/refresh, เอกสารและ download เทียบ bytes, no-JS, keyboard, responsive 320/390/768/1440 และ console/404 ผลอยู่ `qa/static-export/` ซึ่งไม่เผยแพร่

## Vercel (ยังไม่ deploy)

เฉพาะโปรเจกต์ `aektaphong-portfolio`: Framework Next.js, Root `.`, Node 24.x, Install `npm ci`, Build `npm run build`, Output `out` ไม่ต้องมี DB env หรือ Functions region; `jbm-pro-auto` ไม่ได้เปลี่ยน

เมื่อต้องการเผยแพร่ ให้ใช้ static output `out/` เท่านั้น ไม่อัปโหลดทั้งโฟลเดอร์งาน การ deploy ต้องเป็นคำสั่งงานแยกหลังตรวจผล `.vercelignore` กัน env/archive/legacy/QA และฐานข้อมูลเดิมออกจาก upload

โค้ด DB/API/Docker และ env เดิมเก็บสำรองนอก workspace ตำแหน่งระบุใน TASK-STATUS.md ไม่ลบฐานข้อมูลจริง Docker volume หรือ backup เดิม ไม่มีการเชื่อม TiDB ในการย้ายครั้งนี้
