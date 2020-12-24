import React, {useEffect, useState} from "react";
import {MountainLodgeCreateRequest} from "../mountain-lodge/models/MountainLodgeCreateRequest";
import {HillOption} from "../mountain-lodge/models/HillOption";
import {MessageFindResult} from "./models/MessageFindResult";
import {useDispatch} from "react-redux";
import {findHills} from "../../store/actions/findAllHillsActions";

export default function MessageBox() {

    // useEffect(async () => {
    //     const requestOptions = {
    //         method: "GET",
    //         body: JSON.stringify(""),
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     };
    //     const response = await fetch("/api/messages/all", requestOptions);
    //     const data = response.json();
    //     console.log(data);
    //
    // });
    const dispatcher = useDispatch();
    const [result,setResult] = useState([]);
    const getAllMessages = async (): Promise<MessageFindResult[]> => {
        let result = await fetch("/api/messages/all");
        return result.json();
    }


    const find = async () => {


        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                authorization: sessionStorage.getItem("key") || "",
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("/api/messages/all", requestOptions);
        console.log(response.json());
    }

    return(
        <div>
            <button onClick={find}>fdgkjdg</button>

        </div>
    );
}