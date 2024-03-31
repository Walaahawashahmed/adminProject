import React from "react";
import cardImg from '../../../assets/prfle nav.jpg';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";
import'./recentAndCards.css';
import Card from '../Card/card';


export default function RecentReviews() {
  
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
          Recent Reviews
        </h1>
      </div>
      <div className="container">
        <div className="row">
         
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          
        </div>
      </div>
    </>
  );
}