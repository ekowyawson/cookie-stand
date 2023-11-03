'use strict';

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

// Loop through each location and generate their hourly sales
locations.forEach(loc => {
  loc.calculateSales(hours);
  loc.renderTable();
});

// Render the footer row of the table
renderTableFoot(totals);

// ============================ EVENT LISTENER ============================
// Get DOM elements for event listener
const addLocationForm = document.getElementById('addLocationForm');
const footerTotals    = document.getElementById('tfoot-tr');

// The event listener function
addLocationForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  // Get user input from the form fields
  const name                  = document.getElementById('location-name').value;
  const minCustomers          = parseInt(document.getElementById('min-cust').value);
  const maxCustomers          = parseInt(document.getElementById('max-cust').value);
  const avgCookiesPerCustomer = parseFloat(document.getElementById('avg-sale').value);

  // Create a new Location instance with the user input
  const newLocation           = new Location(
    name,
    '6 am - 7 pm',
    '',
    '',
    minCustomers,
    maxCustomers,
    avgCookiesPerCustomer
  );

  // Add the new location to the locations array
  locations.push(newLocation);

  // Render the new location's table row.
  newLocation.calculateSales(hours);
  newLocation.renderTable();

  // Recalculate and update the totals in the footer
  totals.fill(0);
  locations.forEach(loc => {
    loc.cookiesPerHour.forEach((cookiesSold, index) => {
      totals[index] += cookiesSold;
    });
  });

  // Clear the old footer totals
  footerTotals.innerHTML = '';
  const footerTotalsHeading       = document.createElement('td');
  footerTotalsHeading.textContent = 'Hourly Totals For All Locations';
  footerTotals.appendChild(footerTotalsHeading);

  // Render the new footer totals
  totals.forEach(total => {
    const footerData       = document.createElement('td');
    footerData.textContent = total;
    footerTotals.appendChild(footerData);
  });

  // Calculate and add the sum of the totals
  const sumTotals       = document.createElement('td');
  sumTotals.textContent = totals.reduce((a, b) => a + b, 0);
  footerTotals.appendChild(sumTotals);
});
