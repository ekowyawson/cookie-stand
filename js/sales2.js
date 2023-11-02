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
    const randomCustomers = Math.floor(
      Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers
    );

    const cookiesSold     = Math.ceil(
      randomCustomers * this.avgCookiesPerCustomer
    );

    this.cookiesPerHour.push(cookiesSold);
    this.dailyTotals += cookiesSold;
    totals[hour] += cookiesSold;
  }
};

/* ------------------- */
const locations = [seattle, tokyo, dubai, paris, lima];
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


/* TESTS */

/* let actionButton = document.getElementById('submit');

actionButton.addEventListener('click', function(e) {
  e.preventDefault();

  let locName      = document.getElementById('location-name');
  let minCustPerHr = document.getElementById('min-cust');
  let maxCustPerHr = document.getElementById('max-cust');
  let avgPerSale   = document.getElementById('avg-sale');

  if (locName.value.toLowerCase() === 'seattle') {
    cl('TRUEEEEEE');
    let hideRow = document.getElementById('seattle');
    hideRow.classList.add('hidden');
  }
}); */
