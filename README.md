# One touch – Chrome Extension

Click the extension icon, then **"Follow everyone on this page"** to automatically click every **Follow** button on the current page in github.com

## Install

1. Open Chrome and go to `chrome://extensions/`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select this folder: `One Touch folder`.

## Use

1. Open a page that has Follow buttons (e.g. a GitHub “Followers” or “Following” list).
2. Click the **One touch** extension icon in the toolbar.
3. Click **Follow everyone on this page** in the popup.
4. The extension will find all Follow buttons, scroll them into view, and click them with a short delay between each (to avoid rate limits).

## Notes

- Only elements that look like **Follow** (and not “Following” or “Unfollow”) are clicked.
- Works on any site that uses buttons/links with the word “Follow” (e.g. GitHub, some social sites).
- It does not click “Following” or “Unfollow”.
- If you get “Cannot run on this page”, reload the tab and try again. It will not run on restricted pages like `chrome://`.
