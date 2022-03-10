import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import CONFIG from '../globals/config';
import { createLikeButtonTemplate, createDislikeButtonTemplate } from '../views/template/template-creator';
import NotificationHelper from './notification-helper';

const LikeButtonInitiator = {

  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderDislike();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
      NotificationHelper.sendNotification({
        title: `Adding ${this._restaurant.name} to Favorite`,
        options: {
          body: this._restaurant.description,
          image: `${CONFIG.BASE_IMAGE_URL + this._restaurant.pictureId}`,
        },
      });
    });
  },

  _renderDislike() {
    this._likeButtonContainer.innerHTML = createDislikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
      NotificationHelper.sendNotification({
        title: `Remove ${this._restaurant.name} from Favorite`,
        options: {
          body: this._restaurant.description,
          image: `${CONFIG.BASE_IMAGE_URL + this._restaurant.pictureId}`,
        },
      });
    });
  },

};

export default LikeButtonInitiator;
