export class PlanetSwipe {
    constructor(planetCardElement, arrowRightElement, arrowLeftElement) {
        this.planetCard = planetCardElement;
        this.arrowRight = arrowRightElement;
        this.arrowLeft = arrowLeftElement;
        this.startX = 0;
        this.isSwiping = false;
        this.swipeThreshold = 100; // Minimum distance to consider a swipe
        this.hasSwiped = false; // Flag to track if a swipe has occurred
        this.currentPlanetIndex = 0;

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
                funFact: 'Covered in dark, crystalline minerals.' 
            },
            { 
                name: 'Stellarion', 
                img: 'PlanetImages/planet3.png', 
                info: 'Often called the Red Planet due to its reddish appearance.', 
                humidity: '30%', 
                temperature: '20°C', 
                population: '1.1 billion', 
                funFact: 'Known as the Red Planet.' 
            },
            { 
                name: 'Cat Girl Planet', 
                img: 'PlanetImages/planet7.png', 
                info: 'The largest planet in our solar system. Known for its Great Red Spot.', 
                humidity: '40%', 
                temperature: '22°C', 
                population: '5 billion', 
                funFact: 'Known for its Great Red Spot.' 
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
        this.loadPlanet(this.currentPlanetIndex);
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
            this.swipe("right"); // Swipe right
        } else if (startX - endX > this.swipeThreshold) {
            this.swipe("left"); // Swipe left
        }

        if (!this.hasSwiped) {
            this.hasSwiped = true; // Set flag to true
        }
    }

    swipe(direction) {
        const offset = direction === "left" ? "-100%" : "100%";
        const borderClass = direction === "left" ? "red-border" : "green-border";

        // Add border class based on swipe direction
        this.planetCard.classList.add(borderClass);

        this.planetCard.style.transform = `translateX(${offset})`;
        this.planetCard.style.boxShadow = direction === "left" ? "0 0 20px rgba(255, 0, 0, 0.5)" : "0 0 20px rgba(0, 255, 0, 0.5)"; // Red or green glow

        setTimeout(() => {
            this.planetCard.style.transition = "none";
            this.planetCard.style.transform = "translateX(0)";
            this.planetCard.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)"; // Default shadow
            this.planetCard.style.transition = "transform 0.3s ease-out";

            // Remove border class after swipe
            this.planetCard.classList.remove("red-border", "green-border");

            if (direction === "left") {
                this.deletePlanet();
            } else if (direction === "right") {
                this.savePlanet();
            }
            this.currentPlanetIndex =
                direction === "left"
                    ? (this.currentPlanetIndex + 1) % this.planetData.length
                    : (this.currentPlanetIndex - 1 + this.planetData.length) % this.planetData.length;
            this.loadPlanet(this.currentPlanetIndex);
        }, 300);
    }

    snapToPosition(finalX) {
        const swipeDistance = finalX - this.startX;

        if (Math.abs(swipeDistance) > this.swipeThreshold) {
            this.planetCard.style.transform = `translateX(${
                swipeDistance > 0 ? "100%" : "-100%"
            })`;
        } else {
            this.planetCard.style.transform = "translateX(0)";
        }

        // Reset opacity and glow color after snap
        this.planetCard.style.opacity = 1;
        this.planetCard.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)"; // White glow
    }

    handleDrag(e) {
        const currentX = e.clientX || e.touches[0].clientX;
        const distance = currentX - this.startX;

        this.planetCard.style.transform = `translateX(${distance}px)`;
        this.planetCard.style.opacity = Math.max(0.5, 1 - Math.abs(distance) / window.innerWidth);

        // Change box shadow based on drag direction
        this.planetCard.style.boxShadow = distance > 0 
            ? "0 0 20px rgba(0, 255, 0, 0.5)" // Green glow for right
            : "0 0 20px rgba(255, 0, 0, 0.5)"; // Red glow for left
    }

    attachEventListeners() {
        // Handle mouse events
        this.planetCard.addEventListener("mousedown", (e) => {
            this.startX = e.clientX;
            this.isSwiping = true;
            this.planetCard.style.transition = "none"; // Disable transition during drag
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
                this.planetCard.style.transition = "transform 0.3s ease-out"; // Re-enable transition
                this.snapToPosition(e.clientX);
            }
        });

        // Handle touch events
        this.planetCard.addEventListener("touchstart", (e) => {
            this.startX = e.touches[0].clientX;
            this.isSwiping = true;
            this.planetCard.style.transition = "none"; // Disable transition during drag
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
                this.planetCard.style.transition = "transform 0.3s ease-out"; // Re-enable transition
                this.snapToPosition(e.changedTouches[0].clientX);
            }
        });
    }

    deletePlanet() {
        console.log("Planet deleted");
    }

    savePlanet() {
        console.log("Planet saved");
    }
}
