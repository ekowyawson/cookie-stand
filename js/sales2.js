'use strict';

// Define a class for location objects
function Location(name, hoursOpen, contactInfo, location, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.name = name;
  this.hoursOpen = hoursOpen;
  this.contactInfo = contactInfo;
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
}

/* Create object to hold arrays of totals here */

/* Location.prototype.genHourlySales = function([hours]) {;

}; */

// Define location objects using the Location class
const seattle = new Location(
  'Seattle',
  '6 am - 7 pm',
  '123-456-7890',
  '2901 3rd Ave #300, Seattle, WA 98121',
  23,
  65,
  6.3
);
const tokyo = new Location(
  'Tokyo',
  '6 am - 7 pm',
  '222-222-2222',
  '1 Chrome-1-2 Oshiage, Sumida City, Tokyo 131-8634',
  3,
  24,
  1.2
);
const dubai = new Location(
  'Dubai',
  '6 am - 7 pm',
  '333-333-3333',
  'Sheikh Mohammad bin Rashid Blvd - Dubai',
  11,
  38,
  3.7
);
const paris = new Location(
  'Paris',
  '6 am - 7 pm',
  '444-444-4444',
  'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
  20,
  38,
  2.3
);
const lima = new Location(
  'Lima',
  '6 am - 7 pm',
  '555-555-5555',
  'Ca. Gral. Borgono cuadra 8, Miraflores 15074',
  2,
  16,
  4.6
);

// Get a reference to an HTML element with the id "sales-list"
const salesList = document.getElementById('sales-list');
const locations = [seattle, tokyo, dubai, paris, lima];
const hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

// Define a function to generate hourly sales for a location
function generateHourlySales(location) {
  const hourlySales = [];
  const locationHeader = document.createElement('h2');
  const locUl = document.createElement('ul');
  locationHeader.classList.add('location-header');
  locationHeader.textContent = location.name;
  salesList.appendChild(locationHeader);

  hours.forEach(hour => {
    const randomCustomers = Math.floor(Math.random() * (location.maxCustomers - location.minCustomers + 1) + location.minCustomers);
    const cookiesSold = Math.ceil(randomCustomers * location.avgCookiesPerCustomer);
    hourlySales.push(cookiesSold);

    // Display the results on the page
    const listItem = document.createElement('li');
    listItem.textContent = `${hour}: ${cookiesSold} cookies`;
    locUl.appendChild(listItem);
    salesList.appendChild(locUl);
  });

  // Calculate and display the total cookies sold for the day
  const totalCookies = hourlySales.reduce((a, b) => a + b, 0);
  const totalUl = document.createElement('ul');
  const totalListItem = document.createElement('li');
  totalUl.classList.add('total-sales');
  totalListItem.textContent = `Total: ${totalCookies} cookies`;
  totalUl.appendChild(totalListItem);
  salesList.appendChild(totalUl);
}

// Loop through each location and generate their hourly sales
locations.forEach(loc => {
  generateHourlySales(loc);
});
