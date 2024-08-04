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
                funFact: 'Known for its serene beauty.' 
            },
            { 
                name: 'Aetherion', 
                img: 'PlanetImages/planet1.png', 
                info: 'Aetherion has multicolored clouds and a vast ring system composed of shimmering ice crystals. Its atmosphere is rich in exotic gases, creating dazzling auroras that dance across the sky, visible even from its numerous, diverse moons.', 
                humidity: '70%', 
                temperature: '25°C', 
                population: '17 million', 
                funFact: 'Home to dazzling auroras.' 
            },
            { 
                name: 'Nebularis', 
                img: 'PlanetImages/planet2.png', 
                info: 'Nebularis is a mysterious planet shrouded in dense, colorful nebulae, giving it an ever-shifting, cosmic appearance. Its surface, covered in dark, crystalline minerals, reflects the nebulae’s light. Currently uninhabited.', 
                humidity: '90%', 
                temperature: '12°C', 
                population: '0', 
                funFact: 'Nebularis\' crystal exterior makes it painful to walk on.' 
            },
            { 
                name: 'Stellarion', 
                img: 'PlanetImages/planet3.png', 
                info: 'Often called the Red Planet due to its reddish appearance.', 
                humidity: '30%', 
                temperature: '20°C', 
                population: '1.1 billion', 
                funFact: 'Unbelievably hot, population of alien species with magma bodies.' 
            },
            { 
                name: 'Cat Girl Planet', 
                img: 'PlanetImages/planet7.png', 
                info: 'The largest planet in our solar system. Known for its Great Red Spot.', 
                humidity: '40%', 
                temperature: '22°C', 
                population: '5 billion', 
                funFact: 'Cat girls aren\'t as nice as you might think.' 
            },
            { 
                name: 'Luminara', 
                img: 'PlanetImages/planet10.png', 
                info: 'Famous for its stunning ring system.', 
                humidity: '55%', 
                temperature: '15°C', 
                population: '3.3 billion', 
                funFact: 'Has a stunning ring system.' 
            },
            { 
                name: 'Planet Evan', 
                img: 'PlanetImages/evanplanet.png', 
                info: 'Evan.', 
                humidity: '50%', 
                temperature: '16°C', 
                population: '1 million', 
                funFact: 'Named after its discoverer, Evan.' 
            },
            { 
                name: 'Gambit', 
                img: 'PlanetImages/Gambit.png', 
                info: 'Hes him', 
                humidity: '45%', 
                temperature: '19°C', 
                population: '2.5 million', 
                funFact: 'Home to strategic thinkers.' 
            },
            { 
                name: 'ChatGpt', 
                img: 'PlanetImages/Chatgpt.png', 
                info: 'Our saviour', 
                humidity: '60%', 
                temperature: '21°C', 
                population: '8 billion', 
                funFact: 'Known for its advanced AI.' 
            },
            { 
                name: 'Diddy Planet', 
                img: 'PlanetImages/Diddy.png', 
                info: 'Named after the American rapper, record producer, and record executive, P Diddy', 
                humidity: '65%', 
                temperature: '23°C', 
                population: '4 billion', 
                funFact: 'Named after P Diddy.' 
            },
            { 
                name: 'Cooked Planet', 
                img: 'PlanetImages/Cooked.png', 
                info: 'Lava planet where villain arcs begin. It’s literally cooked', 
                humidity: '5%', 
                temperature: '1500°C', 
                population: 'Uninhabited', 
                funFact: 'Surface temperatures can melt metal.' 
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
            // Update the planet index and load the new planet
            if (direction === "left") {
                this.deletePlanet();
                this.currentPlanetIndex = (this.currentPlanetIndex + 1) % this.planetData.length;
            } else if (direction === "right") {
                this.savePlanet();
                this.currentPlanetIndex = (this.currentPlanetIndex - 1 + this.planetData.length) % this.planetData.length;
            }
            this.loadPlanet(this.currentPlanetIndex);
        
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
        this.savedPlanets.push(planet);
        localStorage.setItem('savedPlanets', JSON.stringify(this.savedPlanets));
        console.log("Planet saved:", planet);
    }
}