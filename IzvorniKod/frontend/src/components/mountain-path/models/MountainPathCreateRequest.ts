export interface MountainPathCreateRequest {
    name: string,
    startPoint: string,
    endPoint: string,
    avgWalkTime: string,
    length: number | null,
    seaLevelDiff: number |null,
    isPrivate: boolean,
    hillId: number |null,
}