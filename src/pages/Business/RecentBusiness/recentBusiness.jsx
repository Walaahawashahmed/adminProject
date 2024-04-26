import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'animate.css';
import { getLocalStorage } from "../../../Services/LocalStorage";
import'./recentAndCards.css';
import Card from '../Card/card';
import axios from "axios";

export default function RecentBusiness() {
  const [data , setData]= useState([])
  const userToken = getLocalStorage("userToken");
 async function getAllBusiness(){
    await axios.get('http://localhost:3011/admin/getallbusinesses',
    { headers: { Authorization: `Bearer ${userToken}` } })
    .then((res)=>
    {console.log(res)
      setData(res.data.businesses)})
    .catch((error)=>{console.log(error)})
  }

  useEffect(() => {
    getAllBusiness();
  }, []);
  return (
    <>
      <div>
        <div className="header-recent-views d-flex flex-wrap justify-content-between ">
          <h2 className="text-white fw-bold">
            Hello <span>Walaa</span>{" "}
          </h2>
          <div className="input-search">
            <label htmlFor="searchInput" className="me-2">
              <i class="fa-solid fa-magnifying-glass"></i>
            </label>
            <input type="text" id="searchInput" placeholder="Search" />
          </div>
        </div>
        <h1 className="fw-bolder text-white text-center mt-5">
          Recent Business
        </h1>
      </div>
      <div className="container">
        <div className="row">
         
         {data.map((business)=>( <Card data={business}  getAllBusinesses={ getAllBusiness}/>))}
          
          
        </div>
      </div>
    </>
  );
}
