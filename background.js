chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id) return;
  try {
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
    await chrome.tabs.sendMessage(tab.id, { action: 'clickAllFollow' });
  } catch (_) {}
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'followAll',
    title: 'Follow All',
    contexts: ['action'],
  });
  chrome.contextMenus.create({
    id: 'unfollowAll',
    title: 'Unfollow All',
    contexts: ['action'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id || (info.menuItemId !== 'followAll' && info.menuItemId !== 'unfollowAll')) return;
  const action = info.menuItemId === 'unfollowAll' ? 'clickAllUnfollow' : 'clickAllFollow';
  try {
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
    await chrome.tabs.sendMessage(tab.id, { action });
  } catch (_) {}
});
