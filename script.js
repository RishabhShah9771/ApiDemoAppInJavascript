'use strict';

// Importing utility functions and DOM elements
import { renderCountryData } from './renderCountry.js';
import { btn, countriesContainer } from './domElement.js';

// Function to render error messages in the DOM
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// Function to fetch JSON data from a given URL and handle errors
const fetchJSON = async function (url, errorMsg = 'Something went wrong') {
  try {
    const response = await fetch(url);
    // Throw an error if the response is not OK
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return await response.json();
  } catch (err) {
    // Render error message and rethrow the error
    renderError(err.message);
    throw err;
  }
};

// Function to fetch and render data for a given country and its neighbors
const getCountry = async function (country) {
  try {
    // Fetch country data
    const data = await fetchJSON(
      `https://restcountries.com/v3.1/name/${country}`,
      `Country not found`
    );

    // Render the main country data
    renderCountryData(data[0]);

    // Get neighboring countries (if any)
    const neighbourCountries = data[0].borders;

    // If no neighbors, exit the function
    if (!neighbourCountries) return;

    // Fetch and render data for each neighboring country
    for (const code of neighbourCountries) {
      try {
        const neighbourData = await fetchJSON(
          `https://restcountries.com/v3.1/alpha/${code}`,
          `Neighbor country not found`
        );
        renderCountryData(neighbourData[0], 'neighbour');
      } catch (err) {
        // Render error message for failed neighbor fetch
        renderError(`Failed to fetch neighbor: ${err.message}`);
      }
    }
  } catch (err) {
    // Render error message for failed country fetch
    renderError(`Failed to fetch country: ${err.message}`);
  } finally {
    // Ensure the container is visible
    countriesContainer.style.opacity = 1;
  }
};

// Add event listener to the button to fetch data for the country 'bharat'
btn.addEventListener('click', function () {
  btn.disabled = true; // Disable the button to prevent multiple clicks
  getCountry('bharat'); // Fetch data for the country
});
