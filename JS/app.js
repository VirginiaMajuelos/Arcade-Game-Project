const replay = document.getElementById("replay");
const startButton = document.getElementById("start-button2");

const gameStart = {
  name: "Smash them",
  description: "Smash people and save people, not failure",
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
  round: undefined,
  player: undefined,
  potion1: undefined,
  enemyOneSpeed: 4,
  enemyTwoSpeed: 6.5,
  saveCitizens: 0,
  waveGenerator: 0,
  eliminatedCitizens: 0,
  levelUp: 0,
  intervalId: 0,
  framesCount: 0,
  scoreBoard: undefined,
  allCitizens: [],
  allPotions: [],
  allEnemies: [],
  allPhotoFrames: [],
  photoCitizens: [
    "Aladdin.png",
    "Jasmine.png",
    "Roshan.png",
    "Elena.png",
    "Agentcoulson.png",
    "Greebo.png",
    "Janefoster.png",
    "Peggycarter.png",
    "Skye.png",
    "Barret.png",
  ],
  photoEnemies: [
    "Redskull.png",
    "Loki.png",
    "Malekith.png",
    "Mandarin.png",
    "Wintersoldier.png",
  ],
  photoFrames: [
    "Start.png",
    "Level1.png",
    "Level2.png",
    "Level3.png",
    "Level4.png",
    "Level5.png",
    "Win.png",
    "GameOver.png",
  ],
  keys: {
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37,
    //SPACE: 32,
  },

  init() {
    this.setContext();
    this.setDimensions();
    this.createAll();
    this.start();
    if (this.saveCitizens < 20) {
      sounds.music.preload = "auto";
      sounds.music.load();
      sounds.music.play();
      sounds.music.volume = 0.5;
    }
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

      if (this.framesCount > 4000) {
        this.framesCount = 0;
      }

      if (this.framesCount % 120 === 0) {
        this.createCitizens();
      }
      if (this.framesCount % (60 - this.waveGenerator) === 0) {
        this.createEnemy1();
      }
      if (this.saveCitizens >= 30) {
        if (this.framesCount % 60 === 0) {
          this.createEnemy2();
        }
      }
      if (this.player.speed < 6.44) {
        if (this.framesCount % 2400 === 0) {
          this.createPotion1();
        }
      }
      if (this.enemyOneSpeed > 3.25) {
        if (this.framesCount % 2700 === 0) {
          this.createPotion2();
        }
      }
      if (this.framesCount % 3800 === 0) {
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
    this.createStart();
  },

  drawAll() {
    this.drawBackgroundSky();
    this.drawPlayer();
    this.drawCitizens();
    this.drawEnemies();
    this.drawPotion();
    this.drawTextFrame();
    this.drawScoreBoard();
  },

  moveAll() {
    this.moveCitizens();
    this.moveEnemies();
    this.movePlayer();
    //this.movePotion1();
  },

  clearAll() {
    this.clearCitizens();
    this.clearEnemies();
  },

  drawPlayer() {
    if (
      this.framesCount % 20 === 0 &&
      (this.player.movingLeft === true ||
        this.player.movingRight === true ||
        this.player.movingUp === true ||
        this.player.movingDown === true)
    ) {
      this.player.animate();
    }
    this.player.drawSprite();
  },

  drawEnemies() {
    this.allEnemies.forEach((enemy) => {
      enemy.drawSprite(this.framesCount);
    });
  },

  drawPotion() {
    this.allPotions.forEach((potion) => {
      potion.draw();
    });
  },

  drawCitizens() {
    this.allCitizens.forEach((citizen) => {
      citizen.drawSprite(this.framesCount);
    });
  },

  drawBackgroundSky() {
    this.sky.draw();
  },

  drawTextFrame() {
    if (this.framesCount < 100 && this.saveCitizens === 0) {
      this.allPhotoFrames[0].draw();
    } else if (this.saveCitizens === 10) {
      this.allPhotoFrames[1].draw();
    } else if (this.saveCitizens === 20) {
      this.allPhotoFrames[2].draw();
    } else if (this.saveCitizens === 30) {
      this.allPhotoFrames[3].draw();
    } else if (this.saveCitizens === 40) {
      this.allPhotoFrames[4].draw();
    } else if (this.saveCitizens === 50) {
      this.allPhotoFrames[5].draw();
    } else if (this.saveCitizens === 60) {
      this.allPhotoFrames[6].draw();
    }
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

    this.randomNumberY = Math.floor(Math.random() * 3);

    this.minimunRoadY = (this.canvasSize.height / 10) * 3.5;

    this.minimunRoadX = (this.canvasSize.width / 10) * 2;

    this.positionXPotions = this.minimunRoadX + this.randomNumberX;

    this.positionYPotions =
      this.minimunRoadY + (this.canvasSize.height / 4) * this.randomNumberY;

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

  createPotion2() {
    this.randomNumberX = this.canvasSize.width * Math.random();

    this.randomNumberY = Math.floor(Math.random() * 3);

    this.minimunRoadY = (this.canvasSize.height / 10) * 3.5;

    this.minimunRoadX = (this.canvasSize.width / 10) * 2;

    this.positionXPotions = this.minimunRoadX + this.randomNumberX;

    this.positionYPotions =
      this.minimunRoadY + (this.canvasSize.height / 4) * this.randomNumberY;

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

  createPotion3() {
    this.randomNumberX = this.canvasSize.width * Math.random();

    this.randomNumberY = Math.floor(Math.random() * 3);

    this.minimunRoadY = (this.canvasSize.height / 10) * 3.5;

    this.minimunRoadX = (this.canvasSize.width / 10) * 2;

    this.positionXPotions = this.minimunRoadX + this.randomNumberX;

    this.positionYPotions =
      this.minimunRoadY + (this.canvasSize.height / 4) * this.randomNumberY;

    this.positionYEnemies = this.allPotions.push(
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

  movePlayer() {
    this.player.move();
  },

  createPlayer() {
    this.player = new Player(
      this.ctx,
      this.canvasSize.width / 2,
      this.canvasSize.height / 2,
      101,
      140,
      4,
      "Hulk.png",
      this.keys,
      this.framesCount
    );
    //Definir posteriormente velocidad del jugador para los potenciadores
  },

  createCitizens() {
    this.randomCitizen = Math.floor(Math.random() * this.photoCitizens.length);

    this.nameCitizen = this.photoCitizens[this.randomCitizen];

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
        80,
        120,
        this.speedYCitizens,
        this.nameCitizen
      )
    ); //Afinar tamaño de los ciudadanos
  },

  createEnemy1() {
    this.randomEnemies = Math.floor(Math.random() * this.photoEnemies.length);

    this.nameEnemy = this.photoEnemies[this.randomEnemies];

    this.randomRoad = Math.floor(Math.random() * 3);

    this.minimunRoad = (this.canvasSize.height / 10) * 3;

    this.positionYEnemies =
      this.minimunRoad + (this.canvasSize.height / 4) * this.randomRoad;

    this.allEnemies.push(
      new Enemy(
        this.ctx,
        this.canvasSize.width - 40,
        this.positionYEnemies,
        80,
        120,
        this.enemyOneSpeed,
        this.nameEnemy
      )
    );
  },

  createEnemy2() {
    this.randomRoad = Math.floor(Math.random() * 3);

    this.minimunRoad = (this.canvasSize.height / 10) * 3;

    this.positionYEnemies =
      this.minimunRoad + (this.canvasSize.height / 4) * this.randomRoad;

    this.allEnemies.push(
      new Enemy(
        this.ctx,
        this.canvasSize.width - 40,
        this.positionYEnemies,
        85,
        140,
        this.enemyTwoSpeed,
        "Ronan.png"
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
        if (!sounds.smash.play()) {
          sounds.smash.preload = "auto";
          sounds.smash.load();
          sounds.smash.play();
          sounds.smash.volume = 0.1;
        }
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
        this.player.size.height + this.player.pos.y > potion1.pos.y &&
        potion1.imageName == "PocionVerde.png"
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
        this.player.size.height + this.player.pos.y > potion2.pos.y &&
        potion2.imageName == "PocionAmarilla.png"
      ) {
        this.allPotions.splice(i, 1);
        this.enemyTwoSpeed = 0.9 * this.enemyTwoSpeed;
        this.enemyOneSpeed = 0.9 * this.enemyOneSpeed;
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
        this.player.size.height + this.player.pos.y > potion3.pos.y &&
        potion3.imageName == "PocionNegra.png"
      ) {
        this.allPotions.splice(i, 1);
        this.allEnemies.splice(0);
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
            this.allPhotoFrames[7].draw();
            this.gameOver();
            window.setTimeout(this.reloadANewGame, 2500);
            this.resetValues();
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
      if (citizen.pos.y > (this.canvasSize.height / 10) * 2.5) {
        return true;
      } else if (this.colisionEnemiesCiticens()) {
        return true;
      } else {
        this.saveCitizens++;
        this.scoreBoard.increaseScorePlayer(this.saveCitizens);
        if (this.saveCitizens % 10 === 0) {
          this.waveGenerator += 3;
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

  createStart() {
    this.photoFrames.forEach((el) => {
      this.allPhotoFrames.push(
        new Background(
          this.ctx,
          this.canvasSize.width / 2 - 300,
          this.canvasSize.height / 2 - 150,
          600,
          300,
          el
        )
      );
    });
  },

  gameOver() {
    clearInterval(this.intervalId);
  },

  reloadANewGame() {
    replay.classList.remove("hidden");
    replay.classList.add("display");
    play.classList.remove("display");
    play.classList.add("hidden");
    document.getElementById("start-button2").addEventListener("click", () => {
      replay.classList.remove("display");
      replay.classList.add("hidden");
      play.classList.remove("hidden");
      play.classList.add("replay");
    });
  },

  resetValues() {
    (this.ctx = undefined),
      (this.canvasDOM = undefined),
      (this.canvasSize = { width: undefined, height: undefined }),
      (this.frames = 60),
      (this.sky = undefined),
      (this.goal = undefined),
      (this.round = undefined),
      (this.player = undefined),
      (this.potion1 = undefined),
      (this.saveCitizens = 0),
      (this.waveGenerator = 0),
      (this.eliminatedCitizens = 0),
      (this.levelUp = 0),
      (this.intervalId = 0),
      (this.framesCount = 0),
      (this.scoreBoard = undefined),
      (this.allCitizens = []),
      (this.allPotions = []),
      (this.allEnemies = []),
      (this.allPhotoFrames = []);
  },
};
