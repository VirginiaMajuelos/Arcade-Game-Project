class Citicent {
  constructor(ctx, posX, posY, width, height, speed) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.canvasSize = { height: window.innerHeight };
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
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    console.log(this);
  }
  move() {
    this.posY -= 1 * this.speed;
  }
}
