const overlays = Array.from(document.querySelectorAll(".overlay-text"));
const cards = Array.from(document.querySelectorAll(".card"));

overlays.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    overlay.classList.remove("visible");

    //Game start
    const gameAudio = new AudioController();
    gameAudio.startMusic();
  });
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    //Flip card
    console.log("Card flipped");
  });
});

class AudioController {
  constructor() {
    this.bgMusic = new Audio("Assets/Audio/creepy.mp3");
    this.flipSound = new Audio("Assets/Audio/flip.wav");
    this.matchSound = new Audio("Assets/Audio/match.wav");
    this.victorySound = new Audio("Assets/Audio/victory.wav");
    this.gameOverSound = new Audio("Assets/Audio/gameover.wav");
    this.bgMusic.volume = 0.5;
    this.bgMusic.loop = true;
  }

  startMusic() {
    this.bgMusic.play();
  }

  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }

  flip() {
    this.flipSound.play();
  }

  match() {
    this.matchSound.play();
  }

  victory() {
    this.stopMusic();
    this.victory.play();
  }

  gameOver() {
    this.stopMusic();
    this.gameOverSound.play();
  }
}

class MixOrMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
    this.audioController = new AudioController();
  }

  startGame() {
    this.cardToCheck = null;
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.matchCards = [];
    this.busy = true;
  }
}
