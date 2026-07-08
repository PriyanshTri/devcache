import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/layout/dashboard-layout';
import ProfileInfo from '@/components/profile/profile-info';
import ProfileStats from '@/components/profile/profile-stats';
import { getSidebarCollections } from '@/lib/db/collections';
import { getItemTypesWithCounts } from '@/lib/db/items';
import { getUserWithSettings } from '@/lib/db/users';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/sign-in');
  }

  const userId = session.user.id;

  // Group all data fetching operations into a single Promise.all batch to maximize concurrency.
  // We reuse itemTypesWithCounts for the itemTypeBreakdown to eliminate redundant database queries.
  const [
    user,
    totalItems,
    totalCollections,
    itemTypesWithCounts,
    sidebarCollections
  ] = await Promise.all([
    getUserWithSettings(userId),
    prisma.item.count({ where: { userId } }),
    prisma.collection.count({ where: { userId } }),
    getItemTypesWithCounts(userId),
    getSidebarCollections(userId),
  ]);

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <DashboardLayout
      itemTypes={itemTypesWithCounts}
      sidebarCollections={sidebarCollections}
      user={{ id: user.id, name: user.name, email: user.email, image: user.image }}
      editorPreferences={user.editorPreferences}
      isPro={session.user.isPro}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">View your account information and usage</p>
        </div>

        {/* Profile Info */}
        <ProfileInfo
          user={{
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: user.createdAt,
          }}
        />

        {/* Usage Stats */}
        <ProfileStats
          totalItems={totalItems}
          totalCollections={totalCollections}
          itemTypeBreakdown={itemTypesWithCounts}
        />
      </div>
    </DashboardLayout>
  );
}
