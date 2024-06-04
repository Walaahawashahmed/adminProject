import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";
import "./recentAndCards.css";
import { getLocalStorage } from "../../../Services/LocalStorage";
import Card from "../Card/card";
import axios from "axios";

export default function RecentReviews() {
  const userToken = getLocalStorage("userToken");
  const [data, setData] = useState([]);
  async function getReviews() {
    try {
      const respones = await axios.get(
        "http://localhost:3011/admin/getreports",
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      console.log(respones);
      setData(respones.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <>
      <div>
        <div className="header-recent-views d-flex flex-wrap justify-content-end ">
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
          {data.map((report) => (
            <Card
              key={report._id}
              reason={report.reason}
              status={report.status}
              customerName={report.customerName}
              review={report.review}
              _id={report._id}
              getReviews={getReviews}
            />
          ))}
        </div>
      </div>
    </>
  );
}
