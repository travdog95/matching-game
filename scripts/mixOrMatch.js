import { AudioController } from "./audioController.js";

class MixOrMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
    this.audioController = new AudioController();
    this.matchedCards = [];
  }

  startGame() {
    this.cardToCheck = null;
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.matchedCards = [];
    this.busy = true;

    setTimeout(() => {
      this.audioController.startMusic();
      this.shuffleCards();
      this.countDown = this.startCountDown();
      this.busy = false;
    }, 500);

    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }

  flipCard(card) {
    if (this.canFlipCard(card)) {
      this.audioController.flip();
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add("visible");

      if (this.cardToCheck) {
        //check for match
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
      this.cardMatch(card);
    } else {
      this.cardMismatch(card, this.cardToCheck);
    }

    this.cardToCheck = null;
  }

  cardMatch(card) {
    this.matchedCards.push(card);
    this.matchedCards.push(this.cardToCheck);
    card.classList.add("matched");
    this.cardToCheck.classList.add("matched");
    this.audioController.match();

    if (this.matchedCards.length === this.cardsArray.length) {
      this.victory();
    }
  }

  cardMismatch(card, cardToCheck) {
    this.busy = true;
    setTimeout(() => {
      card.classList.remove("visible");
      cardToCheck.classList.remove("visible");
      this.busy = false;
    }, 1000);
  }

  getCardType(card) {
    return card.getElementsByClassName("card-value")[0].src;
  }

  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
      card.classList.remove("matched");
    });
  }

  shuffleCards() {
    let i = this.cardsArray.length - 1;
    //Implement fisher-yates shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (i; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      //exchange the positions using CSS Grid's order attribute
      this.cardsArray[randomIndex].style.order = i;
      this.cardsArray[i].style.order = randomIndex;
    }
  }

  canFlipCard(card) {
    //User can't click when Game is busy (animation is happening), matched card or card to check
    // return true;
    return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
  }

  startCountDown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;

      if (this.timeRemaining === 0) {
        this.gameOver();
      }
    }, 1000);
  }

  victory() {
    clearInterval(this.countDown);
    this.audioController.victory();
    document.getElementById("victory-text").classList.add("visible");
  }

  gameOver() {
    clearInterval(this.countDown);
    this.audioController.gameOver();
    document.getElementById("game-over-text").classList.add("visible");
  }
}

export { MixOrMatch };
