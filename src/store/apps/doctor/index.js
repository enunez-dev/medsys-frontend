import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Specialty
export const fetchDoctorBySpecialty = createAsyncThunk('appDoctorSpecialty/fetchData', async params => {
  const userData = window.localStorage.getItem("userData")

  const response = await axios.get(`https://medsys-backend.onrender.com/doctor/specialty/${params.id}`, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(userData).token}`
    }
  })

  return response.data
})

export const appDoctorSlice = createSlice({
  name: 'appDoctor',
  initialState: {
    data: [],
    selected: {},
    total: 0,
    params: {},
    allData: []
  },
  reducers: {
    handleSelectedDoctor: (state, action) => {
      state.selected = state.data.find(item => item.id == action.payload.doctor)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchDoctorBySpecialty.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.data.length

      // state.params = action.payload.params
      state.allData = action.payload.data
    })
  }
})

export const { handleSelectedDoctor } = appDoctorSlice.actions

export default appDoctorSlice.reducer
