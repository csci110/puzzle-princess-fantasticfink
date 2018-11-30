// Adding a turn counter

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
        this.inBoard = false;
    }

    playInSquare(row, col) {

        // Centering
        this.x = this.board.x + col * this.board.SquareSize + this.board.SquareSize / 2 - this.width / 2;
        this.y = this.board.y + row * this.board.SquareSize + this.board.SquareSize / 2 - this.height / 2;

        // Updating Board Array
        this.squareSymbol = this.name.substring(0,1);
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
        if (this.inBoard) {
            return;
        }

        this.dragging = true;
    }

    handleMouseLeftButtonUp() {
        if (this.inBoard) {
            return;
        }

        this.dragging = false;

        let col = Math.floor((this.x - this.board.x) / this.board.SquareSize);

        let row = Math.floor((this.y - this.board.y) / this.board.SquareSize);
        //console.log(this.x, this.y, this.board.SquareSize);
        //window.alert(col);
        //window.alert(row);

        if (row < 0 || row >= this.board.size || col < 0 ||
            col >= this.board.size ||
            this.board.dataModel[row][col] !==
            this.board.emptySquareSymbol) {
            this.x = this.startX;
            this.y = this.startY;
            return;
        }

        this.playInSquare(row, col);


        this.board.takeTurns();
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
        this.emptySquareSymbol = "-";

        // this.board.size?
        this.dataModel = [];
        for (let row = 0; row < this.size; row = row + 1) {
            this.dataModel[row] = [];
            for (let col = 0; col < this.size; col = col + 1) {
                this.dataModel[row][col] = this.emptySquareSymbol;
            }
        }
    }

    takeTurns() {
        this.activeMarker = new PrincessMarker(this);
    }

    debugBoard() {
        let moveCount = 0;
        let boardString = '\n';
        for (let row = 0; row < this.size; row = row + 1) {
            for (let col = 0; col < this.size; col = col + 1) {
                boardString = boardString + this.dataModel[row][col] + ' ';
                if (this.dataModel[row][col] != this.emptySquareSymbol) {
                    moveCount = moveCount + 1;
                }
            }
            boardString = boardString + '\n';
        }

        // Adding a turn counter
        console.log('The data model after ' + moveCount + ' move(s):' + boardString);
    }

}

let theBoard = new TicTacToe();
theBoard.takeTurns();
