'use client';
import { useRef, useState } from 'react';
export function CopyLine() {
  const input = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState('เลือก LINE ID เพื่อคัดลอกได้');
  async function copy() {
    try { await navigator.clipboard.writeText('finneko123'); setStatus('คัดลอก LINE ID แล้ว: finneko123'); }
    catch { input.current?.focus(); input.current?.select(); setStatus('เลือกข้อความให้แล้ว กด Ctrl+C / ⌘C หรือแตะค้างเพื่อคัดลอก'); }
  }
  return <><div className="contact-row line-row"><label className="contact-label" htmlFor="line-id">LINE ID</label><input id="line-id" ref={input} value="finneko123" readOnly spellCheck={false} aria-describedby="copy-status" /><button id="copy-line" className="button secondary" type="button" onClick={copy}>คัดลอก</button></div><p className="copy-status" id="copy-status" role="status">{status}</p></>;
}
