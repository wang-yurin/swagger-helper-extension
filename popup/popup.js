const toggleButton = document.getElementById('toggleSwitch');

toggleButton.addEventListener('change', (e) => {
  const isOpen = e.target.checked;

  const message = {
    type: 'TOGGLE',
    payload: {
      open: isOpen,
    },
  };

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab) {
      chrome.tabs.sendMessage(tab.id, message, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
      });
    }
  });
});

function updateToggleState() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab) {
      chrome.tabs.sendMessage(tab.id, { type: 'GET_STATUS' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }

        if (response && response.success) {
          toggleButton.checked = response.allOpened;
        }
      });
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, payload } = message;

  if (type === 'STATUS_UPDATE') {
    toggleButton.checked = payload.allOpened;
  }

  return true;
});

document.addEventListener('DOMContentLoaded', () => {
  updateToggleState();
});
