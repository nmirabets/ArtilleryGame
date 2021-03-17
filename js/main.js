document.addEventListener('DOMContentLoaded', () => {
  let game;

  function printGameOver() {
    let gameOver = document.getElementById('gameover');
    let canvas = document.querySelector('#artillery');
    canvas.style = 'display: none';
    gameOver.style = 'display: block';
  }

  function generateSplashScreen() {
    const intro = document.getElementById('intro');
    intro.innerHTML = `
    <div>
      <button id="play" class="mb-2">Play</button>
    </div>
    `;

    const playButton = document.querySelector('#play');

    playButton.addEventListener('click', () => {
      intro.classList.add('hide');
      const game = document.getElementById('game');
      game.classList.remove('hide');
      game.classList.add('show');

      const startButton = game.querySelector('#start');
      startButton.addEventListener('click', () => {
        let canvas = game.querySelector('#artillery');
        const ctx = canvas.getContext('2d');
        const artilleryGame = new Game(
          {
            ctx: ctx,
            playerCannon: new Cannon(100, canvas.height - 10),
            targetCannon: new Cannon(400, canvas.height - 10)
          },
          printGameOver
        );
        artilleryGame.start();
      });
    });
  }
  generateSplashScreen();
});
