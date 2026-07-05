'use client';

import { useState } from 'react';
import { 
  User, Package, MessageSquare, Bell, Shield, Settings, Activity, 
  LogOut, ChevronRight, ShoppingBag, Clock, CheckCircle, XCircle, 
  CreditCard, Calendar, Mail, Edit3, Lock, Smartphone, Search,
  Download, Eye, AlertCircle, Loader2, Check
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface UserProfileDashboardProps {
  user: any;
  initialOrders: any[];
  initialNotifications: any[];
  initialActivity: any[];
}

export default function UserProfileDashboard({ 
  user: initialUser, 
  initialOrders,
  initialNotifications,
  initialActivity
}: UserProfileDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Local user state for immediate reactivity
  const [user, setUser] = useState(initialUser);

  // Form states
  const [fullName, setFullName] = useState(initialUser.user_metadata?.custom_full_name || initialUser.user_metadata?.full_name || '');
  const [username, setUsername] = useState(initialUser.user_metadata?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(initialUser.user_metadata?.custom_avatar_url || initialUser.user_metadata?.avatar_url || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success'|'error', text: string } | null>(null);

  // Derived user info
  const displayName = user.user_metadata?.custom_full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';


  const TABS = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'support', label: 'Support & Chat', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Account Settings', icon: Settings },
    { id: 'activity', label: 'Recent Activity', icon: Activity },
  ];

  // Derived Stats
  const totalOrders = initialOrders.length;
  const completedOrders = initialOrders.filter(o => o.status === 'completed').length;
  const pendingOrders = initialOrders.filter(o => o.status === 'pending').length;
  const processingOrders = initialOrders.filter(o => o.status === 'processing').length;
  const cancelledOrders = initialOrders.filter(o => o.status === 'cancelled').length;
  const totalSpent = initialOrders.reduce((sum, o) => sum + (Number(o.price) || 0), 0);
  const activeServices = initialOrders.filter(o => o.delivery_status === 'active').length;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const openLiveChat = () => {
    window.dispatchEvent(new Event('openLiveChat'));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingAvatar(true);
      setToastMessage(null);
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('Storage bucket "avatars" does not exist. Please create it in Supabase.');
        }
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      setToastMessage({ type: 'success', text: 'Avatar uploaded! Click "Save Changes" to apply.' });
    } catch (err: any) {
      setToastMessage({ type: 'error', text: err.message || 'Failed to upload avatar.' });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setToastMessage(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.updateUser({
        data: { 
          full_name: fullName, 
          custom_full_name: fullName, 
          username: username, 
          avatar_url: avatarUrl, 
          custom_avatar_url: avatarUrl 
        }
      });
      if (error) throw error;
      
      setUser(data.user);
      setToastMessage({ type: 'success', text: 'Profile updated successfully!' });
      router.refresh();
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: any) {
      setToastMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-fade-in-up relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-10 right-10 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl animate-fade-in-up ${toastMessage.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/50 text-emerald-400' : 'bg-red-500/10 border border-red-500/50 text-red-400'}`}>
          {toastMessage.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="text-sm font-bold">{toastMessage.text}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-card border border-border-subtle rounded-xl overflow-hidden sticky top-24">
          <div className="p-6 border-b border-border-subtle flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-3xl font-bold text-neutral-900 shadow-lg shadow-amber-400/20 mb-4 overflow-hidden">
              {user.user_metadata?.custom_avatar_url || user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.custom_avatar_url || user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                displayName.charAt(0).toUpperCase()
              )}
            </div>
            <h2 className="text-lg font-bold text-foreground m-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {displayName}
            </h2>
            <p className="text-xs text-muted-foreground mt-1 truncate w-full">{user.email}</p>
          </div>
          
          <nav className="p-2 flex flex-col gap-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedOrder(null); }}
                className={`flex items-center justify-between w-full p-3 rounded-lg text-sm font-medium transition-all cursor-pointer border-none bg-transparent ${
                  activeTab === tab.id 
                    ? 'bg-amber-400/10 text-amber-400' 
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </div>
                {activeTab === tab.id && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
            
            <div className="mt-4 pt-4 border-t border-border-subtle">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer border-none bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-black text-foreground m-0 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Profile Overview</h1>
              <button onClick={() => setActiveTab('settings')} className="bg-amber-400 text-neutral-900 px-4 py-2 rounded-md text-sm font-bold border-none cursor-pointer hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20">
                Edit Profile
              </button>
            </div>

            <div className="bg-card border border-border-subtle rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 blur-3xl rounded-full pointer-events-none" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Full Name</p>
                    <p className="text-foreground font-medium">{user.user_metadata?.custom_full_name || user.user_metadata?.full_name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Email Address</p>
                    <p className="text-foreground font-medium flex items-center gap-2">
                      {user.email} 
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">Verified</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Join Date</p>
                    <p className="text-foreground font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Account Status</p>
                    <div className="text-foreground font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Active Premium Member
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-bold text-foreground mt-8 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dashboard Statistics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border-subtle rounded-xl p-5 hover:border-amber-400/50 transition-colors">
                <div className="flex items-center gap-3 mb-3 text-amber-400">
                  <div className="p-2 bg-amber-400/10 rounded-lg"><ShoppingBag className="w-5 h-5" /></div>
                  <span className="font-bold text-sm">Total Orders</span>
                </div>
                <p className="text-3xl font-black text-foreground m-0">{totalOrders}</p>
              </div>
              <div className="bg-card border border-border-subtle rounded-xl p-5 hover:border-blue-400/50 transition-colors">
                <div className="flex items-center gap-3 mb-3 text-blue-400">
                  <div className="p-2 bg-blue-400/10 rounded-lg"><CreditCard className="w-5 h-5" /></div>
                  <span className="font-bold text-sm">Total Spent</span>
                </div>
                <p className="text-3xl font-black text-foreground m-0">${totalSpent.toFixed(2)}</p>
              </div>
              <div className="bg-card border border-border-subtle rounded-xl p-5 hover:border-emerald-400/50 transition-colors">
                <div className="flex items-center gap-3 mb-3 text-emerald-400">
                  <div className="p-2 bg-emerald-400/10 rounded-lg"><CheckCircle className="w-5 h-5" /></div>
                  <span className="font-bold text-sm">Completed</span>
                </div>
                <p className="text-3xl font-black text-foreground m-0">{completedOrders}</p>
              </div>
              <div className="bg-card border border-border-subtle rounded-xl p-5 hover:border-purple-400/50 transition-colors">
                <div className="flex items-center gap-3 mb-3 text-purple-400">
                  <div className="p-2 bg-purple-400/10 rounded-lg"><Clock className="w-5 h-5" /></div>
                  <span className="font-bold text-sm">Pending</span>
                </div>
                <p className="text-3xl font-black text-foreground m-0">{pendingOrders}</p>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && !selectedOrder && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-black text-foreground mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>My Orders</h1>
            
            {initialOrders.length === 0 ? (
              <div className="bg-card border border-border-subtle rounded-xl p-12 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-neutral-800/50 rounded-full flex items-center justify-center mb-6">
                  <Package className="w-10 h-10 text-neutral-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">You haven't made any purchases yet. Explore our marketplace for premium accounts, boosts, and more.</p>
                <button onClick={() => router.push('/discord-marketplace')} className="bg-amber-400 text-neutral-900 px-6 py-3 rounded-md text-sm font-bold border-none cursor-pointer hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20">
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div className="bg-card border border-border-subtle rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-black/20 text-xs uppercase tracking-wider text-muted-foreground">
                        <th className="p-4 font-bold">Order Details</th>
                        <th className="p-4 font-bold">Date</th>
                        <th className="p-4 font-bold">Amount</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {initialOrders.map(order => (
                        <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-bg-secondary flex items-center justify-center border border-border-subtle overflow-hidden shrink-0">
                                {order.product_image ? (
                                  <img src={order.product_image} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <Package className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-foreground text-sm m-0 group-hover:text-amber-400 transition-colors">{order.product_name}</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">#{order.id.slice(0, 8)} • {order.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4 font-black text-foreground">
                            ${Number(order.price).toFixed(2)}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              order.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                              order.status === 'pending' ? 'bg-amber-400/20 text-amber-400' :
                              order.status === 'processing' ? 'bg-blue-400/20 text-blue-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {order.status || 'Pending'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="text-amber-400 hover:text-amber-300 font-bold text-sm bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded transition-colors border-none cursor-pointer flex items-center gap-2 ml-auto"
                            >
                              <Eye className="w-4 h-4" /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ORDER DETAILS VIEW */}
        {activeTab === 'orders' && selectedOrder && (
          <div className="animate-fade-in-up">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="text-muted-foreground hover:text-foreground text-sm font-bold flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 mb-6"
            >
              ← Back to Orders
            </button>
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-black text-foreground m-0 tracking-tight">Order #{selectedOrder.id.slice(0, 8)}</h1>
                <p className="text-sm text-muted-foreground mt-1">Placed on {new Date(selectedOrder.created_at).toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-card border border-border-subtle hover:bg-white/5 text-foreground px-4 py-2 rounded-md text-sm font-bold cursor-pointer flex items-center gap-2 transition-colors">
                  <Download className="w-4 h-4" /> Invoice
                </button>
                <button onClick={openLiveChat} className="bg-amber-400 text-neutral-900 px-4 py-2 rounded-md text-sm font-bold border-none cursor-pointer hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20">
                  Get Support
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <div className="bg-card border border-border-subtle rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 border-b border-border-subtle pb-4">Product Details</h3>
                  <div className="flex gap-4 items-start">
                    <div className="w-20 h-20 rounded-lg bg-bg-secondary flex items-center justify-center border border-border-subtle overflow-hidden shrink-0">
                      {selectedOrder.product_image ? (
                        <img src={selectedOrder.product_image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground m-0">{selectedOrder.product_name}</h4>
                      <p className="text-sm text-amber-400 font-medium mt-1">{selectedOrder.category}</p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-bold">Quantity</p>
                          <p className="font-medium text-foreground">{selectedOrder.quantity || 1}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-bold">Price</p>
                          <p className="font-medium text-foreground">${Number(selectedOrder.price).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="bg-card border border-border-subtle rounded-xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4 border-b border-border-subtle pb-4">Order Notes</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-card border border-border-subtle rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 border-b border-border-subtle pb-4">Order Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Order Status</span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        selectedOrder.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                        selectedOrder.status === 'pending' ? 'bg-amber-400/20 text-amber-400' :
                        'bg-blue-400/20 text-blue-400'
                      }`}>
                        {selectedOrder.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Payment Status</span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        selectedOrder.payment_status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-amber-400/20 text-amber-400'
                      }`}>
                        {selectedOrder.payment_status || 'Unpaid'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Delivery</span>
                      <span className="text-sm font-bold text-foreground">{selectedOrder.delivery_status || 'Processing'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Payment Method</span>
                      <span className="text-sm font-bold text-foreground capitalize">{selectedOrder.payment_method || 'Crypto'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border-subtle rounded-xl p-6 bg-gradient-to-br from-amber-400/5 to-transparent">
                  <h3 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Need Help?
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">If you have any issues with this order, please contact our support team providing your Order ID.</p>
                  <button onClick={openLiveChat} className="w-full bg-card border border-amber-400/50 hover:bg-amber-400/10 text-amber-400 py-2 rounded-md text-sm font-bold cursor-pointer transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUPPORT TAB */}
        {activeTab === 'support' && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-black text-foreground mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Support & Live Chat</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border-subtle rounded-xl p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-amber-400/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <MessageSquare className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">24/7 Live Support</h3>
                <p className="text-muted-foreground mb-8 text-sm">Need help with an order, payment, or general inquiry? Our support team is online and ready to assist you instantly.</p>
                <button onClick={openLiveChat} className="bg-amber-400 text-neutral-900 px-8 py-3 rounded-md text-base font-bold border-none cursor-pointer hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20 flex items-center gap-2 w-full justify-center">
                  <MessageSquare className="w-5 h-5" /> Start Live Chat
                </button>
              </div>

              <div className="bg-card border border-border-subtle rounded-xl p-8">
                <h3 className="text-lg font-bold text-foreground mb-6">FAQ & Quick Links</h3>
                <div className="space-y-4">
                  {[
                    { q: 'How long does delivery take?', a: 'Most orders are delivered instantly. Boosts may take up to 10 minutes.' },
                    { q: 'What payment methods are accepted?', a: 'We accept Crypto, PayPal, and major Credit Cards.' },
                    { q: 'Refund Policy', a: 'Check our refund policy page for details on eligible returns.' },
                  ].map((faq, i) => (
                    <div key={i} className="border-b border-border-subtle pb-4 last:border-0 last:pb-0">
                      <h4 className="text-sm font-bold text-foreground mb-1">{faq.q}</h4>
                      <p className="text-xs text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-black text-foreground tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Notifications</h1>
              <button className="text-sm font-bold text-amber-400 hover:text-amber-300 bg-transparent border-none cursor-pointer p-0">Mark all as read</button>
            </div>
            
            {initialNotifications.length === 0 ? (
              <div className="bg-card border border-border-subtle rounded-xl p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-neutral-800/50 rounded-full flex items-center justify-center mb-6">
                  <Bell className="w-8 h-8 text-neutral-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">All Caught Up!</h3>
                <p className="text-muted-foreground text-sm">You have no new notifications.</p>
              </div>
            ) : (
              <div className="bg-card border border-border-subtle rounded-xl overflow-hidden divide-y divide-border-subtle">
                {initialNotifications.map((notif: any) => (
                  <div key={notif.id} className="p-4 flex gap-4 hover:bg-white/5 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      notif.type === 'order' ? 'bg-emerald-500/20 text-emerald-400' :
                      notif.type === 'alert' ? 'bg-amber-400/20 text-amber-400' :
                      'bg-blue-400/20 text-blue-400'
                    }`}>
                      {notif.type === 'order' ? <Package className="w-5 h-5" /> :
                       notif.type === 'alert' ? <AlertCircle className="w-5 h-5" /> :
                       <Bell className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-1">{notif.title}</h4>
                      <p className="text-sm text-muted-foreground m-0">{notif.message}</p>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold mt-2 block">
                        {new Date(notif.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}



        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-black text-foreground mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Account Settings</h1>
            
            <div className="bg-card border border-border-subtle rounded-xl p-6 max-w-2xl shadow-xl shadow-black/20">
              <form className="space-y-5" onSubmit={handleUpdateProfile}>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Profile Picture</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-bg-secondary border border-border-subtle flex items-center justify-center overflow-hidden">
                      {avatarUrl || user.user_metadata?.custom_avatar_url || user.user_metadata?.avatar_url ? (
                        <img src={avatarUrl || user.user_metadata.custom_avatar_url || user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploadingAvatar}
                      />
                      <button 
                        type="button" 
                        disabled={isUploadingAvatar}
                        className="bg-bg-secondary border border-border-subtle hover:bg-white/5 text-foreground px-4 py-2 rounded-md text-sm font-bold transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
                      >
                        {isUploadingAvatar ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Change Avatar'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe" 
                        className="w-full bg-bg-secondary border border-border-subtle rounded-md pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-amber-400 transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Username</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">@</span>
                      <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="johndoe123" 
                        className="w-full bg-bg-secondary border border-border-subtle rounded-md pl-9 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-amber-400 transition-colors" 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" disabled defaultValue={user.email} className="w-full bg-bg-secondary border border-border-subtle rounded-md pl-10 pr-4 py-2.5 text-sm text-muted-foreground opacity-70 cursor-not-allowed" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">Email address cannot be changed currently. Contact support for assistance.</p>
                </div>

                <div className="pt-4 border-t border-border-subtle">
                  <button 
                    disabled={isUpdating}
                    type="submit"
                    className="bg-amber-400 text-neutral-900 px-6 py-2.5 rounded-md text-sm font-bold border-none cursor-pointer hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                  >
                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
            
            <h2 className="text-xl font-bold text-foreground mt-10 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Security</h2>
            
            <div className="bg-card border border-border-subtle rounded-xl p-6 max-w-2xl shadow-xl shadow-black/20">
              <h3 className="text-lg font-bold text-foreground mb-4">Change Password</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="password" placeholder="••••••••" className="w-full bg-bg-secondary border border-border-subtle rounded-md pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-amber-400 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="password" placeholder="••••••••" className="w-full bg-bg-secondary border border-border-subtle rounded-md pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-amber-400 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="password" placeholder="••••••••" className="w-full bg-bg-secondary border border-border-subtle rounded-md pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-amber-400 transition-colors" />
                  </div>
                </div>
                <button className="bg-amber-400 text-neutral-900 px-6 py-2.5 rounded-md text-sm font-bold border-none cursor-pointer hover:bg-amber-500 transition-colors mt-2">
                  Update Password
                </button>
              </form>
            </div>

            <div className="bg-card border border-border-subtle rounded-xl p-6 max-w-2xl my-6 shadow-xl shadow-black/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>
                <div className="bg-neutral-800 text-neutral-400 px-3 py-1 rounded text-xs font-bold border border-neutral-700">
                  Coming Soon
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-red-500/20 rounded-xl p-6 max-w-2xl relative overflow-hidden shadow-xl shadow-black/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-lg font-bold text-red-400 mb-1">Active Sessions</h3>
              <p className="text-sm text-muted-foreground mb-4">Log out of all other devices you might be logged in on.</p>
              <button className="bg-red-500/10 border border-red-500/50 hover:bg-red-500/20 text-red-400 px-6 py-2 rounded-md text-sm font-bold cursor-pointer transition-colors flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Logout All Devices
              </button>
            </div>
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === 'activity' && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-black text-foreground mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Recent Activity</h1>
            
            {initialActivity.length === 0 ? (
              <div className="bg-card border border-border-subtle rounded-xl p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-neutral-800/50 rounded-full flex items-center justify-center mb-6">
                  <Activity className="w-8 h-8 text-neutral-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">No Recent Activity</h3>
                <p className="text-muted-foreground text-sm">Your recent actions like logins and profile updates will appear here.</p>
              </div>
            ) : (
              <div className="bg-card border border-border-subtle rounded-xl p-6 relative">
                <div className="absolute left-10 top-6 bottom-6 w-px bg-border-subtle" />
                <div className="space-y-6 relative">
                  {initialActivity.map((act: any, idx: number) => (
                    <div key={act.id || idx} className="flex gap-6 relative">
                      <div className="w-8 h-8 rounded-full bg-bg-secondary border-2 border-border-subtle flex items-center justify-center z-10 relative mt-1">
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-1">{act.action}</h4>
                        <p className="text-sm text-muted-foreground m-0">{act.description}</p>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold mt-2 block">
                          {new Date(act.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
