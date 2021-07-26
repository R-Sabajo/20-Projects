const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
let dataFilter = [];

getRandomUser();
getRandomUser();
getRandomUser();

//  Fetch randum user and add random money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  let user = data.results[0].name;

  const newUser = {
    name: `${user.first} ${user.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//  double everyone's money
const doubleMoney = () => {
  data = data.map(person => {
    return { ...person, money: person.money * 2 };
  });

  updateDOM();
};

// Sort people by richest
const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

//  filter only Millionaires
const showMillionaires = () => {
  dataFilter = data.filter(person => person.money > 1000000);

  updateDOM(dataFilter);
};

//  Calculate total money

const calculateWealth = () => {
  const wealth = data.reduce((acc, person) => (acc += person.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
};

// add new obj to data array
const addData = obj => {
  data.push(obj);

  updateDOM();
};

// Update DOM
const updateDOM = (providedData = data) => {
  //  Clear main DIV

  main.innerHTML = `
  <h2>
    <strong>Person</strong> Wealth
  </h2>
`;

  providedData.forEach(person => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
};

//  Format number as Money

const formatMoney = num => {
  return '€ ' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

//  Eventlisteners
addUserBtn.addEventListener('click', () => {
  getRandomUser();
});

doubleBtn.addEventListener('click', () => {
  doubleMoney();
});

sortBtn.addEventListener('click', () => {
  sortByRichest();
});

showMillionairesBtn.addEventListener('click', () => {
  showMillionaires();
});

calculateWealthBtn.addEventListener('click', () => {
  calculateWealth();
});
