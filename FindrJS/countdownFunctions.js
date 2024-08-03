export const timerTest = () => {
    console.log('export import working');
};

// Calculate the target time
const countdownElement = document.getElementById('timer');

function calculateTargetTime() {
    const now = new Date();
    const currentDay = now.getDay();
    const daysUntilSunday = (7 - currentDay) % 7; // Days until the next Sunday
    const targetSunday = new Date(now);
    targetSunday.setDate(now.getDate() + daysUntilSunday);
    targetSunday.setHours(19, 0, 0, 0); // Set to 7 pm (or whatever time you want)

    const targetTime = new Date(targetSunday.getTime() + 2 * 24 * 60 * 60 * 1000); // Add 2 days

    return targetTime;
}

const targetTime = calculateTargetTime();

// Update countdown every second
export function updateCountdown() {
    const now = new Date();
    const timeRemaining = targetTime - now;

    if (timeRemaining < 172801000) {
        console.log('boom')
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
