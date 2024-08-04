import { createSlice } from "@reduxjs/toolkit";

export const UserProfileSlice = createSlice({
    name:'UserProfile',
    initialState: {
        firstname : "",
        lastname : "",
        email : "",
        phone : ""
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.firstname = action.payload
            state.lastname = action.payload
            state.email = action.payload
            state.phone = action.payload

        },
    }
})

export const {setUserProfile} = UserProfileSlice.actions;
export default UserProfileSlice.reducer