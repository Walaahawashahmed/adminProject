/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import warn from "../../../assets/warning-838655_640.png";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getLocalStorage } from "../../../Services/LocalStorage";
import "./card.css";
import Swal from "sweetalert2";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function Card({
  reason,
  customerName,
  status,
  review,
  _id,
  getReviews,
}) {
  const userToken = getLocalStorage("userToken");
  let [deletePopUp, setdeletePopUp] = useState(false);

  let delOpenClose = () => {
    setdeletePopUp(!deletePopUp);
  };
  async function deleteReviews() {
    try {
      const respones = await axios.delete(
        `http://localhost:3011/admin/deleteReview/${_id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
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
      if (result.isConfirmed) {
        deleteReviews();
        getReviews();
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
        <div className="report position-relative bg-light p-4 rounded-2 cardName">
          <i
            class="fa-solid fa-ellipsis-vertical del-icon-card"
            onClick={delOpenClose}
          ></i>
          <div className="w-100 d-flex align-items-center justify-content-center mb-2">
            <img src={warn} className="card-img" alt="" />
          </div>
          <p className="text-dark">
            <b>Reason:</b> <span className="text-dark">{reason}</span>
          </p>
          <p className="text-dark">
            <b>Customer name:</b> <span>{customerName}</span>
          </p>
          <p className="text-dark">
            <b>Reported Review:</b> <span>{review}</span>
          </p>
          <div className="text-dark">
            <b>Status:</b>{" "}
            <span
              className={
                "badge" +
                ` ${
                  status === "accepted"
                    ? "bg-success"
                    : status === "rejected"
                    ? "bg-danger"
                    : "bg-secondary"
                }`
              }
            >
              {status}
            </span>
          </div>

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
