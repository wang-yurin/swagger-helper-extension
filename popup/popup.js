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
          console.error('error:', chrome.runtime.lastError);
          return;
        }
      });
    }
  });
});
