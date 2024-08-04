// Function to load saved planets from local storage and display them
function loadSavedPlanets() {
    const savedPlanets = JSON.parse(localStorage.getItem('savedPlanets')) || [];
    const planetGrid = document.getElementById('planet-grid');

    savedPlanets.forEach(planet => {
        const planetCard = document.createElement('div');
        planetCard.classList.add('planet-card');
        
        planetCard.innerHTML = `
            <img src="${planet.img}" alt="${planet.name}">
            <h2>${planet.name}</h2>
            <p>${planet.info}</p>
            <button class="view-details">View Details</button>
            <button class="remove" onclick="removePlanet('${planet.name}')">Remove</button>
        `;

        planetGrid.appendChild(planetCard);
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
