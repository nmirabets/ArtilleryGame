document.addEventListener('DOMContentLoaded', () => {
  let game;

  function showMessageScreen() {
    let msgScreen = document.getElementById('#msg-screen');
    let canvas = document.querySelector('#canvas');
    canvas.style = 'display: none';
    msgScreen.style = 'display: block';
  }

  const startButton = document.querySelector('#start');
  game = document.getElementById('game');
  //gameStats = document.getElementById('game-data');

  startButton.addEventListener('click', () => {
    let msgScreen = document.querySelector("#msg-screen")
    msgScreen.style = "display: none;"
    game.style = "display: flex;"
    
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

// Dudas Ale:
// 1. Cómo puedo acceder al canvas desde game.js?
// 2.

/* To-do's:
+ mostrar imagen inicial en el canvas
+ centrar boton START
+ mostrar game-stats al iniciar el juego
+ mostrar pantallas de win y lose
+ mostrar restart button en pantallas de win y lose
*/



    
  // function generateSplashScreen() {
  //   const intro = document.getElementById('intro');
  //   intro.innerHTML = `
  //   <div>
  //     <button id="play" class="mb-2">Play</button>
  //   </div>
  //   `;



//     const playButton = document.querySelector('#play');
//     playButton.addEventListener('click', () => {
//       intro.classList.add('hide');
//       const game = document.getElementById('game');
//       game.classList.remove('hide');
//       game.classList.add('show');

//       const startButton = game.querySelector('#start');
//       startButton.addEventListener('click', () => {
//         let canvas = game.querySelector('#artillery');
//         const ctx = canvas.getContext('2d');
//         const artilleryGame = new Game(
//           {
//             ctx: ctx,
//             playerCannon: new Cannon(100, canvas.height - 10),
//             targetCannon: new Cannon(400, canvas.height - 10)
//           },
//           printGameOver
//         );
//         artilleryGame.start();
//       });
//     });
//   }
//   generateSplashScreen();
// });
