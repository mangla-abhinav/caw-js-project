$(document).ready(function () {
    let listItems = $("li");

    //Adding Event Listener to each List Item
    for (let i = 0; i < listItems.length; i++) {
        $(listItems[i]).click(function (e) {
            if (e.shiftKey) {
                e.preventDefault();
                //Iterating to select checkboxes till another checkbox is found
                for (let j = i + 1; j > 0; j--) {
                    if (!$("#episode-" + j).is(":checked")) {
                        $("#episode-" + j).prop("checked", true);
                    } else {
                        break;
                    }
                }
            }
        });
    }
});