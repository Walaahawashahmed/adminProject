import { NavLink } from "react-router-dom";
import UserIcon from "../Icons/UserIcon";
import RequestIcon from "../Icons/RequestIcon";
import profileImage from "../../assets/profile.png";
import { SidebarContainer, UserSwitcher } from "./styles";
import {  StyledLink} from "../../Components/CommonStyles";

function logout() {
 Login()
  alert('Logged out successfully!')
  
    }





export default function Sidebar() {
  return (
    <>
      <SidebarContainer>
        <ul>
          <li>
            <NavLink to="/Dashboard/customers">
              <UserIcon fill={"black"} />
              Customers
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

        

        <UserSwitcher>
       

          <div className="info">
         
          <StyledLink className="bg-black text-white" to="/login">Login!</StyledLink>
          <br />
          <br />
          <StyledLink className="bg-black text-white" to="/signup">Create Sub Admin!</StyledLink>
          </div>

          <div className="arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </UserSwitcher>
      </SidebarContainer>
    </>
  );
}
