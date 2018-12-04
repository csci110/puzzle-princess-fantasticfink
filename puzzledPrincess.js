//Part 4

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
        this.board.dataModel[row][col] = this.squareSymbol;
        //this.squareSymbol = this.name.substring(0,1);
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

class StrangerMarker extends Marker {
    constructor(board) {
        super(board, "strangerFace.png", "Stranger");
    }

    handleGameLoop() {
        if (this.inBoard) {
            return;
        }
        // Mark a random empty square.
        let row, col;
        do {
            row = Math.round(Math.random() * (this.board.size - 1));
            col = Math.round(Math.random() * (this.board.size - 1));
        } while (this.board.dataModel[row][col] !== this.board.emptySquareSymbol);
        this.board.dataModel[row][col] = this.squareSymbol;
        this.playInSquare(row, col);
        this.board.takeTurns();
    }
}


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
        if (this.gameIsWon()) {
            let message = '        Game Over.\n        ';
            if (this.activeMarker instanceof PrincessMarker) {
                message = message + 'The Princess wins.';
            }
            else if (this.activeMarker instanceof StrangerMarker) {
                message = message + 'The Stranger wins.';
            }
            game.end(message);
            return;
        }
        if (this.gameIsDrawn()) {
            game.end('        Game Over.\n        The game ends in a draw.');
            return;
        }

        //this.activeMarker = new PrincessMarker(this);
        if (!this.activeMarker) {
            if (Math.random() < .5)
                this.activeMarker = new PrincessMarker(this);
            else this.activeMarker = new StrangerMarker(this);
        }

        else if (this.activeMarker instanceof PrincessMarker) {
            // princess has moved; now it's stranger's turn
            this.activeMarker = new StrangerMarker(this);
        }
        else if (this.activeMarker instanceof StrangerMarker) {
            // stranger has moved; now it's princess's turn
            this.activeMarker = new PrincessMarker(this);
        }
    }
    
    gameIsDrawn(){
        if (this.dataModel[0][0] === this.emptySquareSymbol){
            return false;
        }
        
        if (this.dataModel[0][1] === this.emptySquareSymbol){
            return false;
        }
        
        if (this.dataModel[0][2] === this.emptySquareSymbol){
            return false;
        }
        
        if (this.dataModel[1][0] === this.emptySquareSymbol){
            return false;
        }
        
        if (this.dataModel[1][1] === this.emptySquareSymbol){
            return false;
        }
        
        if (this.dataModel[1][2] === this.emptySquareSymbol){
            return false;
        }
        
        if (this.dataModel[2][0] === this.emptySquareSymbol){
            return false;
        }
        
        if (this.dataModel[2][1] === this.emptySquareSymbol){
            return false;
        }
        
        if (this.dataModel[2][2] === this.emptySquareSymbol){
            return false;
        }
        
        return true;
    }

    debugBoard() {
        let moveCount = 0;
        let boardString = '\n';
        for (let row = 0; row < this.size; row = row + 1) {
            for (let col = 0; col < this.size; col = col + 1) {
                boardString = boardString + this.dataModel[row][col] + ' ';
                if (this.dataModel[row][col] !== this.emptySquareSymbol) {
                    moveCount++;
                }
            }
            boardString = boardString + '\n';
        }

        // Adding a turn counter
        console.log('The data model after ' + moveCount + ' move(s):' + boardString);
    }

    gameIsWon() {

        // Are there three of the same markers diagonally from upper left?
        if (this.dataModel[0][0] === this.dataModel[1][1] &&
            this.dataModel[1][1] === this.dataModel[2][2] &&
            this.dataModel[2][2] !== this.emptySquareSymbol) {
            return true;
        }

        //Are there three of the same markers diagonally from upper right?
        if (this.dataModel[0][2] === this.dataModel[1][1] &&
            this.dataModel[1][1] === this.dataModel[2][0] &&
            this.dataModel[2][0] !== this.emptySquareSymbol) {
            return true;
        }

        //Win horizontally in first row?
        if (this.dataModel[0][0] === this.dataModel[0][1] &&
            this.dataModel[0][1] === this.dataModel[0][2] &&
            this.dataModel[0][2] !== this.emptySquareSymbol) {
            return true;
        }

        //Win horizontally in second row?
        if (this.dataModel[1][0] === this.dataModel[1][1] &&
            this.dataModel[1][1] === this.dataModel[1][2] &&
            this.dataModel[1][2] !== this.emptySquareSymbol) {
            return true;
        }

        //Win horizontally in third row?
        if (this.dataModel[2][0] === this.dataModel[2][1] &&
            this.dataModel[2][1] === this.dataModel[2][2] &&
            this.dataModel[2][2] !== this.emptySquareSymbol) {
            return true;
        }

        //Win vertically in first column?
        if (this.dataModel[0][0] === this.dataModel[1][0] &&
            this.dataModel[1][0] === this.dataModel[2][0] &&
            this.dataModel[2][0] !== this.emptySquareSymbol) {
            return true;
        }

        //Win vertically in second column?
        if (this.dataModel[1][0] === this.dataModel[1][1] &&
            this.dataModel[1][1] === this.dataModel[1][2] &&
            this.dataModel[1][2] !== this.emptySquareSymbol) {
            return true;
        }

        //Win vertically in third column?
        if (this.dataModel[2][0] === this.dataModel[2][1] &&
            this.dataModel[2][1] === this.dataModel[2][2] &&
            this.dataModel[2][2] !== this.emptySquareSymbol) {
            return true;
        }

        return false;
    }
}

let theBoard = new TicTacToe();
theBoard.takeTurns();
