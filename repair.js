const fs = require('fs');
let lines = fs.readFileSync('public/admin.html', 'utf8').split('\n');

const amountBrokenIdx = lines.findIndex(l => l.includes('oc-detail-amount') && l.includes("innerText = '"));
const amountRestIdx = lines.findIndex(l => l.includes('</html> + order.amount;'));

console.log('amountBrokenIdx:', amountBrokenIdx);
console.log('amountRestIdx:', amountRestIdx);

let partA = lines.slice(0, amountBrokenIdx);
let brokenLine = lines[amountBrokenIdx];
let partC = lines.slice(amountBrokenIdx + 1, amountRestIdx);
let restLine = lines[amountRestIdx];
let partD = lines.slice(amountRestIdx + 1);

let fixedRestLine = restLine.replace('</html>', "$'");

let newLines = [
  ...partA,
  brokenLine + fixedRestLine.trimStart(),
  ...partD,
  ...partC,
  '</html>'
];

// Now check if duplicate DISCORD CHAT LOGIC exists in newLines
const discordChatLogicIdx = newLines.findIndex(l => l.includes('DISCORD CHAT LOGIC'));
const secondDiscordChatLogicIdx = newLines.findIndex((l, i) => i > discordChatLogicIdx && l.includes('DISCORD CHAT LOGIC'));

console.log('first discord chat:', discordChatLogicIdx);
console.log('second discord chat:', secondDiscordChatLogicIdx);

// If it is duplicated, we can delete the second one
if (discordChatLogicIdx !== -1 && secondDiscordChatLogicIdx !== -1) {
  console.log('Found duplicate discord chat block, stripping it...');
  // Find where the duplicate block ends. The second block goes until the end of its <script> tag.
  // Actually, wait, let's see where the second block starts. It probably starts with <script> right above it.
  let startDelete = secondDiscordChatLogicIdx;
  while (startDelete > 0 && !newLines[startDelete].includes('<script>')) {
    startDelete--;
  }
  
  let endDelete = secondDiscordChatLogicIdx;
  while (endDelete < newLines.length && !newLines[endDelete].includes('</script>')) {
    endDelete++;
  }
  
  console.log('Deleting from', startDelete, 'to', endDelete);
  newLines.splice(startDelete, endDelete - startDelete + 1);
}

fs.writeFileSync('public/admin_fixed.html', newLines.join('\n'));
console.log('Wrote admin_fixed.html with ' + newLines.length + ' lines');
