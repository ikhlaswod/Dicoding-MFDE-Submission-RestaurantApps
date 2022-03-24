import { createDetailRestaurantTemplate } from '../../template/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    // return `
    //   <div id="restaurant-search-container">
    //       <input id="query" type="text">
    //       <div class="restaurant-result-container">
    //           <ul class="restaurants">
    //           </ul>
    //       </div>
    //   </div>
    //   `;
    return `
       <div class="content">
          <input id="query" type="text">
           <h2 class="content__heading">Your Liked Restaurant</h2>
           <div id="restaurant-search-container">
              <div id="restaurants" class="restaurants">

              </div>
           </div>
       </div>
       `;
  }

  // getFavoriteRestaurantTemplate() {
  //   return `
  //      <div class="content">
  //          <h2 class="content__heading">Your Liked Restaurant</h2>
  //          <div id="restaurants" class="restaurants">
  //          </div>
  //      </div>
  //      `;
  // }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants = []) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(createDetailRestaurantTemplate(restaurant)),
        '',
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.querySelector('.restaurants')
      .innerHTML = html;

    document.getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurants:searched:updated'));

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createDetailRestaurantTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurants-item__not__found">Tidak ada restaurant yang dapat ditampilkan</div>';
  }
}

export default FavoriteRestaurantSearchView;
