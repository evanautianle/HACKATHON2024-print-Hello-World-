document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('timer');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const menu = document.getElementById('menu');
    const darkenOverlay = document.getElementById('darken-overlay');

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

    // Opens the hamburger menu
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('open');
        menu.classList.toggle('show');
        darkenOverlay.classList.toggle('darken'); // Add or remove the darken class
    });

    let startX;
    let isSwiping = false;
    const swipeThreshold = 100; // Minimum distance to consider a swipe

    const planetCard = document.getElementById('planet-card');
    const planetData = [
        { name: 'Lucasland', img: 'images/planet0.png', info: 'Closest planet to the Sun. It has a very thin atmosphere.' },
        { name: 'GayPridePlanet', img: 'images/planet1.png', info: 'Known as Earth\'s sister planet due to its similar size and composition.' },
        { name: 'poopoopeepee', img: 'images/planet2.png', info: 'The only planet known to support life. It has a rich atmosphere and abundant water.' },
        { name: 'Skibidi', img: 'images/planet3.png', info: 'Often called the Red Planet due to its reddish appearance.' },
        { name: 'CatGirlPlanet', img: 'images/planet4.png', info: 'The largest planet in our solar system. Known for its Great Red Spot.' },
        { name: 'RickandMorty', img: 'images/planet5.png', info: 'Famous for its stunning ring system.' },
        { name: 'lgbtliberationland', img: 'images/planet6.png', info: 'Known for its unique tilt and being an ice giant.' },
        { name: 'gedagedigadago', img: 'images/planet7.png', info: 'The farthest planet from the Sun. Known for its deep blue color.' }
    ];
    let currentPlanetIndex = 0;

    function loadPlanet(index) {
        const planet = planetData[index];
        document.getElementById('planet-image').src = planet.img;
        document.getElementById('planet-name').textContent = planet.name;
        document.getElementById('planet-info').textContent = planet.info;
    }

    function handleSwipe(startX, endX) {
        if (endX - startX > swipeThreshold) {
            swipe('right'); // Swipe right
        } else if (startX - endX > swipeThreshold) {
            swipe('left'); // Swipe left
        }
    }

    function swipe(direction) {
        const offset = direction === 'left' ? '-100%' : '100%';
        planetCard.style.transform = `translateX(${offset})`;

        setTimeout(() => {
            planetCard.style.transition = 'none';
            planetCard.style.transform = 'translateX(0)';
            planetCard.style.transition = 'transform 0.3s ease-out';
            currentPlanetIndex = (direction === 'left') 
                ? (currentPlanetIndex + 1) % planetData.length 
                : (currentPlanetIndex - 1 + planetData.length) % planetData.length;
            loadPlanet(currentPlanetIndex);
        }, 300);
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

    // Handle user creation form submission
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        fetch('/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }); 
});

