class Player {
  constructor(
    ctx,
    posX,
    posY,
    width,
    height,
    speed,
    imageName,
    frameX,
    frameY
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
    this.frameX = frameX;

    this.frameY = frameY;

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
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }

  minusMoveY() {
    if (this.pos.y > (this.canvasSize.height / 10) * 3) {
      this.pos.y -= this.speed;
    }
  }

  minusMoveX() {
    if (this.pos.x > 0) {
      this.pos.x -= this.speed;
    }
  }

  plusMoveY() {
    if (this.pos.y < this.canvasSize.height - this.size.height) {
      this.pos.y += this.speed;
    }
  }

  plusMoveX() {
    if (this.pos.x < this.canvasSize.width - this.size.width) {
      this.pos.x += this.speed;
    }
  }
}
