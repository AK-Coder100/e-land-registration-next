import { createSlice } from '@reduxjs/toolkit';
import { redirect } from 'next/navigation';
// import { useRouter } from 'next/navigation';

const userSlice = createSlice({
  name: 'user',
  initialState: { 
        isLoggedin:false,
        data:{
            role:null, // 0:user, 1:clerk
        }
   },
  reducers: {
    login: (state, {payload}) => {
      state.isLoggedin = true
    },
    logout: (state,{payload}) => {
        // const router = useRouter()
        alert('loggedout')
        // redirect('/auth')
        // state.currentRoute = '/auth'
    }
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;