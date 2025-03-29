import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../store/slices/incdec"

export default configureStore({
  reducer: {
    counter:counterReducer
  }
})