class Cannon {
  constructor(xInitialPosition, yInitialPosition) {
    this.xPosition = xInitialPosition;
    this.yPosition = yInitialPosition;
    this.angle = 45;
    this.power = 100;
    this.shotsLeft = 3;
    this.projectileTrajectory = [];
    this.currentTrajectoryIndex = 0;
    this.intervalId=0;
    this.shootingTakingPlace = false;
    this.playerWins = false;
    this.playerLoses = false;
  }

  angleUp() {
   this.angle ++
   const messageBox = document.getElementById('angle');
   messageBox.innerHTML = 'Angle: ' + this.angle + 'º'; //mover a main
  }

  angleDown() {
    this.angle --
    const messageBox = document.getElementById('angle');
    messageBox.innerHTML = 'Angle: ' + this.angle + 'º';
  }

  powerUp() {
    this.power ++
    const messageBox = document.getElementById('power');
    messageBox.innerHTML = 'Power: ' + this.power;
  }

  powerDown() {
    this.power --
    const messageBox = document.getElementById('power');
    messageBox.innerHTML = 'Power: ' + this.power;
  }

  _calculateTrajectory() {
    console.log("Calculate Trajectory!");
    this.projectileTrajectory = [];
    let xCoordinate = 0;
    let yCoordinate = 0;
    let t = 0;
    const powerAdjuster = 20; //t his variable is used to adjust the power to the grid
    const gravityAdjuster = 100;
    const g = - 9.8 / gravityAdjuster;
    do {
      // x = (Vo * cos(a)) * t
      xCoordinate = this.xPosition + (this.power / powerAdjuster * Math.cos(this.angle / 180 * Math.PI) * t);
      // y = (Vo * cos(a)) * t + 0,5 * g * t^2
      yCoordinate = this.yPosition - (this.power / powerAdjuster * Math.sin(this.angle / 180 * Math.PI) * t + (0.5 * g * Math.pow(t,2)));

      this.projectileTrajectory.push({x: xCoordinate, y: yCoordinate});
      t ++
    }
    while (xCoordinate <= 500 && yCoordinate <= 500);
  }

  _isTargetHit(targetCannon) {
    this.projectileTrajectory.forEach( function (item) {
      //check if projectile intersects target position +/- 10 on each axis
      if (item.x > (targetCannon.xPosition - 10) && item.x < (targetCannon.xPosition + 10) && 
      item.y > (targetCannon.yPosition - 10) && item.y < (targetCannon.yPosition + 10)) {
        playerWins = true;
      }
    }
    )
  }

_shoot() {
  this.shotsLeft --
  this.currentTrajectoryIndex = 0;
  this.shootingTakingPlace = true;
  this.intervalId = setInterval(this._nextProjectilePosition.bind(this), 20);
}

_nextProjectilePosition(){
  this.currentTrajectoryIndex ++;
  if (this.currentTrajectoryIndex === (this.projectileTrajectory.length - 1)) {
    this._endShot()
  }
}

_endShot() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.shootingTakingPlace = false;
  }
}
}
