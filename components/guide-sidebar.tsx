import { guideCategories } from '@/lib/guide-navigation';
import GuideSidebarMenu from './guide-sidebar-menu';
export default function GuideSidebar() { return <GuideSidebarMenu categories={guideCategories} />; }
