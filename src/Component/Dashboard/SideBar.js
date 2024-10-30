import React from "react";
import BusForm from "./BusForm";
import "./Dashboard.css";

function SideBar() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">VidyaMate</div>
        <nav>
          <ul>
            <li>Bus Master</li>
            <li>Driver Master</li>
            <li>Route Configuration</li>
            <li>Student Pickup Point Mapping</li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <header>
          <div className="session">Session: FY2023-24</div>
         <div className="school-name nameDiv">TRIPUDE JUNIOR COLLEGE</div>
          <div className="search">
            <input type="text" placeholder="Search Student" />
            <button className="search-button">🔍</button>
          </div>
          
        </header>
        <BusForm/>
      </main>
    </div>
  );
}

export default SideBar;
