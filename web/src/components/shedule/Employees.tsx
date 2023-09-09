import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import baseurl from "../../app/apiMethods/apiMethod";

const Employs: React.FC = () => {
  const [TeamLeader, setTeamLeader] = useState<any>(null);
  const [QRCode , setQRCode] = useState<string>('');

  useEffect(() => {
    axios.get(baseurl + `api/v1/getTeamLeader`)
    .then((res)=>{
      // console.log(res);
      setTeamLeader(res.data);
    })
    .catch((err)=>{
      console.log(err);

    })
  }, [])

  //setQRfunc
  const setQR = (item:any)=>{
    if(item.qrCode === undefined){
      setQRCode('')
      return
    }
    setQRCode(item.qrCode);
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Box sx={{ borderRight: '1px solid #dedede', padding: '1rem' }}>
          <Typography sx={{ marginLeft: '8%', fontWeight: 'bold' }}>Team Leaders</Typography>
          {TeamLeader ? TeamLeader.map((item:any , index:number)=>{
            return <Box key={index} sx={{ marginTop: '1rem' }}>
            <p onClick={()=>setQR(item)} style={{ fontSize: '12px', background: 'rgba(177, 210, 236, 0.4)', borderRadius: '22px', cursor: 'pointer', textAlign: 'center', padding: '0.8rem 2rem' }}>
              {item.name}
            </p>
          </Box>
          }):<h1>Loading...</h1>}
        </Box>
        <Box sx={{ marginLeft: '3rem' }}>
          <p className="employees-title" style={{ marginTop: '1rem' }}>Resident Registration</p>
          {/* <p className="employees-qr-code">QR-Code</p>
          <img className="employees-qr-code" src="" alt="" /> */}
          {QRCode === "" ? <p className="employees-qr-code">QR-Code</p> : <img className="employees-qr-code" src={QRCode} alt="QR-code" />}
        </Box>
      </Box>
    </>
  );
};

export default Employs;
