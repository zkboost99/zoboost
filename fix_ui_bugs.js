const fs = require('fs');

// 1. UPDATE admin.html for card heights
let html = fs.readFileSync('public/admin.html', 'utf8');

// Remove align-items: start; from the main grid container to allow stretching
html = html.replace(
  '<div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; padding-bottom: 30px; align-items: start;">',
  '<div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; padding-bottom: 30px; align-items: stretch;">'
);

// Add flex: 1; to the right card form-box to stretch it
html = html.replace(
  '<div class="form-box" style="padding: 32px 28px;">\n            <h3 class="fb-title">Pricing &amp; Media</h3>',
  '<div class="form-box" style="padding: 32px 28px; flex: 1;">\n            <h3 class="fb-title">Pricing &amp; Media</h3>'
);

// Also let's make sure the left card has flex: 1 just in case, though it's already stretching
html = html.replace(
  '<div class="form-box" style="padding: 32px 28px;">\n          <h3 class="fb-title">Product Details</h3>',
  '<div class="form-box" style="padding: 32px 28px; flex: 1;">\n          <h3 class="fb-title">Product Details</h3>'
);

fs.writeFileSync('public/admin.html', html);
console.log('Fixed card heights in admin.html');


// 2. UPDATE admin_stripe_style.css for the select dropdown arrows
let css = fs.readFileSync('public/admin_stripe_style.css', 'utf8');

const selectCssFix = `
/* ─── CUSTOM ARROW FOR NATIVE SELECTS ─── */
select.fi {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238A94A6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 14px;
  padding-right: 40px;
}
`;

if (!css.includes('/* ─── CUSTOM ARROW FOR NATIVE SELECTS ─── */')) {
  fs.appendFileSync('public/admin_stripe_style.css', selectCssFix);
  console.log('Fixed select icons in admin_stripe_style.css');
}
