import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://github-start-guide.aldin0233.chatgpt.site'),
  title: '코딩 시작 가이드 | GitHub · VS Code',
  description: 'GitHub와 VS Code 중 필요한 화면을 골라 시작하는 비개발자용 한국어 가이드',
  openGraph: { title: '코딩 시작 가이드', description: 'GitHub · VS Code 화면 가이드를 선택하세요', type: 'website', locale: 'ko_KR', url: '/', images: [{ url: 'https://github-start-guide.aldin0233.chatgpt.site/og.png', width: 1200, height: 630, alt: '코딩 시작 가이드 — GitHub · VS Code' }] },
  twitter: { card: 'summary_large_image', title: '코딩 시작 가이드', description: 'GitHub · VS Code 화면 가이드를 선택하세요', images: ['https://github-start-guide.aldin0233.chatgpt.site/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
