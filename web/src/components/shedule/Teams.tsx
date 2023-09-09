import DeleteIcon from "@mui/icons-material/Delete";
import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseurl from "../../app/apiMethods/apiMethod";
import { add } from "../../app/redux/reducer/leaderDetail";
import Plus from "../../assets/images/plus.svg";
import MAButton from "../my-components/MAButton";
import MAModal from "../my-components/MAModal";

interface Props {
  arrNumber: any;
  title: string;
  mainMenu: string;
  val: string;
  TeamLeaderDetail: any
}

const Teams: React.FC<Props> = (props: Props) => {
  //state
  const [modal, setModal] = useState(false);
  const [depart, setDepart] = useState<any>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState("");
  const [departdata, setDepartdata] = useState<any>("");
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTeamModal, setDeleteTeamModal] = useState(false);
  const [uid, setUid] = useState<any>("");
  const [teamUid, setTeamUid] = useState("");
  const [allTeamMembers, setallTeamMembers] = useState<any>([]);
  const [deleteMembers, setDeleteMembers] = useState<any>(null);

  const currentDateFunc = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  const [dates, setDates] = useState(currentDateFunc());



  //open modal for create team
  const openModal = (item: any) => {
    // console.log(item);
    setDepartdata(item);
    setModal(true);
  };
  //data from redux
  const dataFromRedux = useSelector((a: any) => a.Date);
  const teamLeaderFromRedux = useSelector((a: any) => a.TeamLeaderDrop);
  // console.log(dataFromRedux);


  useEffect(() => {
    if (dataFromRedux.date !== undefined) {
      setDates(dataFromRedux.date);
      setShouldFetch(true)
    }
  }, [dataFromRedux])
  // setDate(dataFromRedux);



  //redux hook useDispatch
  const dispatch = useDispatch();

  //useEffect for get depart

  useEffect(() => {
    if (shouldFetch) {
      //get todays date
      axios
        .get(baseurl + "api/v1/getDepartment")
        .then((res) => {

          const members = res?.data[0]?.members;
          const teamsArray = members?.map(
            (items: { name: string; deprtment: string }, index: number) => {
              return [];
            }
          );
          setallTeamMembers(teamsArray);
          // setDepart(res.data);
          console.log(dates);

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
                        // console.log('if chal rha ha bhai')
                      })
                  })
              }
              else if (dates === currentDateFunc() && response.data.length < 1) {
                axios.post(baseurl + 'api/v1/addDepartmentByTime', {
                  depart: res.data,
                  date: new Date(new Date().getTime() + (5 * 60 * 60 * 1000)).toISOString()
                })
                  .then((resPost) => {
                    console.log(resPost);
                    console.log(currentDateFunc())
                    // setDepart(resPost);
                    axios.get(baseurl + 'api/v1/getDepartmentByTime', {
                      params: {
                        date: dates // Format the date as YYYY-MM-DD
                      }
                    })
                      .then((res) => {
                        setDepart(res.data[0].depart)
                      })


                  })
                // console.log('elseif chal rha ha bhai')
              }
              else {
                if (response.data.length > 0 && response.data[0].depart.length > 0) {
                  // setDepart(response.data[0].depart)
                  // console.log('data ha bhaai ====> ' , response.data[0].depart);
                  setDepart(response.data[0].depart)

                }
                else {
                  // console.log('data nahi ha bhaai ====> ' , response.data);
                  // console.log('data nhi ha ====> ' , response.data);
                  setDepart([]);
                }

              }

            })
            .catch((err) => {
              console.log(err);

            })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [shouldFetch]);

  //create team Function
  const createTeam = () => {
    if (dates === currentDateFunc()) {
      setLoading(true);
      axios
        .post(baseurl + "api/v1/addTeam", {
          name: name,
          department: departdata._id
        })
        .then((res) => {
          axios.patch(
            baseurl + `api/v1/updateDepartment/${departdata._id}`,
            {
              members: [...departdata.members, res.data.team]
            }
          );
          console.log(res.data);
          setLoading(false);
          setModal(false);
          setShouldFetch(true);
        })
        .catch(() => {
          setLoading(false);
          setInvalid("Please fill the form correctly");
        });
    }
    else {
      alert('Create team is only available for that day.')
    }
  };

  //delete depart function
  const deleteDepart = () => {
    if (dates === currentDateFunc()) {
      axios
        .delete(baseurl + `api/v1/deleteDepartment/${uid._id}`)
        .then(() => {
          uid.members?.map(async (team: any) => {
            return axios.delete(baseurl + `api/v1/deleteTeam/${team._id}`)
              .then(() => {
                console.log('team-deleted');
              })
              .catch(() => {
                console.log('no team error');
              })
          })
          uid.members?.map((item: any, index: number) => {
            return item.members?.map(async (members: any, index: number) => {
              return axios.patch(baseurl + `api/v1/updateTeamLeader/${members._id}`, {
                assigned: false
              })
                .then(() => {
                  console.log('depart Team ===> updated')
                  window.location.reload()
                })
                .catch(() => {
                  console.log('error occured====> error');

                })
            })
          })
          uid.members?.map((item: any, index: number) => {
            return item.patient?.map((members: any, index: number) => {
              return axios.patch(baseurl + `api/v1/updatePatient/${members._id}`, {
                assigned: false
              })
                .then(() => {
                  console.log('depart patient ===> updated')
                })
                .catch(() => {
                  console.log('error occured====> error');

                })
            })
          })
          setShouldFetch(true);
          setDeleteModal(false);
        })
        .catch((err) => {
          console.log(err);

        })
      console.log('deletedepartitem========>', uid)
    }
    else {
      alert('Delete is only available for that day')
    }
  };

  // Open delete depart modal function

  const openDeleteModal = (item: any, e: any) => {
    e.stopPropagation();
    setUid(item);
    setDeleteModal(true);
  };

  //delete team function
  const deleteTeam = () => {
    if (dates === currentDateFunc()) {
      Promise.all(
        deleteMembers.members.map((item: any) => {
          return axios.patch(baseurl + `api/v1/updateTeamLeader/${item._id}`, {
            assigned: false
          });
        })
      )
        .then(() => {
          console.log('teamleader edited');
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(deleteMembers);
      Promise.all(
        deleteMembers.patient.map((item: any) => {
          return axios.patch(baseurl + `api/v1/updatePatient/${item._id}`, {
            assigned: false
          });
        })
      )
        .then(() => {
          console.log('patient edited');
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .delete(baseurl + `api/v1/deleteTeam/${teamUid}`)
        .then((res) => {
          axios.get(baseurl + `api/v1/getTeam/${uid}`).then((res) => {
            axios
              .patch(baseurl + `api/v1/updateDepartment/${uid}`, {
                members: [...res.data]
              })
              .then(() => {
                setShouldFetch(true);
                setDeleteTeamModal(false);
                window.location.reload();
              });
            console.log(res.data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      alert('Delete is only available for that day');
    }
  };

  // Open delete depart modal function

  const openDeleteTeamModal = (item: any, items: any) => {
    console.log('deleteModalitem====>', item)
    setDeleteMembers(item)
    console.log('deleteModalitems====>', items)
    setUid(items._id);

    setTeamUid(item._id);
    setDeleteTeamModal(true);
  };

  //drag and drop logic
  function handleOnDrag(e: any, teamType: string) {
    e.dataTransfer.setData("teamType", teamType);

  }

  function handleOnDrop(
    e: React.DragEvent,
    items: any,
    index: number,
    item: any,
    indexes: number
  ) {
    if (dates === currentDateFunc()) {

      const copyOfDepart = depart
      const teamLeader = teamLeaderFromRedux.leader
      copyOfDepart[indexes].members[index].members.push(teamLeader)
      setDepart(copyOfDepart)
      setShouldFetch(true);

      axios.patch(baseurl + `api/v1/updateDepartment/${items._id}`, {
        members: copyOfDepart[indexes].members
      })
        .then((res) => {
          axios.patch(baseurl + `api/v1/updateTeam/${item._id}`, {
            members: copyOfDepart[indexes].members[index].members
          })
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);

        })
      axios.patch(baseurl + `api/v1/updateTeamLeader/${props.TeamLeaderDetail._id}`, {
        assigned: true
      })
        .then((res) => {
          setShouldFetch(true);
          dispatch(
            add({
              data: res.data
            })
          );
        })
    }
    else {
      alert('Members is assigned to current dates only')
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <>
      {depart != null ? (
        depart.length < 1 ? (
          <h1 style={{ marginTop: "1rem" }}>No Resort Found</h1>
        ) : (
          depart?.map(
            (items: { name: string; members: [] }, indexes: number) => {
              return (
                <div key={indexes} className="scheduleteambody">
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="scheduleteambody-title">{items.name}</p>
                    <DeleteIcon onClick={(e) => openDeleteModal(items, e)} />
                  </Box>
                  <div className="scheduleteambody-card-wrapper">
                    {items.members.map((item: any, index: number) => {

                      return (
                        <Box sx={{
                          // display: 'flex',
                          // flexDirection: 'column',
                          // justifyContent: 'space-between',
                          // height: '100%',
                        }}
                          onDrop={(e) => handleOnDrop(e, items, index, item, indexes)}
                          onDragOver={handleDragOver} key={index} className="scheduleteambody-card">
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              paddingBottom: "20px",
                              textAlign: "center"
                            }}
                          >
                            {item.name}
                          </Typography>
                          <div>

                            {item?.members ? (
                              item?.members.map(
                                (item: any, index: number) => {
                                  return (
                                    <p
                                      key={index}
                                      className="scheduleteambody-card-para"
                                    >
                                      {item.name}
                                    </p>
                                  );
                                }
                              )
                            ) : (
                              <h1></h1>
                            )}
                            <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                              <MAButton
                                onClick={() => openDeleteTeamModal(item, items)}
                                size="small"
                                color="error"
                                label="delete"
                              />
                            </Box>
                          </div>
                        </Box>
                      );
                    })}
                    <div
                      onClick={() => openModal(items)}
                      style={{
                        backgroundColor: "#ebebf9",
                        padding: "2rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "10%",
                        height: "50%"
                      }}
                    >
                      <img src={Plus} alt="" />
                    </div>
                  </div>
                </div>
              );
            }
          )
        )
      ) : (
        <p>Loading...</p>
      )}
      {/* {depart ? depart.map((item: any, index: number) => {
        return <div>{item.name}</div>
      }) : <h1>Loading...</h1>} */}
      <MAModal
        open={modal}
        close={() => setModal(false)}
        modalTitle="Create Team"
        innerContent={
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            label="Team Name"
            sx={{ marginTop: "1rem" }}
          />
        }
        width="30%"
        modalFooter={
          <Box sx={{ marginTop: "3%" }}>
            <MAButton
              loading={loading}
              onClick={createTeam}
              label="Ok"
              className="btn-color"
            />
            <MAButton
              onClick={() => setModal(false)}
              color="warning"
              label="Cancel"
            />
            <Typography
              sx={{ textAlign: "center", color: "red", marginTop: "1rem" }}
            >
              {invalid}
            </Typography>
          </Box>
        }
      />
      <MAModal
        width="400px"
        open={deleteModal}
        close={() => setDeleteModal(false)}
        modalTitle="Delete Department"
        innerContent={
          <Box>
            <Typography>Are you sure you want to delete Department?</Typography>
            <MAButton
              onClick={() => deleteDepart()}
              className="m-2"
              color="error"
              label="Yes"
            />
            <MAButton onClick={() => setDeleteModal(false)} label="No" />
          </Box>
        }
      />
      <MAModal
        width="400px"
        open={deleteTeamModal}
        close={() => setDeleteTeamModal(false)}
        modalTitle="Delete Team"
        innerContent={
          <Box>
            <Typography>Are you sure you want to delete Team?</Typography>
            <MAButton
              onClick={() => deleteTeam()}
              className="m-2"
              color="error"
              label="Yes"
            />
            <MAButton onClick={() => setDeleteTeamModal(false)} label="No" />
          </Box>
        }
      />
    </>
  );
};

export default Teams;