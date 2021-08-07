import { configureStore } from '@reduxjs/toolkit'
import keywordsReducer from '../features/keywords/keywordsSlice'

export default configureStore({
  reducer: {
      keywords: keywordsReducer
  }
})