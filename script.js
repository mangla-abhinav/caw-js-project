$(document).ready(function () {
    let clockRunning = false;
    let memoryTime = {
        minutes: 15,
        seconds: 00
    };
    let interval;
    var userTime = {};
    var sound = new Howl({
        src: ['sound.mp3']
    });

    $(".settings").click(function (e) {
        e.preventDefault();
        $("#minutes").attr("disabled") === undefined ? disableInput() : enableInput();
    });

    function disableInput() {
        $("#minutes, #seconds").attr("disabled", "disabled");
    }

    function enableInput() {
        $("#minutes, #seconds").removeAttr("disabled");
    }

    function updateTime(time) {
        if (time.minutes.toString().length === 1) {
            $("#minutes").val("0" + time.minutes);
        } else
            $("#minutes").val(time.minutes);
        if (time.seconds.toString().length === 1) {
            $("#seconds").val("0" + time.seconds);
        } else
            $("#seconds").val(time.seconds);
    }

    function updateRing(colorClass) {
        $(".ring").removeClass("ending ring-stroke").addClass(colorClass);
    }

    function updateText(text) {
        $(".start").text(text);
    }

    $(".start").click(function (e) {
        e.preventDefault();
        memoryTime = {
            minutes: parseInt($("#minutes").val()),
            seconds: parseInt($("#seconds").val())
        }

        if ((memoryTime.minutes <= 99 && memoryTime.seconds <= 60) && (memoryTime.minutes >= 0 && memoryTime.seconds >= 0)) {
            if (!clockRunning) {
                userTime = JSON.parse(JSON.stringify(memoryTime))
                clockRunning = true;
                disableInput();
                updateRing("ring-stroke");
                updateText("STOP");
                $(".settings").hide();
                interval = setInterval(() => {
                    if (memoryTime.minutes === 0 && memoryTime.seconds === 0) {
                        clearInterval(interval);
                        updateRing("ending");
                        updateText("TIME'S UP!!! STOP!");
                        sound.loop(true);
                        sound.play();
                    } else {
                        if (memoryTime.seconds === 0) {
                            memoryTime.minutes -= 1;
                            memoryTime.seconds = 60;
                        }
                        memoryTime.seconds -= 1;
                        updateTime(memoryTime);
                    }
                }, 1000)
            } else if (clockRunning) {
                sound.stop();
                clockRunning = false;
                clearInterval(interval);
                updateRing("ending");
                updateText("START");
                $(".settings").show();
                updateTime(userTime);
            }
        } else {
            alert("Enter valid time");
            updateTime({
                minutes: 15,
                seconds: 0
            });
            enableInput();
        }
    });
});