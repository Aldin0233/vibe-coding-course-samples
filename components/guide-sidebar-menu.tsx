'use client';


import { useEffect, useState } from 'react';

import type { GuideCategory } from '@/lib/guide-navigation';
import { withBasePath } from '@/lib/base-path';

export default function GuideSidebarMenu({ categories }: { categories: GuideCategory[] }) {
  const [pathname, setPathname] = useState('');
  useEffect(() => { setPathname(window.location.pathname); }, []);
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  return <>
    <button className="guide-menu-toggle" aria-expanded={isOpen} aria-controls="guide-sidebar" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <span aria-hidden="true">×</span> : <span aria-hidden="true">☰</span>} 전체 가이드 메뉴
    </button>
    <aside id="guide-sidebar" className={`guide-sidebar${isOpen ? ' is-open' : ''}`} onKeyDown={event => { if (event.key === 'Escape') { close(); document.querySelector<HTMLButtonElement>('.guide-menu-toggle')?.focus(); } }}>
      <a className="guide-sidebar-home" href={withBasePath('/')} onClick={close}> 바이브 코딩 가이드</a>
      <p className="guide-sidebar-hint">카테고리를 열어 원하는 단계로 이동하세요.</p>
      <nav aria-label="전체 가이드와 단계">
        {categories.map(category => {
          const active = pathname.replace(/\/$/, '') === withBasePath(category.path).replace(/\/$/, '');
          return <details className="guide-category" key={`${category.path}-${active}`} open={active}>
            <summary className={active ? 'is-current' : undefined}>{category.title}<span className="category-chevron" aria-hidden="true">⌄</span></summary>
            <div className="guide-category-links">
              <a href={withBasePath(category.path)} aria-current={active ? 'page' : undefined} onClick={close}>가이드 처음부터</a>
              {category.steps.map((step, index) => <a key={step.id} href={`${withBasePath(category.path)}#${step.id}`} onClick={close}><span>{String(index + 1).padStart(2, '0')}</span>{step.title}</a>)}
            </div>
          </details>;
        })}
      </nav>
      <a className="guide-sidebar-all" href={withBasePath('/')} onClick={close}>전체 가이드로 돌아가기</a>
    </aside>
  </>;
}