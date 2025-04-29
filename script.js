'use strict';

// Importing utility functions and DOM elements
import { renderCountryData } from './ExtraComponents/renderCountry.js'; // Function to render country data in the DOM
import {
  btn,
  btnReload,
  countriesContainer,
} from './ExtraComponents/domElement.js'; // DOM elements for interaction

// // Utility function to fetch JSON data from a given URL
const fetchJSON = async (url, errorMsg = 'Something went wrong') => {
  const response = await fetch(url); // Fetch data from the URL
  if (!response.ok) throw new Error(`${errorMsg} (${response.status})`); // Throw error if response is not OK
  return response.json(); // Parse and return JSON data
};

// Function to render error messages in the DOM
const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg); // Display error message in the container
  countriesContainer.style.opacity = 1; // Make the container visible
};

// Function to get the user's current location using Geolocation API
const getLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          // Fetch geolocation data using latitude and longitude
          const geoData = await fetchJSON(
            `https://geocode.xyz/${latitude},${longitude}?geoit=json`,
            'Failed to fetch geolocation data'
          );
          resolve(geoData.country); // Resolve with the country name
        } catch (err) {
          reject(`Failed to fetch country: ${err.message}`); // Reject with an error message
        }
      },
      () => reject('Could not get your location') // Reject if location access fails
    );
  });

// Function to fetch and render country data along with its neighbors
const getCountry = async country => {
  try {
    // Fetch country data by name
    const data = await fetchJSON(
      `https://restcountries.com/v3.1/name/${country}`,
      'Country not found'
    );
    renderCountryData(data[0]); // Render the main country data

    // Fetch and render neighboring countries
    const neighbors = data[0].borders || []; // Get neighboring country codes
    for (const code of neighbors) {
      try {
        // Fetch neighbor country data by code
        const neighborData = await fetchJSON(
          `https://restcountries.com/v3.1/alpha/${code}`,
          'Neighbor country not found'
        );
        renderCountryData(neighborData[0], 'neighbour'); // Render neighbor country data
      } catch (err) {
        renderError(`Failed to fetch neighbor: ${err.message}`); // Render error for neighbor fetch failure
      }
    }
  } catch (err) {
    renderError(`Failed to fetch country: ${err.message}`); // Render error for country fetch failure
  } finally {
    countriesContainer.style.opacity = 1; // Ensure the container is visible
  }
};

// Event listener for the main button to fetch and display country data
btn.addEventListener('click', async () => {
  btn.disabled = true; // Disable the button to prevent multiple clicks
  try {
    const country = await getLocation(); // Get the user's current country
    await getCountry(country); // Fetch and display the country data
  } catch (err) {
    renderError(err); // Render error if location or country fetch fails
  }
});

// Event listener for the reload button to reset the UI
btnReload.addEventListener('click', () => {
  countriesContainer.innerHTML = ''; // Clear the container content
  countriesContainer.style.opacity = 0; // Hide the container
  btn.disabled = false; // Enable the main button
});
