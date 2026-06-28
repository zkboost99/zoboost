const fs = require('fs');
const path = require('path');

async function testUpload() {
  try {
    // Ensure we have a dummy file to upload
    const dummyPath = path.join(__dirname, 'dummy_test_image.png');
    if (!fs.existsSync(dummyPath)) {
      // Create a 1x1 transparent PNG
      const pngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
      fs.writeFileSync(dummyPath, pngBuffer);
    }

    const fileBuffer = fs.readFileSync(dummyPath);
    const blob = new Blob([fileBuffer], { type: 'image/png' });

    const formData = new FormData();
    formData.append('file', blob, 'dummy_test_image.png');

    console.log('Sending file to http://localhost:3000/api/upload...');
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData
    });

    const text = await response.text();
    console.log('Response Status:', response.status);
    console.log('Response Body:', text);
    
    if (response.ok) {
        const json = JSON.parse(text);
        if (json.url && json.url.includes('r2.cloudflarestorage.com')) {
             console.log('✅ INTEGRATION SUCCESSFUL! Public URL:', json.url);
        } else {
             console.log('❌ UNEXPECTED JSON FORMAT');
        }
    }
  } catch (error) {
    console.error('Error during test:', error);
  }
}

testUpload();
