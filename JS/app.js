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
  sky: undefined,
  goal: undefined,
  player: undefined,
  saveCitizens: 0,
  eliminatedCitizens: 0,
  intervalId: 0,
  framesCount: 0,
  scoreBoard: undefined,
  allCitizens: [],
  allEnemies: [],
  keys: {
    player: {
      ARROW_DOWN: "ArrowDown",
      ARROW_UP: "ArrowUp",
      ARROW_LEFT: "ArrowLeft",
      ARROW_RIGHT: "ArrowRight",
    },
  },

  init() {
    this.setContext();
    this.setDimensions();
    this.createAll();
    //this.createPlayer();
    this.setListeners();
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
      this.framesCount++;

      if (this.framesCount > 2000) {
        this.framesCount = 0;
      }

      if (this.framesCount % 240 === 0) {
        this.createCitizens();
      }

      if (this.framesCount % 120 === 0) {
        this.createEnemies();
      }

      this.clearScreen();
      this.drawAll();
      this.moveAll();
      this.colisionCitizens();
      this.clearAll();
    }, 1000 / this.frames);
  },

  createAll() {
    this.createBackgroundSky();
    this.createBackgroundShip();
    this.createScoreBoard();
  },

  drawAll() {
    //this.drawPlayer();
    this.createPlayBoard();
    this.drawBackgroundSky();
    this.drawBackground();
    this.drawCitizens();
    this.drawEnemies();
    this.drawScoreBoard();
  },

  moveAll() {
    this.moveCitizens();
    this.moveEnemies();
  },

  clearAll() {
    this.clearCitizens();
    this.clearEnemies();
  },

  drawPlayer() {
    this.player.draw();
  },

  drawEnemies() {
    this.allEnemies.forEach((enemy) => {
      enemy.draw();
    });
  },

  drawCitizens() {
    this.allCitizens.forEach((citizen) => {
      citizen.draw();
    });
  },

  drawBackgroundSky() {
    this.sky.draw();
  },

  drawBackground() {
    this.goal.draw();
  },

  drawScoreBoard() {
    this.scoreBoard.draw(this.saveCitizens, this.eliminatedCitizens);
  },

  moveEnemies() {
    this.allEnemies.forEach((enemy) => enemy.move());
  },

  moveCitizens() {
    this.allCitizens.forEach((citizen) => citizen.move());
  },

  colisionCitizens() {
    this.allCitizens.forEach((citizen) =>
      citizen.colision(this.goal, this.saveCitizens)
    );
  },

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  },

  createPlayBoard() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  },

  createBackgroundSky() {
    this.sky = new Background(
      this.ctx,
      0,
      0,
      this.canvasSize.width,
      this.canvasSize.height / 5,
      "sky.png"
    );
  },

  createBackgroundShip() {
    this.goal = new Background(
      this.ctx,
      0,
      0,
      this.canvasSize.width / 5,
      (this.canvasSize.height / 5) * 2,
      "descarga.jpeg"
    );
  },

  createPlayer() {
    this.player = new Player(0, 0, 100, 100, 20);
    //Definir posteriormente velocidad del jugador para los potenciadores
  },

  createCitizens() {
    this.randomDisplayCitizen = Math.floor(
      (Math.random() * this.canvasSize.width) / 10
    );
    this.speedYCitizens = Math.floor(Math.random() * 3);
    this.positionXCitizen =
      this.canvasSize.width / 20 + this.randomDisplayCitizen;
    this.allCitizens.push(
      new Citizen(
        this.ctx,
        this.positionXCitizen,
        this.canvasSize.height,
        30,
        30,
        this.speedYCitizens
      )
    ); //Afinar tamaño de los ciudadanos
  },

  createEnemies() {
    this.randomRoad = Math.floor(Math.random() * 4);
    console.log(this.randomRoad);
    this.minimunRoad = this.canvasSize.height / 5;

    this.positionYEnemies =
      this.minimunRoad + (this.canvasSize.height / 4) * this.randomRoad;

    this.allEnemies.push(
      new Enemy(
        this.ctx,
        this.canvasSize.width - 40,
        this.positionYEnemies,
        40,
        40,
        5
      )
    );
  },

  clearEnemies() {
    this.allEnemies = this.allEnemies.filter((enemy) => {
      if (enemy.pos.x > this.canvasSize.width / 2) {
        return true;
      }
    });
  },

  clearCitizens() {
    this.allCitizens = this.allCitizens.filter((citizen) => {
      if (citizen.pos.y > (this.canvasSize.height / 5) * 2) {
        return true;
      }
    });
  },

  createScoreBoard() {
    this.scoreBoard = new Score(
      this.ctx,
      (this.canvasSize.width / 5) * 4,
      this.canvasSize.height / 15
    );
  },

  setListeners() {
    document.onkeydown = (e) => {
      if (e.key === this.keys.player.ARROW_DOWN) {
        this.player.PlusMoveY();
      }
      if (e.key === this.keys.player.ARROW_UP) {
        this.player.MinusMoveY();
      }
      if (e.key === this.keys.player.ARROW_LEFT) {
        this.player.MinusMoveX();
      }
      if (e.key === this.keys.player.ARROW_RIGHT) {
        this.player.PlusMoveX();
      }
    };
  },
};
