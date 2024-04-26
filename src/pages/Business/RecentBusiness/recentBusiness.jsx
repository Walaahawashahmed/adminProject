import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";
import { getLocalStorage } from "../../../Services/LocalStorage";
import "./recentAndCards.css";
import Card from "../Card/card";
import axios from "axios";

export default function RecentBusiness() {
  const [data, setData] = useState({ data: [], err: false, massage: "" });
  const [query, setQuery] = useState("");
  const userToken = getLocalStorage("userToken");
  async function getAllBusiness() {
    await axios
      .get(`http://localhost:3011/admin/searchbusinessByName/${query}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log(res);
        setData({ data: res.data.businesses, err: false, massage: "" });
      })
      .catch((error) => {
        console.log(error);
        setData({
          data: [],
          err: true,
          massage: error.response.data.msg,
        });
      });
  }

  useEffect(() => {
    // debounce the search and clean up after unmount
    const timeout = setTimeout(() => {
      getAllBusiness();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);
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
            <input
              type="text"
              id="searchInput"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          </div>
        </div>
        <h1 className="fw-bolder text-white text-center mt-5">
          Recent Business
        </h1>
      </div>
      <div className={data.err ? "errorContainer" : "container"}>
        {data.err ? (
          <p className="err">{data.massage}</p>
        ) : (
          <div className="row">
            {data.data.map((business) => (
              <Card
                key={business._id}
                data={business}
                getAllBusinesses={getAllBusiness}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
