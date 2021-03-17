class Game {
  constructor(options, callback) {
    this.ctx = options.ctx;
    this.intervalId = 0;
    this.shootingTime = 5000; //time in ms
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
    this.ctx.fillRect(
      this.playerCannon.projectileTrajectory[this.playerCannon.CurrentTrajectoryIndex].x ,
      this.playerCannon.projectileTrajectory[this.playerCannon.CurrentTrajectoryIndex].y ,
      10,
      10
    )
  }

  _assignControlsToKeys() {
  document.addEventListener('keydown', (event) => {
    switch (event.keyCode) { //cambiar a .Code
      case 38: //arrow up
        this.playerCannon.angleUp();
        break;
      case 40: //arrow down
        this.playerCannon.angleDown();
        break;
      case 37: //arrow left
        this.playerCannon.powerDown();
        break;
      case 39: //arrow right
        this.playerCannon.powerUp();
        break;
      case 32: //space bar
        this.shoot();
        break;
      default: 
        break;
    }
  });
}

  _clean() {
    this.ctx.clearRect(0, 0, 500, 500);
  }

  _update() {
    this._clean();
    this._drawPlayerCannon();
    this._drawTargetCannon();
    this.playerCannon._moveProjectile();
    this._drawPlayerProjectile();
    window.requestAnimationFrame(this._update.bind(this));
  }

  start() {
    this._clean();
    this._assignControlsToKeys();
    this._drawPlayerCannon();
    this._drawTargetCannon();
  }

  // _update() {
  //   this._clean();
  //   this._drawPlayerCannon();
  //   this._drawTargetCannon();
  //   this._drawPlayerProjectile();
  //   if (this.playerCannon.CurrentTrajectoryIndex > this.playerCannon.projectileTrajectory.length){
  //     //shooting finished
  //     if (this.playerCannon._isTargetHit(this.targetCannon)) {
  //       // player wins
  //     } else if (this.playerCannon.bulletsLeft === 0) {
  //       // player loses
  //     }
  //     this.playerCannon._endShot()
  //   }
  // }

  shoot() {
    this.playerCannon.bulletsLeft = this.playerCannon.bulletsLeft --
    this.playerCannon._calculateTrajectory();
    this.playerCannon.CurrentTrajectoryIndex = 0;
    this.playerCannon._shoot()
    window.requestAnimationFrame(this._update.bind(this));
  }

  _generateRandomTargetPosition(targetCannon) {
    this.targetCannon = new Cannon(Math.floor(Math.random() * 1), Math.floor(Math.random() * 1));
  }

}