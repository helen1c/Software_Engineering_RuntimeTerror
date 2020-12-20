import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { UserInfo } from "../mountain-lodge/models/UserInfo";
import { ShowUsers } from "./ShowUsers";
import "./MountaineeringCommunitySearch.css";

export const MountaineeringCommunitySearch = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);

  return (
    <div className="community-container">
      <SearchBar dataFunction={setUsers} />
      {!users.length ? (
        <div className="community-info">
          Ne postoji niti jedan korisnik koji odgovara pretrazi.
        </div>
      ) : (
        <ShowUsers users={users} />
      )}
    </div>
  );
};
