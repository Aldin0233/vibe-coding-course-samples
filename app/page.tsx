import { GuideHeader, GuideFooter } from '@/components/guide-chrome';
import { ArrowRight, BookOpen, Code2, GitFork } from 'lucide-react';
import { withBasePath } from '@/lib/base-path';

export const dynamic = 'force-static';

export default function GuidePicker() {
  return (
    <main className="guide-picker-page">
      <GuideHeader title="바이브 코딩 가이드" />

      <section className="picker-hero" aria-labelledby="picker-title">
        <p className="picker-eyebrow">화면을 골라 바로 시작하세요</p>
        <h1 id="picker-title">어떤 가이드를<br />보고 싶으세요?</h1>
        <p className="picker-copy">지금 배우려는 도구를 선택하면 해당 화면 가이드로 바로 이동합니다.</p>

        <div className="guide-choice-grid">
          <a className="guide-choice" href={withBasePath('/vibe-coding/')}>
            <span className="choice-status">실습 가이드</span>
            <span className="choice-icon"><BookOpen size={31} aria-hidden="true" /></span>
            <span className="choice-content"><b>바이브 코딩</b><span>컨텍스트 · 기획문서 · 파일과 컴포넌트 분리 · 핵심 프롬프트</span></span>
            <span className="choice-action">바이브 코딩 가이드 열기 <ArrowRight size={18} aria-hidden="true" /></span>
          </a>
          <a className="guide-choice github-choice" href={withBasePath('/github/')}>
            <span className="choice-status">지금 이용 가능</span>
            <span className="choice-icon"><GitFork size={31} aria-hidden="true" /></span>
            <span className="choice-content">
              <b>GitHub</b>
              <span>저장소 · 다운로드 · 여러 파일과 폴더 업로드 · Pages</span>
            </span>
            <span className="choice-action">GitHub 가이드 열기 <ArrowRight size={18} aria-hidden="true" /></span>
          </a>

          <a className="guide-choice vscode-choice" href={withBasePath('/vscode/')}>
            <span className="choice-status">별도 화면</span>
            <span className="choice-icon"><Code2 size={31} aria-hidden="true" /></span>
            <span className="choice-content">
              <b>VS Code</b>
              <span>VS Code에서 파일과 프로젝트를 다루는 화면 가이드</span>
            </span>
            <span className="choice-action">VS Code 가이드 열기 <ArrowRight size={18} aria-hidden="true" /></span>
          </a>
          {[['Supabase', 'supabase', '프로젝트 · 표와 RLS · 데이터 연결 코드'], ['Vercel', 'vercel', 'Vite 빌드 설정 · 연결 값 입력 · 배포와 확인']].map(([title, route, description]) => (
            <a key={route} className="guide-choice" href={withBasePath('/' + route + '/')}>
              <span className="choice-status">실습 가이드</span>
              <span className="choice-icon"><BookOpen size={31} aria-hidden="true" /></span>
              <span className="choice-content"><b>{title}</b><span>{description}</span></span>
              <span className="choice-action">{title} 가이드 열기 <ArrowRight size={18} aria-hidden="true" /></span>
            </a>
          ))}
        </div>
      </section>
      <GuideFooter />
    </main>
  );
}
