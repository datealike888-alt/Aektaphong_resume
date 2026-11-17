import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'เอกธพงษ์ ลอนหิน | Junior Web Developer', template: '%s | Aektaphong Lonhin' },
  description: 'Portfolio ของ เอกธพงษ์ ลอนหิน ผู้สำเร็จการศึกษาวิศวกรรมคอมพิวเตอร์ สนใจตำแหน่ง Junior Web Developer พร้อมผลงาน JBM Pro Auto และ GoSkillUp',
  icons: { icon: '/assets/favicon.svg' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="th"><body><a className="skip-link" href="#main">ข้ามไปเนื้อหาหลัก</a><Header />{children}<footer className="footer container"><p>© {new Date().getFullYear()} Aektaphong Lonhin</p><a href="/#home">กลับด้านบน <span aria-hidden="true">↑</span></a></footer></body></html>;
}
