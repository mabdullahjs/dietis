import { configureStore } from "@reduxjs/toolkit";
import ResidentDetail from "../reducer/ResidentDetail";
import dateForData from "../reducer/dateForData";
import teamLeader from '../reducer/leaderDetail';
import protocolData from "../reducer/protocolData";
import teamLeaderDrop from "../reducer/teamLeader";

const store = configureStore({
  reducer: {
    Leader: teamLeader,
    Resident: ResidentDetail,
    Date: dateForData,
    Protocol: protocolData,
    TeamLeaderDrop:teamLeaderDrop
  },
});

export default store;