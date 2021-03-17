class Cannon {
  constructor(xInitialPosition, yInitialPosition) {
    this.xPosition = xInitialPosition;
    this.yPosition = yInitialPosition;
    this.angle = 45;
    this.power = 100;
    this.bulletsLeft = 3;
    this.projectileTrajectory = undefined;
    this.currentTrajectoryIndex = undefined
    this.intervalId=0;
  }

  angleUp() {
    const messageBox = document.getElementById('angle');
    this.angle ++
    messageBox.innerHTML = 'Angle: ' + this.angle; //mover a main
  }

  angleDown() {
    const messageBox = document.getElementById('angle');
    this.angle --
    messageBox.innerHTML = 'Angle: ' + this.angle;
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

    // for (let i = 0; i > 500; i++) {
      
    // }
    this.projectileTrajectory = [
      //aquí se definirá la trayectoria del tiro parabólico
      {x: 50, y: 450},
      {x: 100, y: 400},
      {x: 200, y: 300},
      {x: 300, y: 200},
      {x: 400, y: 100}
    ]
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
  this.intervalId = setInterval(this._nextProjectilePosition.bind(this), 1000);
}

_nextProjectilePosition(){
  this.currentTrajectoryIndex = this.currentTrajectoryIndex ++
}

_endShot() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}

_moveProjectile() {
    this.intervalId = setInterval(this._nextProjectilePosition.bind(this), 1000);
  }
}
