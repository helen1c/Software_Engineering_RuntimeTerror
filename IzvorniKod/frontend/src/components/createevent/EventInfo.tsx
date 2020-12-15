export interface EventInfo {
    event: number

}

export const getEmptyEventInfo = (): EventInfo => {
    return {
        event: 0
    };
};
