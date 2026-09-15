import type { GuideData } from '@/components/course-guide';
const guide: GuideData = {
  "title": "Supabase",
  "intro": "프로젝트와 연결 정보를 준비하고, GPT가 작성한 SQL로 표와 접근 규칙을 만듭니다. 마지막으로 서비스의 데이터 연결 파일을 준비합니다. 실제 설정값 입력과 배포는 다음 Vercel 가이드에서 진행합니다.",
  "next": "vercel",
  "nextLabel": "Vercel에서 설정하고 배포하기",
  "steps": [
    {
      "title": "Supabase에서 프로젝트 만들기",
      "body": [
        "Supabase에 로그인하고 New project를 누릅니다.",
        "Organization에서 내 조직을 고르고 Name에 프로젝트 이름을 적습니다. Database Password에 비밀번호를 정합니다. Region이 East Asia로 표시되어 있으면 기본값을 그대로 둡니다.",
        "Create new project를 누르고 준비가 끝날 때까지 기다립니다. 비밀번호는 연결용 publishable key와 다르므로 따로 보관합니다."
      ],
      "result": "내 프로젝트의 대시보드가 열리면 다음 단계로 갑니다.",
      "image": {
        "source": "https://github.com/supabase/supabase/blob/master/apps/docs/public/img/redwoodjs-qs-new-project.png",
        "alt": "Supabase 새 프로젝트 생성 화면",
        "height": 654,
        "caption": "프로젝트 이름과 비밀번호를 입력합니다. Region은 내 화면의 East Asia 기본값을 유지하세요. 이미지는 이전 화면 예시이므로 지역 값을 따라 바꾸지 않습니다.",
        "width": 688,
        "src": "/supabase-new-project.png"
      }
    },
    {
      "body": [
        "아래 이미지에서 ID를 복사하거나, 프로젝트 홈에서 URL을 복사합니다. ID와 URL은 둘 중 하나만 있으면 됩니다. 공개 연결 키는 별도로 준비합니다.",
        "프로젝트 ID와 URL은 둘 중 하나만 준비하면 됩니다. publishable key는 별도로 복사합니다.",
        "키가 가려져 있어도 오른쪽 복사 버튼을 누르면 됩니다. Publishable key 항목인지 확인하세요. secret / service_role 키와 데이터베이스 비밀번호는 사용하지 않습니다."
      ],
      "result": "내 프로젝트 ID 또는 URL과 publishable key를 준비했습니다.",
      "title": "프로젝트 ID 또는 URL과 키 복사하기",
      "table": [
        [
          "필요한 정보",
          "들어갈 메뉴",
          "복사할 항목"
        ],
        [
          "프로젝트 ID (URL 대신 사용 가능)",
          "Project Settings → General",
          "Project ID"
        ],
        [
          "프로젝트 URL (ID 대신 사용 가능)",
          "Project Settings → Data API",
          "Project URL → Copy"
        ],
        [
          "공개 연결 키",
          "Project Settings → API Keys → Publishable and secret API keys",
          "Publishable key → 복사 버튼 (sb_publishable_로 시작)"
        ]
      ],
      "images": [
        {
          "width": 1080,
          "caption": "ID로 준비할 때: Project Settings → General → Project ID 옆 Copy를 누릅니다. 이 이전 화면에서는 Reference ID라고 표시됩니다. 값이 가려져 있어도 복사 버튼을 사용할 수 있습니다.",
          "source": "https://zenn.dev/sc30gsw/articles/56e07707a4f55b",
          "alt": "Supabase General settings에서 Reference ID와 Copy 버튼을 강조한 화면",
          "src": "/supabase-project-id.png",
          "height": 343
        },
        {
          "width": 1920,
          "caption": "URL과 키를 함께 준비할 때: 왼쪽 집 모양의 프로젝트 홈 → Connect to your project 영역을 찾습니다. 위 Project URL의 Copy, 아래 Publishable API Key의 Copy를 각각 누릅니다. 이 영역이 없으면 아래 표의 설정 메뉴로 들어가세요. 이미지에 있는 값 대신 내 프로젝트 값을 복사합니다.",
          "source": "https://melivecode.com/en/article/n8n-etl-supabase",
          "alt": "Supabase 프로젝트 홈의 Project URL과 Publishable API Key 및 각각의 Copy 버튼",
          "src": "/supabase-data-url.webp",
          "height": 1020
        }
      ]
    },
    {
      "title": "GPT에게 표를 만드는 코드 요청하기",
      "body": [
        "기획문서 내용을 채팅에 붙여 넣고, 내 서비스에 필요한 표를 만드는 SQL 코드를 요청합니다. SQL은 Supabase에 표와 접근 규칙을 만드는 명령문입니다. 직접 작성할 필요는 없습니다.",
        "GPT가 답하면 코드 블록의 복사 버튼을 누릅니다. 다음 단계에서 이 코드를 Supabase에 붙여 넣어 실행합니다."
      ],
      "codeLabel": "핵심 프롬프트",
      "code": "아래에 붙여 넣은 기획문서를 보고, 내 서비스에 필요한 표를 만드는 Supabase SQL 코드를 작성해줘.\n네가 작성한 코드를 내가 Supabase → SQL Editor에 붙여 넣고 Run을 눌러 실행할 거야.\n복사할 SQL 코드를 한 블록으로 주고, SQL Editor에서 새 쿼리를 열어 실행하는 순서와 성공했는지 확인하는 방법을 쉽게 알려줘.\nRLS와 서비스에 맞는 접근 규칙도 코드에 포함해줘.\n개인 기록은 로그인한 본인만 보고 바꾸게 해줘.\n기존 표와 데이터는 삭제하지 말고, 예제 데이터는 넣지 마.\n\n[여기에 기획문서 내용 붙여 넣기]",
      "result": "내 서비스의 표와 접근 규칙을 만드는 SQL 코드가 준비되었습니다. 아직 Supabase에 적용되지는 않았습니다."
    },
    {
      "result": "Table Editor를 열었을 때 GPT가 안내한 표 이름이 보입니다. 다음 단계에서 RLS 상태를 확인합니다.",
      "image": {
        "src": "/supabase-sql-editor.webp",
        "height": 1020,
        "caption": "왼쪽 SQL Editor → +로 새 쿼리 → 가운데 코드 붙여 넣기 → 오른쪽 아래 Run 순서입니다. 빨간 테두리는 입력창과 실행 버튼입니다. 이미지 속 코드는 위치 설명용이므로 내 서비스용으로 GPT가 작성한 코드를 사용하세요.",
        "width": 1920,
        "alt": "Supabase SQL Editor의 왼쪽 메뉴와 새 쿼리 + 버튼, 코드 입력창, 오른쪽 아래 Run 버튼",
        "source": "https://melivecode.com/en/article/n8n-etl-supabase"
      },
      "title": "SQL Editor에 붙여 넣고 실행하기",
      "body": [
        "Supabase에서 내 프로젝트를 열고 왼쪽 메뉴의 SQL Editor(>_ 모양)를 누릅니다.",
        "검색창 옆 또는 편집 탭 옆의 + 버튼으로 새 쿼리를 엽니다. 빈 코드 입력창을 클릭합니다.",
        "앞 단계에서 GPT가 작성한 SQL을 붙여 넣습니다. 설명 문장이나 이미지 속 예제 코드는 넣지 않습니다.",
        "코드 입력창 아래 오른쪽의 초록색 Run 버튼을 누릅니다. 아래 Results에서 실행 결과를 확인합니다.",
        "Success. No rows returned가 나오면 표 생성 명령이 성공한 것입니다. 오류가 나오면 오류 문구를 GPT에게 복사해 수정받습니다. 삭제 경고가 나오면 실행을 멈추고 기존 데이터를 보존하도록 수정받으세요."
      ]
    },
    {
      "title": "RLS가 켜져 있는지 확인하기",
      "body": [
        "Supabase의 Table Editor에서 생성된 표를 선택하고 RLS 또는 Policies를 엽니다.",
        "RLS enabled 또는 Disable RLS가 보이면 이미 켜져 있으므로 그대로 둡니다. Enable RLS가 보일 때만 눌러 켭니다.",
        "RLS는 데이터에 접근할 수 있는 사람을 제한하는 기능입니다. 접근 규칙은 앞 단계에서 GPT가 적용한 내용을 확인합니다. No policies created yet이 보이면 이 화면을 GPT에게 보여주고 내 서비스에 필요한 규칙을 적용해 달라고 요청합니다."
      ],
      "result": "각 표에서 RLS가 켜져 있고, GPT가 준비한 접근 규칙이 적용되어 있습니다.",
      "image": {
        "source": "https://github.com/supabase/supabase/blob/master/apps/docs/public/img/guides/integrations/supertokens/create_policy.png",
        "alt": "Supabase Policies 화면의 RLS enabled와 No policies created yet 표시",
        "height": 1206,
        "caption": "RLS enabled는 켜진 상태입니다. 하지만 이 예시는 No policies created yet이므로 규칙 설정은 아직 필요합니다. 이전 화면 예시로 메뉴 위치는 달라질 수 있습니다.",
        "width": 2048,
        "src": "/supabase-policies.png"
      }
    },
    {
      "title": "데이터 연결 코드 요청하고 파일에 반영하기",
      "body": [
        "기획 요약, 파일 구조와 앞 단계의 SQL을 채팅에 붙여 넣습니다. GPT가 필요한 코드를 요청하면 해당 부분만 추가로 전달합니다. 실제 URL과 키는 보내지 않습니다.",
        "전체 파일을 다시 받을 필요는 없습니다. 수정할 파일 이름과 교체·추가할 코드, 넣을 위치를 요청하고 VS Code에서 직접 반영합니다. 새 파일이 필요하면 이름과 내용을 받아 직접 저장합니다.",
        "변경 파일은 GitHub 가이드에 따라 업로드합니다. 실제 연결 값 입력과 배포는 다음 Vercel 가이드에서 진행합니다."
      ],
      "codeLabel": "핵심 프롬프트",
      "code": "아래 기획 요약, 파일 구조와 SQL을 보고 데이터 저장·불러오기를 연결하고 싶어.\n필요한 코드 부분을 요청하면 내가 붙여 넣을게.\n실제 URL과 키는 내가 Vercel에 직접 입력할 거야. 값을 요청하거나 코드에 넣지 마.\nVITE_SUPABASE_URL과 VITE_SUPABASE_PUBLISHABLE_KEY 설정을 읽도록 해줘.\n내 컴퓨터에서 명령어를 실행하지 않고 Vercel에서 빌드할 거야.\n전체 파일 대신 수정할 파일 이름, 교체·추가할 코드와 위치만 알려줘.\n새 파일은 이름과 저장할 내용을 줘. 내가 직접 반영할게.\n기존 기능을 유지하고 파일 구조 문서에서 바꿀 내용도 알려줘.",
      "result": "연결 코드를 내가 파일에 반영했습니다. GitHub에 올린 뒤 Vercel 가이드로 이동합니다."
    }
  ],
  "sources": [
    [
      "API 키",
      "https://supabase.com/docs/guides/getting-started/api-keys"
    ],
    [
      "RLS 설정",
      "https://supabase.com/docs/guides/database/postgres/row-level-security"
    ]
  ]
};
export default guide;
