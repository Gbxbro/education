class Dom {
    constructor(selector) {
        this.$el = typeof (selector) === 'string' ?
            document.querySelector(selector) :
            selector
    }

    get data() {
        return this.$el.dataset
    }

    html(html) {
        if (typeof (html) === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    closest(selector) {
        return this.$el.closest(selector)
    }

    getCoord() {
        return this.$el.getBoundingClientRect()
    }

    getComputedStyle(style) {
        const element = window.getComputedStyle(this.$el)
        return element.getPropertyValue(style)
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }

    find(selector) {
        return this.$el.querySelector(selector)
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, className = '') => {
    const el = document.createElement(tagName)
    if (className) {
        el.classList.add(className)
    }

    return $(el)
}