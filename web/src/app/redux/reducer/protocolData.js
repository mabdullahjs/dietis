import { createSlice } from "@reduxjs/toolkit";

const protocolData = createSlice({
  name: "Date",
  initialState: {},
  reducers: {
    add(state, action) {
      state.data = (action.payload);
    }
    // remove(state, action) {
    //   let i = state.findIndex((x) => x.id == action.payload);
    //   if (i > -1) {
    //     state.splice(i, 1);
    //   }
    // },
  },
});

export const { add } = protocolData.actions;
export default protocolData.reducer;