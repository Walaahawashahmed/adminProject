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
  async function accept(id) {
    console.log(`${id}`);
    await axios({
      method: "put",
      url: `http://localhost:3011/admin/managebusinesses/${id}`,
      data: { status: "accepted" },
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(() => {
        getAllRequests();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function reject(id) {
    console.log(`${id}`);
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
      await axios({
        method: "put",
        url: `http://localhost:3011/admin/managebusinesses/${id}`,
        data: { status: "rejected", rejectionMessage: text },
        headers: { Authorization: `Bearer ${userToken}` },
      })
        .then((res) => {
          console.log(res);
          getAllRequests();
        })
        .catch((err) => {
          console.log(err);
        });

      Swal.fire({
        title: "Done!",
        text: "Your reason has been sent.",
        icon: "success",
      });
    }
  }
  async function getAllRequests() {
    try {
      const response = await axios.get("http://localhost:3011/admin", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setData(response.data.businesses);
      // console.log(data);
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
                  accept={accept}
                  reject={reject}
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
  accept,
  reject,
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
          onClick={() => {
            accept(id);
          }}
          className="btn btn-approve "
        >
          Accepte
        </button>
        <button
          disabled={status === "pending" ? false : true}
          onClick={() => {
            reject(id);
          }}
          className="btn btn-delete"
        >
          Reject
        </button>
      </td>
    </tr>
  );
}
