import React, {useEffect, useState} from "react";
import {EventResult} from "../models/EventResult";
import {Event} from "./Event";
import {Paths} from "../models/Paths";
import {Day} from "./Day";



export const EventSearchResult = () =>{

    const [searchResults, setSearchResults] = useState<EventResult[]>([]);

    useEffect(() => {
        async function find() {
            const requestOptions = {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    authorization: sessionStorage.getItem("key") || "",
                    "Content-Type": "application/json"
                }
            };
            const response = await fetch("/api/event/all", requestOptions);
            const json = await response.json();
            setSearchResults(json);
        }
        find()
    }, [])

    return(
        <div>
            {/*{searchResults.map(searchResults => searchResults.user.image )}*/}
            {searchResults.map(result => <Event result={result}/>)}
        </div>
    );
}