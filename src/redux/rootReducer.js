import {APPLY_STYLES, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from '@/redux/types'
// import {toInlineStyles} from '@core/utils'

export function rootReducer(state, action) {
    let prevState
    let field
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: value(state, field, action)}
        case CHANGE_TEXT:
            field = 'dataState'
            return {...state, currentText: action.data.value, dataState: value(state, field, action)}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLES:
            field = 'stylesState'
            prevState = state[field] || {}
            action.data.ids.forEach(id => {
                prevState[id] = {...prevState[id], ...action.data.value}
            })
            return {
                ...state,
                [field]: prevState,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        case CHANGE_TITLE:
            return {...state, titleText: action.data}
        default: return state
    }
}

function value(state, field, action) {
    const prevState = state[field] || {}
    prevState[action.data.id] = action.data.value
    return prevState
}