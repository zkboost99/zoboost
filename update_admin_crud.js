const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, 'public', 'admin.html');
let content = fs.readFileSync(adminPath, 'utf8');

// 1. Give IDs to the lists to populate them and clear their hardcoded contents
// All Items list
content = content.replace(
  /<div class="ig">[\s\S]*?(?=<\/section>\s*<!-- ═══ ALL ORDERS ═══ -->)/,
  '<div class="ig" id="all-items-list">\n      </div>\n    '
);

// All Posts list
content = content.replace(
  /<div class="plist">[\s\S]*?(?=<\/section>\s*<!-- ═══ ADD POST ═══ -->)/,
  '<div class="plist" id="all-posts-list">\n      </div>\n    '
);

// 2. Add hidden inputs for tracking Edit IDs
if (!content.includes('id="edit-item-id"')) {
  content = content.replace(
    'id="s-add-item">',
    'id="s-add-item">\n      <input type="hidden" id="edit-item-id" />'
  );
}

if (!content.includes('id="edit-post-id"')) {
  content = content.replace(
    'id="s-add-post">',
    'id="s-add-post">\n      <input type="hidden" id="edit-post-id" />'
  );
}

// 3. Update the Javascript block at the bottom
// Replace the entire previous script tag to be safe
const scriptStartStr = '// --- SUPABASE & R2 API INTEGRATION ---';
const scriptStartIdx = content.indexOf(scriptStartStr);

if (scriptStartIdx !== -1) {
  // Find the exact <script> tag opening that contains this
  const fullScriptTagStart = content.lastIndexOf('<script>', scriptStartIdx);
  const scriptEndIdx = content.indexOf('</script>', scriptStartIdx) + '</script>'.length;

  const newScript = `<script>
    // --- SUPABASE & R2 API INTEGRATION ---
    document.addEventListener('DOMContentLoaded', () => {

      // Generic fetch
      async function fetchData(url) {
        const res = await fetch(url);
        const data = await res.json();
        return data.success ? data : null;
      }

      // LOAD ITEMS
      async function loadItems() {
        const list = document.getElementById('all-items-list');
        if (!list) return;
        list.innerHTML = 'Loading...';
        const res = await fetchData('/api/admin/products');
        if (res && res.products) {
          list.innerHTML = res.products.map(p => \`
            <div class="icard">
              <div class="ithumb">
                \${p.media_url ? \`<img src="\${p.media_url}" style="width:100%;height:100%;object-fit:cover;border-radius:12px">\` : '📦'}
                <div class="ibadge-pos"><span class="badge ok">\${p.status || 'Active'}</span></div>
              </div>
              <div class="ibody">
                <div class="iname">\${p.title}</div>
                <div class="iprice">$\${p.price}</div>
                <div class="ifoot">
                  <div class="istock"><i class="fas fa-box"></i> \${p.category}</div>
                  <div class="iacts">
                    <button class="ibtn ed" onclick='editItem(\${JSON.stringify(p)})'><i class="fas fa-pen"></i></button>
                    <button class="ibtn dl" onclick='deleteItem("\${p.id}")'><i class="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </div>
          \`).join('');
        }
      }

      // LOAD POSTS
      async function loadPosts() {
        const list = document.getElementById('all-posts-list');
        if (!list) return;
        list.innerHTML = 'Loading...';
        const res = await fetchData('/api/admin/posts');
        if (res && res.posts) {
          list.innerHTML = res.posts.map(p => \`
            <div class="pcard">
              <div class="pimg">
                 \${p.media_url ? \`<img src="\${p.media_url}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">\` : '📝'}
              </div>
              <div class="pinf">
                <div class="ptit">\${p.title}</div>
                <div class="pmeta">
                  <span><i class="fas fa-calendar"></i> \${new Date(p.publish_date || p.created_at).toLocaleDateString()}</span>
                  <span><i class="fas fa-eye"></i> \${p.views || 0} views</span>
                  <span><i class="fas fa-comment"></i> \${p.comments || 0}</span>
                </div>
                <div class="pex">\${p.excerpt || ''}</div>
              </div>
              <div class="pacts">
                <span class="badge ok">\${p.status || 'Published'}</span>
                <button class="ibtn ed" onclick='editPost(\${JSON.stringify(p)})'><i class="fas fa-pen"></i></button>
                <button class="ibtn dl" onclick='deletePost("\${p.id}")'><i class="fas fa-trash"></i></button>
              </div>
            </div>
          \`).join('');
        }
      }

      // Edit & Delete Window Globals
      window.deleteItem = async (id) => {
        if(!confirm("Are you sure you want to delete this item?")) return;
        await fetch('/api/admin/products?id=' + id, { method: 'DELETE' });
        loadItems();
      };
      
      window.editItem = (item) => {
        // Switch to add-item section
        nav('add-item', null);
        document.getElementById('edit-item-id').value = item.id;
        
        const section = document.getElementById('s-add-item');
        const inputs = section.querySelectorAll('.fi');
        
        inputs[0].value = item.title;
        inputs[1].value = item.description;
        document.getElementById('product-long-description').value = item.long_description || '';
        document.getElementById('product-badge-text').value = item.badge_text || '';
        inputs[2].value = item.delivery_method;
        inputs[3].value = item.delivery_time;
        section.querySelector('input[type="number"]').value = item.price;
        document.getElementById('category-input').value = item.category;
        document.getElementById('cs-selected-content').innerHTML = \`<span>\${item.category}</span>\`;
        inputs[4].value = item.discount_type;
        inputs[5].value = item.discount_value;
        if(item.media_url) {
           document.getElementById('product-media-url').value = item.media_url;
           document.getElementById('upload-status-text').innerText = "Image selected/loaded";
        }

        const btn = document.querySelector('#s-add-item .btn.bp');
        btn.innerHTML = '<i class="fas fa-check"></i> Update Item';
      };

      window.deletePost = async (id) => {
        if(!confirm("Are you sure you want to delete this post?")) return;
        await fetch('/api/admin/posts?id=' + id, { method: 'DELETE' });
        loadPosts();
      };
      
      window.editPost = (post) => {
        nav('add-post', null);
        document.getElementById('edit-post-id').value = post.id;
        
        const section = document.getElementById('s-add-post');
        const inputs = section.querySelectorAll('.fi');
        
        inputs[0].value = post.title;
        inputs[1].value = post.category;
        inputs[2].value = post.author;
        inputs[3].value = post.status;
        if (post.publish_date) inputs[4].value = post.publish_date.split('T')[0];
        inputs[5].value = post.excerpt;
        inputs[6].value = post.content;

        window._currentPostMediaUrl = post.media_url;
        
        const btn = document.querySelector('#s-add-post .btn.bp');
        btn.innerHTML = '<i class="fas fa-check"></i> Update Post';
      };

      // Load initial
      loadItems();
      loadPosts();

      // ==========================================
      // ADD/UPDATE ITEM (PRODUCTS)
      // ==========================================
      const addItemBtn = document.querySelector('#s-add-item .btn.bp');
      if (addItemBtn) {
        addItemBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          
          const section = document.getElementById('s-add-item');
          const inputs = section.querySelectorAll('.fi');
          
          const title = inputs[0].value;
          const description = inputs[1].value;
          const long_description = document.getElementById('product-long-description').value;
          const badge_text = document.getElementById('product-badge-text').value;
          const delivery_method = inputs[2].value;
          const delivery_time = inputs[3].value;
          const price = section.querySelector('input[type="number"]').value;
          const category = document.getElementById('category-input').value;
          const discount_type = inputs[4].value;
          const discount_value = inputs[5].value;
          const media_url = document.getElementById('product-media-url') ? document.getElementById('product-media-url').value : null;

          if (!title || !price) {
            alert("Title and Price are required!");
            return;
          }
          if (!category) {
            alert("Category is strictly required!");
            return;
          }

          const id = document.getElementById('edit-item-id').value;
          const method = id ? 'PUT' : 'POST';
          const payload = { title, description, long_description, badge_text, delivery_method, delivery_time, price, category, discount_type, discount_value, media_url };
          if (id) payload.id = id;

          const originalText = addItemBtn.innerHTML;
          addItemBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

          try {
            const res = await fetch('/api/admin/products', {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
              addItemBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
              setTimeout(() => {
                document.getElementById('edit-item-id').value = '';
                addItemBtn.innerHTML = '<i class="fas fa-check"></i> Publish Item';
                window.location.reload();
              }, 1500);
            } else {
              throw new Error(data.error);
            }
          } catch(err) {
            alert("Failed to save: " + err.message);
            addItemBtn.innerHTML = originalText;
          }
        });
      }

      // ==========================================
      // ADD/UPDATE POST (BLOGS)
      // ==========================================
      const addPostBtn = document.querySelector('#s-add-post .btn.bp');
      if (addPostBtn) {
        const postFileInput = document.querySelector('#s-add-post input[type="file"]');
        
        if (postFileInput) {
          postFileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const ut = document.querySelector('#s-add-post .ut');
            if (ut) ut.innerText = "Uploading to R2...";
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if(data.success) {
              window._currentPostMediaUrl = data.url;
              if(ut) ut.innerText = "Upload Complete!";
            } else {
              if(ut) ut.innerText = "Upload Failed";
            }
          });
        }

        addPostBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          
          const section = document.getElementById('s-add-post');
          const inputs = section.querySelectorAll('.fi');
          
          const title = inputs[0].value;
          const category = inputs[1].value;
          const author = inputs[2].value;
          const status = inputs[3].value;
          const publish_date = inputs[4].value;
          const excerpt = inputs[5].value;
          const content = inputs[6].value;

          if (!title) {
            alert("Post title is required!");
            return;
          }

          const id = document.getElementById('edit-post-id').value;
          const method = id ? 'PUT' : 'POST';
          const payload = { title, category, author, status, publish_date, excerpt, content, media_url: window._currentPostMediaUrl };
          if (id) payload.id = id;

          const originalText = addPostBtn.innerHTML;
          addPostBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

          try {
            const res = await fetch('/api/admin/posts', {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
              addPostBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
              setTimeout(() => {
                document.getElementById('edit-post-id').value = '';
                addPostBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Publish Post';
                window.location.reload();
              }, 1500);
            } else {
              throw new Error(data.error);
            }
          } catch(err) {
            alert("Failed to save: " + err.message);
            addPostBtn.innerHTML = originalText;
          }
        });
      }
    });
  </script>`;
  
  content = content.substring(0, fullScriptTagStart) + newScript + content.substring(scriptEndIdx);
}

fs.writeFileSync(adminPath, content);
console.log('Successfully updated admin.html with CRUD scripts');
