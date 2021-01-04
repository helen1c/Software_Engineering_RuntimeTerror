import {Hill} from "./Hill";

export interface Path{
    id:number;
    name:string;
    startPoint:string;
    endPoint:string;
    hill : Hill;
    difficulty: number,
    avgWalkTime: string,
    isPrivate: boolean,
    seaLevelDiff: number,
    dateCreated: Date,
    length: number,
}