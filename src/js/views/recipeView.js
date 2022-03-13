import View from './View';

import icons from 'url:../../img/icons.svg';
import { Fractional } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find the recipe. Please try another one!';
  _message = '';

  _data;
  // ///////////////////////////////////////////////////////////////////////////////
  render(data) {
    //data AKA model.state.recipe from controller.js
    this._data = data; //stores model.state.recipe to data
    const markup = this._generateMarkup();
    this._clear();
    // Insert the new html markup to the DOM after clearing out innerHTML
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // ///////////////////////////////////////////////////////////////////////////////
  // This clears out anything inside the recipe container
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // ///////////////////////////////////////////////////////////////////////////////
  // Render Spinner
  renderSpinner() {
    const markup = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // ///////////////////////////////////////////////////////////////////////////////
  // Displaying Error message if model.js cannot find recipe
  renderError(message = this._errorMessage) {
    const markup = ` <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // ///////////////////////////////////////////////////////////////////////////////
  // Displaying Success message if model.js finds recipe
  renderMessage(message = this._message) {
    const markup = ` <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // ///////////////////////////////////////////////////////////////////////////////
  //Publisher subscriber pattern (Assigning controlRecipes as handler)
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  // ///////////////////////////////////////////////////////////////////////////////
  _generateMarkup() {
    return `
            <figure class="recipe__fig">
            <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${this._data.title}</span>
            </h1>
          </figure>

          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${
                this._data.cookingTime
              }</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${
                this._data.servings
              }</span>
              <span class="recipe__info-text">servings</span>

              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>

            <div class="recipe__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round">
              <svg class="">
                <use href="${icons}#icon-bookmark-fill"></use>
              </svg>
            </button>
          </div>



          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(this._generateIngredient).join('')}
            
          </div>

          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${
                this._data.publisher
              }</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${this._data.sourceUrl}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
    `;
  }
  _generateIngredient(ing) {
    return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quatity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
      </div>
      </li>
      `;
  }
}

export default new RecipeView();
