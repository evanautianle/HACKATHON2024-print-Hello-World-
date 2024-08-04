
// Function to enable editing of the bio
function editBio() {
    const bio = document.getElementById('bio-text').innerText;
    document.getElementById('bio').value = bio;
    document.getElementById('bio-text').style.display = 'none';
    document.getElementById('bio').style.display = 'block';
    document.getElementById('edit-bio-btn').style.display = 'none';
    document.getElementById('save-bio-btn').style.display = 'inline';
}

// Function to save the bio to local storage and update the display
function saveBio() {
    const bio = document.getElementById('bio').value;
    localStorage.setItem('profileBio', bio);
    document.getElementById('bio-text').innerText = bio;
    document.getElementById('bio-text').style.display = 'block';
    document.getElementById('bio').style.display = 'none';
    document.getElementById('edit-bio-btn').style.display = 'inline';
    document.getElementById('save-bio-btn').style.display = 'none';
}

// Function to load the name and bio from local storage
function loadProfile() {
    const name = localStorage.getItem('profileName');
    if (name) {
        document.getElementById('profile-name').innerText = name;
    }

    const bio = localStorage.getItem('profileBio');
    if (bio) {
        document.getElementById('bio-text').innerText = bio;
    }
}

// Load name and bio on page load
window.onload = function() {
    loadProfile();
}

// Profile.js

function editEmail() {
    document.getElementById('profile-email-text').style.display = 'none';
    document.getElementById('profile-email-input').style.display = 'inline';
    document.getElementById('edit-email-btn').style.display = 'none';
    document.getElementById('save-email-btn').style.display = 'inline';
}

function saveEmail() {
    const emailInput = document.getElementById('profile-email-input');
    document.getElementById('profile-email-text').textContent = emailInput.value;
    document.getElementById('profile-email-text').style.display = 'inline';
    emailInput.style.display = 'none';
    document.getElementById('edit-email-btn').style.display = 'inline';
    document.getElementById('save-email-btn').style.display = 'none';

    // Here you can add code to save the email to a server or local storage if needed.
}

// Profile.js

function editName() {
    document.getElementById('profile-name-text').style.display = 'none';
    document.getElementById('profile-name-input').style.display = 'inline';
    document.getElementById('edit-name-btn').style.display = 'none';
    document.getElementById('save-name-btn').style.display = 'inline';
}

function saveName() {
    const nameInput = document.getElementById('profile-name-input');
    document.getElementById('profile-name-text').textContent = nameInput.value;
    document.getElementById('profile-name-text').style.display = 'inline';
    nameInput.style.display = 'none';
    document.getElementById('edit-name-btn').style.display = 'inline';
    document.getElementById('save-name-btn').style.display = 'none';

    // Here you can add code to save the email to a server or local storage if needed.
}
