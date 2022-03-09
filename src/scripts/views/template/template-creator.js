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
        <h2>${restaurant.name}</h2>
        <p>${restaurant.description}</p>
    </div>
</div>
`;

const createDetailRestaurantTemplate = (restaurant) => `
<h1>Detail Restaurant ${restaurant.name}</h1>
`;

export {
  createListRestaurantTemplate,
  createDetailRestaurantTemplate,
};
