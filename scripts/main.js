import { MixOrMatch } from "./mixOrMatch.js";

const overlays = Array.from(document.querySelectorAll(".overlay-text"));
const cards = Array.from(document.querySelectorAll(".card"));
const game = new MixOrMatch(100, cards);

overlays.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    overlay.classList.remove("visible");

    //Game start
    game.startGame();
  });
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    //Flip card
    game.flipCard(card);
  });
});
