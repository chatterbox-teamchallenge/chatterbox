import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userId?: string;
  username?: string;
  token?: string;
  avatar?: string | null;
  contacts?: any[];
  email?: string;
}

const initialState: UserState = {
  userId: '',
  username: '',
  token: '',
  avatar: null,
  contacts: [],
  email: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => initialState,
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;