import { createSlice } from "@reduxjs/toolkit";

const residentDetail = createSlice({
  name: "ResidentDetail",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    }
    // remove(state, action) {
    //   let i = state.findIndex((x) => x.id == action.payload);
    //   if (i > -1) {
    //     state.splice(i, 1);
    //   }
    // },
  },
});

export const { add } = residentDetail.actions;
export default residentDetail.reducer;