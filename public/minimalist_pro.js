const fs = require('fs');
let html = fs.readFileSync('admin.html', 'utf8');

const newCSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #F0F4FF;
  --surface: #FFFFFF;
  --surface-2: #F7F9FF;
  --border: rgba(99, 130, 255, 0.10);
  --border-strong: rgba(99, 130, 255, 0.18);

  --brand: #4F6EF7;
  --brand-hover: #3A56E0;
  --brand-light: #EEF1FF;
  --brand-glow: rgba(79, 110, 247, 0.15);

  --purple: #7C3AED;
  --purple-light: #F5F0FF;
  --green: #16A34A;
  --green-light: #F0FDF4;
  --amber: #D97706;
  --amber-light: #FFFBEB;
  --red: #DC2626;
  --red-light: #FEF2F2;
  --cyan: #0891B2;
  --cyan-light: #ECFEFF;

  --t1: #0D1117;
  --t2: #4B5563;
  --t3: #9CA3AF;
  --t4: #D1D5DB;

  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 16px;
  --r-xl: 20px;
  --r-2xl: 24px;

  --shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.06), 0 4px 6px -2px rgba(0,0,0,0.03);
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg);
  color: var(--t1);
  height: 100vh;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: -0.01em;
}

/* ═══════════════════════════════════════
   APP SHELL
═══════════════════════════════════════ */
.app {
  display: flex;
  height: 100vh;
}

/* ═══════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════ */
.sidebar {
  width: 232px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  transition: width 0.25s ease;
  position: relative;
  z-index: 100;
}
.sidebar.col { width: 60px; }
.sidebar.col .nav-label,
.sidebar.col .sb-info,
.sidebar.col .nav-group-title,
.sidebar.col .nav-badge,
.sidebar.col .nav-arrow,
.sidebar.col .sb-uinfo { display: none !important; }
.sidebar.col .sub-nav { display: none !important; }
.sidebar.col .nav-link { padding: 10px; justify-content: center; border-radius: var(--r-md); }
.sidebar.col .nav-icon { margin: 0; }

/* Brand */
.sb-brand {
  display: flex; align-items: center; gap: 10px;
  padding: 22px 16px 16px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.sb-logo {
  width: 34px; height: 34px; border-radius: 9px;
  background: var(--brand);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; font-weight: 800; flex-shrink: 0;
  letter-spacing: -0.5px;
}
.sb-info { line-height: 1.2; overflow: hidden; }
.sb-info .bname { font-weight: 700; font-size: 14px; color: var(--t1); white-space: nowrap; }
.sb-info .bsub { font-size: 11px; color: var(--t3); font-weight: 500; margin-top: 1px; }

.sb-tog {
  width: 26px; height: 26px; border-radius: 7px;
  background: transparent; border: 1px solid var(--border);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--t3); font-size: 11px; margin-left: auto; flex-shrink: 0;
  transition: all 0.15s;
}
.sb-tog:hover { background: var(--brand-light); color: var(--brand); border-color: var(--brand); }

/* Nav */
.sb-nav { flex: 1; padding: 10px 10px 10px; overflow-y: auto; }
.sb-nav::-webkit-scrollbar { width: 0; }

.nav-group-title {
  font-size: 9.5px; font-weight: 600; color: var(--t4);
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 14px 6px 5px;
}

.nav-item { margin-bottom: 1px; }
.nav-link {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; border-radius: var(--r-md);
  color: var(--t2); font-weight: 500; font-size: 13.5px;
  cursor: pointer; transition: all 0.12s; user-select: none;
}
.nav-link:hover { color: var(--t1); background: var(--surface-2); }
.nav-link.active {
  background: var(--brand-light);
  color: var(--brand);
  font-weight: 600;
}
.nav-icon { width: 16px; font-size: 14px; text-align: center; flex-shrink: 0; }
.nav-label { flex: 1; white-space: nowrap; }

.nav-badge {
  font-size: 10px; padding: 1px 6px;
  border-radius: 20px; font-weight: 600;
  background: var(--brand-light); color: var(--brand);
  flex-shrink: 0; min-width: 18px; text-align: center;
}
.nav-badge.or { background: var(--amber-light); color: var(--amber); }
.nav-badge.rd { background: var(--red-light); color: var(--red); }
.nav-badge.gr { background: var(--green-light); color: var(--green); }
.nav-badge.er { background: var(--red-light); color: var(--red); }
.nav-badge.sc { background: var(--green-light); color: var(--green); }
.nav-arrow { font-size: 9px; color: var(--t4); flex-shrink: 0; transition: transform 0.2s; }
.nav-link.open .nav-arrow { transform: rotate(90deg); }

/* Sub-nav */
.sub-nav {
  display: none; flex-direction: column; gap: 1px;
  margin: 2px 0 2px 16px; padding: 2px 0 2px 14px;
  border-left: 1.5px solid var(--border-strong);
}
.sub-nav.open { display: flex; }
.sub-link {
  font-size: 13px; color: var(--t3); font-weight: 500;
  padding: 6px 8px; cursor: pointer; border-radius: var(--r-sm);
  transition: all 0.12s; display: flex; align-items: center; gap: 6px;
}
.sub-link::before {
  content: ''; width: 4px; height: 4px; border-radius: 50%;
  background: var(--t4); flex-shrink: 0; transition: background 0.12s;
}
.sub-link:hover { color: var(--t1); background: var(--surface-2); }
.sub-link:hover::before { background: var(--brand); }
.sub-link.active { color: var(--brand); font-weight: 600; }
.sub-link.active::before { background: var(--brand); }

/* Sidebar Footer */
.sb-foot {
  padding: 10px;
  border-top: 1px solid var(--border);
  display: flex; align-items: center; gap: 10px;
  cursor: pointer; flex-shrink: 0; border-radius: 0;
  transition: background 0.12s;
}
.sb-foot:hover { background: var(--surface-2); }
.sb-av {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, var(--brand) 0%, #7C3AED 100%);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 12px; flex-shrink: 0;
}
.sb-uinfo { flex: 1; min-width: 0; }
.sb-uinfo .un { font-weight: 600; font-size: 13px; color: var(--t1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sb-uinfo .ur { font-size: 11px; color: var(--t3); font-weight: 400; }
.sb-out { color: var(--t4); font-size: 13px; cursor: pointer; padding: 4px; flex-shrink: 0; transition: color 0.12s; }
.sb-out:hover { color: var(--red); }

/* ═══════════════════════════════════════
   MAIN
═══════════════════════════════════════ */
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

/* Topbar */
.topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 28px;
  height: 58px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  flex-shrink: 0;
  gap: 16px;
}
.pg-title { display: flex; flex-direction: column; }
.pg-title h2 {
  font-size: 15px; font-weight: 600; color: var(--t1);
  display: flex; align-items: center; gap: 6px;
}
.pg-title p { font-size: 12px; color: var(--t3); font-weight: 400; margin-top: 1px; }

.tb-right { display: flex; align-items: center; gap: 8px; margin-left: auto; }

.tb-search {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface-2); padding: 8px 12px;
  border-radius: var(--r-md);
  border: 1px solid var(--border);
  width: 220px; transition: all 0.15s;
}
.tb-search:focus-within { border-color: var(--brand); background: #fff; box-shadow: 0 0 0 3px var(--brand-glow); }
.tb-search i { color: var(--t3); font-size: 12px; }
.tb-search input {
  border: none; outline: none; background: transparent;
  font-family: inherit; font-size: 13px; font-weight: 400;
  width: 100%; color: var(--t1); letter-spacing: -0.01em;
}
.tb-search input::placeholder { color: var(--t3); }
.tb-search-shortcut {
  font-size: 9.5px; font-weight: 600; color: var(--t4);
  background: var(--surface); border: 1px solid var(--border);
  padding: 1px 5px; border-radius: 5px; white-space: nowrap;
}

.tb-icon-btn {
  width: 34px; height: 34px; background: var(--surface-2);
  border-radius: var(--r-md); display: flex; align-items: center; justify-content: center;
  color: var(--t2); cursor: pointer;
  border: 1px solid var(--border); transition: all 0.12s;
  position: relative; font-size: 14px;
}
.tb-icon-btn:hover { background: var(--surface); color: var(--t1); border-color: var(--border-strong); }
.tb-dot {
  position: absolute; top: 7px; right: 7px;
  width: 6px; height: 6px; background: var(--brand); border-radius: 50%;
  border: 1.5px solid var(--surface);
}
.tb-av {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, var(--brand) 0%, #7C3AED 100%);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 12px; cursor: pointer;
}

.tb-btn { position: relative; }
.chat-dropdown {
  display: none; position: absolute; top: calc(100% + 10px); right: 0;
  width: 320px; background: var(--surface); border-radius: var(--r-xl);
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--border); z-index: 500; overflow: hidden;
}
.chat-dropdown.open { display: block; }
.chat-dd-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 16px 12px; }
.chat-dd-header h4 { font-size: 13px; font-weight: 600; color: var(--t1); }
.mark-read { font-size: 12px; font-weight: 500; color: var(--brand); cursor: pointer; }
.chat-dd-body { border-top: 1px solid var(--border); }
.chat-dd-item { display: flex; gap: 10px; padding: 12px 16px; cursor: pointer; transition: background 0.12s; align-items: center; }
.chat-dd-item:hover { background: var(--surface-2); }
.c-av { width: 32px; height: 32px; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 11px; flex-shrink: 0; }
.c-info { flex: 1; min-width: 0; }
.c-name { font-size: 12.5px; font-weight: 600; color: var(--t1); display: flex; justify-content: space-between; gap: 8px; }
.c-time { font-size: 11px; font-weight: 400; color: var(--t3); white-space: nowrap; }
.c-msg { font-size: 12px; color: var(--t2); margin-top: 1px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chat-dd-footer { text-align: center; padding: 12px; font-size: 12.5px; font-weight: 500; color: var(--brand); cursor: pointer; border-top: 1px solid var(--border); }
.chat-dd-footer:hover { background: var(--surface-2); }
.tb-chat-badge {
  position: absolute; top: 6px; right: 6px;
  background: var(--brand); color: #fff; font-size: 8px; font-weight: 700;
  width: 13px; height: 13px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid var(--surface);
}

.tdrop { display: none; }

/* ═══════════════════════════════════════
   CONTENT
═══════════════════════════════════════ */
.content {
  flex: 1; overflow-y: auto; padding: 24px 28px 60px;
}
.content::-webkit-scrollbar { width: 5px; }
.content::-webkit-scrollbar-thumb { background: var(--t4); border-radius: 20px; }
.content::-webkit-scrollbar-track { background: transparent; }

.section { display: none; animation: fadeUp 0.25s ease forwards; opacity: 0; transform: translateY(6px); }
.section.active { display: block; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

/* ═══════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════ */
.dash-grid { display: flex; flex-direction: column; gap: 20px; }

/* Greeting banner */
.dash-banner {
  background: var(--brand);
  background-image: linear-gradient(135deg, #4F6EF7 0%, #7C3AED 100%);
  border-radius: var(--r-xl); padding: 22px 28px;
  display: flex; align-items: center; justify-content: space-between;
  color: #fff; overflow: hidden; position: relative;
}
.dash-banner::before {
  content: '';
  position: absolute; top: -30px; right: -30px;
  width: 180px; height: 180px; border-radius: 50%;
  background: rgba(255,255,255,0.06);
}
.dash-banner::after {
  content: '';
  position: absolute; bottom: -50px; right: 80px;
  width: 120px; height: 120px; border-radius: 50%;
  background: rgba(255,255,255,0.04);
}
.db-left { position: relative; z-index: 1; }
.db-greeting { font-size: 11px; font-weight: 500; opacity: 0.75; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 6px; }
.db-title { font-size: 22px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; }
.db-sub { font-size: 13px; opacity: 0.7; margin-top: 6px; font-weight: 400; }
.db-right { display: flex; gap: 20px; position: relative; z-index: 1; }
.db-stat { text-align: center; }
.db-stat-val { font-size: 22px; font-weight: 800; letter-spacing: -0.03em; }
.db-stat-lbl { font-size: 11px; opacity: 0.65; margin-top: 2px; font-weight: 500; }
.db-divider { width: 1px; background: rgba(255,255,255,0.2); border-radius: 1px; }

/* Stats row */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  padding: 18px 20px 14px;
  display: flex; flex-direction: column;
  transition: box-shadow 0.15s, border-color 0.15s;
  cursor: default;
}
.stat-card:hover { border-color: var(--border-strong); box-shadow: var(--shadow-md); }

.stat-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
.st-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; flex-shrink: 0;
}
.st-icon.bl { background: var(--brand-light); color: var(--brand); }
.st-icon.gr { background: var(--green-light); color: var(--green); }
.st-icon.or { background: var(--amber-light); color: var(--amber); }
.st-icon.rd { background: var(--red-light); color: var(--red); }
.st-dot { font-size: 12px; color: var(--t4); cursor: pointer; padding: 2px; }

.st-text { }
.st-lbl { font-size: 12px; color: var(--t3); font-weight: 500; margin-bottom: 4px; }
.st-val { font-size: 28px; font-weight: 800; color: var(--t1); letter-spacing: -0.04em; line-height: 1; }

.st-trend { font-size: 11.5px; font-weight: 500; display: flex; align-items: center; gap: 3px; margin-top: 10px; }
.st-trend.up { color: var(--green); }
.st-trend.dn { color: var(--red); }
.st-trend span { color: var(--t3); font-weight: 400; margin-left: 2px; font-size: 11px; }

.st-spark { height: 36px; margin-top: 12px; }
.st-spark svg { width: 100%; height: 100%; overflow: visible; }

/* Cards */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  padding: 20px;
  display: flex; flex-direction: column;
}
.c-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.c-title { font-size: 14px; font-weight: 600; color: var(--t1); }
.c-act { font-size: 12px; font-weight: 500; color: var(--brand); cursor: pointer; transition: opacity 0.12s; }
.c-act:hover { opacity: 0.7; }
.c-act.drp {
  color: var(--t2); background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 5px 10px; border-radius: var(--r-sm);
  display: flex; align-items: center; gap: 5px;
  font-size: 11.5px; font-weight: 500;
}

/* Mid row */
.mid-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; }

/* Chart area */
.chart-area { position: relative; height: 190px; }

/* Revenue dashboard summary */
.dash-total { font-size: 28px; font-weight: 800; color: var(--t1); letter-spacing: -0.04em; line-height: 1; margin-bottom: 4px; }
.dash-trend { font-size: 12px; font-weight: 500; color: var(--green); display: flex; align-items: center; gap: 4px; }
.dash-trend.dn { color: var(--red); }

/* Quick Access */
.qa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; flex: 1; }
.qa-item {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 16px 12px;
  cursor: pointer; transition: all 0.15s;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 10px; text-align: center;
}
.qa-item:hover {
  background: var(--brand-light);
  border-color: var(--brand);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}
.qa-icon-wrap {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
}
.qa-lbl { font-size: 11.5px; font-weight: 600; color: var(--t1); line-height: 1.3; }

/* Bottom row */
.bot-row { display: grid; grid-template-columns: 1.7fr 1.5fr 1fr; gap: 14px; }

/* Tables */
.rtable { width: 100%; border-collapse: collapse; }
.rtable th {
  padding: 0 12px 8px; font-size: 10px; font-weight: 600;
  color: var(--t3); text-transform: uppercase; letter-spacing: 0.06em;
  text-align: left; border-bottom: 1px solid var(--border);
}
.rtable td {
  padding: 10px 12px; font-size: 13px; font-weight: 500;
  color: var(--t1); border-bottom: 1px solid var(--border);
  vertical-align: middle;
}
.rtable tr:last-child td { border-bottom: none; }
.rtable tr:hover td { background: var(--surface-2); }
.td-flex { display: flex; align-items: center; gap: 10px; }
.td-icon {
  width: 28px; height: 28px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; flex-shrink: 0;
}
.td-n { font-size: 13px; font-weight: 600; color: var(--t1); }
.td-e { font-size: 11px; color: var(--t3); font-weight: 400; margin-top: 1px; }

/* Badges */
.badge {
  padding: 3px 8px; border-radius: 20px; font-size: 11px;
  font-weight: 600; display: inline-flex; align-items: center;
  white-space: nowrap; letter-spacing: -0.01em;
}
.badge.ok, .badge.Completed, .badge.sc { background: var(--green-light); color: var(--green); }
.badge.pn, .badge.Pending { background: var(--amber-light); color: var(--amber); }
.badge.er, .badge.Failed, .badge.Open { background: var(--red-light); color: var(--red); }
.badge.nf { background: var(--surface-2); color: var(--t2); border: 1px solid var(--border); }

/* Activity Feed */
.act-list { display: flex; flex-direction: column; }
.act-item {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 12px 0; border-bottom: 1px solid var(--border);
  position: relative;
}
.act-item:last-child { border-bottom: none; }
.act-icon {
  width: 28px; height: 28px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; flex-shrink: 0;
}
.act-icon.bl { background: var(--brand-light); color: var(--brand); }
.act-icon.gr { background: var(--green-light); color: var(--green); }
.act-icon.or { background: var(--amber-light); color: var(--amber); }
.act-icon.pu { background: var(--purple-light); color: var(--purple); }
.act-body { flex: 1; min-width: 0; }
.act-t { font-size: 12.5px; font-weight: 600; color: var(--t1); }
.act-s { font-size: 11.5px; color: var(--t3); font-weight: 400; margin-top: 1px; }
.act-time { font-size: 11px; color: var(--t4); font-weight: 500; white-space: nowrap; margin-top: 2px; }
.act-dot { display: none; }

/* ═══════════════════════════════════════
   OTHER PAGES
═══════════════════════════════════════ */
.pg-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.pg-head-l h2 { font-size: 20px; font-weight: 700; letter-spacing: -0.03em; color: var(--t1); }
.pg-head-l p { font-size: 13px; color: var(--t3); margin-top: 3px; }
.pg-head-r { display: flex; gap: 10px; align-items: center; }

.btn {
  font-family: inherit; font-size: 13px; font-weight: 600;
  padding: 8px 16px; border-radius: var(--r-md);
  border: none; cursor: pointer; transition: all 0.15s;
  display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  letter-spacing: -0.01em;
}
.btn.bp { background: var(--brand); color: #fff; }
.btn.bp:hover { background: var(--brand-hover); }
.btn.bs { background: var(--surface); color: var(--t1); border: 1px solid var(--border); }
.btn.bs:hover { border-color: var(--border-strong); }
.btn.bsm { padding: 6px 12px; font-size: 12px; }

.frow { display: flex; gap: 10px; margin-bottom: 18px; }
.fsearch {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface); padding: 8px 12px;
  border-radius: var(--r-md); border: 1px solid var(--border);
  flex: 1; transition: all 0.15s;
}
.fsearch:focus-within { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-glow); }
.fsearch i { color: var(--t3); font-size: 12px; }
.fsearch input { border: none; outline: none; background: transparent; font-family: inherit; font-size: 13px; font-weight: 400; width: 100%; color: var(--t1); }
.fsel {
  padding: 8px 12px; border-radius: var(--r-md);
  border: 1px solid var(--border); background: var(--surface);
  font-family: inherit; font-size: 13px; font-weight: 500;
  color: var(--t1); cursor: pointer; outline: none;
  transition: border-color 0.15s;
}
.fsel:focus { border-color: var(--brand); }

.ig { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
.icard {
  background: var(--surface); border-radius: var(--r-xl);
  border: 1px solid var(--border); overflow: hidden;
  display: flex; flex-direction: column; transition: all 0.15s;
}
.icard:hover { border-color: var(--border-strong); box-shadow: var(--shadow-md); }
.ithumb { height: 140px; background: var(--surface-2); display: flex; align-items: center; justify-content: center; font-size: 42px; position: relative; border-bottom: 1px solid var(--border); }
.ibadge-pos { position: absolute; top: 12px; right: 12px; }
.ibody { padding: 16px; flex: 1; display: flex; flex-direction: column; }
.iname { font-size: 14px; font-weight: 600; color: var(--t1); margin-bottom: 3px; }
.iprice { font-size: 16px; font-weight: 700; color: var(--brand); margin-bottom: 12px; letter-spacing: -0.02em; }
.ifoot { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--border); margin-top: auto; }
.istock { font-size: 12px; color: var(--t2); font-weight: 500; display: flex; align-items: center; gap: 5px; }
.iacts { display: flex; gap: 5px; }
.ibtn { width: 28px; height: 28px; border-radius: var(--r-sm); border: 1px solid var(--border); background: transparent; color: var(--t3); cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; font-size: 12px; }
.ibtn:hover { border-color: var(--brand); color: var(--brand); background: var(--brand-light); }
.ibtn.dl:hover { border-color: var(--red); color: var(--red); background: var(--red-light); }

.n-list { display: flex; flex-direction: column; gap: 8px; }
.n-item { display: flex; gap: 12px; padding: 14px 16px; background: var(--surface); border-radius: var(--r-lg); border: 1px solid var(--border); transition: all 0.12s; }
.n-item:hover { border-color: var(--border-strong); }
.n-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.n-icon.pu { background: var(--brand-light); color: var(--brand); }
.n-b { flex: 1; }
.n-t { font-weight: 600; color: var(--t1); font-size: 13.5px; margin-bottom: 3px; }
.n-p { font-size: 13px; color: var(--t2); line-height: 1.5; margin-bottom: 6px; font-weight: 400; }
.n-d { font-size: 11px; color: var(--t3); font-weight: 500; }

/* Modals */
.modal-overlay, .vo-overlay {
  position: fixed; inset: 0;
  background: rgba(13, 17, 23, 0.4); backdrop-filter: blur(8px);
  display: none; align-items: center; justify-content: center; z-index: 999;
  opacity: 0; transition: opacity 0.2s ease;
}
.modal-overlay.open, .vo-overlay.open { opacity: 1; display: flex; }
.omodal, .vo-modal {
  width: 960px; height: 680px; background: var(--surface);
  border-radius: var(--r-2xl); border: 1px solid var(--border);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
  display: flex; overflow: hidden;
  transform: scale(0.97) translateY(10px); transition: 0.25s cubic-bezier(0.16,1,0.3,1);
}
.vo-modal { flex-direction: column; width: 540px; height: auto; padding: 28px; }
.vo-head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; margin-bottom: 16px; border-bottom: 1px solid var(--border); }
.vo-head h3 { font-size: 16px; font-weight: 600; color: var(--t1); display: flex; align-items: center; gap: 8px; }
.vo-body { display: flex; flex-direction: column; gap: 14px; }
.modal-overlay.open .omodal, .vo-overlay.open .vo-modal { transform: scale(1) translateY(0); }
.om-chat { flex: 1; display: flex; flex-direction: column; background: var(--surface-2); }
.om-det { width: 300px; background: var(--surface); border-left: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; padding: 24px; }
.om-head { padding: 16px 24px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: var(--surface); }
.om-head h3 { font-size: 14px; font-weight: 600; color: var(--t1); }
.om-cls { width: 32px; height: 32px; border-radius: var(--r-sm); background: var(--surface-2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--t2); font-size: 13px; transition: all 0.12s; }
.om-cls:hover { background: var(--red-light); border-color: var(--red); color: var(--red); }
.om-msgs { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
.msg { display: flex; gap: 10px; max-width: 80%; }
.msg.me { align-self: flex-end; flex-direction: row-reverse; }
.msg-av { width: 30px; height: 30px; border-radius: 50%; background: var(--brand); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; flex-shrink: 0; }
.msg.you .msg-av { background: var(--surface); color: var(--t1); border: 1px solid var(--border); }
.msg-b { background: var(--surface); border: 1px solid var(--border); padding: 10px 14px; border-radius: 14px; font-size: 13px; font-weight: 400; line-height: 1.5; color: var(--t1); }
.msg.me .msg-b { background: var(--brand); color: #fff; border-color: var(--brand); border-bottom-right-radius: 4px; }
.msg.you .msg-b { border-bottom-left-radius: 4px; }
.msg-t { font-size: 10px; color: var(--t3); margin-top: 4px; }
.om-input { padding: 14px 20px; border-top: 1px solid var(--border); display: flex; gap: 10px; background: var(--surface); }
.om-input input { flex: 1; padding: 9px 14px; border-radius: 20px; border: 1px solid var(--border); background: var(--surface-2); font-family: inherit; font-size: 13px; outline: none; transition: border-color 0.15s; }
.om-input input:focus { border-color: var(--brand); }
.om-send { width: 38px; height: 38px; border-radius: var(--r-md); background: var(--brand); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 15px; transition: background 0.12s; }
.om-send:hover { background: var(--brand-hover); }

/* Tables for other pages */
.ao-table { width: 100%; border-collapse: collapse; }
.ao-table th { padding: 0 12px 10px; font-size: 10.5px; font-weight: 600; color: var(--t3); text-transform: uppercase; letter-spacing: 0.05em; text-align: left; border-bottom: 1px solid var(--border); }
.ao-table td { padding: 12px; font-size: 13px; font-weight: 500; color: var(--t1); border-bottom: 1px solid var(--border); vertical-align: middle; }
.ao-table tr:hover td { background: var(--surface-2); }
.ao-acts { display: flex; gap: 5px; }

.sgcard { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-lg); padding: 16px; display: flex; gap: 14px; margin-bottom: 10px; transition: all 0.12s; }
.sgcard:hover { border-color: var(--border-strong); }
.sgvote { display: flex; flex-direction: column; align-items: center; gap: 3px; }
.vup, .vdn { width: 24px; height: 24px; border-radius: var(--r-sm); background: var(--surface-2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 10px; color: var(--t2); transition: all 0.12s; }
.vup:hover { background: var(--green-light); border-color: var(--green); color: var(--green); }
.vdn:hover { background: var(--red-light); border-color: var(--red); color: var(--red); }
.vcnt { font-size: 14px; font-weight: 700; color: var(--t1); letter-spacing: -0.02em; }
.sginf { flex: 1; }
.sgt { font-size: 14px; font-weight: 600; color: var(--t1); margin-bottom: 4px; }
.sgb { font-size: 13px; color: var(--t2); line-height: 1.5; margin-bottom: 8px; }
.sgmeta { display: flex; gap: 12px; flex-wrap: wrap; }
.sgmeta span { font-size: 11.5px; color: var(--t3); font-weight: 500; display: flex; align-items: center; gap: 4px; }

/* Form inputs */
.form-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
.form-group label { font-size: 12.5px; font-weight: 600; color: var(--t1); }
.form-group input, .form-group textarea, .form-group select {
  padding: 9px 12px; border-radius: var(--r-md);
  border: 1px solid var(--border); background: var(--surface);
  font-family: inherit; font-size: 13px;
  color: var(--t1); outline: none; transition: border-color 0.15s;
}
.form-group input:focus, .form-group textarea:focus, .form-group select:focus {
  border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-glow);
}

/* Analytics */
.reports-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }

/* Page Footer */
.page-footer {
  position: fixed; bottom: 0; left: 232px; right: 0;
  height: 40px; padding: 0 28px;
  background: var(--surface); border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
  font-size: 11.5px; font-weight: 400; color: var(--t3); z-index: 50;
  transition: left 0.25s ease;
}
.sidebar.col ~ .main .page-footer { left: 60px; }
.pf-love { display: flex; align-items: center; gap: 4px; }
.pf-love i { color: var(--red); font-size: 9px; }
`;

html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${newCSS}\n</style>`);

// Also update the font import in <head>
html = html.replace(
  /family=Plus\+Jakarta\+Sans[^"]+"/,
  'family=Inter:wght@300;400;500;600;700;800;900&display=swap"'
);

// Update topbar to show greeting on left
const newTopbar = `  <header class="topbar">
    <div class="pg-title" id="pgTitle">
      <h2>Dashboard</h2>
    </div>
    <div class="tb-right">
      <div class="tb-search">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search…">
        <span class="tb-search-shortcut">⌘K</span>
      </div>
      <div class="tb-icon-btn" id="tbChatBtn" onclick="toggleChatDropdown(event)">
        <i class="far fa-comment-dots"></i>
        <div class="tb-chat-badge" id="tbChatBadge">3</div>
        <div class="chat-dropdown" id="tbChatDropdown" onclick="event.stopPropagation()">
          <div class="chat-dd-header">
            <h4>Messages</h4>
            <span class="mark-read" onclick="markChatsRead()">Mark all read</span>
          </div>
          <div class="chat-dd-body" id="chatDdBody">
            <div class="chat-dd-item unread">
              <div class="c-av" style="background:#4F6EF7;">JD</div>
              <div class="c-info">
                <div class="c-name">John Doe <span class="c-time">2m</span></div>
                <div class="c-msg">Is my order #1234 completed?</div>
              </div>
            </div>
            <div class="chat-dd-item unread">
              <div class="c-av" style="background:#7C3AED;">SW</div>
              <div class="c-info">
                <div class="c-name">Sarah Williams <span class="c-time">1h</span></div>
                <div class="c-msg">I'd like to ask about a custom boost.</div>
              </div>
            </div>
            <div class="chat-dd-item">
              <div class="c-av" style="background:#D97706;">MB</div>
              <div class="c-info">
                <div class="c-name">Mike Brown <span class="c-time">3h</span></div>
                <div class="c-msg">Thanks!</div>
              </div>
            </div>
          </div>
          <div class="chat-dd-footer" onclick="openFullChat()">View all messages</div>
        </div>
      </div>
      <div class="tb-icon-btn" onclick="nav('notifications',null)">
        <i class="far fa-bell"></i>
        <div class="tb-dot"></div>
      </div>
      <div class="tb-av">A</div>
    </div>
  </header>`;

html = html.replace(/<header class="topbar">[\s\S]*?<\/header>/, newTopbar);

// Update dashboard section to have the banner
const oldDashGrid = `    <section class="section active" id="s-dashboard">
      <div class="dash-grid">
        <!-- Stats Row -->
        <div class="stats-row">`;

const newDashGrid = `    <section class="section active" id="s-dashboard">
      <div class="dash-grid">
        <!-- Banner -->
        <div class="dash-banner">
          <div class="db-left">
            <div class="db-greeting">Welcome back</div>
            <div class="db-title">Good morning, Admin 👋</div>
            <div class="db-sub">Here's what's happening with your store today.</div>
          </div>
          <div class="db-right">
            <div class="db-stat">
              <div class="db-stat-val">$4,752</div>
              <div class="db-stat-lbl">Revenue</div>
            </div>
            <div class="db-divider"></div>
            <div class="db-stat">
              <div class="db-stat-val">12</div>
              <div class="db-stat-lbl">Orders</div>
            </div>
            <div class="db-divider"></div>
            <div class="db-stat">
              <div class="db-stat-val">+23%</div>
              <div class="db-stat-lbl">Growth</div>
            </div>
          </div>
        </div>
        <!-- Stats Row -->
        <div class="stats-row">`;

html = html.replace(oldDashGrid, newDashGrid);

// Update Quick Access cards
html = html.replace(
  '<div class="qa-grid">\n              <div class="qa-item" onclick="nav(\'add-item\')">\n                <div class="qa-icon-wrap" style="background: var(--brand-light);">\n                  <i class="fas fa-box" style="color: var(--brand);"></i>\n                </div>',
  '<div class="qa-grid">\n              <div class="qa-item" onclick="nav(\'add-item\')">\n                <div class="qa-icon-wrap" style="background: var(--brand-light); color: var(--brand);">\n                  <i class="fas fa-box"></i>\n                </div>'
);

fs.writeFileSync('admin.html', html);
console.log('New Minimalist Pro design applied!');
