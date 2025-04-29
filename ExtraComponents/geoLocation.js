// // Importing the renderCountryData function to display country data
// // and the btn element to attach the event listener
// import { renderCountryData } from './renderCountry.js';
// import { btn } from './domElement.js';

// // Function to get the user's current geolocation position
// // Returns a Promise that resolves with the position or rejects with an error
// const getPosition = function () {
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };

// // Async function to handle geolocation and fetch country data
// const locationHandler = async function () {
//     // Get the user's current position (latitude and longitude)
//     const position = await getPosition();
//     const { latitude: lat, longitude: lng } = position.coords;

//     // Fetch geolocation data (e.g., country) using the latitude and longitude
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) {
//         // Throw an error if the geocoding API request fails
//         throw new Error(`Geocoding failed: ${resGeo.status}`);
//     }
//     const dataGeo = await resGeo.json();

//     console.log(dataGeo); // Log the geolocation data for debugging

//     // Fetch country data using the country name obtained from geolocation data
//     const res = await fetch(
//         `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );

//     const data = await res.json();

//     // Render the country data on the UI
//     renderCountryData(data[0]);
//     console.log(data); // Log the country data for debugging
// };

// // Add a click event listener to the button to trigger the locationHandler function
// btn.addEventListener('click', locationHandler);

// // Export the locationHandler function for use in other modules
// export { locationHandler };

// Promise All Exmaple:
// If we want to fetch multiple data at once, we can use promise.all
// It takes an array of promises and returns a single promise that resolves when all of the promises in the array have resolved
// or when the iterable contains no promises. It rejects with the reason of the first promise that rejects.
// const get3Countries = async function (country, country2, country3) {
//   try {
//     // const [data1] = await fetchJSON(
//     //   `https://restcountries.com/v3.1/name/${country}`,
//     //   'Country not found'
//     // );
//     // const [data2] = await fetchJSON(
//     //   `https://restcountries.com/v3.1/name/${country2}`,
//     //   'Country not found'
//     // );
//     // const [data3] = await fetchJSON(
//     //   `https://restcountries.com/v3.1/name/${country3}`,
//     //   'Country not found'
//     // );

//     const data = await Promise.all([
//       fetchJSON(`https://restcountries.com/v3.1/name/${country}`),
//       fetchJSON(`https://restcountries.com/v3.1/name/${country2}`),
//       fetchJSON(`https://restcountries.com/v3.1/name/${country3}`),
//     ]);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(`${err} 💥💥💥`);
//   }
// };
// get3Countries('portugal', 'canada', 'bharat');

// Promise Race
// We only get one result not the all results
// It takes an array of promises and returns a single promise that resolves or rejects as soon as one of  the promises in the iterable resolves or objects.
// It does not wait for all of the promises to complete and it does not care about the order of the promises.
// It is useful when you want to get the result of the first promise that resolves or rejects.

// (async function () {
//   const res = await Promise.race([
//     fetchJSON(`https://restcountries.com/v3.1/name/italy`),
//     fetchJSON(`https://restcountries.com/v3.1/name/egypt`),
//     fetchJSON(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();
