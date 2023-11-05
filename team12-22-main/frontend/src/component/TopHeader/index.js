import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import logo from '../../assets/logo.png';

function TopHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="contain">
      <div class="left">
        <Link to="/" tabIndex={0} desc="Minsky Lab Logo">
          <img src={logo} alt="Logo" />
          <p hidden={true}>Minsky Lab Logo</p>
        </Link>
      </div>
      <div className={`right ${showMenu ? 'show' : ''}`} >
        <div className="itembox">
          <Link to="/" className="item" id="homeButton" tabIndex="-1">
            <span className='itm-text' tabIndex="0" onKeyPress={() => document.getElementById("homeButton").click()}>Home</span>
          </Link>
        </div>
        <div className="itembox">
          <Link to="/dataupload" className="item" id="dataUploadButton" tabIndex="-1">
            <span className='itm-text' tabIndex="0" onKeyPress={() => document.getElementById("dataUploadButton").click()}>Build a Model</span>
          </Link>
        </div>
        <div className="itembox">
          <Link to="/mylab" className="item" id="myLabButton" tabIndex="-1">
            <span className='itm-text' tabIndex="0" onKeyPress={() => document.getElementById("myLabButton").click()}>My Lab</span>
          </Link>
        </div>
        <div className="itembox">
          <Link to="/logout" className="item" id="logoutButton" tabIndex="-1">
            <span className='itm-text' tabIndex="0" onKeyPress={() => document.getElementById("logoutButton").click()}>Logout</span>
          </Link>            
        </div>
      </div>
      <div className="expand-btn" onClick={toggleMenu}>
        <div className="menu-icon">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
