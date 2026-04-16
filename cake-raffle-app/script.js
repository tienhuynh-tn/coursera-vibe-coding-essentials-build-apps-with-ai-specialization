// Create an array to store every participant name.
const participants = [];
// Get the form element so we can react when someone submits a name.
const entryForm = document.getElementById("entry-form");
// Get the name input so we can read and clear the typed text.
const nameInput = document.getElementById("name-input");
// Get the list element so we can show all participants on the page.
const participantsList = document.getElementById("participants-list");
// Get the message area so we can show friendly feedback under the form.
const formMessage = document.getElementById("form-message");
// Get the winner display area so we can show the selected winner.
const winnerDisplay = document.getElementById("winner-display");
// Get the draw button so we can enable or disable it when needed.
const drawButton = document.getElementById("draw-button");
// Get the reset button so we can clear the raffle for a new round.
const resetButton = document.getElementById("reset-button");
// Get the empty-state message so we can hide it when names exist.
const emptyState = document.getElementById("empty-state");
// Store the default winner markup so it can be restored after a reset.
const defaultWinnerMarkup =
  '<span class="material-icons winner-icon" aria-hidden="true">cake</span><span>The winner will appear here after the draw.</span>';

// Create a function that updates the list and button state on the page.
function renderParticipants() {
  // Clear the visible list before rebuilding it from the array.
  participantsList.innerHTML = "";
  // Check whether there are any participants in the array.
  const hasParticipants = participants.length > 0;
  // Show or hide the empty-state message based on the array size.
  emptyState.style.display = hasParticipants ? "none" : "block";
  // Enable the draw button only when at least one name exists.
  drawButton.disabled = !hasParticipants;
  // Go through each stored participant name.
  participants.forEach(function (participantName) {
    // Create a new list item for the current participant.
    const listItem = document.createElement("li");
    // Put the participant name inside the new list item.
    listItem.textContent = participantName;
  // Add the new list item to the visible list.
  participantsList.appendChild(listItem);
  // Finish the current loop step for this participant.
  });
// Finish the function that redraws the participant list.
}

// Create a function that handles adding a new participant.
function addParticipant() {
  // Remove extra spaces from the beginning and end of the typed name.
  const newName = nameInput.value.trim();
  // Stop early and guide the user if the input is empty.
  if (newName === "") {
    // Show a helpful message when no name was entered.
    formMessage.textContent = "Please enter a name before adding a participant.";
    // Put the cursor back in the input for convenience.
    nameInput.focus();
    // Leave the function because there is nothing valid to add.
    return;
  // Finish the empty-input check.
  }
  // Check whether the same name already exists, ignoring uppercase and lowercase differences.
  const alreadyExists = participants.some(function (participantName) {
    // Compare the stored name with the new name in lowercase form.
    return participantName.toLowerCase() === newName.toLowerCase();
  // Finish the duplicate-name check.
  });
  // Stop early if the name is already in the raffle.
  if (alreadyExists) {
    // Tell the user that duplicate names are not allowed.
    formMessage.textContent = "That name is already in the raffle. Please add a different name.";
    // Highlight the input again so it is easy to edit.
    nameInput.focus();
    // Leave the function because we do not want duplicates.
    return;
  // Finish the duplicate-handling check.
  }
  // Add the valid new name to the participants array.
  participants.push(newName);
  // Tell the user that the name was added successfully.
  formMessage.textContent = newName + " has been added to the raffle.";
  // Clear the text input so the next name can be entered.
  nameInput.value = "";
  // Refresh the participant list and button state on the screen.
  renderParticipants();
  // Move the cursor back into the input for faster repeated entry.
  nameInput.focus();
// Finish the function that adds a participant.
}

// Create a function that clears the raffle so a new round can begin.
function resetRaffle() {
  // Set the number of items in the participants array to zero.
  participants.length = 0;
  // Restore the winner display to its starting message and icon.
  winnerDisplay.innerHTML = defaultWinnerMarkup;
  // Show a helpful message explaining that the raffle was reset.
  formMessage.textContent = "The raffle has been reset. Add names to start a new round.";
  // Clear any text that may still be inside the input box.
  nameInput.value = "";
  // Refresh the participant list and button state on the screen.
  renderParticipants();
  // Move the cursor back into the input for convenience.
  nameInput.focus();
// Finish the function that resets the raffle.
}

// Listen for the form submission when the add button is clicked or Enter is pressed.
entryForm.addEventListener("submit", function (event) {
  // Prevent the browser from refreshing the page after form submission.
  event.preventDefault();
  // Run the add-participant logic.
  addParticipant();
// Finish the form submit event handler.
});

// Listen for clicks on the draw button.
drawButton.addEventListener("click", function () {
  // Double-check that the array is not empty before drawing.
  if (participants.length === 0) {
    // Show a friendly message if someone clicks draw too early.
    winnerDisplay.innerHTML =
      '<span class="material-icons winner-icon" aria-hidden="true">cake</span><span>Add at least one participant before drawing a winner.</span>';
    // Leave the function because a winner cannot be chosen yet.
    return;
  // Finish the empty-raffle safety check.
  }
  // Generate a random whole-number position within the array.
  const randomIndex = Math.floor(Math.random() * participants.length);
  // Use the random position to get one winner name from the array.
  const winnerName = participants[randomIndex];
  // Show the winner with a Material cake icon and a party emoji.
  winnerDisplay.innerHTML =
    '<span class="material-icons winner-icon" aria-hidden="true">cake</span><span>Winner: ' +
    winnerName +
    " 🎉</span>";
// Finish the draw button click handler.
});

// Listen for clicks on the reset button.
resetButton.addEventListener("click", function () {
  // Run the reset logic to clear the current raffle round.
  resetRaffle();
// Finish the reset button click handler.
});

// Run the first screen update so the empty state and disabled button are correct.
renderParticipants();
