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
        console.log(hill + " " + searchText);
    }

    return (
        <>
            <Input className={"search-input"} icon='search' placeholder='Search...' onChange={handleSearchChange} />
            <Dropdown className={"search-select"}  onChange={handleChange} onClick={e => console.log()} clearable selection options={options} placeholder={"Odaberite područje..."}/>
            <button onClick={ispis}>Button</button>

            </>
        );

}