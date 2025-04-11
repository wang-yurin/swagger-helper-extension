const toggleButton = document.getElementById('toggleSwitch');

toggleButton.addEventListener('change', (e) => {
  const isOpen = e.target.checked;

  const message = {
    type: 'TOGGLE',
    payload: {
      open: isOpen,
    },
  };

  async function sendMessageToContentScript(message) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const res = await chrome.tabs.sendMessage(tab.id, message);
  }
  sendMessageToContentScript(message);
});
