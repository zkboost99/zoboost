const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkSync(fullPath, filelist);
    } else if (file === 'page.tsx') {
      filelist.push(fullPath);
    }
  });
  return filelist;
}

const appDir = path.join(__dirname, 'src', 'app');
const pages = walkSync(appDir);

let fixedCount = 0;

pages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Find all <a href="..."> ... </a> pairs with INTERNAL href 
  const fullAnchorRegex = /(<a(?:\s[^>]*)?\shref="(\/(?:[^"]*)?)"(?:[^>]*)>)([\s\S]*?)(<\/a>)/g;
  
  let hasInternalLinks = false;
  const newContent = content.replace(fullAnchorRegex, (match, openTag, href, innerContent, closeTag) => {
    if (href.startsWith('#') || href.startsWith('http')) {
      return match;
    }
    hasInternalLinks = true;
    const newOpenTag = openTag.replace(/^<a/, '<Link');
    return `${newOpenTag}${innerContent}</Link>`;
  });

  if (!hasInternalLinks || newContent === content) {
    return;
  }

  let finalContent = newContent;

  // Add Link import intelligently — must come AFTER 'use client' if present
  const hasLinkImport = finalContent.includes("import Link from 'next/link'") || finalContent.includes('import Link from "next/link"');
  
  if (!hasLinkImport) {
    const useClientMatch = finalContent.match(/^(['"]use client['"];?\s*\n)/);
    if (useClientMatch) {
      // Insert Link import AFTER 'use client'
      const afterDirective = useClientMatch[0];
      finalContent = afterDirective + `import Link from 'next/link';\n` + finalContent.slice(afterDirective.length);
    } else {
      // No 'use client', insert at top
      finalContent = `import Link from 'next/link';\n` + finalContent;
    }
  }
  
  if (finalContent !== original) {
    fs.writeFileSync(filePath, finalContent);
    console.log(`Fixed: ${filePath}`);
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files.`);
