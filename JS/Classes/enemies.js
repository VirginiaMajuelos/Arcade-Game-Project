class Enemy {
  constructor(ctx, posX, posY, width, height, speedX, health) {
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
      x: speedX,
    };
    this.health = health;
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
    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }
  move() {
    this.pos.x -= this.speed.x;
  }
  // colision(){
  //     this.health -=1
  // }
}

// class Enemy1 extends Enemy{
//     constructor(ctx, posX, posY, width, height, speedX,health)
// }
