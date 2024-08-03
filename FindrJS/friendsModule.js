// Define the initial friends array
const friends = [
    { name: "Alice", profilePic: "https://via.placeholder.com/100" },
    { name: "Bob", profilePic: "https://via.placeholder.com/100" },
  ];
  
  // Populate friends list
  export function populateFriendsList() {
    const friendsList = document.getElementById("friends-list");
    friendsList.innerHTML = ""; // Clear previous items
    friends.forEach((friend) => {
      const friendItem = document.createElement("div");
      friendItem.className = "friend-item";
      friendItem.innerHTML = `
        <img src="${friend.profilePic}" alt="${friend.name}" class="profile-pic">
        <p>${friend.name}</p>
      `;
      friendsList.appendChild(friendItem);
    });
  }
  
  // Save profile
  export function setupProfileForm() {
    document
      .getElementById("profile-form")
      ?.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
  
        if (username && email) {
          console.log(`Saved profile: ${username}, ${email}`); // Debugging
        } else {
          console.error("Profile data is incomplete."); // Debugging
        }
      });
  }
  
  // Search friend
  export function setupSearchFriend() {
    const searchFriend = document.getElementById("search-friend");
    searchFriend.addEventListener("input", () => {
      const searchText = searchFriend.value.toLowerCase();
      const filteredFriends = friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchText)
      );
      const friendsList = document.getElementById("friends-list");
      friendsList.innerHTML = ""; // Clear previous items
      filteredFriends.forEach((friend) => {
        const friendItem = document.createElement("div");
        friendItem.className = "friend-item";
        friendItem.innerHTML = `
          <img src="${friend.profilePic}" alt="${friend.name}" class="profile-pic">
          <p>${friend.name}</p>
        `;
        friendsList.appendChild(friendItem);
      });
    });
  }
  
  // Add friend
  export function setupAddFriend() {
    const addFriendButton = document.getElementById("add-friend");
    addFriendButton.addEventListener("click", () => {
      const newFriendName = prompt("Enter the name of the new friend:");
      const newFriendPic = prompt(
        "Enter the profile picture URL of the new friend:"
      );
  
      if (newFriendName && newFriendPic) {
        friends.push({ name: newFriendName, profilePic: newFriendPic });
        populateFriendsList();
        console.log(`Added new friend: ${newFriendName}`); // Debugging
      } else {
        console.error("Friend name or picture URL is missing."); // Debugging
      }
    });
  }
  