// Define the version string for cache-busting on the assets
const VERSION = 'm7n2p9';

// Fetch and parse data.json
async function loadAppData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load app data:', error);
    return null;
  }
}

// Function to update the clock
function updateClock() {
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');

  const now = new Date();

  // Format time
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  timeElement.textContent = `${hours}:${minutes}:${seconds}`;

  // Format date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Initialize the app
async function init() {
  const data = await loadAppData();
  if (!data) return;

  const appContainer = document.getElementById('app-container');
  const sections = data.sections;

  // Apply data-driven styles
  const appSettings = sections.app_settings;
  document.documentElement.style.setProperty('--primary-color', appSettings.primary_color.value);
  document.documentElement.style.setProperty('--background-color', appSettings.background_color.value);
  document.documentElement.style.setProperty('--text-color', appSettings.text_color.value);

  // Set background image with cache-busting version
  const bgPath = sections.background.image.value;
  appContainer.style.backgroundImage = `url('${bgPath}?v=${VERSION}')`;

  // Update clock immediately
  updateClock();

  // Start the clock interval
  setInterval(updateClock, 1000);

  // Reveal the app
  appContainer.classList.add('loaded');
}

// Start initialization
init();
