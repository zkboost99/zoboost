const fs = require('fs');
let html = fs.readFileSync('admin.html', 'utf8');

// The new Sidebar HTML
const sidebarHTML = `
  <div class="sidebar">
    <div class="sb-brand">
      <div class="sb-logo">Z</div>
      <div class="sb-info">
        <div class="bname">Zooro Boost</div>
        <div class="bsub">Admin Panel</div>
      </div>
      <i class="fas fa-angles-left sb-tog" onclick="toggleSidebar()"></i>
    </div>
    
    <div class="sb-nav">
      <div class="nav-group-title">Overview</div>
      <div class="nav-item">
        <div class="nav-link active" onclick="nav('dashboard',this)">
          <div class="nav-icon"><i class="fas fa-border-all"></i></div>
          <span class="nav-label">Overview</span>
        </div>
      </div>
      <div class="nav-item" style="padding-left:16px; margin-top:4px;">
        <div class="nav-link" style="font-size:12px; font-weight:700; padding:8px 12px;" onclick="nav('dashboard',this)">
          <i class="fas fa-chart-line"></i> Dashboard
        </div>
      </div>
      
      <div class="nav-group-title">Catalog</div>
      <div class="nav-item">
        <div class="nav-link" data-tip="Items" onclick="openSub('items-sub',this)">
          <div class="nav-icon"><i class="fas fa-box"></i></div>
          <span class="nav-label">Items</span>
          <i class="fas fa-chevron-down nav-arrow"></i>
        </div>
        <div class="sub-nav" id="items-sub">
          <div class="sub-link" onclick="nav('all-items',this)">All Items</div>
          <div class="sub-link" onclick="nav('add-item',this)">Add Item</div>
        </div>
      </div>
      
      <div class="nav-item">
        <div class="nav-link" data-tip="Posts" onclick="openSub('posts-sub',this)">
          <div class="nav-icon"><i class="fas fa-newspaper"></i></div>
          <span class="nav-label">Posts</span>
          <i class="fas fa-chevron-down nav-arrow"></i>
        </div>
        <div class="sub-nav" id="posts-sub">
          <div class="sub-link" onclick="nav('all-posts',this)">All Posts</div>
          <div class="sub-link" onclick="nav('add-post',this)">Add Post</div>
        </div>
      </div>
      
      <div class="nav-group-title">Management</div>
      <div class="nav-item">
        <div class="nav-link" data-tip="Orders" onclick="openSub('orders-sub',this)">
          <div class="nav-icon"><i class="fas fa-shopping-cart"></i></div>
          <span class="nav-label">Orders</span>
          <div class="nav-badge">12</div>
          <i class="fas fa-chevron-down nav-arrow" style="margin-left:8px;"></i>
        </div>
        <div class="sub-nav" id="orders-sub">
          <div class="sub-link" onclick="nav('all-orders',this)">All Orders</div>
          <div class="sub-link" onclick="nav('completed-orders',this)">Completed Orders</div>
          <div class="sub-link" onclick="nav('pending-orders',this)">Pending Orders</div>
          <div class="sub-link" onclick="nav('failed-orders',this)">Failed Orders</div>
          <div class="sub-link" onclick="nav('purchased-orders',this)">Purchased Orders</div>
        </div>
      </div>
      
      <div class="nav-item">
        <div class="nav-link" data-tip="Contact" onclick="nav('contact',this)">
          <div class="nav-icon"><i class="far fa-comment-dots"></i></div>
          <span class="nav-label">Contact</span>
          <div class="nav-badge" style="background:var(--brand-light);color:var(--brand);">5</div>
          <i class="fas fa-chevron-down nav-arrow" style="margin-left:8px;"></i>
        </div>
      </div>
      
      <div class="nav-item">
        <div class="nav-link" data-tip="Notifications" onclick="nav('notifications',this)">
          <div class="nav-icon"><i class="far fa-bell"></i></div>
          <span class="nav-label">Notifications</span>
        </div>
      </div>
      
      <div class="nav-group-title">Insights & Feedback</div>
      <div class="nav-item">
        <div class="nav-link" data-tip="Analytics" onclick="nav('analytics',this)">
          <div class="nav-icon"><i class="fas fa-chart-pie"></i></div>
          <span class="nav-label">Analytics</span>
        </div>
      </div>
      <div class="nav-item">
        <div class="nav-link" data-tip="Suggestions" onclick="nav('suggestions',this)">
          <div class="nav-icon"><i class="far fa-lightbulb"></i></div>
          <span class="nav-label">Suggestions</span>
          <div class="nav-badge">3</div>
        </div>
      </div>
      <div class="nav-item">
        <div class="nav-link" data-tip="Bug Reports" onclick="nav('bug-reports',this)">
          <div class="nav-icon"><i class="fas fa-bug"></i></div>
          <span class="nav-label">Bug Reports</span>
          <div class="nav-badge" style="background:var(--brand-light);color:var(--brand);">2</div>
        </div>
      </div>
      
      <div class="nav-group-title">System</div>
      <div class="nav-item">
        <div class="nav-link" data-tip="Settings" onclick="nav('settings',this)">
          <div class="nav-icon"><i class="fas fa-cog"></i></div>
          <span class="nav-label">Settings</span>
        </div>
      </div>
    </div>
    
    <div class="sb-foot">
      <div class="sb-av"></div>
      <div class="sb-uinfo">
        <div class="un">Admin User</div>
        <div class="ur">Super Administrator</div>
      </div>
      <i class="fas fa-ellipsis-v sb-out"></i>
    </div>
  </div>`;

// The new Topbar HTML
const topbarHTML = `
  <div class="topbar">
    <div class="pg-title" id="pgTitle">
      <h2>Good morning, Admin <span style="font-size:24px">👋</span></h2>
      <p>Here's an overview of your store performance today.</p>
    </div>
    <div class="tb-right">
      <div class="tb-search">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search anything...">
      </div>
      <div class="tb-btn" style="width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#fff; box-shadow:0 5px 15px rgba(0,0,0,0.03); cursor:pointer; color:var(--t-muted); position:relative;">
        <i class="far fa-bell"></i>
        <div style="position:absolute; top:8px; right:10px; width:8px; height:8px; background:var(--brand); border-radius:50%; border:2px solid #fff;"></div>
      </div>
      <div class="tb-btn" style="width:40px; height:40px; border-radius:50%; padding:0; overflow:hidden; background:#fff; box-shadow:0 5px 15px rgba(0,0,0,0.03); cursor:pointer; border:2px solid #fff;">
        <img src="https://ui-avatars.com/api/?name=Admin+User&background=11142D&color=fff" style="width:100%; height:100%; object-fit:cover;">
      </div>
    </div>
  </div>`;

// The new Dashboard HTML
const dashboardHTML = `
    <!-- ═══ DASHBOARD ═══ -->
    <section class="section active" id="s-dashboard">
      <div class="dash-grid">
        <!-- Stats Row -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-top">
              <div class="st-icon bl"><i class="fas fa-shopping-bag"></i></div>
              <div class="st-text">
                <div class="st-lbl">Total Orders</div>
                <div class="st-val">12</div>
                <div class="st-trend up"><i class="fas fa-arrow-up"></i> 20.4% <span>from last 7 days</span></div>
              </div>
              <i class="fas fa-ellipsis-v st-dot"></i>
            </div>
            <div class="st-spark">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,15 Q25,0 50,15 T100,5" fill="none" stroke="var(--brand)" stroke-width="2"/></svg>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-top">
              <div class="st-icon gr"><i class="fas fa-check-circle"></i></div>
              <div class="st-text">
                <div class="st-lbl">Completed Orders</div>
                <div class="st-val">8</div>
                <div class="st-trend up"><i class="fas fa-arrow-up"></i> 18.2% <span>from last 7 days</span></div>
              </div>
              <i class="fas fa-ellipsis-v st-dot"></i>
            </div>
            <div class="st-spark">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,10 Q25,20 50,10 T100,5" fill="none" stroke="var(--green)" stroke-width="2"/></svg>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-top">
              <div class="st-icon or"><i class="far fa-clock"></i></div>
              <div class="st-text">
                <div class="st-lbl">Pending Orders</div>
                <div class="st-val">3</div>
                <div class="st-trend dn"><i class="fas fa-arrow-down"></i> 5.4% <span>from last 7 days</span></div>
              </div>
              <i class="fas fa-ellipsis-v st-dot"></i>
            </div>
            <div class="st-spark">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,5 Q25,15 50,5 T100,10" fill="none" stroke="var(--orange)" stroke-width="2"/></svg>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-top">
              <div class="st-icon rd"><i class="far fa-times-circle"></i></div>
              <div class="st-text">
                <div class="st-lbl">Failed Orders</div>
                <div class="st-val">1</div>
                <div class="st-trend dn"><i class="fas fa-arrow-down"></i> 12.6% <span>from last 7 days</span></div>
              </div>
              <i class="fas fa-ellipsis-v st-dot"></i>
            </div>
            <div class="st-spark">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,15 Q25,5 50,15 T100,5" fill="none" stroke="var(--red)" stroke-width="2"/></svg>
            </div>
          </div>
        </div>
        
        <!-- Middle Row -->
        <div class="mid-row">
          <div class="card">
            <div class="c-head">
              <div class="c-title">Sales Overview</div>
              <div class="c-act drp"><i class="far fa-calendar"></i> This Month <i class="fas fa-chevron-down" style="font-size:10px; margin-left:4px"></i></div>
            </div>
            <div style="height:240px; position:relative;">
              <div style="position:absolute; top:40px; left:40%; background:#fff; padding:8px 16px; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.05); font-size:12px; font-weight:800; color:var(--t-main); display:flex; flex-direction:column; align-items:center; z-index:10;">
                $4,752.18
                <span style="font-size:10px; color:var(--t-sub); font-weight:600; margin-top:2px;">May 20</span>
                <div style="width:10px; height:10px; background:var(--brand); border-radius:50%; border:2px solid #fff; position:absolute; bottom:-18px; box-shadow:0 0 0 2px var(--brand-light);"></div>
              </div>
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
          
          <div class="card">
            <div class="c-head">
              <div class="c-title">Order Status</div>
            </div>
            <div style="height:240px; position:relative; display:flex; flex-direction:column; justify-content:center;">
               <div style="position:absolute; top:50%; left:25%; transform:translate(-50%,-50%); text-align:center;">
                  <div style="font-size:24px; font-weight:800; color:var(--t-main); line-height:1;">12</div>
                  <div style="font-size:10px; color:var(--t-sub); font-weight:600; margin-top:4px;">Total Orders</div>
               </div>
               <canvas id="donutChart" style="position:absolute; left:-30px;"></canvas>
               
               <!-- Custom Legend -->
               <div style="position:absolute; right:0; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:16px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                     <div style="width:8px; height:8px; border-radius:50%; background:var(--brand);"></div>
                     <div>
                       <div style="font-size:12px; font-weight:700; color:var(--t-main);">Completed</div>
                       <div style="font-size:10px; color:var(--t-sub); font-weight:600;">8 (66.7%)</div>
                     </div>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                     <div style="width:8px; height:8px; border-radius:50%; background:var(--orange);"></div>
                     <div>
                       <div style="font-size:12px; font-weight:700; color:var(--t-main);">Pending</div>
                       <div style="font-size:10px; color:var(--t-sub); font-weight:600;">3 (25.0%)</div>
                     </div>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                     <div style="width:8px; height:8px; border-radius:50%; background:var(--red);"></div>
                     <div>
                       <div style="font-size:12px; font-weight:700; color:var(--t-main);">Failed</div>
                       <div style="font-size:10px; color:var(--t-sub); font-weight:600;">1 (8.3%)</div>
                     </div>
                  </div>
               </div>
            </div>
            <div style="margin-top:20px; border-top:1px dashed rgba(0,0,0,0.05); padding-top:16px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:12px; font-weight:700; color:var(--brand); cursor:pointer;" onclick="nav('all-orders')">View All Orders</span>
              <i class="fas fa-arrow-right" style="font-size:12px; color:var(--brand);"></i>
            </div>
          </div>
          
          <div class="card" style="background: transparent; box-shadow: none; padding: 0;">
            <div class="c-head" style="margin-bottom:16px;">
              <div class="c-title">Quick Access</div>
            </div>
            <div class="qa-grid">
              <div class="qa-item" onclick="nav('add-item')">
                <div class="qa-icon"><i class="fas fa-box"></i></div>
                <div class="qa-lbl">Add New Item</div>
              </div>
              <div class="qa-item" onclick="nav('add-post')">
                <div class="qa-icon" style="color:#8B5CF6;"><i class="fas fa-newspaper"></i></div>
                <div class="qa-lbl">Add New Post</div>
              </div>
              <div class="qa-item" onclick="nav('all-orders')">
                <div class="qa-icon" style="color:var(--green);"><i class="fas fa-shopping-cart"></i></div>
                <div class="qa-lbl">View All Orders</div>
              </div>
              <div class="qa-item" onclick="nav('analytics')">
                <div class="qa-icon" style="color:var(--brand);"><i class="fas fa-chart-bar"></i></div>
                <div class="qa-lbl">View Analytics</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bottom Row -->
        <div class="bot-row">
          <div class="card" style="background:transparent; box-shadow:none; padding:0;">
            <div class="c-head" style="margin-bottom:16px;">
              <div class="c-title">Top Selling Items</div>
              <div class="c-act">View All</div>
            </div>
            <table class="rtable">
              <thead>
                <tr><th>Item</th><th>Sold</th><th>Revenue</th><th></th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="td-flex"><div class="td-icon"><i class="fas fa-gem"></i></div><div class="td-n">Discord Nitro (1 Month)</div></div></td>
                  <td style="color:var(--brand); font-weight:800;">120</td>
                  <td style="font-weight:800; color:var(--t-main);">$1,199.00</td>
                  <td><svg viewBox="0 0 50 15" style="width:40px;height:15px;overflow:visible;"><path d="M0,10 Q10,15 20,5 T40,5 L50,0" fill="none" stroke="var(--brand)" stroke-width="2"/></svg></td>
                </tr>
                <tr>
                  <td><div class="td-flex"><div class="td-icon" style="color:#8B5CF6;"><i class="fas fa-rocket"></i></div><div class="td-n">Server Boosts (10x)</div></div></td>
                  <td style="color:#8B5CF6; font-weight:800;">86</td>
                  <td style="font-weight:800; color:var(--t-main);">$859.00</td>
                  <td><svg viewBox="0 0 50 15" style="width:40px;height:15px;overflow:visible;"><path d="M0,5 Q10,0 20,10 T40,10 L50,5" fill="none" stroke="#8B5CF6" stroke-width="2"/></svg></td>
                </tr>
                <tr>
                  <td><div class="td-flex"><div class="td-icon" style="color:var(--cyan);"><i class="fas fa-gem"></i></div><div class="td-n">Discord Nitro (3 Months)</div></div></td>
                  <td style="color:var(--brand); font-weight:800;">64</td>
                  <td style="font-weight:800; color:var(--t-main);">$959.36</td>
                  <td><svg viewBox="0 0 50 15" style="width:40px;height:15px;overflow:visible;"><path d="M0,15 Q15,5 25,10 T45,0 L50,5" fill="none" stroke="var(--brand)" stroke-width="2"/></svg></td>
                </tr>
                <tr>
                  <td><div class="td-flex"><div class="td-icon" style="color:var(--green);"><i class="fas fa-paint-brush"></i></div><div class="td-n">Custom Decorations</div></div></td>
                  <td style="color:var(--green); font-weight:800;">48</td>
                  <td style="font-weight:800; color:var(--t-main);">$479.52</td>
                  <td><svg viewBox="0 0 50 15" style="width:40px;height:15px;overflow:visible;"><path d="M0,10 Q10,15 20,5 T40,10 L50,0" fill="none" stroke="var(--green)" stroke-width="2"/></svg></td>
                </tr>
                <tr>
                  <td><div class="td-flex"><div class="td-icon" style="color:var(--orange);"><i class="far fa-clock"></i></div><div class="td-n">Aged Accounts</div></div></td>
                  <td style="color:var(--orange); font-weight:800;">36</td>
                  <td style="font-weight:800; color:var(--t-main);">$719.64</td>
                  <td><svg viewBox="0 0 50 15" style="width:40px;height:15px;overflow:visible;"><path d="M0,5 Q15,15 25,5 T45,10 L50,0" fill="none" stroke="var(--orange)" stroke-width="2"/></svg></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="card" style="background:transparent; box-shadow:none; padding:0;">
            <div class="c-head" style="margin-bottom:16px;">
              <div class="c-title">Recent Orders</div>
              <div class="c-act" onclick="nav('purchased-orders')">View All</div>
            </div>
            <table class="rtable">
              <tbody>
                <tr>
                  <td><div class="td-flex"><div class="td-icon" style="background:var(--brand-light); color:var(--brand);"><i class="fas fa-box"></i></div><div><div class="td-n">#ZB-2024-0012</div><div class="td-e">May 25, 2024</div></div></div></td>
                  <td><span class="badge ok">Completed</span></td>
                  <td style="font-weight:800; color:var(--t-main);">$49.99 <i class="fas fa-chevron-right" style="color:var(--t-muted); font-size:10px; margin-left:8px;"></i></td>
                </tr>
                <tr>
                  <td><div class="td-flex"><div class="td-icon" style="background:var(--green-light); color:var(--green);"><i class="fas fa-box"></i></div><div><div class="td-n">#ZB-2024-0011</div><div class="td-e">May 24, 2024</div></div></div></td>
                  <td><span class="badge pn">Pending</span></td>
                  <td style="font-weight:800; color:var(--t-main);">$19.99 <i class="fas fa-chevron-right" style="color:var(--t-muted); font-size:10px; margin-left:8px;"></i></td>
                </tr>
                <tr>
                  <td><div class="td-flex"><div class="td-icon" style="background:var(--orange-light); color:var(--orange);"><i class="fas fa-box"></i></div><div><div class="td-n">#ZB-2024-0010</div><div class="td-e">May 24, 2024</div></div></div></td>
                  <td><span class="badge ok">Completed</span></td>
                  <td style="font-weight:800; color:var(--t-main);">$99.99 <i class="fas fa-chevron-right" style="color:var(--t-muted); font-size:10px; margin-left:8px;"></i></td>
                </tr>
                <tr>
                  <td><div class="td-flex"><div class="td-icon" style="background:var(--red-light); color:var(--red);"><i class="fas fa-box"></i></div><div><div class="td-n">#ZB-2024-0009</div><div class="td-e">May 24, 2024</div></div></div></td>
                  <td><span class="badge er">Failed</span></td>
                  <td style="font-weight:800; color:var(--t-main);">$29.99 <i class="fas fa-chevron-right" style="color:var(--t-muted); font-size:10px; margin-left:8px;"></i></td>
                </tr>
                <tr>
                  <td><div class="td-flex"><div class="td-icon" style="background:var(--brand-light); color:var(--brand);"><i class="fas fa-box"></i></div><div><div class="td-n">#ZB-2024-0008</div><div class="td-e">May 23, 2024</div></div></div></td>
                  <td><span class="badge ok">Completed</span></td>
                  <td style="font-weight:800; color:var(--t-main);">$15.99 <i class="fas fa-chevron-right" style="color:var(--t-muted); font-size:10px; margin-left:8px;"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="card" style="background:transparent; box-shadow:none; padding:0;">
            <div class="c-head" style="margin-bottom:16px;">
              <div class="c-title">Activity Feed</div>
              <div class="c-act">View All</div>
            </div>
            <div class="act-list">
              <div class="act-item">
                <div class="act-icon bl"><i class="fas fa-shopping-bag"></i></div>
                <div class="act-body">
                  <div class="act-t">New order received</div>
                  <div class="act-s">#ZB-2024-0012</div>
                </div>
                <div class="act-time">5m ago</div>
              </div>
              <div class="act-item">
                <div class="act-icon gr"><i class="far fa-envelope"></i></div>
                <div class="act-body">
                  <div class="act-t">New contact message</div>
                  <div class="act-s">From John Doe</div>
                </div>
                <div class="act-time">15m ago</div>
              </div>
              <div class="act-item">
                <div class="act-icon or"><i class="fas fa-bug"></i></div>
                <div class="act-body">
                  <div class="act-t">Bug report submitted</div>
                  <div class="act-s">Regarding item page</div>
                </div>
                <div class="act-time">1h ago</div>
              </div>
              <div class="act-item">
                <div class="act-icon pu" style="background:#8B5CF6; color:#fff;"><i class="far fa-lightbulb"></i></div>
                <div class="act-body">
                  <div class="act-t">New suggestion</div>
                  <div class="act-s">Add more payment methods</div>
                </div>
                <div class="act-time">2h ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

// Replace Sidebar
html = html.replace(/<div class="sidebar">[\s\S]*?<div class="main">/, sidebarHTML + '\n  <div class="main">');

// Replace Topbar
html = html.replace(/<div class="topbar">[\s\S]*?<div class="content">/, topbarHTML + '\n    <div class="content">');

// Replace Dashboard
// Instead of complex string searching, we use regex carefully
html = html.replace(/<section class="section active" id="s-dashboard">[\s\S]*?<!-- [^>]*ALL ITEMS[^>]* -->/, dashboardHTML + '\n    <!-- ═══ ALL ITEMS ═══ -->');

fs.writeFileSync('admin.html', html);
console.log('HTML and CSS refactored successfully.');
