// cards.mjs

export function createCardItem(imgSrc, imgAlt){
  const template = document.querySelector("#cardItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);

  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = imgAlt;

  return clone;
};

export function appendCards(element) {
  const carousel = document.querySelector("#cardInner");
  carousel.appendChild(element);
}
