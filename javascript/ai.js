function Ai() {
    this.chooseDirection = function(){
        var futureDist = snake.futureDistanceFromFruit(fruit);

        var nextMove = snake.getMin(futureDist);
        return nextMove;
    };
}
