function Snake(){

    const speed = scale * (1);
    this.x = 0;
    this.y = 0;
    this.xSpeed = speed;
    this.ySpeed = 0;
    this.size = 0;
    this.tail = [];

    const DIRECTIONS = {
        'Up': {x: 0, y: -(speed), opposite:'Down'},
        'Down': {x: 0, y: (speed), opposite:'Up'},
        'Left': {x: -(speed), y: 0, opposite:'Right'},
        'Right': {x: (speed), y: 0, opposite:'Left'},
    };
    this.currentDirection = 'Right';

    this.draw = function() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.x, this.y, scale, scale);

        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillStyle = this.nexColor(i);
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
    }

    var colorPalette = [
        "#54cdc6",
        "#299690",
        "#a2fef9",
        "#578683",
        "#728584",
        "#00e0d5"
    ];
    this.nexColor = function(a) {
        return colorPalette[a%colorPalette.length];
    }

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.size - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y < 0) this.y = canvas.height;
    }

    this.changeDirection = function(direction) {
        switch (direction) {
            case 0:
                direction = 'Right';
                break;
            case 1:
                direction = 'Left';
                break;
            case 2:
                direction = 'Up';
                break;
            case 3:
                direction = 'Down';
                break;
        }

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
}
