chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, payload } = message;

  if (type === 'TOGGLE') {
    if (window.openTagSection) {
      const success = window.openTagSection(payload);

      sendResponse({ success });
    } else {
      sendResponse({ success: false, error: 'Function not found' });
    }
  }

  return true;
});
