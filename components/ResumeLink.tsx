import site from '@/data/site.json';
import { open } from 'node:fs/promises';
import path from 'node:path';
import { isAssetPath } from '@/lib/validation';
export async function ResumeLink() {
  const file = site.resumePath;
  if (!isAssetPath(file)) return null;
  try {
    const handle = await open(path.join(process.cwd(), 'public', file), 'r');
    const signature = Buffer.alloc(5);
    try { await handle.read(signature, 0, 5, 0); } finally { await handle.close(); }
    if (signature.toString() !== '%PDF-') return null;
  } catch { return null; }
  return <a className="button secondary" href={file} download="Aektaphong-Lonhin-Resume.pdf">ดาวน์โหลดเรซูเม่</a>;
}
