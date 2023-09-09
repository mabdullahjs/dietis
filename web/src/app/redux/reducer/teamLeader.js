import { createSlice } from "@reduxjs/toolkit";

const teamLeaderforDrop = createSlice({
  name: "TeamLeaderforDrop",
  initialState: {
    leader:{}
  },
  reducers: {
    add(state, action) {
      state.leader = action.payload;
    }
  },
});

export const { add } = teamLeaderforDrop.actions;
export default teamLeaderforDrop.reducer;