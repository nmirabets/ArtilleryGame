class Game {
  constructor(options, callback) {
    this.ctx = options.ctx;
    this.playerCannon = options.playerCannon;
    this.targetCannon = options.targetCannon;
    this.levelFunctions = [
      [80, 0.25],
      [0, 1.25, -0.00125],
      [-25,2.75,-0.0054,0.000002678]
    ]
    this.mapCoordinates = [];
    this.currentLevel = 2;
    this.cb = callback;
    this.status = "intro"; // intro, win, lose
  }

  _drawMap() {
    this.ctx.fillStyle = 'brown';
    for (let j=0; j< this.mapCoordinates.length -1;j++) {
      this.ctx.fillRect(
        this.mapCoordinates[j].x,
        this.mapCoordinates[j].y,
        2,
        2
      );
    }
  }

  _calculateMapCoordinates() {

  let xMap = 0;
  let yMap = 0;
  this.mapCoordinates = [];

  for (let i = 0; i < 1000; i++) {
        xMap = i;
        yMap = this._levelFunction(xMap)

        this.mapCoordinates.push({x: xMap, y: yMap})
  }
  }

  _levelFunction(xCoordinate) {

    let calcY = 0;

    switch (this.currentLevel) {
      case 1:
        calcY = this.levelFunctions[0][0] + this.levelFunctions[0][1] * xCoordinate
        return calcY
      break;
      case 2:
        calcY = this.levelFunctions[1][0] + this.levelFunctions[1][1] * xCoordinate + this.levelFunctions[1][2] * Math.pow(xCoordinate, 2)
        return calcY
      break;
      case 3:
        calcY = 500 - (this.levelFunctions[1][0] + this.levelFunctions[1][1] * xCoordinate + this.levelFunctions[1][2] * Math.pow(xCoordinate, 2) + this.levelFunctions[2][3] * Math.pow(xCoordinate, 3))
        return calcY
      break;
    }

    // let calcY = 0;

    // for (let i = 0; i < this.levelFunctions[0].length -1; i++) {
    //   calcY += this.levelFunctions[this.currentLevel][i] * Math.pow(xCoordinate,this.currentLevel)
    // }

    // return calcY;
  }

  _drawPlayerCannon() {
    //let img = createImageBitmap("img/Cannon.png")
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      this.playerCannon.xPosition,
      this.playerCannon.yPosition,
      10,
      10
    );
  }

  _drawTargetCannon() {
    //this.ctx.fillStyle = 'Red';
     let img = new Image
     img.src = "/img/Cannon.png"
    this.ctx.drawImage(img, this.targetCannon.xPosition, this.targetCannon.yPosition,50,50);

    // this.ctx.fillRect(
    //   this.targetCannon.xPosition,
    //   this.targetCannon.yPosition,
    //   10,
    //   10
    // );
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

  _drawProjectilePath() {
    this.ctx.fillStyle = 'gray';
    if (this.playerCannon.currentTrajectoryIndex) {
      for (let i = 0; i < this.playerCannon.currentTrajectoryIndex; i++) {
        this.ctx.fillRect(
          this.playerCannon.projectileTrajectory[i].x + 5,
          this.playerCannon.projectileTrajectory[i].y + 5,
          1,
          1
        )
      }
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
    this.ctx.clearRect(0, 0, 1000, 500);
  }

  start() {
    this._clean();
    this._assignControlsToKeys();
    this._generateRandomCannonPositions(this.playerCannon,this.targetCannon)
    this._drawPlayerCannon();
    this._drawTargetCannon();
    this._calculateMapCoordinates();
    this._drawMap();
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
    this._drawProjectilePath();
    this._drawMap();
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

  _generateRandomCannonPositions(playerCannon,targetCannon) {
    this.playerCannon.xPosition = Math.floor(Math.random() * 500);
    this.targetCannon.xPosition = 500 + Math.floor(Math.random() * 500);

    this.playerCannon.yPosition = this._levelFunction(this.playerCannon.xPosition) - 5;
    this.targetCannon.yPosition = this._levelFunction(this.targetCannon.xPosition) - 5;
  }
}