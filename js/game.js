class Game {
  constructor(options, callback) {
    this.ctx = options.ctx;
    this.playerCannon = options.playerCannon;
    this.targetCannon = options.targetCannon;
    this.cb = callback;
  }

  _drawPlayerCannon() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      this.playerCannon.xPosition,
      this.playerCannon.yPosition,
      10,
      10
    );
  }

  _drawTargetCannon() {
    this.ctx.fillStyle = 'Red';
    this.ctx.fillRect(
      this.targetCannon.xPosition,
      this.targetCannon.yPosition,
      10,
      10
    );
  }

  _drawPlayerProjectile() {
    this.ctx.fillStyle = 'orange';
    if (this.playerCannon.currentTrajectoryIndex) {
      this.ctx.fillRect(
        this.playerCannon.projectileTrajectory[this.playerCannon.currentTrajectoryIndex].x ,
        this.playerCannon.projectileTrajectory[this.playerCannon.currentTrajectoryIndex].y ,
        10,
        10
      )
    }
  }

  _assignControlsToKeys() {
  document.addEventListener('keydown', (event) => {
    switch (event.code) { //cambiar a .Code
      case "ArrowUp": //arrow up to increase angle
        this.playerCannon.angleUp();
        break;
      case "ArrowDown": //arrow down to decrease angle
        this.playerCannon.angleDown();
        break;
      case "ArrowLeft": //arrow left to decrese power
        this.playerCannon.powerDown();
        break;
      case "ArrowRight": //arrow right to increase power
        this.playerCannon.powerUp(); 
        break;
      case "KeyS": // s to shoot
        if (this.playerCannon.shootingTakingPlace === false) {
          this.shoot();
        }
        break;
      default:
        break;
    }
  });
}

  _clean() {
    this.ctx.clearRect(0, 0, 500, 500);
  }

  start() {
    this._clean();
    this._assignControlsToKeys();
    this._drawPlayerCannon();
    this._drawTargetCannon();
    window.requestAnimationFrame(this._update.bind(this));
  }

  shoot() {
    this.shootingTakingPlace = true;
    this.playerCannon._calculateTrajectory();
    this.playerCannon._shoot()
    if (this.playerCannon._isTargetHit(this.targetCannon)) {
      this.playerCannon.playerWins = true;
    } else if (this.playerCannon.shotsLeft === 0) {
      this.playerCannon.playerLoses = true;
    }
  }

  _update() {
    // draw elements
    this._clean();
    this._drawPlayerCannon();
    this._drawTargetCannon();
    this._drawPlayerProjectile();
    // update labels
    const messageBox = document.getElementById('shots');
    messageBox.innerHTML = 'Shots left: ' + this.playerCannon.shotsLeft;
    // check if player has lost
    if (this.playerCannon.playerLoses === true && this.playerCannon.shootingTakingPlace === false) {
      this.cb();
      return;
    }
    // check if player has won
    if (this.playerCannon.playerWins === true && this.playerCannon.shootingTakingPlace === false) {
      this.cb();
      return;
    }
    // next frame
    window.requestAnimationFrame(this._update.bind(this));
  }

  _generateRandomTargetPosition(targetCannon) {
    this.targetCannon = new Cannon(Math.floor(Math.random() * 1), Math.floor(Math.random() * 1));
  }
}