'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main id="main" className="section container" tabIndex={-1}><h1>โหลดข้อมูลไม่สำเร็จ</h1><p role="alert">กรุณาลองอีกครั้งภายหลัง</p><button className="button secondary" onClick={reset}>ลองอีกครั้ง</button></main>;
}
