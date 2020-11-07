import React, {useState} from "react";
import './MountainLodgeSearch.css'
import {Search} from "./Search";
import Footer from "../Footer"
import Header from "../Header"

export const MountainLodgeSearch = () => {

    return (



       <div >
           <Header/>
          <h1 className="title">PRETRAZI PLANINARSKE DOMOVE</h1>
             <Search/>

           <Footer />
       </div>

    );

};