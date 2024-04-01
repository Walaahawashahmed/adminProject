/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import {
  Container,
  CustomerContainer,
  CustomerTable,
  InputContainer,
  Header,
  Heading,
} from "./styles";
import axios from "axios";
import { getLocalStorage } from "../../Services/LocalStorage";

export default function Requests() {
  // const options = [
  //   { value: "customers", label: "Sort by: Customers" },
  //   { value: "country", label: "Sort by: Country" },
  //   { value: "status", label: "Sort by: status" },
  // ];
  const [data, setData] = useState([]);
  const userToken = getLocalStorage("userToken");

  async function manageRequest(response, id) {
    console.log(`${response}${id}`);
    const data =
      response === "Reject"
        ? `${response.toLowerCase()}ed`
        : `${response.toLowerCase()}d`;
    console.log(data);

    await axios({
      method: "put",
      url: `http://localhost:3011/admin/managebusinesses/${id}`,
      data: { status: data },
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    if (data === "rejected") {
      const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Message",
        inputPlaceholder: "Type your message here...",
        inputAttributes: {
          "aria-label": "Type your message here",
        },
        showCancelButton: false,
      });
      if (text) {
        Swal.fire({
          title: "Done!",
          text: "Your reason has been sent.",
          icon: "success",
        });
      }
    }
  }
  async function getAllRequests() {
    try {
      const response = await axios.get("http://localhost:3011/admin", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log(response);
      setData(response.data.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAllRequests();
  }, []);
  return (
    <>
      <Container>
        <Header>
          <h2>Hello Walaa 👋🏻,</h2>
          <InputContainer>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#7E7E7E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="#7E7E7E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input type="text" placeholder="Search" />
          </InputContainer>
        </Header>

        <Heading>New Requests</Heading>

        <CustomerContainer>
          <CustomerTable>
            <thead>
              <tr>
                <th>Business Name</th>
                <th>Country</th>
                <th>Current Location</th>
                <th>Category</th>
                <th>Licenses</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((business) => (
                <Allrequests
                  key={business._id}
                  businessName={business.businessName}
                  country={business.Country}
                  category={business.category}
                  attachment={business.attachment}
                  manageRequest={manageRequest}
                  id={business._id}
                />
              ))}
              {/* <tr>
                <td>11:30 PM</td>
                <td>Helen Hywater</td>
                <td>1234 Some Street Name, City...</td>
                <td>Food</td>
                <td>
                  <button className="btn btn-approve">Approve</button>
                  <button className="btn btn-delete">Delete</button>
                </td>
              </tr>

              <tr>
                <td>11:30 PM</td>
                <td>Helen Hywater</td>
                <td>1234 Some Street Name, City...</td>
                <td>Food</td>
                <td>
                  <button className="btn btn-approve">Approve</button>
                  <button className="btn btn-delete">Delete</button>
                </td>
              </tr>

              <tr>
                <td>11:30 PM</td>
                <td>Helen Hywater</td>
                <td>1234 Some Street Name, City...</td>
                <td>Food</td>
                <td>
                  <button className="btn btn-approve">Approve</button>
                  <button className="btn btn-delete">Delete</button>
                </td>
              </tr> */}
            </tbody>
          </CustomerTable>
        </CustomerContainer>
      </Container>
    </>
  );
}
// eslint-disable-next-line react/prop-types
function Allrequests({
  businessName,
  country,
  category,
  attachment,
  manageRequest,
  id,
}) {
  return (
    <tr>
      <td>{businessName}</td>
      <td>{country}</td>
      <td>1234 Some Street Name, City...</td>
      <td>{category}</td>
      <td>
        <a
          href={`http://localhost:3011/${attachment}`}
          target="_blank"
          rel="noreferrer"
        >
          license
        </a>
      </td>
      <td>
        <button
          onClick={(event) => {
            manageRequest(event.target.innerText, id);
          }}
          className="btn btn-approve "
        >
          Accepte
        </button>
        <button
          onClick={(event) => {
            manageRequest(event.target.innerText, id);
          }}
          className="btn btn-delete"
        >
          Reject
        </button>
      </td>
    </tr>
  );
}
