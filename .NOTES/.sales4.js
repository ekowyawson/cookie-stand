'use strict';

const cl   = (input) => { console.log(input); };
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

/* RENDER TABLE BODY */
Location.prototype.renderTable = function() {
  const tableBody = document.getElementById('tbody');
  const locationRow  = document.createElement('tr');
  tableBody.appendChild(locationRow);

  let locationName = document.createElement('td');
  locationName.textContent = this.name;
  locationRow.appendChild(locationName);

  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    const cookieSale = document.createElement('td');
    cookieSale.textContent = (this.cookiesPerHour[i]);
    locationRow.appendChild(cookieSale);
  }

  let locationTotal = document.createElement('td');
  locationTotal.textContent = this.dailyTotals;
  locationRow.appendChild(locationTotal);
};

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

/* CALCULATE FUNCTION */
Location.prototype.calculateSales = function (hours) {
  /* MATH FUNCTIONS */
  for(let hour = 0; hour < hours.length; hour++) {
    /* MATH FUNCTIONS */
    const randomCustomers = Math.floor(
      Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers
    );

    const cookiesSold     = Math.ceil(
      randomCustomers * this.avgCookiesPerCustomer
    );

    this.cookiesPerHour.push(cookiesSold);
    this.dailyTotals += cookiesSold;
    totals[hour] += cookiesSold;

    // Display the results on the page
    /* const listItem       = document.createElement('li');
    listItem.textContent = `${hour}: ${cookiesSold} cookies`;
    locUl.appendChild(listItem);
    salesList.appendChild(locUl); */
  }
};

/* ------------------- */

// Get a reference to an HTML element with the id "sales-list"
const salesList = document.getElementById('sales-list');
const locations = [seattle, tokyo, dubai, paris, lima];

// Define a function to generate hourly sales for a location
function generateHourlySales(location, hours) {
  const hourlySales          = [];
  const locationHeader       = document.createElement('h2');
  const locUl                = document.createElement('ul');
  locationHeader.classList.add('location-header');
  locationHeader.textContent = location.name;
  salesList.appendChild(locationHeader);

  for(let hour = 0; hour<hours.length;hour++) {
    /* MATH FUNCTIONS */
    const randomCustomers = Math.floor(
      Math.random() * (location.maxCustomers - location.minCustomers + 1) + location.minCustomers
    );
    const cookiesSold     = Math.ceil(
      randomCustomers * location.avgCookiesPerCustomer
    );
    hourlySales.push(cookiesSold);

    location.cookiesPerHour.push(cookiesSold);
    location.dailyTotals += cookiesSold;
    totals[hour] += cookiesSold;

    // Display the results on the page
    const listItem       = document.createElement('li');
    listItem.textContent = `${hour}: ${cookiesSold} cookies`;
    locUl.appendChild(listItem);
    salesList.appendChild(locUl);
  }

  // Calculate and display the total cookies sold for the day
  const totalCookies  = hourlySales.reduce((a, b) => a + b, 0);
  const totalUl       = document.createElement('ul');
  const totalListItem = document.createElement('li');

  totalUl.classList.add('total-sales');
  totalListItem.textContent = `Total: ${totalCookies} cookies`;
  totalUl.appendChild(totalListItem);
  salesList.appendChild(totalUl);
}

// Loop through each location and generate their hourly sales
locations.forEach(loc => {
  const hours     = [
    '6am','7am','8am','9am','10am','11am','12pm',
    '1pm','2pm','3pm','4pm','5pm','6pm','7pm'
  ];
  // generateHourlySales(loc, hours);
  loc.calculateSales(hours);
  loc.renderTable();
});

let reducedTotals = totals.reduce((a,b)=> a+b, 0);

renderTableFoot(totals);
cl(reducedTotals);
