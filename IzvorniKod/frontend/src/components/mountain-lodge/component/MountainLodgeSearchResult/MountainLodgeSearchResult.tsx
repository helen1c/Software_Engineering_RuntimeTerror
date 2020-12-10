import React, {useEffect, useState} from "react";
import {MountainLodgeResult} from "../../models/MountainLodgeResult";
import "./MountainLodgeSearchResults.css"

interface Props {
    result: MountainLodgeResult
}

export const MountainLodgeSearchResult = (prop: Props) => {

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
       const base64Data = prop.result.image;
       if(prop.result.image)
       fetch(`data:image/jpeg;base64,${base64Data}`).then(response => response.blob()).then(resolve => {setImage(URL.createObjectURL(resolve)); setLoading(false)});
       else setLoading(false)
    }, [setLoading, prop.result.image]);


    return (
      <>
        {loading ? <div>Molimo pričekajte...</div> :
        <div className="mountain-lodge-cnt">
            <span>Naziv planinarskog doma: {prop.result.name}</span>
            <span>Nadmorska visina planinarskog doma: {prop.result.elevation}</span>
            <span>Visočje: {prop.result.hillName}</span>
            {prop.result.image && <img src={image}/>}


            <div className={"utils"}>Pogodnosti:
                {prop.result.utilities.map(v => <span key={v.id}>{v.name}</span>)}
            </div>
        </div>}
      </>

    );
};