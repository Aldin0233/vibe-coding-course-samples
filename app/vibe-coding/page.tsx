import type { Metadata } from 'next';
import CourseGuide from '@/components/course-guide';
import guide from '@/lib/guides/vibe-coding';
export const dynamic = 'force-static';
export const metadata: Metadata = { title: '바이브 코딩 | 바이브 코딩 가이드', description: "AI가 프로젝트의 목표와 구조를 이해하도록 설명하고 기록합니다. 수업에서 배운 흐름을 핵심 프롬프트로 따라가세요." };

export default function Page() { return <CourseGuide guide={guide} />; }
