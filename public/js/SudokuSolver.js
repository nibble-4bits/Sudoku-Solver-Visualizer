'use strict';

import { utilFunctions } from './util.js';

class SudokuSolver {
    constructor(sudoku, renderCellFunc, solvingSpeed) {
        this.sudoku = sudoku;
        this.renderCell = renderCellFunc;
        this.solvingSpeed = solvingSpeed;
    }

    /**
     * Finds the next empty cell
     * @returns {Array<Number>|null} A pair of coordinates if an empty cell was found, null otherwise
     */
    findNextEmpty() {
        for (let i = 0; i < this.sudoku.board.length; i++) {
            for (let j = 0; j < this.sudoku.board.length; j++) {
                if (this.sudoku.board[i][j] === 0) {
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

            for (let possibleNum = 1; possibleNum <= 9; possibleNum++) {
                if (this.sudoku.isNumberValid(row, col, possibleNum)) {
                    this.sudoku.board[row][col] = possibleNum;

                    this.renderCell(`cell-${row}-${col}`, possibleNum);
                    await utilFunctions.sleep(this.solvingSpeed);

                    if (await this.solve()) {
                        return true;
                    }

                    this.sudoku.board[row][col] = 0;
                    this.renderCell(`cell-${row}-${col}`, '');
                }
            }
            return false;
        }
    }
}

export { SudokuSolver };