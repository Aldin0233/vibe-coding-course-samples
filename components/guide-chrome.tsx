import { withBasePath } from '@/lib/base-path';

export function GuideHeader({ title }: { title: string }) {
  return <header className="site-header unified-header"><span className="unified-header-title">{title}</span><a href={withBasePath('/')}>전체 가이드 <span aria-hidden="true">↗</span></a></header>;
}
export function GuideFooter({ next, nextLabel }: { next?: string; nextLabel?: string }) {
  return <footer className="unified-footer"><div className="unified-footer-links"><a href={withBasePath('/')}>전체 가이드로 돌아가기</a>{next ? <a className="unified-next" href={withBasePath('/' + next + '/')}>{nextLabel ?? '다음 가이드'} <span aria-hidden="true">→</span></a> : null}</div><div className="unified-footer-brand"><span>바이브 코딩 가이드</span><a className="guide-contact" href="mailto:changhyunlee96@gmail.com">문의 · changhyunlee96@gmail.com</a></div></footer>;
}