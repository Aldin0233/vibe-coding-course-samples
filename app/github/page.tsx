import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FilePlus2,
  FolderPlus,
  GitFork,
  LockKeyhole,
  Maximize2,
  Plus,
  Settings,
  Upload,
  X,
} from 'lucide-react';
import type { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { withBasePath } from '@/lib/base-path';

export const dynamic = 'force-static';

const officialDocs = {
  repository: 'https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository',
  upload: 'https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository',
  createFile: 'https://docs.github.com/en/repositories/working-with-files/managing-files/creating-new-files',
  pages: 'https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site',
};

export const metadata: Metadata = {
  title: 'GitHub 시작 가이드 | 저장소부터 Pages까지',
  description: '저장소 만들기부터 파일 업로드, 폴더·파일 생성, GitHub Pages 공개까지 화면으로 따라가는 가이드',
  openGraph: { title: 'GitHub 시작 가이드', description: '저장소 만들기 · 파일 올리기 · Pages 공개', url: '/github', images: [] },
  twitter: { card: 'summary', title: 'GitHub 시작 가이드', description: '저장소 만들기 · 파일 올리기 · Pages 공개', images: [] },
};

function ResultBox({ children }: { children: React.ReactNode }) {
  return <div className="result-box"><CheckCircle2 size={19} aria-hidden="true" /><div><strong>정상 결과</strong>{children}</div></div>;
}

function HelpBox({ children }: { children: React.ReactNode }) {
  return <details className="help-box"><summary><AlertTriangle size={18} aria-hidden="true" /> 막혔을 때 확인</summary><div className="help-body">{children}</div></details>;
}

function ZoomImage({ src, alt, width, height, focus = 'center' }: { src: string; alt: string; width: number; height: number; focus?: 'left' | 'center' | 'right' }) {
  const imageSrc = withBasePath(src);
  return (
    <a className={`shot-link focus-${focus}`} href={imageSrc} target="_blank" rel="noreferrer" aria-label={`${alt} — 크게 보기`}>
      <img src={imageSrc} alt={alt} width={width} height={height} loading="lazy" />
      <span className="zoom-hint">크게 보기 <ExternalLink size={13} aria-hidden="true" /></span>
    </a>
  );
}

function EmptyRepositoryImage({ alt, target = 'both' }: { alt: string; target?: 'both' | 'create' | 'upload' }) {
  const imageSrc = withBasePath('/empty-repository-quick-setup.png');
  return (
    <a className="shot-link empty-repository-link" href={imageSrc} target="_blank" rel="noreferrer" aria-label={`${alt} — 크게 보기`}>
      <img src={imageSrc} alt={alt} width={1435} height={1096} loading="lazy" />
      {target !== 'upload' ? <span className="quick-link-target quick-create-target" aria-hidden="true" /> : null}
      {target !== 'create' ? <span className="quick-link-target quick-upload-target" aria-hidden="true" /> : null}
      <span className="zoom-hint">크게 보기 <ExternalLink size={13} aria-hidden="true" /></span>
    </a>
  );
}

type DashboardState = 'empty' | 'existing';

const dashboardScreens = {
  empty: {
    src: '/github-empty-dashboard.png',
    title: '저장소가 없는 GitHub 대시보드',
    alt: '저장소가 없는 GitHub 대시보드 전체 화면. 왼쪽 Create repository 버튼과 오른쪽 위 더하기 버튼이 강조되어 있습니다.',
    primaryTarget: 'empty-target',
    plusTarget: 'empty-plus-target',
  },
  existing: {
    src: '/github-dashboard-with-repos.png',
    title: '저장소가 있는 GitHub 대시보드',
    alt: '저장소가 있는 GitHub 대시보드 전체 화면. 왼쪽 Top repositories의 New 버튼과 오른쪽 위 더하기 버튼이 강조되어 있습니다.',
    primaryTarget: 'existing-target',
    plusTarget: 'existing-plus-target',
  },
} as const;

function DashboardCanvas({ state, expanded = false }: { state: DashboardState; expanded?: boolean }) {
  const screen = dashboardScreens[state];

  return (
    <div className={`github-screen${expanded ? ' github-screen-expanded' : ''}`}>
      <img src={withBasePath(screen.src)} alt={screen.alt} width={1680} height={945} loading={expanded ? 'eager' : 'lazy'} />
      {state === 'empty' ? <img className="modern-dashboard-header" src={withBasePath('/github-dashboard-with-repos.png')} alt="" width={1680} height={945} aria-hidden="true" /> : null}
      <span className={`pulse-target ${screen.primaryTarget}`} aria-hidden="true" />
      <button className={`top-plus-target ${screen.plusTarget}`} type="button" aria-label="오른쪽 위 더하기 메뉴의 New repository 경로 보기">
        <span className="plus-target-ring" aria-hidden="true" />
        <span className="plus-menu-preview" role="tooltip">
          <img src={withBasePath('/repo-new-menu.png')} alt="" width={732} height={516} aria-hidden="true" />
          <span className="menu-new-target" aria-hidden="true" />
          <span className="sr-only">GitHub의 전체 더하기 메뉴: New repository, Import repository, New codespace, New gist, New organization. New repository가 강조되어 있습니다.</span>
        </span>
      </button>
    </div>
  );
}

function DashboardView({ state }: { state: DashboardState }) {
  const screen = dashboardScreens[state];

  return (
    <Dialog>
      <div className="dashboard-view">
        <DashboardCanvas state={state} />
        <DialogTrigger render={<button className="screen-expand" type="button" />}>
          <Maximize2 size={14} aria-hidden="true" /> 크게 보기
        </DialogTrigger>
      </div>
      <DialogContent className="screenshot-dialog" showCloseButton={false}>
        <DialogHeader className="screenshot-dialog-header">
          <div>
            <DialogTitle>{screen.title}</DialogTitle>
            <DialogDescription>확대 화면에서도 두 강조 위치를 그대로 확인할 수 있습니다.</DialogDescription>
          </div>
          <DialogClose render={<button className="screenshot-dialog-close" type="button" />}>
            <X size={17} aria-hidden="true" /> 닫기
          </DialogClose>
        </DialogHeader>
        <div className="screenshot-dialog-stage">
          <DashboardCanvas state={state} expanded />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StartScreenSwitcher() {
  return (
    <Tabs defaultValue="empty" className="screen-tabs">
      <TabsList className="screen-tabs-list" aria-label="GitHub 저장소 보유 여부">
        <TabsTrigger value="empty" className="screen-tabs-trigger">저장소 없음</TabsTrigger>
        <TabsTrigger value="existing" className="screen-tabs-trigger">저장소 있음</TabsTrigger>
      </TabsList>
      <TabsContent value="empty" className="screen-panel">
        <DashboardView state="empty" />
        <p className="screen-caption"><b>저장소가 0개</b>라면 왼쪽에 <b>Create your first project</b> 빈 상태가 나타납니다.</p>
      </TabsContent>
      <TabsContent value="existing" className="screen-panel">
        <DashboardView state="existing" />
        <p className="screen-caption"><b>저장소가 1개 이상</b>이면 왼쪽에 <b>Top repositories</b> 목록과 <b>New</b>가 나타납니다.</p>
      </TabsContent>
    </Tabs>
  );
}

function FileStateUploadSwitcher() {
  return (
    <Tabs defaultValue="empty" className="file-state-tabs">
      <TabsList className="screen-tabs-list file-state-tabs-list" aria-label="저장소 파일 유무">
        <TabsTrigger value="empty" className="screen-tabs-trigger file-state-tabs-trigger">파일 없음</TabsTrigger>
        <TabsTrigger value="existing" className="screen-tabs-trigger file-state-tabs-trigger">파일 있음</TabsTrigger>
      </TabsList>
      <TabsContent value="empty" className="file-state-panel">
        <div className="branch-panel empty-file-branch">
          <div className="branch-heading"><span>A</span><div><b>파일이 하나도 없는 저장소</b><p>파란 <b>Quick setup</b> 문장 안의 <b>uploading an existing file</b> 링크를 누릅니다.</p></div></div>
          <figure className="official-shot empty-repo-shot"><EmptyRepositoryImage target="upload" alt="빈 GitHub 저장소에서 uploading an existing file 링크가 강조된 Quick setup 화면" /><figcaption><span>1</span> 반짝이는 <b>uploading an existing file</b> 선택</figcaption></figure>
        </div>
      </TabsContent>
      <TabsContent value="existing" className="file-state-panel">
        <div className="branch-panel filled-file-branch">
          <div className="branch-heading"><span>B</span><div><b>파일이 이미 있는 저장소</b><p>기존 파일 목록 위의 <b>Add file</b>을 열어 <b>Upload files</b>를 선택합니다.</p></div></div>
          <div className="image-pair dark-images">
            <figure className="official-shot"><ZoomImage src="/add-file.png" alt="GitHub 저장소 파일 목록 위의 Add file 버튼이 강조된 화면" width={1730} height={324} focus="right" /><figcaption><span>1</span> 파일 목록 위 <b>Add file</b></figcaption></figure>
            <figure className="official-shot"><ZoomImage src="/upload-files.png" alt="Add file 메뉴가 열리고 Upload files 항목이 강조된 화면" width={1830} height={320} focus="right" /><figcaption><span>2</span> 메뉴의 <b>Upload files</b></figcaption></figure>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function StepTitle({ number, icon, eyebrow, title, children }: { number: string; icon: React.ReactNode; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="step-title">
      <span className="step-number" aria-hidden="true">{number}</span>
      <div className="step-icon" aria-hidden="true">{icon}</div>
      <div><p className="step-eyebrow">{eyebrow}</p><h2>{title}</h2><p>{children}</p></div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#guide">본문 바로가기</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="GitHub 시작 가이드 처음으로">
          <span className="brand-mark"><GitFork size={20} aria-hidden="true" /></span><span>GitHub 시작 가이드</span>
        </a>
        <nav className="header-nav" aria-label="주요 이동"><a href={withBasePath('/')}>가이드 선택</a><a href="#guide">가이드 보기</a><a href="#pages">Pages 배포</a></nav>
      </header>

      <nav className="guide-remote" aria-label="가이드 단계 바로가기">
        <a href="#start-screen-chooser" aria-label="1단계 저장소 생성 버튼 찾기로 이동"><span>1</span><b>생성 버튼 찾기</b></a>
        <a href="#repository-settings" aria-label="2단계 저장소 만들기로 이동"><span>2</span><b>저장소 만들기</b></a>
        <a href="#upload" aria-label="3단계 파일 업로드로 이동"><span>3</span><b>파일 업로드</b></a>
        <a href="#folder-file" aria-label="4단계 폴더와 파일 만들기로 이동"><span>4</span><b>폴더·파일</b></a>
        <a href="#pages" aria-label="5단계 Pages 공개로 이동"><span>5</span><b>Pages 공개</b></a>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy-wrap">
          <div className="eyebrow"><BookOpen size={15} aria-hidden="true" /> 비개발자를 위한 화면 따라하기</div>
          <h1 id="hero-title">파일 한 장에서<br /><span>웹 주소 하나까지.</span></h1>
          <p className="hero-copy">어려운 명령어 없이 GitHub 화면만 따라갑니다. 저장소를 만들고, 파일과 폴더를 넣고, 마지막에는 누구나 열 수 있는 정적 페이지 주소를 확인하세요.</p>
          <div className="hero-actions">
            <a className="primary-action" href="#choose-path">내 시작 화면 고르기 <ArrowDown size={18} aria-hidden="true" /></a>
            <span className="time-note">준비: GitHub 계정, 올릴 파일</span>
          </div>
        </div>
        <aside className="journey-card" aria-label="이 가이드의 순서">
          <p>가이드 순서</p>
          <ol><li><span>1</span> 저장소 만들기</li><li><span>2</span> 파일 업로드</li><li><span>3</span> 폴더와 파일 만들기</li><li><span>4</span> Pages로 공개하기</li></ol>
        </aside>
      </section>

      <section className="path-section" id="choose-path" aria-labelledby="path-title">
        <div className="section-kicker">먼저, 지금 화면을 확인하세요</div>
        <h2 id="path-title">두 시작점 중 하나만 고르면 됩니다.</h2>
        <div className="route-grid">
          <a className="route-card primary-route" href="#start-screen-chooser"><span className="route-number">A</span><div><strong>저장소가 하나도 없어요</strong><span>빈 상태의 <b>Create repository</b> 확인</span></div><ArrowRight size={22} aria-hidden="true" /></a>
          <a className="route-card" href="#start-screen-chooser"><span className="route-number">B</span><div><strong>저장소가 이미 있어요</strong><span><b>Top repositories</b>의 <b>New</b> 확인</span></div><ArrowRight size={22} aria-hidden="true" /></a>
        </div>
        <p className="path-note"><LockKeyhole size={16} aria-hidden="true" /> 예시 화면에는 개인 계정명, 이메일, 인증 정보가 없습니다.</p>
      </section>

      <div id="guide">
        <section className="guide-section" id="start-screen-chooser">
          <StepTitle number="A/B" icon={<Plus size={23} />} eyebrow="저장소 유무에 따라 화면이 다릅니다" title="내 화면을 선택하고 강조된 버튼을 찾으세요">왼쪽 전환 버튼에서 <b>저장소 없음</b> 또는 <b>저장소 있음</b>을 선택하세요. GitHub 전체 화면은 바뀌지만 오른쪽 안내는 그대로입니다.</StepTitle>
          <div className="screen-layout">
            <StartScreenSwitcher />
            <div className="instruction-card"><span className="instruction-label">선택한 화면에서</span><p className="ui-phrase">반짝이는 두 시작점</p><ol className="plain-steps"><li><b>저장소 없음</b>: <b>Create repository</b>를 누릅니다.</li><li><b>저장소 있음</b>: <b>Top repositories</b>의 <b>New</b>를 누릅니다.</li><li><b>공통 경로</b>: 오른쪽 위 <b>+</b>에 마우스를 올려 <b>New repository</b>를 확인합니다.</li></ol><p className="micro-note">크게 보기에서도 강조는 유지됩니다. 확대 화면 오른쪽 위 <b>닫기</b>로 돌아오세요.</p></div>
          </div>
          <HelpBox><ul><li>두 버튼 모두 보이지 않거나 모바일이라면 오른쪽 위 <b>+</b>를 눌러 <b>New repository</b>를 선택하세요.</li><li>다른 GitHub 화면에 있다면 왼쪽 위 GitHub 로고를 누르면 대시보드로 돌아갑니다.</li><li>로그인 화면이 보이면 먼저 GitHub 계정으로 로그인하세요.</li></ul></HelpBox>
        </section>

        <section className="guide-section" id="repository-settings">
          <StepTitle number="01" icon={<GitFork size={23} />} eyebrow="빈 저장소 만들기" title="이름만 정하고 빈 저장소를 만드세요">Owner는 내 개인 계정, Repository name은 짧은 영문 이름을 선택합니다. 이번 흐름에서는 <b>Public</b>만 선택하고 <b>Add README</b>는 체크하지 않습니다.</StepTitle>
          <div className="image-pair">
            <figure className="official-shot"><ZoomImage src="/repo-owner.png" alt="새 저장소 설정 화면에서 Choose an owner 메뉴가 강조된 모습" width={1528} height={304} focus="left" /><figcaption><span>1</span> <b>Owner</b>에서 내 개인 계정을 선택</figcaption></figure>
            <figure className="official-shot"><ZoomImage src="/repo-name.png" alt="Repository name 칸에 hello를 입력하고 사용 가능하다는 안내가 뜬 모습" width={1528} height={350} focus="right" /><figcaption><span>2</span> <b>Repository name</b>에 예: <code>my-first-site</code></figcaption></figure>
          </div>
          <div className="settings-list">
            <div><span>3</span><div><b>Choose visibility → Public</b><p>GitHub Free에서 Pages를 쉽게 공개하려면 Public이 가장 단순합니다.</p></div></div>
            <div><span>4</span><div><b>Add README → Off</b><p>파일이 하나도 없는 저장소 화면부터 따라가기 위해 체크하지 않습니다.</p></div></div>
            <div><span>5</span><div><b>Create repository</b><p>맨 아래 초록색 버튼을 누릅니다.</p></div></div>
          </div>
          <figure className="official-shot empty-repo-shot"><EmptyRepositoryImage alt="파일이 하나도 없는 GitHub 저장소의 Quick setup 화면. creating a new file과 uploading an existing file 링크가 강조되어 있습니다." /><figcaption><span>6</span> 반짝이는 두 링크가 보이면 다음 단계로 이동할 수 있습니다.</figcaption></figure>
          <ResultBox><p><b>creating a new file</b>과 <b>uploading an existing file</b> 링크가 보이면 빈 저장소 만들기가 완료된 상태입니다.</p></ResultBox>
          <HelpBox><ul><li>이름 아래 빨간 안내가 나오면 이미 사용 중이거나 규칙에 맞지 않는 이름입니다. 공백 대신 <code>-</code>를 쓰세요.</li><li>Owner 목록에 조직만 보인다면 개인 계정이 선택되어 있는지 다시 확인하세요.</li><li>Pages로 공개할 파일에는 비밀번호, API 키, 주민번호 같은 민감 정보를 넣지 마세요.</li></ul></HelpBox>
          <a className="docs-link" href={officialDocs.repository} target="_blank" rel="noreferrer">GitHub 공식 문서로 확인 <ExternalLink size={15} aria-hidden="true" /></a>
        </section>

        <section className="guide-section dark-section" id="upload">
          <StepTitle number="02" icon={<Upload size={23} />} eyebrow="파일 업로드" title="파일 유무에 따라 시작 버튼이 다릅니다">저장소에 파일이 없으면 <b>Quick setup</b>에서, 파일이 하나라도 있으면 파일 목록 위 <b>Add file</b>에서 시작합니다.</StepTitle>
          <FileStateUploadSwitcher />
          <p className="common-flow-label">여기서부터 두 화면이 같습니다</p>
          <ol className="wide-steps"><li><span>1</span><div><b>파일 선택</b><p>점선 상자에 파일·폴더를 끌어 놓거나 <b>choose your files</b>를 누릅니다.</p></div></li><li><span>2</span><div><b>목록 확인</b><p>파일명이 화면에 나타나고 업로드가 끝날 때까지 기다립니다.</p></div></li><li><span>3</span><div><b>Commit changes</b><p>변경 설명은 예: <code>첫 파일 업로드</code>로 쓰고 초록색 버튼을 누릅니다.</p></div></li></ol>
          <ResultBox><p>저장소 파일 목록에 방금 올린 파일명이 보이면 성공입니다.</p></ResultBox>
          <HelpBox><ul><li>웹 브라우저 업로드는 파일 1개당 25 MiB, 한 번에 최대 100개까지 가능합니다.</li><li>초록색 버튼이 비활성화되어 있으면 업로드가 끝나지 않았거나 같은 이름의 파일이 충돌한 경우입니다.</li><li>직접 커밋할 권한이 없으면 <b>Propose changes</b>가 보일 수 있습니다. 내 저장소인지 확인하세요.</li></ul></HelpBox>
          <a className="docs-link on-dark" href={officialDocs.upload} target="_blank" rel="noreferrer">GitHub 공식 문서로 확인 <ExternalLink size={15} aria-hidden="true" /></a>
        </section>

        <section className="guide-section" id="folder-file">
          <StepTitle number="03" icon={<FolderPlus size={23} />} eyebrow="폴더와 파일 만들기" title="새 파일 화면을 여는 위치부터 구분하세요">빈 저장소는 <b>creating a new file</b>, 파일이 있는 저장소는 <b>Add file → Create new file</b>로 들어갑니다. 이후 입력 방법은 같습니다.</StepTitle>
          <div className="file-state-choice light-state-choice" aria-label="저장소 파일 유무별 새 파일 만들기 시작점">
            <div><span>파일 없음</span><b>creating a new file</b><p><b>Quick setup</b> 문장 안의 링크를 누릅니다. 아직 파일 목록이나 폴더는 보이지 않습니다.</p></div>
            <div><span>파일 있음</span><b>Add file → Create new file</b><p>파일 목록 위 <b>Add file</b> 메뉴에서 새 파일 만들기를 선택합니다.</p></div>
          </div>
          <p className="common-flow-label light-common-label">여기서부터 두 화면이 같습니다</p>
          <div className="folder-demo" aria-label="폴더명과 파일명을 입력하는 예시"><span className="folder-chip">images</span><span className="slash">/</span><span className="file-chip">note.txt</span></div>
          <p className="example-line">예: <code>images/note.txt</code> → <b>images</b> 폴더 안에 <b>note.txt</b> 파일이 만들어집니다.</p>
          <figure className="official-shot wide-shot"><ZoomImage src="/new-file.png" alt="GitHub 새 파일 편집 화면에서 경로와 파일 이름을 입력하는 위치" width={1698} height={728} /><figcaption>파일 이름 칸에서 <code>/</code>를 입력하면 앞부분이 폴더로 바뀝니다.</figcaption></figure>
          <div className="important-note"><FilePlus2 size={24} aria-hidden="true" /><div><b>GitHub에서는 빈 폴더만 따로 만들 수 없습니다.</b><p>Git은 파일을 기록하기 때문에 폴더 안에 파일이 최소 1개 있어야 합니다. 빈 폴더가 필요하면 <code>.gitkeep</code> 같은 작은 파일을 함께 만드세요.</p></div></div>
          <ol className="wide-steps light-steps"><li><span>1</span><div><b>파일 내용 입력</b><p><code>note.txt</code>라면 한 줄이라도 내용을 적습니다.</p></div></li><li><span>2</span><div><b>Commit changes…</b><p>오른쪽 위 버튼을 눌러 변경 내용을 확인합니다.</p></div></li><li><span>3</span><div><b>Commit changes</b><p>팝업의 초록색 버튼으로 저장합니다.</p></div></li></ol>
          <ResultBox><p>파일 목록에 폴더 아이콘과 <code>images</code>가 보이고, 열었을 때 <code>note.txt</code>가 있으면 성공입니다.</p></ResultBox>
          <HelpBox><ul><li><code>/</code>를 넣었는데 폴더가 안 보이면 마지막에 파일 이름과 확장자까지 입력했는지 확인하세요.</li><li>한글 파일명도 쓸 수 있지만 처음에는 영문 소문자, 숫자, <code>-</code> 조합을 권합니다.</li></ul></HelpBox>
          <a className="docs-link" href={officialDocs.createFile} target="_blank" rel="noreferrer">GitHub 공식 문서로 확인 <ExternalLink size={15} aria-hidden="true" /></a>
        </section>

        <section className="guide-section pages-section" id="pages">
          <StepTitle number="04" icon={<Settings size={23} />} eyebrow="정적 페이지 배포" title="Settings에서 Pages를 켜세요">저장소에 <code>index.html</code>이 있어야 첫 화면이 열립니다. 준비됐다면 아래 경로를 순서대로 선택하세요.</StepTitle>
          <div className="pages-path" aria-label="GitHub Pages 설정 경로"><span>Settings</span><ArrowRight size={17} aria-hidden="true" /><span>Pages</span><ArrowRight size={17} aria-hidden="true" /><span>Deploy from a branch</span><ArrowRight size={17} aria-hidden="true" /><span>main</span><ArrowRight size={17} aria-hidden="true" /><span>/(root)</span><ArrowRight size={17} aria-hidden="true" /><span>Save</span></div>
          <div className="pages-grid">
            <figure className="official-shot"><ZoomImage src="/pages-settings.png" alt="저장소 탭 중 Settings가 강조된 화면" width={2196} height={216} focus="right" /><figcaption><span>1</span> 저장소 위쪽 <b>Settings</b></figcaption></figure>
            <div className="text-card"><span>2</span><div><b>왼쪽 메뉴의 Pages</b><p><b>Code and automation</b> 묶음 안에서 찾습니다.</p></div></div>
            <div className="text-card"><span>3</span><div><b>Source: Deploy from a branch</b><p><b>Build and deployment</b> 영역의 Source 메뉴를 엽니다.</p></div></div>
            <figure className="official-shot"><ZoomImage src="/pages-branch.png" alt="GitHub Pages Branch 선택 메뉴가 None인 화면" width={1614} height={296} focus="left" /><figcaption><span>4</span> Branch에서 <b>main</b> 선택</figcaption></figure>
            <figure className="official-shot"><ZoomImage src="/pages-folder.png" alt="GitHub Pages Branch가 main이고 폴더가 root로 선택된 화면" width={1614} height={294} focus="left" /><figcaption><span>5</span> 폴더는 <b>/(root)</b>, 마지막으로 <b>Save</b></figcaption></figure>
          </div>
          <ResultBox><p>잠시 뒤 Pages 화면 위쪽에 <b>Your site is live at</b>과 웹 주소가 나타납니다. 보통 몇 분 걸릴 수 있습니다.</p></ResultBox>
          <p className="after-publish">이후 파일을 수정해 다시 <b>Commit changes</b>하면 같은 주소의 페이지가 업데이트됩니다.</p>
          <HelpBox><ul><li><b>main</b>이 목록에 없으면 저장소에 아직 커밋이 없습니다. 파일을 하나 먼저 저장하세요.</li><li><b>Settings</b>가 안 보이면 탭 오른쪽의 더보기 메뉴를 확인하거나, 저장소 관리 권한이 있는지 확인하세요.</li><li>주소는 생겼는데 404가 나오면 선택한 <b>/(root)</b> 위치에 파일명이 정확히 <code>index.html</code>인지 확인하세요.</li><li>저장 후 바로 열리지 않으면 Actions 탭에서 <b>pages build and deployment</b> 작업이 끝날 때까지 기다리세요.</li></ul></HelpBox>
          <a className="docs-link" href={officialDocs.pages} target="_blank" rel="noreferrer">GitHub 공식 문서로 확인 <ExternalLink size={15} aria-hidden="true" /></a>
        </section>

      </div>

      <footer><p>GitHub UI 명칭은 GitHub 공식 문서를 기준으로 확인했습니다.</p><p>개인 계정명·이메일·인증 정보는 예시 화면에 포함하지 않았습니다.</p></footer>
    </main>
  );
}
