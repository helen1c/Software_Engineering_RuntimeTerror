import React, {useState} from "react";
import 'semantic-ui-css/semantic.min.css'
import './MountainLodgeSearch.css'

export const MountainLodgeSearch = () => {


    const [searchText, setSearchText] = useState();

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