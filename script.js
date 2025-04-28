'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}


// https://countries-api-836d.onrender.com/countries/
///////////////////////////////////////

//SYNCHRONUS
// Most code is synchronous
// synchronous code is executed line by line.
// Each line of code waits for the precious one to finish.
// this is the default behavoiur of Javascript
// Long running operations block code execution

// Asynchronous
// asynchronous code is executed in the background
// It does not block the execution of the code
// It is executed in backgoound.
// It is all about coordinating the code in the behavoiur of time .
// Callback functions alone do not make the code asynchronous.
// Certain functions are asynchronous by nature.
// setTimout, setInterval, DOM events, network requests.

//AJAX
// Asynchronous Javascript and XML: Allows us to communicate with remote web servers in a  asynchronous way. with AJAX we can request data from the server and update the web page without reloading the page.
// It is a technique that allows us to send and receive data from a server asynchronously.
// It is a combination of Javasctipt and XML.

//API
// Aplpication programming interface: Piece of software that can used by another piece of software, in order to allow other applications to talk to each other.
// It is a set of rules and protocols for building and interacting with software applications.
// JSON is mostly used for APIs.
// As it converts data into a format that can be easily read and understood  by humans and machines.
