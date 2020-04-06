function Fruit() {

    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * ROWS - 1) + 1) * SCALE;
        this.y = (Math.floor(Math.random() * COLUMNS - 1) + 1) * SCALE;
    }

    this.draw = function() {
        CTX.fillStyle = "#dd2f2f";
        CTX.fillRect(this.x, this.y, SCALE, SCALE);
    }

}
