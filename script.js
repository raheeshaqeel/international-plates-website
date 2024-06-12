// Burger menus
document.addEventListener('DOMContentLoaded', function() {
// open
const burger = document.querySelectorAll('.navbar-burger');
const menu = document.querySelectorAll('.navbar-menu');

if (burger.length && menu.length) {
    for (var i = 0; i < burger.length; i++) {
        burger[i].addEventListener('click', function() {
            for (var j = 0; j < menu.length; j++) {
                menu[j].classList.toggle('hidden');
            }
        });
    }
}

// close
const close = document.querySelectorAll('.navbar-close');
const backdrop = document.querySelectorAll('.navbar-backdrop');

if (close.length) {
    for (var i = 0; i < close.length; i++) {
        close[i].addEventListener('click', function() {
            for (var j = 0; j < menu.length; j++) {
                menu[j].classList.toggle('hidden');
            }
        });
    }
}

if (backdrop.length) {
    for (var i = 0; i < backdrop.length; i++) {
        backdrop[i].addEventListener('click', function() {
            for (var j = 0; j < menu.length; j++) {
                menu[j].classList.toggle('hidden');
            }
        });
    }
}
});
     
 //  list-menu
let allMeals = [];
let displayedMeals = 0;
const mealsPerPage = 4;

async function fetchMeals() {
try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data.meals;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function createCard(meal) {
    return `
        <div class="card w-full bg-neutral-800 shadow-xl rounded-lg overflow-hidden">
              <figure class="w-full h-48 overflow-hidden">
                  <a href="${meal.strYoutube}" target="_blank">
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="object-cover w-full h-full"/>
                  </a>
              </figure>
              <div class="card-body p-4">
                  <h2 class="card-title text-lg text-green-500">${meal.strMeal}</h2>
                  <p class="text-sm text-white">Category: ${meal.strCategory}</p>
                  <p class="text-sm text-white">Country: ${meal.strArea}</p>
                  <div class="card-actions justify-center mt-4">
                    <a href="${meal.strYoutube}" target="_blank" class="btn btn-sm bg-yellow-500 hover:bg-green-500 text-white outline-none rounded-full py-1 px-4">Watch on YouTube</a>
                    <a href="${meal.strSource}" target="_blank" class="btn btn-sm bg-yellow-500 hover:bg-green-500 text-white outline-none rounded-full py-1 px-4">Click for Source</a>
                </div>
            </div>
        </div>
    `;
}

function displayMeals() {
    const mealContainer = document.getElementById('list-menu');
    const end = displayedMeals + mealsPerPage;
    const mealsToDisplay = allMeals.slice(displayedMeals, end);

    mealsToDisplay.forEach(meal => {
        mealContainer.innerHTML += createCard(meal);
      });

      displayedMeals = end;

      if (displayedMeals >= allMeals.length) {
        document.getElementById('load-more').style.display = 'none';
    }
}

async function initializeMeals() {
    allMeals = await fetchMeals();
    displayMeals();
}

    document.getElementById('load-more').addEventListener('click', displayMeals);

    initializeMeals();

    // search-menu
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.querySelector('form');
      const searchInput = document.getElementById('meal-search');
      const resultsContainer = document.getElementById('search-menu');
  
      form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const query = searchInput.value.trim();
          if (query) {
              const meals = await fetchMeals(query);
              displayMeals(meals);
          }
      });
  
      async function fetchMeals(query) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
          const data = await response.json();
          return data.meals || [];
      }
  
      function displayMeals(meals) {
          resultsContainer.innerHTML = meals.slice(0, 2).map(createCard).join('');
      }
  
      function createCard(meal) {
          const ingredients = getIngredients(meal);
  
          return `
              <div class="card w-full h-full bg-neutral-800 shadow-xl rounded-lg overflow-hidden">
                  <figure class="w-full h-48 overflow-hidden">
                      <a href="${meal.strYoutube}" target="_blank">
                          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="object-cover w-full h-full"/>
                      </a>
                  </figure>
                  <div class="p-4 ">
                      <h2 class="text-lg text-green-500 font-semibold">${meal.strMeal}</h2>
                      <p class="text-sm text-white">Ingredients:<br>${ingredients.join('')}</p>
                      <p class="text-sm text-white mt-4">Instruction:<br>${meal.strInstructions}</p>
                      <div class="mt-4 flex justify-center gap-2">
                          <a href="${meal.strYoutube}" target="_blank" class="btn bg-yellow-500 hover:bg-green-500 text-white px-4 py-2 rounded">Watch on YouTube</a>
                          <a href="${meal.strSource}" target="_blank" class="btn bg-yellow-500 hover:bg-green-500 text-white px-4 py-2 rounded">Click for Source</a>
                      </div>
                  </div>
              </div>
          `;
      }
  
      function getIngredients(meal) {
          let ingredients = [];
          for (let i = 1; i <= 20; i++) {
              let ingredient = meal[`strIngredient${i}`];
              let measure = meal[`strMeasure${i}`];
              if (ingredient && ingredient.trim() !== "") {
                  ingredients.push(`&#149; ${measure} ${ingredient}.<br>`.trim());
              }
          }
          return ingredients;
      }
  });

  // faq-section
   document.querySelectorAll('[id^="question"]').forEach(function(button, index) {
    button.addEventListener('click', function() {
        var answer = document.getElementById('answer' + (index + 1));
        var arrow = document.getElementById('arrow' + (index + 1));

        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block';
            arrow.style.transform = 'rotate(0deg)';
        } else {
            answer.style.display = 'none';
            arrow.style.transform = 'rotate(-180deg)';
        }
    });
});