import { createSlice } from "@reduxjs/toolkit";

export const ValidateOrderSlice = createSlice({
    name:'ValidateOrder',
    initialState: {
        validateOrder : null,
    },
    reducers: {
        setValidateOrder: (state, action) => {
            state.validateOrder = action.payload

        },
    }
})

export const {setValidateOrder} = ValidateOrderSlice.actions;
export default ValidateOrderSlice.reducer