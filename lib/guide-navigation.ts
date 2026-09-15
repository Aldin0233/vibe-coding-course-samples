import vibe from './guides/vibe-coding';
import supabase from './guides/supabase';
import vercel from './guides/vercel';

export type GuideCategory = { title: string; path: string; steps: { title: string; id: string }[] };
const fromGuide = (path: string, guide: typeof vibe): GuideCategory => ({
  title: guide.title, path, steps: guide.steps.map((step, i) => ({ title: step.title, id: `step-${i + 1}` })),
});
export const guideCategories: GuideCategory[] = [
  fromGuide('/vibe-coding/', vibe),
  { title: 'GitHub', path: '/github/', steps: [
    { title: '저장소 생성 버튼 찾기', id: 'start-screen-chooser' },
    { title: '저장소 만들기', id: 'repository-settings' },
    { title: '파일·폴더 업로드', id: 'upload' },
    { title: '폴더와 파일 만들기', id: 'folder-file' },
    { title: 'GitHub Pages (기본 HTML용)', id: 'pages' },
    { title: '파일·ZIP 다운로드', id: 'download' },
  ] },
  { title: 'VS Code', path: '/vscode/', steps: [
    { title: 'VS Code 설치', id: 'vscode-install' },
    { title: '프로젝트 폴더 열기', id: 'vscode-open-folder' },
    { title: 'Live Server (기본 HTML용)', id: 'vscode-live-server' },
    { title: '제한 모드 해제', id: 'vscode-trust' },
    { title: '파일·폴더 만들기', id: 'vscode-create' },
  ] },
  fromGuide('/supabase/', supabase),
  fromGuide('/vercel/', vercel),
];