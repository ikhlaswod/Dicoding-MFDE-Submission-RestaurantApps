import ApiRestaurantSource from '../../data/api-restaurant-source';
import { createListRestaurantTemplate } from '../template/template-creator';

const RestaurantList = {
  async render() {
    return `
    <div class="jumbotron">
      <picture>
          <source media="(max-width: 600px)" srcset="./images/hero-image_2-small.jpg">
          <img 
              class="lazyload" 
              width="100%" height="100%"
              data-src="./images/hero-image_2-large.jpg" 
              alt="Alteon Poster"></img>
      
      </picture>
    </div>
    <section class="content">
      <div class="restaurant-container">
          <h1 class="title">Explore Restaurant</h1>
          <div id="restaurantList">
    
          </div>
      </div>
    </section>
      `;
  },

  async afterRender() {
    const restaurants = await ApiRestaurantSource.restaurantList();
    const restaurantContainer = document.querySelector('#restaurantList');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createListRestaurantTemplate(restaurant);
    });
  },

};
export default RestaurantList;
