import {defaultStyles} from '@/constants'
import {clone} from '@core/utils'

const defaultState = {
    colState: {},
    rowState: {},
    currentText: '',
    dataState: {},
    currentStyles: defaultStyles,
    stylesState: {},
    titleText: 'Новая таблица',
    openedDate: new Date().toJSON()
}

function normalize(state) {
    return {
        ...state,
        currentText: '',
        currentStyles: defaultStyles
    }
}

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}