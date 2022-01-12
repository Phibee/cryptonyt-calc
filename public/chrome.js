chrome.browserAction.onClicked.addListener(function () {
	var queryStr = '?tabId=';
	var loaderURL = chrome.extension.getURL('/index.html') + queryStr;
	chrome.browserAction.onClicked.addListener(function (tab) {
		chrome.tabs.create({ url: loaderURL + tab.id });
	});
});
