import {Badge} from "../../badges/models/Badge";

export interface ViewProfileInfo {
    name: string;
    email: string;
    placeOfResidence: string;
    description: string;
    dateOfBirth: string;
    friend: boolean;
    isOwner: boolean;
    isAdmin: boolean;
    sentFriendRequest: boolean;
    image: string;
    badges: Badge[];
}

export const getEmptyProfile = (): ViewProfileInfo => {
    return {
        name: "",
        email: "",
        placeOfResidence: "",
        description: "",
        dateOfBirth: "",
        friend: false,
        isOwner: false,
        isAdmin: false,
        sentFriendRequest: false,
        image: "",
        badges: []
    };
};