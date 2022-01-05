import {Page} from '@core/Page'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {debounce, storage} from '@core/utils'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'

function storageName(param) {
    return `excel:${param}`
}

export class ExcelPage extends Page {
    getRoot() {
        const param = this.params ? this.params : Date.now().toString()
        const state = storage(storageName(param))
        const store = createStore(rootReducer, normalizeInitialState(state))
        const stateListener = debounce(state => {
            storage(storageName(param), state)
        }, 300)
        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        store.subscribe(stateListener)

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}