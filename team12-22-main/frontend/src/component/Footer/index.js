import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
export default function index() {
  return (
    <div className='footer'>
      <p className='footer-desc'>
        Copyright © 2023 Minsky Lab All Rights Reserved.
      </p>
      <div className='footer-content1'>
        <Link to="/privacy-policy#title" target='_blank' style={{ margin: '0 10px' }} id="privacyButton" tabIndex="-1">
            <span tabIndex="0" onKeyPress={() => document.getElementById("privacyButton").click()}>Privacy Policy</span>
        </Link>
        ·
        <Link to="/privacy-policy#Cookies" target='_blank' style={{ margin: '0 10px' }} id="cookieButton" tabIndex="-1">
            <span tabIndex="0" onKeyPress={() => document.getElementById("cookieButton").click()}>Use of Cookies</span>
        </Link>
        ·
        <Link to="/privacy-policy#Contact" target='_blank' style={{ margin: '0 10px' }} id="contactButton" tabIndex="-1">
            <span tabIndex="0" onKeyPress={() => document.getElementById("contactButton").click()}>Contact Us</span>
        </Link>
      </div>
      <p className='footer-content2'>Alpha Project Disclaimer: This server is provided by the School of Computer Science at 
      the University of Birmingham to allow users to provide feedback on software developed by 
      students as part of an assignment. While we take reasonable precautions, we cannot 
      guarantee the security of the data entered into the system. Do NOT enter any real 
      personal data (e.g. financial information or otherwise) into the system. The assignment 
      runs until May 31st 2023, at which time the server and all associated data will be destroyed.
      </p>
    </div>
  )
}