import ApiRestaurantSource from '../../data/api-restaurant-source';

const RestaurantList = {
  async render() {
    return `
        <h1>Explore Restaurant</h1>
        <h1>Explore Restaurant</h1>
        <h1>Explore Restaurant</h1>
    `;
  },

  async afterRender() {
    const restaurants = await ApiRestaurantSource.restaurantList();
    console.log(restaurants);
  },

};
export default RestaurantList;
