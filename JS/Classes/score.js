class Score {
  constructor(ctx, posX, posY) {
    this.ctx = ctx;
    this.pos = {
      x: posX,
      y: posY,
    };
    this.scorePlayer = 0;
    this.scoreEnemies = 0;
    this.scoreEnemiesDead = 0;
  }

  draw(saveCitizens, eliminatedCitizens, eliminatedEnemies) {
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score", this.pos.x, this.pos.y);
    this.ctx.font = "24px Bangers";
    this.ctx.fillText(
      this.scorePlayer + " citizens saved.",
      this.pos.x,
      this.pos.y + 25
    );

    this.ctx.font = "24px Bangers";
    this.ctx.fillText(
      this.scoreEnemies + " citizens eliminated.",
      this.pos.x,
      this.pos.y + 50
    );

    this.ctx.font = "24px Bangers";
    this.ctx.fillText(
      this.scoreEnemiesDead + " enemies eliminated.",
      this.pos.x,
      this.pos.y + 75
    );
    this.increaseScorePlayer(saveCitizens);
    this.increaseScoreEnemies(eliminatedCitizens);
    this.increaseScoreEnemiesDead(eliminatedEnemies);
  }

  increaseScorePlayer(saveCitizens) {
    this.scorePlayer = saveCitizens;
  }

  increaseScoreEnemies(eliminatedCitizens) {
    this.scoreEnemies = eliminatedCitizens;
  }
  increaseScoreEnemiesDead(eliminatedEnemies) {
    this.scoreEnemiesDead = eliminatedEnemies;
  }
}
