// Function to enable editing of the name
function editName() {
    const name = document.getElementById('profile-name').innerText;
    document.getElementById('name-input').value = name;
    document.getElementById('profile-name').style.display = 'none';
    document.getElementById('name-input').style.display = 'inline';
    document.getElementById('edit-name-btn').style.display = 'none';
    document.getElementById('save-name-btn').style.display = 'inline';
}

// Function to save the name to local storage and update the display
function saveName() {
    const name = document.getElementById('name-input').value;
    localStorage.setItem('profileName', name);
    document.getElementById('profile-name').innerText = name;
    document.getElementById('profile-name').style.display = 'block';
    document.getElementById('name-input').style.display = 'none';
    document.getElementById('edit-name-btn').style.display = 'inline';
    document.getElementById('save-name-btn').style.display = 'none';
}

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
