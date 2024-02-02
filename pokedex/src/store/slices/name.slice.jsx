import { createSlice } from "@reduxjs/toolkit";
export const nameSlice = createSlice({
  name: "name", 
  initialState: "",
  reducers: {
    changeName: (state, action) => {
      const userName = action.payload;
      return userName;
    }
  }
});

 export const { changeName } = nameSlice.actions; //2do exportamos

export default nameSlice.reducer;
