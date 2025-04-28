'use strict';

import { renderCountryData } from './renderCountry.js';
import { btn, countriesContainer } from './domElement.js';

// Function to render error messages in the DOM
const renderError = function (msg) {
  // Insert the error message into the countries container
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// Function to fetch and display data for a given country and its neighbors
const getCountry = function (country) {
  // Fetch data for the specified country using the REST Countries API
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      // Render the main country's data in the DOM
      renderCountryData(data[0]);

      // Extract the neighboring countries' codes from the response
      const neighbourCountry = data[0].borders;

      // If the country has no neighbors, exit the function
      if (!neighbourCountry) return;

      // Loop through each neighboring country's code
      neighbourCountry.forEach(code => {
        // Fetch data for the neighboring country using its code
        fetch(`https://restcountries.com/v3.1/alpha/${code}`)
          .then(response => response.json()) // Parse the JSON response
          .then(data => {
            // Render the neighbor country's data in the DOM
            renderCountryData(data[0], 'neighbour');
          })
          .catch(err => {
            // Handle errors and display an error message in the DOM
            renderError(`Failed to determine location: ${err.message}`);
            countriesContainer.style.opacity = 1;
          })
          .finally(() => {
            // Ensure the countries container is visible after data is fetched
            countriesContainer.style.opacity = 1;
          });
      });
    });
};

// Add a click event listener to the button to fetch and display data for Canada
btn.addEventListener('click', function () {
  // Call the getCountry function with 'canada' as the argument
  getCountry('bharat');
});
