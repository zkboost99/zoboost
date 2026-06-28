const fs = require('fs');

// 1. UPDATE admin.html
let html = fs.readFileSync('public/admin.html', 'utf8');

// Add IDs for JS hooks
html = html.replace(
  '<input type="color" value="#6366F1" style="width:44px;height:36px;border:1px solid var(--b1);border-radius:8px;background:var(--bg);cursor:pointer;padding:2px">',
  '<input type="color" id="theme-color-picker" value="#6366F1" style="width:44px;height:36px;border:1px solid var(--b1);border-radius:8px;background:var(--bg);cursor:pointer;padding:2px">'
);

html = html.replace(
  '<button class="btn bp"><i class="fas fa-check"></i> Save Settings</button>',
  '<button class="btn bp" id="save-settings-btn"><i class="fas fa-check"></i> Save Settings</button>'
);

// Add JavaScript logic at the end
const jsLogic = `
  <script>
    // Theme Color Logic
    document.addEventListener('DOMContentLoaded', () => {
      const colorPicker = document.getElementById('theme-color-picker');
      const saveBtn = document.getElementById('save-settings-btn');
      
      // Load saved color
      const savedColor = localStorage.getItem('theme-brand-color');
      if (savedColor) {
        document.documentElement.style.setProperty('--brand', savedColor);
        if (colorPicker) colorPicker.value = savedColor;
      }
      
      // Save color
      if (saveBtn && colorPicker) {
        saveBtn.addEventListener('click', () => {
          const newColor = colorPicker.value;
          document.documentElement.style.setProperty('--brand', newColor);
          localStorage.setItem('theme-brand-color', newColor);
          
          // Optional: Add a brief visual feedback
          const originalText = saveBtn.innerHTML;
          saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
          setTimeout(() => {
            saveBtn.innerHTML = originalText;
          }, 2000);
        });
      }
    });
  </script>
</body>`;

if (html.includes('<!-- Theme Color Logic -->')) {
  // already added
} else {
  const parts = html.split('</body>');
  html = parts.slice(0, -1).join('</body>') + jsLogic + parts[parts.length - 1];
  fs.writeFileSync('public/admin.html', html);
  console.log('Updated admin.html with theme color JS');
}

// 2. UPDATE admin_stripe_style.css
let css = fs.readFileSync('public/admin_stripe_style.css', 'utf8');

// Update .srow padding
css = css.replace(
  '.srow {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 18px 24px;',
  '.srow {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 24px 32px;'
);
// Fallback for LF endings
css = css.replace(
  '.srow {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 18px 24px;',
  '.srow {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 24px 32px;'
);

// Update .save-bar padding
if (!css.includes('padding: 20px 32px 32px 32px;')) {
  css = css.replace(
    '.save-bar { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }',
    '.save-bar { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; padding: 20px 32px 32px 32px; }'
  );
  fs.writeFileSync('public/admin_stripe_style.css', css);
  console.log('Updated admin_stripe_style.css spacing');
}

