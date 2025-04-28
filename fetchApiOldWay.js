import { renderCountryData } from './renderCountry.js';

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
    console.log(data); // Log the country data to the console for debugging

    // Call the renderCountryData function to display the country data in the DOM
    renderCountryData(data);

    // Extract the neighboring countries (if any) from the country data
    const neighbourCountry = data.borders || [];
    console.log(neighbourCountry); // Log the neighboring countries for debugging

    // If there are no neighboring countries, exit the function
    if (!neighbourCountry || neighbourCountry.length === 0) return;

    // Loop over all neighboring country codes
    neighbourCountry.forEach(countryCode => {
      // Create a new XMLHttpRequest object for each neighboring country
      const request2 = new XMLHttpRequest();

      // Open a GET request to fetch data for the neighboring country using its country code
      request2.open(
        'GET',
        `https://restcountries.com/v3.1/alpha/${countryCode}` // Send a request for each neighboring country code
      );

      // Send the request to the server
      request2.send();

      // Listen for the 'load' event for the neighboring country data
      request2.addEventListener('load', function () {
        // Parse the JSON response for the neighboring country
        const data2 = JSON.parse(request2.responseText);
        console.log(data2); // Log the neighboring country data for debugging

        // Call the renderCountryData function to display the neighboring country data in the DOM
        renderCountryData(data2[0], 'neighbour');
      });
    });
  });
};

export { getCountryData };
