let changeColor = document.getElementById('changeColor');
let startTimer = document.getElementById('startTimer');

startTimer.onclick = function(){
    chrome.storage.sync.set({countdown: .5*60*1000}, function(result) {
        console.log("value set")
    });  
    chrome.storage.sync.get(['countdown'], function(result) {
        console.log(result.countdown)
    });
}

setInterval(function(){
    chrome.storage.sync.get(['countdown'], function(result) {
        console.log("hi", result.countdown);
        if (result.countdown!=null && result.countdown > 1000){
            var countdown = result.countdown
            countdown -= 1000;
            console.log("hi", countdown);
            var min = Math.floor(countdown / (60 * 1000));
            var sec = Math.floor((countdown- (min*60*1000))/1000);
            document.getElementById("showtime").innerHTML = min + "mins" + sec + "secs"; 
        }
    });
}, 1000);


chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);

    changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
        });
    };
});

