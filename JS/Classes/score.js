class Score {
  constructor(ctx, posX, posY) {
    this.ctx = ctx;
    this.pos = {
      x: posX,
      y: posY,
    };
    this.scorePlayer = 0;
    this.scoreEnemies = 0;
  }

  draw(saveCitizens, eliminatedCitizens) {
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Score", this.pos.x, this.pos.y);
    this.ctx.font = "24px serif";
    this.ctx.fillText(
      this.scorePlayer + " citizens saved.",
      this.pos.x,
      this.pos.y + 25
    );
    this.ctx.font = "24px serif";
    this.ctx.fillText(
      this.scoreEnemies + " citizens eliminated.",
      this.pos.x,
      this.pos.y + 50
    );
    // this.increaseScorePlayer(saveCitizens);
    // this.increaseScoreEnemies(eliminatedCitizens);
  }
  // increaseScorePlayer(saveCitizens) {
  //   if (saveCitizens % 40 === 0) {
  //     this.scorePlayer++;
  //   }
  // }
  // increaseScoreEnemies(eliminatedCitizens) {
  //   if (eliminatedCitizens % 40 === 0) {
  //     this.scoreEnemies++;
  //   }
  // }
}
