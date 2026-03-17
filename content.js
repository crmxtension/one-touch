chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === "clickAllFollow") {
    runClickAllFollow()
      .then(sendResponse)
      .catch((err) =>
        sendResponse({ clicked: 0, error: String(err.message || err) })
      );
    return true;
  }
  if (msg.action === "clickAllUnfollow") {
    runClickAllUnfollow()
      .then(sendResponse)
      .catch((err) =>
        sendResponse({ clicked: 0, error: String(err.message || err) })
      );
    return true;
  }
});

async function runClickAllFollow() {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  function getVisibleText(node) {
    if (!node) return "";
    const text = (node.textContent || "").trim();
    const value = (
      node.value != null && typeof node.value === "string"
        ? node.value
        : node.getAttribute?.("value") || ""
    ).trim();
    const aria = (node.getAttribute && node.getAttribute("aria-label")) || "";
    const title = (node.getAttribute && node.getAttribute("title")) || "";
    return [text, value, aria, title].join(" ").toLowerCase();
  }

  function isFollowButton(el) {
    if (!el || !el.getBoundingClientRect) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width < 5 || rect.height < 5) return false;

    const tag = (el.tagName || "").toLowerCase();
    const role = (el.getAttribute && el.getAttribute("role")) || "";
    const isInputSubmit =
      tag === "input" && (el.type === "submit" || el.type === "button");
    const isClickable =
      tag === "button" ||
      tag === "a" ||
      role === "button" ||
      isInputSubmit ||
      el.onclick != null;

    const text = getVisibleText(el);
    if (!text) return false;

    const isFollow =
      /\bfollow\b/.test(text) && !/\b(unfollow|following)\b/.test(text);
    return isClickable && isFollow;
  }

  const candidates = document.querySelectorAll(
    'button, a[role="button"], [role="button"], input[type="button"], input[type="submit"], a.btn, button.btn, [data-testid], [aria-label*="ollow"], span.btn'
  );

  const toClick = [];
  for (const el of candidates) {
    if (isFollowButton(el)) toClick.push(el);
  }

  if (toClick.length === 0) {
    return { clicked: 0, error: null };
  }

  for (const el of toClick) {
    try {
      el.scrollIntoView({ block: "center", behavior: "auto" });
      await delay(100);
      el.click();
      await delay(100);
    } catch (_) {}
  }

  return { clicked: toClick.length, error: null };
}

async function runClickAllUnfollow() {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  function getVisibleText(node) {
    if (!node) return "";
    const text = (node.textContent || "").trim();
    const value = (
      node.value != null && typeof node.value === "string"
        ? node.value
        : node.getAttribute?.("value") || ""
    ).trim();
    const aria = (node.getAttribute && node.getAttribute("aria-label")) || "";
    const title = (node.getAttribute && node.getAttribute("title")) || "";
    return [text, value, aria, title].join(" ").toLowerCase();
  }

  function isUnfollowButton(el) {
    if (!el || !el.getBoundingClientRect) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width < 5 || rect.height < 5) return false;

    const tag = (el.tagName || "").toLowerCase();
    const role = (el.getAttribute && el.getAttribute("role")) || "";
    const isInputSubmit =
      tag === "input" && (el.type === "submit" || el.type === "button");
    const isClickable =
      tag === "button" ||
      tag === "a" ||
      role === "button" ||
      isInputSubmit ||
      el.onclick != null;

    const text = getVisibleText(el);
    if (!text) return false;

    const isUnfollow =
      /\b(unfollow|following)\b/.test(text) && !/^\s*follow\s*$/.test(text);
    return isClickable && isUnfollow;
  }

  const candidates = document.querySelectorAll(
    'button, a[role="button"], [role="button"], input[type="button"], input[type="submit"], a.btn, button.btn, [data-testid], [aria-label*="ollow"], span.btn'
  );

  const toClick = [];
  for (const el of candidates) {
    if (isUnfollowButton(el)) toClick.push(el);
  }

  if (toClick.length === 0) {
    return { clicked: 0, error: null };
  }

  for (const el of toClick) {
    try {
      el.scrollIntoView({ block: "center", behavior: "auto" });
      await delay(100);
      el.click();
      await delay(100);
    } catch (_) {}
  }

  return { clicked: toClick.length, error: null };
}
