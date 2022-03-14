import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  // ///////////////////////////////////////////////////////////////////////////////
  render(data) {
    // if there is no data || or if there is data but the length is 0
    if (!data || (Array.isArray(data) && data.length === 0))
      // return the error message
      return this.renderError();

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
}
