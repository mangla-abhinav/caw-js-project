$(document).ready(function () {
    let keys = $(".key");
    let currentKey;

    const random = (maxNum) => {
        return Math.floor(Math.random() * maxNum);
    };

    const removeJiggle = (key) => {
        key.removeClass("jiggle");
    };

    const addJiggle = (key) =>{
        key.addClass("jiggle");
    }

    const jiggleRandomKey = (keyNum) => {
        currentKey = $(keys[keyNum]);
        addJiggle(currentKey);

        $("body").keydown(function (e) {
            e.preventDefault();
            if (e.key.toLowerCase() === currentKey.attr("data-key").toLowerCase()) {
                removeJiggle(currentKey);
                jiggleRandomKey(random(keys.length));
            }
        });
    };
    jiggleRandomKey(random(keys.length));
});