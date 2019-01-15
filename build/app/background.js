const createProperties = {
    id: "chribgen",
    title: "Chribgen Search",
    contexts: ["selection"],
}

chrome.contextMenus.create(createProperties)

var searchValue = '';
chrome.contextMenus.onClicked.addListener(function(info){
    if (info.menuItemId === "chribgen") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "searchValue" }, function (response) {
                searchValue = response.searchValue;
                console.log(searchValue);
            });
        });
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
    console.log(request)
    if (request.msg === 'give me searchValue pls') {
        sendResponse({searchVal: searchValue})
    }
})

