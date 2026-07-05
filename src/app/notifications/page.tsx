'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Bell, Package, Tag, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

const formatTimeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);

        let query = supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (session?.user) {
          query = query.or(`user_id.eq.${session.user.id},user_id.is.null`);
        } else {
          query = query.is('user_id', null);
        }

        const { data, error } = await query;
        if (data) setNotifications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    const supabase = createClient();
    const channel = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        (payload) => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markAsRead = async (id: string) => {
    if (!user) return;
    try {
      const supabase = createClient();
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .eq('user_id', user.id);
      
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch (err) {}
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'product_added':
      case 'stock_in':
        return <Package className="w-5 h-5 text-emerald-400" />;
      case 'stock_out':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'price_change':
        return <Tag className="w-5 h-5 text-blue-400" />;
      case 'order_status':
        return <RefreshCw className="w-5 h-5 text-amber-400" />;
      default:
        return <Bell className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[800px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-foreground tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Notifications
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border-subtle rounded-xl">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-foreground mb-1">No notifications</h3>
            <p className="text-sm text-muted-foreground">You're all caught up!</p>
          </div>
        ) : (
          <div className="bg-card border border-border-subtle rounded-xl overflow-hidden">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-5 border-b border-border-subtle last:border-0 transition-colors ${!notification.is_read ? 'bg-amber-400/5' : 'hover:bg-white/5'}`}
              >
                <div className="flex gap-4">
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${!notification.is_read ? 'bg-amber-400/10' : 'bg-neutral-800'}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`text-base font-bold truncate ${!notification.is_read ? 'text-white' : 'text-neutral-200'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                        {formatTimeAgo(notification.created_at)}
                      </span>
                    </div>
                    <p className={`text-sm ${!notification.is_read ? 'text-neutral-300' : 'text-neutral-400'}`}>
                      {notification.message}
                    </p>
                    
                    {!notification.is_read && notification.user_id && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors border-none bg-transparent cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
