class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurants, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteRestaurants = favoriteRestaurants;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latesQuery) => {
      this._searchRestaurants(latesQuery);
    });
  }

  async _searchRestaurants(latesQuery) {
    this._latesQuery = latesQuery.trim();

    let foundRestaurants;
    if (this.latesQuery.length > 0) {
      foundRestaurants = await this._favoriteRestaurants.searchRestaurants(this.latesQuery);
    } else {
      foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
    }

    this._showFoundRestaurants(foundRestaurants);
  }

  _showFoundRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }

  get latesQuery() {
    return this._latesQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
