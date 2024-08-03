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
  new PlanetSwipe(planetCardElement, arrowRightElement, arrowLeftElement);

  // Friends List Functionality
  populateFriendsList();
  setupProfileForm();
  setupSearchFriend();
  setupAddFriend();

  // Initial rendering of the leaderboard
  renderLeaderboard(planets);
});
