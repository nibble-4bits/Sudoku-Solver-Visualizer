'use strict';

import { BacktrackingSolver } from './algorithms/BacktrackingSolver.js';

let sudokuTbl = document.getElementById('sudoku');
const sampleSudoku = [
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
    let backtrackingSolver = new BacktrackingSolver(sampleSudoku, renderCell);

    renderSudoku(sampleSudoku);
    backtrackingSolver.solve();
}

main();