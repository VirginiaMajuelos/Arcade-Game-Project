const inicialMenu = document.getElementById("inicial-menu");
const play = document.getElementById("canvas");
const replay = document.getElementById("replay");
const win = document.getElementById("win");
sounds.menuMusic.play();

document.getElementById("start-button").onclick = () => {
  sounds.menuMusic.pause();
  sounds.menuMusic.currentTime = 0;
  inicialMenu.classList.remove("display");
  inicialMenu.classList.add("hidden");
  play.classList.add("display");
  play.classList.remove("hidden");
  gameStart.init();
};

document.getElementById("new-game").onclick = () => {
  gameStart.init();
};

document.getElementById("new-game2").onclick = () => {
  gameStart.init();
};
