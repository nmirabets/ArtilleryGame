document.addEventListener('DOMContentLoaded', () => {
  let game;

  function showMessageScreen(playerWins) {
    let msgScreen = document.querySelector('#msg-screen');
    let gameData = document.querySelector('#game-data');
    let canvas = document.querySelector('#canvas');
    let button = document.querySelector('#start');

    if (playerWins) {
      msgScreen.classList.remove("intro");
      msgScreen.classList.add('win');
    } else {
      msgScreen.classList.remove("intro");
      msgScreen.classList.add('lose');
    }
    canvas.style = 'display: none;';
    gameData.style = 'display: none;';
    msgScreen.style = 'display: flex';
    button.classList.add("hide");
  }

  const startButton = document.querySelector('#start');
  game = document.getElementById('game');

  startButton.addEventListener('click', () => {
    let msgScreen = document.querySelector("#msg-screen")
    msgScreen.style = "display: none;"
    game.style = "display: block;"
    
    let canvas = game.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    const artilleryGame = new Game(
      {
        ctx: ctx,
        playerCannon: new Cannon(200, canvas.height - 10),
        targetCannon: new Cannon(800, canvas.height - 10)
      },
      showMessageScreen
    );
    artilleryGame.start();
    });
  }
)