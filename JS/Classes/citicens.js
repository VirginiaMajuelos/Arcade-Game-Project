class Citizen {
  constructor(ctx, posX, posY, width, height, speedY) {
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
      y: speedY,
    };

    this.canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    // this.image = undefined;
    // this.arrayCaracteres = {};
    this.draw(); //cambiar a init cuando sea imagen
  }
  //   init() {
  //     this.image = new Image();
  //     this.random = Math.floor(Math.random * this.arrayCaracters.length);
  //     this.image.src = `./images/${this.arrayCaracters[this.random]}`;
  //   }

  draw() {
    // this.ctx.drawImage(
    //   this.image,
    //   this.posX,
    //   this.posY,
    //   this.width,
    //   this.height
    // );
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }

  move() {
    this.pos.y -= this.speed.y;
  }
}
