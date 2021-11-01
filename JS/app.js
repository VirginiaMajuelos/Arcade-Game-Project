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
  waveGenerator: 0,
  eliminatedCitizens: 0,
  intervalId: 0,
  framesCount: 0,
  scoreBoard: undefined,
  allCitizens: [],
  allPotions: [],
  allEnemies: [],
  keys: {
    ARROW_DOWN: "ArrowDown",
    ARROW_UP: "ArrowUp",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    // SPACE: " ",
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
    this.intervalId = setInterval(() => {
      this.framesCount++;

      if (this.framesCount > 2000) {
        this.framesCount = 0;
      }

      if (this.framesCount % 120 === 0) {
        this.createCitizens();
      }
      if (this.framesCount % (60 - this.waveGenerator) === 0) {
        console.log(this.waveGenerator);
        this.createEnemy1();
      }
      if (this.saveCitizens >= 90) {
        if (this.framesCount % 60 === 0) {
          this.createEnemy2();
        }
      }

      if (this.framesCount % 900 === 0) {
        this.createPotion1();
      }

      if (this.framesCount % 900 === 0) {
        this.createPotion2();
      }

      if (this.framesCount % 1800 === 0) {
        this.createPotion3();
      }

      this.clearScreen();
      this.colisionPlayerEnemy();
      this.colisionPlayerPotion1();
      this.colisionPlayerPotion2();
      this.colisionPlayerPotion3();
      this.moveAll();
      this.drawAll();

      this.clearAll();
    }, 1000 / this.frames);
  },

  createAll() {
    this.createBackgroundSky();
    this.createScoreBoard();
    this.createPlayer();
  },

  drawAll() {
    this.drawBackgroundSky();
    this.drawPlayer();
    this.drawCitizens();
    this.drawEnemies();
    this.drawPotion1();
    this.drawPotion2();
    this.drawPotion3();
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
    this.player.drawSprite();
  },

  drawEnemies() {
    this.allEnemies.forEach((enemy) => {
      enemy.draw();
    });
  },

  drawPotion1() {
    this.allPotions.forEach((potion1) => {
      potion1.draw();
    });
  },

  drawPotion2() {
    this.allPotions.forEach((potion2) => {
      potion2.draw();
    });
  },

  drawPotion3() {
    this.allPotions.forEach((potion3) => {
      potion3.draw();
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

  drawScoreBoard() {
    this.scoreBoard.draw(this.saveCitizens, this.eliminatedCitizens);
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

  createBackgroundSky() {
    this.sky = new Background(
      this.ctx,
      0,
      0,
      this.canvasSize.width,
      this.canvasSize.height,
      "Fondo1.png"
    );
  },

  createPotion1() {
    this.randomNumberX = this.canvasSize.width * Math.random();

    this.randomNumberY = this.canvasSize.height * Math.random();

    this.minimunRoadY = (this.canvasSize.height / 5) * 2;

    this.minimunRoadX = (this.canvasSize.width / 10) * 2;

    this.positionYPotions = this.minimunRoadY + this.randomNumberY;

    this.positionXPotions = this.minimunRoadX + this.randomNumberX;

    this.allPotions.push(
      new Potions(
        this.ctx,
        this.positionXPotions,
        this.positionYPotions,
        50,
        50,
        "PocionAmarilla.png"
      )
    );
  },

  createPotion2() {
    this.randomNumberX = this.canvasSize.width * Math.random();

    this.randomNumberY = this.canvasSize.height * Math.random();

    this.minimunRoadY = (this.canvasSize.height / 5) * 2;

    this.minimunRoadX = (this.canvasSize.width / 10) * 2;

    this.positionYPotions = this.minimunRoadY + this.randomNumberY;

    this.positionXPotions = this.minimunRoadX + this.randomNumberX;

    this.allPotions.push(
      new Potions(
        this.ctx,
        this.positionXPotions,
        this.positionYPotions,
        50,
        50,
        "PocionVerde.png"
      )
    );
  },

  createPotion3() {
    this.randomNumberX = this.canvasSize.width * Math.random();

    this.randomNumberY = this.canvasSize.height * Math.random();

    this.minimunRoadY = (this.canvasSize.height / 5) * 2;

    this.minimunRoadX = (this.canvasSize.width / 10) * 2;

    this.positionYPotions = this.minimunRoadY + this.randomNumberY;

    this.positionXPotions = this.minimunRoadX + this.randomNumberX;

    this.allPotions.push(
      new Potions(
        this.ctx,
        this.positionXPotions,
        this.positionYPotions,
        50,
        50,
        "PocionNegra.png"
      )
    );
  },

  createPlayer() {
    this.player = new Player(
      this.ctx,
      this.canvasSize.width / 2,
      this.canvasSize.height / 2,
      101,
      140,
      30,
      "Hulk.png",
      0,
      0
    );
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
        101,
        140,
        this.speedYCitizens
      )
    ); //Afinar tamaño de los ciudadanos
  },

  createEnemy1() {
    this.randomRoad = Math.floor(Math.random() * 4);

    this.minimunRoad = (this.canvasSize.height / 5) * 2;

    this.positionYEnemies =
      this.minimunRoad + (this.canvasSize.height / 4) * this.randomRoad;

    this.allEnemies.push(
      new Enemy(
        this.ctx,
        this.canvasSize.width - 40,
        this.positionYEnemies,
        101,
        140,
        5
      )
    );
  },

  createEnemy2() {
    this.randomRoad = Math.floor(Math.random() * 4);
    this.minimunRoad = (this.canvasSize.height / 5) * 2;
    this.positionYEnemies =
      this.minimunRoad + (this.canvasSize.height / 4) * this.randomRoad;
    this.allEnemies.push(
      new Enemy(
        this.ctx,
        this.canvasSize.width - 40,
        this.positionYEnemies,
        101,
        140,
        10
      )
    );
  },

  colisionPlayerEnemy() {
    this.allEnemies.map((enemy, i) => {
      if (
        this.player.pos.x < enemy.pos.x + enemy.size.width &&
        this.player.pos.x + this.player.size.width > enemy.pos.x &&
        this.player.pos.y < enemy.pos.y + enemy.size.height &&
        this.player.size.height + this.player.pos.y > enemy.pos.y
      ) {
        this.allEnemies.splice(i, 1);
      } else {
        return false;
      }
    });
  },

  colisionPlayerPotion1() {
    this.allPotions.map((potion1, i) => {
      if (
        this.player.pos.x < potion1.pos.x + potion1.size.width &&
        this.player.pos.x + this.player.size.width > potion1.pos.x &&
        this.player.pos.y < potion1.pos.y + potion1.size.height &&
        this.player.size.height + this.player.pos.y > potion1.pos.y
      ) {
        this.allPotions.splice(i, 1);
        this.player.speed = 1.1 * this.player.speed;
      } else {
        return false;
      }
    });
  },

  colisionPlayerPotion2() {
    this.allPotions.map((potion2, i) => {
      if (
        this.player.pos.x < potion2.pos.x + potion2.size.width &&
        this.player.pos.x + this.player.size.width > potion2.pos.x &&
        this.player.pos.y < potion2.pos.y + potion2.size.height &&
        this.player.size.height + this.player.pos.y > potion2.pos.y
      ) {
        this.allPotions.splice(i, 1);
        this.enemy.speed = 0.9 * this.enemy.speed;
      } else {
        return false;
      }
    });
  },

  colisionPlayerPotion3() {
    this.allPotions.map((potion3, i) => {
      if (
        this.player.pos.x < potion3.pos.x + potion3.size.width &&
        this.player.pos.x + this.player.size.width > potion3.pos.x &&
        this.player.pos.y < potion3.pos.y + potion3.size.height &&
        this.player.size.height + this.player.pos.y > potion3.pos.y
      ) {
        this.allPotions.splice(i, 1);
        this.randomChance = Math.floor(Math.random() * 100);
        if (this.randomChance < 49) {
          this.player.speed *= 1.1;
        } else if (49 <= this.randomChance < 98) {
          this.enemy.speed *= 1.1;
        } else {
          gameOver();
        }
      } else {
        return false;
      }
    });
  },

  colisionEnemiesCiticens() {
    this.allEnemies.map((enemy, i) => {
      this.allCitizens.map((citizen, j) => {
        if (
          enemy.pos.x < citizen.pos.x + citizen.size.width &&
          enemy.pos.x + enemy.size.width > citizen.pos.x &&
          enemy.pos.y < citizen.pos.y + citizen.size.height &&
          enemy.pos.y + enemy.size.height > citizen.pos.y
        ) {
          this.allEnemies.splice(i, 1);
          this.allCitizens.splice(j, 1);
          this.eliminatedCitizens++;
          this.scoreBoard.increaseScoreEnemies(this.eliminatedCitizens);
          if (this.eliminatedCitizens === 10) {
            this.gameOver();
          }
        } else {
          return false;
        }
      });
    });
  },

  clearEnemies() {
    if (this.colisionPlayerEnemy() || this.colisionEnemiesCiticens()) {
      return true;
    }
  },

  clearCitizens() {
    this.allCitizens = this.allCitizens.filter((citizen) => {
      if (citizen.pos.y > (this.canvasSize.height / 5) * 2) {
        return true;
      } else if (this.colisionEnemiesCiticens()) {
        return true;
      } else {
        this.saveCitizens++;
        this.scoreBoard.increaseScorePlayer(this.saveCitizens);
        if (this.saveCitizens > 30) {
          this.waveGenerator += 5;
        }
      }
    });
  },

  clearPotions() {
    this.allPotions = this.allCitizens.filter((potions) => {
      if (this.colisionPlayerPotion1()) {
        return true;
      } else if (this.colisionPlayerPotion2()) {
        return true;
      } else if (this.colisionPlayerPotion3()) {
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
      if (e.key === this.keys.ARROW_DOWN) {
        this.player.plusMoveY();
      }
      if (e.key === this.keys.ARROW_UP) {
        this.player.minusMoveY();
      }
      if (e.key === this.keys.ARROW_LEFT) {
        this.player.minusMoveX();
      }
      if (e.key === this.keys.ARROW_RIGHT) {
        this.player.plusMoveX();
      }
      // if (e.key === this.keys.player.SPACE) {
      //   this.player.shoot();
      // }
    };
  },

  gameOver() {
    clearInterval(this.intervalId);
  },
};
