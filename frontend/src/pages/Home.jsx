// src/pages/Home.jsx
import React, { useState, useRef, useEffect } from "react";

function Home() {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Could not access camera. Please ensure you've granted permission.");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const imageDataURL = canvas.toDataURL('image/png');
    setCapturedImage(imageDataURL);
    stopCamera();
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Clean up camera resources when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div >
      {!showCamera && !capturedImage ? (
        // Normal app view
        <>
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
            <button className="app-button" onClick={startCamera}>Take Photo</button>
            <button className="app-button">Scan</button>
            <button className="app-button">Get report</button>
          </div>
          
        
        </>
      ) : showCamera ? (
        // Camera view
        <div className="camera-container">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            style={{ width: "100%", height: "auto", borderRadius: "20px" }}
          />
          <div className="camera-controls">
            <button className="app-button" onClick={stopCamera}>Cancel</button>
            <button className="app-button capture-btn" onClick={capturePhoto}>Capture</button>
          </div>
        </div>
      ) : (
        // Captured image view
        <div className="captured-image-container">
          <img 
            src={capturedImage} 
            alt="Captured" 
            style={{ width: "100%", height: "auto", borderRadius: "20px" }}
          />
          <div className="image-controls">
            <button className="app-button" onClick={retakePhoto}>Retake</button>
            <button className="app-button save-btn">Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;