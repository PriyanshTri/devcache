import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/layout/dashboard-layout';
import StatsCards from '@/components/dashboard/stats-cards';
import CollectionsSection from '@/components/dashboard/collections-section';
import PinnedItems from '@/components/dashboard/pinned-items';
import RecentItems from '@/components/dashboard/recent-items';
import { getRecentCollections, getSidebarCollections } from '@/lib/db/collections';
import { getPinnedItems, getRecentItems, getDashboardStats, getItemTypesWithCounts } from '@/lib/db/items';
import { getEditorPreferences } from '@/lib/db/users';
import { DASHBOARD_COLLECTIONS_LIMIT, DASHBOARD_RECENT_ITEMS_LIMIT } from '@/lib/constants/pagination';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/sign-in');
  }

  const userId = session.user.id;

  const [user, collections, pinnedItems, recentItems, stats, itemTypes, sidebarCollections, editorPreferences] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, image: true },
    }),
    getRecentCollections(userId, DASHBOARD_COLLECTIONS_LIMIT),
    getPinnedItems(userId),
    getRecentItems(userId, DASHBOARD_RECENT_ITEMS_LIMIT),
    getDashboardStats(userId),
    getItemTypesWithCounts(userId),
    getSidebarCollections(userId),
    getEditorPreferences(userId),
  ]);

  return (
    <DashboardLayout
      itemTypes={itemTypes}
      sidebarCollections={sidebarCollections}
      user={user}
      editorPreferences={editorPreferences}
      isPro={session.user.isPro}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Your developer knowledge hub</p>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Collections */}
        <CollectionsSection collections={collections} />

        {/* Pinned Items */}
        <PinnedItems items={pinnedItems} />

        {/* Recent Items */}
        <RecentItems items={recentItems} />
      </div>
    </DashboardLayout>
  );
}
