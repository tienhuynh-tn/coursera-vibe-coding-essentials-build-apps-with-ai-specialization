# SnapStash Chrome Extension

SnapStash is a small Chrome extension for saving the current tab into a categorized list from the extension popup.

## Features

- Shows a preview of the active tab title.
- Saves the current tab URL and title.
- Groups saved tabs by category.
- Deletes saved tabs from the popup.
- Stores saved items with Chrome extension local storage.

## Load the Extension in Chrome

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select this folder: `snap-stash-chrome-extension`.
5. Pin SnapStash from the Chrome extensions menu if you want quick access.

After changing extension files, click the reload button for SnapStash on `chrome://extensions` before testing again.

## Usage

1. Open any web page you want to save.
2. Click the SnapStash extension icon.
3. Choose a category.
4. Click **Save Item**.
5. Confirm the popup shows `Saved.` and the item appears in the list.

If no category is selected, the item is saved under `Uncategorized`.

## Troubleshooting

### Failed to load extension: Could not load icon

Chrome requires every icon path in `manifest.json` to exist. This extension currently references `images/icon128.png`, so make sure that file is present before loading the unpacked extension.

### Items do not save

Make sure the extension was reloaded from `chrome://extensions` after code changes. SnapStash needs the `storage` permission from `manifest.json`, and it saves data through `chrome.storage.local`.

If saving still fails, open the popup, right-click inside it, choose **Inspect**, and check the Console for the error message shown by Chrome.

### Remote styles or icons do not load

Chrome Manifest V3 blocks remote scripts and styles in extension pages by default. Keep popup assets local instead of using CDN links.
