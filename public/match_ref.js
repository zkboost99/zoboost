const fs = require('fs');
let html = fs.readFileSync('admin.html', 'utf8');

// ─── NEW CSS TO MATCH REFERENCE EXACTLY ───
const newCSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #F0F3F9;
  --white: #FFFFFF;
  --brand: #5B8DEF;
  --brand-dark: #3A68D8;
  --brand-light: #EEF3FF;
  --purple: #8B5CF6;
  --purple-light: #F3EFFF;
  --green: #22C55E;
  --green-light: #EDFBF3;
  --orange: #F59E0B;
  --orange-light: #FFF8EC;
  --red: #EF4444;
  --red-light: #FFF1F1;
  --cyan: #06B6D4;
  --cyan-light: #EDFCFF;
  
  --t1: #1B1F3B;
  --t2: #6B7A99;
  --t3: #B0BAD3;
  
  --radius-xs: 8px;
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  
  --sh-card: 0 2px 20px rgba(0,0,0,0.04);
  --sh-float: 0 8px 32px rgba(0,0,0,0.06);
  --sh-deep: 0 20px 60px rgba(0,0,0,0.08);
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--bg);
  color: var(--t1);
  height: 100vh;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ── Shell ── */
.app {
  display: flex;
  height: 100vh;
  gap: 0;
  position: relative;
}

/* ── Sidebar ── */
.sidebar {
  width: 240px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  z-index: 100;
  border-right: 1px solid rgba(0,0,0,0.05);
  transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
}
.sidebar.col { width: 68px; }
.sidebar.col .nav-label,
.sidebar.col .sb-info,
.sidebar.col .nav-group-title,
.sidebar.col .nav-badge,
.sidebar.col .nav-arrow,
.sidebar.col .sb-uinfo { display: none; }
.sidebar.col .sub-nav { display: none !important; }
.sidebar.col .nav-link { justify-content: center; padding: 12px; }

/* Brand */
.sb-brand {
  display: flex; align-items: center; gap: 12px;
  padding: 28px 20px 20px 20px;
  flex-shrink: 0;
}
.sb-logo {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, var(--brand), var(--brand-dark));
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px; flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(91,141,239,0.4);
  font-weight: 800;
}
.sb-info { display: flex; flex-direction: column; overflow: hidden; }
.sb-info .bname { font-weight: 800; font-size: 15px; color: var(--t1); white-space: nowrap; }
.sb-info .bsub { font-size: 11px; color: var(--t2); font-weight: 600; white-space: nowrap; }

/* Toggle button */
.sb-tog {
  width: 28px; height: 28px; border-radius: 8px;
  background: var(--bg); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--t2); font-size: 12px; margin-left: auto; flex-shrink: 0;
  transition: 0.2s;
}
.sb-tog:hover { background: var(--brand-light); color: var(--brand); }

/* Nav */
.sb-nav { flex: 1; padding: 8px 12px 16px 12px; overflow-y: auto; }
.sb-nav::-webkit-scrollbar { width: 0; }

.nav-group-title {
  font-size: 9.5px; font-weight: 700; color: var(--t3);
  text-transform: uppercase; letter-spacing: 0.12em;
  padding: 16px 8px 8px 8px;
  white-space: nowrap; overflow: hidden;
}

.nav-item { margin-bottom: 2px; }

.nav-link {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: var(--radius-sm);
  color: var(--t2); font-weight: 600; font-size: 13.5px;
  cursor: pointer; transition: all 0.2s; user-select: none;
  position: relative; white-space: nowrap;
}
.nav-link:hover { color: var(--t1); background: var(--bg); }
.nav-link.active {
  background: var(--brand-light);
  color: var(--brand);
  font-weight: 700;
}
.nav-icon { width: 18px; text-align: center; font-size: 15px; flex-shrink: 0; }

.nav-badge {
  margin-left: auto; font-size: 10.5px; padding: 2px 8px;
  border-radius: 20px; font-weight: 700;
  background: var(--brand-light); color: var(--brand);
  flex-shrink: 0;
}
.nav-badge.or { background: var(--orange-light); color: var(--orange); }
.nav-badge.rd { background: var(--red-light); color: var(--red); }
.nav-badge.gr { background: var(--green-light); color: var(--green); }
.nav-badge.er { background: var(--red-light); color: var(--red); }
.nav-badge.sc { background: var(--green-light); color: var(--green); }
.nav-arrow { font-size: 10px; color: var(--t3); flex-shrink: 0; transition: transform 0.2s; }
.nav-link.open .nav-arrow { transform: rotate(90deg); }

/* Sub-nav */
.sub-nav {
  display: none; flex-direction: column; gap: 2px;
  margin: 4px 0 4px 30px; padding-left: 16px;
  border-left: 2px solid #E8ECF5;
}
.sub-nav.open { display: flex; }
.sub-link {
  font-size: 13px; color: var(--t2); font-weight: 600;
  padding: 7px 10px; cursor: pointer; border-radius: 8px;
  transition: 0.15s; position: relative; display: flex; align-items: center; gap: 6px;
}
.sub-link::before {
  content: ''; width: 5px; height: 5px; border-radius: 50%;
  background: var(--t3); flex-shrink: 0; transition: 0.15s;
}
.sub-link:hover { color: var(--t1); background: var(--bg); }
.sub-link:hover::before { background: var(--brand); }
.sub-link.active { color: var(--brand); font-weight: 700; }
.sub-link.active::before { background: var(--brand); }

/* Footer */
.sb-foot {
  padding: 12px 16px;
  border-top: 1px solid rgba(0,0,0,0.04);
  display: flex; align-items: center; gap: 10px;
  cursor: pointer; flex-shrink: 0;
}
.sb-foot:hover { background: var(--bg); }
.sb-av {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, #1B1F3B, #4A5568);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 13px; flex-shrink: 0;
}
.sb-uinfo { flex: 1; overflow: hidden; min-width: 0; }
.sb-uinfo .un { font-weight: 700; font-size: 13px; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sb-uinfo .ur { font-size: 11px; color: var(--t2); font-weight: 500; white-space: nowrap; }
.sb-out { color: var(--t3); cursor: pointer; font-size: 13px; padding: 4px; flex-shrink: 0; }
.sb-out:hover { color: var(--t2); }

/* ── Main ── */
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

/* Topbar */
.topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 28px 0 28px; flex-shrink: 0;
  background: transparent;
}
.pg-title { display: flex; flex-direction: column; gap: 3px; }
.pg-title h2 {
  font-size: 22px; font-weight: 800; color: var(--t1);
  letter-spacing: -0.025em; display: flex; align-items: center; gap: 8px;
  white-space: nowrap;
}
.pg-title p { font-size: 13px; color: var(--t2); font-weight: 500; }

.tb-right { display: flex; align-items: center; gap: 12px; }

.tb-search {
  display: flex; align-items: center; gap: 10px;
  background: var(--white); padding: 10px 16px;
  border-radius: 30px; box-shadow: var(--sh-card);
  width: 240px; border: 1.5px solid rgba(0,0,0,0.04);
}
.tb-search i { color: var(--t3); font-size: 13px; }
.tb-search input {
  border: none; outline: none; background: transparent;
  font-family: inherit; font-size: 13px; font-weight: 500;
  width: 100%; color: var(--t1);
}
.tb-search input::placeholder { color: var(--t3); }
.tb-search-shortcut {
  font-size: 10px; font-weight: 700; color: var(--t3);
  background: var(--bg); padding: 2px 7px; border-radius: 5px;
  white-space: nowrap;
}

.tb-icon-btn {
  width: 38px; height: 38px; background: var(--white);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  color: var(--t2); cursor: pointer; box-shadow: var(--sh-card);
  position: relative; font-size: 15px;
  border: 1.5px solid rgba(0,0,0,0.04); transition: 0.2s;
}
.tb-icon-btn:hover { color: var(--t1); border-color: rgba(0,0,0,0.1); }
.tb-dot {
  position: absolute; top: 7px; right: 7px;
  width: 8px; height: 8px; background: var(--brand); border-radius: 50%;
  border: 1.5px solid var(--white);
}
.tb-av {
  width: 38px; height: 38px; border-radius: 50%;
  background: linear-gradient(135deg, #1B1F3B, #4A5568);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 13px; cursor: pointer;
  box-shadow: var(--sh-card); flex-shrink: 0;
}

/* Chat dropdown preserved */
.tb-btn { position: relative; }
.chat-dropdown { display: none; }
.tb-chat-badge {
  position: absolute; top: 5px; right: 5px;
  background: var(--brand); color: #fff; font-size: 8px; font-weight: 700;
  width: 14px; height: 14px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--white);
}

/* ── Content ── */
.content {
  flex: 1; overflow-y: auto; padding: 20px 28px 40px 28px;
  position: relative;
}
.content::-webkit-scrollbar { width: 4px; }
.content::-webkit-scrollbar-thumb { background: #E0E7FF; border-radius: 4px; }

.section { display: none; animation: secFadeIn 0.35s ease forwards; opacity: 0; transform: translateY(8px); }
.section.active { display: block; }
@keyframes secFadeIn { to { opacity: 1; transform: translateY(0); } }

/* ── Dashboard ── */
.dash-grid { display: flex; flex-direction: column; gap: 20px; }

/* Sales header inside dashboard */
.dash-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 4px;
}
.dash-total {
  font-size: 30px; font-weight: 800; color: var(--t1);
  letter-spacing: -0.03em; line-height: 1; margin-bottom: 6px;
}
.dash-trend {
  font-size: 12px; font-weight: 600; color: var(--green);
  display: flex; align-items: center; gap: 4px;
}
.dash-trend.dn { color: var(--red); }

/* Stats row */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat-card {
  background: var(--white); border-radius: var(--radius-lg);
  padding: 20px 20px 14px 20px; box-shadow: var(--sh-card);
  display: flex; flex-direction: column;
  border: 1px solid rgba(0,0,0,0.03);
  transition: box-shadow 0.2s, transform 0.2s;
}
.stat-card:hover { box-shadow: var(--sh-float); transform: translateY(-2px); }

.stat-top { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 16px; }
.st-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0;
}
.st-icon.bl { background: var(--brand-light); color: var(--brand); }
.st-icon.gr { background: var(--green-light); color: var(--green); }
.st-icon.or { background: var(--orange-light); color: var(--orange); }
.st-icon.rd { background: var(--red-light); color: var(--red); }

.st-text { flex: 1; min-width: 0; }
.st-lbl { font-size: 12.5px; font-weight: 600; color: var(--t2); margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.st-val { font-size: 26px; font-weight: 800; color: var(--t1); letter-spacing: -0.025em; line-height: 1; }
.st-trend { font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 3px; margin-top: 6px; }
.st-trend.up { color: var(--green); }
.st-trend.dn { color: var(--red); }
.st-trend span { color: var(--t3); font-weight: 500; margin-left: 2px; }
.st-dot { color: var(--t3); font-size: 14px; cursor: pointer; margin-top: 2px; }
.st-spark { height: 44px; margin-top: auto; }
.st-spark svg { width: 100%; height: 100%; overflow: visible; }

/* Middle row */
.mid-row { display: grid; grid-template-columns: 2fr 1.1fr 1.1fr; gap: 16px; }

.card {
  background: var(--white); border-radius: var(--radius-lg);
  padding: 20px; box-shadow: var(--sh-card);
  display: flex; flex-direction: column;
  border: 1px solid rgba(0,0,0,0.03);
}
.c-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.c-title { font-size: 15px; font-weight: 700; color: var(--t1); }
.c-act { font-size: 12px; font-weight: 600; color: var(--brand); cursor: pointer; transition: 0.15s; }
.c-act:hover { opacity: 0.7; }
.c-act.drp {
  color: var(--t1); background: var(--bg);
  padding: 6px 12px; border-radius: 8px;
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600;
}

/* Revenue card chart area */
.chart-area { position: relative; height: 200px; }

/* Quick Access */
.qa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex: 1; }
.qa-item {
  background: var(--bg); border-radius: var(--radius-md);
  padding: 18px 12px; cursor: pointer; transition: 0.2s;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 10px; text-align: center;
}
.qa-item:hover { background: var(--brand-light); }
.qa-icon-wrap {
  width: 42px; height: 42px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; background: var(--white);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.qa-icon { font-size: 18px; }
.qa-lbl { font-size: 12px; font-weight: 700; color: var(--t1); line-height: 1.3; }

/* Bottom row */
.bot-row { display: grid; grid-template-columns: 1.6fr 1.5fr 1fr; gap: 16px; }

/* Table */
.rtable { width: 100%; border-collapse: collapse; }
.rtable th {
  padding: 0 12px 10px 12px; font-size: 10.5px; font-weight: 700;
  color: var(--t3); text-transform: uppercase; letter-spacing: 0.05em;
  text-align: left; border-bottom: 1px solid rgba(0,0,0,0.04);
}
.rtable tr:not(:last-child) td { border-bottom: 1px solid rgba(0,0,0,0.04); }
.rtable td {
  padding: 12px; font-size: 13px; font-weight: 600;
  color: var(--t1); vertical-align: middle;
}
.td-flex { display: flex; align-items: center; gap: 10px; }
.td-icon {
  width: 30px; height: 30px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; background: var(--brand-light); color: var(--brand);
  flex-shrink: 0;
}
.td-n { font-size: 13px; font-weight: 700; color: var(--t1); }
.td-e { font-size: 11px; color: var(--t3); font-weight: 500; margin-top: 1px; }

/* Badges */
.badge {
  padding: 4px 10px; border-radius: 20px; font-size: 11px;
  font-weight: 700; display: inline-flex; align-items: center;
  justify-content: center; white-space: nowrap;
}
.badge.ok, .badge.Completed, .badge.sc { background: var(--green-light); color: var(--green); }
.badge.pn, .badge.Pending { background: var(--orange-light); color: var(--orange); }
.badge.er, .badge.Failed, .badge.Open { background: var(--red-light); color: var(--red); }
.badge.nf { background: var(--bg); color: var(--t2); }

/* Activity Feed */
.act-list { display: flex; flex-direction: column; gap: 16px; }
.act-item { display: flex; gap: 12px; align-items: flex-start; position: relative; }
.act-item:not(:last-child)::after {
  content: ''; position: absolute; left: 14px; top: 29px;
  bottom: -16px; width: 1.5px; background: var(--bg);
}
.act-icon {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; flex-shrink: 0; z-index: 2;
}
.act-icon.bl { background: var(--brand-light); color: var(--brand); }
.act-icon.gr { background: var(--green-light); color: var(--green); }
.act-icon.or { background: var(--orange-light); color: var(--orange); }
.act-icon.pu { background: var(--purple-light); color: var(--purple); }
.act-body { flex: 1; min-width: 0; }
.act-t { font-size: 12.5px; font-weight: 700; color: var(--t1); }
.act-s { font-size: 11px; color: var(--t2); font-weight: 500; margin-top: 1px; }
.act-time {
  font-size: 10.5px; color: var(--t3); font-weight: 600;
  white-space: nowrap; display: flex; align-items: center; gap: 4px;
}
.act-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.act-dot.bl { background: var(--brand); }
.act-dot.gr { background: var(--green); }
.act-dot.or { background: var(--orange); }
.act-dot.pu { background: var(--purple); }

/* ─── Other pages shared CSS ─── */
.pg-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.pg-head-l h2 { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 4px; color: var(--t1); }
.pg-head-l p { font-size: 13px; color: var(--t2); font-weight: 500; }
.pg-head-r { display: flex; gap: 12px; align-items: center; }

.btn {
  font-family: inherit; font-size: 13px; font-weight: 700;
  padding: 10px 20px; border-radius: var(--radius-sm);
  border: none; cursor: pointer; transition: 0.2s;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
}
.btn.bp { background: var(--brand); color: #fff; box-shadow: 0 6px 16px rgba(91,141,239,0.35); }
.btn.bp:hover { background: var(--brand-dark); transform: translateY(-1px); }
.btn.bs { background: var(--white); color: var(--t1); border: 1px solid rgba(0,0,0,0.08); box-shadow: var(--sh-card); }
.btn.bs:hover { border-color: rgba(0,0,0,0.15); }
.btn.bsm { padding: 7px 14px; font-size: 12px; }

.frow { display: flex; gap: 12px; margin-bottom: 20px; }
.fsearch {
  display: flex; align-items: center; gap: 10px;
  background: var(--white); padding: 10px 16px;
  border-radius: var(--radius-sm); box-shadow: var(--sh-card);
  flex: 1; border: 1px solid rgba(0,0,0,0.04);
}
.fsearch i { color: var(--t3); font-size: 13px; }
.fsearch input { border: none; outline: none; background: transparent; font-family: inherit; font-size: 13px; font-weight: 500; width: 100%; color: var(--t1); }
.fsel {
  padding: 10px 16px; border-radius: var(--radius-sm);
  border: 1px solid rgba(0,0,0,0.07); background: var(--white);
  font-family: inherit; font-size: 13px; font-weight: 600;
  color: var(--t1); cursor: pointer; outline: none; box-shadow: var(--sh-card);
}

.ig { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.icard {
  background: var(--white); border-radius: var(--radius-lg);
  overflow: hidden; box-shadow: var(--sh-card); transition: 0.2s;
  display: flex; flex-direction: column; border: 1px solid rgba(0,0,0,0.04);
}
.icard:hover { box-shadow: var(--sh-float); transform: translateY(-2px); }
.ithumb { height: 150px; background: var(--bg); display: flex; align-items: center; justify-content: center; font-size: 44px; position: relative; }
.ibadge-pos { position: absolute; top: 14px; right: 14px; }
.ibody { padding: 20px; flex: 1; display: flex; flex-direction: column; }
.iname { font-size: 15px; font-weight: 700; margin-bottom: 4px; color: var(--t1); }
.iprice { font-size: 18px; font-weight: 800; color: var(--brand); margin-bottom: 12px; }
.ifoot { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px dashed rgba(0,0,0,0.06); margin-top: auto; }
.istock { font-size: 12px; color: var(--t2); font-weight: 600; display: flex; align-items: center; gap: 6px; }
.iacts { display: flex; gap: 6px; }
.ibtn {
  width: 32px; height: 32px; border-radius: 8px;
  border: none; background: var(--bg); color: var(--t2);
  cursor: pointer; transition: 0.2s; display: flex;
  align-items: center; justify-content: center; font-size: 13px;
}
.ibtn:hover { background: var(--brand-light); color: var(--brand); }
.ibtn.dl:hover { background: var(--red-light); color: var(--red); }

.n-list { display: flex; flex-direction: column; gap: 10px; }
.n-item {
  display: flex; gap: 14px; padding: 14px 18px;
  background: var(--white); border-radius: var(--radius-lg);
  box-shadow: var(--sh-card); border: 1px solid rgba(0,0,0,0.04);
}
.n-icon { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
.n-icon.pu { background: var(--brand-light); color: var(--brand); }
.n-b { flex: 1; }
.n-t { font-weight: 700; color: var(--t1); margin-bottom: 3px; font-size: 13.5px; }
.n-p { font-size: 12.5px; color: var(--t2); line-height: 1.5; margin-bottom: 6px; font-weight: 500; }
.n-d { font-size: 11px; color: var(--t3); font-weight: 600; }

/* ── Modals ── */
.modal-overlay, .vo-overlay {
  position: fixed; inset: 0;
  background: rgba(27,31,59,0.15); backdrop-filter: blur(6px);
  display: none; align-items: center; justify-content: center; z-index: 999;
  opacity: 0; transition: opacity 0.35s ease;
}
.modal-overlay.open, .vo-overlay.open { opacity: 1; display: flex; }
.omodal, .vo-modal {
  width: 1000px; height: 700px; background: var(--white);
  border-radius: var(--radius-xl); box-shadow: var(--sh-deep);
  display: flex; overflow: hidden;
  transform: scale(0.96) translateY(16px); transition: 0.4s cubic-bezier(0.16,1,0.3,1);
}
.vo-modal { flex-direction: column; width: 580px; height: auto; padding: 36px; }
.vo-head {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 20px; margin-bottom: 20px;
}
.vo-head h3 { font-size: 18px; font-weight: 800; display: flex; align-items: center; gap: 10px; color: var(--t1); }
.vo-body { display: flex; flex-direction: column; gap: 18px; }
.modal-overlay.open .omodal, .vo-overlay.open .vo-modal { transform: scale(1) translateY(0); }
.om-chat { flex: 1; display: flex; flex-direction: column; background: var(--bg); }
.om-det { width: 320px; background: var(--white); border-left: 1px solid rgba(0,0,0,0.05); display: flex; flex-direction: column; overflow-y: auto; padding: 28px; }
.om-head { padding: 20px 28px; border-bottom: 1px solid rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; background: var(--white); }
.om-head h3 { font-size: 16px; font-weight: 800; display: flex; align-items: center; gap: 10px; color: var(--t1); }
.om-cls { width: 36px; height: 36px; border-radius: 10px; background: var(--bg); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--t2); transition: 0.2s; font-size: 14px; }
.om-cls:hover { background: var(--red-light); color: var(--red); }
.om-msgs { flex: 1; padding: 28px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; }
.msg { display: flex; gap: 12px; max-width: 80%; }
.msg.me { align-self: flex-end; flex-direction: row-reverse; }
.msg-av { width: 36px; height: 36px; border-radius: 12px; background: var(--brand); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; flex-shrink: 0; }
.msg.you .msg-av { background: var(--bg); color: var(--t1); border: 1px solid rgba(0,0,0,0.06); }
.msg-b { background: var(--white); padding: 12px 16px; border-radius: 16px; font-size: 13.5px; font-weight: 500; line-height: 1.6; color: var(--t1); box-shadow: var(--sh-card); }
.msg.me .msg-b { background: var(--brand); color: #fff; border-bottom-right-radius: 4px; box-shadow: 0 8px 20px rgba(91,141,239,0.3); }
.msg.you .msg-b { border-bottom-left-radius: 4px; }
.msg-t { font-size: 10.5px; color: var(--t3); font-weight: 600; margin-top: 6px; }
.om-input { padding: 20px 28px; border-top: 1px solid rgba(0,0,0,0.05); display: flex; gap: 12px; background: var(--white); }
.om-input input { flex: 1; padding: 12px 20px; border-radius: 24px; border: 1.5px solid rgba(0,0,0,0.07); background: var(--bg); font-family: inherit; font-size: 13.5px; font-weight: 500; outline: none; transition: border-color 0.2s; }
.om-input input:focus { border-color: var(--brand); }
.om-send { width: 46px; height: 46px; border-radius: 14px; background: var(--brand); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 6px 16px rgba(91,141,239,0.35); font-size: 18px; transition: 0.2s; }
.om-send:hover { transform: scale(1.05); }

/* Chat dropdown */
.chat-dropdown {
  display: none; position: absolute; top: calc(100% + 12px); right: 0;
  width: 340px; background: var(--white); border-radius: var(--radius-lg);
  box-shadow: var(--sh-deep); border: 1px solid rgba(0,0,0,0.06); z-index: 500;
}
.chat-dropdown.open { display: block; }
.chat-dd-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px 12px; border-bottom: 1px solid rgba(0,0,0,0.05); }
.chat-dd-header h4 { font-size: 14px; font-weight: 700; color: var(--t1); }
.mark-read { font-size: 12px; font-weight: 600; color: var(--brand); cursor: pointer; }
.chat-dd-body { max-height: 280px; overflow-y: auto; }
.chat-dd-item { display: flex; gap: 12px; padding: 14px 20px; cursor: pointer; transition: 0.15s; align-items: center; }
.chat-dd-item:hover { background: var(--bg); }
.chat-dd-item.unread .c-msg { font-weight: 700; }
.c-av { width: 36px; height: 36px; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; flex-shrink: 0; }
.c-info { flex: 1; min-width: 0; }
.c-name { font-size: 12.5px; font-weight: 700; color: var(--t1); display: flex; justify-content: space-between; }
.c-time { font-size: 11px; font-weight: 500; color: var(--t3); }
.c-msg { font-size: 12px; color: var(--t2); font-weight: 500; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.chat-dd-footer { text-align: center; padding: 14px; font-size: 12.5px; font-weight: 600; color: var(--brand); cursor: pointer; border-top: 1px solid rgba(0,0,0,0.05); }
.chat-dd-footer:hover { opacity: 0.7; }

.tdrop { display: none; }

/* Analytics + misc pages */
.ao-table { width: 100%; border-collapse: collapse; }
.ao-table th { padding: 10px 14px; font-size: 10.5px; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: 0.05em; text-align: left; border-bottom: 1px solid rgba(0,0,0,0.06); }
.ao-table td { padding: 14px; font-size: 13px; font-weight: 600; color: var(--t1); border-bottom: 1px solid rgba(0,0,0,0.04); vertical-align: middle; }
.ao-table tr:hover td { background: var(--bg); }
.ao-acts { display: flex; gap: 6px; }

.sgcard { background: var(--white); border-radius: var(--radius-lg); padding: 20px; display: flex; gap: 16px; box-shadow: var(--sh-card); border: 1px solid rgba(0,0,0,0.04); margin-bottom: 12px; transition: 0.2s; }
.sgcard:hover { box-shadow: var(--sh-float); }
.sgvote { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.vup, .vdn { width: 28px; height: 28px; border-radius: 8px; background: var(--bg); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--t2); transition: 0.15s; }
.vup:hover { background: var(--green-light); color: var(--green); }
.vdn:hover { background: var(--red-light); color: var(--red); }
.vcnt { font-size: 15px; font-weight: 800; color: var(--t1); }
.sginf { flex: 1; }
.sgt { font-size: 14px; font-weight: 700; color: var(--t1); margin-bottom: 4px; }
.sgb { font-size: 13px; color: var(--t2); font-weight: 500; line-height: 1.5; margin-bottom: 10px; }
.sgmeta { display: flex; gap: 16px; flex-wrap: wrap; }
.sgmeta span { font-size: 11.5px; color: var(--t3); font-weight: 600; display: flex; align-items: center; gap: 5px; }

/* Input/Form helpers */
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.form-group label { font-size: 12.5px; font-weight: 700; color: var(--t1); }
.form-group input, .form-group textarea, .form-group select {
  padding: 10px 14px; border-radius: var(--radius-sm);
  border: 1.5px solid rgba(0,0,0,0.08); background: var(--white);
  font-family: inherit; font-size: 13.5px; font-weight: 500;
  color: var(--t1); outline: none; transition: border-color 0.2s;
}
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: var(--brand); }

/* Analytics charts */
.reports-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }

/* Page Footer */
.page-footer {
  position: fixed; bottom: 0; left: 240px; right: 0;
  padding: 12px 28px; background: var(--white);
  border-top: 1px solid rgba(0,0,0,0.04);
  display: flex; justify-content: space-between; align-items: center;
  font-size: 11.5px; font-weight: 500; color: var(--t3); z-index: 50;
  transition: left 0.35s cubic-bezier(0.4,0,0.2,1);
}
.sidebar.col ~ .main .page-footer { left: 68px; }
.pf-love { display: flex; align-items: center; gap: 4px; }
.pf-love i { color: var(--red); font-size: 10px; }
`;

// Replace CSS block
html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${newCSS}\n</style>`);

// Fix topbar structure to match the reference exactly
const newTopbar = `  <header class="topbar">
    <div class="pg-title" id="pgTitle">
      <h2>Good morning, Admin 👋</h2>
      <p>Here's an overview of your store performance today.</p>
    </div>
    <div class="tb-right">
      <div class="tb-search">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search anything…">
        <span class="tb-search-shortcut">/</span>
      </div>
      <div class="tb-icon-btn" id="tbChatBtn" onclick="toggleChatDropdown(event)">
        <i class="fas fa-comment-dots"></i>
        <div class="tb-chat-badge" id="tbChatBadge">3</div>
        <div class="chat-dropdown" id="tbChatDropdown" onclick="event.stopPropagation()">
          <div class="chat-dd-header">
            <h4>Messages</h4>
            <span class="mark-read" onclick="markChatsRead()">Mark all read</span>
          </div>
          <div class="chat-dd-body" id="chatDdBody">
            <div class="chat-dd-item unread">
              <div class="c-av" style="background: #5B8DEF;">JD</div>
              <div class="c-info">
                <div class="c-name">John Doe <span class="c-time">2m ago</span></div>
                <div class="c-msg">Is my order #1234 completed yet?</div>
              </div>
            </div>
            <div class="chat-dd-item unread">
              <div class="c-av" style="background: #06B6D4;">SW</div>
              <div class="c-info">
                <div class="c-name">Sarah Williams <span class="c-time">1h ago</span></div>
                <div class="c-msg">I'd like to ask about a custom boost.</div>
              </div>
            </div>
            <div class="chat-dd-item unread">
              <div class="c-av" style="background: #F59E0B;">MB</div>
              <div class="c-info">
                <div class="c-name">Mike Brown <span class="c-time">3h ago</span></div>
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

// Replace topbar
html = html.replace(/<header class="topbar">[\s\S]*?<\/header>/, newTopbar);

// Update Quick Access items to have colored icon-wrap
const newQaGrid = `<div class="qa-grid">
              <div class="qa-item" onclick="nav('add-item')">
                <div class="qa-icon-wrap" style="background: var(--brand-light);">
                  <i class="fas fa-box" style="color: var(--brand);"></i>
                </div>
                <div class="qa-lbl">Add New Item</div>
              </div>
              <div class="qa-item" onclick="nav('add-post')">
                <div class="qa-icon-wrap" style="background: var(--purple-light);">
                  <i class="fas fa-newspaper" style="color: var(--purple);"></i>
                </div>
                <div class="qa-lbl">Add New Post</div>
              </div>
              <div class="qa-item" onclick="nav('all-orders')">
                <div class="qa-icon-wrap" style="background: var(--green-light);">
                  <i class="fas fa-shopping-cart" style="color: var(--green);"></i>
                </div>
                <div class="qa-lbl">View All Orders</div>
              </div>
              <div class="qa-item" onclick="nav('analytics')">
                <div class="qa-icon-wrap" style="background: var(--cyan-light);">
                  <i class="fas fa-chart-bar" style="color: var(--cyan);"></i>
                </div>
                <div class="qa-lbl">View Analytics</div>
              </div>
            </div>`;

html = html.replace(/<div class="qa-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Middle Row end -->/, newQaGrid);
// simpler approach: replace qa-grid content
html = html.replace(/<div class="qa-grid">[\s\S]*?<\/div>\n            <\/div>\n          <\/div>\n          \n          <!-- Bottom Row -->/, newQaGrid + '\n            </div>\n          </div>\n          \n          <!-- Bottom Row -->');

// Update the sales overview card to have revenue summary 
const salesChartAreaOld = `<div style="height:240px; position:relative;">
              <div style="position:absolute; top:40px; left:40%; background:#fff; padding:8px 16px; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.05); font-size:12px; font-weight:800; color:var(--t-main); display:flex; flex-direction:column; align-items:center; z-index:10;">
                $4,752.18
                <span style="font-size:10px; color:var(--t-sub); font-weight:600; margin-top:2px;">May 20</span>
                <div style="width:10px; height:10px; background:var(--brand); border-radius:50%; border:2px solid #fff; position:absolute; bottom:-18px; box-shadow:0 0 0 2px var(--brand-light);"></div>
              </div>
              <canvas id="revenueChart"></canvas>
            </div>`;

const salesChartAreaNew = `<div style="margin-bottom:14px;">
              <div class="dash-total">$4,752.18</div>
              <div class="dash-trend"><i class="fas fa-arrow-up"></i> 23.6% from last month</div>
            </div>
            <div class="chart-area">
              <canvas id="revenueChart"></canvas>
            </div>`;

html = html.replace(salesChartAreaOld, salesChartAreaNew);

// Update stat cards to use colored backgrounds for icons more precisely matching reference
// The reference shows icons in pale colored rounded squares
// The current HTML already has st-icon bl/gr/or/rd, just need CSS to match

// Add page footer before </body>
const footerHTML = `
  <footer class="page-footer" id="pageFooter">
    <span>© 2024 Zooro Boost. All rights reserved.</span>
    <span class="pf-love">Made with <i class="fas fa-heart"></i> for a better experience.</span>
  </footer>`;

html = html.replace('</body>\n</html>', footerHTML + '\n</body>\n</html>');

// Update the Quick Access card wrapper to have proper bg
html = html.replace(
  '<div class="card" style="background: transparent; box-shadow: none; padding: 0;">',
  '<div class="card" style="background: var(--white);">'
);

// Update bot-row card wrappers too
html = html.replace(
  /<div class="card" style="background:transparent; box-shadow:none; padding:0;">/g,
  '<div class="card">'
);

fs.writeFileSync('admin.html', html);
console.log('CSS + UI updated to match reference image!');
