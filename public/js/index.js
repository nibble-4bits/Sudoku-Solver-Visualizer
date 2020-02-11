'use strict';

import { Sudoku } from './Sudoku.js';

let sudokuTblElement = document.getElementById('sudoku');
let btnClear = document.getElementById('btn-clear');
let btnSolve = document.getElementById('btn-solve');
let btnGenerate = document.getElementById('btn-generate');

let sudoku = new Sudoku(sudokuTblElement);
sudoku.renderSudoku();

btnSolve.addEventListener('click', async (evt) => {
    if (await sudoku.solve()) {
        alert('SOLVED!')
    }
    else {
        alert('UNSOLVABLE')
    }
});

btnClear.addEventListener('click', evt => {

});