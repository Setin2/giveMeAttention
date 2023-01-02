/*
 * Main functionalities are inside an index.js file
 * In order to not leak smtp credentials, a similar file is uploaded to github using fake credentials
 */

/*
 * Add html elements for the floating button
 */
var popout = document.createElement("div");
popout.setAttribute("class", "popout");
popout.setAttribute("id", "pop");
document.body.appendChild(popout);

var btn = document.createElement("div");
btn.setAttribute("class", "btn");
popout.appendChild(btn);

var heart = document.createElement("img");
heart.setAttribute("id", "heart");
heart.setAttribute("tabindex", "0");
heart.src = chrome.runtime.getURL("images/heart.png");
heart.setAttribute("width", "60");
btn.appendChild(heart);

btn.addEventListener('click', function() {
    sendEmail(false);
});

async function sendEmail(sendEmail) {
    // get email subject and body from the chrome gloabal storage
    chrome.storage.sync.get(["iwantattention"], function (items){
        var settings = items.iwantattention.split(";");
        console.log(settings[0]);
        console.log(settings[1]);
    });

    // animate button to beat like a heart
    setTimeout(function(){
        heart.classList.remove("heartBeat");
    }, 1000);
    heart.classList.add("heartBeat");

    // send email using elasticemail credentials
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

/*
 * These are the default email subject and body
 */
function saveDefaultSettings(){
    chrome.storage.sync.set({"iwantattention": "I want attention!;I want attention :)"});
}

saveDefaultSettings();