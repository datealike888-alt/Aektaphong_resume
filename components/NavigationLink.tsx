export function NavigationLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return <a href={href === '/certificates' ? '/certificates/' : href} className={className}>{children}</a>;
}
