// Importing utility functions and DOM elements
import { renderCountryData } from './renderCountry.js';
import { btn, btnReload, countriesContainer } from './domElement.js';

// Function to render error messages in the DOM
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg); // Display error message in the container
  countriesContainer.style.opacity = 1; // Make the container visible
};

// Main function to handle fetching and rendering country details
const fetchingCountryDetails = function () {
  // Function to fetch JSON data from a given URL and handle errors
  const fetchJSON = async function (url, errorMsg = 'Something went wrong') {
    try {
      const response = await fetch(url); // Fetch data from the provided URL
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`); // Throw error if response is not OK
      return await response.json(); // Parse and return JSON data
    } catch (err) {
      renderError(err.message); // Render error message in the DOM
      throw err; // Rethrow the error for further handling
    }
  };

  // Function to get the user's current location using geolocation API
  const getLocation = async function () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const { latitude, longitude } = position.coords; // Extract latitude and longitude

          try {
            // Fetch geolocation data to determine the country
            const geoData = await fetchJSON(
              `https://geocode.xyz/${latitude},${longitude}?geoit=json`,
              `Failed to fetch geolocation data`
            );

            resolve(geoData.country); // Resolve the promise with the country name
          } catch (err) {
            reject(`Failed to fetch country from geolocation: ${err.message}`); // Reject with an error message
          }
        },
        function () {
          reject('Could not get your location'); // Reject if geolocation fails
        }
      );
    });
  };

  // Function to fetch and render data for a given country and its neighbors
  const getCountry = async function (country) {
    try {
      // Fetch data for the specified country
      const data = await fetchJSON(
        `https://restcountries.com/v3.1/name/${country}`,
        `Country not found`
      );

      renderCountryData(data[0]); // Render the main country's data

      const neighbourCountries = data[0].borders; // Get neighboring countries (if any)

      if (!neighbourCountries) return; // Exit if no neighbors are found

      // Fetch and render data for each neighboring country
      for (const code of neighbourCountries) {
        try {
          const neighbourData = await fetchJSON(
            `https://restcountries.com/v3.1/alpha/${code}`,
            `Neighbor country not found`
          );
          renderCountryData(neighbourData[0], 'neighbour'); // Render neighbor country data
        } catch (err) {
          renderError(`Failed to fetch neighbor: ${err.message}`); // Render error for failed neighbor fetch
        }
      }
    } catch (err) {
      renderError(`Failed to fetch country: ${err.message}`); // Render error for failed country fetch
    } finally {
      countriesContainer.style.opacity = 1; // Ensure the container is visible
    }
  };

  // Add event listener to the button to fetch data for the user's current country
  btn.addEventListener('click', function () {
    btn.disabled = true; // Disable the button to prevent multiple clicks

    getLocation()
      .then(country => getCountry(country)) // Fetch and render country data
      .catch(err => renderError(err)); // Handle errors during location or country fetch
  });

  // Add event listener to the reload button to reset the UI
  btnReload.addEventListener('click', () => {
    countriesContainer.innerHTML = ''; // Clear the content of the countries container
    countriesContainer.style.opacity = 0; // Reset the opacity of the container
    btn.disabled = false; // Re-enable the main button for fetching country data
  });
};

// Export the main function for use in other modules
export { fetchingCountryDetails };
