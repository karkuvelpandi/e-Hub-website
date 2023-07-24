import { createSlice } from "@reduxjs/toolkit";

const visibilitySlice = createSlice({
  name: "visibility",
  initialState: {
    authModalVisibility: "hidden",
  },
  reducers: {
    setAuthModalVisibility: (state, action) => {
      return {
        ...state,
        authModalVisibility: action.payload.visibility,
      };
    },
  },
  extraReducers(builder) {},
});

export const { setAuthModalVisibility } = visibilitySlice.actions;
export default visibilitySlice.reducer;
