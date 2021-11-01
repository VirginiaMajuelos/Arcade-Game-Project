class Player {
  constructor(ctx, posX, posY, width, height, speed) {
    this.ctx = ctx;
    this.pos = {
      x: posX,
      y: posY,
    };

    this.size = {
      width: width,
      height: height,
    };

    this.speed = speed;

    this.canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // this.image = undefined;
    // this.arrayCaracteres = {};
    this.init(); //cambiar a init cuando sea imagen
  }

  init() {
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }

  minusMoveY() {
    if (this.pos.y > this.canvasSize.height / 5) {
      this.pos.y -= this.speed;
    }
  }

  minusMoveX() {
    if (this.pos.x > 0) {
      this.pos.x -= this.speed;
    }
  }

  plusMoveY() {
    if (this.pos.y < this.canvasSize.height - this.height) {
      this.pos.y += this.speed;
    }
  }

  plusMoveX() {
    if (this.pos.x < this.canvasSize.width - this.size.width) {
      this.pos.x += this.speed;
    }
  }
}
