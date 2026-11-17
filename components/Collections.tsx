import { getCertificates, getProjects } from '@/lib/data';
import { CertificateCard } from './CertificateCard';
import { ProjectCard } from './ProjectCard';
export async function Projects() {
  let projects;
  try {
    projects = await getProjects();
  } catch {
    return <p role="alert">ยังโหลดข้อมูลผลงานไม่ได้ กรุณาลองใหม่ภายหลัง <a className="text-link" href="/#projects">ลองอีกครั้ง</a></p>;
  }
  return projects.length ? <div className="projects-grid">{projects.map(p => <ProjectCard key={p.slug} project={p} />)}</div> : <p>ยังไม่มีข้อมูลผลงาน</p>;
}
export async function Certificates({ featured = false }: { featured?: boolean }) {
  let all;
  try {
    all = await getCertificates(featured ? { featured: true } : {});
  } catch {
    return <p role="alert">ยังโหลดข้อมูลใบรับรองไม่ได้ กรุณาลองใหม่ภายหลัง <a className="text-link" href={featured ? '/#certificates' : '/certificates'}>ลองอีกครั้ง</a></p>;
  }
  const certificates = featured ? all.slice(0, 3) : all;
  return certificates.length ? <div className="certificates-grid">{certificates.map(c => <CertificateCard key={c.certificateId} certificate={c} />)}</div> : <p className="certificates-empty">กำลังรวบรวมใบรับรองและเกียรติบัตร</p>;
}
