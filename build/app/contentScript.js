chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
    console.log(request)
    if (request.greeting === "searchValue") {
        sendResponse({searchValue: window.getSelection().toString()})
    }
})