import React from "react";
import {MyMountainPathResult} from "../../models/MyMountainPathResult";

interface Props {
    result: MyMountainPathResult
}

export const MyMountainPath = ({result}: Props) => {

    return (
        <div className="my-path__cnt">
            <span>{result.name}</span>
            <span>{result.startPoint}</span>
            <span>{result.endPoint}</span>
            <span>{result.length}</span>
            <span>{result.difficulty}</span>
            <span>{result.isPrivate}</span>
        </div>
    );

}