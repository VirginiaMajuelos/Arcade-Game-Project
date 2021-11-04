class Frame {
  constructor(ctx, posX, posY, width, height, imageName) {
    this.ctx = ctx;
    this.pos = {
      x: posX,
      y: posY,
    };

    this.size = {
      width: width,
      height: height,
    };

    this.frames = 3;
    this.framesIndexX = 0;
    this.framesIndexY = 2;

    this.canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.imageInstance = undefined;
    this.imageName = imageName;

    this.isFinished = false;

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `images/${this.imageName}`;
    setTimeout(() => {
      this.isFinished = true;
    }, 250);
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
    if (framesCounter % 6 === 0) {
      this.animate();
    }
  }
  animate() {
    this.framesIndexX++;
    if (this.framesIndexX === 3) {
      this.framesIndexX = 0;
    }
  }
}
