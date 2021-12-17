import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscibers = []
        this.prepare()
    }

    toHTML() {
        return ''
    }

    prepare() {

    }

    $notify(event, ...args) {
        this.emitter.notify(event, ...args)
    }

    $subscribe(event, callback) {
        const unsub = this.emitter.subscribe(event, callback)
        this.unsubscibers.push(unsub)
    }

    init() {
        this.initDomListener()
    }

    destroy() {
        this.removeDomListener()
        this.unsubscibers.forEach(unsub => unsub())
    }
}