import {MountainLodgeUserArchive} from "../../components/mountain-lodge/models/MountainLodgeUserArchive";
import {
    FIND_ALL_ARCHIVED_LODGES,
    FIND_ALL_ARCHIVED_LODGES_ERROR,
    FIND_ALL_ARCHIVED_LODGES_SUCCESS,
    findAllArchivedLodgesActionTypes
} from "../actions/findAllArchivedLodgesActionTypes";


export interface State {
    lodges: MountainLodgeUserArchive[],
    error: string | undefined,
    status: string
}

const initialState = {
    lodges: [],
    error: undefined,
    status: "idle"
} as State;

export default (state: State = initialState, action: findAllArchivedLodgesActionTypes) => {

    switch (action.type) {
        case FIND_ALL_ARCHIVED_LODGES: return {...state, status: 'waiting'};
        case FIND_ALL_ARCHIVED_LODGES_SUCCESS: return {...state, status: 'success', lodges: action.payload};
        case FIND_ALL_ARCHIVED_LODGES_ERROR: return {...state, status: 'error', error: action.payload}
        default: return state;
    }

};