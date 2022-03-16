"use strict";

import * as movement from "./movement.js";
import * as render from "./render.js";
import * as score from "./score.js";
export let enemyMoveMs = 430;
let running = false;

export const initiateNewLevel = () => {
  movement.increaseEnemyRows();
  movement.setEnemyPositions();
  movement.setMovementVariables();
};

export const startNewGame = () => {
  score.reset();
  render.clear();
  render.initiateAll();
  render.hideMessage();
  movement.resetEnemyRows();
  movement.initiateShots();
  render.updateLevel();
  initiateNewLevel();
  enemyMoveMs = 430;
  clearInterval(enemiesInterval);
  enemiesInterval = setInterval(runEnemies, enemyMoveMs);
  running = true;
};

export const retryLevel = () => {
  render.clear();
  render.initiateAll();
  score.resetRetryLevel();
  movement.setEnemyPositions();
  movement.setMovementVariables();
  running = true;
}

const runGame = () => {
  if (running) {
    if (score.nextLevel) {
      render.clear();
      render.initiateAll();
      score.resetNextLevel();
      render.updateLevel();
      enemyMoveMs-=40;
      clearInterval(enemiesInterval);
      enemiesInterval = setInterval(runEnemies, enemyMoveMs);
      initiateNewLevel();
    } else if (score.gameOver) {
      stopGame();
      render.showGameOver();
    } else if (score.gameFinished) {
      stopGame();
      render.showCongrats();
    } else if(score.retryLevel) {
      stopGame();
      retryLevel();
    } else { 
      movement.checkCollision();
      render.updateScreen();
      movement.moveShots();
      score.checkGameStatus();
    }
  }
};

const runEnemies = () => {
  if (!score.nextLevel && running) {
    movement.moveEnemies();
  }
};

const stopGame = () => {
  render.hideEnemies();
  running = false;
}

render.initiateMessages();
render.showStart();
let gameInterval = setInterval(runGame, 20);
let enemiesInterval = setInterval(runEnemies, enemyMoveMs);
