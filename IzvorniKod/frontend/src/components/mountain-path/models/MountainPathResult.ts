export interface MountainPathResult {
    id: number,
    name: string,
    difficulty: number,
    hill: string,
    startPoint: string,
    endPoint: string,
    length: number,
    dateCreated: Date,
    avgWalkTime: string,
    isPrivate: boolean,
    seaLevelDiff: number,
    averageGrade: number|null,
}
