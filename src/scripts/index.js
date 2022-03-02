import 'regenerator-runtime'; /* for async await transpile */
import '../styles/css/main.css';
import '../styles/main.scss';

const hamburgerButtonElement = document.querySelector("#menu");
const navListElement = document.querySelector(".nav-list");
const mainElement = document.querySelector("main");

hamburgerButtonElement.addEventListener("click", event => {
    navListElement.classList.toggle("open");
    event.stopPropagation();
})
mainElement.addEventListener("click", event => {
    navListElement.classList.remove("open");
    event.stopPropagation();
})