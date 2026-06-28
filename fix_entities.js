const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkSync(fullPath, filelist);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx')) {
      filelist.push(fullPath);
    }
  });
  return filelist;
}

const srcDir = path.join(__dirname, 'src');
const files = walkSync(srcDir);

let fixedCount = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace unescaped apostrophes and quotes inside JSX TEXT content
  // JSX text: text between > and < (but NOT inside attribute values which are already in quotes)
  // Strategy: Replace apostrophes in JSX text nodes only
  // A JSX text node is text between > and < characters
  content = content.replace(/>([^<]*)</g, (match, text) => {
    // Skip if it's empty or doesn't have apostrophes/quotes that need escaping
    // Only replace standalone ' and " that are in JSX text (not in JS expressions {})
    let newText = text;
    // Replace unescaped apostrophe in plain text (not inside {})
    newText = newText.replace(/(?<!\{[^}]*)(?<!\&\w+)'(?![^{]*\})/g, '&apos;');
    // Replace unescaped double quotes in plain text (not inside {})
    newText = newText.replace(/(?<!\{[^}]*)(?<!\&\w+)"(?![^{]*\})/g, '&quot;');
    if (newText !== text) {
      return `>${newText}<`;
    }
    return match;
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files.`);
