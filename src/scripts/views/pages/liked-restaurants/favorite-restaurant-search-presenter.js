class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurants }) {
    this._listenToSearchRequestByUser();
    this._favoriteRestaurants = favoriteRestaurants;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchRestaurants(event.target.value);
    });
  }

  _searchRestaurants(latesQuery) {
    this._latesQuery = latesQuery;
    this._favoriteRestaurants.searchRestaurants(this._latesQuery);
  }

  _showFoundRestaurants(restaurants) {
    const html = restaurants.reduce(
      (carry, restaurant) => carry.concat(`<li class="restaurant"><span class="restaurant__name">${restaurant.name || '-'}</span></li>`),
      '',
    );
    document.querySelector('.restaurants')
      .innerHTML = html;
  }

  get latesQuery() {
    return this._latesQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
