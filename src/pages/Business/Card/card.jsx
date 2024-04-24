import React, { useEffect, useState } from "react";
import cardImg from '../../../assets/prfle nav.jpg';
import "bootstrap/dist/css/bootstrap.min.css";
import 'animate.css';
import Swal from 'sweetalert2'
import "./card.css"


export default function Card() {
    let [deletePopUp,setdeletePopUp] = useState(false)
    
    let delOpenClose = ()=>{
      setdeletePopUp(!deletePopUp)
    }
    function confirmDelete(){
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });

    }
    
    useEffect(() => {
      function handleClickOutside(event) {
        if (event.target.closest(".del-icon-card") === null) {
          setdeletePopUp(false);
        }
      }
  
      window.addEventListener("click", handleClickOutside);
  
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }, []);
  return <>
  <div className="col-md-4 p-2">
            <div className="position-relative light-gray-bg-color p-4 rounded-4 text-center cardName">    
              <i  class="fa-solid fa-ellipsis-vertical del-icon-card" onClick={delOpenClose}></i>
              <img src={cardImg} className="card-img"  alt="" />
              <h4 className="text-white">Leticia Kutch</h4>
              <h6 className="text-white"><span class="styled-span">Country: </span>fvsd</h6>
              <h6 className="text-white"><span class="styled-span">Category: </span>fvsd</h6>
              <h6 className="text-white"><span class="styled-span">Work time: </span>fvsd</h6>
              <h6 className="text-white"><span class="styled-span">Days: </span>fvsd</h6>

              {/* <p className="lead color-semi-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et a quos velit vitae dolor repudiandae.</p> */}
              

              {deletePopUp? <div className="delete-popup bg-brown animate__animated animate__fadeInDown">
                <button className="btn" onClick={confirmDelete}>
              <i class="fa-solid fa-trash me-2"></i>
              Delete
                </button>
              </div>:null}
            </div>
          </div>
  </>
}