import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.store = options.store
        this.subscribe = options.subscribe || []
        this.unsubscibers = []
        this.prepare()
    }

    toHTML() {
        return ''
    }

    prepare() {

    }

    storeChanges(changes) {}

    $notify(event, ...args) {
        this.emitter.notify(event, ...args)
    }

    $subscribe(event, callback) {
        const unsub = this.emitter.subscribe(event, callback)
        this.unsubscibers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    init() {
        this.initDomListener()
    }

    destroy() {
        this.removeDomListener()
        this.unsubscibers.forEach(unsub => unsub())
    }
}