import { createListRestaurantTemplate } from '../../template/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
      <section class="content">
      <div class="restaurant-container">
        <input id="query" type="text">
          <h1>Your Favorite Restaurant</h1>
          <div id="restaurantList" class="restaurants">

          </div>
        </div>
      </section>
       `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createListRestaurantTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurantList').innerHTML = html;

    document.getElementById('restaurantList').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurants-item__not__found">Tidak ada restaurant yang dapat ditampilkan</div>';
  }
}

export default FavoriteRestaurantSearchView;
