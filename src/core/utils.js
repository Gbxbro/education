export function capitalize(str) {
    if (typeof str !== 'string') {
        return ''
    } else {
        return str[0].toUpperCase() + str.slice(1)
    }
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((item, index) => start + index)
}