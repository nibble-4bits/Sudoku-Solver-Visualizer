'use strict';

import { SudokuRenderer } from './SudokuRenderer.js';
import { solvingSpeed } from './SudokuSolver.js';
import { SudokuGenerator } from './SudokuGenerator.js';

// Import custom stylesheets
import '../css/index.css';
import '../css/layout.css';

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
            sudokuRenderer.solver.setSolvingSpeed(solvingSpeed.SLOW);
            break;
        case 1:
            sudokuRenderer.solver.setSolvingSpeed(solvingSpeed.AVERAGE);
            break;
        case 2:
            sudokuRenderer.solver.setSolvingSpeed(solvingSpeed.FAST);
            break;
        case 3:
            sudokuRenderer.solver.setSolvingSpeed(solvingSpeed.FASTEST);
            break;
    }
});

btnClear.addEventListener('click', evt => {
    sudokuRenderer.clear();
    sudokuRenderer.setEditable(true);
    sudokuStatus.textContent = '';
    btnSolve.disabled = false;
});

btnSolve.addEventListener('click', async evt => {
    sudokuRenderer.setEditable(false);
    sudokuStatus.textContent = '';
    sudokuStatus.classList.value = '';
    evt.target.disabled = true;
    if (await sudokuRenderer.renderSolve()) {
        if (!sudokuRenderer.solver.wasCanceled) {
            sudokuStatus.classList.add('status-success');
            sudokuStatus.textContent = 'Solved!';
        }
    }
    else {
        sudokuStatus.classList.add('status-failed');
        sudokuStatus.textContent = 'Unsolvable!';
    }
    evt.target.disabled = false;
});

btnGenerate.addEventListener('click', evt => {
    const sudokuGenerator = new SudokuGenerator();
    sudokuRenderer.setSudoku(sudokuGenerator.generateSudoku());
    sudokuRenderer.renderSudoku();
    sudokuStatus.textContent = '';
});