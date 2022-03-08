const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Async function named showRecipe | Once called, it will fetch for the API in the background --Convert the response into JSON and save as a data
const showRecipe = async function () {
  try {
    // Fetch for the API
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    // Convert constant "res" to JSON | Save it to constant "data"
    const data = await res.json();

    // Throw new error message base off of what the console says in each object
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Changing underscore objects with "."
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    console.log(res, data);
    // Catch if there are any errors and display them if it does.
  } catch (err) {
    alert(err);
  }
};

showRecipe();
