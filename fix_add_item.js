const fs = require('fs');
let html = fs.readFileSync('public/admin.html', 'utf8');

// Find the add-item section and replace it entirely
const start = html.indexOf("<!-- ═══ ADD ITEM ═══ -->");
const end = html.indexOf("<!-- ═══ ALL POSTS ═══ -->");

if (start === -1 || end === -1) {
  console.log('ERROR: Markers not found. start=' + start + ' end=' + end);
  process.exit(1);
}

const before = html.substring(0, start);
const after = html.substring(end);

const newSection = `<!-- ═══ ADD ITEM ═══ -->
    <section class="section" id="s-add-item">
      <div class="ai-layout">

        <!-- LEFT: FORM COLUMN -->
        <div class="ai-form-col">

          <!-- Basic Information -->
          <div class="ai-card">
            <div class="ai-card-head">
              <div class="ai-card-icon" style="background:rgba(99,102,241,0.15);color:var(--brand);"><i class="fas fa-tag"></i></div>
              <div><div class="ai-card-title">Basic Information</div><div class="ai-card-sub">Name and describe your product</div></div>
            </div>
            <div class="ai-fields">
              <div class="fg">
                <label class="fl">Product Title</label>
                <input class="fi" type="text" placeholder="Enter a clear, descriptive title…" maxlength="160">
                <span class="fi-hint">Max 160 characters</span>
              </div>
              <div class="fg">
                <label class="fl">Description <span style="opacity:0.6;font-weight:500;text-transform:none;letter-spacing:0;">(optional)</span></label>
                <textarea class="fi" style="min-height:120px;resize:vertical;line-height:1.6;" placeholder="Describe what the buyer receives, delivery process, and any requirements…" maxlength="2000"></textarea>
                <span class="fi-hint">Max 2000 characters</span>
              </div>
            </div>
          </div>

          <!-- Media -->
          <div class="ai-card">
            <div class="ai-card-head">
              <div class="ai-card-icon" style="background:rgba(16,185,129,0.12);color:var(--green);"><i class="fas fa-image"></i></div>
              <div><div class="ai-card-title">Product Media</div><div class="ai-card-sub">Add a thumbnail image for your listing</div></div>
            </div>
            <label class="ai-upload" id="aiUploadArea">
              <input type="file" accept="image/png,image/jpeg,image/gif" id="aiFileInput" onchange="previewAiImg(this)">
              <div class="ai-upload-inner">
                <div class="ai-upload-icon"><i class="fas fa-cloud-arrow-up"></i></div>
                <div class="ai-upload-title">Click to upload or drag and drop</div>
                <div class="ai-upload-sub">PNG, JPEG, GIF — Max 5MB</div>
              </div>
            </label>
          </div>

          <!-- Pricing & Inventory -->
          <div class="ai-card">
            <div class="ai-card-head">
              <div class="ai-card-icon" style="background:rgba(245,158,11,0.12);color:var(--orange);"><i class="fas fa-dollar-sign"></i></div>
              <div><div class="ai-card-title">Pricing &amp; Inventory</div><div class="ai-card-sub">Set your price, discounts and stock</div></div>
            </div>
            <div class="ai-fields">
              <div class="ai-row-3">
                <div class="fg"><label class="fl">Price</label><div class="fi-pre"><span class="pre">$</span><input type="number" placeholder="0.00" step="0.01" min="0"></div></div>
                <div class="fg"><label class="fl">Discount Type</label><select class="fi"><option>None</option><option>Percentage (%)</option><option>Fixed Amount ($)</option></select></div>
                <div class="fg"><label class="fl">Discount Value</label><input class="fi" type="number" placeholder="0" min="0"></div>
              </div>
              <div class="fg">
                <label class="fl">Stock Quantity</label>
                <input class="fi" type="number" placeholder="e.g. 100 — leave empty for unlimited" min="1">
              </div>
            </div>
          </div>

          <!-- Delivery -->
          <div class="ai-card">
            <div class="ai-card-head">
              <div class="ai-card-icon" style="background:rgba(6,182,212,0.12);color:var(--cyan);"><i class="fas fa-shipping-fast"></i></div>
              <div><div class="ai-card-title">Delivery Details</div><div class="ai-card-sub">How and when will this be delivered?</div></div>
            </div>
            <div class="ai-fields">
              <div class="ai-row-2">
                <div class="fg"><label class="fl">Delivery Method</label><select class="fi"><option>Login Method</option><option>Gifting Method</option></select></div>
                <div class="fg"><label class="fl">Delivery Time</label><select class="fi"><option>Instant</option><option>20 min</option><option>30 min</option><option>1 hour</option><option>2 hours</option><option>3 hours</option><option>4 hours</option><option>5 hours</option><option>12 hours</option><option>24 hours</option><option>7 days</option></select></div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="ai-actions">
            <button class="btn bs" onclick="nav('all-items',null)"><i class="fas fa-arrow-left"></i> Back</button>
            <button class="btn bp ai-publish-btn"><i class="fas fa-rocket"></i> Publish Item</button>
          </div>

        </div>

        <!-- RIGHT: PREVIEW PANEL -->
        <div class="ai-preview-col">
          <div class="ai-preview-card">
            <div class="ai-preview-label">Live Preview</div>
            <div class="ai-preview-thumb" id="aiThumb"><i class="fas fa-image" style="font-size:32px;color:var(--t-muted);"></i></div>
            <div class="ai-preview-info">
              <div class="ai-preview-name" id="aiPreviewName">Product name will appear here</div>
              <div class="ai-preview-price" id="aiPreviewPrice">$0.00</div>
              <div class="ai-preview-badges"><span class="badge ok" style="font-size:10px;">Active</span><span style="font-size:10px;color:var(--t-muted);font-weight:600;">Instant Delivery</span></div>
            </div>
            <div class="ai-preview-divider"></div>
            <div class="ai-preview-meta">
              <div class="ai-preview-row"><span>Status</span><span class="badge ok" style="font-size:10px;">Active</span></div>
              <div class="ai-preview-row"><span>Stock</span><span id="aiPreviewStock">Unlimited</span></div>
              <div class="ai-preview-row"><span>Discount</span><span id="aiPreviewDiscount">None</span></div>
            </div>
          </div>
          <div class="ai-tips">
            <div class="ai-tip"><i class="fas fa-lightbulb"></i> Use a clear 1:1 thumbnail image for best display.</div>
            <div class="ai-tip"><i class="fas fa-check-circle"></i> Keep titles under 60 characters for better readability.</div>
            <div class="ai-tip"><i class="fas fa-star"></i> Adding a description increases buyer confidence.</div>
          </div>
        </div>

      </div>
    </section>

    `;

html = before + newSection + after;
fs.writeFileSync('public/admin.html', html);
console.log('SUCCESS: Add Item section fully replaced');
