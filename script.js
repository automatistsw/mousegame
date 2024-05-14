const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    player.style.left = x + 'px';
    player.style.top = y + 'px';
});

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.width = '10px';
    enemy.style.height = '10px';
    enemy.style.backgroundColor = 'red';
    enemy.style.position = 'absolute';
    enemy.style.borderRadius = '50%';

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    enemy.style.left = x + 'px';
    enemy.style.top = y + 'px';

    gameArea.appendChild(enemy);

    moveEnemy(enemy);
}

function moveEnemy(enemy) {
    const speed = 2 + Math.random() * 3; // 적의 속도

    function move() {
        const playerRect = player.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();

        const dx = playerRect.x - enemyRect.x;
        const dy = playerRect.y - enemyRect.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const moveX = (dx / distance) * speed;
        const moveY = (dy / distance) * speed;

        enemy.style.left = enemyRect.x + moveX + 'px';
        enemy.style.top = enemyRect.y + moveY + 'px';

        if (checkCollision(playerRect, enemyRect)) {
            alert('Game Over!');
            window.location.reload();
        }

        requestAnimationFrame(move);
    }

    move();
}

function checkCollision(rect1, rect2) {
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}

// 일정 시간마다 새로운 적 생성
setInterval(createEnemy, 200);
