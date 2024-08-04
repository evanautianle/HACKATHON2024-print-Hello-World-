import { updateCountdown } from "./countdownFunctions.js";
import { hamburgerMenu } from "./hamburgerMenuFunctions.js";
import { PlanetSwipe } from "./planetCardFunctions.js";
import {
  populateFriendsList,
  setupProfileForm,
  setupSearchFriend,
  setupAddFriend,
} from "./friendsModule.js";
import { planets, renderLeaderboard } from "./leaderboardModule.js";

// Function to show save message
function showSaveMessage() {
    const messageElement = document.createElement("div");
    messageElement.textContent = "Planet saved to favourites";
    messageElement.style.position = "fixed";
    messageElement.style.top = "86%";
    messageElement.style.left = "50%";
    messageElement.style.transform = "translate(-50%, 0)";
    messageElement.style.padding = "10px 20px";
    messageElement.style.backgroundColor = "#4CAF50";
    messageElement.style.color = "#fff";
    messageElement.style.borderRadius = "5px";
    messageElement.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    messageElement.style.zIndex = "1000";
    messageElement.style.opacity = "0";
    messageElement.style.transition = "opacity 0.5s ease-in-out";

    document.body.appendChild(messageElement);

    void messageElement.offsetWidth; // Trigger a reflow

    messageElement.style.opacity = "1";

    setTimeout(() => {
        messageElement.style.opacity = "0";
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 2000);
}

// Function to show remove message
function showRemoveMessage() {
    const messageElement = document.createElement("div");
    messageElement.textContent = "Planet removed";
    messageElement.style.position = "fixed";
    messageElement.style.top = "86%";
    messageElement.style.left = "50%";
    messageElement.style.transform = "translate(-50%, 0)";
    messageElement.style.padding = "10px 20px";
    messageElement.style.backgroundColor = "#f44336";
    messageElement.style.color = "#fff";
    messageElement.style.borderRadius = "5px";
    messageElement.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    messageElement.style.zIndex = "1000";
    messageElement.style.opacity = "0";
    messageElement.style.transition = "opacity 0.5s ease-in-out";

    document.body.appendChild(messageElement);

    void messageElement.offsetWidth; // Trigger a reflow

    messageElement.style.opacity = "1";

    setTimeout(() => {
        messageElement.style.opacity = "0";
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
    // Countdown Timer Functionality
    updateCountdown();

    // Planet Card Swiping Functionality
    const planetCardElement = document.getElementById("planet-card");
    const arrowRightElement = document.getElementById("arrow-right");
    const arrowLeftElement = document.getElementById("arrow-left");
    const planetSwipe = new PlanetSwipe(planetCardElement, arrowRightElement, arrowLeftElement);

    // Add event listeners to show messages
    planetSwipe.showSaveMessage = showSaveMessage;
    planetSwipe.showRemoveMessage = showRemoveMessage;

    // Friends List Functionality
    populateFriendsList();
    setupProfileForm();
    setupSearchFriend();
    setupAddFriend();

    // Initial rendering of the leaderboard
    renderLeaderboard(planets);
});

document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    fetch('upload.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              document.getElementById('profile-picture').src = data.newProfilePictureUrl;
          } else {
              alert('Upload failed.');
          }
      });
});
