import {storage} from '@core/utils'
import {defaultStyles} from '@/constants'

const defaultState = {
    colState: {},
    rowState: {},
    currentText: '',
    dataState: {},
    currentStyles: defaultStyles,
    stylesState: {},
    titleText: 'Новая таблица'
}

export const initialState = storage('excel_state') ? storage('excel_state') : defaultState

