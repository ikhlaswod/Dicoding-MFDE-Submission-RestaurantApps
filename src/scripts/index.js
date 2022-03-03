import 'regenerator-runtime';
import '../styles/css/main.css';
import '../styles/main.scss';

import data from '../data/DATA.json';

const hamburgerButtonElement = document.querySelector("#menu");
const navListElement = document.querySelector(".nav-list");
const mainElement = document.querySelector("main");


const restaurantListElement = document.querySelector("#restaurantList")



hamburgerButtonElement.addEventListener("click", event => {
    navListElement.classList.toggle("open");
    event.stopPropagation();
})
mainElement.addEventListener("click", event => {
    navListElement.classList.remove("open");
    event.stopPropagation();
})
document.addEventListener("DOMContentLoaded", () => {
    restaurantListElement.innerHTML = "";
    data.restaurants.forEach(restaurant => {
        restaurantListElement.innerHTML += `
        
        <div class="list-item">
            <div class="list-head">
                <figure>
                    <figcaption>${restaurant.city}</figcaption>
                    <img src="${restaurant.pictureId}" alt="">
                </figure>
            </div>
            <div class="list-text">
                <h4>Rating : ${restaurant.rating}</h4>
                <h2>${restaurant.name}</h2>
                <p>${restaurant.description}</p>
            </div>
        </div>
        `;
    })


})