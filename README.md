# Artillery Game

## Game description
This game is a remastered edition of the classical "Artillery game". In this game, the player has to defeat it's opponent's tower by shooting it down. The game is played by turns; the player adjusts the angle and power of the tower so the projectile hits the enemy's tower after a parabolic trajectory.

Wikipedia on [Artillery game](https://en.wikipedia.org/wiki/Artillery_game).

Ballistic trajectory x, y components:

![](https://lh3.googleusercontent.com/proxy/U64NGg0eamDwezMKSjibYd5E_IVsPXMAIvtR3SmArTcsdK4aRxvEOiodZUmJQV943ZeJJ7Tn0-feCAAyQWklxGFJudt1-J6azVBc-Ru-_qDiEYc)

### Technologies used:
- HTML 5 & CSS
- Canvas
- Javascript


## MVP
- 1 player game vs. target
- 1 level, 1 map
- Able to see the projectile
- 1 type of weapon
- Start screen
- Game screen
- Win screen
- Lose screen

## Nice to have
- Able to see the projectile's trajectory
- Graphics on projectile collision
- Graphics on shooting
- 2 players (1 vs.1)
- 5 different maps (w/ different gravities / wind components)
- 3 types of weapons

## Structure

### Start screen

- Title
- Game image
- Instructions
- Start button

### Game screen

- Canvas
- Player tower
	- Cannon angle (up & down keys)
	- Power (space bar)
- Score
- Time (s)

### Win screen

- Title "You won! :D"
- Win image
- Score - Time / lives left
- Restart button

### Lose Screen

- Title "You lost :("
- Lose image
- Score - Time / lives left
- Restart button
