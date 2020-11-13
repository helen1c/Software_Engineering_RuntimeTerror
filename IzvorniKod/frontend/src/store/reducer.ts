import {combineReducers} from "redux";
import findAllHillsReducer from "./reducers/findAllHillsReducer";

export const mainReducer = combineReducers(
    {
        findAllHillsReducer
    }
);

export type MainReducer = ReturnType<typeof mainReducer>;