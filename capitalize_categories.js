const fs = require('fs');

let html = fs.readFileSync('public/admin.html', 'utf8');

const replacements = {
  'discord promo': 'Discord Promo',
  'Discord decoration': 'Discord Decoration',
  'server members': 'Server Members',
  'nitro boost': 'Nitro Boost',
  'nitro basic': 'Nitro Basic',
  'Nitro account': 'Nitro Account'
};

for (const [oldVal, newVal] of Object.entries(replacements)) {
  // Replace in data-val attribute
  html = html.replace(`data-val="${oldVal}"`, `data-val="${newVal}"`);
  // Replace in span tag
  html = html.replace(`<span>${oldVal}</span>`, `<span>${newVal}</span>`);
}

fs.writeFileSync('public/admin.html', html);
console.log('Capitalized category names in admin.html');
