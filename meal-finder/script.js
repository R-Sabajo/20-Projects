const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
const searchMeal = e => {
  e.preventDefault();

  //  Clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;
  console.log(term);

  // Search API with term
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        resultHeading.innerHTML = `<h2>Search result for '${term}'</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>No results for '${term}'</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
          <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}" > 
                <h3>${meal.strMeal}</h3>
              </div>
          </div>`
            )
            .join('');
        }
      });
    //  Clear search text
    search.value = '';
  } else {
    // Check for empty
    alert('Please enter a search term');
  }
};

//  Fetch meal by ID
const getMealById = mealID => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(
    res =>
      res.json().then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
      })
  );
};

//  Fetch Random Meal
const getRandomMeal = () => {
  //  Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
};

// Add meal to DOM
const addMealToDOM = meal => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
  <div class="single-meal">
    <button id="closeBtn">
    <i class="fas fa-times"></i>
    </button>
    <h1>${meal.strMeal}</h1>
    <img  src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>
  `;
  single_mealEl.style.visibility = 'visible';

  closeBtn.addEventListener('click', () => {
    single_mealEl.style.visibility = 'hidden';
  });
};

// Event Listeners

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
