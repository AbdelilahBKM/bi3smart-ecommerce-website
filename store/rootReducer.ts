// rootReducer.ts
export interface RootState {
  auth: {
    isAuthenticated: boolean;
    token: {
      client_id: number,
      access: string,
      refresh: string
    };
  };
}
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;

