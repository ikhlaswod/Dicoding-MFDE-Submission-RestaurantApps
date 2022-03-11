import ApiRestaurantSource from '../../data/api-restaurant-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import {
  createDetailRestaurantTemplate,
  createMenuFoodTemplate,
  createMenuDrinkTemplate,
  createCategoryTemplate,
  createListReviewTemplate,
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

    const { foods, drinks } = restaurant.restaurant.menus;
    const foodContainer = document.querySelector('.foods-item');
    foods.forEach((item) => {
      foodContainer.innerHTML += createMenuFoodTemplate(item);
    });

    const drinkContainer = document.querySelector('.drinks-item');
    drinks.forEach((item) => {
      drinkContainer.innerHTML += createMenuDrinkTemplate(item);
    });

    const { categories, customerReviews } = restaurant.restaurant;
    const categoryContainer = document.querySelector('.categories-item');
    categories.forEach((category) => {
      categoryContainer.innerHTML += createCategoryTemplate(category);
    });

    const reviewContainer = document.querySelector('.list-review');
    customerReviews.forEach((review) => {
      reviewContainer.innerHTML += createListReviewTemplate(review);
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

    const ids = restaurant.restaurant.id;
    const nameReview = 'anonymous';
    const reviews = document.querySelector('#textReview').value;

    const reviewForm = document.querySelector('#reviewForm');

    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const reviewItem = {
        id: ids,
        name: nameReview,
        review: reviews,
      };
      await ApiRestaurantSource.postReview(reviewItem);
      // console.log(sendReview);
    });
  },

};

export default Detail;
