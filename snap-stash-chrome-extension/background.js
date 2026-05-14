// background.js
chrome.runtime.onInstalled.addListener(function () {
  // Initialize storage with an empty array if it's not already initialized
  chrome.storage.local.get('savedItems', function (data) {
    if (!data.savedItems) {
      chrome.storage.local.set({ savedItems: [] });
    }
  });
});
