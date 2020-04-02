'use strict';

class Sudoku {
    constructor() {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }

    /**
     * Clears the board
     */
    clear() {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }

    /**
     * Checks if a number can be placed in the square specified by (row, col)
     * @param {Number} row Row index to be checked
     * @param {Number} col Column index to be checked
     * @param {Number} number Number to test if it is possible to place
     * @returns {Boolean} True if the number can be placed, false otherwise
     */
    isNumberValid(row, col, number) {
        return this.isNumberValidRow(row, number) &&
            this.isNumberValidCol(col, number) &&
            this.isNumberValidBox(row, col, number);
    }

    /**
     * Checks if a number can be placed in the row specified
     * @param {Number} row Row index to be checked
     * @param {Number} number Number to test if it is possible to place
     * @returns {Boolean} True if the number can be placed, false otherwise
     */
    isNumberValidRow(row, number) {
        for (let y = 0; y < this.board.length; y++) {
            if (this.board[row][y] === number) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if a number can be placed in the column specified
     * @param {*} col Column index to be checked
     * @param {*} number Number to test if it is possible to place
     * @returns {Boolean} True if the number can be placed, false otherwise
     */
    isNumberValidCol(col, number) {
        for (let x = 0; x < this.board.length; x++) {
            if (this.board[x][col] === number) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if number can be placed in the box that contains the square specified by (row, col)
     * @param {Number} row Row index to be checked
     * @param {Number} col Column index to be checked
     * @param {Number} number Number to test if it is possible to place
     * @returns {Boolean} True if the number can be placed, false otherwise
     */
    isNumberValidBox(row, col, number) {
        let rowStart = row - row % 3;
        let rowEnd = rowStart + 3;
        let colStart = col - col % 3;
        let colEnd = colStart + 3;

        for (let x = rowStart; x < rowEnd; x++) {
            for (let y = colStart; y < colEnd; y++) {
                if (this.board[x][y] === number) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Finds the next empty cell
     * @returns {Array<Number>|null} A pair of coordinates if an empty cell was found, null otherwise
     */
    findNextEmpty() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return null;
    }
}

export { Sudoku };