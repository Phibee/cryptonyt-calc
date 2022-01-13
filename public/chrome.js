
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
  
chrome.action.onClicked.addListener(async function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});
