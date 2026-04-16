// Grab the RSVP form and the message area from the page.
const rsvpForm = document.querySelector("#rsvp-form");
const confirmationMessage = document.querySelector("#confirmation-message");
const pageBody = document.body;

if (rsvpForm && confirmationMessage) {
  rsvpForm.addEventListener("submit", (event) => {
    // Stop the page from refreshing so we can show a message right away.
    event.preventDefault();

    // Read the values the guest entered into the form.
    const formData = new FormData(rsvpForm);
    const email = formData.get("email");
    const attendance = formData.get("attendance");

    // Show a more festive message when the guest is attending.
    if (attendance === "attending" || attendance === "yes") {
      // Turn on the animated party background for guests who are coming.
      pageBody.classList.remove("not-attending-background");
      pageBody.classList.add("attending-background");
      confirmationMessage.textContent = `🎉 Amazing, ${email}! You're attending the GIF Gala. Get ready to bring your favorite meme to life!`;
    } else {
      // Swap to the alternate background if the guest is not attending.
      pageBody.classList.remove("attending-background");
      pageBody.classList.add("not-attending-background");
      confirmationMessage.textContent = `Thanks, ${email}. Your RSVP has been recorded, and we'll miss you at the GIF Gala.`;
    }

    // Clear the form after the response has been shown.
    rsvpForm.reset();
  });
}
