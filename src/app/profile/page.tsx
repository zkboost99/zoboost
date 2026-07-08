import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserProfileDashboard from '@/components/UserProfileDashboard';

export const metadata = {
  title: 'My Profile | User Dashboard',
  description: 'Manage your premium accounts, orders, and account settings.',
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Fetch orders (Assume table is 'orders', fallback to empty array if not exists or error)
  let orders: any[] = [];
  try {
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .eq('email', session.user.email)
      .order('created_at', { ascending: false });
    
    if (ordersData) {
      orders = ordersData;
    }
  } catch (error) {
    console.error('Orders table might not exist yet', error);
  }

  // Fetch notifications
  let notifications: any[] = [];
  try {
    const { data: notifData } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    if (notifData) {
      notifications = notifData;
    }
  } catch (error) {
    console.error('Notifications table might not exist yet', error);
  }

  // Fetch activity logs
  let activity: any[] = [];
  try {
    const { data: actData } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    if (actData) {
      activity = actData;
    }
  } catch (error) {
    console.error('Activity logs table might not exist yet', error);
  }

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <UserProfileDashboard 
          user={session.user} 
          initialOrders={orders} 
          initialNotifications={notifications}
          initialActivity={activity}
        />
      </div>
      <Footer />
    </div>
  );
}
