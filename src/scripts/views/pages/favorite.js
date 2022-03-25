import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createListRestaurantTemplate } from '../template/template-creator';

const Favorite = {

  async render() {
    return `
            <section class="content">
              <div class="restaurant-container">
                  <h1>Your Favorite Restaurant</h1>
                  <div id="restaurantList">

                  </div>
              </div>
            </section>
        `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurantList');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createListRestaurantTemplate(restaurant);
    });
  },

};

export default Favorite;
