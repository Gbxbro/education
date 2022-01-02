import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

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
            style="height: ${getHeight(state, index)}"
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

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function toCol(state) {
    return function(content, col) {
        return `
            <div 
                class="column"
                data-type="resizable"
                data-col="${col}"
                style="width: ${getWidth(state, col)}"
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
        const id = `${row}:${col}`
        const data = state.dataState[id]
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })
        return `
            <div class="cell"
                 contenteditable
                 data-col="${col}"
                 data-id="${id}"
                 data-value="${data || ''}"
                 style="width: ${getWidth(state.colState, col)}; ${styles}"
            >${parse(data) || ''}</div>`
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
        const cells = getCells(colCount, i, state)
        rows.push(createRow(i + 1, cells, state.rowState))
    }

    return rows.join('')
}