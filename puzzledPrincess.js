//Start at Computing the baord row and column

import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("floor.png");

class Marker extends Sprite {
    constructor(board, image, name) {
        super();
        this.board = board;
        this.name = name;
        this.setImage(image);
        this.x = this.startX = 150;
        this.y = this.startY = 275;
    }
}

class PrincessMarker extends Marker {
    constructor(board) {
        super(board, "annFace.png", "Princess Ann");
        this.dragging = false;
    }

    handleMouseLeftButtonDown() {
        this.dragging = true;
    }

    handleMouseLeftButtonUp() {
        this.dragging = false;
    }

    handleGameLoop() {
        if (this.dragging === true) {
            this.x = game.getMouseX() - this.width / 2;
            this.y = game.getMouseX() - this.height / 2;
        }
    }

}

class StrangerMarker extends Marker {}

class TicTacToe extends Sprite {
    constructor() {
        super();
        this.name = "Board";
        this.setImage("board.png");
        this.x = 300;
        this.y = 85;
        this.SquareSize = 150;
        this.size = 3;
        this.activeMarker; // variable exists, but value is undefined
    }

}


let theBoard = new TicTacToe();
theBoard.takeTurns();
