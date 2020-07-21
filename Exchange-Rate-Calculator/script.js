const currency1 = document.getElementById('currency-one');
const currency2 = document.getElementById('currency-two');
const amount1 = document.getElementById('amount-one');
const amount2 = document.getElementById('amount-two');
const rateField = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
const calculate = () => {
  const currency_one = currency1.value;
  const currency_two = currency2.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/9d845ead2033beb895a73f23/latest/${currency_one}`
  )
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.conversion_rates[currency_two];

      rateField.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amount2.value = (amount1.value * rate).toFixed(2);
    });
};

// Event listeners
currency1.addEventListener('change', calculate);
amount1.addEventListener('input', calculate);
currency2.addEventListener('change', calculate);
amount2.addEventListener('input', calculate);

calculate();
