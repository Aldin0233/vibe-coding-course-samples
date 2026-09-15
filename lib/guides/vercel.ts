import type { GuideData } from '@/components/course-guide';
const guide: GuideData = {
  "title": "Vercel",
  "intro": "Supabase 연결 파일까지 GitHub에 올렸다면, 이제 Vercel에서 웹 주소를 만듭니다. 화면의 설정 칸을 채우면 설치와 빌드는 Vercel이 처리합니다.",
  "next": "",
  "nextLabel": "전체 가이드로 돌아가기",
  "steps": [
    {
      "title": "GitHub 저장소 가져오기",
      "body": [
        "Vercel에 로그인하고 Add New → Project를 누릅니다.",
        "Import Git Repository에서 GitHub를 연결합니다. 내 저장소 이름 옆의 Import를 누릅니다. 목록에 없다면 GitHub 연결 권한에서 내 저장소를 허용합니다.",
        "Root Directory는 배포할 파일이 있는 폴더입니다. GitHub 첫 화면에 package.json이 보이면 기본값을 유지합니다. 하위 폴더에 있으면 Edit를 눌러 그 폴더를 고릅니다."
      ],
      "result": "배포할 저장소와 프로젝트 폴더가 선택됩니다.",
      "image": {
        "caption": "내 저장소 이름 옆 Import를 누릅니다. 이미지의 계정명과 저장소명은 이미지 출처의 예시입니다.",
        "alt": "Vercel Import Git Repository 목록과 강조된 Import 버튼",
        "source": "https://codeinprogress.dev/article/como-desplegar-react-vite-vercel",
        "height": 552,
        "src": "/vercel-import.webp",
        "width": 735
      }
    },
    {
      "title": "프로젝트 이름 확인하기",
      "body": [
        "Project Name에 사용할 이름을 입력합니다. 기본으로 표시된 저장소 이름을 그대로 써도 됩니다.",
        "이 가이드는 바이브 코딩에서 Vite 변경을 마친 프로젝트 기준입니다. 다음 단계에서 빌드 설정을 확인합니다."
      ],
      "result": "프로젝트 이름을 정했습니다. 이어서 빌드 설정과 연결 값을 입력합니다.",
      "image": {
        "caption": "Project Name 입력 위치입니다. 이어지는 Vite 설정은 다음 단계에서 확인합니다.",
        "alt": "New Project 화면의 Project Name과 Vite 선택",
        "source": "https://codeinprogress.dev/article/como-desplegar-react-vite-vercel",
        "height": 510,
        "src": "/vercel-project.webp",
        "width": 692
      }
    },
    {
      "title": "Vite 설정 칸 채우기",
      "body": [
        "처음 배포할 때는 Import 다음 설정 화면에서 아래 값을 확인합니다. 이미 배포한 프로젝트는 Settings → Build and Deployment로 들어갑니다.",
        "Framework Preset에서 Vite를 고릅니다. Build Command에는 npm run build, Output Directory에는 dist를 입력합니다. 값이 다르고 입력이 막혀 있으면 옆의 Override를 켜서 바꿉니다.",
        "npm run build는 이 화면에 넣을 값입니다. 내 컴퓨터에서 실행하지 않습니다. Install Command는 자동값을 유지합니다.",
        "설정을 마쳤다면 바로 Deploy하지 말고, 아래 Environment Variables를 펼쳐 Supabase 연결 값도 넣습니다."
      ],
      "table": [
        [
          "설정",
          "Vite 프로젝트 값"
        ],
        [
          "Framework Preset",
          "Vite"
        ],
        [
          "Build Command",
          "npm run build"
        ],
        [
          "Output Directory",
          "dist"
        ],
        [
          "Install Command",
          "자동 감지값 사용"
        ],
        [
          "Root Directory",
          "package.json이 있는 폴더"
        ]
      ],
      "result": "Vite / npm run build / dist가 설정되어 있습니다. 아직 배포 전이라면 다음 단계도 이어서 설정합니다.",
      "image": {
        "caption": "Build and Output Settings를 펼칩니다. Output Directory는 이미지와 같이 dist입니다. 기본 Vite 프로젝트는 vite build도 사용할 수 있습니다. 수업에서는 AI가 준비한 build 명령에 맞춰 아래 표를 따릅니다.",
        "alt": "첫 배포 화면에서 Build Command vite build와 Output Directory dist 설정",
        "source": "https://codeinprogress.dev/article/como-desplegar-react-vite-vercel",
        "height": 492,
        "src": "/vercel-dist.webp",
        "width": 682
      }
    },
    {
      "title": "Supabase 연결 값 넣고 배포하기",
      "body": [
        "처음 배포할 때는 Environment Variables 항목을 펼칩니다. 이미 만든 프로젝트는 Settings → Environment Variables로 들어갑니다.",
        "Key에는 AI가 알려준 설정 이름, Value에는 Supabase에서 복사한 실제 값을 직접 붙여 넣습니다. 실제 값은 AI 채팅에 보내지 않습니다. 아래 표의 이름과 내 코드에서 사용하는 이름이 같은지 AI에게 확인받으세요.",
        "추가 버튼으로 두 번째 설정을 입력합니다. 이미 배포한 프로젝트의 Settings 화면에서는 Production을 선택하고 Save합니다. Supabase에서 준비한 publishable key를 사용합니다.",
        "첫 배포는 Deploy를 누릅니다. 이미 배포한 뒤 설정을 바꿨다면 Deployments에서 최근 배포를 열어 메뉴의 Redeploy를 누릅니다. Ready가 나오면 표시된 웹 주소를 엽니다."
      ],
      "result": "Ready 표시가 나오고, 웹 주소를 눌렀을 때 내 서비스가 열립니다.",
      "image": {
        "caption": "처음 배포할 때: Deploy 위 Environment Variables를 먼저 펼쳐 이름과 값을 넣습니다. 입력이 끝난 다음 Deploy를 누릅니다.",
        "alt": "첫 배포 화면의 Environment Variables 펼침 항목과 Deploy 버튼",
        "source": "https://codeinprogress.dev/article/como-desplegar-react-vite-vercel",
        "height": 481,
        "src": "/vercel-first-deploy.webp",
        "width": 712
      },
      "table": [
        [
          "Key — 설정 이름",
          "Value — 넣을 값"
        ],
        [
          "VITE_SUPABASE_URL",
          "Supabase에서 복사한 Project URL 전체"
        ],
        [
          "VITE_SUPABASE_PUBLISHABLE_KEY",
          "내 publishable key"
        ]
      ],
      "image2": {
        "source": "https://vercel.com/docs/environment-variables",
        "alt": "Vercel 환경 변수의 Environments, Key, Value와 Save 버튼",
        "height": 1124,
        "caption": "Key·Value 입력 칸 참고 이미지입니다. 이 이미지는 프로젝트 Settings 화면으로 첫 배포 화면과 배치는 다릅니다. 첫 배포에서는 Environment Variables 안에서 동일한 이름·값을 추가합니다.",
        "width": 1886,
        "src": "/vercel-env-settings.png"
      }
    },
    {
      "title": "내 서비스 확인하고 막히면 AI에게 전달하기",
      "body": [
        "배포 주소에서 평소처럼 버튼을 눌러 보고, 내용을 저장한 뒤 새로고침해 다시 보이는지 확인합니다.",
        "개인 기록 서비스라면 다른 계정으로도 확인합니다. 서로의 기록이 보여서는 안 됩니다.",
        "배포가 실패하면 Build Logs의 오류 문구를 복사해 채팅에 붙여 넣습니다. GPT가 요청하는 관련 코드만 추가로 전달하세요.",
        "수정이 필요하면 변경 파일을 GitHub에 반영합니다. 파일 업로드 방법은 GitHub 가이드에서 확인하세요. 새 배포가 Ready가 되면 같은 주소에서 다시 확인합니다."
      ],
      "result": "배포 주소에서 기존 화면과 저장·불러오기가 동작하며, 개인 기록이 다른 계정에 보이지 않습니다.",
      "codeLabel": "막혔을 때 프롬프트",
      "code": "Vercel에서 [지금 발생한 문제]가 있어.\n아래 오류 문구와 파일 구조를 보고 필요한 코드 부분을 요청해줘.\n내가 채팅에 붙여 넣을게.\n내 컴퓨터에서 설치하거나 명령어를 실행하지 않을 거야.\n전체 파일 대신 수정할 파일 이름, 바꿀 코드와 위치를 알려줘. 내가 직접 반영할게.\nVercel에서 바꿀 설정이 있으면 메뉴와 입력할 내용을 알려줘.\nRLS를 끄지 않고 해결해줘."
    }
  ],
  "sources": [
    [
      "Vite on Vercel",
      "https://vercel.com/docs/frameworks/frontend/vite"
    ],
    [
      "빌드 설정",
      "https://vercel.com/docs/builds"
    ],
    [
      "환경 변수",
      "https://vercel.com/docs/environment-variables"
    ]
  ]
};
export default guide;
