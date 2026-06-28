import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
  console.error("Cloudflare R2 credentials missing in .env.local");
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const categoryImages = [
  { name: 'Server Boost', url: 'https://iili.io/CAMxqXt.png', filename: 'server-boost.png' },
  { name: 'discord promo', url: 'https://iili.io/CAMxSvR.png', filename: 'discord-promo.png' },
  { name: 'Discord decoration', url: 'https://iili.io/CAMziNV.png', filename: 'discord-decoration.png' },
  { name: 'server members', url: 'https://iili.io/CAMIOdJ.png', filename: 'server-members.png' },
  { name: 'nitro boost', url: 'https://iili.io/CAMTNC7.png', filename: 'nitro-boost.png' },
  { name: 'nitro basic', url: 'https://iili.io/CAMu8Pt.png', filename: 'nitro-basic.png' },
  { name: 'Nitro account', url: 'https://iili.io/CAMAMzl.png', filename: 'nitro-account.png' }
];

const blogImagesDir = path.join(__dirname, 'public', 'assets', 'img', 'blog');
const publicUrl = "https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev";

async function uploadToR2(key, buffer, mimeType) {
  await s3.send(new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
  }));
  console.log(`✅ Uploaded to ${publicUrl}/${key}`);
}

async function processCategoryImages() {
  for (const img of categoryImages) {
    console.log(`Downloading ${img.url}...`);
    const response = await fetch(img.url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await uploadToR2(`category-icons/${img.filename}`, buffer, 'image/png');
  }
}

async function processBlogImages() {
  if (fs.existsSync(blogImagesDir)) {
    const files = fs.readdirSync(blogImagesDir);
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg')) {
        const filePath = path.join(blogImagesDir, file);
        const buffer = fs.readFileSync(filePath);
        const mimeType = file.endsWith('.png') ? 'image/png' : 'image/jpeg';
        await uploadToR2(`blog/${file}`, buffer, mimeType);
      }
    }
  }
}

async function run() {
  try {
    console.log("Starting image migration...");
    await processCategoryImages();
    await processBlogImages();
    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

run();
