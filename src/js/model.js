export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    // Fetch for the API
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}` //Place the hash id to fetch the specifc object recipe
    );
    // Convert constant "res" to JSON | Save it to constant "data"
    const data = await res.json();

    // Throw new error message base off of what the console says in each object
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Changing underscore objects with "."
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
