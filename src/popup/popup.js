/*
 * Save the new email subject and body in the global chrome storage
 */
function saveSettings(){
    var subject = document.getElementById("subject").value;
    var body = document.getElementById("body").value;

    chrome.storage.sync.set({ "iwantattention": subject + ";" + body });
}

/*
 * Animate the save button in the popup window on click
 */
$('input[role=submit]').click(function () {
    var $t = $('input[role=submit]');
    var hasClass = $t.hasClass('done');
    if (!hasClass){
        $t.addClass('clicked');
        setTimeout(function(){
            $t.removeClass('clicked').addClass('done').attr({
                value: 'Saved',
            });
        }, time()); 
    } else if (hasClass){
        $t.removeClass().attr({
            value: 'Submit',
        });
    }

    saveSettings();
});

function time() {
    return 1000 + Math.random() * 2000
}