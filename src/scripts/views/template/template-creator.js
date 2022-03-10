import CONFIG from '../../globals/config';

const createListRestaurantTemplate = (restaurant) => `
<div class="list-item">
    <div class="list-head">
        <figure>
            <figcaption>${restaurant.city}</figcaption>
            <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="">
        </figure>
    </div>
    <div class="list-text">
        <h4>Rating : ${restaurant.rating}</h4>
        <h2><a href="${`/#/detail/${restaurant.id}`}">${restaurant.name}</a></h2>
        <p>${restaurant.description}</p>
    </div>
</div>
`;

const createDetailRestaurantTemplate = (restaurant) => `
<div class="detail-item">
    <div class="detail-poster">
        <img src="../images/heros/hero-image_2.jpg" alt="">
        <div class="detail-info">
            <h2>Information</h2>
            <hr style="height:2px;border-width:0;color:black;background-color:black">
            <h4>${restaurant.name} Oke</h4>
            <p>${restaurant.description}</p>
            <h4>Category</h4>
            <p>Italia, Modern</p>
            <h4>Menu</h4>
            <h5>Food</h5>
            <p>Pizza</p>
            <p>Burger</p>
            <h5>Drink</h5>
            <p>Sirup</p>
            <p>Marjan</p>
            <h4>Rating</h4>
            <p>${restaurant.rating}</p>
        </div>
    </div>
</div>
`;

export {
  createListRestaurantTemplate,
  createDetailRestaurantTemplate,
};
