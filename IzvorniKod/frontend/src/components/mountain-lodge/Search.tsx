import React, {useState} from "react";
import {InputLabel, TextField} from "@material-ui/core";
import './MountainLodgeSearch.css'
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";


export const Search = () => {

    const [age, setAge] = useState(0);
    const handleChange = (event: any) => {
        console.log(1);
    }


    return (
        <div className="search-container">
            <TextField name="search_text"  placeholder="Pretražite planinarske domove" className="search-field"  type="search" variant="outlined" />

            <InputLabel id="demo-simple-select-outlined-label">Podrucje</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="Age"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Medvedgrad</MenuItem>
                <MenuItem value={20}>Dinara</MenuItem>
                <MenuItem value={30}>Velebit</MenuItem>
            </Select>

            <InputLabel id="demo-simple-select-outlined-label">Infrakstruktura</InputLabel>

            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="Age"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Voda</MenuItem>
                <MenuItem value={20}>Hrana</MenuItem>
                <MenuItem value={30}>Spavanje</MenuItem>
            </Select>
        </div>
    );

}
