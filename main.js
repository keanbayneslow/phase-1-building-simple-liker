// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector('#modal');
  const emptyHearts = document.querySelectorAll('.like-glyph');

  modal.classList.add('hidden');

  emptyHearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          // On success, change the heart to full and add the activated class
          heart.classList.add("activated-heart");
          heart.innerText = FULL_HEART;
        })
        .catch((error) => {
          // On error, display the error modal and message
          const modalMessage = document.querySelector("#modal-message");
          modalMessage.innerText = error;
          modal.classList.remove("hidden");

          // Hide the modal after 3 seconds
          setTimeout(() => {
            modal.classList.add("hidden");
          }, 3000);
        });
    });
  });

  const fullHearts = document.querySelectorAll('.activated-heart');

  fullHearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      heart.classList.remove("activated-heart");
      heart.innerText = EMPTY_HEART;
    });
  });
});
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
