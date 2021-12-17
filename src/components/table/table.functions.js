import {range} from '@core/utils'

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.id
}

export function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)
    const rows = range(current.row, target.row)
    const cols = range(current.col, target.col)

    return rows.reduce((total, row) => {
        cols.forEach(col => total.push(`${row}:${col}`))
        return total
    }, [])
}