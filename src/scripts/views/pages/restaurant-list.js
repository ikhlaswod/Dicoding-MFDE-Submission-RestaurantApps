import ApiRestaurantSource from '../../data/api-restaurant-source';
import { createListRestaurantTemplate } from '../template/template-creator';

const RestaurantList = {
  async render() {
    return '';
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
