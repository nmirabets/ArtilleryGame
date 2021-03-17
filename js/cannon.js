class Cannon {
  constructor(xInitialPosition, yInitialPosition) {
    this.xPosition = xInitialPosition;
    this.yPosition = yInitialPosition;
    this.angle = 45;
    this.power = 100;
    this.shotsLeft = 3;
    this.projectileTrajectory = undefined;
    this.currentTrajectoryIndex = 0;
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
      {x: this.xPosition, y: this.yPosition},
      {x: 100, y: this.yPosition},
      {x: 150, y: this.yPosition - 50},
      {x: 200, y: this.yPosition - 100},
      {x: 250, y: this.yPosition - 200},
      {x: 300, y: this.yPosition - 250},
      {x: 350, y: this.yPosition - 200},
      {x: 400, y: this.yPosition - 100},
      {x: 450, y: this.yPosition - 50},
      {x: 500, y: this.yPosition}
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
  this.shotsLeft --
  this.CurrentTrajectoryIndex = 0;
  const messageBox = document.getElementById('shots');
  messageBox.innerHTML = 'Shots left: ' + this.shotsLeft;
  this.intervalId = setInterval(this._nextProjectilePosition.bind(this), 200);
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
