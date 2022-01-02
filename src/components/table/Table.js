import {$} from '@core/Dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, matrix, shouldResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {defaultStyles} from '@/constants'
import * as actions from '@/redux/actions'
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'dblclick', 'input'],
            ...options
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        this.selectCell(this.$root.find('[data-id="0:0"]'))
        this.$subscribe('formula:edit', text => {
            this.selection.current
                .attr('data-value', text)
                .text = parse(text)
            this.updateTextInStore(text)
        })
        this.$subscribe('formula:done', () => {
            this.selection.current.focus()
        })
        this.$subscribe('toolbar:applyStyle', value => {
            this.selection.applyStyles(value)
            this.$dispatch(actions.applyStyles({
                ids: this.selection.getId(),
                value
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$notify('Selection cell', this.selection.current)
        this.$dispatch(actions.changeStyles($cell.getStyles(Object.keys(defaultStyles))))
    }

    toHTML() {
        return createTable(20, this.store.getState())
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(event)
            await this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Table resize error', e.message())
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)

            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown'
        ]
        const {key} = event

        if (keys.includes(key)) {
            event.preventDefault()
            const id = nextSelector(key, this.selection.current.id(true))
            this.selectCell(this.$root.find(`[data-id="${id}"]`))
        }
    }

    onDblclick() {
        this.selection.current.css({'caretColor': 'black'})
    }

    onInput(event) {
        this.selection.current.css({'caretColor': 'black'})
        this.updateTextInStore(this.selection.current.text)
    }

    updateTextInStore(text) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value: text
        }))
    }
}

function nextSelector(key, {row, col}) {
    const MIN_VALUE = 0
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
            break
    }
    return `${row}:${col}`
}