import React from "react";

function Home() {
  return (
    <div >
      <div className="app-header">
        <div className="app-logo">
          <div className="logo-image">
            <div className="logo-icon">
              
              <span style={{ fontSize: "30px", fontWeight: "bold" }}>A</span>
            </div>
          </div>
          <div className="app-title">ATTENDANCE</div>
        </div>
      </div>
      
      <div className="app-buttons">
        <button className="app-button">Take Photo</button>
        <button className="app-button">Scan</button>
        <button className="app-button">Get report</button>
      </div>
      
    </div>
  );
}

export default Home;