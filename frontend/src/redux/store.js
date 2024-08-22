import { configureStore } from '@reduxjs/toolkit'
import ValidateOrderSlice from './features/ValidateOrderSlice'
import UserProfileSlice from './features/UserProfileSlice'
import CompanyProfileSlice from './features/CompanyProfileSlice'

const store = configureStore({
 reducer: {
      ValidateOrder: ValidateOrderSlice,
      UserProfile : UserProfileSlice,
      CompanyProfile : CompanyProfileSlice
  },
}
)

export default store
