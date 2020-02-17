'use strict';

import { Sudoku } from './model/Sudoku.js';
import { SudokuSolver } from './SudokuSolver.js';

// Constants for the simulation speed, 
// each value represents the how much the solve function will sleep in milliseconds
const solvingSpeed = {
    SLOW: 80,
    AVERAGE: 35,
    FAST: 1,
    FASTEST: 0
};

class SudokuRenderer {
    constructor(sudokuHTMLElement) {
        this.sudokuHTMLElement = sudokuHTMLElement;
        this.sudoku = new Sudoku();
        this.solver = new SudokuSolver(this.sudoku, this.renderCell, solvingSpeed.FAST);
    }

    /**
     * Render the sudoku on the HTML view
     */
    renderSudoku() {
        while (this.sudokuHTMLElement.firstChild) {
            this.sudokuHTMLElement.removeChild(this.sudokuHTMLElement.firstChild);
        }

        for (let i = 0; i < this.sudoku.board.length; i++) {
            let sudokuRow = document.createElement('tr');
            for (let j = 0; j < this.sudoku.board.length; j++) {
                let sudokuCell = document.createElement('td');
                let num = this.sudoku.board[i][j];

                sudokuCell.id = `cell-${i}-${j}`;
                sudokuCell.addEventListener('keydown', evt => {
                    let [row, col] = evt.target.id.match(/\d/g).map(num => parseInt(num));
                    let input = parseInt(evt.key);

                    if (evt.target.textContent.length > 0 || !input) {
                        if (evt.keyCode === 8) {
                            evt.target.classList.remove('given-num');
                            evt.target.classList.add('discovered-num');
                            this.sudoku.board[row][col] = 0;
                        }
                        else {
                            evt.preventDefault();
                        }
                    }
                    else {
                        if (this.sudoku.isNumberValid(row, col, input)) {
                            evt.target.classList.remove('discovered-num');
                            evt.target.classList.add('given-num');
                            this.sudoku.board[row][col] = input;
                        }
                        else {
                            evt.preventDefault();
                        }
                    }
                });

                sudokuCell.addEventListener('focusin', evt => {
                    let [row, col] = evt.target.id.match(/\d/g).map(num => parseInt(num));
                    let rowStart = row - row % 3;
                    let rowEnd = rowStart + 3;
                    let colStart = col - col % 3;
                    let colEnd = colStart + 3;

                    for (let i = 0; i < this.sudoku.board[row].length; i++) {
                        let cellRow = document.getElementById(`cell-${row}-${i}`);
                        let cellCol = document.getElementById(`cell-${i}-${col}`);
                        cellRow.classList.add('focused-cell');
                        cellCol.classList.add('focused-cell');
                    }

                    for (let x = rowStart; x < rowEnd; x++) {
                        for (let y = colStart; y < colEnd; y++) {
                            let cellBox = document.getElementById(`cell-${x}-${y}`);
                            cellBox.classList.add('focused-cell');
                        }
                    }
                });

                sudokuCell.addEventListener('focusout', evt => {
                    let [row, col] = evt.target.id.match(/\d/g).map(num => parseInt(num));
                    let rowStart = row - row % 3;
                    let rowEnd = rowStart + 3;
                    let colStart = col - col % 3;
                    let colEnd = colStart + 3;

                    for (let i = 0; i < this.sudoku.board[row].length; i++) {
                        let cellRow = document.getElementById(`cell-${row}-${i}`);
                        let cellCol = document.getElementById(`cell-${i}-${col}`);
                        cellRow.classList.remove('focused-cell');
                        cellCol.classList.remove('focused-cell');
                    }

                    for (let x = rowStart; x < rowEnd; x++) {
                        for (let y = colStart; y < colEnd; y++) {
                            let cellBox = document.getElementById(`cell-${x}-${y}`);
                            cellBox.classList.remove('focused-cell');
                        }
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

    
    async renderSolve() {
        return await this.solver.solve();
    }

    /**
     * Re-renders the sudoku
     */
    clear() {
        this.sudoku.clear();
        this.renderSudoku();
    }

    /**
     * Makes the sudoku editable or uneditable by the user
     * @param {Boolean} editable If true the sudoku can be edited by the user, otherwise it can't be edited
     */
    setEditable(editable) {
        for (let i = 0; i < this.sudoku.board.length; i++) {
            for (let j = 0; j < this.sudoku.board.length; j++) {
                let currentCell = document.getElementById(`cell-${i}-${j}`);
                if (editable) {
                    currentCell.contentEditable = true;
                }
                else {
                    currentCell.contentEditable = false;
                }
            }
        }
    }
}

export { SudokuRenderer };