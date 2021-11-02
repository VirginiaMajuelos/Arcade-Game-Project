const inicialMenu = document.getElementById("inicial-menu");
const play = document.getElementById("canvas");

document.getElementById("start-button").onclick = () => {
  inicialMenu.classList.remove("display");
  inicialMenu.classList.add("hidden");
  play.classList.add("display");
  play.classList.remove("hidden");
  gameStart.init();
};
