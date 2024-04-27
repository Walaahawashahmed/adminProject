import { NavLink } from "react-router-dom";
import UserIcon from "../Icons/UserIcon";
import RequestIcon from "../Icons/RequestIcon";
import { SidebarContainer } from "./styles";
import { StyledLink } from "../../Components/CommonStyles";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { removeLocalStorage } from "../../Services/LocalStorage";

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
