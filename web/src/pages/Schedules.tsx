import { Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { MyContext } from "../app/Context";
import baseurl from '../app/apiMethods/apiMethod';
import { add } from '../app/redux/reducer/teamLeader';
import HeaderSidebar from "../components/HeaderSidebar";
import MAButton from '../components/my-components/MAButton';
import MAModal from "../components/my-components/MAModal";
import Employees from "../components/shedule/Employees";
import Residents from '../components/shedule/Residents';
import ScheduleTop from "../components/shedule/ScheduleTop";
import Teams from "../components/shedule/Teams";
import ResidentSub from "../components/sidebarSub/ResidentSub";
import TeamsSub from "../components/sidebarSub/TeamsSub";
import { type ContextType } from "../types/contextType";

const Process: React.FC = () => {
  //state for modal
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState("");
  const [depart, setDepart] = useState<any>(null);
  const [val, setVal] = useState<any>("");
  const [val2, setVal2] = useState<any>("");
  const [PatientId, setPatientId] = useState("")
  const [teamLeaderDetail, setTeamLeaderDetail] = useState<any>("")
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);



  //set depart by date
  const handleData = (data: any) => {
    console.log('send data ===>', data);
    if (data.length < 1) {
      setDepart(['empty'])
    }
    else {
      setDepart(data);
    }
    // setShouldFetch(true);
  };

  const { mainMenu, selectLeader } = useContext(MyContext) as ContextType;


  //open modal for create resort
  const openModal = () => {
    setModal(true);
  }

  //useDispatch for redux
  const dispatch = useDispatch();

  //useEffect for get depart
  useEffect(() => {
    if (shouldFetch) {
      axios.get(baseurl + 'api/v1/getDepartment')
        .then((res) => {
          // console.log(res.data);
          setDepart(res.data);
          console.log('schedule console====>', res.data);
          setShouldFetch(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [shouldFetch])

  //create resort
  const createResort = () => {
    setLoading(true);
    axios.post(baseurl + 'api/v1/addDepartment', {
      name: name
    })
      .then(() => {
        setLoading(false);
        setModal(false);
        window.location.reload();
      })
      .catch(() => {
        setLoading(false)
        setInvalid("Please fill the form correctly")
      })
  }

  //drag drop 
  // function handleOnDrag(e: any, teamType: string , patient:any) {
  //   e.dataTransfer.setData("teamType", teamType)
  //   setVal(patient.name);
  //   setPatientId(patient)
  //   setTeamLeaderDetail(patient)
  // }
  function handleOnDrag(e: any, teamType: string, patient: any) {
    e.dataTransfer.setData("teamType", teamType)
    setVal(e.target.textContent);
    setPatientId(patient)
  }
  // function handleOnDragtwo(e: any, patientType: any) {
  //   e.dataTransfer.setData("patientType", patientType)
  //   setVal2(e.target.textContent);
  //   console.log(setVal2);
  //   console.log('abc');


  // }

  function handleOnDragtwo(e: any, itemName: any, item: any) {
    e.dataTransfer.setData("patientType", item)
    setVal(e.target.textContent);
    console.log(item);
    setTeamLeaderDetail(item);
    dispatch(
      add(item)
    )
    // console.log('abc');
  }

  const handleShouldFetchFromChild = (data: boolean) => {
    setShouldFetch(data);
  };

  return (
    <div>
      <HeaderSidebar headerMenuShow={true}>
        <div className="process-page-body-container">
          {mainMenu === "Residents" && <ResidentSub func={handleOnDrag} />}
          {mainMenu === "Teams" && <TeamsSub handleOnDrag={handleOnDragtwo} />}
          <div className="sheduleteam container">
            {(mainMenu === "Residents" || mainMenu === "Teams") && (
              <ScheduleTop />
            )}
            {mainMenu === "Residents" && (
              <>
                {/* <Residents
                  arrNumber={[1,2,3,4,5,6,7,8,9]}
                  title="Ressort Gardening"
                  mainMenu={mainMenu}
                /> */}
                {/* {depart != null ? (
                  depart.length < 0 ? (
                    <h1 style={{ marginTop: '1rem' }}>No Resort Found</h1>
                  ) : (
                    depart.map((item: any, index: number) => {
                      return <Residents
                        arrNumber={[1, 2, 3]}
                        handleShouldFetchFromChild={handleShouldFetchFromChild}
                        title={item.name}
                        mainMenu={mainMenu}
                        items={item}
                        indexes={index}
                        val={val}
                        patientId={PatientId}
                        onData={handleData}
                      />
                    })
                  )
                ) : (
                  <p>Loading...</p>
                )} */}
                {depart && depart.length > 0 ? (
                  depart.map((item: any, index: number) => {
                    return (
                      <Residents
                        arrNumber={[1, 2, 3]}
                        handleShouldFetchFromChild={handleShouldFetchFromChild}
                        title={item.name}
                        mainMenu={mainMenu}
                        items={item}
                        indexes={index}
                        val={val}
                        patientId={PatientId}
                        onData={handleData}
                        
                      />
                    );
                  })
                ) : (
                  <h1></h1>
                )}
                <p>{ depart && depart[0] === 'empty' ? 'No resort Found' : ''}</p>
              </>
            )}

            {mainMenu === "Teams" && (
              <>
                <Teams
                  arrNumber={[1, 3, 4]}
                  title="Landscape Gardening Department"
                  mainMenu={mainMenu}
                  val={val}
                  TeamLeaderDetail={teamLeaderDetail}
                />
                <div className="maincreate-ressort-btn__scheduleteambodybtn">
                  <button onClick={() => setModal(true)} className="maincreate-ressort-btn btn">
                    Create Ressort
                  </button>
                </div>
                {selectLeader && (
                  <Teams
                    arrNumber={[1]}
                    title="Butcher's department"
                    mainMenu={mainMenu}
                    val={val}
                    TeamLeaderDetail={teamLeaderDetail}
                  />
                )}
                <MAModal open={modal}
                  close={() => setModal(false)}
                  modalTitle="Create Ressort"
                  innerContent={
                    <TextField value={name} onChange={(e) => setName(e.target.value)} variant="outlined" label="Resort Name" sx={{ marginTop: '1rem' }} />
                  }
                  width="30rem"
                  modalFooter={<Box sx={{ marginTop: "3%" }}>
                    <MAButton loading={loading} onClick={createResort} label="Ok" className='btn-color' />
                    <MAButton onClick={() => setModal(false)} color='warning' label="Cancel" />
                    <Typography sx={{ textAlign: "center", color: "red", marginTop: "1rem" }}>{invalid}</Typography>
                  </Box>}
                />
              </>
            )}
            {mainMenu === "Employees" && <Employees />}
          </div>
        </div>
      </HeaderSidebar>
    </div>
  );
};

export default Process;