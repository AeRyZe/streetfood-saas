import { createSlice } from "@reduxjs/toolkit";

export const UserProfileSlice = createSlice({
    name:'UserProfile',
    initialState: {
        firstname : "",
        lastname : "",
        email : "",
        phone : "",
        token: ""
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.token = action.payload.token;

        },
    }
})

export const {setUserProfile} = UserProfileSlice.actions;
export default UserProfileSlice.reducer