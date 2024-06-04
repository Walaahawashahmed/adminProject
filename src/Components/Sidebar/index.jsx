import { NavLink } from "react-router-dom";
import UserIcon from "../Icons/UserIcon";
import RequestIcon from "../Icons/RequestIcon";
import { SidebarContainer } from "./styles";
import { StyledLink } from "../../Components/CommonStyles";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { removeLocalStorage } from "../../Services/LocalStorage";
import logo from "../../assets/local-linker-logo.svg";

export default function Sidebar() {
  const navigate = useNavigate();
  function logout() {
    removeLocalStorage("userToken");
    navigate("/login");
  }
  return (
    <>
      <SidebarContainer>
        <ul>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: "50px",
                height: "50px",
              }}
            />
            <h1 className="fs-4">Local Linker</h1>
          </div>
          <li>
            <NavLink to="/Dashboard/customers">
              <UserIcon fill={"black"} />
              Users
            </NavLink>
          </li>

          <li>
            <NavLink to="/Dashboard/requests">
              <RequestIcon fill={"black"} />
              Requests
            </NavLink>
          </li>

          <li>
            <NavLink to="/Dashboard/reviews">
              <RequestIcon fill={"black"} />
              Reviews
            </NavLink>
          </li>

          <li>
            <NavLink to="/Dashboard/Business">
              <RequestIcon fill={"black"} />
              Business
            </NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/Categories">
              <RequestIcon fill={"black"} />
              Categories
            </NavLink>
          </li>
        </ul>

        <div className="options">
          <StyledLink className="logout" onClick={logout}>
            Logout
          </StyledLink>
          <StyledLink className="subadmin" to="/signup">
            Create Sub Admin
          </StyledLink>
        </div>
      </SidebarContainer>
    </>
  );
}
