import { useEffect, useState } from "react";
import cardImg from "../../../assets/prfle nav.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import Swal from "sweetalert2";
import { getLocalStorage } from "../../../Services/LocalStorage";
import "./card.css";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function Card({ data, getAllBusinesses }) {
  let [deletePopUp, setdeletePopUp] = useState(false);
  const userToken = getLocalStorage("userToken");

  let delOpenClose = () => {
    setdeletePopUp(!deletePopUp);
  };
  async function deleteBusiness() {
    try {
      const respones = await axios.delete(
        `http://localhost:3011/admin/deleteBusiness/${data._id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      getAllBusinesses();
      console.log(respones);
    } catch (err) {
      console.log(err);
    }
  }

  function confirmDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      deleteBusiness();
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
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
  return (
    <>
      <div className="col-md-4 p-2">
        <div className="position-relative light-gray-bg-color p-4 rounded-4 text-center cardName">
          <i
            class="fa-solid fa-ellipsis-vertical del-icon-card"
            onClick={delOpenClose}
          ></i>
          <img
            src={data.logo ? `http://localhost:3011/${data.logo}` : cardImg}
            className="card-img"
            alt=""
          />
          <h4 className="text-white">{data.businessName}</h4>
          <div className="businessInfo">
            <div className="info">
              <h6 className="text-white info">
                <span class="styled-span">Category: </span>
                {data.category}
              </h6>
            </div>
            <div className="info">
              <h6
                className={
                  data.status === "accepted"
                    ? " accepted"
                    : data.status === "rejected"
                    ? " rejected"
                    : "text-white"
                }
              >
                <span class="styled-span">Status: </span>
                {data.status === "pending"
                  ? `${data.status}...`
                  : `${data.status}`}
              </h6>
            </div>
            <div className="info">
              <h6 className="text-white">
                <span class="styled-span">Rating: </span>
                {data.totalRate}{" "}
                <svg
                  style={{ marker: "none" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  id="star"
                >
                  <path
                    style={{ marker: "none" }}
                    fill="#f8b84e"
                    d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z"
                    color="#000"
                    overflow="visible"
                    transform="matrix(.04574 0 0 .04561 68.85 -40.34)"
                  ></path>
                </svg>
              </h6>
            </div>
          </div>
          {/* <p className="lead color-semi-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et a quos velit vitae dolor repudiandae.</p> */}

          {deletePopUp ? (
            <div className="delete-popup bg-brown animate__animated animate__fadeInDown">
              <button className="btn" onClick={confirmDelete}>
                <i class="fa-solid fa-trash me-2"></i>
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
