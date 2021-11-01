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
  potion1: undefined,
  saveCitizens: 0,
  eliminatedCitizens: 0,
  intervalId: 0,
  framesCount: 0,
  scoreBoard: undefined,
  allCitizens: [],
  allPotions: [],
  allEnemies: [],
  keys: {
    player: {
      ARROW_DOWN: "ArrowDown",
      ARROW_UP: "ArrowUp",
      ARROW_LEFT: "ArrowLeft",
      ARROW_RIGHT: "ArrowRight",
      // SPACE: " ",
    },
  },

  init() {
    this.setContext();
    this.setDimensions();
    this.createAll();
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
    this.randomPotions = Math.floor(Math.random() * 10);

    this.intervalId = setInterval(() => {
      this.framesCount++;

      if (this.framesCount > 2000) {
        this.framesCount = 0;
      }

      if (this.framesCount % 40 === 0) {
        this.createCitizens();
      }

      if (this.framesCount % 200 === 0) {
        this.createEnemies();
      }
      if (this.framesCount % (60 * this.randomPotions) === 0) {
        this.createPotion1();
      }

      this.clearScreen();
      this.createPlayer();
      this.drawAll();
      this.moveAll();
      //this.isCollisionCitizens();
      this.clearAll();
    }, 1000 / this.frames);
  },

  createAll() {
    this.createBackgroundSky();
    this.createBackgroundShip();
    this.createScoreBoard();
  },

  drawAll() {
    this.createPlayBoard();
    this.drawBackgroundSky();
    this.drawBackground();
    this.drawPlayer();
    this.drawCitizens();
    this.drawEnemies();
    this.drawPotion1();
    this.drawScoreBoard();
  },

  moveAll() {
    this.moveCitizens();
    this.moveEnemies();
    //this.movePotion1();
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

  drawPotion1() {
    this.allPotions.forEach((enemy) => {
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

  movePotion1() {
    this.potion1.move();
  },

  moveEnemies() {
    this.allEnemies.forEach((enemy) => enemy.move());
  },

  moveCitizens() {
    this.allCitizens.forEach((citizen) => citizen.move());
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

  createPotion1() {
    this.randomRoad = Math.floor(Math.random() * this.randomNumber);

    this.randomNumber = Math.floor(Math.random() * 4);

    this.minimunRoadY = this.canvasSize.height / 5;

    this.minimunRoadX = (this.canvasSize.height / 5) * 2 + 50;

    this.positionYEnemies =
      this.minimunRoad + (this.canvasSize.height / 4) * this.randomRoad;

    this.positionXEnemies =
      this.minimunRoadX + (this.canvasSize.width / 5) * this.randomRoad;

    this.allPotions.push(
      new Potions(
        this.ctx,
        this.positionXEnemies,
        this.positionYEnemies,
        50,
        50,
        "PocionAmarilla.png"
      )
    );
  },

  createPlayer() {
    this.player = new Player(this.ctx, 1000, 1000, 100, 100, 30);
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
      if (enemy.pos.x > this.canvasSize.width / 5) {
        return true;
      } else {
        this.eliminatedCitizens++;
        this.scoreBoard.increaseScoreEnemies(this.eliminatedCitizens);
      }
    });
  },

  clearCitizens() {
    this.allCitizens = this.allCitizens.filter((citizen) => {
      if (citizen.pos.y > (this.canvasSize.height / 5) * 2) {
        return true;
      } else {
        this.saveCitizens++;
        this.scoreBoard.increaseScorePlayer(this.saveCitizens);
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
        this.player.plusMoveY();
      }
      if (e.key === this.keys.player.ARROW_UP) {
        this.player.minusMoveY();
      }
      if (e.key === this.keys.player.ARROW_LEFT) {
        this.player.minusMoveX();
      }
      if (e.key === this.keys.player.ARROW_RIGHT) {
        this.player.plusMoveX();
      }
      // if (e.key === this.keys.player.SPACE) {
      //   this.player.shoot();
      // }
    };
  },
};
