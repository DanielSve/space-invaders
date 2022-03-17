"use strict";
import * as score from "./score.js";
import { enemies } from "./render.js";
import * as render from "./render.js";
import * as game from "./game.js";

let xDir = 25;
let skipXmovement = false;
let enemiesXY = [];
let shotSpeed = -20;
let enemiesCount = 0;
let width = render.gameElement.offsetWidth;
let height = render.gameElement.offsetHeight;
let enemiesWidth = 0;
let enemiesHeight = 0;
let playerWidth = "";
let playerX = width / 2 - 25;
let playerY = height - 70;
let shotsXY = [];
let enemyRows = 2;

export { enemiesXY, playerX, playerY, shotsXY, enemiesCount };

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    playerX += 20;
  } else if (e.key === "ArrowLeft") {
    playerX -= 20;
  }
  if (e.key === "Shift") {
    shotsXY[0][1] = playerY - 5;
    shotsXY.push(shotsXY.shift());
  } else if (e.key === "Enter" && !game.running) {
    game.startNewGame();
  }
});

export const setEnemyPositions = () => {
  enemiesXY = [];
  let y = -40;
  for (let i = 0; i < enemyRows; i++) {
    let row = [];
    y += 70;
    let x = 75;
    for (let j = 0; j < 10; j++) {
      row.push([x, y]);
      x += 80;
    }
    enemiesXY.push(row);
  }
};

export const setMovementVariables = () => {
  playerWidth = render.player.offsetWidth;
  enemiesWidth = enemies[0][0].offsetWidth;
  enemiesHeight = enemies[0][0].offsetHeight;
  enemiesCount = enemies.length * enemies[0].length;
  xDir = Math.abs(xDir);
};

export const moveEnemies = () => {
  if (!skipXmovement) {
    checkDirection();
  } else {
    skipXmovement = false;
  }
  if (!skipXmovement) {
    for (let i = 0; i < enemyRows; i++) {
      for (let j = 0; j < enemiesXY[0].length; j++) {
        enemiesXY[i][j][0] += xDir;
      }
    }
  }
};

const checkDirection = () => {
  for (let i = 0; i < enemiesXY.length; i++) {
    for (let j = 0; j < enemiesXY[0].length; j++) {
      if (enemyCollidesWithEdges(i, j)) {
        xDir = enemiesXY[i][j][0] <= 0 + 40 ? 25 : -25;
        lowerEnemies();
        skipXmovement = true;
        return;
      }
    }
  }
};

const enemyCollidesWithEdges = (i, j) =>
  enemiesXY[i][j][0] <= 0 + 40 ||
  enemiesXY[i][j][0] >= width - enemiesWidth - 40;

const lowerEnemies = () => {
  for (let i = 0; i < enemyRows; i++) {
    for (let j = 0; j < enemiesXY[i].length; j++) {
      enemiesXY[i][j][1] += 55;
    }
  }
};

export const moveShots = () => {
  shotsXY.forEach((shot, i) => {
    if (shotsXY[i][1] >= playerY) {
      shotsXY[i][0] = playerX + 23;
    } else {
      shotsXY[i][1] += shotSpeed;
    }
  });
};

export const initiateShots = () => {
  shotsXY = [];
  render.shots.forEach((s, i) => shotsXY.push([playerX + 23, playerY]));
};

export const resetShot = (index) => {
  shotsXY[index][1] = playerY;
  shotsXY[index][0] = playerX + playerWidth;
};

export const checkCollision = () => {
  if (playerX <= 0) {
    playerX = 0;
  } else if (playerX >= width - playerWidth - 7) {
    playerX = width - playerWidth - 7;
  }
  collisionWithEnemy();
  shotCollision();
};

export const collisionWithEnemy = () => {
  for (let i = 0; i < enemiesXY.length; i++) {
    for (let j = 0; j < enemiesXY[0].length; j++) {
      if (enemiesXY[i][j][1] + enemiesHeight > playerY) {
        // reset();
        score.subtractLife();
        break;
      }
    }
  }
};

export const shotCollision = () => {
  for (let i = 0; i < shotsXY.length; i++) {
    if (checkEnemy(shotsXY[i][0], shotsXY[i][1]) || shotsXY[i][1] <= 0) {
      resetShot(i);
    }
  }
};

export const checkEnemy = (x, y) => {
  for (let i = 0; i < enemiesXY.length; i++) {
    for (let j = 0; j < enemiesXY[0].length; j++) {
      if (checkXRange(i, j, x) && checkYRange(i, j, y)) {
        render.hideEnemy(i, j);
        enemiesXY[i][j][0] = "Removed";
        enemiesXY[i][j][1] = "Removed";
        score.increaseScore();
        enemiesCount--;
        return true;
      }
    }
  }
};

export const checkYRange = (i, j, y) =>
  y < enemiesXY[i][j][1] + enemiesHeight && y > enemiesXY[i][j][1];

export const checkXRange = (i, j, x) =>
  x < enemiesXY[i][j][0] + enemiesWidth && x > enemiesXY[i][j][0];

export const increaseEnemyRows = () => enemyRows++;

export const resetEnemyRows = () => (enemyRows = 2);
