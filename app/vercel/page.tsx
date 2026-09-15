import type { Metadata } from 'next';
import CourseGuide from '@/components/course-guide';
import guide from '@/lib/guides/vercel';
export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Vercel | 바이브 코딩 가이드', description: "GitHub의 프로젝트를 웹 주소로 공개합니다. Vite 빌드 설정과 연결 값 입력, 배포 후 확인을 진행합니다." };

export default function Page() { return <CourseGuide guide={guide} />; }
