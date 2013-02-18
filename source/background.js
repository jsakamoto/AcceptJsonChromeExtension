// JavaScript source code
chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        for (var i = 0; i < details.requestHeaders.length; i++) {
            if (details.requestHeaders[i].name == 'Accept') {
                var hdrParts = details.requestHeaders[i].value.split(';');
                var mimeTypes = hdrParts[0].split(',');
                mimeTypes.push('application/json');
                // notice: do not insert break line follow code because JavaScript auto matic inserting delemiter feature causes BUG!
                mimeTypes.sort(function (a, b) { return (a == 'application/xml' && b == 'application/json') ? +1 : (a == 'application/json' && b == 'application/xml') ? -1 : 0; });
                hdrParts[0] = mimeTypes.join(',');
                details.requestHeaders[i].value = hdrParts.join(';');
            }
            return { requestHeaders: details.requestHeaders };
        }
    },
    { urls: ['*://*/*'] },
    ['blocking', 'requestHeaders']
);
