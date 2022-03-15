// Importing Model and View
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

// Coming from parcel
// if (module.hot) {
//   module.hot.accept;
// }

// ///////////////////////////////////////////////////////////////////////////////
// Async function named controlRecipes | Once called, it will fetch for the API in the background --Convert the response into JSON and save as a data
const controlRecipes = async function () {
  try {
    // Getting the hash ID.
    const id = window.location.hash.slice(1);
    // console.log(id);
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
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Call getQuery from searchView.js
    const query = searchView.getQuery();
    // If there arent any value inside the search field (query), just return
    if (!query) return;

    // 2) Call loadSearchResults from model.js
    await model.loadSearchResults(query);

    // Render Results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

// ///////////////////////////////////////////////////////////////////////////////
// Refer to views function
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
