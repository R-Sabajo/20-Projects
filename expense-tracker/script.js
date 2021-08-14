const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const newTransactionBtn = document.getElementById('newTransaction');
const newTransactionForm = document.getElementById('newTransactionForm');
const cancelTransactionBtn = document.getElementById('cancelTransactionBtn');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Show new transaction form
const showForm = () => {
  newTransactionForm.classList.add('show');
};

// Hide new transaction form
const hideForm = () => {
  newTransactionForm.classList.remove('show');
};

// Add transaction
const addTransaction = e => {
  e.preventDefault();

  // Check which radio button is selected. Expense or Income and return a negative or positive number to multiply the transaction amount with
  const plusMinus =
    document.querySelector('input[name="amountInfo"]:checked').value ===
    'expense'
      ? -1
      : 1;

  // create transaction object
  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value * plusMinus,
  };

  // push transaction to the transactions array
  transactions.push(transaction);

  addTransactionDOM(transaction);
  updateValues();
  updateLocalstorage();

  text.value = '';
  amount.value = '';
  newTransactionForm.classList.remove('show');
};

// Generate random ID
const generateID = () => {
  return Math.floor(Math.random() * 100000000);
};

//  Add transactions to DOM list
const addTransactionDOM = transaction => {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
  ${transaction.text} <span>€${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })" >X</button>
  
  `;
  list.appendChild(item);
};

// Update the balance, income and expense
const updateValues = () => {
  amounts = transactions.map(trans => trans.amount);

  incomeTotal = amounts
    .filter(amount => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2);

  expenseTotal = (
    amounts
      .filter(amount => amount < 0)
      .reduce((acc, amount) => (acc += amount), 0) * -1
  ).toFixed(2);

  balanceTotal = (incomeTotal - expenseTotal).toFixed(2);

  moneyPlus.innerText = `€${incomeTotal}`;
  moneyMinus.innerText = `€${expenseTotal}`;
  balance.innerText = `€${balanceTotal}`;
};

// Remove transaction by ID

const removeTransaction = id => {
  transactions = transactions.filter(trans => trans.id !== id);

  updateLocalstorage();

  initList();
};

// Init app transaction list
const initList = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
};

// Update local storage transactions
const updateLocalstorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

initList();

form.addEventListener('submit', addTransaction);

newTransactionBtn.addEventListener('click', showForm);

cancelTransactionBtn.addEventListener('click', hideForm);

// Serviceworker

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(res => console.log('service worker registered'))
      .catch(err => console.log('service worker NOT registered', err));
  });
}
