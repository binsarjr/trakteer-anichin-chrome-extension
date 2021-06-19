function inject(tab = null) {
    let options = 
    chrome.tabs.executeScript(tab, {
        code: `
        if(window.location.origin.includes('trakteer.id')) {
            let _pastelink = document.querySelector("#post-container > article > div.external-content > a").getAttribute("href")
            let _password = /password\\s+:\\s+(.*?)</gim.exec(document.body.outerHTML)[1]
            window.location.href=_pastelink+"?anichin="+btoa(_password)
        } else if(window.location.origin.includes('me.pastehouse.com')) {
            if(window.location.search.includes('anichin')) {
                let _url = new URL(window.location.href)
                let _password = _url.searchParams.get("anichin");
                document.getElementById('password').value = atob(_password)
                document.getElementById('passwordBtn').click()
            }
        }
        `
    })
}

chrome.tabs.onCreated.addListener(tab => {
    inject(tab.id)
    chrome.tabs.update(tab.id, {selected: true});
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        inject()
    }
})