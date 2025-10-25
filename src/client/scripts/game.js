const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const countdownElement = document.getElementById("countdown");
const patternSelect = document.getElementById("pattern-select");
const difficultySlider = document.getElementById("difficulty-slider");
const playerHealthElement = document.getElementById("player-health");
const playerScoreElement = document.getElementById("player-score");
const eventLog = document.getElementById("event-log");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
const PLAYER_RADIUS = 20;
const PROJECTILE_RADIUS = 12;
const PROJECTILE_COOLDOWN = 900;

const patterns = {
  ahri: {
    name: "Ahri",
    description: "Curved orb projectile that returns to its origin point.",
    spawnProjectiles(player, difficulty) {
      const speed = 3 + difficulty * 0.5;
      return [createCurvedProjectile(player, speed)];
    },
  },
  ezreal: {
    name: "Ezreal",
    description: "Rapid linear skillshot from random edges of the arena.",
    spawnProjectiles(player, difficulty) {
      const count = Math.min(1 + Math.floor(difficulty / 2), 3);
      const speed = 4 + difficulty * 0.8;
      return Array.from({ length: count }, () => createLinearProjectile(player, speed));
    },
  },
  lux: {
    name: "Lux",
    description: "Charged laser warning with telegraphed strike zone.",
    spawnProjectiles(player, difficulty) {
      const speed = 2 + difficulty * 0.4;
      return [createLaserProjectile(player, speed)];
    },
  },
};

const state = {
  player: { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2, health: 3, score: 0 },
  projectiles: [],
  keys: new Set(),
  running: false,
  paused: false,
  lastSpawn: 0,
  countdown: 3,
};

function createLinearProjectile(target, speed) {
  const edge = Math.floor(Math.random() * 4);
  const spawnPoints = [
    { x: Math.random() * GAME_WIDTH, y: -PROJECTILE_RADIUS },
    { x: GAME_WIDTH + PROJECTILE_RADIUS, y: Math.random() * GAME_HEIGHT },
    { x: Math.random() * GAME_WIDTH, y: GAME_HEIGHT + PROJECTILE_RADIUS },
    { x: -PROJECTILE_RADIUS, y: Math.random() * GAME_HEIGHT },
  ];
  const spawn = spawnPoints[edge];
  const angle = Math.atan2(target.y - spawn.y, target.x - spawn.x);
  return {
    x: spawn.x,
    y: spawn.y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    type: "linear",
  };
}

function createCurvedProjectile(target, speed) {
  const spawn = { x: Math.random() * GAME_WIDTH, y: GAME_HEIGHT + PROJECTILE_RADIUS };
  const control = { x: GAME_WIDTH / 2, y: Math.random() * GAME_HEIGHT * 0.5 };
  const end = target;
  let t = 0;
  return {
    x: spawn.x,
    y: spawn.y,
    update(dt) {
      t += dt * 0.001 * speed;
      if (t >= 1) {
        t = 1;
      }
      const { x, y } = quadraticBezier(spawn, control, end, t);
      this.x = x;
      this.y = y;
      return t >= 1;
    },
    type: "curved",
  };
}

function createLaserProjectile(target, speed) {
  const origin = { x: Math.random() * GAME_WIDTH, y: Math.random() * GAME_HEIGHT };
  const duration = 2200 - speed * 300;
  let time = 0;
  return {
    x: origin.x,
    y: origin.y,
    telegraphTime: duration * 0.6,
    duration,
    active: false,
    update(dt) {
      time += dt;
      if (!this.active && time >= this.telegraphTime) {
        this.active = true;
      }
      return time >= this.duration;
    },
    type: "laser",
  };
}

function quadraticBezier(p0, p1, p2, t) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  return {
    x: uu * p0.x + 2 * u * t * p1.x + tt * p2.x,
    y: uu * p0.y + 2 * u * t * p1.y + tt * p2.y,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function resetState() {
  state.player = { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2, health: 3, score: 0 };
  state.projectiles = [];
  state.running = false;
  state.paused = false;
  state.lastSpawn = 0;
  state.countdown = 3;
  updateUi();
  clearLog();
  logEvent("Ready for a new run.");
}

function logEvent(message) {
  const timestamp = new Date().toLocaleTimeString();
  const entry = document.createElement("li");
  entry.textContent = `[${timestamp}] ${message}`;
  eventLog.prepend(entry);
  while (eventLog.children.length > 25) {
    eventLog.removeChild(eventLog.lastChild);
  }
}

function clearLog() {
  eventLog.innerHTML = "";
}

function updateUi() {
  playerHealthElement.innerHTML = `<strong>Health:</strong> ${state.player.health}`;
  playerScoreElement.innerHTML = `<strong>Score:</strong> ${state.player.score}`;

  pauseButton.disabled = !state.running;
  resetButton.disabled = !state.running && state.player.score === 0;
  startButton.disabled = state.running && !state.paused;
}

function draw(dt) {
  context.fillStyle = "#090f20";
  context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  state.projectiles.forEach((projectile) => {
    if (projectile.type === "laser") {
      drawLaser(projectile, dt);
    } else {
      const expired = projectile.update ? projectile.update(dt) : false;
      if (!projectile.update) {
        projectile.x += projectile.vx;
        projectile.y += projectile.vy;
      }
      drawProjectile(projectile);
      projectile.expired =
        expired ||
        projectile.x < -100 ||
        projectile.x > GAME_WIDTH + 100 ||
        projectile.y < -100 ||
        projectile.y > GAME_HEIGHT + 100;
    }
  });

  drawPlayer();
}

function drawPlayer() {
  context.beginPath();
  context.arc(state.player.x, state.player.y, PLAYER_RADIUS, 0, Math.PI * 2);
  context.fillStyle = "#15c0f5";
  context.fill();
  context.lineWidth = 4;
  context.strokeStyle = "rgba(10, 25, 50, 0.8)";
  context.stroke();
}

function drawProjectile(projectile) {
  context.beginPath();
  context.arc(projectile.x, projectile.y, PROJECTILE_RADIUS, 0, Math.PI * 2);
  context.fillStyle = "rgba(255, 102, 186, 0.9)";
  context.fill();
  context.strokeStyle = "rgba(255, 255, 255, 0.35)";
  context.lineWidth = 3;
  context.stroke();
}

function drawLaser(projectile, dt) {
  projectile.update(dt);
  context.save();
  context.globalAlpha = projectile.active ? 0.9 : 0.3;
  context.fillStyle = projectile.active ? "rgba(255, 245, 170, 0.8)" : "rgba(255, 245, 170, 0.2)";
  context.fillRect(projectile.x - 140, projectile.y - 12, 280, 24);
  context.restore();
  projectile.expired = projectile.update(0);
}

function updatePlayer(dt) {
  const speed = 0.35 * (1 + parseInt(difficultySlider.value, 10) * 0.15);
  let dx = 0;
  let dy = 0;
  if (state.keys.has("ArrowUp") || state.keys.has("w")) dy -= 1;
  if (state.keys.has("ArrowDown") || state.keys.has("s")) dy += 1;
  if (state.keys.has("ArrowLeft") || state.keys.has("a")) dx -= 1;
  if (state.keys.has("ArrowRight") || state.keys.has("d")) dx += 1;

  const length = Math.hypot(dx, dy) || 1;
  state.player.x = clamp(state.player.x + (dx / length) * speed * dt, PLAYER_RADIUS, GAME_WIDTH - PLAYER_RADIUS);
  state.player.y = clamp(state.player.y + (dy / length) * speed * dt, PLAYER_RADIUS, GAME_HEIGHT - PLAYER_RADIUS);
}

function handleCollisions() {
  state.projectiles.forEach((projectile) => {
    if (projectile.type === "laser") {
      if (projectile.active && Math.abs(projectile.y - state.player.y) < 40) {
        registerHit();
        projectile.expired = true;
      }
      return;
    }

    const distance = Math.hypot(projectile.x - state.player.x, projectile.y - state.player.y);
    if (distance < PLAYER_RADIUS + PROJECTILE_RADIUS) {
      registerHit();
      projectile.expired = true;
    }
  });
}

function spawnProjectiles(timestamp) {
  if (timestamp - state.lastSpawn < PROJECTILE_COOLDOWN) {
    return;
  }

  const pattern = patterns[patternSelect.value];
  const newProjectiles = pattern.spawnProjectiles(state.player, parseInt(difficultySlider.value, 10));
  state.projectiles.push(...newProjectiles);
  state.lastSpawn = timestamp;
}

function registerHit() {
  state.player.health -= 1;
  logEvent("Hit! You lost a life.");
  if (state.player.health <= 0) {
    state.running = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = false;
    logEvent("Defeat! Try again.");
  }
  updateUi();
}

function cleanupProjectiles() {
  state.projectiles = state.projectiles.filter((projectile) => !projectile.expired);
}

let previousTimestamp = 0;
function gameLoop(timestamp) {
  if (!state.running) {
    return;
  }

  const dt = timestamp - previousTimestamp;
  previousTimestamp = timestamp;

  if (!state.paused) {
    spawnProjectiles(timestamp);
    updatePlayer(dt);
    draw(dt);
    handleCollisions();
    cleanupProjectiles();
    state.player.score += Math.floor(dt / 16);
    updateUi();
  }

  window.requestAnimationFrame(gameLoop);
}

function beginCountdown() {
  countdownElement.classList.remove("countdown--hidden");
  countdownElement.textContent = state.countdown;

  const timer = setInterval(() => {
    state.countdown -= 1;
    if (state.countdown === 0) {
      countdownElement.textContent = "GO!";
      clearInterval(timer);
      setTimeout(() => {
        countdownElement.classList.add("countdown--hidden");
        countdownElement.textContent = "3";
        state.running = true;
        previousTimestamp = performance.now();
        window.requestAnimationFrame(gameLoop);
        logEvent("Dodge run started.");
      }, 450);
      return;
    }
    countdownElement.textContent = state.countdown;
  }, 750);
}

startButton.addEventListener("click", () => {
  if (state.running) {
    state.paused = false;
    logEvent("Resuming dodge run.");
    window.requestAnimationFrame(gameLoop);
    updateUi();
    return;
  }

  resetState();
  beginCountdown();
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
});

pauseButton.addEventListener("click", () => {
  if (!state.running) {
    return;
  }
  state.paused = !state.paused;
  pauseButton.textContent = state.paused ? "Resume" : "Pause";
  logEvent(state.paused ? "Paused." : "Resumed.");
  if (!state.paused) {
    previousTimestamp = performance.now();
    window.requestAnimationFrame(gameLoop);
  }
});

resetButton.addEventListener("click", () => {
  resetState();
  countdownElement.classList.add("countdown--hidden");
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
});

document.addEventListener("keydown", (event) => {
  state.keys.add(event.key);
});

document.addEventListener("keyup", (event) => {
  state.keys.delete(event.key);
});

resetState();
