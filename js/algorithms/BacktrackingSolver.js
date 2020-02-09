'use strict';

import { utilFunctions } from '../util.js';

// Constants for the simulation speed, 
// each value represents the how much the solve function will sleep in milliseconds
const simulationSpeed = {
    SLOW: 100,
    AVERAGE: 40,
    FAST: 5,
    FASTEST: 0
};

class BacktrackingSolver {
    /**
     * @param {Array<Array<Number>} sudoku 
     * @param {Function} renderCellFunc 
     */
    constructor(sudoku, renderCellFunc) {
        this.sudoku = sudoku;
        this.emptySquares = [];
        this.simulationSpeed = simulationSpeed.FAST;
        this.renderCell = renderCellFunc; // helper function that changes the text content of a cell in the HTML

        this.findEmptySquares();
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
        for (let y = 0; y < this.sudoku.length; y++) {
            if (this.sudoku[row][y] === number) {
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
        for (let x = 0; x < this.sudoku.length; x++) {
            if (this.sudoku[x][col] === number) {
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
                if (this.sudoku[x][y] === number) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Finds all empty squares that need to be filled to solve the sudoku
     */
    findEmptySquares() {
        for (let row = 0; row < this.sudoku.length; row++) {
            for (let col = 0; col < this.sudoku[row].length; col++) {
                if (this.sudoku[row][col] === 0) {
                    this.emptySquares.push([row, col]);
                }
            }
        }
    }

    /**
     * Solves the sudoku puzzle by using backtracking
     * @param {*} currSqIdx The current index of the empty square trying to be filled
     * @returns {Boolean} True if the sudoku has at least 1 solution, false if unsolvable
     */
    async solve(currSqIdx = 0) {
        if (currSqIdx === this.emptySquares.length) {
            return true;
        }
        else {
            let row = this.emptySquares[currSqIdx][0];
            let col = this.emptySquares[currSqIdx][1];
            let cellPos = row * this.sudoku.length + col;

            for (let possibleNum = 1; possibleNum <= 9; possibleNum++) {
                if (this.isNumberValid(row, col, possibleNum)) {
                    this.sudoku[row][col] = possibleNum;

                    this.renderCell(`cell-${cellPos}`, possibleNum);
                    await utilFunctions.sleep(this.simulationSpeed);

                    if (await this.solve(currSqIdx + 1)) {
                        return true;
                    }

                    this.sudoku[row][col] = 0;
                    this.renderCell(`cell-${cellPos}`, '');
                }
            }
            return false;
        }
    }
}

export { BacktrackingSolver };


// async function solve(sudoku, emptySq, currSqIdx = 0) {
//     if (currSqIdx === emptySq.length) {
//         console.log(currSqIdx);
//     }
//     else {
//         let row = emptySq[currSqIdx][0];
//         let col = emptySq[currSqIdx][1];
//         for (let possibleNum = 1; possibleNum <= 9; possibleNum++) {
//             if (isNumberValid(sudoku, row, col, possibleNum)) {
//                 sudoku[row][col] = possibleNum;
//                 let cellPos = row * sudoku.length + col
//                 renderCell(`cell-${cellPos}`, possibleNum);
//                 await wait(10);
//                 solve(sudoku, emptySq, currSqIdx + 1);
//                 sudoku[row][col] = 0;
//                 renderCell(`cell-${cellPos}`, '');
//             }
//         }
//     }
// }