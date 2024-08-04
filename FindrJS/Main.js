import { updateCountdown } from "./countdownFunctions.js";
import { hamburgerMenu } from "./hamburgerMenuFunctions.js"; // adds hamburger menu functionality
import { PlanetSwipe } from "./planetCardFunctions.js";
import {
  populateFriendsList,
  setupProfileForm,
  setupSearchFriend,
  setupAddFriend,
} from "./friendsModule.js";
import { planets, renderLeaderboard } from "./leaderboardModule.js";

document.addEventListener("DOMContentLoaded", () => {
  // Countdown Timer Functionality
  updateCountdown(); // Initial call to display immediately

  // Planet Card Swipping Funcitonality
  const planetCardElement = document.getElementById("planet-card");
  const arrowRightElement = document.getElementById("arrow-right");
  const arrowLeftElement = document.getElementById("arrow-left");
  const planetSwipe = new PlanetSwipe(planetCardElement, arrowRightElement, arrowLeftElement);

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

