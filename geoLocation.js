// Importing the renderCountryData function to display country data
// and the btn element to attach the event listener
import { renderCountryData } from './renderCountry.js';
import { btn } from './domElement.js';

// Function to get the user's current geolocation position
// Returns a Promise that resolves with the position or rejects with an error
const getPosition = function () {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// Async function to handle geolocation and fetch country data
const locationHandler = async function () {
    // Get the user's current position (latitude and longitude)
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Fetch geolocation data (e.g., country) using the latitude and longitude
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) {
        // Throw an error if the geocoding API request fails
        throw new Error(`Geocoding failed: ${resGeo.status}`);
    }
    const dataGeo = await resGeo.json();

    console.log(dataGeo); // Log the geolocation data for debugging

    // Fetch country data using the country name obtained from geolocation data
    const res = await fetch(
        `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    const data = await res.json();

    // Render the country data on the UI
    renderCountryData(data[0]);
    console.log(data); // Log the country data for debugging
};

// Add a click event listener to the button to trigger the locationHandler function
btn.addEventListener('click', locationHandler);

// Export the locationHandler function for use in other modules
export { locationHandler };
