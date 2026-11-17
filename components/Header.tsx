'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { NavigationLink } from './NavigationLink';
function subscribe(callback: () => void) {
  const media = window.matchMedia('(max-width: 959px)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
const noSubscribe = () => () => {};
export function Header() {
  const mobile = useSyncExternalStore(subscribe, () => window.matchMedia('(max-width: 959px)').matches, () => false);
  const enhanced = useSyncExternalStore(noSubscribe, () => true, () => false);
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const resize = new ResizeObserver(() => {
      if (!open) document.documentElement.style.setProperty('--header-height', `${el.getBoundingClientRect().height}px`);
    });
    resize.observe(el);
    const outside = (event: MouseEvent) => { if (!el.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('click', outside);
    return () => { resize.disconnect(); document.removeEventListener('click', outside); };
  }, [open]);
  return <header ref={header} className={`header${enhanced ? ' is-enhanced' : ''}`}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => { if (event.key === 'Escape' && mobile && open) { setOpen(false); toggle.current?.focus(); } }}>
    <div className="container nav-container">
      <a className="wordmark" href="/#home" aria-label="Aektaphong Lonhin — หน้าแรก"><span className="monogram" aria-hidden="true">AL<span>.</span></span><span>Aektaphong Lonhin</span></a>
      <button className="nav-toggle" id="nav-toggle" ref={toggle} type="button" hidden={!mobile} aria-expanded={mobile && open} aria-controls="nav-menu" onClick={() => setOpen(!open)}>
        <span>{open ? 'ปิดเมนู' : 'เมนู'}</span><span aria-hidden="true">☰</span>
      </button>
      <nav id="nav-menu" aria-label="เมนูหลัก" hidden={mobile && !open} onClick={event => {
        const anchor = (event.target as HTMLElement).closest('a');
        if (!anchor) return;
        setOpen(false);
        const hash = new URL(anchor.href).hash;
        const target = hash ? document.getElementById(hash.slice(1)) : null;
        if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
      }}>
        <a href="/#projects">ผลงาน</a><a href="/#experience">ประสบการณ์</a><a href="/#skills">ทักษะ</a><a href="/#education">การศึกษา</a><NavigationLink href="/certificates">ใบรับรองและเกียรติบัตร</NavigationLink><a href="/#contact">ติดต่อ <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>;
}
