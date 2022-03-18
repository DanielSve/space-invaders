"use strict";
import * as score from "./score.js";
import { enemies } from "./render.js";
import * as render from "./render.js";
import * as game from "./game.js";

let xDir = 25;
let skipXmovement = false;
let enemiesPos = [];
let shotsPos = [];
let shotSpeed = -20;
let enemiesCount = 0;
let width = render.gameElement.offsetWidth;
let height = render.gameElement.offsetHeight;
let enemiesWidth;
let enemiesHeight;
let playerWidth;
let playerX = width / 2 - 25;
let playerY = height - 70;
let enemyRows = 2;

export { enemiesPos, playerX, playerY, shotsPos, enemiesCount };

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    playerX += 20;
  } else if (e.key === "ArrowLeft") {
    playerX -= 20;
  }
  if (e.key === "Shift") {
    shotsPos[0].y = playerY - 5;
    shotsPos.push(shotsPos.shift());
  } else if (e.key === "Enter" && !game.running) {
    game.startNewGame();
  }
});

export const setEnemyPositions = () => {
  enemiesPos = [];
  let yValue = -40;
  for (let i = 0; i < enemyRows; i++) {
    let row = [];
    yValue += 70;
    let xValue = 75;
    for (let j = 0; j < 10; j++) {
      row.push({x: xValue, y: yValue});
      xValue += 80;
    }
    enemiesPos.push(row);
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
      for (let j = 0; j < enemiesPos[0].length; j++) {
        enemiesPos[i][j].x += xDir;
      }
    }
  }
};

const checkDirection = () => {
  for (let i = 0; i < enemiesPos.length; i++) {
    for (let j = 0; j < enemiesPos[0].length; j++) {
      if (enemyCollidesWithEdges(i, j)) {
        xDir = enemiesPos[i][j].x <= 0 + 40 ? 25 : -25;
        lowerEnemies();
        skipXmovement = true;
        return;
      }
    }
  }
};

const enemyCollidesWithEdges = (i, j) =>
  enemiesPos[i][j].x <= 0 + 40 ||
  enemiesPos[i][j].x >= width - enemiesWidth - 40;

const lowerEnemies = () => {
  for (let i = 0; i < enemyRows; i++) {
    for (let j = 0; j < enemiesPos[i].length; j++) {
      enemiesPos[i][j].y += 55;
    }
  }
};

export const moveShots = () => {
  shotsPos.forEach((shot, i) => {
    if (shotsPos[i].y >= playerY) {
      shotsPos[i].x = playerX + 23;
    } else {
      shotsPos[i].y += shotSpeed;
    }
  });
};

export const initiateShots = () => {
  shotsPos = [];
  render.shots.forEach((s, i) => shotsPos.push({x: playerX + 23,y: playerY}));
};

export const resetShot = (index) => {
  shotsPos[index].y = playerY;
  shotsPos[index].x = playerX + playerWidth/2;
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
  for (let i = 0; i < enemiesPos.length; i++) {
    for (let j = 0; j < enemiesPos[0].length; j++) {
      if (enemiesPos[i][j].y + enemiesHeight > playerY) {
        score.subtractLife();
        break;
      }
    }
  }
};

export const shotCollision = () => {
  for (let i = 0; i < shotsPos.length; i++) {
    if (checkEnemy(shotsPos[i].x, shotsPos[i].y) || shotsPos[i].y <= 0) {
      resetShot(i);
    }
  }
};

export const checkEnemy = (x, y) => {
  for (let i = 0; i < enemiesPos.length; i++) {
    for (let j = 0; j < enemiesPos[0].length; j++) {
      if (checkXRange(i, j, x) && checkYRange(i, j, y)) {
        render.hideEnemy(i, j);
        enemiesPos[i][j].x = "Removed";
        enemiesPos[i][j].y = "Removed";
        score.increaseScore();
        enemiesCount--;
        return true;
      }
    }
  }
};

export const checkYRange = (i, j, y) =>
  y < enemiesPos[i][j].y + enemiesHeight && y > enemiesPos[i][j].y;

export const checkXRange = (i, j, x) =>
  x < enemiesPos[i][j].x + enemiesWidth && x > enemiesPos[i][j].x;

export const increaseEnemyRows = () => enemyRows++;

export const resetEnemyRows = () => (enemyRows = 2);
