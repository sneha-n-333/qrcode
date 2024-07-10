import React, { useState } from "react";

const Qrcode = () => {
  const [img,setImg]=useState('');
  const [loading,setLoading]=useState(false);
  const [qrdata, setQrdata]=useState("");
  const [qrsize,setQrsize]=useState("");
  async function generateqr() {
    setLoading(true)
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);

    }
    catch(error){
      console.error("Error generating QR code",error)
    }
    finally{
      setLoading(false)
    }
  }

  function downloadqr(){
    var input1=document.getElementById("dataInput").value;
    var input2=document.getElementById("sizeInput").value;
    if(input1 === ""&&input2 ===""){
      alert("Enter data");
    }
    else if(input1 === ""){
      alert("Enter data for QR code")
    }
    else if(input2 === ""){
      alert("Enter image size")
    }
    else{
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error)=>{
      console.error("error downloading QR code",error)
    })
    }
  }
  
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img className="qrimg" src={img} />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code
        </label>
        <input
          type="text"
          value={qrdata}
          id="dataInput"
          placeholder="Enter data for QR code"
          onChange={(e)=>setQrdata(e.target.value)}
        />
        <label htmlFor="dataInput" className="input-label">
          Image size (e.g.,150)
        </label>
        <input type="text" value={qrsize} id="sizeInput" placeholder="Enter image size"
        onChange={(e)=>setQrsize(e.target.value)} />

        <button className="generate-button" disabled={loading} onClick={generateqr}>
          Generate QR code
        </button>
        <button className="download-button" onClick={downloadqr} >Download QR code</button>
      </div>
    </div>
  );
};

export default Qrcode;
