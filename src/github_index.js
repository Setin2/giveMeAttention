var popout = document.createElement("div");
popout.setAttribute("class", "popout");
popout.setAttribute("id", "pop");
document.body.appendChild(popout);

var btn = document.createElement("div");
btn.setAttribute("class", "btn");
popout.appendChild(btn);

var heart = document.createElement("img");
heart.src = chrome.runtime.getURL("images/heart.png");
heart.setAttribute("width", "60");
btn.appendChild(heart);

btn.addEventListener('click', function() {
    sendEmail(false);
});

$(document).ready(function(){
    animateDiv();
});

function makeNewPosition(){
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 70;
    var w = $(window).width() - 70;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];        
}

function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $(btn).offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $(btn).animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
};

function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    var speedModifier = 0.1;
    var speed = Math.ceil(greatest/speedModifier);

    return speed;
}

async function get_user(){
    return new Promise(async function (res, rej) {
      chrome.storage.local.get(['userLocal'], async function (result) {
          var userLocal = result.userLocal;
          res(userLocal);
      });
    });
}

function saveDefaultSettings(){
    chrome.storage.sync.set({"iwantattention": "I want attention!;I want attention :)"});
}

async function sendEmail(sendEmail) {
    chrome.storage.sync.get(["iwantattention"], function (items){
        var settings = items.iwantattention.split(";");
        console.log(settings[0]);
        console.log(settings[1]);
    })

    if (sendEmail){
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "elatic_username",
            Password: "elastic_password",
            Port: 2525,
            To: "reciever",
            From: "elatic_username",
            Subject: settings[0],
            Body: settings[1]
        }).then(
            message => {
                if (message === "OK"){
                    alert("Email sent successfully :)");
                } else alert(message)
            }
        );   
    }
}

saveDefaultSettings();