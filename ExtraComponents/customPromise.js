/**
 * Handles a simulated lottery process using Promises and demonstrates various Promise functionalities.
 *
 * This function includes:
 * - A lottery simulation where the outcome is determined randomly after a delay.
 * - A utility function `wait` that promisifies `setTimeout` to create delays in an asynchronous manner.
 * - Examples of immediately resolved and rejected Promises.
 *
 * Promisifying Process:
 * The `wait` function is an example of promisification, where a callback-based asynchronous operation
 * (in this case, `setTimeout`) is wrapped in a Promise. This allows the use of `.then()` and `.catch()`
 * for chaining and error handling, making the code more readable and easier to manage.
 *
 * Usage:
 * Call the `lotteryHandler` function to see the lottery simulation and other Promise examples in action.
 *
 * Example:
 * lotteryHandler();
 */
const lotteryHandler = function () {
  // Creating a promise to simulate a lottery
  const lotteryPromise = new Promise(function (resolve, reject) {
    // Simulate a delay of 2 seconds
    setTimeout(() => {
      // Randomly determine if the user wins or loses
      if (Math.random() >= 0.5) {
        resolve('You win'); // Resolve the promise if the user wins
      } else {
        reject(new Error('You lost your money')); // Reject the promise if the user loses
      }
    }, 2000);
  });

  // Consuming the lottery promise
  lotteryPromise
    .then(res => {
      console.log(res); // Log the success message if resolved
    })
    .catch(err => {
      console.error(err); // Log the error message if rejected
    });

  // Function to promisify setTimeout
  const wait = function (seconds) {
    return new Promise(resolve => {
      // Resolve the promise after the specified number of seconds
      setTimeout(resolve, seconds * 1000);
    });
  };

  // Using the wait function to create delays
  wait(2)
    .then(() => {
      console.log('I waited for 2 seconds'); // Log after waiting for 2 seconds
      return wait(1); // Wait for another 1 second
    })
    .then(() => {
      console.log('I waited for 1 second'); // Log after waiting for 1 second
    });

  // Example of immediately resolved promise
  Promise.resolve('abc').then(x => {
    console.log(x); // Log the resolved value
  });

  // Example of immediately rejected promise
  Promise.reject(new Error('abc')).catch(x => {
    console.log(x); // Log the rejected error
  });
};

export { lotteryHandler };
