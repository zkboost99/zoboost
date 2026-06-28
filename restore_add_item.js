const fs = require('fs');
let html = fs.readFileSync('public/admin.html', 'utf8');

const start = html.indexOf("<!-- ═══ ADD ITEM ═══ -->");
const end = html.indexOf("<!-- ═══ ALL POSTS ═══ -->");

if (start === -1 || end === -1) {
  console.log('ERROR: Markers not found.');
  process.exit(1);
}

const before = html.substring(0, start);
const after = html.substring(end);

const newHTML = `<!-- ═══ ADD ITEM ═══ -->
    <section class="section" id="s-add-item">
      <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; padding-bottom: 30px; align-items: start;">
        
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
            <label class="fl">DESCRIPTION (optional)</label>
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
        <div style="display: flex; flex-direction: column; gap: 24px;">
          
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
                <select class="fi">
                  <option>Select a category...</option>
                  <option>Discord Server Boosts</option>
                  <option>Discord Aged Accounts</option>
                  <option>Discord Nitro</option>
                  <option>Other Services</option>
                </select>
              </div>
            </div>

            <div class="fb-grid g-2" style="margin-bottom: 20px;">
              <div class="fg"><label class="fl">DISCOUNT TYPE</label><select class="fi"><option>None</option><option>Percentage (%)</option><option>Fixed Amount ($)</option></select></div>
              <div class="fg"><label class="fl">DISCOUNT VALUE</label><input class="fi" type="number" placeholder="0" min="0"></div>
            </div>

          </div>

          <!-- Actions aligned under the right card -->
          <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button class="btn bs" onclick="nav('all-items',null)">Cancel</button>
            <button class="btn bp" style="background: #8B5CF6; border-color: #8B5CF6; padding: 12px 24px; font-weight: 700;"><i class="fas fa-check"></i> Publish Item</button>
          </div>

        </div>

      </div>
    </section>

    `;

html = before + newHTML + after;
fs.writeFileSync('public/admin.html', html);
console.log('SUCCESS: Add Item layout split into exactly 2 cards');
