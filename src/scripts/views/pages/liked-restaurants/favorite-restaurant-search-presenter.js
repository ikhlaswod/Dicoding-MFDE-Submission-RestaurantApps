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
    const html = restaurants.reduce(
      (carry, restaurant) => carry.concat(`<li class="restaurant"><span class="restaurant__name">${restaurant.name || '-'}</span></li>`),
      '',
    );
    document.querySelector('.restaurants')
      .innerHTML = html;

    document.getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurants:searched:updated'));
  }

  get latesQuery() {
    return this._latesQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
