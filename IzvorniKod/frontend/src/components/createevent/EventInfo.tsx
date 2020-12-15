export interface EventInfo {
    during: number

}

export const getEmptyEventInfo = (): EventInfo => {
    return {
        during: 0
    };
};
