import type { Project } from '@/lib/types';
import { isAssetPath } from '@/lib/validation';
export function ProjectCard({ project: p }: { project: Project }) {
  const jbm = p.slug === 'jbm-pro-auto';
  return <article className="project" id={p.slug} aria-labelledby={`${p.slug}-title`}>
    <div className="project-media"><div className={`project-cover ${jbm ? 'cover-jbm' : 'cover-goskill'}`} role="img" aria-label={`ปกชื่อโครงการ ${p.title}`}>
      <div className="cover-top"><span>{p.coverLabel}</span><span>{p.coverNumber}</span></div>
      <div className="cover-title">{jbm ? 'JBM' : 'GoSkill'}<span>{jbm ? 'Pro Auto' : 'Up'}<span className="cover-dot">{jbm ? '.' : '↗'}</span></span></div>
      <div className="cover-bottom"><span>{p.coverSubtitle}</span><span aria-hidden="true">↗</span></div>
    </div></div>
    <div className="project-body">
      <p className="project-type">{p.category}</p><h3 id={`${p.slug}-title`}>{p.title}</h3>
      <p className="project-description">{p.description}</p><p className="project-role"><strong>บทบาทของฉัน</strong>{p.role}</p>
      <ul className="tags" aria-label={`เทคโนโลยี ${p.title}`}>{p.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      {isAssetPath(p.documentPath) && <div className="project-links">
        <a className="button secondary" href={p.documentPath} target="_blank" rel="noopener noreferrer">เปิดดูผลงาน PDF<span className="sr-only"> {p.title} (แท็บใหม่)</span></a>
        <a className="button secondary" href={p.documentPath} download={p.documentPath.split('/').pop()}>ดาวน์โหลด PDF<span className="sr-only"> {p.title}</span></a>
      </div>}
      <details className="project-details"><summary><span>ดูรายละเอียด<span className="sr-only"> {p.title}</span></span><span className="detail-symbol" aria-hidden="true">+</span></summary>
        <div className="details-content">{p.details.map(group => <div key={group.heading}><h4>{group.heading}</h4>{group.items.length > 0 && <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>}{group.paragraphs.map(text => <p key={text}>{text}</p>)}</div>)}</div>
      </details>
    </div>
  </article>;
}
