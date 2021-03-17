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
  }

  angleUp() {
    const messageBox = document.getElementById('angle');
    this.angle ++
    messageBox.innerHTML = 'Angle: ' + this.angle + 'º'; //mover a main
  }

  angleDown() {
    const messageBox = document.getElementById('angle');
    this.angle --
    messageBox.innerHTML = 'Angle: ' + this.angle + 'º';
  }

  powerUp() {
    const messageBox = document.getElementById('power');
    this.power ++
    messageBox.innerHTML = 'Power: ' + this.power;
  }

  powerDown() {
    const messageBox = document.getElementById('power');
    this.power --
    messageBox.innerHTML = 'Power: ' + this.power;
  }

  _calculateTrajectory() {
    let xCoordinate = 0;
    let yCoordinate = 0;
    const powerAdjuster = 20; //t his variable is used to adjust the power to the grid
    const gravityAdjuster = 100;
    const g = - 9.8 / gravityAdjuster;
    for (let t = 0; t < 501; t++) {
      // x = (Vo * cos(a)) * t
      xCoordinate = this.xPosition + (this.power / powerAdjuster * Math.cos(this.angle / 180 * Math.PI) * t);
      // y = (Vo * cos(a)) * t + 0,5 * g * t^2
      yCoordinate = this.yPosition - (this.power / powerAdjuster * Math.sin(this.angle / 180 * Math.PI) * t + (0.5 * g * Math.pow(t,2)));

      this.projectileTrajectory.push({x: xCoordinate, y: yCoordinate});
    }
  }

  _isTargetHit(targetCannon) {
    this.projectileTrajectory.forEach( function (item) {
      //check if projectile intersects target position +/- 10 on each axis
      if (item.x > (targetCannon.x - 10) && item.x < (targetCannon.x + 10) && 
      item.y > (targetCannon.y - 10) && item.y < (targetCannon.y + 10)) {
        return true
      }
    }
    )
    return false
  }

_shoot() {
  this.shotsLeft --
  this.currentTrajectoryIndex = 0;
  const messageBox = document.getElementById('shots');
  messageBox.innerHTML = 'Shots left: ' + this.shotsLeft;
  this.intervalId = setInterval(this._nextProjectilePosition.bind(this), 25);
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
  }
}

// _moveProjectile() {
//     this.intervalId = setInterval(this._nextProjectilePosition.bind(this), 1000);

//   }
}
