const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function createRow(index = '', data = '', state) {
    const resize = index ?
        `<div class="row-resize" data-resize="row">
            <div class="line"></div>
        </div>` :
        ''
    return `
        <div
            class="row"
            data-type="resizable"
            data-row="${index}"
            style="height: ${state[index] + 'px' || DEFAULT_HEIGHT + 'px'}"
        >
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

function toCol(state) {
    return function(content, col) {
        return `
            <div 
                class="column"
                data-type="resizable"
                data-col="${col}"
                style="width: ${state[col] + 'px' || DEFAULT_WIDTH + 'px'}"
            >
                ${content}
                <div class="col-resize" data-resize="col">
                    <div class="line"></div>
                </div>
            </div>
        `
    }
}

function toCell(row, state) {
    return function(_, col) {
        return `
            <div class="cell"
                 contenteditable
                 data-col="${col}"
                 data-id="${row}:${col}"
                 style="width: ${state[col] + 'px' || DEFAULT_WIDTH + 'px'}"
            > 
            </div>
            `
    }
}

function getCols(colCount, state) {
    const cols = new Array(colCount)
        .fill('')
        .map(toChar)
        .map(toCol(state))
        .join('')
    return cols
}

function getCells(colCount, row, state) {
    const cells = new Array(colCount)
        .fill('')
        .map(toCell(row, state))
        .join('')
    return cells
}

export function createTable(rowCount = 15, state = {}) {
    const colCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = getCols(colCount, state.colState)
    rows.push(createRow('', cols, {}))

    for (let i = 0; i < rowCount; i++) {
        const cells = getCells(colCount, i, state.colState)
        rows.push(createRow(i + 1, cells, state.rowState))
    }

    return rows.join('')
}