'use strict';

// Define a function to simplify console.log
/* const cl = (input) => {
  console.log(input);
}; */

// Define an array of location objects
const locations = [
  {
    name: 'Seattle',
    hoursOpen: '6 am - 7 pm',
    contactInfo: '123-456-7890',
    location: '2901 3rd Ave #300, Seattle, WA 98121',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookiesPerCustomer: 6.3,
  },
  {
    name: 'Tokyo',
    hoursOpen: '6 am - 7 pm',
    contactInfo: '222-222-2222',
    location: '1 Chrome-1-2 Oshiage, Sumida City, Tokyo 131-8634',
    minCustomers: 3,
    maxCustomers: 24,
    avgCookiesPerCustomer: 1.2,
  },
  {
    name: 'Dubai',
    hoursOpen: '6 am - 7 pm',
    contactInfo: '333-333-3333',
    location: 'Sheikh Mohammad bin Rashid Blvd - Dubai',
    minCustomers: 11,
    maxCustomers: 38,
    avgCookiesPerCustomer: 3.7,
  },
  {
    name: 'Paris',
    hoursOpen: '6 am - 7 pm',
    contactInfo: '444-444-4444',
    location: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
    minCustomers: 20,
    maxCustomers: 38,
    avgCookiesPerCustomer: 2.3,
  },
  {
    name: 'Lima',
    hoursOpen: '6 am - 7 pm',
    contactInfo: '555-555-5555',
    location: 'Ca. Gral. Borgono cuadra 8, Miraflores 15074',
    minCustomers: 2,
    maxCustomers: 16,
    avgCookiesPerCustomer: 4.6,
  },
];


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
