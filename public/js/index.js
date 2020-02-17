'use strict';

import { SudokuRenderer } from './SudokuRenderer.js';

let sudokuTblElement = document.getElementById('sudoku');
let btnClear = document.getElementById('btn-clear');
let btnSolve = document.getElementById('btn-solve');
let btnGenerate = document.getElementById('btn-generate');
let sudokuStatus = document.getElementById('sudoku-status');

let sudokuRenderer = new SudokuRenderer(sudokuTblElement);
sudokuRenderer.renderSudoku();
sudokuRenderer.setEditable(true);

btnClear.addEventListener('click', evt => {
    sudokuRenderer.clear();
    sudokuRenderer.setEditable(true);
    sudokuStatus.textContent = '';
});

btnSolve.addEventListener('click', async evt => {
    sudokuRenderer.setEditable(false);
    sudokuStatus.classList.value = '';
    if (await sudokuRenderer.renderSolve()) {
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