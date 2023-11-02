'use strict';
// const cl   = (input) => { console.log(input); };

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
