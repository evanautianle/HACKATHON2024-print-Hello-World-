export const hamburgerMenu = document.getElementById('hamburger-menu');
    const menu = document.getElementById('menu');
    const darkenOverlay = document.getElementById('darken-overlay');
    
    // Ensure darkenOverlay exists
    if (!darkenOverlay) {
        console.warn('Darken overlay element not found.');
    }
    
    // Hamburger Menu Functionality
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('open');
        menu.classList.toggle('show');
        if (darkenOverlay) {
            darkenOverlay.classList.toggle('darken'); // Add or remove the darken class
        }
    });