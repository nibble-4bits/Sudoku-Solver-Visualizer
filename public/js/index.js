'use strict';

import { Sudoku } from './Sudoku.js';

let sudokuTblElement = document.getElementById('sudoku');
let btnClear = document.getElementById('btn-clear');
let btnSolve = document.getElementById('btn-solve');
let btnGenerate = document.getElementById('btn-generate');
let sudokuStatus = document.getElementById('sudoku-status');

let sudoku = new Sudoku(sudokuTblElement);
sudoku.renderSudoku();
sudoku.setEditable(true);

btnClear.addEventListener('click', evt => {
    sudoku.clear();
    sudoku.setEditable(true);
    sudokuStatus.textContent = '';
});

btnSolve.addEventListener('click', async evt => {
    sudoku.setEditable(false);
    if (await sudoku.solve()) {
        sudokuStatus.classList.add('text-success');
        sudokuStatus.textContent = 'Solved!';
    }
    else {
        sudokuStatus.classList.add('text-danger');
        sudokuStatus.textContent = 'Unsolvable!';
    }
});

btnGenerate.addEventListener('click', evt => {
    // TODO: Implement this event listener
});