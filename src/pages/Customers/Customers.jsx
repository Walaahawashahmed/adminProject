/* eslint-disable react/prop-types */
import {
  // ActiveMembers,
  // Card,
  Container,
  // Content,
  CustomerContainer,
  CustomerTable,
  // Footer,
  Header,
  // Icon,
  InputContainer,
  Options,
  // Pagination,
  // Statistics,
  // customStyles,
} from "./styles";
// import totalCustomersIcon from "../../assets/icons/total-customers.svg";
// import monitorIcon from "../../assets/icons/monitor.svg";
// import profileTickIcon from "../../assets/icons/profile-tick.svg";
// import member1 from "../../assets/members/1.png";
// import member2 from "../../assets/members/2.png";
// import member3 from "../../assets/members/3.png";
// import member4 from "../../assets/members/4.png";
// import member5 from "../../assets/members/5.png";

// import Select from "react-select";

// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage } from "../../Services/LocalStorage";
import Swal from "sweetalert2";

export default function Customers() {
  const [query, setQuery] = useState("");
  const [isError, setIsError] = useState({
    status: false,
    message: "",
    code: 0,
  });
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [active, setActive] = useState(false);
  const userToken = getLocalStorage("userToken");

  async function handelUser(e) {
    e.preventDefault();
    const name = e.currentTarget.innerText;
    const user = data.filter((user) => user.email === name);
    try {
      const respone = await axios.get(
        `http://localhost:3011/admin/activities/${user[0]._id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setData2(respone.data.activities);
      console.log(data2);
      setActive(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function searchUser() {
    try {
      const response = await axios.get(
        `http://localhost:3011/admin/searchUserByName/${query}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      console.log(response.data.users);
      setData(response.data.users);
      setIsError({ status: false, message: "", code: 0 });
    } catch (err) {
      console.log(err);
      setIsError({
        status: true,
        message: err.response.data.msg,
        code: err.response.status,
      });
    }
  }
  async function deleteUser(id) {
    try {
      const respones = await axios.delete(
        `http://localhost:3011/admin/deleteUsers/${id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      console.log(respones);
    } catch (err) {
      console.log(err);
    }
  }
  function confirmDelete(id) {
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
        deleteUser(id);
        searchUser();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }
  useEffect(() => {
    // debounce the search and clean up after unmount
    const timeout = setTimeout(() => {
      searchUser();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);
  return (
    <>
      <Container>
        <Header>
          {/* <InputContainer>
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
          </InputContainer> */}
        </Header>

        {active ? (
          <CustomerContainer>
            <header>
              <div className="title">
                <h2>Activity</h2>
                <h3>{data2[0].userID.name}</h3>
              </div>

              <InputContainer
                style={{ marginRight: "30px" }}
                onClick={() => setActive(false)}
              >
                <div className="backButton">
                  <svg
                    className="backIcon"
                    height="35px"
                    version="1.1"
                    viewBox="0 0 256 256"
                    width="35px"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "5px" }}
                  >
                    <path d="M149.974,191.146c-1.638,0-3.276-0.625-4.524-1.875l-56.748-56.746c-2.5-2.499-2.5-6.552,0-9.05l56.748-56.747  c2.496-2.5,6.553-2.5,9.049,0c2.5,2.499,2.5,6.552,0,9.05L102.278,128l52.22,52.222c2.5,2.499,2.5,6.552,0,9.05  C153.25,190.521,151.611,191.146,149.974,191.146z M256,128C256,57.42,198.58,0,128,0C57.42,0,0,57.42,0,128  c0,70.58,57.42,128,128,128C198.58,256,256,198.58,256,128z M243.2,128c0,63.521-51.679,115.2-115.2,115.2  c-63.522,0-115.2-51.679-115.2-115.2C12.8,64.478,64.478,12.8,128,12.8C191.521,12.8,243.2,64.478,243.2,128z" />
                  </svg>
                  <h3 className="back" style={{ paddingTop: "6px" }}>
                    Back
                  </h3>
                </div>
              </InputContainer>
            </header>
            {isError.status && isError.code === 404 ? (
              <div>
                <h3>{isError.message}</h3>
              </div>
            ) : (
              <CustomerTable>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Activity Type</th>
                    <th>Details</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {data2.map((activity) => (
                    <Activity
                      key={activity._id}
                      userName={activity.userID.name}
                      activityType={activity.activityType}
                      details={activity.details}
                      time={activity.timeStamp}
                    />
                  ))}
                </tbody>
              </CustomerTable>
            )}
          </CustomerContainer>
        ) : (
          <CustomerContainer>
            <header>
              <div className="title">
                <h2 className="text-light">Users</h2>
                <h3>All Members in the system</h3>
              </div>

              <Options>
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

                  <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.currentTarget.value);
                      console.log(query);
                    }}
                  />
                </InputContainer>
              </Options>
            </header>
            {isError.status && isError.code === 404 ? (
              <div>
                <h3>{isError.message}</h3>
              </div>
            ) : (
              <CustomerTable>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((users) => (
                    <Users
                      key={users._id}
                      confirmDelete={confirmDelete}
                      id={users._id}
                      userName={users.name}
                      email={users.email}
                      phone={users.phone}
                      role={users.role}
                      country={users.country}
                      handleUser={handelUser}
                    />
                  ))}

                  {/* <tr>
                <td>Jane Cooper</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>jane@microsoft.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Active</span>
                </td>
              </tr>

              <tr>
                <td>Floyd Miles</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>floyd@yahoo.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status inactive">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status inactive">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status inactive">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status inactive">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Inactive</span>
                </td>
              </tr> */}
                </tbody>
              </CustomerTable>
            )}

            {/* <Footer>
            <p>
              Showing data <span className="start">1</span> to{" "}
              <span className="end">8</span> of{" "}
              <span className="total">256K</span> entries
            </p>

            <Pagination>
              <Link className="previous">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </Link>
              <Link className="active">1</Link>
              <Link>2</Link>
              <Link>3</Link>
              <Link>4</Link>
              <span>...</span>
              <Link>40</Link>
              <Link className="next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </Pagination>
          </Footer> */}
          </CustomerContainer>
        )}
      </Container>
    </>
  );
}

function Users({
  userName,
  email,
  phone,
  role,
  handleUser,
  id,
  confirmDelete,
}) {
  return (
    <tr>
      <td>{userName}</td>
      <td>
        <a
          className="link"
          onClick={(e) => {
            handleUser(e);
          }}
        >
          {email}
        </a>
      </td>
      <td>{phone}</td>
      <td>{role}</td>
      <td>
        <button className="status active" onClick={() => confirmDelete(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

// eslint-disable-next-line react/prop-types
function Activity({ userName, activityType, details, time }) {
  return (
    <tr>
      <td>{userName}</td>
      <td>{activityType}</td>
      <td>{details}</td>
      <td>{time}</td>
      <td>
        <span className="status active">Active</span>
      </td>
    </tr>
  );
}
