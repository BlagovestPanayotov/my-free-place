export const runSnake = (canvas, ctx) => {
    // const ctx = canvas.getContext('2d');

    const fieldSize = 20;
    const width = canvas.width;
    const height = canvas.height;
    const hSize = fieldSize;
    const vSize = fieldSize;
    const gridSize = width / fieldSize;

    //start position
    let timer = null;
    const snake = {
        x: 10,
        y: 10
    };

    const tail = [];

    const apple = {};

    const direction = {
        x: 1,
        y: 0
    };

    const inputDirection = {
        x: 1,
        y: 0
    };

    let size = 3;

    start();

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 1) { break; }
                inputDirection.x = 0;
                inputDirection.y = -1;
                break;
            case 'ArrowDown':
                if (direction.y === -1) { break; }
                inputDirection.x = 0;
                inputDirection.y = 1;
                break;
            case 'ArrowLeft':
                if (direction.x === 1) { break; }
                inputDirection.x = -1;
                inputDirection.y = 0;
                break;
            case 'ArrowRight':
                if (direction.x === -1) { break; }
                inputDirection.x = 1;
                inputDirection.y = 0;
                break;
            default:
                break;
        }
    });




    function tick() {

        tail.push({  //logic for the tail of the snake
            x: snake.x,
            y: snake.y
        });

        while (tail.length > size) {
            tail.shift();
        }

        direction.x = inputDirection.x;
        direction.y = inputDirection.y;

        snake.x += direction.x;
        snake.y += direction.y;
        if (snake.y === -1) {// to come from the other side
            snake.y = vSize - 1;
        }
        if (snake.y === vSize) {
            snake.y = 0;
        }
        if (snake.x === -1) {
            snake.x = hSize - 1;
        }
        if (snake.x === hSize) {
            snake.x = 0;
        }

        for (let segment of tail) {
            if (segment.x === snake.x && segment.y === snake.y) {
                gameOver();
            }
        }

        if (snake.x === apple.x && snake.y === apple.y) {
            spawnApple();
            size++;
        }
    }

    function spawnApple() {
        apple.x = Math.floor(Math.random() * hSize);
        apple.y = Math.floor(Math.random() * vSize);

        for (let segment of tail) {
            if (segment.x === apple.x && segment.y === apple.y) {
                spawnApple();
            }
        }
    }

    function drawScene() {

        clear();
        drawGrid();
        for (let segment of tail) {     //draw tail
            rect(segment.x, segment.y, 'green');
        }
        rect(snake.x, snake.y, 'red');      //draw head

        rect(apple.x, apple.y, 'purple');   //draw food
    }

    function main() {
        tick();
        drawScene();
    }


    //Set grid and element
    function drawGrid() {
        ctx.strokeStyle = '#888';
        ctx.beginPath();

        for (let x = 1; x < hSize; x++) {
            ctx.moveTo(gridSize * x, 0);
            ctx.lineTo(gridSize * x, height);
        }

        for (let y = 1; y < vSize; y++) {
            ctx.moveTo(0, gridSize * y,);
            ctx.lineTo(width, gridSize * y,);
        }

        ctx.closePath();
        ctx.stroke();
    }

    function rect(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * gridSize + 2, y * gridSize + 2, gridSize - 4, gridSize - 4);

    }

    function gameOver() {
        const choice = window.confirm(`Game over!\nYour score: ${(size - 3) * 100}\nPlay again?`);

        if (choice) {
            start();
        }
        clearInterval(timer);
    }

    function start() {

        snake.x = 10;
        snake.y = 10;
        tail.length = 0;
        size = 3;
        direction.x = 1;
        direction.y = 0;
        spawnApple();

        timer = setInterval(main, 100);
    }



    function clear() {
        ctx.clearRect(0, 0, width, height);
    }

};
