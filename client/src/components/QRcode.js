import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
function QRcode(props) {
    const location = useLocation();
  const isbn = new URLSearchParams(location.search).get('isbn');
  
  
    return (
      <div className="qrcode-container">
        <h2>Please Collect Book from the Library by showing the below qrcode</h2>
        <br/>
        <br/>
        <QRCode value={`ISBN is :${isbn} \n Rollno is :${props.roll}`} />
      </div>
    );
  };

export default QRcode;
