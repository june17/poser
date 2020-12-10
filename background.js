
chrome.windows.onCreated.addListener(function() {
    chrome.storage.sync.set({countdown: .5*60*1000}, function() {
        console.log('Value of countdown is set');
    });
})

var timerId = setInterval(function(){
  chrome.storage.sync.get(['countdown'], function(result) {
    if(result.countdown!=null && result.countdown > 0) {
        var countdown = result.countdown;
        if (result.countdown == 1000 ) {
            countdown -= 1000;
            chrome.storage.sync.set({countdown: countdown});
            chrome.tabs.create({ url: 'localhost:8080' });
        } else if(result.countdown > 1000) {
            countdown -= 1000;
            chrome.storage.sync.set({countdown: countdown});
        }
    }
  })
}, 1000);

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        // pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

