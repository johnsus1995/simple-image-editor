import * as actions from "./actions";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface User {
  user: any | null;
  error: object;
  loading: boolean;
  userMedusaData: any;
}

const initialState: User = {
  user: {},
  error: {},
  loading: false,
  userMedusaData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logout: state => {
    //   state.user = null;
    // },
  },
  extraReducers: builder => {
    /******************LOGIN******************/
    builder.addCase(actions.login.pending.type, state => {
      state.loading = true;
    });
    builder.addCase(
      actions.login.fulfilled.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        // state.user = action?.payload?.customer;
        const user_token =
          action?.payload?.data?.access_token || "";
        if (action?.payload?.data?.access_token) {
          localStorage.setItem("user_token", user_token);
        }
        return;
      },
    );
    builder.addCase(
      actions.login.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action?.payload;
      },
    );
  },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
