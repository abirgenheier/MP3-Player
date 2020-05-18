const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let audio = document.querySelector('#audio');
let progress = document.querySelector('#progress');
let progressContainer = $('#progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

$('.img-container img').on('hover', function () {
    $('img-container').css({ 'display': 'none' })
})



// Song titles
const songs = [
    {
        title: 'Crenshaw BLVD',
        cover: 'Nipsey_Hussle_Crenshaw'
    },
    {
        title: 'Killa',
        cover: 'Nipsey_Hussle_Slauson'
    },
    {
        title: 'Ocean Views',
        cover: 'Nipsey_Hussle_Mailbox_Money'
    },
    {
        title: 'A Hunnit A Show',
        cover: 'Nipsey_Hussle_Mailbox_Money'
    }]

const emoji = ['🎵', '🔥', '😈', '💯', '💰', '✈️', '💦', '💨',]

var random = Math.floor(Math.random() * emoji.length - 1)

// Keep track of song
let songIndex = songs.length - 1;


// Initially load song details into DOM
loadSong(songs[songIndex]);



function loadSong(song) {
    title.innerText = song.title + ' ' + emoji[random++];
    audio.src = `assets/music/${song.title}.mp3`;
    cover.src = `assets/music/${song.cover}.jpg`;
}

var l = []

function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

function getLyrics() {

    fetch('https://api.lyrics.ovh/v1/Nipsey%20Hussle/' + songs[songIndex].title)
        .then(res => res.json())
        .then(data => {
            l = []
            // console.log(JSON.stringify(data.lyrics))
            var allLyrics = (data.lyrics)
            var splitLyrics = allLyrics.replace(new RegExp("\n", "g"), "<br>");
            var lyrics = splitLyrics.split('<br>')


            // filter_array(lyrics)
            // console.log(lyrics)
            l.push(lyrics)
        })
}



// Play song
function playSong() {
    $(document).ready()
    getLyrics();
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    // popupLyrics();

    audio.play();

    increment()
}

var value = 0;

function increment() {
    var p = $('<p>')
    p.html(l[0][value])
    $('.lyrics').append(p)
    value++
    if (value === 5 || value === 10 || value === 15 || value === 20
        || value === 25 || value === 30 || value === 35 || value === 40 || value === 45
        || value === 50 || value === 55 || value === 60 || value === 65 || value === 70
        || value === 75 || value === 80 || value === 85 || value === 90 || value === 95) {
        $('.lyrics').empty()
    }
}

var count = setInterval(increment, 3000)

// Pause song
function pauseSong() {
    $(document).ready()
    getLyrics();
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();

    clearInterval(increment())


}

// Previous song
function prevSong() {
    $(document).ready()
    getLyrics();

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();

    clearInterval(increment())

    increment()
}

// Next song
function nextSong() {
    $(document).ready()
    getLyrics();

    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();

    clearInterval(increment())

    increment()
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}


// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    console.log(duration)



    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.click(setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
