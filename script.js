let musicList = document.querySelector(".musicList");

function addCard( songCover, songUrl, songName) {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = ` <img class="songCover" src="${songCover}" alt="Raat ki Rani">
                <div class="playBtn center">
                    <img src="playBtn.svg" alt="playBtn">
                </div>
                <div class="detail">
                    <h2>${songName}</h2>
                    <p class="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, voluptas?</p>
                </div>
                <audio src="${songUrl}" ></audio>`;

        musicList.append(card);
}

addCard("raat ki rani.png","/Raat Ki Rani_320(PagalWorld.com.so).mp3");
addCard("song2.jpg", "/song2.mp3", "Bhairava Anthem");
addCard("song2.jpg", "/song2.mp3", "Bhairava Anthem");
addCard("song2.jpg", "/song2.mp3", "Bhairava Anthem");
addCard("song2.jpg", "/song2.mp3", "Bhairava Anthem");
addCard("song2.jpg", "/song2.mp3", "Bhairava Anthem");
addCard("song2.jpg", "/song2.mp3", "Bhairava Anthem");
addCard("song2.jpg", "/song2.mp3", "Bhairava Anthem");
addCard("song2.jpg", "/song2.mp3", "Bhairava Anthem");