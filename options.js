const saveOptions = () => {
    const hideSearchBar = document.getElementById('hideSearchBar').checked;
    const hideDescriptionBar = document.getElementById('hideDescriptionBar').checked;
    const displayConcreteNumbers = document.getElementById('displayConcreteNumbers').checked;
  
    chrome.storage.sync.set(
      {
        hideDescriptionBar: hideDescriptionBar,
        hideSearchBar: hideSearchBar,
        displayConcreteNumbers: displayConcreteNumbers
    },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      {
        hideSearchBar: true,
        hideDescriptionBar: false,
        displayConcreteNumbers: true
      },
      (items) => {
        document.getElementById('hideSearchBar').checked = items.hideSearchBar;
        document.getElementById('hideDescriptionBar').checked = items.hideDescriptionBar;
        document.getElementById('displayConcreteNumbers').checked = items.displayConcreteNumbers;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);