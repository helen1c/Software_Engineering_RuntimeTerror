import React, { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { UserInfo } from "../mountain-lodge/models/UserInfo";


export const MountaineeringCommunitySearch = () => {

    const [users, setUsers] = useState<UserInfo[]>([]);

    return (
        <div>
            <SearchBar dataFunction={setUsers} />
            {!users.length ? (
                <div className="text-3xl mt-12">Ne postoji niti jedan korisnik koji odgovara zadanom parametru.</div>
            ) : (
                //<UserInfo[] user={users} />

                <p>Ima korisnika</p>
            )}
        </div>
    );
};
