const startButton = document.getElementById("start-button");
const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");
const finalMessage = document.getElementById("final-message");
const bompSound = document.getElementById("bomp-sound");
const startSound = document.getElementById("start-sound");
const gameEndSound = document.getElementById("game-end-sound");
const gameEndHighSound = document.getElementById("game-end-high-sound");
const holes = Array.from(document.querySelectorAll(".hole"));

const GAME_DURATION = 30;
const MIN_DELAY = 250;
const MAX_DELAY = 900;
const MIN_VISIBLE_TIME = 700;
const MAX_VISIBLE_TIME = 1200;
const HIT_HIDE_DELAY = 140;

let score = 0;
let timeLeft = GAME_DURATION;
let activeHole = null;
let gameRunning = false;
let countdownIntervalId = null;
let nextPopTimeoutId = null;
let hideFaceTimeoutId = null;

// Returns a random whole number between the provided limits.
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Clears any pending timers so an old round cannot keep running after restart.
function clearScheduledActions() {
  clearInterval(countdownIntervalId);
  clearTimeout(nextPopTimeoutId);
  clearTimeout(hideFaceTimeoutId);

  countdownIntervalId = null;
  nextPopTimeoutId = null;
  hideFaceTimeoutId = null;
}

// Hides the current face and marks the hole as available again.
function hideActiveHole() {
  if (!activeHole) {
    return;
  }

  const activeImage = activeHole.querySelector("img");

  activeHole.classList.remove("up");
  activeHole.dataset.hit = "true";
  activeImage.classList.remove("hit");
  activeHole = null;
}

// Picks a random hole, preferring one that is different from the last active hole.
function chooseRandomHole() {
  const availableHoles = holes.filter((hole) => hole !== activeHole);
  const nextHolePool = availableHoles.length > 0 ? availableHoles : holes;
  const randomIndex = Math.floor(Math.random() * nextHolePool.length);

  return nextHolePool[randomIndex];
}

// Schedules the next pop-up cycle while the round is active.
function scheduleNextFace() {
  if (!gameRunning) {
    return;
  }

  const delay = randomBetween(MIN_DELAY, MAX_DELAY);

  nextPopTimeoutId = setTimeout(() => {
    showFace();
  }, delay);
}

// Shows one face, keeps it visible briefly, then hides it and schedules the next one.
function showFace() {
  if (!gameRunning) {
    return;
  }

  hideActiveHole();

  const hole = chooseRandomHole();
  const visibleTime = randomBetween(MIN_VISIBLE_TIME, MAX_VISIBLE_TIME);
  const image = hole.querySelector("img");

  activeHole = hole;
  activeHole.dataset.hit = "false";
  image.classList.remove("hit");
  activeHole.classList.add("up");

  hideFaceTimeoutId = setTimeout(() => {
    hideActiveHole();
    scheduleNextFace();
  }, visibleTime);
}

// Returns a fun message that matches the player's final score.
function getFunMessage(finalScore) {
  if (finalScore <= 5) {
    return "A few faces escaped, but your reflexes are warming up.";
  }

  if (finalScore <= 12) {
    return "Solid bomping. The faces definitely felt that.";
  }

  if (finalScore <= 18) {
    return "That was sharp work. FaceBomp may need tougher opponents.";
  }

  return "Total chaos for the photo gallery. Absolute FaceBomp legend.";
}

// Combines the numeric score with a fun message for the end-of-game text.
function buildFinalMessage(finalScore) {
  return `Final score: ${finalScore}. ${getFunMessage(finalScore)}`;
}

// Chooses a bigger finish sound for stronger rounds.
function getGameEndSound(finalScore) {
  return finalScore >= 15 ? gameEndHighSound : gameEndSound;
}

// Ends the current round and leaves the board in a clean idle state.
function endGame() {
  gameRunning = false;
  clearScheduledActions();
  hideActiveHole();
  startButton.textContent = "Start Game";
  finalMessage.textContent = buildFinalMessage(score);

  const endingSound = getGameEndSound(score);
  endingSound.currentTime = 0;
  endingSound.play();
}

// Resets the UI and state so every click on Start begins a fresh 30-second round.
function startGame() {
  clearScheduledActions();
  hideActiveHole();

  score = 0;
  timeLeft = GAME_DURATION;
  gameRunning = true;

  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = timeLeft;
  finalMessage.textContent = "Game on. Bomp every face you can.";
  startButton.textContent = "Playing...";

  startSound.currentTime = 0;
  startSound.play();

  countdownIntervalId = setInterval(() => {
    timeLeft -= 1;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  scheduleNextFace();
}

// Scores a hit only when the clicked image belongs to the active visible hole.
function handleFaceClick(event) {
  if (!gameRunning) {
    return;
  }

  const clickedImage = event.currentTarget;
  const clickedHole = clickedImage.parentElement;

  if (!clickedHole.classList.contains("up") || clickedHole.dataset.hit === "true") {
    return;
  }

  clickedHole.dataset.hit = "true";
  clickedImage.classList.add("hit");
  bompSound.currentTime = 0;
  bompSound.play();
  score += 1;
  scoreDisplay.textContent = score;

  // Hide the current face quickly after a successful click to keep the pace moving.
  clearTimeout(hideFaceTimeoutId);
  hideFaceTimeoutId = setTimeout(() => {
    if (activeHole === clickedHole) {
      hideActiveHole();
      scheduleNextFace();
    }
  }, HIT_HIDE_DELAY);
}

holes.forEach((hole) => {
  const image = hole.querySelector("img");
  hole.dataset.hit = "true";
  image.addEventListener("click", handleFaceClick);
});

startButton.addEventListener("click", startGame);
