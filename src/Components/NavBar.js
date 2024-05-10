import React from "react";
import { useState } from "react";
import "./SideBar.css"; // Assuming you have a separate CSS file for styling
import { UseDispatch, useDispatch, connect } from "react-redux";
const NavItems = ["Create Table", "View Table", "Other"];
const Sidebar = ({ section }) => {
  const [activeSection, setActiveSection] = useState("View Tables");
  const [nav, setNav] = useState(true);
  const dispatch = useDispatch();
  const handleSectionClick = (section) => {
    setActiveSection(section);
    // You can add logic here to navigate to different sections or pages based on the clicked section
  };
  return nav ? (
    <div className="NavBar">
      <p onClick={(e) => setNav(!nav)}>X</p>
      <h1>Logo</h1>
      <div>{/* <p>Create Tables</p> */}</div>
      {/* <div className="sidebar-header">Navigation</div> */}
      <ul className="sidebar-menu">
        {NavItems.map((data) => (
          <li
            className={section === data ? "active" : ""}
            onClick={() =>
              dispatch({ type: "CHANGE_DASHBOARD", payload: data })
            }
          >
            {data}
          </li>
        ))}
      </ul>
      <button
        style={{
          position: "absolute",
          bottom: "10px",
          top: "auto",
        }}
      >
        Sign Out
      </button>
    </div>
  ) : (
    <p onClick={(e) => setNav(!nav)}>|||</p>
  );
};
const mapStateToProps = (state) => {
  return {
    section: state.section,
  };
};
export default connect(mapStateToProps, {})(Sidebar);
