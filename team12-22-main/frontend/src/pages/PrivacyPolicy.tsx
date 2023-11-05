import React, { useEffect, useState, useRef} from 'react'
import '../css/PrivacyPolicy.css'
import Accessibility from '../component/Accessibility/accessibility.js'
import ScreenReaderHandler from '../component/Accessibility/ScreenReaderHandler'


export default function () {
  const [targetId, setTargetId] = useState(null);
  const rightContentRef = useRef(null);
  const [aLists, setALists] = useState([
    { text: 'Terminology', id: '#Terminology' },
    { text: 'What Data Will We Collect?', id: '#Collect' },
    { text: 'How Will We Collect Your Data?', id: '#Data' },
    { text: 'Why Do We Collect Your Data?', id: '#WhyData' },
    { text: 'How Do We Store Your Data?', id: '#HowData' },
    { text: 'What Are Your Data Protection Rights?', id: '#Rights' },
    { text: 'What Are Cookies?', id: '#Cookies' },
    { text: 'How Do We Use Cookies?', id: '#HowCookies' },
    { text: 'What Types of Cookies Do We Use?', id: '#WhatCookies' },
    { text: 'How To Manage Cookies', id: '#Manage' },
    { text: 'Changes to Our Privacy Policy', id: '#Changes' },
    { text: 'How to Contact Us', id: '#Contact' },
    { text: 'How to Contact the Appropriate Authority', id: '#Authority' },
  ]);

  ScreenReaderHandler();

  const clickTitle = (id) => {
    setTargetId(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      let minOffset = Number.MAX_VALUE;
      let closestId = null;

      aLists.forEach((item) => {
        const element = document.querySelector(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = Math.abs(rect.top - 160); // 将检测点向下调整50个像素
      
          if (offset < minOffset) {
            minOffset = offset;
            closestId = item.id;
          }
        }
      });
      

      setTargetId(closestId);
    };

    if (rightContentRef.current) {
      rightContentRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (rightContentRef.current) {
        rightContentRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <Accessibility/>
            <div className="ScreenReading">
    <div className='fontSize privacy-box'>
      <h1 className='privacy-title' id='title'>Privacy Policy</h1>
      This policy will outline how our website will collect, utilise, and store the personal data that is provided by our
      users, in accordance with GDPR guidelines.
      <br/><br/>
      Alpha Project Disclaimer: This server is provided by the School of Computer Science at the University of Birmingham to allow users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g. financial information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all associated data will be destroyed.
      <div className="privacy-content">
        <div className="privacy-left">
          <div className="privacy-left-content">
            {
              aLists.map(v => {
                return <a onClick={() => clickTitle(v.id)} href={v.id} className={v.id == targetId ? 'privacy-acitve' : ''}>{v.text}</a>
              })
            }
          </div>
        </div>
        <div className="privacy-right" ref={rightContentRef}>
          <h2 id='Terminology'>
            Terminology
          </h2>
          <ul>
            <li>Raw Data - This is the data that will be uploaded by users, which will be then used in order to train their
              prediction model on.</li>
            <li>Prediction Model - This is what the user will be generating when they upload their raw data to the server,
              once generated this will allow the user to use the model to predict on new data.</li>
            <li>User Account - This is the account that any new user of the website will have to create, and will provide a
              way of authenticating users, meaning only the owners of the models will be able to view them.</li>
          </ul>
          <h2 id='Collect'>What Data Will We Collect?</h2>
          The following data will be collected from users of the website:
          <ul>
            <li>Personal identification information (username, email).</li>
            <li>Information uploaded by the user for the purposes of running our training and prediction models, based on
              their data. Examples of such data may be financial information, inventory etc.</li>
          </ul>
          <h2 id='Data'>How Will We Collect Your Data?</h2>
          The user will be directly providing all the data that we collect, data will only be collected and processed when the
          user:
          <ul>
            <li>Registers for an online account.</li>
            <li>Uses or views the website via browser cookies.</li>
            <li>Uploads data to be processed for model training.</li>
            <li>Provides data for making a prediction based on one of their models.</li>
          </ul>
          <h2 id='WhyData'>Why Do We Collect Your Data?</h2>
          Our website will collect your data only for the purposes of providing the best service to our users, specifically
          your data will be used for:
          <ul>
            <li>Secure sign-in and access to the user account.</li>
            <li>Creation of a prediction model based directly on the data that the user uploads.</li>
            <li>Prediction based on the model and the data provided by the user.</li>
          </ul>
          <h2 id='HowData'>How Do We Store Your Data?</h2>
          Your data will be stored securely on our servers, located within the United Kingdom, using data encryption
          standards. Only the owner of the data will be able to view their data.

          Your account information and trained models will be stored until a deletion request is made by the user, at which
          point any related information will be deleted from our databases. This information will not be deleted unless
          requested to prevent the user losing access to their models that they may be using currently. Raw datasets uploaded
          by the user will be completely deleted once the model has been trained.

          <h2 id='Rights'>What Are Your Data Protection Rights?</h2>
          Every user is entitled to the following rights:
          <ul>
            <li>The right to access - You have the right to request us for copies of your personal data at any time.</li>
            <li>The right to rectification - You have the right to request that our company correct any information that you
              believe is inaccurate. You also have the right to request us to complete any information you believe to be
              incomplete.</li>
            <li>The right to erasure - You have the right to request that we erase your personal data, under certain
              conditions.</li>
            <li>The right to restrict processing - You have the right to request that we restrict the processing of your
              personal data, under certain conditions.</li>
            <li>The right to object to processing - You have the right to object to our processing of your personal data,
              under certain conditions.</li>
            <li>The right to data portability - You have the right to request that we transfer the data we have collected to
              another organisation, or directly to you, under certain conditions.</li>
          </ul>

          If you make a request, we have up to one month to respond. If you would like to make any requests, then please
          contact us as detailed in the contact section of this document.

          <h2 id='Cookies'>What Are Cookies?</h2>
          Cookies are small files that are located on your computer, to store and collect standard Internet log behaviour and
          visitor behaviour information. When you visit our website, we may collect information from you automatically through
          cookies or similar technology.

          For more information visit <a href="https://allaboutcookies.org/">https://allaboutcookies.org/</a>

          <h2 id='HowCookies'>How Do We Use Cookies?</h2>
          Our website will use cookies in order to improve you experience when visiting our website, such as to help you
          remained signed in between sessions of visiting the website.

          <h2 id='WhatCookies'>What Types of Cookies Do We Use?</h2>
          Our website uses the following cookies during your visit:
          <ul>
            <li>Functionality - These cookies are used in order to recognise you when visiting our website, such as
              remembering what account you were signed into on your last visit, or other website-based preferences.</li>
          </ul>
          <h2 id='Manage'>How To Manage Cookies</h2>
          You can set your browser to not accept any cookies, which can be done by following the instructions at the website
          linked above. Turning off cookies may cause some loss in functionality, however.

          <h2 id='Changes'>Changes to Our Privacy Policy</h2>
          We will keep our policy under regular updates and reviews, in accordance with the latest legislation and standards,
          and will place any updates on the related webpage. The last update to this policy was on 12th March 2023.

          <h2 id='Contact'>How to Contact Us</h2>
          If you have any questions about our privacy policy, or you would like to exercise your data protection rights, then
          you can contact us at:

          <ul>
            <li>Jack Smith at jxs1535@student.bham.ac.uk</li>
            <li>Abirami Sundaramoorthy at axs1951@student.bham.ac.uk</li>
            <li>Chenghao Huang at cxh151@student.bham.ac.uk</li>
            <li>Hongli Ji at hxj073@student.bham.ac.uk</li>
            <li>Liyana Saleem at lxs211@student.bham.ac.uk</li>
            <li>Tariq Hawili at tuh940@student.bham.ac.uk</li>
            <li>Tsun Cheung at tyc086@student.bham.ac.uk</li>
          </ul>


          <h2 id='Authority'>How to Contact the Appropriate Authority</h2>
          If you feel as though you need to report a complaint or if you feel that we have not addressed your concerns and
          requests in a satisfactory amount of time, you may contact the Information Commissioners Office. Details for contact
          can be found at <a href="https://ico.org.uk/.">https://ico.org.uk/</a>
          <div style={{ height: "500px" }}></div>

        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
