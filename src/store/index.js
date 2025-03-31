import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../store/slices/user"

export default configureStore({
  reducer: {
    user:userReducer
  }
})