import { createSlice } from "@reduxjs/toolkit";

export const CompanyProfileSlice = createSlice({
    name:'CompanyProfile',
    initialState: {
        idv: "",
        name:"",
        firstname : "",
        lastname : "",
        email : "",
        phone : "",
        adress: "",
        siret: "",
        token: ""
    },
    reducers: {
        setCompanyProfile: (state, action) => {
            state.idv = action.payload.idv
            state.name = action.payload.name;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.siret = action.payload.siret;
            state.adress = action.payload.adress;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.token = action.payload.token;

        },
    }
})

export const {setCompanyProfile} = CompanyProfileSlice.actions;
export default CompanyProfileSlice.reducer