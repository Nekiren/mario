const game = document.getElementById("game");
const player = document.getElementById("player");

let playerX = 50; // Posição inicial do jogador
let playerY = 100;
let playerVelocityY = 0; // Velocidade vertical (para o pulo)
const gravity = 1.5; // Gravidade
const jumpStrength = -20; // Força do pulo
let isJumping = false;

// Inimigos e obstáculos
const enemies = [];
const obstacles = [];

// Adiciona inimigos
function addEnemy(x, y) {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.left = `${x}px`;
    enemy.style.bottom = `${y}px`;
    game.appendChild(enemy);
    enemies.push({ element: enemy, x, y, direction: 1 }); // 1 = direita, -1 = esquerda
}

// Adiciona obstáculos
function addObstacle(x, y) {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = `${x}px`;
    obstacle.style.bottom = `${y}px`;
    game.appendChild(obstacle);
    obstacles.push({ element: obstacle, x, y });
}

// Adiciona inimigos e obstáculos na fase
addEnemy(300, 100);
addEnemy(600, 100);
addObstacle(400, 100);
addObstacle(700, 100);

// Movimentação do jogador
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        playerX -= 10; // Move para a esquerda
    } else if (event.key === "ArrowRight") {
        playerX += 10; // Move para a direita
    } else if (event.key === " " && !isJumping) { // Barra de espaço para pular
        playerVelocityY = jumpStrength;
        isJumping = true;
    }
    player.style.left = `${playerX}px`;
});

// Atualiza a posição do jogador
function updatePlayer() {
    playerVelocityY += gravity; // Aplica a gravidade
    playerY += playerVelocityY;

    // Verifica colisão com o chão
    if (playerY >= 100) {
        playerY = 100;
        playerVelocityY = 0;
        isJumping = false;
    }

    player.style.bottom = `${playerY}px`;
}

// Movimentação dos inimigos
function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.x += 2 * enemy.direction; // Move o inimigo
        if (enemy.x > 800 || enemy.x < 0) {
            enemy.direction *= -1; // Inverte a direção ao atingir os limites
        }
        enemy.element.style.left = `${enemy.x}px`;
    });
}

// Verifica colisões
function checkCollisions() {
    // Colisão com inimigos
    enemies.forEach(enemy => {
        if (
            playerX < enemy.x + 40 &&
            playerX + 40 > enemy.x &&
            playerY < enemy.y + 40 &&
            playerY + 40 > enemy.y
        ) {
            alert("Você perdeu! Reiniciando...");
            resetGame();
        }
    });

    // Colisão com obstáculos
    obstacles.forEach(obstacle => {
        if (
            playerX < obstacle.x + 40 &&
            playerX + 40 > obstacle.x &&
            playerY < obstacle.y + 40 &&
            playerY + 40 > obstacle.y
        ) {
            alert("Você bateu em um obstáculo! Reiniciando...");
            resetGame();
        }
    });

    // Chegou na linha de chegada?
    if (playerX >= 790) {
        alert("Parabéns! Você venceu!");
        resetGame();
    }
}

// Reinicia o jogo
function resetGame() {
    playerX = 50;
    playerY = 100;
    playerVelocityY = 0;
    player.style.left = `${playerX}px`;
    player.style.bottom = `${playerY}px`;
}

// Loop do jogo
function gameLoop() {
    updatePlayer();
    updateEnemies();
    checkCollisions();
    requestAnimationFrame(gameLoop);
}

// Inicia o jogo
gameLoop();
