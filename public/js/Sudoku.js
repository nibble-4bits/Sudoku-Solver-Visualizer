'use strict';

import { utilFunctions } from './util.js';

// Constants for the simulation speed, 
// each value represents the how much the solve function will sleep in milliseconds
const simulationSpeed = {
    SLOW: 80,
    AVERAGE: 35,
    FAST: 1,
    FASTEST: 0
};

class Sudoku {
    constructor(sudokuHTMLElement) {
        this.sudoku = [
            [0, 2, 0, 0, 0, 0, 0, 0, 7],
            [4, 0, 0, 0, 0, 5, 0, 8, 0],
            [0, 3, 0, 0, 9, 0, 0, 0, 0],
            [5, 0, 0, 0, 0, 8, 0, 7, 4],
            [0, 0, 4, 2, 0, 0, 1, 0, 0],
            [0, 6, 0, 0, 0, 9, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 0, 0, 0],
            [7, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 3, 8, 0, 6, 0, 0]
        ];
        this.sudokuHTMLElement = sudokuHTMLElement;
        this.simulationSpeed = simulationSpeed.FAST;
    }

    /**
     * Render the sudoku on the HTML view
     */
    renderSudoku() {
        while (this.sudokuHTMLElement.firstChild) {
            this.sudokuHTMLElement.removeChild(this.sudokuHTMLElement.firstChild);
        }

        for (let i = 0; i < this.sudoku.length; i++) {
            let sudokuRow = document.createElement('tr');
            for (let j = 0; j < this.sudoku[i].length; j++) {
                let sudokuCell = document.createElement('td');
                let num = this.sudoku[i][j];

                sudokuCell.id = `cell-${i * this.sudoku.length + j}`;
                sudokuCell.contentEditable = true;
                sudokuCell.addEventListener('keydown', evt => {
                    let cellPos = parseInt(evt.target.id.match(/\d+/)[0]);
                    let row = Math.floor(cellPos / 9);
                    let col = cellPos % 9;
                    let input = parseInt(evt.key);

                    if (evt.target.textContent.length > 0 && evt.keyCode !== 8) {
                        evt.preventDefault();
                    }

                    if (this.isNumberValid(row, col, input)) {
                        evt.target.classList.remove('discovered-num');
                        evt.target.classList.add('given-num');
                        this.sudoku[row][col] = input || 0;
                    }
                    else {
                        evt.preventDefault();
                    }
                });

                if (num !== 0) {
                    sudokuCell.textContent = num;
                    sudokuCell.classList.add('given-num');
                }
                else {
                    sudokuCell.classList.add('discovered-num');
                }

                if (i === 2 || i === 5) {
                    sudokuCell.classList.add('box-boundary-row');
                }
                if (j === 2 || j === 5) {
                    sudokuCell.classList.add('box-boundary-col');
                }

                sudokuRow.appendChild(sudokuCell);
            }
            this.sudokuHTMLElement.appendChild(sudokuRow);
        }
    }

    /**
     * Change the text content of the cell specified by cellId 
     * @param {String} cellId The HTML id of the cell whose text context will be changed
     * @param {String|Number} value The new text/value for the cell
     */
    renderCell(cellId, value) {
        let cell = document.getElementById(cellId);
        cell.textContent = value;
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

    findNextEmpty() {
        for (let i = 0; i < this.sudoku.length; i++) {
            for (let j = 0; j < this.sudoku[i].length; j++) {
                if (this.sudoku[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return null;
    }

    /**
     * Solves the sudoku puzzle by using backtracking
     * @returns {Boolean} True if the sudoku has at least 1 solution, false if unsolvable
     */
    async solve() {
        let empty = this.findNextEmpty();
        if (!empty) {
            return true;
        }
        else {
            let [row, col] = empty;
            let cellPos = row * this.sudoku.length + col;

            for (let possibleNum = 1; possibleNum <= 9; possibleNum++) {
                if (this.isNumberValid(row, col, possibleNum)) {
                    this.sudoku[row][col] = possibleNum;

                    this.renderCell(`cell-${cellPos}`, possibleNum);
                    await utilFunctions.sleep(this.simulationSpeed);

                    if (await this.solve()) {
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

export { Sudoku };