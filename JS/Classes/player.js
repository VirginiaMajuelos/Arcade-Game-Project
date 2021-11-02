class Player {
  constructor(ctx, posX, posY, width, height, speed, imageName) {
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

    this.imageInstance = undefined;
    this.imageName = imageName;

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `images/${this.imageName}`;
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

  minusMoveY() {
    if (this.pos.y > (this.canvasSize.height / 10) * 3) {
      this.pos.y -= this.speed;
      this.framesIndexY = 3;
      this.framesIndexX++;
      if (this.framesIndexX === 4) {
        this.framesIndexX = 0;
      }
    }
  }

  minusMoveX() {
    if (this.pos.x > 0) {
      this.pos.x -= this.speed;
      this.framesIndexY = 1;
      this.framesIndexX++;
      if (this.framesIndexX === 4) {
        this.framesIndexX = 0;
      }
    }
  }

  plusMoveY() {
    if (this.pos.y < this.canvasSize.height - this.size.height) {
      this.pos.y += this.speed;
      this.framesIndexY = 0;
      this.framesIndexX++;
      if (this.framesIndexX === 4) {
        this.framesIndexX = 0;
      }
    }
  }

  plusMoveX() {
    if (this.pos.x < this.canvasSize.width - this.size.width) {
      this.pos.x += this.speed;
      this.framesIndexY = 2;
      this.framesIndexX++;
      if (this.framesIndexX === 4) {
        this.framesIndexX = 0;
      }
    }
  }
}
