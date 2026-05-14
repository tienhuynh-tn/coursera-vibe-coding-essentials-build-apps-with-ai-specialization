document.addEventListener('DOMContentLoaded', function () {
  const storage = chrome.storage.local;
  const categorySelect = document.getElementById('category');
  const saveButton = document.getElementById('saveButton');
  const itemList = document.getElementById('itemList');
  const itemPreview = document.getElementById('itemPreview');
  const statusMessage = document.getElementById('statusMessage');

  function truncateTitle(title) {
    return title.length > 50 ? title.substring(0, 50) + '...' : title;
  }

  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = type || '';
  }

  function getActiveTab(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (chrome.runtime.lastError) {
        showStatus(chrome.runtime.lastError.message, 'error');
        saveButton.disabled = false;
        return;
      }

      if (!tabs || !tabs[0]) {
        showStatus('No active tab found.', 'error');
        saveButton.disabled = false;
        return;
      }

      callback(tabs[0]);
    });
  }

  function loadSavedItems(callback) {
    storage.get('savedItems', function (data) {
      if (chrome.runtime.lastError) {
        showStatus(chrome.runtime.lastError.message, 'error');
        saveButton.disabled = false;
        return;
      }

      callback(data.savedItems || []);
    });
  }

  function saveItems(savedItems, callback) {
    storage.set({ savedItems }, function () {
      if (chrome.runtime.lastError) {
        showStatus(chrome.runtime.lastError.message, 'error');
        saveButton.disabled = false;
        return;
      }

      callback();
    });
  }

  getActiveTab(function (tab) {
    itemPreview.textContent = truncateTitle(tab.title || tab.url || 'Untitled page');
  });

  saveButton.addEventListener('click', function () {
    const selectedCategory = categorySelect.value || 'Uncategorized';
    showStatus('Saving...', '');
    saveButton.disabled = true;

    getActiveTab(function (tab) {
      const url = tab.url || '';
      const title = truncateTitle(tab.title || url || 'Untitled page');

      loadSavedItems(function (savedItems) {
        const nextItems = savedItems.concat({ category: selectedCategory, url, title });

        saveItems(nextItems, function () {
          saveButton.disabled = false;
          itemPreview.textContent = title;
          updateShoppingList(nextItems);
          showStatus('Saved.', 'success');
        });
      });
    });
  });

  loadSavedItems(updateShoppingList);

  function updateShoppingList(savedItems) {
    const itemsByCategory = {};

    savedItems.forEach(function (item) {
      if (!itemsByCategory[item.category]) {
        itemsByCategory[item.category] = [];
      }

      itemsByCategory[item.category].push(item);
    });

    itemList.innerHTML = '';

    Object.keys(itemsByCategory).forEach(function (category) {
      const categoryHeader = document.createElement('h2');
      categoryHeader.textContent = category;
      itemList.appendChild(categoryHeader);

      const categoryList = document.createElement('ul');
      categoryList.className = 'category-list';

      itemsByCategory[category].forEach(function (item) {
        const listItem = document.createElement('li');
        const itemContainer = document.createElement('div');
        const itemInfo = document.createElement('div');
        const link = document.createElement('a');
        const deleteButton = document.createElement('button');

        itemContainer.className = 'item-container';
        itemInfo.className = 'item-info';

        link.href = item.url;
        link.target = '_blank';
        link.rel = 'noreferrer';
        link.textContent = item.title;

        deleteButton.className = 'deleteButton';
        deleteButton.type = 'button';
        deleteButton.dataset.url = item.url;
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
          deleteItem(item.url);
        });

        itemInfo.appendChild(link);
        itemContainer.appendChild(itemInfo);
        itemContainer.appendChild(deleteButton);
        listItem.appendChild(itemContainer);
        categoryList.appendChild(listItem);
      });

      itemList.appendChild(categoryList);
    });
  }

  function deleteItem(urlToDelete) {
    loadSavedItems(function (savedItems) {
      const updatedItems = savedItems.filter(function (item) {
        return item.url !== urlToDelete;
      });

      saveItems(updatedItems, function () {
        updateShoppingList(updatedItems);
        showStatus('Deleted.', 'success');
      });
    });
  }
});
