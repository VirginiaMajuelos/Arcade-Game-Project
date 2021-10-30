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

    this.speed = {
      y: speed,
    };
    // this.image = undefined;
    // this.arrayCaracteres = {};
    this.draw(); //cambiar a init cuando sea imagen
  }

  draw() {
    // this.ctx.drawImage(
    //   this.image,
    //   this.posX,
    //   this.posY,
    //   this.width,
    //   this.height
    // );
    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }
  MinusMoveY() {
    if (this.pos.y > this.canvasSize.height / 5) {
      this.pos.y -= this.speed;
    }
  }
  MinusMoveX() {
    if (this.pos.x < 0) {
      this.pos.x -= this.speed;
    }
  }
  PlusMoveY() {
    if (this.pos.y < this.canvasSize.height - this.height) {
      this.pos.y += this.speed;
    }
  }
  PlusMoveX() {
    if (this.pos.x < this.canvasSize.width - this.width) {
      this.pos.x += this.speed;
    }
  }
}
