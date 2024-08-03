document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer Functionality
    const countdownElement = document.getElementById('timer');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const menu = document.getElementById('menu');
    const darkenOverlay = document.getElementById('darken-overlay');
    const planetCard = document.getElementById('planet-card');

    // Ensure darkenOverlay exists
    if (!darkenOverlay) {
        console.warn('Darken overlay element not found.');
    }

    // Calculate the target time
    function calculateTargetTime() {
        const now = new Date();
        const currentDay = now.getDay();
        const daysUntilSunday = (7 - currentDay) % 7; // Days until the next Sunday
        const targetSunday = new Date(now);
        targetSunday.setDate(now.getDate() + daysUntilSunday);
        targetSunday.setHours(17, 0, 0, 0); // Set to 5 PM NZT

        const targetTime = new Date(targetSunday.getTime() + 2 * 24 * 60 * 60 * 1000); // Add 2 days

        return targetTime;
    }

    const targetTime = calculateTargetTime();

    // Update countdown every second
    function updateCountdown() {
        const now = new Date();
        const timeRemaining = targetTime - now;

        if (timeRemaining <= 0) {
            countdownElement.textContent = '00:00:00';
            clearInterval(countdownInterval);
            return;
        }

        const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

        countdownElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display immediately

    // Hamburger Menu Functionality
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('open');
        menu.classList.toggle('show');
        if (darkenOverlay) {
            darkenOverlay.classList.toggle('darken'); // Add or remove the darken class
        }
    });

    // Swipe Functionality for Planet Cards
    let startX;
    let isSwiping = false;
    const swipeThreshold = 100; // Minimum distance to consider a swipe

    const planetData = [
        { name: 'Celestara', img: 'images/planet0.png', info: 'Celestara is a captivating planet known for its ethereal beauty and serene environment. It lies within a distant star system, orbited by three moons that create a mesmerizing celestial dance in its night sky.', humidity: '60%', temperature: '18°C', population: '2.2 billion', funFact: 'Known for its serene beauty.' },
        { name: 'Aetherion', img: 'images/planet1.png', info: 'Aetherion has multicolored clouds and a vast ring system composed of shimmering ice crystals. Its atmosphere is rich in exotic gases, creating dazzling auroras that dance across the sky, visible even from its numerous, diverse moons.', humidity: '70%', temperature: '25°C', population: '17 million', funFact: 'Home to dazzling auroras.' },
        { name: 'Nebularis', img: 'images/planet2.png', info: 'Nebularis is a mysterious planet shrouded in dense, colorful nebulae, giving it an ever-shifting, cosmic appearance. Its surface, covered in dark, crystalline minerals, reflects the nebulae\’s light. Currently uninhabited.' },
        { name: 'Stellarion', img: 'images/planet3.png', info: 'Often called the Red Planet due to its reddish appearance.' },
        { name: 'Cat Girl Planet', img: 'images/planet7.png', info: 'The largest planet in our solar system. Known for its Great Red Spot.' },
        { name: 'Luminara', img: 'images/planet10.png', info: 'Famous for its stunning ring system.' },
        { name: 'Planet Evan', img: 'images/evanplanet.png', info: 'Evan.' },
        { name: 'Gambit', img: 'images/Gambit.png', info: 'Hes him' },
        { name: 'ChatGpt', img: 'images/Chatgpt.png', info: 'Our saviour' },
        { name: 'Diddy Planet', img: 'images/Diddy.png', info: 'Named after the american rapper, record producer and record executive, P Diddy' },
        { name: 'Cooked Planet', img: 'images/Cooked.png', info: 'Lava planet where viallian arcs begin. Its litterally cooked' },
    ];
    let currentPlanetIndex = 0;

    function loadPlanet(index) {
        if (planetData.length === 0) {
            console.warn('No planet data available.');
            return;
        }
        const planet = planetData[index];
        document.getElementById('planet-image').src = planet.img;
        document.getElementById('planet-name').textContent = planet.name;
        document.getElementById('planet-info').textContent = planet.info;
        document.getElementById('planet-humidity').textContent = planet.humidity;
        document.getElementById('planet-temperature').textContent = planet.temperature;
        document.getElementById('planet-population').textContent = planet.population;
        document.getElementById('planet-fun-fact').textContent = planet.funFact;
    }
    
    const arrowLeft = document.getElementById('arrow-left');
    const arrowRight = document.getElementById('arrow-right');
    let hasSwiped = false; // Flag to track if a swipe has occurred

    function hideArrows() {
        arrowLeft.classList.add('fade-out');
        arrowRight.classList.add('fade-out');
    }

    function handleSwipe(startX, endX) {
        if (endX - startX > swipeThreshold) {
            swipe('right'); // Swipe right to save
        } else if (startX - endX > swipeThreshold) {
            swipe('left'); // Swipe left to delete
        }

        if (!hasSwiped) {
            hideArrows(); // Fade out arrows after the first swipe
            hasSwiped = true; // Set flag to true
        }
    }


    function swipe(direction) {
        const offset = direction === 'left' ? '-100%' : '100%';
        planetCard.style.transform = `translateX(${offset})`;

        setTimeout(() => {
            planetCard.style.transition = 'none';
            planetCard.style.transform = 'translateX(0)';
            planetCard.style.transition = 'transform 0.3s ease-out';

            if (direction === 'left') {
                deletePlanet();
            } else if (direction === 'right') {
                savePlanet();
            }
            currentPlanetIndex = (direction === 'left')
                ? (currentPlanetIndex + 1) % planetData.length
                : (currentPlanetIndex - 1 + planetData.length) % planetData.length;
            loadPlanet(currentPlanetIndex);
        }, 300);
    }

    function deletePlanet() {
        console.log('Deleting planet:', planetData[currentPlanetIndex]); // Debugging
        planetData.splice(currentPlanetIndex, 1);

        if (planetData.length > 0) {
            // Move to the next planet if available
            currentPlanetIndex = currentPlanetIndex % planetData.length;
            loadPlanet(currentPlanetIndex);
        } else {
            // If no more planets, clear the display
            document.getElementById('planet-image').src = '';
            document.getElementById('planet-name').textContent = '';
            document.getElementById('planet-info').textContent = 'No more planets available.';
        }
    }

    function savePlanet() {
        const planet = planetData[currentPlanetIndex];
        let savedPlanets = JSON.parse(localStorage.getItem('savedPlanets')) || [];

        // Check if the planet is already saved
        if (!savedPlanets.some(p => p.name === planet.name)) {
            savedPlanets.push(planet);
            localStorage.setItem('savedPlanets', JSON.stringify(savedPlanets));
            console.log(`Saved planet: ${planet.name}`); // Debugging
        } else {
            console.log(`Planet ${planet.name} is already saved.`); // Debugging
        }
    }

    // Handle mouse events
    planetCard.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isSwiping = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (isSwiping) {
            // Optional: Add logic for dragging feedback if needed
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (isSwiping) {
            isSwiping = false;
            handleSwipe(startX, e.clientX);
        }
    });

    // Handle touch events
    planetCard.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
    });

    planetCard.addEventListener('touchmove', (e) => {
        if (isSwiping) {
            // Optional: Add logic for dragging feedback if needed
        }
    });

    planetCard.addEventListener('touchend', (e) => {
        if (isSwiping) {
            isSwiping = false;
            handleSwipe(startX, e.changedTouches[0].clientX);
        }
    });

    // Initial load
    loadPlanet(currentPlanetIndex);

    // Friends List Functionality
    const friends = [
        { name: 'Alice', profilePic: 'https://via.placeholder.com/100' },
        { name: 'Bob', profilePic: 'https://via.placeholder.com/100' }
    ];

    function populateFriendsList() {
        const friendsList = document.getElementById('friends-list');
        friendsList.innerHTML = ''; // Clear previous items
        friends.forEach(friend => {
            const friendItem = document.createElement('div');
            friendItem.className = 'friend-item';
            friendItem.innerHTML = `
                <img src="${friend.profilePic}" alt="${friend.name}" class="profile-pic">
                <p>${friend.name}</p>
            `;
            friendsList.appendChild(friendItem);
        });
    }

    populateFriendsList();

    // Save Profile Functionality
    document.getElementById('profile-form')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        if (username && email) {
            console.log(`Saved profile: ${username}, ${email}`); // Debugging
        } else {
            console.error('Profile data is incomplete.'); // Debugging
        }
    });

    // Search Friend Functionality
    const searchFriend = document.getElementById('search-friend');
    searchFriend.addEventListener('input', () => {
        const searchText = searchFriend.value.toLowerCase();
        const filteredFriends = friends.filter(friend => friend.name.toLowerCase().includes(searchText));
        const friendsList = document.getElementById('friends-list');
        friendsList.innerHTML = ''; // Clear previous items
        filteredFriends.forEach(friend => {
            const friendItem = document.createElement('div');
            friendItem.className = 'friend-item';
            friendItem.innerHTML = `
                <img src="${friend.profilePic}" alt="${friend.name}" class="profile-pic">
                <p>${friend.name}</p>
            `;
            friendsList.appendChild(friendItem);
        });
    });

    // Add Friend Functionality
    const addFriendButton = document.getElementById('add-friend');
    addFriendButton.addEventListener('click', () => {
        const newFriendName = prompt('Enter the name of the new friend:');
        const newFriendPic = prompt('Enter the profile picture URL of the new friend:');

        if (newFriendName && newFriendPic) {
            friends.push({ name: newFriendName, profilePic: newFriendPic });
            populateFriendsList();
            console.log(`Added new friend: ${newFriendName}`); // Debugging
        } else {
            console.error('Friend name or picture URL is missing.'); // Debugging
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Example planet data, replace this with real data if available
    const planets = [
        { name: 'Celestara', population: 1234 },
        { name: 'Aetherion', population: 987 },
        { name: 'Nebularis', population: 654 },
        { name: 'Stellarion', population: 321 },
        { name: 'Luminara', population: 543 }
    ];

    function renderLeaderboard(planets) {
        const leaderboardElement = document.getElementById('leaderboard');
        leaderboardElement.innerHTML = ''; // Clear previous content

        planets.forEach(planet => {
            const entry = document.createElement('div');
            entry.className = 'leaderboard-entry';
            entry.innerHTML = `
                <span class="planet-name">${planet.name}</span>
                <span class="population">${planet.population.toLocaleString()}</span>
            `;
            leaderboardElement.appendChild(entry);
        });
    }

    // Initial rendering of the leaderboard
    renderLeaderboard(planets);
});
