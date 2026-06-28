const fs = require('fs');
let html = fs.readFileSync('admin.html', 'utf8');

// Find the start of the script block containing TITLES
const titlesStart = html.indexOf('const TITLES = {');
const initBarStart = html.indexOf('function initBar() {');

if (titlesStart === -1 || initBarStart === -1) {
  console.log('Cannot find markers');
  console.log('titlesStart:', titlesStart);
  console.log('initBarStart:', initBarStart);
  process.exit(1);
}

const beforeTitles = html.substring(0, titlesStart);
const afterInitBar = html.substring(initBarStart);

const newSection = `const TITLES = {
  dashboard:      'Dashboard',
  'all-items':    'Items<span class="sep">/</span><span class="sub">All Items</span>',
  'add-item':     'Items<span class="sep">/</span><span class="sub">Add Item</span>',
  'all-posts':    'Posts<span class="sep">/</span><span class="sub">All Posts</span>',
  'add-post':     'Posts<span class="sep">/</span><span class="sub">Add Post</span>',
  'purchased-orders':  'Orders<span class="sep">/</span><span class="sub">Purchased Orders</span>',
  'all-orders':        'Orders<span class="sep">/</span><span class="sub">All Orders</span>',
  'completed-orders':  'Orders<span class="sep">/</span><span class="sub"><span style="color:var(--green)">Completed</span> Orders</span>',
  'pending-orders':    'Orders<span class="sep">/</span><span class="sub"><span style="color:var(--orange)">Pending</span> Orders</span>',
  'failed-orders':     'Orders<span class="sep">/</span><span class="sub"><span style="color:var(--red)">Failed</span> Orders</span>',
  contact:        'Contact',
  notifications:  'Notifications',
  reports:        'Reports',
  suggestions:    'Suggestions',
  settings:       'Settings',
};

function nav(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const sec = document.getElementById('s-' + id);
  if (sec) sec.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.sub-link').forEach(l => l.classList.remove('active'));

  if (el) {
    el.classList.add('active');
    const sub = el.closest('.sub-nav');
    if (sub) { const p = sub.previousElementSibling; if (p) p.classList.add('active'); }
  }

  document.getElementById('pgTitle').innerHTML = TITLES[id] || id;
  if (id === 'dashboard')         setTimeout(initCharts, 60);
  if (id === 'reports')           setTimeout(initBar, 60);
  if (id === 'all-orders')        setTimeout(initAllOrders, 30);
  if (id === 'completed-orders')  setTimeout(() => renderStatusOrders('Completed', 'tbody-completed'), 30);
  if (id === 'pending-orders')    setTimeout(() => renderStatusOrders('Pending',   'tbody-pending'),   30);
  if (id === 'failed-orders')     setTimeout(() => renderStatusOrders('Failed',    'tbody-failed'),    30);
}

function openSub(id, el) {
  const sub = document.getElementById(id);
  const wasOpen = sub.classList.contains('open');
  document.querySelectorAll('.sub-nav').forEach(s => s.classList.remove('open'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('open'));
  if (!wasOpen) { sub.classList.add('open'); el.classList.add('open'); }
}

function toggleSB() { document.getElementById('sb').classList.toggle('col'); }

function stab(id, el) {
  document.querySelectorAll('.ssec').forEach(s => s.classList.remove('on'));
  document.querySelectorAll('.stab').forEach(t => t.classList.remove('on'));
  const s = document.getElementById('ss-' + id); if (s) s.classList.add('on');
  el.classList.add('on');
}

/* -- Charts -- */
let rC, dC, bC;
const gc = 'rgba(0,0,0,0.04)';
const tc = '#94A3B8';
const tip = {
  backgroundColor: '#fff',
  borderColor: '#E2E8F0', borderWidth: 1,
  titleColor: '#1B1F3B', bodyColor: '#6B7A99',
  padding: 10, cornerRadius: 8,
};

function initCharts() {
  if (rC) return;
  const rc = document.getElementById('revenueChart').getContext('2d');
  const rg = rc.createLinearGradient(0, 0, 0, 200);
  rg.addColorStop(0, 'rgba(91,141,239,0.18)');
  rg.addColorStop(1, 'rgba(91,141,239,0)');
  rC = new Chart(rc, {
    type: 'line',
    data: {
      labels: ['1 May','5 May','10 May','15 May','20 May','25 May','31 May'],
      datasets: [{
        label: 'Revenue',
        data: [15000, 19000, 22000, 20000, 32000, 28000, 47520],
        borderColor: '#5B8DEF', backgroundColor: rg,
        borderWidth: 2.5, tension: .42, fill: true,
        pointBackgroundColor: '#5B8DEF', pointBorderColor: '#fff',
        pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { ...tip, callbacks: { label: c => ' $' + c.parsed.y.toLocaleString() } } },
      scales: {
        x: { grid: { color: gc }, ticks: { color: tc, font: { family: 'Plus Jakarta Sans', size: 11 } } },
        y: { grid: { color: gc }, ticks: { color: tc, font: { family: 'Plus Jakarta Sans', size: 11 }, callback: v => '$' + (v/1000).toFixed(0) + 'k' } },
      }
    }
  });

  const dc = document.getElementById('donutChart').getContext('2d');
  const ctp = {
    id: 'ctp',
    afterDraw(chart) {
      const { ctx, chartArea: { top, left, width, height } } = chart;
      ctx.save();
      const cx = left + width / 2, cy = top + height / 2;
      ctx.font = 'bold 22px Plus Jakarta Sans'; ctx.fillStyle = '#1B1F3B';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('12', cx, cy - 8);
      ctx.font = '500 10px Plus Jakarta Sans'; ctx.fillStyle = '#6B7A99';
      ctx.fillText('Total Orders', cx, cy + 10);
      ctx.restore();
    }
  };
  Chart.register(ctp);
  dC = new Chart(dc, {
    type: 'doughnut',
    data: {
      labels: ['Completed','Pending','Failed'],
      datasets: [{ data: [8, 3, 1], backgroundColor: ['#5B8DEF','#F59E0B','#EF4444'], borderWidth: 3, borderColor: '#fff', hoverOffset: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '72%',
      plugins: { legend: { display: false }, tooltip: { ...tip, callbacks: { label: c => \` \${c.label}: \${c.parsed} orders\` } } }
    }
  });
}

`;

html = beforeTitles + newSection + afterInitBar;
fs.writeFileSync('admin.html', html);
console.log('Fixed! Titles at:', titlesStart, 'initBar at:', initBarStart);
