import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class ApiRestaurantSource {
  static async restaurantList() {
    const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async postReview(review) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY,
      },
      body: JSON.stringify(review),
    });
    return response;
  }
}

export default ApiRestaurantSource;
