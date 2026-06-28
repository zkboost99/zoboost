const fs = require('fs');

let html = fs.readFileSync('public/admin.html', 'utf8');

const regex = /<label class="fl">SELECT CATEGORY<\/label>\s*<select class="fi">[\s\S]*?<\/select>/g;

const replacementHTML = `<label class="fl">SELECT CATEGORY</label>
                <div class="custom-select" id="cat-select" tabindex="0">
                  <div class="cs-header">
                    <div class="cs-selected" id="cs-selected-content">
                      <span style="color: var(--t-muted); font-weight: 400;">Select a category...</span>
                    </div>
                    <i class="fas fa-chevron-down" style="color: var(--t-muted); font-size: 12px;"></i>
                  </div>
                  <div class="cs-options">
                    <div class="cs-option" data-val="Server Boost" data-img="https://iili.io/CAMxqXt.png">
                      <img src="https://iili.io/CAMxqXt.png" alt=""><span>Server Boost</span>
                    </div>
                    <div class="cs-option" data-val="discord promo" data-img="https://iili.io/CAMxSvR.png">
                      <img src="https://iili.io/CAMxSvR.png" alt=""><span>discord promo</span>
                    </div>
                    <div class="cs-option" data-val="Discord decoration" data-img="https://iili.io/CAMziNV.png">
                      <img src="https://iili.io/CAMziNV.png" alt=""><span>Discord decoration</span>
                    </div>
                    <div class="cs-option" data-val="server members" data-img="https://iili.io/CAMIOdJ.png">
                      <img src="https://iili.io/CAMIOdJ.png" alt=""><span>server members</span>
                    </div>
                    <div class="cs-option" data-val="nitro boost" data-img="https://iili.io/CAMTNC7.png">
                      <img src="https://iili.io/CAMTNC7.png" alt=""><span>nitro boost</span>
                    </div>
                    <div class="cs-option" data-val="nitro basic" data-img="https://iili.io/CAMu8Pt.png">
                      <img src="https://iili.io/CAMu8Pt.png" alt=""><span>nitro basic</span>
                    </div>
                    <div class="cs-option" data-val="Nitro account" data-img="https://iili.io/CAMAMzl.png">
                      <img src="https://iili.io/CAMAMzl.png" alt=""><span>Nitro account</span>
                    </div>
                  </div>
                  <input type="hidden" name="category" id="category-input">
                </div>`;

if (!regex.test(html)) {
  console.log('Target HTML not found!');
  process.exit(1);
}

html = html.replace(regex, replacementHTML);

const jsLogic = `
  <script>
    // Custom Category Select Logic
    document.addEventListener('DOMContentLoaded', () => {
      const selectObj = document.getElementById('cat-select');
      if(selectObj) {
        const header = selectObj.querySelector('.cs-header');
        const optionsContainer = selectObj.querySelector('.cs-options');
        const selectedContent = document.getElementById('cs-selected-content');
        const hiddenInput = document.getElementById('category-input');
        const options = selectObj.querySelectorAll('.cs-option');

        header.addEventListener('click', () => {
          selectObj.classList.toggle('open');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
          if (!selectObj.contains(e.target)) {
            selectObj.classList.remove('open');
          }
        });

        options.forEach(option => {
          option.addEventListener('click', () => {
            const val = option.getAttribute('data-val');
            const img = option.getAttribute('data-img');
            
            // Update hidden input
            hiddenInput.value = val;
            
            // Update selected view
            selectedContent.innerHTML = '<img src="' + img + '" alt="" style="width:20px;height:20px;border-radius:4px;object-fit:cover;"><span>' + val + '</span>';
            selectedContent.style.color = 'var(--t-main)';
            selectedContent.style.fontWeight = '600';
            
            // Close dropdown
            selectObj.classList.remove('open');
          });
        });
      }
    });
  </script>
</body>`;

if (html.includes('</body>')) {
  // Replace the last occurrence of </body>
  const parts = html.split('</body>');
  html = parts.slice(0, -1).join('</body>') + jsLogic + parts[parts.length - 1];
} else {
  html += jsLogic;
}

fs.writeFileSync('public/admin.html', html);
console.log('Updated admin.html successfully');

let css = fs.readFileSync('public/admin_stripe_style.css', 'utf8');
const customCSS = `
/* ─── CUSTOM SELECT WITH IMAGES ─── */
.custom-select {
  position: relative;
  width: 100%;
  user-select: none;
  outline: none;
}
.cs-header {
  width: 100%;
  min-height: 44px;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: #161C2C;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--t-main);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.custom-select:focus .cs-header, .custom-select.open .cs-header {
  border-color: var(--brand);
  background: #1C2438;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
}
.cs-selected {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cs-options {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: #1C2438;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  z-index: 100;
  display: none;
  max-height: 260px;
  overflow-y: auto;
}
.custom-select.open .cs-options {
  display: block;
}
.cs-option {
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--t-main);
  transition: background 0.15s;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.cs-option:last-child {
  border-bottom: none;
}
.cs-option:hover {
  background: rgba(255,255,255,0.08);
}
.cs-option img {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  object-fit: cover;
}
.cs-options::-webkit-scrollbar {
  width: 6px;
}
.cs-options::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
}
.cs-options::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
}
.cs-options::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.2);
}
`;

if (!css.includes('.custom-select {')) {
  fs.appendFileSync('public/admin_stripe_style.css', customCSS);
  console.log('Updated admin_stripe_style.css successfully');
}
