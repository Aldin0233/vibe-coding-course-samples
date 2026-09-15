import type { Metadata } from 'next';
import './globals.css';
import './guide-design.css';
import GuideSidebar from '@/components/guide-sidebar';

export const metadata: Metadata = {
  metadataBase: new URL('https://github-start-guide.aldin0233.chatgpt.site'),
  title: '바이브 코딩 가이드 | GitHub · VS Code · 바이브 코딩 · Vercel · Supabase',
  description: '개발 도구부터 Vite 변경, 배포와 데이터 연결까지 따라가는 비개발자용 한국어 가이드',
  openGraph: { title: '바이브 코딩 가이드', description: 'GitHub · VS Code · 바이브 코딩 · Vercel · Supabase 화면 가이드를 선택하세요', type: 'website', locale: 'ko_KR', url: '/', images: [{ url: 'https://github-start-guide.aldin0233.chatgpt.site/og.png', width: 1200, height: 630, alt: '바이브 코딩 가이드 — GitHub · VS Code · 바이브 코딩 · Vercel · Supabase' }] },
  twitter: { card: 'summary_large_image', title: '바이브 코딩 가이드', description: 'GitHub · VS Code · 바이브 코딩 · Vercel · Supabase 화면 가이드를 선택하세요', images: ['https://github-start-guide.aldin0233.chatgpt.site/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><GuideSidebar /><div className="guide-workspace">{children}</div></body></html>;
}
