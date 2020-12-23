import React, {useEffect, useState} from "react";
import {MountainLodgeResult} from "../../models/MountainLodgeResult";
import "./MountainLodgeSearchResult.css"

interface Props {
    result: MountainLodgeResult
}

export const MountainLodgeSearchResult = (prop: Props) => {

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [defImage] = useState(require('../../../../assets/default-ml2.jpg'));

    useEffect(() => {
        setLoading(true);
        const base64Data = prop.result.image;
        if(prop.result.image)
            fetch(`data:image/jpeg;base64,${base64Data}`).then(response => response.blob()).then(resolve => {setImage(URL.createObjectURL(resolve)); setLoading(false)});
        else setLoading(false)
    }, [setLoading, prop.result.image]);

    const utilpass = {
        1: require('../../../../assets/water.png'),
        2: require("../../../../assets/beds.png"),
        3: require("../../../../assets/wifi.png"),
        4: require("../../../../assets/restauran.png")
    } as any;

    return (
        <>
            {loading ? <div>Molimo pričekajte...</div> :
                <div className="mountain-lodge-cnt">
                    <div className="image-util-cnt">
                        <span className="mountain-lodge-name">{prop.result.name}</span>
                        {prop.result.image ? <img className="mountain-lodge-picture" alt={"Slika"} src={image}/>
                            : <img className="mountain-lodge-picture" alt={""} src={defImage}/>}
                        {prop.result.utilities && prop.result.utilities.length > 0 && <div className="mountain-lodge-utils">
                            {prop.result.utilities.map(v => <img alt={""} className="util-pic" src={utilpass[v.id]} key={v.id}/>)}
                        </div>
                        }
                    </div>
                    <div className="lodge-description-cnt">
                        <span className="mountain-lodge-elevation">Visina: {prop.result.elevation}m</span>
                        <span className="mountain-lodge-hill">Planina: {prop.result.hillName}</span>
                    </div>
                </div>}
        </>

    );
};