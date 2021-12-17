export class Emitter {
    constructor(listeners) {
        this.observers = {}
    }

    subscribe(event, callback) {
        this.observers[event] = this.observers[event] || []
        this.observers[event].push(callback)
        return () => {
            this.observers[event] = this.observers[event]
                .filter(listener => listener !== callback)
        }
    }

    notify(event, ...args) {
        if (!Array.isArray(this.observers[event])) {
            return false
        }
        this.observers[event].forEach(fn => {
            fn(...args)
        })
    }
}