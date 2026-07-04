import re

with open('public/admin.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Quick Replies & Drag/Drop
quick_replies_logic = '''
// Quick Replies
const quickReplies = {
  '/hello': 'Hello! How can I help you today?',
  '/refund': 'Please provide your order ID and the reason for your refund request. Note that refunds are subject to our terms of service.',
  '/payment': 'We accept credit cards, crypto, and PayPal for payments.',
  '/thanks': 'Thank you for choosing ZoroBoost! Let us know if you need anything else.'
};

document.getElementById('dc-chat-input')?.addEventListener('input', function(e) {
  const val = this.value;
  if (val.startsWith('/') && quickReplies[val]) {
    this.value = quickReplies[val];
  }
});

// Drag and Drop
const chatHistory = document.getElementById('dc-chat-history');
if (chatHistory) {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    chatHistory.addEventListener(eventName, preventDefaults, false);
  });
  function preventDefaults(e) { e.preventDefault(); e.stopPropagation(); }
  chatHistory.addEventListener('drop', handleDrop, false);
  function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    if (files.length > 0 && typeof uploadFilesToCloudflare === 'function') {
      uploadFilesToCloudflare(files);
    }
  }
}
'''
html = html.replace('window.renderDiscordContacts = function() {', quick_replies_logic + '\nwindow.renderDiscordContacts = function() {')

with open('public/admin.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Admin patched')