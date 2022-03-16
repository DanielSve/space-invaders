"use strict";

import { enemiesCount } from "./movement.js";

let scoreEl = document.querySelector(".score-number");
let livesEl = document.querySelector(".lives-number");
let lives = 3;
let score = 0;
let level = 1;
let nextLevel = false;
let gameOver = false;
let gameFinished = false;
let retryLevel = false;
let scorePerEnemyShot = 50;

export { scoreEl, livesEl, lives, score, level, nextLevel, gameOver, gameFinished, retryLevel };

export const checkGameStatus = () => {
  if (enemiesCount < 1) {
    nextLevel = true;
    level++;
    scorePerEnemyShot +=35;
  } else if (lives < 1) {
    gameOver = true;
  } 
  if(level > 5) {
    gameFinished = true;
  }
};

export const resetNextLevel = () => {
  nextLevel = false;
};

export const resetRetryLevel = () => {
  retryLevel = false;
}

export const subtractLife = () => {
  retryLevel = true;
  lives--;
};

export const increaseScore = () => {
  score += scorePerEnemyShot;
};

export const reset = () => {
  level = 1;
  score = 0;
  lives = 3;
  scorePerEnemyShot = 50;
  retryLevel = false;
  nextLevel = false;
  gameOver = false;
  gameFinished = false;
}
