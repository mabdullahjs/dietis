import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MyContext } from "../../app/Context";
import baseurl from "../../app/apiMethods/apiMethod";
import { type ContextType } from "../../types/contextType";
import MAButton from "../my-components/MAButton";
import MAModal from "../my-components/MAModal";

interface Props {
  handleOnDrag: any
}

const TeamsSub: React.FC<Props> = (props: Props) => {
  const { selectUnassignLeaderHandler } = useContext(MyContext) as ContextType;
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState("");
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [teamLeader, setTeamLeader] = useState<any>(null);
  const [error, setError] = useState<any>("");

  const dataFromRedux = useSelector((a:any) => a.Leader);
  // console.log(dataFromRedux);


  useEffect(() => {
    if (shouldFetch) {
      axios.get(baseurl + 'api/v1/getTeamLeader')
        .then((res) => {
          const filter = res.data.filter((item: any, index: number) => {
            return item.assigned === false
          })
          console.log(res.data);
          
          setTeamLeader(filter);
          setShouldFetch(false)
        })
    }
  }, [shouldFetch])

  useEffect(()=>{
    setShouldFetch(true);
  } , [dataFromRedux])

  //create leader function
  const createLeader = () => {
    setLoading(true)
    axios.post(baseurl + 'api/v1/addTeamLeader', {
      name: names,
      assigned: false
    })
      .then(() => {
        setShouldFetch(true);
        setLoading(false);
        setModal(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Error Occured');
      })
  }




  return (
    <div className="sidebarsub">
      <p className="sidebarsub-title">Unassigned team leaders</p>
      {/* <p className="sidebarsub-item"  onClick={selectUnassignLeaderHandler}>
        Bock Irene
      </p> */}
      <MAButton onClick={() => setModal(true)} label='Create Team leader' />
      <Box sx={{ marginTop: '2rem', marginLeft: '6%' }}>
        {teamLeader ? teamLeader.length > 0 ? teamLeader.map((item: any, index: number) => {
          return <div
            className="team"
            key={index}
            draggable
            onDragStart={(e) => props.handleOnDrag(e, e.target , item)}
            style={{ padding: '1.2rem', borderRadius: '22px', lineHeight: '15%', margin: '10px 30px', width: '50%', fontSize: '12px', backgroundColor: 'rgba(177, 210, 236, 0.4)' }}
          >
            {item.name}
          </div>
        }) : <h1>No Team Leader Found</h1> : <h1>Loading...</h1>}
      </Box>

      <MAModal open={modal}
        close={() => setModal(false)}
        modalTitle="Create Team Leader"
        width='30%'
        innerContent={<Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField onChange={(e) => setNames(e.target.value)} sx={{ marginTop: "3rem", marginBottom: "3rem" }} id="filled-basic" label="Enter Name" variant="outlined" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <MAButton onClick={createLeader} loading={loading} label="Create Leader" />
          </Box>
            <Typography sx={{textAlign:'center' , marginTop:'1rem'}}>{error}</Typography>
        </Box>} />

      {/* <p className="sidebarsub-item" onDragStart={(e) => props.handleOnDrag(e, 'TeamA')}>
        Zbinden Sonja
      </p>
      <p className="sidebarsub-item" onClick={selectUnassignLeaderHandler}>
        Binder Ingo
      </p>
      <p className="sidebarsub-item" onClick={selectUnassignLeaderHandler}>
        Bock Irene
      </p>
      <p className="sidebarsub-item" onClick={selectUnassignLeaderHandler}>
        Zbinden Sonja
      </p>
      <p className="sidebarsub-item" onClick={selectUnassignLeaderHandler}>
        Binder Ingo
      </p>
      <p className="sidebarsub-item" onClick={selectUnassignLeaderHandler}>
        Bock Irene
      </p>
      <p className="sidebarsub-item" onClick={selectUnassignLeaderHandler}>
        Zbinden Sonja
      </p>
      <p className="sidebarsub-item" onClick={selectUnassignLeaderHandler}>
        Bock Irene
      </p> */}
    </div>
  );
};

export default TeamsSub;
