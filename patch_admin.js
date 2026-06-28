const fs = require('fs');
let html = fs.readFileSync('public/admin.html', 'utf8');

// 1. Add ID to the file input and a hidden input for the URL
html = html.replace(
  '<input type="file" accept="image/png, image/jpeg">',
  '<input type="file" id="product-media-upload" accept="image/png, image/jpeg">\n              <input type="hidden" id="product-media-url" name="product_media_url">'
);

// 2. Add ID to the label elements to update UI during upload
html = html.replace(
  '<div class="ut">Click to upload or drag and drop</div>',
  '<div class="ut" id="upload-status-text">Click to upload or drag and drop</div>'
);

// 3. Inject JS at the bottom
const jsLogic = `
  <script>
    // --- CLOUDFLARE R2 UPLOAD INTEGRATION ---
    document.addEventListener('DOMContentLoaded', () => {
      const fileInput = document.getElementById('product-media-upload');
      const statusText = document.getElementById('upload-status-text');
      const urlHiddenInput = document.getElementById('product-media-url');
      const iconContainer = document.querySelector('.f-up-icon');

      if (fileInput) {
        fileInput.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          // Update UI to show uploading state
          if (statusText) statusText.innerText = 'Uploading... Please wait.';
          if (iconContainer) iconContainer.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

          const formData = new FormData();
          formData.append('file', file);

          try {
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });

            const result = await response.json();

            if (response.ok && result.success) {
              if (urlHiddenInput) urlHiddenInput.value = result.url;
              if (statusText) {
                statusText.innerText = 'Upload successful!';
                statusText.style.color = '#10B981'; // Green
              }
              if (iconContainer) {
                iconContainer.innerHTML = '<i class="fas fa-check" style="color: #10B981;"></i>';
              }
              // Show a small preview if it's an image
              const previewArea = document.querySelector('.f-up');
              if (previewArea) {
                 previewArea.style.backgroundImage = \`url('\${result.url}')\`;
                 previewArea.style.backgroundSize = 'cover';
                 previewArea.style.backgroundPosition = 'center';
              }
            } else {
              throw new Error(result.error || 'Upload failed');
            }
          } catch (err) {
            console.error(err);
            if (statusText) {
              statusText.innerText = 'Upload failed. Please try again.';
              statusText.style.color = '#EF4444'; // Red
            }
            if (iconContainer) {
              iconContainer.innerHTML = '<i class="fas fa-xmark" style="color: #EF4444;"></i>';
            }
          }
        });
      }
    });
  </script>
</body>`;

if (!html.includes('CLOUDFLARE R2 UPLOAD INTEGRATION')) {
  const parts = html.split('</body>');
  html = parts.slice(0, -1).join('</body>') + jsLogic + parts[parts.length - 1];
  fs.writeFileSync('public/admin.html', html);
  console.log('Successfully wired admin.html for R2 uploads!');
} else {
  console.log('Already wired.');
}
