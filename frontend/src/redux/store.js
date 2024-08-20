import { configureStore } from '@reduxjs/toolkit'
import ValidateOrderSlice from './features/ValidateOrderSlice'
import UserProfileSlice from './features/UserProfileSlice'

const store = configureStore({
 reducer: {
      ValidateOrder: ValidateOrderSlice,
      UserProfile : UserProfileSlice
  },
}
)

export default store
