'use strict';

import { BacktrackingSolver } from './algorithms/BacktrackingSolver.js';

let sudokuTbl = document.getElementById('sudoku');
let btnClear = document.getElementById('btn-clear');
let btnSolve = document.getElementById('btn-solve');
let btnGenerate = document.getElementById('btn-generate');
let sampleSudoku = [
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

function renderSudoku(sudoku) {
    while (sudokuTbl.firstChild) {
        sudokuTbl.removeChild(sudokuTbl.firstChild);
    }

    for (let i = 0; i < sudoku.length; i++) {
        let sudokuRow = document.createElement('tr');
        for (let j = 0; j < sudoku[i].length; j++) {
            let sudokuCell = document.createElement('td');
            let num = sudoku[i][j];

            sudokuCell.id = `cell-${i * sudoku.length + j}`;
            if (num !== 0) {
                sudokuCell.textContent = num;
                sudokuCell.classList.add('given-num')
            }
            else {
                sudokuCell.classList.add('discovered-num')
            }

            if (i === 2 || i === 5) {
                sudokuCell.classList.add('box-boundary-row')
            }
            if (j === 2 || j === 5) {
                sudokuCell.classList.add('box-boundary-col')
            }

            sudokuRow.appendChild(sudokuCell);
        }
        sudokuTbl.appendChild(sudokuRow);
    }
}

function renderCell(cellId, value) {
    let cell = document.getElementById(cellId);
    cell.textContent = value;
}

function main() {
    renderSudoku(sampleSudoku);

    btnSolve.addEventListener('click', evt => {
        let backtrackingSolver = new BacktrackingSolver(sampleSudoku, renderCell);
        backtrackingSolver.solve();
    });

    btnClear.addEventListener('click', evt => {
        sampleSudoku = [
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
        renderSudoku(sampleSudoku);
    });
}

main();