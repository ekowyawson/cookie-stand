'use strict';
// const cl   = (input) => { console.log(input); };
let totals = new Array(14);
totals.fill(0);

// Define a class for location objects
function Location(name, hoursOpen, contactInfo, location, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.name = name;
  this.hoursOpen = hoursOpen;
  this.contactInfo = contactInfo;
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.cookiesPerHour = [];
  this.dailyTotals = 0;
}

/* RENDER TABLE BODY */
Location.prototype.renderTable = function() {
  const tableBody = document.getElementById('tbody');
  const locationRow  = document.createElement('tr');
  tableBody.appendChild(locationRow);
  let strName = this.name.toString();
  locationRow.id = strName.toLowerCase();

  let locationName = document.createElement('td');
  locationName.textContent = strName;
  locationRow.appendChild(locationName);
  locationName.classList.add('loc-name');

  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    const cookieSale = document.createElement('td');
    cookieSale.textContent = (this.cookiesPerHour[i]);
    locationRow.appendChild(cookieSale);
    cookieSale.classList.add('sales-per-hour');
  }

  let locationTotal = document.createElement('td');
  locationTotal.textContent = this.dailyTotals;
  locationRow.appendChild(locationTotal);
  locationTotal.classList.add('loc-totals');
};

/* CALCULATE FUNCTION */
Location.prototype.calculateSales = function (hours) {
  /* MATH FUNCTIONS */
  for(let n = 0; n < hours.length; n++) {
    const randomCustomers = Math.floor(
      Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers
    );

    const cookiesSold = Math.ceil(
      randomCustomers * this.avgCookiesPerCustomer
    );

    this.cookiesPerHour.push(cookiesSold);
    this.dailyTotals += cookiesSold;
    totals[n] += cookiesSold;
  }
};

// Instantiate location objects using the Location class
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

const locations = [seattle, tokyo, dubai, paris, lima];

/* RENDER TABLE FOOTER */
const renderTableFoot = (totals) => {
  let footerTotals    = document.getElementById('tfoot-tr');

  totals.forEach(total => {
    let footerData         = document.createElement('td');
    footerData.textContent = total;
    footerTotals.appendChild(footerData);
  });

  let sumTotals         = document.createElement('td');
  sumTotals.textContent = (totals.reduce((a,b)=> a+b, 0));
  footerTotals.appendChild(sumTotals);
};

/* ------------------- */
// Loop through each location and generate their hourly sales
locations.forEach(loc => {
  const hours     = [
    '6am','7am','8am','9am','10am','11am','12pm',
    '1pm','2pm','3pm','4pm','5pm','6pm','7pm'
  ];
  loc.calculateSales(hours);
  loc.renderTable();
});

renderTableFoot(totals);

// Get DOM elements for event listener
const addLocationForm = document.getElementById('addLocationForm');
const footerTotals = document.getElementById('tfoot-tr');

// ... EVENT LISTENER ...
addLocationForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page.

  // Get user input from the form fields.
  const name = document.getElementById('location-name').value;
  const minCustomers = parseInt(document.getElementById('min-cust').value);
  const maxCustomers = parseInt(document.getElementById('max-cust').value);
  const avgCookiesPerCustomer = parseFloat(document.getElementById('avg-sale').value);

  // Create a new Location instance with the user input.
  const newLocation = new Location(name, '6 am - 7 pm', '', '', minCustomers, maxCustomers, avgCookiesPerCustomer);

  // Add the new location to the locations array.
  locations.push(newLocation);

  const hours     = [
    '6am','7am','8am','9am','10am','11am','12pm',
    '1pm','2pm','3pm','4pm','5pm','6pm','7pm'
  ];

  // Render the new location's table row.
  newLocation.calculateSales(hours);
  newLocation.renderTable();

  // Recalculate and update the totals in the footer.
  totals.fill(0);
  locations.forEach(loc => {
    loc.cookiesPerHour.forEach((cookiesSold, index) => {
      totals[index] += cookiesSold;
    });
  });

  // Clear the old footer totals.
  footerTotals.innerHTML = '';
  const footerTotalsHeading = document.createElement('td');
  footerTotalsHeading.textContent = 'Hourly Totals For All Locations';
  footerTotals.appendChild(footerTotalsHeading);

  // Render the new footer totals.
  totals.forEach(total => {
    const footerData = document.createElement('td');
    footerData.textContent = total;
    footerTotals.appendChild(footerData);
  });

  // Calculate and add the sum of the totals.
  const sumTotals = document.createElement('td');
  sumTotals.textContent = totals.reduce((a, b) => a + b, 0);
  footerTotals.appendChild(sumTotals);
});
