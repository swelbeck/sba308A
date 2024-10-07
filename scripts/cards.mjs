// cards.mjs

export function createCardItem(
  imgSrc,
  imgAlt,
  movieTitle,
  movieOverview,
  yearReleased,
  director
) {
  const template = document.querySelector("#cardItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);

  // Poster Images
  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = imgAlt;

  // Movie Titles
  const title = clone.querySelector("h3");
  title.textContent = movieTitle;

  // Movie Descriptions
  const description = clone.querySelector("p");
  description.textContent = movieOverview;

  // Year Released
  const releaseYear = clone.querySelector("#year-released-li");
  releaseYear.textContent = yearReleased;

  // Director Name
  const directorName = clone.querySelector("#director-li");
  directorName.textContent = director;

  return clone;
}

export function appendCards(element) {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("col");
  cardWrapper.appendChild(element);

  const carousel = document.querySelector("#cardInner");
  carousel.appendChild(element);
}

export function clear() {
  const cards = document.querySelector("#cardInner");
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
}
