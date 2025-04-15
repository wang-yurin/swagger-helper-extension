document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    updatePopupToggleState();
  }, 1000);
});

function updatePopupToggleState() {
  if (window.checkTagSectionsStatus) {
    const status = window.checkTagSectionsStatus();

    chrome.runtime.sendMessage({
      type: 'STATUS_UPDATE',
      payload: {
        allOpened: status.allOpened,
        total: status.total,
        opened: status.opened,
      },
    });
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, payload } = message;

  if (type === 'GET_STATUS') {
    if (window.checkTagSectionsStatus) {
      const status = window.checkTagSectionsStatus();
      sendResponse({ success: true, ...status });
    } else {
      sendResponse({ success: false, error: 'Function not found' });
    }
  } else if (type === 'TOGGLE') {
    if (window.openTagSection) {
      const success = window.openTagSection(payload);
      sendResponse({ success });
    } else {
      sendResponse({ success: false, error: 'Function not found' });
    }

    setTimeout(() => {
      updatePopupToggleState();
    }, 500);
  }

  return true;
});
