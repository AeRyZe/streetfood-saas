import { configureStore } from '@reduxjs/toolkit'
import ValidateOrderSlice from './features/ValidateOrderSlice'
import UserProfileSlice from './features/ValidateOrderSlice'

const store = configureStore({
 reducer: {
      ValidateOrder: ValidateOrderSlice,
      UserProfile : UserProfileSlice
  }
}
)

export default store
