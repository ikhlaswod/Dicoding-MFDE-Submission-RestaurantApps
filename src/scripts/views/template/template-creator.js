import CONFIG from '../../globals/config';

const createListRestaurantTemplate = (restaurant) => `
<div class="list-item">
    <div class="list-head">
        <figure>
            <figcaption>${restaurant.city || '-'}</figcaption>
            <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name || '-'}">
        </figure>
    </div>
    <div class="list-text">
        <h4>Rating : ${restaurant.rating}</h4>
        <h2><a href="${`/#/detail/${restaurant.id || '-'}`}">${restaurant.name || '-'}</a></h2>
        <p>${restaurant.description || '-'}</p>
    </div>
</div>
`;

const createDetailRestaurantTemplate = (restaurant) => `
<div class="detail-item">
    <div class="detail-poster">
        <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name || '-'}">
    </div>
    <div class="detail-info">
        <div class="restaurant-information">
            <h1>Information</h1>
            <hr style="height:2px;border-width:0;color:black;background-color:black">
            <div class="card restaurant">
                <h2 class="restaurant__name">${restaurant.name || '-'}</h2>
                <hr>
                <p>${restaurant.description || '-'}</p>
            </div>
            <div class="info-category card">
                <h3>Category</h3>
                <hr>
                <p class="categories-item"></p>
            </div>
            <div class="info-menu card">
                <h3>Menu</h3>
                <hr>
                <div class="menu-item">
                  <div class="menu-food"> 
                    <h4>Foods</h4>
                    <hr class="hr-menu">
                    <div class="foods-item">

                    </div>
                  </div>
                  <div class="menu-drink">
                    <h4>Drinks</h4>
                    <hr class="hr-menu">
                    <div class="drinks-item">

                    </div>
                  </div>
                </div>
            </div>
            <div class="card">
                <h3>Rating</h3>
                <hr>
                <p>${restaurant.rating || '-'}</p>
            </div>
        </div>
        <div class="restaurant-review">
            <h1>Reviews</h1>
            <hr style="height:2px;border-width:0;color:black;background-color:black">
            <div class="list-review">
                
            </div>
            <div class="form-review card">
                <form id="reviewForm">
                  <input type="text" id="reviewName" class="input-review" placeholder="Anonymous">
                  <textarea id="reviewText" class="txtarea-style" placeholder="Your review..."></textarea>
                  <button type="submit" class="btn-submit" id="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>

`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createDislikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createMenuFoodTemplate = (food) => `
    <p>${food.name}</p>
`;

const createMenuDrinkTemplate = (drink) => ` 
    <p>${drink.name}</p>
`;

const createCategoryTemplate = (categories) => `
${categories.name} |
`;

const createListReviewTemplate = (review) => `
<div class="review-item card">
  <h3>${review.name}</h3>
  <hr>
  <p>${review.review}</p>
  <p>${review.date}</p>
</div>
`;
export {
  createListRestaurantTemplate,
  createDetailRestaurantTemplate,
  createLikeButtonTemplate,
  createDislikeButtonTemplate,
  createMenuFoodTemplate,
  createMenuDrinkTemplate,
  createCategoryTemplate,
  createListReviewTemplate,

};
