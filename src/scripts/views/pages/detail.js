import ApiRestaurantSource from '../../data/api-restaurant-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import {
  createDetailRestaurantTemplate,
  createMenuFoodTemplate,
  createMenuDrinkTemplate,
  createCategoryTemplate,
} from '../template/template-creator';

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
    const foodContainer = document.querySelector('.foods-item');
    const drinkContainer = document.querySelector('.drinks-item');
    const categoryContainer = document.querySelector('.categories-item');

    const { foods, drinks } = restaurant.restaurant.menus;
    const { categories } = restaurant.restaurant;
    foods.forEach((item) => {
      foodContainer.innerHTML += createMenuFoodTemplate(item);
    });

    drinks.forEach((item) => {
      drinkContainer.innerHTML += createMenuDrinkTemplate(item);
    });
    categories.forEach((category) => {
      categoryContainer.innerHTML += createCategoryTemplate(category);
    });

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
