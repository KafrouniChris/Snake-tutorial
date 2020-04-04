const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();


    window.setInterval(() => {
        var direction = Math.floor(Math.random()*4);
        console.log(direction);
        snake.changeDirection(direction);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }
    }, 250);
}());

/*
window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}))
*/
