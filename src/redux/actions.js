import {TABLE_RESIZE} from '@/redux/types'

// action creator
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}