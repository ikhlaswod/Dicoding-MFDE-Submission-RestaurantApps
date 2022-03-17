class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurants }) {
    this._listenToSearchRequestByUser();
    this._favoriteRestaurants = favoriteRestaurants;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._latesQuery = event.target.value;
      this._favoriteRestaurants.searchRestaurants(this._latesQuery);
    });
  }

  get latesQuery() {
    return this._latesQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
