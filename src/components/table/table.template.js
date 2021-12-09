const CODES = {
    A: 65,
    Z: 90
}

function createRow(info = '', data = '') {
    return `
        <div class="row">
            <div class="row-info">${info}</div>
            <div class="row-data">${data}</div>
        </div>
    `
}

function createCol(content) {
    return `
        <div class="column">${content}</div>
    `
}

function createCell(content) {
    return `
        <div class="cell" contenteditable>${content}</div>
    `
}

function getCols(colCount, start) {
    const cols = new Array(colCount)
        .fill('')
        .map((item, index) => {
            return String.fromCharCode(start + index)
        })
        .map(item => createCol(item))
        .join('')
    return cols
}

function getCells(colCount) {
    const cells = new Array(colCount)
        .fill('')
        .map(item => createCell(item))
        .join('')
    return cells
}

export function createTable(rowCount = 15) {
    const colCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = getCols(colCount, CODES.A)
    const cells = getCells(colCount)
    rows.push(createRow('', cols))
    for (let i = 1; i <= rowCount; i++) {
        rows.push(createRow(i, cells))
    }

    return rows.join('')
}