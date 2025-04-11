chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, payload } = message;

  if (type === 'TOGGLE') {
    sendResponse({ success: true });
  }

  return true;
});
