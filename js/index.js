'use strict';

import { SudokuRenderer } from './SudokuRenderer.js';
import { SudokuSolver } from './SudokuSolver.js';

const sudokuTblElement = document.getElementById('sudoku');
const sldSolvingSpeed = document.getElementById('sld-solving-speed');
const btnClear = document.getElementById('btn-clear');
const btnSolve = document.getElementById('btn-solve');
const btnGenerate = document.getElementById('btn-generate');
const sudokuStatus = document.getElementById('sudoku-status');

const sudokuRenderer = new SudokuRenderer(sudokuTblElement);
sudokuRenderer.renderSudoku();
sudokuRenderer.setEditable(true);

sldSolvingSpeed.addEventListener('change', evt => {
    const sliderValue = parseInt(evt.target.value);

    switch (sliderValue) {
        case 0:
            sudokuRenderer.solver.setSolvingSpeed(SudokuSolver.solvingSpeed.SLOW);
            break;
        case 1:
            sudokuRenderer.solver.setSolvingSpeed(SudokuSolver.solvingSpeed.AVERAGE);
            break;
        case 2:
            sudokuRenderer.solver.setSolvingSpeed(SudokuSolver.solvingSpeed.FAST);
            break;
        case 3:
            sudokuRenderer.solver.setSolvingSpeed(SudokuSolver.solvingSpeed.FASTEST);
            break;
    }
});

btnClear.addEventListener('click', evt => {
    sudokuRenderer.clear();
    sudokuRenderer.setEditable(true);
    sudokuStatus.textContent = '';
});

btnSolve.addEventListener('click', async evt => {
    sudokuRenderer.setEditable(false);
    sudokuStatus.textContent = '';
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