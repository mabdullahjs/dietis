import { createSlice } from "@reduxjs/toolkit";

const dateForData = createSlice({
  name: "Date",
  initialState: {},
  reducers: {
    add(state, action) {
      state.date = (action.payload);
    }
    // remove(state, action) {
    //   let i = state.findIndex((x) => x.id == action.payload);
    //   if (i > -1) {
    //     state.splice(i, 1);
    //   }
    // },
  },
});

export const { add } = dateForData.actions;
export default dateForData.reducer;