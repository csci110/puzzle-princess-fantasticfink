//Updating the board array

import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("floor.png");

class Marker extends Sprite {
    constructor(board, image, name) {
        super();
        this.board = board;
        this.name = name;
        this.squareSymbol = this.name.substring(0, 1);
        this.setImage(image);
        this.x = this.startX = 150;
        this.y = this.startY = 275;
    }

    // Centering
    playInSquare(row, col) {
        this.x = this.board.x + row * this.board.squareSize + this.board.squareSize / 2 - this.width / 2;
        this.y = this.board.y + col * this.board.squareSize + this.board.squareSize / 2 - this.height / 2;
        this.squareSymbol = this.dataModel[row][col];
        this.board.debugBoard();
        this.inBoard = true;
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

        let row = Math.floor((this.x - this.board.x) / this.board.squareSize);
        // window.alert("The row number is " + row);
        let col = Math.floor((this.y - this.board.y) / this.board.squareSize);
        // window.alert("The col number is " + col);

        if (row >= this.board.size || col >= this.board.size) {
            this.x = this.startX;
            this.y = this.startY;
            return;
        }

        this.playInSquare(row, col);

        
        this.takeTurns();
    }

    handleGameLoop() {
        if (this.dragging) {
            this.x = game.getMouseX() - this.width / 2;
            this.y = game.getMouseY() - this.height / 2;
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

        this.dataModel = [];
        for (let row = 0; row < this.size; row = row + 1) {
            this.dataModel[row] = [];
            for (let col = 0; col < this.boardSize; col = col + 1) {
                this.dataModel[row][col] = this.emptySquareSymbol;
            }
        }
    }

    takeTurns() {
        this.activeMarker = new PrincessMarker(this);
    }

    //this.emptySquareSymbol === "-";

// this.board.size?
    debugBoard() {
        let boardString = '\n';
        for (let row = 0; row < this.size; row = row + 1) {
            for (let col = 0; col < this.size; col = col + 1) {
                boardString = boardString + this.dataModel[row][col] + ' ';
            }
            boardString = boardString + '\n';
        }
        console.log('The current state of the board is ' + boardString);
    }

}

let theBoard = new TicTacToe();
theBoard.takeTurns();
