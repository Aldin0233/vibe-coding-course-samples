import { ArrowRight, BookOpen, Code2, GitFork } from 'lucide-react';
import { withBasePath } from '@/lib/base-path';

export const dynamic = 'force-static';

export default function GuidePicker() {
  return (
    <main className="guide-picker-page">
      <header className="picker-header">
        <a className="picker-brand" href={withBasePath('/')} aria-label="코딩 시작 가이드 선택 화면">
          <span><BookOpen size={20} aria-hidden="true" /></span>
          코딩 시작 가이드
        </a>
      </header>

      <section className="picker-hero" aria-labelledby="picker-title">
        <p className="picker-eyebrow">화면을 골라 바로 시작하세요</p>
        <h1 id="picker-title">어떤 가이드를<br />보고 싶으세요?</h1>
        <p className="picker-copy">지금 배우려는 도구를 선택하면 해당 화면 가이드로 바로 이동합니다.</p>

        <div className="guide-choice-grid">
          <a className="guide-choice github-choice" href={withBasePath('/github/')}>
            <span className="choice-status">지금 이용 가능</span>
            <span className="choice-icon"><GitFork size={31} aria-hidden="true" /></span>
            <span className="choice-content">
              <b>GitHub</b>
              <span>저장소 만들기부터 파일 업로드, Pages 공개까지</span>
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
        </div>
      </section>
    </main>
  );
}
