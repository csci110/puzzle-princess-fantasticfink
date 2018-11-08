

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

// Problem area
    playInSquare(row, col) {
        row = this.x / 3;
        col = this.y / 3;
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
        
        let row = Math.floor((this.x - game.x) / 150);
        //window.alert("The row number is " + row);
        let col = Math.floor((this.y - game.y) / 150);
        //window.alert("The row number is " + col);

//Problem area
        if (row > game.size || col > game.size) {
            this.x = this.startX;
            this.y = this.startY;
            return;
        }

        this.playInSquare(row, col);

//problem?
        this.takeTurns();
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
    
    takeTurns(){
        this.activeMarker = new PrincessMarker(this);
    }

}

let theBoard = new TicTacToe();
theBoard.takeTurns();
