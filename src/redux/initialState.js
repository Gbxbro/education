import {storage} from '@core/utils'

const defaultState = {
    colState: {},
    rowState: {},
    currentText: '',
    dataState: {}
}

export const initialState = storage('excel_state') ? storage('excel_state') : defaultState

