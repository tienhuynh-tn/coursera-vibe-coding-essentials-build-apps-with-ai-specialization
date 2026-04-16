// Select every drum button so the same click logic can be reused for each sound.
const drumButtons = document.querySelectorAll(".drum-button");

// This helper plays the audio element that matches the clicked button.
function playSound(soundName, button) {
  const audio = document.getElementById(`${soundName}-audio`);

  // Exit early if the matching audio element does not exist in the page.
  if (!audio) {
    return;
  }

  // Restart the sound so repeated clicks always play from the beginning.
  audio.currentTime = 0;
  audio.play();

  // Add a temporary visual state so the user can see which button was triggered.
  button.classList.add("is-playing");
  window.setTimeout(() => {
    button.classList.remove("is-playing");
  }, 120);
}

// Attach a click listener to every button and play the sound named in data-sound.
drumButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const soundName = button.dataset.sound;
    playSound(soundName, button);
  });
});
