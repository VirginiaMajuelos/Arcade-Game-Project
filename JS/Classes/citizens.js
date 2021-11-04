class Citizen {
  constructor(ctx, posX, posY, width, height, speedY, imageName) {
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
    this.framesIndexY = 3;

    this.speed = {
      y: speedY,
    };

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
    this.imageInstance.src = `images/citizens/${this.imageName}`;
  }

  drawSprite(framesCounter) {
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
    if (framesCounter % 20 === 0) {
      this.animate();
    }
  }

  move() {
    this.pos.y -= this.speed.y;
  }
  animate() {
    this.framesIndexX++;
    if (this.framesIndexX === 4) {
      this.framesIndexX = 0;
    }
  }
}
