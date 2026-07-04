const fs = require('fs');
let html = fs.readFileSync('public/admin.html', 'utf-8');

// 1. Notification Sound
if (!html.includes('id="chatSound"')) {
  html = html.replace('</body>', \<audio id="chatSound" src="https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3" preload="auto"></audio>\n</body>\);
}

// 2. Browser Notifications
const desktopNotifLogic = \
  if (Notification.permission === 'granted' && typeof msg === 'string') {
    new Notification('New Message', { body: msg, icon: '/favicon.ico' });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission();
  }
\;

// Replace audio and desktop notifs inside parse message logic if not present
if (!html.includes('Notification.permission')) {
  html = html.replace('function playNotificationSound() {', \
function playNotificationSound(msg) {
  const audio = document.getElementById('chatSound');
  const soundToggleIcon = document.getElementById('soundToggleIcon');
  if (audio && (!soundToggleIcon || soundToggleIcon.classList.contains('fa-volume-up'))) {
    audio.play().catch(e => console.log('Audio error:', e));
  }
  \
}\nfunction oldPlaySound() {\);
}

// 3. Quick Replies
const quick_replies = \
const quickReplies = {
  '/hello': 'Hello! How can I help you today?',
  '/refund': 'Please provide your order ID and the reason for your refund request. Note that refunds are subject to our terms of service.',
  '/payment': 'We accept credit cards, crypto, and PayPal for payments.',
  '/thanks': 'Thank you for choosing ZoroBoost! Let us know if you need anything else.'
};

document.addEventListener('input', function(e) {
  if (e.target && e.target.id === 'dc-chat-input' || e.target.classList.contains('chat-input-field')) {
    const val = e.target.value;
    if (val.startsWith('/') && quickReplies[val]) {
      e.target.value = quickReplies[val];
    }
  }
});

// Copy message logic
document.addEventListener('click', function(e) {
  const copyBtn = e.target.closest('.copy-msg-btn');
  if (copyBtn) {
    const text = copyBtn.getAttribute('data-text');
    if (text) {
      navigator.clipboard.writeText(text);
      copyBtn.innerHTML = '<i class="fas fa-check" style="color: #22c55e;"></i>';
      setTimeout(() => copyBtn.innerHTML = '<i class="far fa-copy"></i>', 2000);
    }
  }
});
\;

if (!html.includes('const quickReplies')) {
  html = html.replace('window.renderDiscordContacts = function() {', quick_replies + '\nwindow.renderDiscordContacts = function() {');
}

fs.writeFileSync('public/admin.html', html, 'utf-8');
console.log('Admin features added');