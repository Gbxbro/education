import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/Dom'
import * as actions from '@/redux/actions'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            subscribe: ['titleText'],
            ...options
        })
    }

    // storeChanges(changes) {
    //     console.log(changes)
    //     this.title = changes.titleText
    // }

    toHTML() {
        return `
            <input 
                type="text"
                class="input"
                data-type="title-input"
                value="${this.store.getState().titleText}"
            />
            
            <div>

                <div class="button">
                  <i class="material-icons">delete</i>
                </div>
        
                <div class="button">
                  <i class="material-icons">exit_to_app</i>
                </div>

            </div>
        `
    }

    onInput(event) {
        const $target = $(event.target)
        if ($target.data.type === 'title-input') {
            this.$dispatch(actions.changeTitle($target.text))
        }
    }
}