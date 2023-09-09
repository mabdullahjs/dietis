import { Box, TextField, Typography, } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import baseurl from '../../app/apiMethods/apiMethod';
import { add } from '../../app/redux/reducer/ResidentDetail';
import MAButton from "../my-components/MAButton";
import MAModal from "../my-components/MAModal";

interface Props {
  arrNumber: any
  title: string
  mainMenu: string
  items: any
  indexes: number
  val: string
  patientId: any
  handleShouldFetchFromChild: any
  onData: any
}

const Residents: React.FC<Props> = (props: Props) => {
  const { items, indexes } = props
  const [modal, setModal] = useState(false);
  const [depart, setDepart] = useState<any>(null);
  const [val, setVal] = useState<any>("");
  const [allTeamMembers, setallTeamMembers] = useState<any>([]);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [propsItem, setPropsItem] = useState<any>("");
  const [arrivalMorning, setArrivalMorning] = useState(false);
  const [arrivalNoon, setArrivalNoon] = useState(false);
  const [modalNotes, setModalNotes] = useState(false);
  const [patientNotes, setPatientNotes] = useState(false);

  //state for modals for send note
  const [note, setNote] = useState("");
  const [patientsModal, setPatientModal] = useState<any>(null);
  const [numberModal, setNumberModal] = useState(0);
  const [indexModal, setIndexModal] = useState(0);
  const [showEditForm, setShowEditForm] = useState<any>(false);

  //timing function
  const currentDateFunc: any = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }


  //useDispatch
  const dispatch = useDispatch()

  const [dates, setDates] = useState(currentDateFunc());

  //data from redux
  const dataFromRedux = useSelector((a: any) => a.Date);
  // console.log(dataFromRedux);


  useEffect(() => {
    if (dataFromRedux.date !== undefined) {
      setDates(dataFromRedux.date);
      console.log(dataFromRedux.date)
      setShouldFetch(true)
    }
  }, [dataFromRedux])


  useEffect(() => {
    const asyncFunc = async () => {
      if (shouldFetch) {
        // props.handleShouldFetchFromChild(true);
        setTimeout(() => {
          axios
            .get(baseurl + "api/v1/getDepartment")
            .then((res) => {
              setPropsItem(props.items);
              const members = res?.data[0]?.members;
              const teamsArray = members?.map(
                (items: { name: string; deprtment: string }, index: number) => {
                  return [];
                }
              );
              setallTeamMembers(teamsArray);
              // setDepart(res.data);
              setShouldFetch(false);

              axios.get(baseurl + 'api/v1/getDepartmentByTime', {
                params: {
                  date: dates // Format the date as YYYY-MM-DD
                }
              })
                .then((response) => {
                  console.log(response.data);
                  if (dates === currentDateFunc() && response.data.length > 0) {
                    axios.patch(baseurl + `api/v1/updateDepartmentByTime/${response.data[0]._id}`, {
                      depart: res.data
                    })
                      .then(() => {
                        axios.get(baseurl + 'api/v1/getDepartmentByTime', {
                          params: {
                            date: dates // Format the date as YYYY-MM-DD
                          }
                        })
                          .then((res) => {
                            setDepart(res.data[0].depart);
                            props.onData(res.data[0].depart)
                            console.log('resident console ===>', res.data[0].depart);

                          })
                      })

                  }
                  else if (dates === currentDateFunc()) {
                    axios.post(baseurl + 'api/v1/addDepartmentByTime', {
                      depart: res.data,
                      date: new Date(new Date().getTime() + (5 * 60 * 60 * 1000)).toISOString()
                    })

                  }
                  else {
                    if (response.data.length > 0 && response.data[0].depart.length > 0) {
                      setDepart(response.data[0].depart)
                      props.onData(response.data[0].depart)
                    }
                    else {
                      setDepart([]);
                      props.onData([])
                    }

                  }

                })

            })
            .catch((err) => {
              console.log(err);
            });
        }, 500)
      }
    }
    asyncFunc();

  }, [shouldFetch]);


  //component function
  function ButtonPair(props: any) {
    const { patient, number, index, propIndex, propItems } = props
    const [button1Value, setButton1Value] = useState(false);
    const [button2Value, setButton2Value] = useState(false);

    const changeTimeNoon = (e: any, patient: any, number: number, index: number) => {
      e.stopPropagation();
      const newValue = patient.arrivalNoon === false ? true : false;
      setButton1Value(newValue);
      const updateDepart = depart;
      updateDepart[propIndex].members[index].patient[number].arrivalNoon = newValue;
      setDepart(updateDepart);
      axios.patch(baseurl + `api/v1/updateDepartment/${propItems._id}`, {
        members: updateDepart[propIndex].members
      })
        .then((res) => {
          console.log('depart==>', res.data)
          const reduxDepart = depart
          const updatePatientIds = res.data.members[index].patient[number].id
          axios.patch(baseurl + `api/v1/updatePatient/${patient.id}`, {
            arrivalNoon: newValue,
            arrivalMorning: false
          })
            .then((res) => {
              axios.patch(baseurl + `api/v1/updatePatient/${updatePatientIds}`, {
                assigned: false
              })
              dispatch(
                add({
                  data: reduxDepart
                })
              );

              let updatedDeparts = depart;
              let updateDepartCopy = JSON.parse(JSON.stringify(updatedDeparts));
              let result = updateDepartCopy[indexes].members[index].patient;
              let resultArr = [...result];
              resultArr.splice(number, 1);

              updateDepartCopy[indexes].members[index].patient = resultArr;

              // console.log('removepatient===>', resultArr);
              // console.log('depart ==>', depart);
              // console.log('updateDepartCopy ==>', updateDepartCopy);
              setDepart(updateDepartCopy)

              axios.patch(baseurl + `api/v1/updatedepartment/${props.propItems._id}`, {
                members: updateDepartCopy[indexes].members
              })

              console.log(res.data);
              setShouldFetch(true)
            })
        })
    }

    const changeTimeMorning = (e: any, patient: any, number: number, index: number) => {
      e.stopPropagation();
      const newValue = patient.arrivalMorning === false ? true : false;
      setButton2Value(newValue);
      const updateDepart = depart;
      updateDepart[propIndex].members[index].patient[number].arrivalMorning = newValue;
      setDepart(updateDepart);
      axios.patch(baseurl + `api/v1/updateDepartment/${propItems._id}`, {
        members: updateDepart[propIndex].members
      })
        .then((res) => {
          // console.log(index)
          console.log('depart==>', res.data)
          console.log('originalDepart===>', depart[indexes])
          // let updatedDepart = depart[indexes]
          let reduxDepart = depart
          let updatePatientIds = res.data.members[index].patient[number].id
          axios.patch(baseurl + `api/v1/updatePatient/${patient.id}`, {
            arrivalMorning: newValue,
            arrivalNoon: false
          })
            .then((res) => {
              axios.patch(baseurl + `api/v1/updatePatient/${updatePatientIds}`, {
                assigned: false
              })
              dispatch(
                add({
                  data: reduxDepart
                })
              );

              let updatedDeparts = depart;
              let updateDepartCopy = JSON.parse(JSON.stringify(updatedDeparts));
              let result = updateDepartCopy[indexes].members[index].patient;
              let resultArr = [...result];
              resultArr.splice(number, 1);

              updateDepartCopy[indexes].members[index].patient = resultArr;

              // console.log('removepatient===>', resultArr);
              // console.log('depart ==>', depart);
              // console.log('updateDepartCopy ==>', updateDepartCopy);
              setDepart(updateDepartCopy)

              axios.patch(baseurl + `api/v1/updatedepartment/${props.propItems._id}`, {
                members: updateDepartCopy[indexes].members
              })
              // console.log(props.propItems._id)

              console.log(res.data);
              setShouldFetch(true)
            })
        })
    }

    return (
      <div
        onClick={() => openModal(patient, number, index)}
        className="scheduleteambody-card-resident"
        key={number}
      >
        <p onClick={(e) => changeTimeMorning(e, patient, number, index)} style={{ background: patient.arrivalMorning === true ? '#61b273' : '#f6f5ff' }} className="sidebarsub-resident-first">V</p>
        <p style={{ display: 'flex', justifyContent: "center" }}><p>{patient.name.substring(1, patient.name.length - 1)}</p><div style={{ borderRadius: '50%', width: '10px', height: '10px', backgroundColor: 'yellow', display: patient.notes === undefined ? 'none' : 'block' }}></div></p>
        <p onClick={(e) => changeTimeNoon(e, patient, number, index)} style={{ background: patient.arrivalNoon === true ? '#61b273' : '#f6f5ff' }} className="sidebarsub-resident-first sidebarsub-resident-first__last">  N
        </p>
      </div>
    );
  }







  //drag and drop logic
  function handleOnDrag(e: any, teamType: string) {
    e.dataTransfer.setData("teamType", teamType);
    setVal(e.target.textContent);
  }


  function handleOnDrop(
    e: React.DragEvent,
    item: any,
    index: number,
  ) {

    if (dates === currentDateFunc()) {
      console.log('patient-item==>', props.val);
      const copyOfDepart = depart
      copyOfDepart[props.indexes].members[index].patient.push({
        name: props.val, id: props.patientId._id,
        arrivalMorning: arrivalMorning, arrivalNoon: arrivalNoon
      });
      setDepart(copyOfDepart);
      setShouldFetch(true);
      console.log('copy0fDepart==>', copyOfDepart[props.indexes].members[index].patient);
      axios.patch(baseurl + `api/v1/updateDepartment/${props.items._id}`, {
        members: copyOfDepart[props.indexes].members
      })
        .then((res) => {
          axios.patch(baseurl + `api/v1/updateTeam/${item._id}`, {
            patient: copyOfDepart[props.indexes].members[index].patient
          })
            .then(() => {
              axios.patch(baseurl + `api/v1/updatePatient/${props.patientId._id}`, {
                assigned: true
              })
                .then(() => {
                  // console.log(res.data);
                  setShouldFetch(true);
                  // console.log('342==>' , res.data);
                  dispatch(
                    add({
                      data: res.data
                    })
                  );
                })
              console.log('patientid===>', props.patientId);
            })
        })
        .catch((err) => {
          console.log(err);

        })
    }
    else {
      alert('Schedule is only allowed for current day.')
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  //openModal for note
  const openModal = (patients: any, number: number, index: number) => {
    if (patients.notes === undefined) {
      setPatientModal(patients);
      setNumberModal(number);
      setIndexModal(index);
      setModal(true);
    }
    else {
      setPatientNotes(patients.notes);
      setPatientModal(patients);
      // console.log(patients.notes)
      setModalNotes(true);

    }
  }


  //send note function
  const sendNote = () => {
    const updateDepart = depart;
    updateDepart[props.indexes].members[indexModal].patient[numberModal].notes = note;
    console.log(updateDepart[props.indexes].members[indexModal].patient[numberModal]);
    setDepart(updateDepart);
    console.log(updateDepart[props.indexes].members[indexModal].patient[numberModal]);
    axios.patch(baseurl + `api/v1/updateDepartment/${props.items._id}`, {
      members: updateDepart[props.indexes].members
    })
      .then(() => {
        axios.patch(baseurl + `api/v1/updatePatient/${patientsModal.id}`, {
          notes: note
        })
          .then((res) => {
            console.log(res.data);
            setShouldFetch(true)
            setModal(false);
          })
      })
  }

  //delete note function
  const deleteNote = () => {
    const updateDepart = depart;
    updateDepart[props.indexes].members[indexModal].patient[numberModal].notes = undefined;
    console.log(updateDepart[props.indexes].members[indexModal].patient[numberModal]);
    setDepart(updateDepart);
    console.log(updateDepart[props.indexes].members[indexModal].patient[numberModal]);
    axios.patch(baseurl + `api/v1/updateDepartment/${props.items._id}`, {
      members: updateDepart[props.indexes].members
    })
      .then(() => {
        axios.patch(baseurl + `api/v1/updatePatient/${patientsModal.id}`, {
          notes: null
        })
          .then((res) => {
            console.log(res.data);
            setShouldFetch(true)
            setModalNotes(false);
          })
      })
  }

  //update note function
  const updateNote = () => {
    const updateDepart = depart;
    updateDepart[props.indexes].members[indexModal].patient[numberModal].notes = note;
    console.log(updateDepart[props.indexes].members[indexModal].patient[numberModal]);
    setDepart(updateDepart);
    console.log(updateDepart[props.indexes].members[indexModal].patient[numberModal]);
    axios.patch(baseurl + `api/v1/updateDepartment/${props.items._id}`, {
      members: updateDepart[props.indexes].members
    })
      .then(() => {
        axios.patch(baseurl + `api/v1/updatePatient/${patientsModal.id}`, {
          notes: note
        })
          .then((res) => {
            console.log(res.data);
            setShouldFetch(true);
            setModalNotes(false);
            setShowEditForm(false);
          })
      })
  }
  return (
    <>
      {depart && depart.length > 0 ? (
        <div className="scheduleteambody">
          <p className="scheduleteambody-title">{items.name}</p>
          <div className="scheduleteambody-card-wrapper">
            {depart != null ? (
              depart.length < 1 ? (
                <h1 style={{ marginTop: "1rem" }}></h1>
              ) : (
                depart[indexes].members ? (
                  depart[indexes].members?.map((item: any, index: number) => (
                    <div
                      className="scheduleteambody-card scheduleteambody-card__container"
                      onDrop={(e) => handleOnDrop(e, item, index)}
                      onDragOver={handleDragOver}
                      key={index}
                    >
                      <p className="scheduleteambody-card-resident-title">
                        {item.name}
                      </p>
                      {item.patient ? (
                        item.patient.map((patients: any, number: number) => {
                          return (
                            <div key={patients.name}>
                              <ButtonPair patient={patients} number={number} index={index} propIndex={props.indexes} propItems={props.items} />
                            </div>
                          );
                        })
                      ) : (
                        <h1>Loading...</h1>
                      )}
                    </div>
                  ))
                ) : (
                  <h1>Loading...</h1>
                )
              )
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      ) : (
        <h1></h1>
      )}
      <MAModal
        width="400px"
        open={modal}
        close={() => setModal(false)}
        modalTitle="Send Note"
        innerContent={
          <Box>
            <TextField onChange={(e) => setNote(e.target.value)} sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} id="filled-basic" label="Enter Note" variant="outlined" /> <br /><br />
            <MAButton label='Save' onClick={sendNote} />
          </Box>
        }
      />
      <MAModal
        width="400px"
        open={modalNotes}
        close={() => setModalNotes(false)}
        modalTitle="Note"
        innerContent={
          <Box>
            <Typography>{patientNotes}</Typography> <br />
            <TextField onChange={(e) => setNote(e.target.value)} sx={{ marginTop: "0.1rem", marginBottom: "0.1rem", display: showEditForm === true ? 'block' : 'none' }} id="filled-basic" label="Enter Updated Note" variant="outlined" /><br /><br />
            <MAButton label='Close' onClick={() => setModalNotes(false)} />
            <MAButton label='Delete' onClick={() => deleteNote()} />
            <MAButton label='Edit' onClick={() => showEditForm === true ? updateNote() : setShowEditForm(showEditForm === true ? false : true)} />
          </Box>
        }
      />

    </>
  );
};

export default Residents;