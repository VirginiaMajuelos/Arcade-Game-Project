class Player {
  constructor(
    ctx,
    posX,
    posY,
    width,
    height,
    speed,
    imageName,
    keys,
    gameFrames
  ) {
    this.ctx = ctx;
    this.pos = {
      x: posX,
      y: posY,
    };

    this.size = {
      width: width,
      height: height,
    };

    this.frames = 4;
    this.framesIndexX = 0;
    this.framesIndexY = 0;

    this.speed = speed;

    this.canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.gameFrames = gameFrames;
    this.keys = keys;
    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.movingDown = false;

    this.imageInstance = undefined;
    this.imageName = imageName;

    this.setListeners();
    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `images/player/${this.imageName}`;
  }

  drawSprite() {
    this.ctx.drawImage(
      this.imageInstance,
      (this.framesIndexX * this.imageInstance.width) / this.frames, //inicio de recorte x
      (this.framesIndexY * this.imageInstance.height) / this.frames, //inicio de recorte y
      this.imageInstance.width / this.frames, //ancho de recorte
      this.imageInstance.height / this.frames,
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }

  move() {
    if (this.pos.y > (this.canvasSize.height / 10) * 3 && this.movingUp) {
      this.pos.y -= this.speed;
      this.framesIndexY = 3;
    }

    if (this.pos.x > 0 && this.movingLeft) {
      this.pos.x -= this.speed;
      this.framesIndexY = 1;
    }

    if (
      this.pos.y < this.canvasSize.height - this.size.height &&
      this.movingDown
    ) {
      this.pos.y += this.speed;
      this.framesIndexY = 0;
    }

    if (
      this.pos.x < this.canvasSize.width - this.size.width &&
      this.movingRight
    ) {
      this.pos.x += this.speed;
      this.framesIndexY = 2;
    }
  }

  animate() {
    if (this.gameFrames % 20 === 0) {
      this.framesIndexX++;
    }
    if (this.framesIndexX === 4) {
      this.framesIndexX = 0;
    }
  }

  setListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case this.keys.UP:
          this.movingUp = true;
          break;
        case this.keys.DOWN:
          this.movingDown = true;
          break;
        case this.keys.RIGHT:
          this.movingRight = true;
          break;
        case this.keys.LEFT:
          this.movingLeft = true;
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case this.keys.RIGHT:
          this.movingRight = false;
          break;
        case this.keys.LEFT:
          this.movingLeft = false;
          break;
        case this.keys.UP:
          this.movingUp = false;
          break;
        case this.keys.DOWN:
          this.movingDown = false;
          break;
      }
    });
  }
}

// class IronMan extends Player {
//   constructor(
//     ctx,
//     posX,
//     posY,
//     width,
//     height,
//     speed,
//     imageName,
//     keys,
//     gameFrames
//   ) {
//     super(ctx, posX, posY, width, height, speed, imageName, keys, gameFrames);
//     this.ctx = ctx;
//     this.pos = {
//       x: posX,
//       y: posY,
//     };

//     this.size = {
//       width: width,
//       height: height,
//     };

//     this.frames = 4;
//     this.framesIndexX = 0;
//     this.framesIndexY = 0;

//     this.speed = speed;

//     this.canvasSize = {
//       width: window.innerWidth,
//       height: window.innerHeight,
//     };
//     this.gameFrames = gameFrames;
//     this.keys = keys;
//     this.movingLeft = false;
//     this.movingRight = false;
//     this.movingUp = false;
//     this.movingDown = false;
//     this.bullets = [];
//     this.imageInstance = undefined;
//     this.imageName = imageName;

//     this.setListeners();
//     this.init();
//   }
//   setListeners() {
//     document.addEventListener("keydown", (e) => {
//       switch (e.keyCode) {
//         case this.keys.UP:
//           this.movingUp = true;
//           break;
//         case this.keys.DOWN:
//           this.movingDown = true;
//           break;
//         case this.keys.RIGHT:
//           this.movingRight = true;
//           break;
//         case this.keys.LEFT:
//           this.movingLeft = true;
//           break;
//         case this.keys.SPACE:
//           this.shoot = true;
//           break;
//       }
//     });

//     document.addEventListener("keyup", (e) => {
//       switch (e.keyCode) {
//         case this.keys.RIGHT:
//           this.movingRight = false;
//           break;
//         case this.keys.LEFT:
//           this.movingLeft = false;
//           break;
//         case this.keys.UP:
//           this.movingUp = false;
//           break;
//         case this.keys.DOWN:
//           this.movingDown = false;
//           break;
//       }
//     });
//   }
//   shoot() {
//     this.bullets.push(
//       new Bullet(
//         this.ctx,
//         this.pos.x,
//         this.pos.y,
//         this.size.width,
//         this.size.height
//       )
//     );
//   }
// }
