import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/Dom'
import * as actions from '@/redux/actions'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    toHTML() {
        return `
            <input 
                type="text"
                class="input"
                data-type="title-input"
                value="${this.store.getState().titleText}"
            />
            
            <div>

                <div class="button" data-button="remove">
                  <i class="material-icons" data-button="remove">delete</i>
                </div>
        
                <div class="button" data-button="exit">
                  <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>

            </div>
        `
    }

    onClick(event) {
        const $target = $(event.target)

        if ($target.data.button === 'remove') {
            localStorage.removeItem(`excel:${ActiveRoute.param}`)
            ActiveRoute.navigate('')
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }

    onInput(event) {
        const $target = $(event.target)
        if ($target.data.type === 'title-input') {
            this.$dispatch(actions.changeTitle($target.text))
        }
    }
}