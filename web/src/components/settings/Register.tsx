import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import baseurl from "../../app/apiMethods/apiMethod";
import MAButton from "../my-components/MAButton";
import MAModal from "../my-components/MAModal";

const Register: React.FC = () => {
  //state
  const [modal, setModal] = useState(false)
  const [error, setError] = useState(false)
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [contact, setContact] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [ahvnumber, setAhvnumber] = useState('');
  const [comments, setComments] = useState('');
  const [room, setRoom] = useState('');
  const [etc, setEtc] = useState('');
  const [illness, setIllness] = useState('');
  const [status, setStatus] = useState('');
  const [illergies, setIllergies] = useState('');


  //create resident
  const createResident = () => {
    // console.log(fname, lname, contact, supervisor, ahvnumber, comments, room, etc, illness, status, illergies);
    axios.post(baseurl + 'api/v1/resident-registeration', {
      firstName: fname,
      lastName: lname,
      contactPerson: contact,
      assignedSupervisor: supervisor,
      ahvNumber: ahvnumber,
      comments: comments,
      roomRegistration: room,
      etc: etc,
      illness: illness,
      civilStatus: status,
      allergies: illergies
    })
      .then((res) => {
        setModal(true)
        // console.log(res);
        setAhvnumber("");
        setComments("");
        setContact("");
        setEtc("");
        setFname("");
        setIllergies("");
        setIllness("");
        setLname("");
        setRoom("");
        setStatus("");
        setSupervisor("");
      })
      .catch((err) => {
        // console.log(err);
        setError(true)

      })


  }
  return (
    <div className="register">
      <p className="processbody-main-tag-title">Resident registration</p>
      <div>
        <div className="processbody-main-tag-input">
          <p className="processbody-main-tag-input-title">First name</p>
          <input type="text" onChange={(e) => setFname(e.target.value)} value={fname} className="processbody-theme-select" />
        </div>
        <div className="processbody-main-tag-input">
          <p className="processbody-main-tag-input-title">Last name</p>
          <input type="text" onChange={(e) => setLname(e.target.value)} value={lname} className="processbody-theme-select" />
        </div>
        <div className="register-flex">
          <div className="processbody-main-tag-input">
            <p className="processbody-main-tag-input-title">Contact person</p>
            <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="processbody-theme-select" />
          </div>
          <div className="processbody-main-tag-input">
            <p className="processbody-main-tag-input-title">AHV-number</p>
            <input type="number" onChange={(e) => setAhvnumber(e.target.value)} value={ahvnumber} className="processbody-theme-select" />
          </div>
        </div>
        <div className="processbody-main-tag-input">
          <p className="processbody-main-tag-input-title">
            Assigned supervisor
          </p>
          <input type="text" onChange={(e) => setSupervisor(e.target.value)} value={supervisor} className="processbody-theme-select" />
        </div>
        <div className="register-flex">
          <div className="processbody-main-tag-input">
            <p className="processbody-main-tag-input-title">Illness</p>
            <input type="text" onChange={(e) => setIllness(e.target.value)} value={illness} className="processbody-theme-select" />
          </div>
          <div className="processbody-main-tag-input">
            <p className="processbody-main-tag-input-title">Civil status</p>
            <input type="text" onChange={(e) => setStatus(e.target.value)} value={status} className="processbody-theme-select" />
          </div>
        </div>
        <div className="register-flex">
          <div className="processbody-main-tag-input">
            <p className="processbody-main-tag-input-title">Allergies</p>
            <input type="text" onChange={(e) => setIllergies(e.target.value)} value={illergies} className="processbody-theme-select" />
          </div>
          <div className="processbody-main-tag-input">
            <p className="processbody-main-tag-input-title">Etc</p>
            <input type="text" onChange={(e) => setEtc(e.target.value)} value={etc} className="processbody-theme-select" />
          </div>
        </div>
        <div className="register-flex">
          <div className="processbody-main-tag-input">
            <p className="processbody-main-tag-input-title">Comment</p>
            <input type="text" onChange={(e) => setComments(e.target.value)} value={comments} className="processbody-theme-select" />
          </div>
          <div className="processbody-main-tag-input">
            <p className="processbody-main-tag-input-title">
              Room registration
            </p>
            <input type="text" onChange={(e) => setRoom(e.target.value)} value={room} className="processbody-theme-select" />
          </div>
        </div>
      </div>
      <div className="maincreate-ressort-btn__scheduleteambodybtn">
        <button onClick={createResident} className="maincreate-ressort-btn btn">Create Resident</button>
      </div>
      <MAModal open={modal}
        close={() => setModal(false)}
        modalTitle="Create Team"
        innerContent={
          <Typography>Resident user has been created</Typography>
        }
        width="30%"
        modalFooter={<Box sx={{ marginTop: "3%" }}>
          <MAButton onClick={() => setModal(false)} label="Ok" className='btn-color' />
        </Box>} />
      <MAModal open={error}
        close={() => setError(false)}
        modalTitle="Error"
        innerContent={
          <Typography>Please Fill all forms field</Typography>
        }
        width="30%"
        modalFooter={<Box sx={{ marginTop: "3%" }}>
          <MAButton onClick={() => setError(false)} label="Ok" className='btn-color' />
        </Box>} />
    </div>
  );
};

export default Register;
