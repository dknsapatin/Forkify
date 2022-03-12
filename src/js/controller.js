// Importing Model and View
import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
// ///////////////////////////////////////////////////////////////////////////////

// https://forkify-api.herokuapp.com/v2
// ///////////////////////////////////////////////////////////////////////////////
// Async function named controlRecipes | Once called, it will fetch for the API in the background --Convert the response into JSON and save as a data
const controlRecipes = async function () {
  try {
    // Getting the hash ID.
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    // 1) Loading Recipe
    await model.loadRecipe(id);
    // 2) Rendering Recipe to "render(data)" recipeView.js
    recipeView.render(model.state.recipe);
    // Replace hardcoded recipe source with assigned objects based on results
    // Catch if there are any errors and display them if it does.
  } catch (err) {
    recipeView.renderError();
  }
};
// ///////////////////////////////////////////////////////////////////////////////
// Refer to recipeView.js function addHandlerRender()
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
