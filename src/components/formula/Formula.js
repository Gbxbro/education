import {ExcelComponent} from '@core/ExcelComponent';
import {isInput} from '@/components/formula/formula.functions'
import {$} from '@core/Dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    storeChanges(changes) {
        this.$formula.text = changes.currentText
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false" data-type="input"></div>
        `
    }

    init() {
        super.init()
        this.$formula = this.$root.find('[data-type="input"]')
        this.$subscribe('Selection cell', $cell => {
            this.$formula.text = $cell.text
        })
    }

    onInput(event) {
        if (isInput(event)) {
            const $target = $(event.target)
            this.$notify('formula:edit', $target.text)
        }
    }

    onKeydown(event) {
        const {key} = event

        if (key === 'Enter') {
            event.preventDefault()
            this.$notify('formula:done')
        }
    }
}