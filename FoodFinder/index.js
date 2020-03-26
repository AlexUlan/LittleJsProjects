const searchInput = document.querySelector("#search"),
  formMeal = document.querySelector("#submint"),
  searchBtn = document.querySelector("#search-btn"),
  randomBtn = document.querySelector("#random"),
  resultHeading = document.querySelector("#result-heading"),
  meals = document.querySelector("#meals"),
  mealSingleEl = document.querySelector("#single-meal");

//отправка формы
function handleForm(e) {
  e.preventDefault();

  const searchValue = searchInput.value.trim();

  if (searchValue) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
      .then(res => res.json())
      .then(dishes => {
        resultHeading.innerHTML = `<h2>At your request ${searchValue}:</h2>`;

        if (dishes.meals === null) {
          resultHeading.innerHTML = `<p>At your request ${searchValue}: Not found</p>`;
          meals.innerHTML = "";
        } else {
          meals.innerHTML = `${
            dishes.meals !== null
              ? dishes.meals
                  .map(meal => {
                    return `<div class = "meal" >
                     <img src=${meal.strMealThumb} alt = ${meal.strMeal}/>  
                     <div class="meal-info" data-mealId = ${meal.idMeal}>
                      <h3>${meal.strMeal}</h3>
                     </div>  
                    </div>`;
                  })
                  .join("")
              : "<p>At your request : Not found</p>"
          }`;
        }
      });
    searchInput.value = "";
  } else {
    alert("Enter your dish");
  }
}

formMeal.addEventListener("submit", handleForm);

function getmealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(mel => {
      if (mel.meals[0]) {
        addSinleMealInDom(mel.meals[0]);
      }
    });
}

function addSinleMealInDom(meal) {
  const ingridient = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingridient.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`,
      );
    } else {
      break;
    }
  }
  mealSingleEl.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <p>${meal.strInstructions}</p>
    <ul>
    ${ingridient
      .map(ing => {
        return `<li>${ing}</li>`;
      })
      .join("")}
    </ul>
  `;
}

meals.addEventListener("click", e => {
  const mealinfo = e.path.find(item => {
    return item.classList.contains("meal-info");
  });

  getmealById(mealinfo.getAttribute("data-mealId"));
});

function getRandommeal() {
  meals.innerHTML = "";
  mealSingleEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(meal => {
      addSinleMealInDom(meal.meals[0]);
    });
}

randomBtn.addEventListener("click", getRandommeal);
