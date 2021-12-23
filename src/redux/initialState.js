import {storage} from '@core/utils'

const defaultState = {
    colState: {},
    rowState: {}
}

export const initialState = storage('excel_state') ? storage('excel_state') : defaultState

