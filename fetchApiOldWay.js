import { countriesContainer } from './domElement.js';

// Function to fetch and display country data
const getCountryData = function (country) {
  // Create a new XMLHttpRequest object to handle the AJAX request
  const request = new XMLHttpRequest();

  // Open a GET request to fetch data for the specified country from the REST Countries API
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  // Send the request to the server
  request.send();

  // Listen for the 'load' event, which triggers when the response is fully received
  request.addEventListener('load', function () {
    // Parse the JSON response and extract the first element of the array (country data)
    const [data] = JSON.parse(request.responseText);

    // Generate an HTML template to display the country's information
    const html = `<article class="country">
                                        <!-- Display the country's flag -->
                                        <img class="country__img" src="${
                                          data.flags.png
                                        }" />
                                        <div class="country__data">
                                                <!-- Display the country's name -->
                                                <h3 class="country__name">${
                                                  data.name?.common ||
                                                  'Unknown Country'
                                                }</h3>
                                                <!-- Display the country's region -->
                                                <h4 class="country__region">${
                                                  data.region
                                                }</h4>
                                                <!-- Display the population in millions -->
                                                <p class="country__row"><span>👫</span>${(
                                                  +(data.population || 0) /
                                                  1000000
                                                ).toFixed(1)} million</p>
                                                <!-- Display the primary language or 'N/A' if not available -->
                                                <p class="country__row"><span>🗣️</span>${
                                                  Object.values(
                                                    data.languages || {}
                                                  )[0] || 'N/A'
                                                }</p>
                                                <!-- Display the currency name or 'N/A' if not available -->
                                                <p class="country__row"><span>💰</span>${
                                                  data.currencies
                                                    ? Object.values(
                                                        data.currencies
                                                      )[0].name
                                                    : 'N/A'
                                                }</p>
                                        </div>
                                </article>`;

    // Insert the generated HTML into the DOM inside the countries container
    countriesContainer.insertAdjacentHTML('beforeend', html);

    // Make the countries container visible by setting its opacity to 1
    countriesContainer.style.opacity = 1;
  });
};

export { getCountryData };
