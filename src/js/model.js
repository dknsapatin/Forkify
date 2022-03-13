import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

import { API_URL } from './config';
import { getJSON } from './helpers';

// ///////////////////////////////////////////////////////////////////////////////
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

// ///////////////////////////////////////////////////////////////////////////////
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
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
    // Temporary Error handling
    console.error(`${err}💥💥💥`);
    //Throw err for controller.js to catch the error when called
    throw err;
  }
};

// ///////////////////////////////////////////////////////////////////////////////
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query; // Save each query input into state.
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    // Save each data recipe array into state | Map each array and return its values
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err}💥💥💥`);
    throw err;
  }
};
