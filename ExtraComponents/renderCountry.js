import { countriesContainer } from './domElement.js';
export const renderCountryData = function (data, className = '') {
  // Generate an HTML template to display the country's information
  const html = `<article class="country ${className}">
                                        <!-- Display the country's flag -->
                                        <img class="country__img" src="${
                                          data.flags?.png
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
};
