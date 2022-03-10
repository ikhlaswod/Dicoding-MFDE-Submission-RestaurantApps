import ApiRestaurantSource from '../../data/api-restaurant-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { createDetailRestaurantTemplate } from '../template/template-creator';

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

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        description: restaurant.restaurant.description,
        pictureId: restaurant.restaurant.pictureId,
        city: restaurant.restaurant.city,
        rating: restaurant.restaurant.rating,
      },
    });
  },
};

export default Detail;
