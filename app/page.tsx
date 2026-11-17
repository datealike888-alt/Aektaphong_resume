import { NavigationLink } from '@/components/NavigationLink';
import { Hero, Experience, Skills, Education, Contact } from '@/components/StaticSections';
import { Certificates, Projects } from '@/components/Collections';
export default async function Home() {
  const [projects, certificates] = await Promise.all([Projects(), Certificates({ featured: true })]);
  return <main id="main" tabIndex={-1}>
    <Hero />
    <section className="section projects-section" id="projects" aria-labelledby="projects-title"><div className="container"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="projects-title">ผลงานเด่น</h2></div><p>จากโจทย์จริง สู่เว็บแอปพลิเคชันที่ใช้งานได้</p></div>{projects}</div></section>
    <Experience /><Skills /><Education />
    <section className="section certificates-section" id="certificates" aria-labelledby="certificates-title"><div className="container"><div className="section-heading"><div><p className="eyebrow">05 / CERTIFICATES & AWARDS</p><h2 id="certificates-title">ใบรับรองและเกียรติบัตร</h2></div><NavigationLink className="text-link" href="/certificates">ดูใบรับรองทั้งหมด <span aria-hidden="true">↗</span></NavigationLink></div>{certificates}</div></section>
    <Contact />
  </main>;
}
