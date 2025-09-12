function toggle_mute() {
    var audio = document.getElementById('pond-audio');
    audio.muted = !audio.muted;
    audio.play();

    if (!audio.muted) {
        document.getElementById('sound-image').src="images/music_on.png"
    } else {
        document.getElementById('sound-image').src="images/music_off.png"
    }
}