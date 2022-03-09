import ApiRestaurantSource from '../../data/api-restaurant-source';
import UrlParser from '../../routes/url-parser';

const Detail = {
  async render() {
    return `
        <h1>Explore Restaurant</h1>
    `;
  },

  async afterRender() {
    const url = UrlParser.parserActiveWithoutCombiner();
    const restaurant = await ApiRestaurantSource.detailRestaurant(url.id);
    console.log(restaurant);
  },

};

export default Detail;
