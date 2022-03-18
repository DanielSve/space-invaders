"use strict";

export let enemies = [];
export let gameMessage;
export let message1;
export let message2;
export let gameElement = document.querySelector(".game-div");
export let levelElement = document.querySelector(".level-number");
export let scoreEl = document.querySelector(".score-number");
export let livesEl = document.querySelector(".lives-number");
export let shots = [];
export let player;

import {
  enemiesPos,
  playerX,
  playerY,
  shotsPos,
} from "./movement.js";

import { score, lives, level } from "./score.js";

export const updateScreen = () => {
  for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < enemies[i].length; j++) {
      enemies[i][j].style.left = enemiesPos[i][j].x + "px";
      enemies[i][j].style.top = enemiesPos[i][j].y + "px";
      enemies[i][j].style.visibility = "visible";
    }
  }
  shots.forEach((shot, i) => {
    shots[i].style.top = shotsPos[i].y + "px";
    shots[i].style.left = shotsPos[i].x + "px";
    if(shotsPos[i].y < playerY) {
      shots[i].style.display = "block";
    } else shots[i].style.display = "none";
  });
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
  player.style.visibility = "visible";
  scoreEl.textContent = score;
  livesEl.textContent = lives;
};

export const createEnemiesHTML = (type) => {
  let enemies = [];
  for (let i = 0; i < 10; i++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.classList.add(type);
    gameElement.appendChild(enemy);
    enemies.push(enemy);
  }
  return enemies;
};

export const initiateShots = () => {
  shots = [];
  for (let i = 0; i < 20; i++) {
    let shot = document.createElement("div");
    shot.classList.add("shot");
    gameElement.appendChild(shot);
    shots.push(shot);
  }
};

export const initiatePlayer = () => {
  player = document.createElement("div");
  player.classList.add("player");
  gameElement.appendChild(player);
}

export const initiateMessages = () => {
  gameMessage = document.createElement("div");
  gameMessage.classList.add("game-message")
  message1 = document.createElement("p");
  message2 = document.createElement("p");
  message1.classList.add("message-1");
  message2.classList.add("message-2");
  gameMessage.appendChild(message1);
  gameMessage.appendChild(message2);
  gameElement.appendChild(gameMessage);
}

export const initiateAll = () => {
  initiateMessages();
  initiateEnemies();
  initiatePlayer();
  initiateShots();
}

export const initiateEnemies = () => {
  if (level === 1) {
    enemies = [
      createEnemiesHTML("one"),
      createEnemiesHTML("two"),
      createEnemiesHTML("three"),
    ];
  } else if (level === 2) {
    enemies = [
      createEnemiesHTML("one"),
      createEnemiesHTML("two"),
      createEnemiesHTML("three"),
      createEnemiesHTML("four"),
    ];
  } else if (level === 3) {
    enemies = [
      createEnemiesHTML("three"),
      createEnemiesHTML("one"),
      createEnemiesHTML("two"),
      createEnemiesHTML("three"),
      createEnemiesHTML("four"),
    ];
  } else if (level === 4) {
    enemies = [
      createEnemiesHTML("four"),
      createEnemiesHTML("one"),
      createEnemiesHTML("four"),
      createEnemiesHTML("one"),
      createEnemiesHTML("four"),
      createEnemiesHTML("one"),
    ];
  } else if (level === 5) {
    enemies = [
      createEnemiesHTML("one"),
      createEnemiesHTML("one"),
      createEnemiesHTML("one"),
      createEnemiesHTML("one"),
      createEnemiesHTML("one"),
      createEnemiesHTML("one"),
      createEnemiesHTML("one"),
    ];
  }
};

export const showGameOver = () => {
  message1.textContent= "GAME OVER";
  message2.textContent = "Press Enter To Restart";
  gameMessage.style.visibility = "visible";
};

export const showCongrats = () => {
  message1.textContent= "CONGRATS YOU DID IT!";
  message2.textContent = "Press Enter To Restart";
  gameMessage.style.visibility = "visible";
}

export const showStart = () => {
  message1.textContent= "";
  message2.textContent = "Press Enter To Start";
  gameMessage.style.visibility = "visible";
}

export const clear = () => {
  gameElement.innerHTML = "";
}

export const hideMessage = () => gameMessage.style.visibility = "hidden";

export const hideEnemies = () => enemies.forEach((e, i) => e.forEach((e) => (e.style.display = "none")));

export const hideShots = () => shots.forEach((e, i) => shots[i].style.display = "none");

export const hideEnemy = (i, j) => enemies[i][j].style.display = "none";

export const showEnemies = () => {enemies.forEach((e, i) => e.forEach((e) => (e.style.display = "block")));}

export const updateLevel = () => levelElement.textContent = level;

