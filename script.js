let musicList = document.querySelector(".musicList");

function createCard(songCover, songUrl, songName, artistName) {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = ` <img class="songCover" src="${songCover}" alt="Raat ki Rani">
                <div class="playBtn center">
                    <img src="/asset/img/playBtn.svg" alt="playBtn">
                </div>
                <div class="detail">
                    <h2>${songName}</h2>
                    <p class="desc">${artistName}</p>
                </div>
                <audio src="${songUrl}" ></audio>`;

    musicList.append(card);
}

const clientId = 'e4370c92';

async function fetchJamendoSongs(songName, clientId, songListLength) {
    try {
        // Make a request to Jamendo API to search for songs
        const response = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=${songListLength}&search=${encodeURIComponent(songName)}`);
        //   http[s]://api.jamendo.com/<version>/<entity>/<subentity>/?<api_parameter>=<value>

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check if there are any results and return the first song's information
        if (data.results.length > 0) {
            // console.log('Songs found:', data.results);
            return data.results.map(track => ({
                name: track.name,
                artist: track.artist_name,
                audio: track.audio,
                songCover: track.album_image
            }));
        } else {
            console.log('No songs found.');
            return 'No songs found.';
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return 'An error occurred while fetching songs.';
    }
}

function getSearchValue() {
    let searchBar = document.getElementById("searchBar");
    return searchBar.value;
}

async function addCard(songName = `rap`, songListLength = 10) {
    let songs = await fetchJamendoSongs(songName, clientId, songListLength);
    // console.log(songs);
    musicList.innerHTML = '';
    for (let i = 0; i < songListLength; i++) {
        createCard(songs[i].songCover, songs[i].audio, songs[i].name, songs[i].artist);
    }
}

//Default Card without search
addCard(getSearchValue());

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
    addCard(getSearchValue());
    console.log("new Songs Search Complete");
})
