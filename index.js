const mealsData = async (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  const res = await fetch(url);
  const mealsData = await res.json();
  displayMealsData(mealsData.meals);
};

displayMealsData = (meals) => {
  console.log(meals);
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = ``;
  const noMealFound = document.getElementById("no-meal-found");
  if (meals == null) {
    noMealFound.classList.remove("d-none");
  } else {
    noMealFound.classList.add("d-none");
  }

  meals?.forEach((meal) => {
    console.log(meal);
    const modalId = `modal-${meal?.idMeal}`;
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
        <div class="card">
            <img src="${meal?.strMealThumb}" class="card-img-top" height="280px" alt="${meal?.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${meal?.strMeal}</h5>
                <p class="card-text">
                <!-- Button trigger modal -->
                <button id="meal-details-${meal?.idMeal}" type="button" class="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#${modalId}">
                See full details
                </button>
                </p>
            </div>
              <!-- Modal -->
              <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="${modalId}-label">${meal?.strMeal}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div>
                      Ingredient
                      <ul>
                        <li>${meal?.strIngredient1}</li>
                        <li>${meal?.strIngredient2}</li>
                        <li>${meal?.strIngredient3}</li>
                        <li>${meal?.strIngredient4}</li>
                      </ul>
                    </div>
                    <div>
                    Instruction
                    <p>
                      ${meal?.strInstructions.slice(1,300)}
                    </p>
                    </div>
                    <div class="fw-bold">
                      Watch more on <a href="${meal?.strYoutube}" target="_blank">YouTube</a>
                    </div>
                  </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
    mealContainer.appendChild(mealDiv);
  });
};


document.getElementById("meal-search").addEventListener("click", function () {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  mealsData(searchText);
});