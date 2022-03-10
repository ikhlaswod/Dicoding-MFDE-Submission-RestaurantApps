import ApiRestaurantSource from '../../data/api-restaurant-source';
import UrlParser from '../../routes/url-parser';
import { createDetailRestaurantTemplate, createLikeButtonTemplate } from '../template/template-creator';

const Detail = {
  async render() {
    return `
    <section class="content">
      <div class="restaurant">

      </div>
      <div id="likeButtonContainer"></div>
    </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parserActiveWithoutCombiner();
    const restaurant = await ApiRestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('.restaurant');
    restaurantContainer.innerHTML = createDetailRestaurantTemplate(restaurant.restaurant);

    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    likeButtonContainer.innerHTML = createLikeButtonTemplate();
  },
};

export default Detail;
