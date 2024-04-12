// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: {
    client_id: number;
    access: string;
    refresh: string;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: {
    client_id: 0,
    access: '',
    refresh: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{client_id:number; access: string; refresh: string }>) {
      state.isAuthenticated = true;
      state.token.client_id = action.payload.client_id;
      state.token.access = action.payload.access;
      state.token.refresh = action.payload.refresh;
      console.log(state.token.client_id)
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token.client_id = 0;
      state.token.access = '';
      state.token.refresh = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
