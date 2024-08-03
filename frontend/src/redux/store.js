import { configureStore } from '@reduxjs/toolkit'
import ValidateOrderSlice from './features/ValidateOrderSlice'

const store = configureStore({
 reducer: {
      ValidateOrder: ValidateOrderSlice
  }
}
)

export default store
