const MODE = 'AI'; // 'AI' || 'HUMAN'
var HIGHSCORE = 0;


const CANVAS = document.querySelector(".canvas");
const CTX = CANVAS.getContext("2d");
const SCALE = 10;
const SPEED = SCALE * (1);

const ROWS = CANVAS.height / SCALE;
const COLUMNS = CANVAS.width / SCALE;
const GAME = {
    distance: dist => Math.sqrt(Math.pow(dist.x, 2) + Math.pow(dist.y, 2)),
    distanceFromTarget: (src, target) =>  ({
        x: (target.x - src.x),
        y: (target.y - src.y),
    }),
};


(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    ai = new Ai();
    fruit.pickLocation();


    window.setInterval(() => {
        if (MODE === 'AI'){
            var direction = ai.chooseDirection();
            snake.changeDirection(direction);
        }


        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            var score = +document.getElementById("score").innerHTML;
            document.getElementById("score").innerHTML = score + 1 ;
            fruit.pickLocation();
        }
    }, 50);
}());


window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}))
