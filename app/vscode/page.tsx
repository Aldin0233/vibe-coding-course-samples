import type { Metadata } from 'next';
import {
  AlertTriangle,
  Apple,
  ArrowDown,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Command,
  Download,
  ExternalLink,
  FilePlus2,
  FolderOpen,
  FolderPlus,
  GitFork,
  Monitor,
  MousePointerClick,
  Radio,
  ShieldCheck,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { withBasePath } from '@/lib/base-path';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'VS Code 시작 가이드 | 설치부터 Live Server까지',
  description: 'Windows·macOS 설치, 폴더 열기, Live Server, Restricted Mode 해제, 새 파일·폴더 생성을 화면으로 따라가는 가이드',
  openGraph: { title: 'VS Code 시작 가이드', description: '설치 · 폴더 열기 · Live Server · 새 파일 만들기', url: '/vscode', images: [] },
  twitter: { card: 'summary', title: 'VS Code 시작 가이드', description: '설치 · 폴더 열기 · Live Server · 새 파일 만들기', images: [] },
};

const docs = {
  download: 'https://code.visualstudio.com/download',
  windows: 'https://code.visualstudio.com/docs/setup/windows',
  mac: 'https://code.visualstudio.com/docs/setup/mac',
  editor: 'https://code.visualstudio.com/docs/editing/getting-started/editor-tutorial',
  trust: 'https://code.visualstudio.com/docs/editing/workspaces/workspace-trust',
  liveServer: 'https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer',
};

function VsStepTitle({ number, icon, eyebrow, title, children }: { number: string; icon: React.ReactNode; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="vs-step-title">
      <span className="vs-step-number">{number}</span>
      <span className="vs-step-icon" aria-hidden="true">{icon}</span>
      <div><p>{eyebrow}</p><h2>{title}</h2><div className="vs-step-copy">{children}</div></div>
    </div>
  );
}

function VsImage({ src, alt, width, height, target, caption }: { src: string; alt: string; width: number; height: number; target?: string | string[]; caption: React.ReactNode }) {
  const targets = target ? (Array.isArray(target) ? target : [target]) : [];
  const imageSrc = withBasePath(src);
  return (
    <figure className="vs-shot">
      <a className="shot-link" href={imageSrc} target="_blank" rel="noreferrer" aria-label={`${alt} — 크게 보기`}>
        <img src={imageSrc} alt={alt} width={width} height={height} loading="lazy" />
        {targets.map((targetClass) => <span key={targetClass} className={`vs-pulse-target ${targetClass}`} aria-hidden="true" />)}
        <span className="zoom-hint">크게 보기 <ExternalLink size={13} aria-hidden="true" /></span>
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Result({ children }: { children: React.ReactNode }) {
  return <div className="vs-result"><CheckCircle2 size={20} aria-hidden="true" /><div><b>이렇게 보이면 완료</b><p>{children}</p></div></div>;
}

export default function VsCodeGuide() {
  return (
    <main className="vscode-page vscode-guide-page" id="vscode-top">
      <a className="skip-link" href="#vscode-guide">본문 바로가기</a>

      <header className="site-header">
        <a className="brand" href="#vscode-top" aria-label="VS Code 시작 가이드 처음으로">
          <span className="brand-mark vscode-brand-mark"><Code2 size={20} aria-hidden="true" /></span>
          <span>VS Code 시작 가이드</span>
        </a>
        <nav className="header-nav" aria-label="다른 가이드 이동"><a href={withBasePath('/')}>가이드 선택</a><a href={withBasePath('/github/')}>GitHub 가이드</a></nav>
      </header>

      <nav className="guide-remote vscode-remote" aria-label="VS Code 가이드 단계 바로가기">
        <a href="#vscode-install"><span>1</span><b>설치</b></a>
        <a href="#vscode-open-folder"><span>2</span><b>폴더 열기</b></a>
        <a href="#vscode-live-server"><span>3</span><b>Live Server</b></a>
        <a href="#vscode-trust"><span>4</span><b>제한 해제</b></a>
        <a href="#vscode-create"><span>5</span><b>파일·폴더</b></a>
      </nav>

      <section className="vscode-guide-hero" aria-labelledby="vscode-title">
        <div>
          <p className="vscode-eyebrow"><Code2 size={16} aria-hidden="true" /> 화면으로 따라가는 VS CODE</p>
          <h1 id="vscode-title">폴더를 열고,<br /><span>웹 화면을 띄우기까지.</span></h1>
          <p className="vscode-hero-copy">Windows와 macOS 중 내 화면을 고른 뒤 그대로 따라가세요. 설치 옵션부터 Live Server 실행, Restricted Mode, 새 파일과 폴더 만들기까지 한 흐름으로 이어집니다.</p>
          <a className="vscode-start" href="#vscode-install">설치부터 시작 <ArrowDown size={18} aria-hidden="true" /></a>
        </div>
        <aside className="vscode-journey" aria-label="VS Code 가이드 순서">
          <p>가이드 순서</p>
          <ol>
            <li><span>1</span> 운영체제별 설치</li>
            <li><span>2</span> 폴더를 VS Code로 열기</li>
            <li><span>3</span> Live Server 설치·실행</li>
            <li><span>4</span> 신뢰하는 폴더 제한 해제</li>
            <li><span>5</span> 새 파일·폴더 만들기</li>
          </ol>
        </aside>
      </section>

      <div id="vscode-guide">
        <section className="vs-guide-section" id="vscode-install">
          <VsStepTitle number="01" icon={<Download size={23} />} eyebrow="VS Code 설치" title="운영체제에 맞는 방법을 고르세요">Windows는 설치 중 <b>파일·폴더를 Code로 열기</b> 옵션을 챙기고, macOS는 앱 설치 후 Finder 빠른 동작을 한 번 만들어 둡니다.</VsStepTitle>

          <Tabs defaultValue="windows" className="vs-os-tabs">
            <TabsList className="screen-tabs-list vs-os-tabs-list" aria-label="운영체제 선택">
              <TabsTrigger value="windows" className="screen-tabs-trigger vs-os-tab"><Monitor size={17} aria-hidden="true" /> Windows</TabsTrigger>
              <TabsTrigger value="mac" className="screen-tabs-trigger vs-os-tab"><Apple size={17} aria-hidden="true" /> macOS</TabsTrigger>
            </TabsList>

            <TabsContent value="windows" className="vs-os-panel">
              <div className="vs-install-layout windows-install-layout">
                <div className="vs-install-copy">
                  <span className="vs-badge">대부분의 사용자에게 권장</span>
                  <h3>Windows User Setup</h3>
                  <ol className="vs-numbered">
                    <li><span>1</span><div><b>User Installer 다운로드</b><p>관리자 권한이 필요 없는 <b>User setup</b>을 사용합니다.</p></div></li>
                    <li><span>2</span><div><b>설치 파일 실행</b><p><code>VSCodeUserSetup-버전.exe</code>를 열고 안내에 따라 진행합니다.</p></div></li>
                    <li><span>3</span><div><b>Additional Tasks 확인</b><p>아래 옵션을 확인한 뒤 설치를 마칩니다.</p></div></li>
                  </ol>
                  <a className="vs-download-link" href={docs.download} target="_blank" rel="noreferrer"><Download size={16} aria-hidden="true" /> Windows 다운로드 페이지 열기</a>
                  <a className="vs-doc-link" href={docs.windows} target="_blank" rel="noreferrer">Microsoft Windows 설치 안내 <ExternalLink size={14} aria-hidden="true" /></a>
                </div>
                <VsImage src="/vscode-windows-additional-tasks.png" alt="최신 한국어 Visual Studio Code Windows 설치기의 추가 작업 선택 화면" width={595} height={464} target={["vs-installer-file-target", "vs-installer-folder-target", "vs-installer-path-target", "vs-installer-next-target"]} caption={<><MousePointerClick size={16} /> <b>파일로 열기 · 디렉터리로 열기 · PATH 추가</b> 3개를 체크한 뒤 오른쪽 아래 <b>다음</b>을 누르세요. 바탕 화면 바로 가기와 편집기 등록은 선택입니다.</>} />
              </div>
              <div className="vs-inline-note"><AlertTriangle size={18} aria-hidden="true" /><p>Windows 11에서는 <b>더 많은 옵션 표시</b> 안에 <b>Open with Code</b>가 있을 수 있습니다. 최신 설치본에서 메뉴가 보이지 않으면 아래의 <code>code .</code> 또는 VS Code의 <b>File → Open Folder</b> 경로를 사용하세요.</p></div>
            </TabsContent>

            <TabsContent value="mac" className="vs-os-panel">
              <div className="vs-install-layout">
                <div className="vs-install-copy">
                  <span className="vs-badge mac-badge">Intel · Apple silicon 지원</span>
                  <h3>macOS 설치와 명령어 준비</h3>
                  <ol className="vs-numbered">
                    <li><span>1</span><div><b><code>.dmg</code> 다운로드</b><p>Universal, Intel, Apple silicon 중 내 Mac에 맞는 버전을 받습니다.</p></div></li>
                    <li><span>2</span><div><b>Applications로 이동</b><p><b>Visual Studio Code.app</b>을 응용 프로그램 폴더로 끌어 놓고 실행합니다.</p></div></li>
                    <li><span>3</span><div><b><code>code</code> 명령 설치</b><p><kbd>⌘⇧P</kbd>를 누르고 <b>Shell Command: Install &apos;code&apos; command in PATH</b>를 실행한 뒤 터미널을 다시 엽니다.</p></div></li>
                  </ol>
                  <a className="vs-doc-link" href={docs.mac} target="_blank" rel="noreferrer">Microsoft macOS 설치 안내 <ExternalLink size={14} aria-hidden="true" /></a>
                </div>
                <VsImage src="/vscode-mac-shell-command.png" alt="macOS VS Code 명령 팔레트의 Shell Command Install code command in PATH 항목" width={618} height={100} caption={<><Command size={16} /> <b>Shell Command</b> 항목을 선택</>} />
              </div>

              <div className="mac-quick-action">
                <div className="mac-quick-action-heading"><MousePointerClick size={22} aria-hidden="true" /><div><b>Mac에서도 폴더 우클릭으로 열기</b><p>Windows 설치 옵션 대신 Finder의 <b>빠른 동작</b>을 한 번 만들어 둡니다.</p></div></div>
                <ol className="vs-compact-steps">
                  <li><span>1</span><p><b>Automator</b> 실행 → <b>새로운 문서</b> → <b>빠른 동작</b></p></li>
                  <li><span>2</span><p>상단에서 <b>작업 흐름 수신: 파일 또는 폴더</b>, 대상 앱은 <b>Finder</b></p></li>
                  <li><span>3</span><p><b>셸 스크립트 실행</b>을 추가하고 입력 전달을 <b>인수</b>로 변경</p></li>
                  <li><span>4</span><p>아래 한 줄을 넣고 <b>VS Code로 열기</b>라는 이름으로 저장</p></li>
                </ol>
                <pre><code>open -a &quot;Visual Studio Code&quot; &quot;$@&quot;</code></pre>
                <p className="mac-action-result">이후 Finder에서 폴더를 <b>Control-클릭(우클릭) → 빠른 동작 → VS Code로 열기</b>로 실행합니다. 보이지 않으면 <b>시스템 설정 → 개인정보 보호 및 보안 → 확장 프로그램 → Finder</b>에서 해당 동작을 켭니다.</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="vs-guide-section vs-dark-section" id="vscode-open-folder">
          <VsStepTitle number="02" icon={<FolderOpen size={23} />} eyebrow="프로젝트 열기" title="파일 하나가 아니라 폴더를 여세요">VS Code 상단 메뉴에서 열거나 Windows 탐색기에서 폴더를 우클릭할 수 있습니다. 폴더를 열어야 왼쪽 Explorer에 파일 구조가 나타납니다.</VsStepTitle>
          <div className="vs-open-methods">
            <VsImage src="/vscode-file-open-folder.png" alt="VS Code 상단 메뉴의 File 메뉴에서 Open Folder 항목을 선택한 화면" width={875} height={813} target="vs-open-folder-menu-target" caption={<><FolderOpen size={16} /> VS Code 왼쪽 위 메뉴 → <b>File → Open Folder…</b></>} />
            <VsImage src="/vscode-windows-folder-context-menu.png" alt="Windows 파일 탐색기에서 폴더를 우클릭하고 Code로 열기 메뉴를 선택하는 화면" width={400} height={499} target="vs-context-code-target" caption={<><MousePointerClick size={16} /> Windows 탐색기에서 폴더 우클릭 → <b>Code(으)로 열기</b></>} />
          </div>
          <div className="vs-two-column">
            <VsImage src="/vscode-folder-opened.png" alt="VS Code Explorer 왼쪽에 프로젝트 폴더가 열린 화면" width={1274} height={955} target="vs-folder-target" caption={<><FolderOpen size={16} /> 왼쪽 Explorer에 <b>폴더 이름</b>이 보이는지 확인</>} />
            <div className="vs-path-card">
              <div><Monitor size={20} /><span><b>Windows 메뉴가 안 보일 때</b><p><b>더 많은 옵션 표시</b> → <b>Open with Code</b></p></span></div>
              <div><Apple size={20} /><span><b>macOS</b><p>Finder에서 폴더 우클릭 → <b>빠른 동작 → VS Code로 열기</b></p></span></div>
              <div><Command size={20} /><span><b>공통 대안</b><p>터미널에서 해당 폴더로 이동한 뒤 <code>code .</code></p></span></div>
            </div>
          </div>
          <Result>왼쪽 Explorer 최상단에 내가 연 폴더 이름이 보입니다.</Result>
        </section>

        <section className="vs-guide-section" id="vscode-live-server">
          <VsStepTitle number="03" icon={<Radio size={23} />} eyebrow="웹 화면 실행" title="Live Server를 설치하고 실행하세요">확장 프로그램의 정확한 이름과 게시자를 확인한 뒤, HTML 파일에서 서버를 시작합니다.</VsStepTitle>
          <div className="vs-extensions-guide">
            <VsImage src="/vscode-extensions-view.png" alt="VS Code 왼쪽 Extensions 아이콘을 열고 Live Server를 검색한 실제 화면" width={584} height={408} target={["vs-extensions-target", "vs-live-server-result-target"]} caption={<><MousePointerClick size={16} /> 왼쪽 <b>네모 4개 모양 Extensions</b> → <b>live server</b> 검색 → 첫 번째 <b>Live Server · Ritwick Dey</b>를 선택하세요. <b>Install</b>이 보이면 누르고, 톱니바퀴가 보이면 이미 설치된 상태입니다.</>} />
          </div>
          <div className="live-server-grid">
            <div className="extension-card">
              <span className="extension-mark"><Radio size={25} aria-hidden="true" /></span>
              <div><span className="vs-badge">확장 ID: ritwickdey.LiveServer</span><h3>Live Server</h3><p>게시자 <b>Ritwick Dey</b>를 확인하고 <b>Install</b>을 누릅니다.</p></div>
              <a href={docs.liveServer} target="_blank" rel="noreferrer">Marketplace 열기 <ExternalLink size={14} /></a>
            </div>
            <ol className="vs-numbered live-server-steps">
              <li><span>1</span><div><b>Extensions 열기</b><p>왼쪽 블록 아이콘 또는 <kbd>Ctrl/⌘ + Shift + X</kbd></p></div></li>
              <li><span>2</span><div><b>Live Server 검색</b><p>이름과 게시자 <b>Ritwick Dey</b>를 확인해 설치</p></div></li>
              <li><span>3</span><div><b>오른쪽 아래 <code>Go Live</code></b><p>프로젝트 폴더를 연 상태에서 VS Code 오른쪽 아래 버튼을 클릭</p></div></li>
            </ol>
          </div>
          <div className="vs-live-location"><Radio size={24} aria-hidden="true" /><div><b>실행 버튼은 VS Code 오른쪽 아래에 있습니다</b><p>파일을 우클릭하지 말고, 상태 표시줄의 <strong>Go Live</strong>를 누르세요.</p></div></div>
          <VsImage src="/vscode-live-server-statusbar.jpg" alt="VS Code 오른쪽 아래 상태 표시줄의 Go Live 버튼" width={761} height={143} target="vs-live-target" caption={<><Radio size={16} /> 오른쪽 아래 <b>Go Live</b>를 누르면 브라우저가 열립니다.</>} />
          <div className="vs-inline-note blue-note"><MousePointerClick size={18} aria-hidden="true" /><p>서버를 끌 때는 같은 위치의 포트 표시를 다시 누르거나 명령 팔레트에서 <b>Live Server: Stop Live Server</b>를 실행합니다.</p></div>
          <Result>브라우저에 보통 <code>http://127.0.0.1:5500</code> 형태의 주소가 열립니다.</Result>
        </section>

        <section className="vs-guide-section vs-trust-section" id="vscode-trust">
          <VsStepTitle number="04" icon={<ShieldCheck size={23} />} eyebrow="Restricted Mode" title="신뢰하는 폴더만 제한을 해제하세요">직접 만든 폴더처럼 출처를 아는 경우에만 Trust를 선택합니다. 인터넷에서 받은 낯선 프로젝트는 먼저 내용을 확인하세요.</VsStepTitle>
          <div className="trust-image-grid">
            <VsImage src="/vscode-restricted-mode.png" alt="VS Code 상단의 Restricted Mode 배너와 Manage 링크" width={1680} height={1050} caption={<><AlertTriangle size={16} /> 상단 배너의 <b>Manage</b> 또는 아래 상태 표시줄의 <b>Restricted Mode</b> 선택</>} />
            <VsImage src="/vscode-workspace-trust.png" alt="VS Code Workspace Trust 화면의 Trust 버튼" width={1434} height={814} target="vs-trust-target" caption={<><ShieldCheck size={16} /> 현재 폴더가 안전할 때만 <b>Trust</b></>} />
          </div>
          <ol className="trust-steps">
            <li><span>1</span><p>상단 배너의 <b>Manage</b>를 누릅니다.</p></li>
            <li><span>2</span><p>현재 폴더의 출처가 안전한지 확인합니다.</p></li>
            <li><span>3</span><p><b>Trust</b>를 선택하면 확장 프로그램·터미널·디버깅 제한이 풀립니다.</p></li>
          </ol>
          <div className="vs-security-note"><ShieldCheck size={21} aria-hidden="true" /><p><b>전체 Workspace Trust 기능을 꺼버리는 방법은 권장하지 않습니다.</b> 언제든 <kbd>Ctrl/⌘ + Shift + P</kbd> → <b>Workspaces: Manage Workspace Trust</b>에서 폴더별로 관리하세요.</p></div>
          <a className="vs-doc-link" href={docs.trust} target="_blank" rel="noreferrer">Microsoft Workspace Trust 안내 <ExternalLink size={14} aria-hidden="true" /></a>
        </section>

        <section className="vs-guide-section vs-dark-section" id="vscode-create">
          <VsStepTitle number="05" icon={<FilePlus2 size={23} />} eyebrow="Explorer 사용" title="새 파일과 폴더를 만드세요">Explorer에서 프로젝트 이름에 마우스를 올리면 새 파일과 새 폴더 버튼이 나타납니다.</VsStepTitle>
          <div className="vs-two-column create-layout">
            <VsImage src="/vscode-explorer-new-file.png" alt="VS Code Explorer의 New File 버튼이 강조된 화면" width={1272} height={350} target="vs-new-file-target" caption={<><FilePlus2 size={16} /> 문서에 <b>+</b>가 붙은 아이콘은 <b>New File</b></>} />
            <div className="create-cards">
              <div><FilePlus2 size={24} /><span><b>새 파일</b><p><b>New File</b> → <code>index.html</code> 입력 → Enter</p></span></div>
              <div><FolderPlus size={24} /><span><b>새 폴더</b><p><b>New Folder</b> → <code>assets</code> 입력 → Enter</p></span></div>
              <div><MousePointerClick size={24} /><span><b>우클릭으로도 가능</b><p>Explorer의 폴더 이름 우클릭 → <b>New File / New Folder</b></p></span></div>
            </div>
          </div>
          <div className="folder-example" aria-label="추천 폴더 구조 예시"><span>내-프로젝트</span><span>├─ index.html</span><span>└─ assets/</span></div>
          <Result>Explorer에 <code>index.html</code>과 <code>assets</code> 폴더가 함께 보입니다.</Result>
          <a className="vs-doc-link on-dark" href={docs.editor} target="_blank" rel="noreferrer">Microsoft 편집기 시작 안내 <ExternalLink size={14} aria-hidden="true" /></a>
        </section>
      </div>

      <footer><p>VS Code · Windows · macOS 화면 기준 가이드</p><p><a href={withBasePath('/')}>다른 가이드 선택</a> · <a href={withBasePath('/github/')}>GitHub 가이드</a></p></footer>
    </main>
  );
}
