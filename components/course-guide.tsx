import VibePreface from './vibe-preface';
import { GuideHeader, GuideFooter } from './guide-chrome';
import { BookOpen, CheckCircle2, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { withBasePath } from '@/lib/base-path';
type GuideImage = { src: string; alt: string; caption: string; source: string; width: number; height: number };
export type GuideData = { title: string; intro: string; preface?: boolean; next: string; nextLabel: string; steps: { title: string; body: string[]; code?: string; codeLabel?: string; image?: GuideImage; image2?: GuideImage; images?: GuideImage[]; table?: string[][]; result: string }[]; sources: string[][] };
function GuidePicture({ picture }: { picture: GuideImage }) {
  return <figure className="course-shot"><a href={withBasePath(picture.src)} target="_blank" rel="noreferrer" aria-label={`${picture.alt} 크게 보기`}><Image src={withBasePath(picture.src)} alt={picture.alt} width={picture.width} height={picture.height} unoptimized /><span className="zoom-hint">크게 보기 <ExternalLink size={14} aria-hidden="true" /></span></a><figcaption>{picture.caption} <a href={picture.source} target="_blank" rel="noreferrer">이미지 출처</a></figcaption></figure>;
}
export default function CourseGuide({ guide }: { guide: GuideData }) {
  return <main className="course-guide">
    <GuideHeader title={guide.title} />
    <section className="course-hero"><p className="picker-eyebrow"><BookOpen size={18} aria-hidden="true" /> 바이브 코딩 가이드</p><h1>{guide.title}</h1><p>{guide.intro}</p>
      {guide.preface ? <VibePreface /> : null}
      <nav className="course-toc" aria-label="이 페이지 목차">{guide.steps.map((step, index) => <a key={step.title} href={`#step-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span>{step.title}</a>)}</nav>
    </section>
    <div className="course-body">{guide.steps.map((step, index) => <section className="course-step" id={`step-${index + 1}`} key={step.title}>
      <p className="picker-eyebrow">STEP {String(index + 1).padStart(2, '0')}</p><h2>{step.title}</h2>
      <ol className="course-instructions">{step.body.map(text => <li key={text}>{text}</li>)}</ol>
      {step.image && step.image2 ? <Tabs defaultValue="first" className="course-image-tabs"><TabsList aria-label="Vercel 배포 상황 선택"><TabsTrigger value="first">처음 배포할 때</TabsTrigger><TabsTrigger value="existing">이미 배포했다면</TabsTrigger></TabsList><TabsContent value="first"><p className="course-tab-path">Import → 배포 설정 → Environment Variables 펼치기 → 값 입력 → Deploy</p><GuidePicture picture={step.image} /></TabsContent><TabsContent value="existing"><p className="course-tab-path">프로젝트 → Settings → Environment Variables → Save → Redeploy</p><GuidePicture picture={step.image2} /></TabsContent></Tabs> : step.image ? <GuidePicture picture={step.image} /> : null}
      {step.images?.map(picture => <GuidePicture key={picture.src} picture={picture} />)}
      {step.table ? <div className="course-table-wrap"><table><thead><tr>{step.table[0].map(cell => <th key={cell} scope="col">{cell}</th>)}</tr></thead><tbody>{step.table.slice(1).map(row => <tr key={row[0]}>{row.map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div> : null}
      {step.codeLabel ? <p className="picker-eyebrow">{step.codeLabel}</p> : null}
      {step.code ? <pre className="course-code" aria-label={`${step.title} ${step.codeLabel ?? "예제 코드"}`}><code>{step.code}</code></pre> : null}
      <div className="course-result"><CheckCircle2 size={21} aria-hidden="true" /><p><b>확인할 결과</b>{step.result}</p></div>
    </section>)}
    <aside className="course-sources"><h2>공식 문서로 더 확인하기</h2>{guide.sources.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer">{label} <ExternalLink size={14} aria-hidden="true" /></a>)}</aside>
    </div><GuideFooter next={guide.next} nextLabel={guide.nextLabel} />
  </main>;
}
