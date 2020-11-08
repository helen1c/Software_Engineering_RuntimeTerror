import React, {useState} from "react";
import 'semantic-ui-css/semantic.min.css'
import {Input, Dropdown} from "semantic-ui-react";
import './MountainLodgeSearch.css'

export const MountainLodgeSearch = () => {

    const [hill, setHill] = useState();
    const [searchText, setSearchText] = useState();

    const options = [
        {key: 1, text: 'Medvednica', value: 1},
        {key: 2, text: 'Sljeme', value: 2},
        {key: 3, text: 'Velebit', value: 3}

    ]

    const handleChange = (event : any, data : any) => {
        setHill(data.value);
    }

    const handleSearchChange = (e : any) => setSearchText(e.target.value);
    const ispis = () => {
        console.log(searchText);
    }

    return (
        <>


            <input className={"input-search"} placeholder={"Pretražite planinarske domove..."} name={"search-text"} id={"search-text"}/>
            <select className={"input-select"} placeholder={"Odaberite područje"} onChange={handleSearchChange} name={"hill-select"} id={"hill-select"}>

                <option value={1}>Medvednica</option>
                <option value={2}>Opatija</option>
                <option value={3}>Sljeme</option>
            </select>
            <button onClick={ispis}>sadads</button>
            </>
        );

}