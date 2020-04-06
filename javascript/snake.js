function Snake(){

    this.x = 0;
    this.y = 0;
    this.xSpeed = SPEED;
    this.ySpeed = 0;
    this.size = 0;
    this.tail = [];

    const DIRECTIONS = {
        'Up': {x: 0, y: -(SPEED), opposite:'Down'},
        'Down': {x: 0, y: (SPEED), opposite:'Up'},
        'Left': {x: -(SPEED), y: 0, opposite:'Right'},
        'Right': {x: (SPEED), y: 0, opposite:'Left'},
    };
    this.currentDirection = 'Right';

    this.draw = function() {
        CTX.fillStyle = "#ffffff";
        CTX.fillRect(this.x, this.y, SCALE, SCALE);
        CTX.fillStyle = "#40756d";
        for (let i = 0; i < this.tail.length; i++) {
            CTX.fillRect(this.tail[i].x, this.tail[i].y, SCALE, SCALE);
        }
    }

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
            if (this.tail[i].x == this.x && this.tail[i].y == this.y) {
                this.tail = []; this.size = 0;
                var score = +document.getElementById("score").innerHTML;
                document.getElementById("score").innerHTML = 0 ;

                if (score > HIGHSCORE) {
                    HIGHSCORE = score;
                    document.getElementById("highScore").innerHTML = HIGHSCORE;
                }
            }
        }

        this.tail[this.size - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x > CANVAS.width) this.x = 0;
        if (this.y > CANVAS.height) this.y = 0;
        if (this.x < 0) this.x = CANVAS.width;
        if (this.y < 0) this.y = CANVAS.height;



    }

    this.changeDirection = function(direction) {

        if (
            direction === DIRECTIONS[this.currentDirection].opposite &&
            this.size > 0
        ) return;

        this.currentDirection = direction;
        this.xSpeed = DIRECTIONS[direction].x;
        this.ySpeed = DIRECTIONS[direction].y;
    }

    this.eat = function(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.size++;
            return true;
        }
        return false;
    }

    this.distanceFromFruit = function(fruit) {
        dist = GAME.distanceFromTarget(this, fruit);
        return GAME.distance(dist);
    }

    this.futureDistanceFromFruit = function(fruit){
        var dist = {
            'Left':{x: (fruit.x - (this.x-SPEED)), y: (fruit.y - this.y)},
            'Right':{x: (fruit.x - (this.x+SPEED)), y: (fruit.y - this.y)},
            'Up':{x: (fruit.x - (this.x)), y: (fruit.y - (this.y-SPEED))},
            'Down':{x: (fruit.x - (this.x)), y: (fruit.y - (this.y+SPEED))},
        }
        return {
            'Left': GAME.distance(dist.Left),
            'Right': GAME.distance(dist.Right),
            'Up': GAME.distance(dist.Up),
            'Down': GAME.distance(dist.Down),
        };
    }
    this.getMin = function(dist){
        var min = 'Left';
        if (dist.Right < dist[min]) min = 'Right';
        if (dist.Up < dist[min]) min = 'Up';
        if (dist.Down < dist[min]) min = 'Down';

        return min;
    };
}
