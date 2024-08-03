// Example planet data, replace this with real data if available
export const planets = [
    { name: "Celestara", population: 1234 },
    { name: "Aetherion", population: 987 },
    { name: "Nebularis", population: 654 },
    { name: "Stellarion", population: 321 },
    { name: "Luminara", population: 543 },
  ];
  
  export function renderLeaderboard(planets) {
    const leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.innerHTML = ""; // Clear previous content
  
    planets.forEach((planet) => {
      const entry = document.createElement("div");
      entry.className = "leaderboard-entry";
      entry.innerHTML = `
        <span class="planet-name">${planet.name}</span>
        <span class="population">${planet.population.toLocaleString()}</span>
      `;
      leaderboardElement.appendChild(entry);
    });
  }
  