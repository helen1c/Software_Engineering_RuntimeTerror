import {combineReducers} from "redux";
import findAllHillsReducer from "./reducers/findAllHillsReducer";
import findAllUtilitiesReducer from "./reducers/findAllUtilitiesReducer";

export const mainReducer = combineReducers(
    {
        findAllUtilitiesReducer, findAllHillsReducer
    }
);

export type MainReducer = ReturnType<typeof mainReducer>;