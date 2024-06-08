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
      .then(() => {
        getAllRequests();
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
      setData(response.data.businesses);
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
                  status={business.status}
                  address={business.address}
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
  status,
  address,
  manageRequest,
  id,
}) {
  return (
    <tr>
      <td>{businessName}</td>
      <td>{country}</td>
      <td>{address}</td>
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
      <td className="button">
        <button
          disabled={status === "pending" ? false : true}
          onClick={(event) => {
            manageRequest(event.target.innerText, id);
          }}
          className="btn btn-approve "
        >
          Accepte
        </button>
        <button
          disabled={status === "pending" ? false : true}
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
