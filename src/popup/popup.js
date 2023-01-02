document.getElementById("save").addEventListener("click", function(){
    var subject = document.getElementById("subject").value;
    var body = document.getElementById("body").value;

    saveSettings("iwantattention", subject + ";" + body);
});

function saveSettings(key, value){
    chrome.storage.sync.set({ "iwantattention": value }, function(){
        alert("settings saved");
    });
}