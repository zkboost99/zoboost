'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  User, Package, MessageSquare, Bell, Shield, Settings, Activity, 
  LogOut, ChevronRight, ShoppingBag, Clock, CheckCircle, XCircle, 
  CreditCard, Calendar, Mail, Edit3, Lock, Smartphone, Search,
  Download, Eye, AlertCircle, Loader2, Check
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

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
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab) {
        setActiveTab(tab);
      }
    }
  }, []);

  // Local user state for immediate reactivity
  const [user, setUser] = useState(initialUser);

  // Form states
  const [fullName, setFullName] = useState(initialUser.user_metadata?.custom_full_name || initialUser.user_metadata?.full_name || '');
  const [username, setUsername] = useState(initialUser.user_metadata?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(initialUser.user_metadata?.custom_avatar_url || initialUser.user_metadata?.avatar_url || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success'|'error', text: string } | null>(null);

  // Support Tab — Chat State
  const [selectedChatOrder, setSelectedChatOrder] = useState<any | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatNewMsg, setChatNewMsg] = useState('');
  const [chatIsSending, setChatIsSending] = useState(false);
  const [chatIsUploading, setChatIsUploading] = useState(false);
  const [chatShowEmoji, setChatShowEmoji] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatFileInputRef = useRef<HTMLInputElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

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
  const completedOrders = initialOrders.filter(o => o.status?.toLowerCase() === 'completed').length;
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

  // Chat polling for Support tab
  useEffect(() => {
    if (!selectedChatOrder) return;
    const fetchChatMessages = async () => {
      try {
        const res = await fetch(`/api/client/chat?order_id=${selectedChatOrder.id}`);
        const json = await res.json();
        if (json.data) setChatMessages(json.data);
      } catch (e) {
        console.error('Failed to fetch chat messages', e);
      }
    };
    fetchChatMessages();
    const interval = setInterval(fetchChatMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedChatOrder?.id]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendChatMessage = async (text: string) => {
    if (!text.trim() || chatIsSending || !selectedChatOrder) return;
    setChatIsSending(true);
    try {
      const res = await fetch('/api/client/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: selectedChatOrder.id, message: text.trim() })
      });
      if (!res.ok) throw new Error('Failed to send');
      setChatNewMsg('');
    } catch (e) {
      alert('Error sending message.');
    } finally {
      setChatIsSending(false);
    }
  };

  const handleChatFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setChatIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      if (json.success && json.url) await sendChatMessage(json.url);
    } catch (err: any) {
      alert(err.message || 'Error uploading file.');
    } finally {
      setChatIsUploading(false);
      if (chatFileInputRef.current) chatFileInputRef.current.value = '';
    }
  };

  const renderChatMessageContent = (text: string) => {
    if (text.match(/\.(jpeg|jpg|gif|png|webp)($|\?)/i) || text.startsWith('https://pub-')) {
      return <img src={text} alt="attachment" style={{ maxWidth: '200px', borderRadius: '8px', display: 'block' }} />;
    }
    return <span>{text}</span>;
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
        <div className="bg-card border border-border-subtle rounded-xl overflow-hidden md:sticky md:top-[120px] md:max-h-[calc(100vh-136px)] md:overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
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
                                <p className="font-bold text-foreground text-sm m-0 group-hover:text-amber-400 transition-colors">{order.product_name || order.product || 'Unknown Product'}</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">#{order.id.slice(0, 8)} • {order.category || order.payment_method || 'Order'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4 font-black text-foreground">
                            ${Number(order.amount || order.price || 0).toFixed(2)}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              order.status?.toLowerCase() === 'completed' ? 'bg-[#15803d] text-white' :
                              order.status?.toLowerCase() === 'pending' ? 'bg-amber-400/20 text-amber-400' :
                              order.status?.toLowerCase() === 'processing' ? 'bg-blue-400/20 text-blue-400' :
                              'bg-[#b91c1c] text-white'
                            }`}>
                              {order.status?.toLowerCase() === 'failed' || order.status?.toLowerCase() === 'cancelled' ? 'Cancelled' : order.status || 'Pending'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => router.push(`/order/${order.id}`)}
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
                      <h4 className="text-lg font-bold text-foreground m-0">{selectedOrder.product_name || selectedOrder.product || 'Unknown Product'}</h4>
                      <p className="text-sm text-amber-400 font-medium mt-1">{selectedOrder.category || selectedOrder.payment_method || 'Order'}</p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-bold">Quantity</p>
                          <p className="font-medium text-foreground">{selectedOrder.quantity || 1}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-bold">Price</p>
                          <p className="font-medium text-foreground">${Number(selectedOrder.amount || selectedOrder.price || 0).toFixed(2)}</p>
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
                        selectedOrder.status?.toLowerCase() === 'completed' ? 'bg-[#15803d] text-white' :
                        selectedOrder.status?.toLowerCase() === 'pending' ? 'bg-amber-400/20 text-amber-400' :
                        selectedOrder.status?.toLowerCase() === 'processing' ? 'bg-blue-400/20 text-blue-400' :
                        'bg-[#b91c1c] text-white'
                      }`}>
                        {selectedOrder.status?.toLowerCase() === 'failed' || selectedOrder.status?.toLowerCase() === 'cancelled' ? 'Cancelled' : selectedOrder.status || 'Pending'}
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
            <h1 className="text-2xl font-black text-foreground mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Order Chats</h1>

            {initialOrders.length === 0 ? (
              <div className="bg-card border border-border-subtle rounded-xl p-12 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-neutral-800/50 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="w-10 h-10 text-neutral-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Order Chats</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">You haven't placed any orders yet. Order chats will appear here once you make a purchase.</p>
                <button onClick={() => router.push('/discord-marketplace')} className="bg-amber-400 text-neutral-900 px-6 py-3 rounded-md text-sm font-bold border-none cursor-pointer hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20">
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', minHeight: '600px' }}>

                {/* Left Panel: Conversation List */}
                <div style={{ width: '280px', flexShrink: 0, backgroundColor: '#1B1D22', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                    Conversations
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    {initialOrders.map((order: any) => (
                      <div
                        key={order.id}
                        onClick={() => { setSelectedChatOrder(order); setChatMessages([]); setChatNewMsg(''); }}
                        style={{
                          padding: '14px 16px',
                          cursor: 'pointer',
                          borderBottom: '1px solid rgba(255,255,255,0.03)',
                          backgroundColor: selectedChatOrder?.id === order.id ? 'rgba(59,130,246,0.15)' : 'transparent',
                          borderLeft: selectedChatOrder?.id === order.id ? '3px solid #3B82F6' : '3px solid transparent',
                          transition: 'background-color 0.15s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                      >
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#A3E635', color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>
                          {(order.product_name || order.product || 'OR').substring(0, 2).toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#E5E7EB', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {order.product_name || order.product || 'Unknown Product'}
                          </div>
                          <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                            #{order.id.substring(0, 8)} &bull; <span style={{ color: order.status?.toLowerCase() === 'completed' ? '#4ade80' : order.status?.toLowerCase() === 'pending' ? '#FACC15' : order.status?.toLowerCase() === 'processing' ? '#60a5fa' : '#f87171' }}>{order.status || 'Pending'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Panel: Chat Interface */}
                {selectedChatOrder ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#16181C', minWidth: 0 }}>

                    {/* Chat Header */}
                    <div style={{ backgroundColor: '#24262B', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#A3E635', color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>
                          {(selectedChatOrder.product_name || selectedChatOrder.product || 'OR').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#E5E7EB' }}>{selectedChatOrder.product_name || selectedChatOrder.product || 'Order Chat'}</div>
                          <div style={{ fontSize: '11px', color: '#6B7280' }}>Order #{selectedChatOrder.id.substring(0, 8)}</div>
                        </div>
                      </div>
                      <div style={{ color: '#949BA4' }}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Messages Area */}
                    <div ref={chatMessagesRef} style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: 0 }}>

                      {/* System Message */}
                      <div style={{ backgroundColor: '#1B1D22', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', width: '100%' }}>
                        <div style={{ color: '#D1D5DB', fontSize: '12px', fontWeight: 500, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: '#FACC15', borderRadius: '2px', flexShrink: 0 }} />
                          Product Link:{' '}
                          <a href={`/product/${selectedChatOrder.product_id}`} target="_blank" rel="noreferrer" style={{ color: '#FACC15', textDecoration: 'none' }}>
                            https://www.zoroboost.com/product/{selectedChatOrder.product_id}
                          </a>
                        </div>
                        <a href={`/product/${selectedChatOrder.product_id}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '4px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" /></svg>
                              View Product
                            </div>
                            <span style={{ fontSize: '10px', color: '#4B5563' }}>0m</span>
                          </div>
                        </a>
                      </div>

                      {/* Dynamic Messages */}
                      {chatMessages.map((msg: any, idx: number) => {
                        const isAdmin = msg.sender === 'admin' || msg.sender === 'seller';
                        return (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', justifyContent: isAdmin ? 'flex-end' : 'flex-start' }}>
                            {!isAdmin && (
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#A3E635', color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>
                                {displayName.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div style={{ position: 'relative', padding: '10px 16px', borderRadius: isAdmin ? '12px 12px 0 12px' : '12px 12px 12px 0', fontSize: '14px', maxWidth: '75%', lineHeight: 1.5, whiteSpace: 'pre-wrap', backgroundColor: isAdmin ? '#3B82F6' : '#2B2D31', color: isAdmin ? '#FFF' : '#E5E7EB' }}>
                              {renderChatMessageContent(msg.message)}
                              <span style={{ position: 'absolute', bottom: '6px', fontSize: '10px', color: isAdmin ? 'rgba(255,255,255,0.5)' : '#6B7280', ...(isAdmin ? { left: '-40px' } : { right: '-40px' }) }}>
                                {msg.created_at ? new Date(msg.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''}
                              </span>
                            </div>
                            {isAdmin && (
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                                <img src="/fav icon.png" alt="Admin" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Input Area */}
                    <div style={{ backgroundColor: '#24262B', padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', flexShrink: 0 }}>
                      {chatShowEmoji && (
                        <div style={{ position: 'absolute', bottom: '100%', left: '0', zIndex: 50, marginBottom: '10px' }}>
                          <EmojiPicker onEmojiClick={(emojiData) => {
                            setChatNewMsg(prev => prev + emojiData.emoji);
                            setChatShowEmoji(false);
                            setTimeout(() => chatInputRef.current?.focus(), 0);
                          }} />
                        </div>
                      )}
                      <form onSubmit={(e) => { e.preventDefault(); sendChatMessage(chatNewMsg); }} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <input type="file" ref={chatFileInputRef} style={{ display: 'none' }} onChange={handleChatFileUpload} accept="image/*" />
                        <div onClick={() => chatFileInputRef.current?.click()} style={{ cursor: 'pointer', padding: '0 10px', color: '#949BA4', flexShrink: 0 }} title="Attach File">
                          {chatIsUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                          )}
                        </div>
                        <div onClick={() => setChatShowEmoji(!chatShowEmoji)} style={{ cursor: 'pointer', padding: '0 10px 0 0', color: '#949BA4', flexShrink: 0 }} title="Emoji">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          ref={chatInputRef}
                          value={chatNewMsg}
                          onChange={e => setChatNewMsg(e.target.value)}
                          placeholder={chatIsUploading ? 'Uploading...' : 'Message...'}
                          disabled={chatIsSending || chatIsUploading}
                          style={{ flex: 1, backgroundColor: '#1B1D22', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', padding: '12px 50px 12px 20px', color: '#E5E7EB', fontSize: '14px', outline: 'none' }}
                        />
                        <button
                          type="submit"
                          disabled={chatIsSending || !chatNewMsg.trim() || chatIsUploading}
                          style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: chatIsSending || !chatNewMsg.trim() || chatIsUploading ? 'rgba(59,130,246,0.5)' : '#3B82F6', border: 'none', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: chatIsSending || !chatNewMsg.trim() || chatIsUploading ? 'not-allowed' : 'pointer' }}
                        >
                          {chatIsSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>}
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#16181C', gap: '12px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#1B1D22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageSquare style={{ width: '28px', height: '28px', color: '#4B5563' }} />
                    </div>
                    <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Select an order to view its chat</p>
                  </div>
                )}
              </div>
            )}
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
