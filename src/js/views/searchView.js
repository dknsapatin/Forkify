class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    //   Get the value of the search field
    const query = this.#parentEl.querySelector('.search__field').value;
    // Clears the input field for the next search input value
    this.#clearInput();
    return query;
  }

  #clearInput() {
    return (this.#parentEl.querySelector('.search__field').value = '');
  }

  // ///////////////////////////////////////////////////////////////////////////////
  //Publisher subscriber pattern (Assigning controlRecipes as handler)
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
