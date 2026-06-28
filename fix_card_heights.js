const fs = require('fs');
let html = fs.readFileSync('public/admin.html', 'utf8');

const start = html.indexOf('<!-- ═══ ADD ITEM ═══ -->');
const end = html.indexOf('<!-- ═══ ALL POSTS ═══ -->');

if (start === -1 || end === -1) {
  console.log('ERROR: Markers not found.');
  process.exit(1);
}

const before = html.substring(0, start);
const after = html.substring(end);

// We reconstruct the entire section cleanly
const newHTML = `<!-- ═══ ADD ITEM ═══ -->
    <section class="section" id="s-add-item">
      <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; align-items: stretch;">
        
        <!-- ================= LEFT CARD ================= -->
        <div class="form-box" style="padding: 32px 28px;">
          <h3 class="fb-title">Product Details</h3>
          <p style="font-size: 13px; color: var(--t-sub); margin-bottom: 24px; margin-top: -8px;">Provide general information about the product</p>
          
          <div class="fg" style="margin-bottom: 20px;">
            <label class="fl">PRODUCT TITLE</label>
            <input class="fi" type="text" placeholder="Enter a clear, descriptive title..." maxlength="160">
            <span style="font-size: 11px; color: var(--t-muted); margin-top: 4px;">Max 160 characters</span>
          </div>
          
          <div class="fg" style="margin-bottom: 24px;">
            <label class="fl">DESCRIPTION (OPTIONAL)</label>
            <textarea class="fi" style="min-height: 200px; resize: vertical;" placeholder="Describe what the buyer receives, delivery process, and any requirements..." maxlength="2000"></textarea>
            <span style="font-size: 11px; color: var(--t-muted); margin-top: 4px;">Max 2000 characters</span>
          </div>

          <div class="fb-grid g-2">
            <div class="fg"><label class="fl">DELIVERY METHOD</label><select class="fi"><option>Login Method</option><option>Gifting Method</option></select></div>
            <div class="fg"><label class="fl">DELIVERY TIME</label><select class="fi">
              <option>Instant</option><option>20 min</option><option>30 min</option><option>1 hour</option><option>2 hours</option>
              <option>3 hours</option><option>4 hours</option><option>5 hours</option><option>12 hours</option>
              <option>24 hours</option><option>7 days</option>
            </select></div>
          </div>
        </div>

        <!-- ================= RIGHT CARD ================= -->
        <div class="form-box" style="padding: 32px 28px;">
          <h3 class="fb-title">Pricing &amp; Media</h3>
          <p style="font-size: 13px; color: var(--t-sub); margin-bottom: 24px; margin-top: -8px;">Configure the price and images</p>
          
          <div class="fg" style="margin-bottom: 24px;">
            <label class="fl">PRODUCT MEDIA</label>
            <label class="f-up">
              <input type="file" accept="image/png, image/jpeg">
              <div class="f-up-icon"><i class="fas fa-cloud-arrow-up"></i></div>
              <div class="ut">Click to upload or drag and drop</div>
              <div class="us">PNG, JPEG, GIF &mdash; Max 5MB</div>
            </label>
          </div>

          <div class="fb-grid g-2" style="margin-bottom: 20px;">
            <div class="fg">
              <label class="fl">PRICE</label>
              <div class="fi-pre">
                <span class="pre">$</span>
                <input type="number" placeholder="0.00" step="0.01" min="0">
              </div>
            </div>
            <div class="fg">
              <label class="fl">SELECT CATEGORY</label>
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
                  <div class="cs-option" data-val="Discord Promo" data-img="https://iili.io/CAMxSvR.png">
                    <img src="https://iili.io/CAMxSvR.png" alt=""><span>Discord Promo</span>
                  </div>
                  <div class="cs-option" data-val="Discord Decoration" data-img="https://iili.io/CAMziNV.png">
                    <img src="https://iili.io/CAMziNV.png" alt=""><span>Discord Decoration</span>
                  </div>
                  <div class="cs-option" data-val="Server Members" data-img="https://iili.io/CAMIOdJ.png">
                    <img src="https://iili.io/CAMIOdJ.png" alt=""><span>Server Members</span>
                  </div>
                  <div class="cs-option" data-val="Nitro Boost" data-img="https://iili.io/CAMTNC7.png">
                    <img src="https://iili.io/CAMTNC7.png" alt=""><span>Nitro Boost</span>
                  </div>
                  <div class="cs-option" data-val="Nitro Basic" data-img="https://iili.io/CAMu8Pt.png">
                    <img src="https://iili.io/CAMu8Pt.png" alt=""><span>Nitro Basic</span>
                  </div>
                  <div class="cs-option" data-val="Nitro Account" data-img="https://iili.io/CAMAMzl.png">
                    <img src="https://iili.io/CAMAMzl.png" alt=""><span>Nitro Account</span>
                  </div>
                </div>
                <input type="hidden" name="category" id="category-input">
              </div>
            </div>
          </div>

          <div class="fb-grid g-2" style="margin-bottom: 20px;">
            <div class="fg"><label class="fl">DISCOUNT TYPE</label><select class="fi"><option>None</option><option>Percentage (%)</option><option>Fixed Amount ($)</option></select></div>
            <div class="fg"><label class="fl">DISCOUNT VALUE</label><input class="fi" type="number" placeholder="0" min="0"></div>
          </div>

        </div>

      </div>

      <!-- Actions aligned perfectly on the bottom right -->
      <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; padding-bottom: 40px;">
        <button class="btn bs" onclick="nav('all-items',null)">Cancel</button>
        <button class="btn bp" style="background: #8B5CF6; border-color: #8B5CF6; padding: 12px 24px; font-weight: 700;"><i class="fas fa-check"></i> Publish Item</button>
      </div>

    </section>

    `;

html = before + newHTML + after;
fs.writeFileSync('public/admin.html', html);
console.log('Fixed card heights successfully!');
