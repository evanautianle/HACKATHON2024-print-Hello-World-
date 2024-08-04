export class PlanetSwipe {
    constructor(planetCardElement, arrowRightElement, arrowLeftElement) {
        this.planetCard = planetCardElement;
        this.arrowRight = arrowRightElement;
        this.arrowLeft = arrowLeftElement;
        this.startX = 0;
        this.isSwiping = false;
        this.swipeThreshold = 100;
        this.hasSwiped = false;
        this.currentPlanetIndex = 0;

        // Initialize local storage array
        this.savedPlanets = JSON.parse(localStorage.getItem('savedPlanets')) || [];

        this.planetData = [
                { 
                    name: 'Celestara', 
                    img: 'PlanetImages/planet0.png', 
                    info: 'Celestara is a captivating planet known for its ethereal beauty and serene environment. It lies within a distant star system, orbited by three moons that create a mesmerizing celestial dance in its night sky.', 
                    humidity: '60%', 
                    temperature: '18°C', 
                    population: '2.2 billion', 
                    funFact: 'Known for its serene beauty.', 
                    phone: '+1 234 567 8901',
                    email: 'contact@celestara.com',
                    currencyRatio: 0.8, // 1 USD = 0.8 Celestaran Units
                    medianIncome: '20,000 Celestaran Units',
                    terrain: 'Lush forests and serene lakes',
                    rating: 4.7,
                    civilizationStatus: 'Advanced',
                    internationalLanguages: ['Celestaran', 'Common Galactic'],
                    educationStatus: 'High education quality',
                    survivalRate: '95%' // Suitable for human life with advanced facilities
                },
                { 
                    name: 'Aetherion', 
                    img: 'PlanetImages/planet1.png', 
                    info: 'Aetherion has multicolored clouds and a vast ring system composed of shimmering ice crystals. Its atmosphere is rich in exotic gases, creating dazzling auroras that dance across the sky, visible even from its numerous, diverse moons.', 
                    humidity: '70%', 
                    temperature: '25°C', 
                    population: '17 million', 
                    funFact: 'Home to dazzling auroras.', 
                    phone: '+2 345 678 9012',
                    email: 'info@aetherion.org',
                    currencyRatio: 1.2, // 1 USD = 1.2 Aetherian Credits
                    medianIncome: '15,000 Aetherian Credits',
                    terrain: 'Ice-covered rings and gas clouds',
                    rating: 4.5,
                    civilizationStatus: 'Developed',
                    internationalLanguages: ['Aetherian', 'Universal Basic'],
                    educationStatus: 'Good education quality',
                    survivalRate: '75%' // Harsh conditions but habitable with advanced technology
                },
                { 
                    name: 'Nebularis', 
                    img: 'PlanetImages/planet2.png', 
                    info: 'Nebularis is a mysterious planet shrouded in dense, colorful nebulae, giving it an ever-shifting, cosmic appearance. Its surface, covered in dark, crystalline minerals, reflects the nebulae’s light. Currently uninhabited.', 
                    humidity: '90%', 
                    temperature: '12°C', 
                    population: '0', 
                    funFact: 'Nebularis\' crystal exterior makes it painful to walk on.', 
                    phone: 'N/A',
                    email: 'N/A',
                    currencyRatio: 0, // No currency
                    medianIncome: 'N/A',
                    terrain: 'Crystalline and nebula-covered',
                    rating: 3.0,
                    civilizationStatus: 'Uninhabited',
                    internationalLanguages: 'N/A',
                    educationStatus: 'N/A',
                    survivalRate: '10%' // Extremely hostile environment, not suitable for life
                },
                { 
                    name: 'Stellarion', 
                    img: 'PlanetImages/planet3.png', 
                    info: 'Often called the Red Planet due to its reddish appearance.', 
                    humidity: '30%', 
                    temperature: '20°C', 
                    population: '1.1 billion', 
                    funFact: 'Unbelievably hot, population of alien species with magma bodies.', 
                    phone: '+3 456 789 0123',
                    email: 'contact@stellarion.org',
                    currencyRatio: 0.5, // 1 USD = 0.5 Stellar Credits
                    medianIncome: '25,000 Stellar Credits',
                    terrain: 'Volcanic and rocky',
                    rating: 4.2,
                    civilizationStatus: 'Advanced',
                    internationalLanguages: ['Stellarion', 'Magma Common'],
                    educationStatus: 'High education quality',
                    survivalRate: '80%' // Harsh conditions with advanced technology for survival
                },
                { 
                    name: 'Cat Girl Planet', 
                    img: 'PlanetImages/planet7.png', 
                    info: 'The largest planet in our solar system. Known for its Great Red Spot.', 
                    humidity: '40%', 
                    temperature: '22°C', 
                    population: '5 billion', 
                    funFact: 'Cat girls aren\'t as nice as you might think.', 
                    phone: '+4 567 890 1234',
                    email: 'contact@catgirlplanet.net',
                    currencyRatio: 1.0, // 1 USD = 1 Cat Dollar
                    medianIncome: '30,000 Cat Dollars',
                    terrain: 'Gaseous with storm systems',
                    rating: 4.8,
                    civilizationStatus: 'Highly Developed',
                    internationalLanguages: ['Catish', 'Interplanetary English'],
                    educationStatus: 'Excellent education quality',
                    survivalRate: '90%' // Suitable for life with advanced technology and infrastructure
                },
                { 
                    name: 'Luminara', 
                    img: 'PlanetImages/planet10.png', 
                    info: 'Famous for its stunning ring system.', 
                    humidity: '55%', 
                    temperature: '15°C', 
                    population: '3.3 billion', 
                    funFact: 'Has a stunning ring system.', 
                    phone: '+5 678 901 2345',
                    email: 'info@luminara.org',
                    currencyRatio: 1.1, // 1 USD = 1.1 Luminara Credits
                    medianIncome: '18,000 Luminara Credits',
                    terrain: 'Rocky with impressive ring system',
                    rating: 4.6,
                    civilizationStatus: 'Developed',
                    internationalLanguages: ['Luminara', 'Standard Galactic'],
                    educationStatus: 'Good education quality',
                    survivalRate: '85%' // Suitable for life with decent infrastructure
                },
                { 
                    name: 'Planet Evan', 
                    img: 'PlanetImages/evanplanet.png', 
                    info: 'Evan.', 
                    humidity: '50%', 
                    temperature: '16°C', 
                    population: '1 million', 
                    funFact: 'Named after its discoverer, Evan.', 
                    phone: '+6 789 012 3456',
                    email: 'info@planet-evan.com',
                    currencyRatio: 0.9, // 1 USD = 0.9 Evanian Units
                    medianIncome: '12,000 Evanian Units',
                    terrain: 'Varied with mountainous regions',
                    rating: 4.0,
                    civilizationStatus: 'Emerging',
                    internationalLanguages: ['Evanian', 'Interstellar English'],
                    educationStatus: 'Moderate education quality',
                    survivalRate: '70%' // Habitable but basic infrastructure
                },
                { 
                    name: 'Gambit', 
                    img: 'PlanetImages/Gambit.png', 
                    info: 'Hes him', 
                    humidity: '45%', 
                    temperature: '19°C', 
                    population: '2.5 million', 
                    funFact: 'Home to strategic thinkers.', 
                    phone: '+7 890 123 4567',
                    email: 'contact@gambit.org',
                    currencyRatio: 1.3, // 1 USD = 1.3 Gambit Coins
                    medianIncome: '22,000 Gambit Coins',
                    terrain: 'Strategic mountain ranges',
                    rating: 4.3,
                    civilizationStatus: 'Advanced',
                    internationalLanguages: ['Gambitian', 'Strategic Standard'],
                    educationStatus: 'High education quality',
                    survivalRate: '85%' // Advanced conditions suitable for life
                },
                {
                    name: 'Freak Planet', 
                    img: 'PlanetImages/Freaky.png', 
                    info: 'Freak Planet is a freaky world characterized by its freaky weather patterns and freaky geological formations. It orbits a freaky star system, resulting in freaky light shows and freaky landscapes.', 
                    humidity: '69%', 
                    temperature: '69°C', 
                    population: '69 million', 
                    funFact: 'I went there and everyone knew you.', 
                    phone: '+6 969 696 9696',
                    email: 'contact@freakplanet.com',
                    currencyRatio: 6.8, // 1 USD = 6.9 Freakian Units
                    medianIncome: '6.9,000 Freakian Units',
                    terrain: 'Color-shifting deserts and luminescent caverns',
                    rating: 6.9,
                    civilizationStatus: 'Primitive',
                    internationalLanguages: ['Freakian', 'Basic Galactic'],
                    educationStatus: 'freaky educational facilities',
                    survivalRate: '40%' // freaky environment, survival challenging without specialized equipment
                },
                {
                    name: 'ChatGpt', 
                    img: 'PlanetImages/Chatgpt.png', 
                    info: 'Our saviour', 
                    humidity: '60%', 
                    temperature: '21°C', 
                    population: '8 billion', 
                    funFact: 'Known for its advanced AI.', 
                    phone: '+8 901 234 5678',
                    email: 'support@chatgpt.ai',
                    currencyRatio: 0.7, // 1 USD = 0.7 Chat Credits
                    medianIncome: '50,000 Chat Credits',
                    terrain: 'Technologically advanced landscapes',
                    rating: 4.9,
                    civilizationStatus: 'Highly Advanced',
                    internationalLanguages: ['ChatGptian', 'Universal AI Language'],
                    educationStatus: 'Exceptional education quality',
                    survivalRate: '95%' // Highly suitable for life with advanced technology
                },
                { 
                    name: 'Diddy Planet', 
                    img: 'PlanetImages/Diddy.png', 
                    info: 'Named after the American rapper, record producer, and record executive, P Diddy', 
                    humidity: '65%', 
                    temperature: '23°C', 
                    population: '4 billion', 
                    funFact: 'Named after P Diddy.', 
                    phone: '+9 012 345 6789',
                    email: 'contact@diddyplanet.com',
                    currencyRatio: 0.85, // 1 USD = 0.85 Diddy Coins
                    medianIncome: '14,000 Diddy Coins',
                    terrain: 'Mixed with temperate and tropical regions',
                    rating: 4.1,
                    civilizationStatus: 'Developing',
                    internationalLanguages: ['Diddy', 'Interstellar Common'],
                    educationStatus: 'Moderate education quality',
                    survivalRate: '80%' // Habitable with adequate infrastructure
                }
            ];
            

        this.init();
    }

    init() {
        // Set initial position off the bottom
        this.planetCard.style.transform = "translateY(100%)";
        this.planetCard.style.transition = "none"; // Disable transition initially
        this.loadPlanet(this.currentPlanetIndex);
        setTimeout(() => {
            // Ensure the initial card slides up into view with ease-out transition
            this.planetCard.style.transition = "transform 0.6s ease-out";
            this.planetCard.style.transform = "translateY(0)";
        }, 10); // Slight delay to ensure the transform is applied
        this.attachEventListeners();
    }

    loadPlanet(index) {
        if (this.planetData.length === 0) {
            console.warn("No planet data available.");
            return;
        }
        const planet = this.planetData[index];
        document.getElementById("planet-image").src = planet.img;
        document.getElementById("planet-name").textContent = planet.name;
        document.getElementById("planet-info").textContent = planet.info;
        document.getElementById("planet-humidity").textContent = planet.humidity;
        document.getElementById("planet-temperature").textContent = planet.temperature;
        document.getElementById("planet-population").textContent = planet.population;
        document.getElementById("planet-fun-fact").textContent = planet.funFact;
    }

    handleSwipe(startX, endX) {
        if (endX - startX > this.swipeThreshold) {
            this.swipe("right");
        } else if (startX - endX > this.swipeThreshold) {
            this.swipe("left");
        }
    }

    swipe(direction) {
        const offset = direction === "left" ? "-100%" : "100%";
        const tilt = direction === "left" ? "-10deg" : "10deg";
        
        // Add border class based on swipe direction
        this.planetCard.classList.add(direction === "left" ? "red-border" : "green-border");
    
        // Smooth transition for swipe out with ease-out
        this.planetCard.style.transition = "transform 0.4s ease-out, opacity 0.4s ease-out, box-shadow 0.4s ease-out";
        this.planetCard.style.transform = `translateY(100%) rotate(${tilt})`;
        this.planetCard.style.opacity = 0;
    
        setTimeout(() => {
            // Check if there are planets left
            if (this.planetData.length > 0) {
                if (direction === "left") {
                    // Remove the planet from the data array
                    this.planetData.splice(this.currentPlanetIndex, 1);
                    this.currentPlanetIndex = Math.min(this.currentPlanetIndex, this.planetData.length - 1); // Adjust index
                    
                    // Load the new planet or handle if no more planets are left
                    if (this.planetData.length > 0) {
                        this.loadPlanet(this.currentPlanetIndex);
                    } else {
                        console.warn("No more planets available.");
                        this.planetCard.style.transform = "translateY(100%)";
                        this.planetCard.style.opacity = 0;
                        return;
                    }
                } else if (direction === "right") {
                    // Save the planet to the list
                    this.savePlanet();
                    this.currentPlanetIndex = (this.currentPlanetIndex + 1) % this.planetData.length; // Move to next planet
                    this.loadPlanet(this.currentPlanetIndex);
                }
    
                // Update local storage if necessary
                localStorage.setItem('savedPlanets', JSON.stringify(this.savedPlanets));
    
                // Reset styles after animation
                this.planetCard.style.transition = "none"; // Disable transition for reset
                this.planetCard.style.transform = "translateY(100%)";
                this.planetCard.style.opacity = 0;
                this.planetCard.style.boxShadow = "none"; // Remove box shadow after swipe
    
                // Slide up the new planet card with ease-out transition
                setTimeout(() => {
                    this.planetCard.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
                    this.planetCard.style.transform = "translateY(0)";
                    this.planetCard.style.opacity = 1;
                    this.planetCard.classList.remove("red-border", "green-border");
                    this.planetCard.style.boxShadow = "none"; // Ensure box shadow is removed after swipe
                }, 50); // Slight delay for reset transition
            }
        }, 400); // Adjust delay to match transition duration
    }
    
    

    snapToPosition(finalX) {
        const swipeDistance = finalX - this.startX;
        const isEdge = Math.abs(swipeDistance) > this.swipeThreshold;
    
        if (isEdge) {
            this.planetCard.style.transition = "transform 0.4s ease-out, opacity 0.4s ease-out, box-shadow 0.4s ease-out";
            this.planetCard.style.transform = `translateX(${swipeDistance > 0 ? "120%" : "-120%"}) rotate(${swipeDistance > 0 ? "10deg" : "-10deg"})`;
            this.planetCard.style.opacity = 0;
            this.planetCard.style.boxShadow = swipeDistance > 0 
                ? "0 0 20px rgba(0, 255, 0, 0.5)" 
                : "0 0 20px rgba(255, 0, 0, 0.5)";
        } else {
            this.planetCard.style.transition = "transform 0.4s ease-out, opacity 0.4s ease-out, box-shadow 0.4s ease-out";
            this.planetCard.style.transform = "translateX(0) rotate(0)";
            this.planetCard.style.opacity = 1;
            this.planetCard.style.boxShadow = "none"; // Remove box shadow if swipe is not completed
        }
    }

    handleDrag(e) {
        const currentX = e.clientX || e.touches[0].clientX;
        const distance = currentX - this.startX;
    
        // Calculate rotation based on distance with a maximum tilt angle
        const maxTilt = 10;
        const tilt = Math.min(maxTilt, Math.max(-maxTilt, (distance / window.innerWidth) * maxTilt));
    
        this.planetCard.style.transition = "none";
        this.planetCard.style.transform = `translateX(${distance}px) rotate(${tilt}deg)`;
        this.planetCard.style.opacity = Math.max(0.5, 1 - Math.abs(distance) / window.innerWidth);
    
        // Change box shadow based on drag direction
        this.planetCard.style.boxShadow = distance > 0 
            ? "0 0 20px rgba(0, 255, 0, 0.5)" 
            : "0 0 20px rgba(255, 0, 0, 0.5)";
    }

    attachEventListeners() {
        this.planetCard.addEventListener("click", (e) => {
            this.showPlanetPopup();
            if (darkenOverlay) {
                darkenOverlay.classList.toggle('darken'); // Add or remove the darken class
            }
        });

        // Handle mouse events
        this.planetCard.addEventListener("mousedown", (e) => {
            this.startX = e.clientX;
            this.isSwiping = true;
            this.planetCard.style.transition = "none";
        });

        document.addEventListener("mousemove", (e) => {
            if (this.isSwiping) {
                this.handleDrag(e);
            }
        });

        document.addEventListener("mouseup", (e) => {
            if (this.isSwiping) {
                this.isSwiping = false;
                this.handleSwipe(this.startX, e.clientX);
                this.snapToPosition(e.clientX);
            }
        });

        // Handle touch events
        this.planetCard.addEventListener("touchstart", (e) => {
            this.startX = e.touches[0].clientX;
            this.isSwiping = true;
            this.planetCard.style.transition = "none";
        });

        this.planetCard.addEventListener("touchmove", (e) => {
            if (this.isSwiping) {
                this.handleDrag(e);
            }
        });

        this.planetCard.addEventListener("touchend", (e) => {
            if (this.isSwiping) {
                this.isSwiping = false;
                this.handleSwipe(this.startX, e.changedTouches[0].clientX);
                this.snapToPosition(e.changedTouches[0].clientX);
            }
        });

        document.getElementById("close-popup").addEventListener("click", () => {
            this.closePlanetPopup();
            darkenOverlay.classList.remove('darken');
        });
    }

    showPlanetPopup() {
        const planet = this.planetData[this.currentPlanetIndex];
        document.getElementById("popup-planet-name").textContent = planet.name;
        document.getElementById("popup-planet-image").src = planet.img;
        document.getElementById("popup-planet-info").textContent = planet.info;
        document.getElementById("popup-planet-humidity").textContent = planet.humidity;
        document.getElementById("popup-planet-temperature").textContent = planet.temperature;
        document.getElementById("popup-planet-population").textContent = planet.population;
        document.getElementById("popup-planet-fun-fact").textContent = planet.funFact;
        document.getElementById("popup-planet-phone").textContent = planet.phone || "N/A";
        document.getElementById("popup-planet-email").textContent = planet.email || "N/A";
        document.getElementById("popup-planet-currency-ratio").textContent = `1 USD = ${planet.currencyRatio} ${planet.name} Units`;
        document.getElementById("popup-planet-median-income").textContent = planet.medianIncome || "N/A";
        document.getElementById("popup-planet-terrain").textContent = planet.terrain || "N/A";
        document.getElementById("popup-planet-rating").textContent = `${planet.rating || "N/A"}/5`;
        document.getElementById("popup-planet-civilization-status").textContent = planet.civilizationStatus || "N/A";
        document.getElementById("popup-planet-languages").textContent = planet.internationalLanguages ? planet.internationalLanguages.join(', ') : "N/A";
        document.getElementById("popup-planet-education-status").textContent = planet.educationStatus || "N/A";
        document.getElementById("popup-planet-survival-rate").textContent = planet.survivalRate || "N/A";
    
        document.getElementById("planet-popup").classList.add("show-popup");
    
        const darkenOverlay = document.getElementById('darken-overlay');
        if (darkenOverlay) {
            darkenOverlay.classList.add('show-overlay');
        }
    }        

    closePlanetPopup() {
        document.getElementById("planet-popup").classList.remove("show-popup");
    }

    deletePlanet() {
        console.log("Planet deleted");
    }

    savePlanet() {
        const planet = this.planetData[this.currentPlanetIndex];
        if (planet) {
            this.savedPlanets.push(planet);
            localStorage.setItem('savedPlanets', JSON.stringify(this.savedPlanets));
            console.log("Planet saved:", planet);
            showSaveMessage(); // Call showSaveMessage after saving the planet
        } else {
            console.log("No planet to save.");
        }
    }
}

// Function to show the save message
function showSaveMessage() {
    const messageElement = document.createElement("div");
    messageElement.textContent = "Planet saved to favourites";
    messageElement.style.position = "fixed";
    messageElement.style.top = "80%";
    messageElement.style.left = "50%";
    messageElement.style.transform = "translate(-50%, 0)";
    messageElement.style.padding = "10px 20px";
    messageElement.style.backgroundColor = "rgba(76, 175, 80, 0.8)"; // Green background with 80% opacity
    messageElement.style.color = "#fff";
    messageElement.style.borderRadius = "5px";
    messageElement.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    messageElement.style.zIndex = "1000";
    messageElement.style.opacity = "0"; // Start with hidden opacity
    messageElement.style.transition = "opacity 0.5s ease-in-out";
    
    document.body.appendChild(messageElement);

    // Trigger a reflow to ensure the transition works
    void messageElement.offsetWidth;

    // Make the message visible
    messageElement.style.opacity = "1";

    // Fade out the message after 2 seconds
    setTimeout(() => {
        messageElement.style.opacity = "0";
        setTimeout(() => {
            messageElement.remove();
        }, 500); // Delay to match the transition duration
    }, 2000); // Duration to show the message
}