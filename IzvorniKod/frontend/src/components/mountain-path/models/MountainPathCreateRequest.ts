export interface MountainPathCreateRequest {
    name: string,
    startPoint: string,
    endPoint: string,
    avgWalkTime: string,
    length: number,
    seaLevelDiff: number,
    isPrivate: boolean,
    hillId: number,
}