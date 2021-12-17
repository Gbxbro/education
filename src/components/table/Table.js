import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, matrix, shouldResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/Dom'

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

        const $cell = this.$root.find('[data-id="0:0"]')

        this.selection.select($cell)
        this.$notify('table:input', this.selection.current.text)
        this.$subscribe('formula:edit', text => {
            this.selection.current.text = text
        })
        this.$subscribe('formula:done', () => {
            this.selection.current.focus()
        })
    }

    toHTML() {
        return createTable(20)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(event)
        } else if (isCell(event)) {
            const $target = $(event.target)

            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
                this.$notify('table:input', this.selection.current.text)
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
            this.selection.select(this.$root.find(`[data-id="${id}"]`))
            this.$notify('table:input', this.selection.current.text)
        }
    }

    onDblclick() {
        this.selection.current.css({'caretColor': 'black'})
    }

    onInput(event) {
        this.selection.current.css({'caretColor': 'black'})
        this.$notify('table:input', this.selection.current.text)
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