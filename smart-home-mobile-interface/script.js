const temperatureValue = document.getElementById("temperature-value");
const decreaseButton = document.getElementById("temperature-decrease");
const increaseButton = document.getElementById("temperature-increase");
const songTitle = document.getElementById("song-title");
const musicPlayToggle = document.getElementById("music-play-toggle");
const musicPlayLabel = document.getElementById("music-play-label");
const musicPlaySymbol = document.getElementById("music-play-symbol");
const musicStopButton = document.getElementById("music-stop");
const musicNextButton = document.getElementById("music-next");

let temperature = 78;
const minTemperature = 60;
const maxTemperature = 90;
const funnySongs = [
  "Wi-Fi Went Down So I Learned to Yodel",
  "Microwaving Burritos at Midnight",
  "My Cat Changed the Thermostat Again",
  "Alexa, Please Stop Judging Me",
  "Dancing in Crocs During a Fire Drill",
  "Saxophone Solo for a Sad Vacuum",
  "The Doorbell Remix feat. Cousin Larry",
  "Moonwalking to the Fridge in Socks"
];
let currentSongIndex = -1;
let isPlaying = false;

function renderTemperature() {
  temperatureValue.textContent = temperature;
}

function getRandomSongIndex() {
  if (funnySongs.length === 1) {
    return 0;
  }

  let nextIndex = Math.floor(Math.random() * funnySongs.length);

  while (nextIndex === currentSongIndex) {
    nextIndex = Math.floor(Math.random() * funnySongs.length);
  }

  return nextIndex;
}

function updateSongDisplay(message) {
  songTitle.textContent = message;
}

function playRandomSong() {
  currentSongIndex = getRandomSongIndex();
  updateSongDisplay(funnySongs[currentSongIndex]);
  isPlaying = true;
  musicPlayLabel.textContent = "Pause";
  musicPlaySymbol.innerHTML = "&#10074;&#10074;";
}

function pauseSong() {
  isPlaying = false;
  musicPlayLabel.textContent = "Play";
  musicPlaySymbol.innerHTML = "&#9654;";
}

decreaseButton.addEventListener("click", () => {
  temperature = Math.max(minTemperature, temperature - 1);
  renderTemperature();
});

increaseButton.addEventListener("click", () => {
  temperature = Math.min(maxTemperature, temperature + 1);
  renderTemperature();
});

musicPlayToggle.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
    return;
  }

  if (currentSongIndex === -1) {
    playRandomSong();
    return;
  }

  isPlaying = true;
  musicPlayLabel.textContent = "Pause";
  musicPlaySymbol.innerHTML = "&#10074;&#10074;";
});

musicStopButton.addEventListener("click", () => {
  isPlaying = false;
  currentSongIndex = -1;
  musicPlayLabel.textContent = "Play";
  musicPlaySymbol.innerHTML = "&#9654;";
  updateSongDisplay("Playback stopped. Press Play for another surprise track.");
});

musicNextButton.addEventListener("click", () => {
  currentSongIndex = getRandomSongIndex();
  updateSongDisplay(funnySongs[currentSongIndex]);

  if (!isPlaying) {
    isPlaying = true;
    musicPlayLabel.textContent = "Pause";
    musicPlaySymbol.innerHTML = "&#10074;&#10074;";
  }
});

renderTemperature();
