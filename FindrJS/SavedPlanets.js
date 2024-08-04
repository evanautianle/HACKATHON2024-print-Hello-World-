// Function to load saved planets from local storage and display them
function loadSavedPlanets() {
    const savedPlanets = JSON.parse(localStorage.getItem('savedPlanets')) || [];
    const planetGrid = document.getElementById('planet-grid');
    const popup = document.getElementById('planet-popup');
    const closePopup = document.getElementById('close-popup');

    savedPlanets.forEach(planet => {
        const planetCard = document.createElement('div');
        planetCard.classList.add('planet-card');
        
        planetCard.innerHTML = `
            <img src="${planet.img}" alt="${planet.name}">
            <h2>${planet.name}</h2>
            <p>${planet.info}</p>
            <button class="view-details" data-planet='${JSON.stringify(planet)}'>View Details</button>
            <button class="remove" onclick="removePlanet('${planet.name}')">Remove</button>
        `;

        planetGrid.appendChild(planetCard);
    });

    // Show popup with details
    planetGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details')) {
            const planet = JSON.parse(event.target.getAttribute('data-planet'));
            
            document.getElementById('popup-planet-name').innerText = planet.name;
            document.getElementById('popup-planet-image').src = planet.img;
            document.getElementById('popup-planet-info').innerText = planet.info;
            document.getElementById('popup-planet-humidity').innerText = planet.humidity || 'N/A';
            document.getElementById('popup-planet-temperature').innerText = planet.temperature || 'N/A';
            document.getElementById('popup-planet-population').innerText = planet.population || 'N/A';
            document.getElementById('popup-planet-fun-fact').innerText = planet.funFact || 'N/A';
            document.getElementById('popup-planet-phone').innerText = planet.phone || 'N/A';
            document.getElementById('popup-planet-email').innerText = planet.email || 'N/A';
            document.getElementById('popup-planet-currency-ratio').innerText = planet.currencyRatio || 'N/A';
            document.getElementById('popup-planet-median-income').innerText = planet.medianIncome || 'N/A';
            document.getElementById('popup-planet-terrain').innerText = planet.terrain || 'N/A';
            document.getElementById('popup-planet-rating').innerText = planet.rating || 'N/A';
            document.getElementById('popup-planet-civilization-status').innerText = planet.civilizationStatus || 'N/A';
            document.getElementById('popup-planet-languages').innerText = planet.languages || 'N/A';
            document.getElementById('popup-planet-education-status').innerText = planet.educationStatus || 'N/A';
            document.getElementById('popup-planet-survival-rate').innerText = planet.survivalRate || 'N/A';

            popup.style.display = 'block';
        }
    });

    // Close popup functionality
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
}

// Function to remove a planet from local storage
function removePlanet(name) {
    let savedPlanets = JSON.parse(localStorage.getItem('savedPlanets')) || [];
    savedPlanets = savedPlanets.filter(planet => planet.name !== name);
    localStorage.setItem('savedPlanets', JSON.stringify(savedPlanets));
    document.getElementById('planet-grid').innerHTML = '';
    loadSavedPlanets();
}

// Load saved planets when the page loads
document.addEventListener('DOMContentLoaded', loadSavedPlanets);
