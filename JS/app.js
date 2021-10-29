const gameStart = {
  name: "",
  description: "",
  version: "1.0.0",
  author: "Virginia Majuelo & Alvaro Teran",
  license: undefined,
  repository: undefined,
  ctx: undefined,
  canvasDOM: undefined,
  canvasSize: { width: undefined, height: undefined },
  frames: 60,
  intervalId: 0,
  count: 0,
  allCiticen: [],

  init() {
    this.setContext();
    this.setDimensions();
    this.start();
  },

  setContext() {
    this.canvasDOM = document.querySelector("#canvas");
    this.ctx = this.canvasDOM.getContext("2d");
  },

  setDimensions() {
    this.canvasDOM.setAttribute("width", window.innerWidth);
    this.canvasDOM.setAttribute("height", window.innerHeight);
    this.canvasSize.width = window.innerWidth;
    this.canvasSize.height = window.innerHeight;
  },

  start() {
    this.intervalId = setInterval(() => {
      this.clearScreen();
      this.drawAll();
      if (this.count % 240 === 0) {
        this.createCiticens();
        this.count = 0;
      }
      //   this.moveCiticent();
      this.count++;
    }, 1000 / this.frames);
  },

  drawAll() {
    this.createPlayBoard();
  },

  createPlayBoard() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height / 5);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      0,
      0,
      this.canvasSize.width / 5,
      (this.canvasSize.height / 5) * 2
    );
  },
  createCiticens() {
    this.randomDisplayCiticen = Math.floor(
      (Math.random() * this.canvasSize.width) / 10
    );
    this.speedYCiticents = Math.floor(Math.random() * 10);
    this.positionXCiticent =
      this.canvasSize.width / 20 + this.randomDisplayCiticen;
    this.allCiticen.push(
      new Citicent(
        this.ctx,
        this.positionXCiticent,
        this.canvasSize.height - 100,
        20,
        20,
        this.speedYCiticents
      )
    ); //Afinar tamaño de los ciudadanos
    console.log(this.allCiticen);
  },
  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  },
  clearAll() {},
  clearCiticent() {
    this.allCiticen.forEach(citicent);
  },
  moveCiticent() {
    this.allCiticen.forEach((citicent) => citicent.move());
  },

  //Crear el contador y darle posicion arriba a la derecha
  //   createScore(){

  //   }
};
