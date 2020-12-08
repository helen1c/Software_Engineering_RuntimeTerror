import {combineReducers} from "redux";
import findAllHillsReducer from "./reducers/findAllHillsReducer";
import findAllUtilitiesReducer from "./reducers/findAllUtilitiesReducer";
import getProfileReducer from "./reducers/getProfileReducer";

export const mainReducer = combineReducers(
    {
        findAllUtilitiesReducer, findAllHillsReducer
        findAllHillsReducer,
        getPrincipalUserProfileReducer: getProfileReducer
    }
);

export type MainReducer = ReturnType<typeof mainReducer>;