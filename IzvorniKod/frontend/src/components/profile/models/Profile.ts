export interface Profile {
    name: string;
    email: string;
    placeOfResidence: string;
    description: string;
    dateOfBirth: string;
    image: string
}

export const getEmptyProfile = (): Profile => {
    return {
        name: "",
        email: "",
        placeOfResidence: "",
        description: "",
        dateOfBirth: "",
        image: ""
    };
};