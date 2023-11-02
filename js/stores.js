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
