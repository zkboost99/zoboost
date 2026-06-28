const fs = require('fs');

const cssToAppend = `
/* Sub Navigation */
.sub-nav { display: none; flex-direction: column; gap: 4px; margin-left: 24px; margin-top: 4px; padding-left: 20px; border-left: 2px solid #F0F2F5; }
.sub-nav.open { display: flex; }
.sub-link { font-size: 13px; color: var(--t-sub); font-weight: 700; padding: 8px 12px; cursor: pointer; border-radius: 12px; transition: 0.2s; position: relative; }
.sub-link::before { content: ''; position: absolute; left: -25px; top: 50%; width: 6px; height: 6px; border-radius: 50%; background: var(--t-muted); transform: translateY(-50%); transition: 0.2s; }
.sub-link:hover, .sub-link.active { color: var(--t-main); }
.sub-link:hover::before, .sub-link.active::before { background: var(--brand); }
`;

fs.appendFileSync('new_admin_pixel_perfect.css', cssToAppend);

let html = fs.readFileSync('admin.html', 'utf8');
const finalCSS = fs.readFileSync('new_admin_pixel_perfect.css', 'utf8');
html = html.replace(/<style>[\s\S]*?<\/style>/, '<style>\n' + finalCSS + '\n</style>');
fs.writeFileSync('admin.html', html);
console.log('CSS fixed.');
