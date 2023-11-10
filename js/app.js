'use strict';

// Get a reference to an HTML element with the id "locations"
const locationList = document.getElementById('locations');

// Define a function to generate list items and add them to a parent element
function generateList(content, parent) {
  const createList = document.createElement('li');
  createList.textContent = content;
  parent.appendChild(createList);
}

// Define a function to generate location information
function generateLocation(location) {
  // Create a heading and ul elements for the location
  const locationHeader = document.createElement('h2');
  const locUl = document.createElement('ul');

  // Set the heading text to the location's name
  locationHeader.textContent = location.name;
  locationList.appendChild(locationHeader);

  // Generate list items for hours, contact info, and location
  generateList(`Hours Open: ${location.hoursOpen}`, locUl);
  generateList(`Contact Info: ${location.contactInfo}`, locUl);
  generateList(`Location: ${location.location}`, locUl);

  // Append the unordered list to the location list
  locationList.appendChild(locUl);
}

// Loop through each location and generate their information
locations.forEach(generateLocation);
