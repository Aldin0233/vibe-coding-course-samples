import type { Metadata } from 'next';
import CourseGuide from '@/components/course-guide';
import guide from '@/lib/guides/supabase';
export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Supabase | 바이브 코딩 가이드', description: "내 서비스의 데이터를 온라인에 저장합니다. 설치와 코드 작성은 AI에게 맡기고, 우리는 연결 정보와 접근 권한을 확인합니다." };

export default function Page() { return <CourseGuide guide={guide} />; }
