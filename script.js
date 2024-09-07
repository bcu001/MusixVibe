let musicList = document.getElementById("musicList");

const clientId = 'e4370c92';

let api_Data;
let songs;
let isSongsFetched = false;
let songPlaying = false;
let mainAudioPlayer = new Audio;

let loader = document.createElement("div");
loader.setAttribute("id", "loading");

let retry = document.createElement("div");
retry.setAttribute("id", "retry");
retry.className = "center";

function createCard(songCover, songId, songName, artistName) {
    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute('id', songId);
    card.innerHTML = ` <img class="songCover" src="${songCover}" alt="Raat ki Rani">
                <div class="playBtn center">
                    <img src="asset/img/playBtn.svg" alt="playBtn">
                </div>
                <div class="detail">
                    <h2>${songName}</h2>
                    <p class="desc">${artistName}</p>
                </div>`;

    musicList.append(card);
}

async function fetchJamendoSongs(songName, clientId, songListLength) {
    try {
        isSongsFetched = false;
        const response = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=${songListLength}&search=${encodeURIComponent(songName)}`);
        //   http[s]://api.jamendo.com/<version>/<entity>/<subentity>/?<api_parameter>=<value>

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        api_Data = data.results;
        // Check if there are any results and return the first song's information
        if (data.results.length > 0) {
            console.log('Songs found:', api_Data);
            isSongsFetched = true;
            return data.results.map(track => ({
                name: track.name,
                artist: track.artist_name,
                audio: track.audio,
                songCover: track.album_image,
                id: track.id
            }));
        } else {
            console.log('No songs found.');
            return true;
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return false;
    }
}

function getSearchValue() {
    let searchBar = document.getElementById("searchBar");
    return searchBar.value;
}

async function addCard(songName = `hindi`, songListLength = 10) {
    musicList.className = "center";
    musicList.innerHTML = '';
    musicList.append(loader);
    songs = await fetchJamendoSongs(songName, clientId, songListLength);


    // console.log(songs);
    musicList.innerHTML = '';
    if (songs === false) {
        retry.innerHTML = "No Internet";
        musicList.append(retry);
    }
    else if (songs === true) {
        retry.innerHTML = "No Result";
        musicList.append(retry);
    }
    else {
        musicList.removeAttribute("class")
        for (let i = 0; i < songListLength; i++) {
            createCard(songs[i].songCover, i, songs[i].name, songs[i].artist);
        }
        getCardId();
        console.log("new Songs Search Complete");
    }
}

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
    addCard(getSearchValue());

})

let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keydown", (e) => {
    if (e.key == 'Enter') {
        addCard(getSearchValue());
    }
})


let currentSongNumber;
function getCardId() {
    document.querySelectorAll('.playBtn').forEach(button => {
        button.addEventListener('click', () => {
            currentSongNumber = button.parentElement.id;

            if (isSongsFetched && !songPlaying) {
                console.log("Playing Song")
                mainAudioPlayer.src = api_Data[currentSongNumber].audio;
                mainAudioPlayer.play();
                songPlaying = true;
                console.log(button.childNodes[1])
                button.childNodes[1].src = songPlaying ? 'asset/img/playBtn.svg' : 'asset/img/pause.svg';
            }
        });
    });
}



let play = document.getElementById("play");
play.addEventListener("click", (newSong = 0) => {
    if (isSongsFetched) {
        if (songPlaying) {
            mainAudioPlayer.pause();
            console.log("Pause Music")
        }
        else {
            mainAudioPlayer.play();
            console.log("playing Music");
        }
        play.src = songPlaying ? 'asset/img/playBtn.svg' : 'asset/img/pause.svg';
        songPlaying = !songPlaying;
    }
})


