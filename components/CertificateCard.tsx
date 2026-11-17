import type { Certificate } from '@/lib/types';
import { isAssetPath } from '@/lib/validation';
export function CertificateCard({ certificate: c }: { certificate: Certificate }) {
  const hasPdf = isAssetPath(c.pdfPath);
  const documentPath = hasPdf ? c.pdfPath : (isAssetPath(c.imagePath, 'image') ? c.imagePath : '');
  const documentLabel = hasPdf ? 'PDF' : 'ภาพ';
  const extension = hasPdf ? 'pdf' : c.imagePath.split('.').pop();
  const date = new Intl.DateTimeFormat('th-TH', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${c.issuedOn}T00:00:00Z`));
  return <article className="certificate-card flex min-w-0 flex-col" id={`certificate-${c.certificateId}`}>
    <div className="certificate-preview">
      {isAssetPath(c.imagePath, 'image') ? <img src={c.imagePath} alt={`ใบรับรอง ${c.title} — ${c.certificateId}`} width={1240} height={877} loading="lazy" decoding="async" /> : <span className="text-2xl font-bold text-blue-700" role="img" aria-label="เอกสาร PDF">PDF</span>}
    </div>
    <div className="certificate-body flex flex-1 flex-col gap-3">
      <h3 className="break-words">{c.title}</h3>
      <p className="certificate-meta">{c.issuer}<br /><time dateTime={c.issuedOn}>{date}</time><br /><span className="text-sm">Certificate ID: {c.certificateId}</span></p>
      {documentPath && <div className="certificate-actions mt-auto">
        <a className="button secondary" href={documentPath} target="_blank" rel="noopener noreferrer">เปิดดู {documentLabel}<span className="sr-only"> {c.title} (แท็บใหม่)</span></a>
        <a className="button secondary" href={documentPath} download={`${c.certificateId}_Aektaphong_Lonhin.${extension}`}>ดาวน์โหลด {documentLabel}<span className="sr-only"> {c.title}</span></a>
      </div>}
    </div>
  </article>;
}
