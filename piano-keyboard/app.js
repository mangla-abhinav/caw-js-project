$(document).ready(function () {
    let keys = $("a");
    let sounds = [];
    for (let i = 0; i < keys.length; i++) {
        sounds[i] = new Howl({
            src: ['audio/key-' + (i + 1) + '.mp3']
        });
        $(keys[i]).click((e) => {
            e.preventDefault();
            sounds[i].play();
        });
    }
});