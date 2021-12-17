const CODES = {
    A: 65,
    Z: 90
}

function createRow(index = '', data = '') {
    const resize = index ?
        `<div class="row-resize" data-resize="row">
            <div class="line"></div>
        </div>` :
        ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info" >
                ${index}
                ${resize}
            </div>
            <div class="row-data">${data}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function toCol(content, col) {
    return `
        <div class="column" data-type="resizable" data-col="${col}">
            ${content}
            <div class="col-resize" data-resize="col">
                <div class="line"></div>
            </div>
        </div>
    `
}

function toCell(row) {
    return function(_, col) {
        return `
            <div class="cell"
                 contenteditable
                 data-col="${col}"
                 data-id="${row}:${col}"> 
            </div>
            `
    }
}

function getCols(colCount) {
    const cols = new Array(colCount)
        .fill('')
        .map(toChar)
        .map(toCol)
        .join('')
    return cols
}

function getCells(colCount, row) {
    const cells = new Array(colCount)
        .fill('')
        .map(toCell(row))
        .join('')
    return cells
}

export function createTable(rowCount = 15) {
    const colCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = getCols(colCount)
    rows.push(createRow('', cols))

    for (let i = 0; i < rowCount; i++) {
        const cells = getCells(colCount, i)
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}