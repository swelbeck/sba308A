// cards.mjs

export function createCardItem(imgSrc, imgAlt, movieTitle, movieOverview) {
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

  return clone;
}

export function appendCards(element) {
  const carousel = document.querySelector("#cardInner");
  carousel.appendChild(element);
}

export function clear() {
  const cards = document.querySelector("#cardInner");
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
}
