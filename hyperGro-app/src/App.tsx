import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllVidoe from "./component/AllVidoe";
import { FaMicrophone, FaRegBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { SlCamrecorder } from "react-icons/sl";

function App() {
  return (
    <div>
       <nav className="navbar">
        <div className="nav">
          <div className="logo-container">
            <h1 style={{display: "flex", color: "red"}}>Hyper <span style={{color: "white"}}>Gro</span></h1>
          </div>
          <div style={{display: "flex"}}>
          <div className="search-container">
            <input
              type="text"
              className="search"
              placeholder="Search accounts and videos"
            />
            <span></span>
            <button><CiSearch /></button>
            
          </div>
         
          <button className="microphone"><FaMicrophone /></button>
          
          </div>
          
         
          <button className="recorderr"><SlCamrecorder /></button>
          <button className="recorderr_2"> <FaRegBell /></button>
          <ul>
            <li></li>
            <li>
              <img
                src="https://avatars.githubusercontent.com/u/109854714?v=4"
                alt=""
              />
            </li>
          </ul>
        </div>
      </nav>
      {/*  */}
      <Routes>
        <Route path="/" element={<AllVidoe/>}/>
       

      </Routes>
    </div>
  );
}

export default App;
