import React, {useState} from "react";
import {UserInfo} from "../mountain-lodge/models/UserInfo";
import {Search} from "./Search";
import {Usersresults} from "./UsersResults";

export const SearchUsers = () => {
    const [users,setUsers] = useState<UserInfo[]>([]);
    const [loading, setLoading] = useState(true);

    return(
        <div className="community-container">
            <h1>Pretraga korisnika</h1>
            <Search dataFunction={setUsers} stateFunction={setLoading} />
            {!users.length && !loading ? (
                <div className="community-info">
                    Ne postoji niti jedan korisnik koji odgovara pretrazi.
                </div>
            ) : (
                <Usersresults users={users} />
            )}
        </div>
    );

}