import { NavigationLink } from '@/components/NavigationLink';
import { Certificates } from '@/components/Collections';
export const metadata = { title: 'ใบรับรองและเกียรติบัตร' };
export default async function CertificatesPage() {
  const certificates = await Certificates({});
  return <main id="main" tabIndex={-1} className="section certificates-section"><div className="container"><NavigationLink className="text-link inline-flex min-h-11 items-center mb-6" href="/#certificates">← กลับหน้า Portfolio</NavigationLink><div className="section-heading"><div><p className="eyebrow">CERTIFICATES & AWARDS</p><h1 className="text-3xl font-bold" id="certificates-title">ใบรับรองและเกียรติบัตร</h1></div></div>{certificates}</div></main>;
}
