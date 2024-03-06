import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Specialty
export const fetchAppointment = createAsyncThunk('appAppointment/fetchData', async params => {
  const userData = window.localStorage.getItem("userData")

  const response = await axios.get(`https://medsys-backend.onrender.com/appointment/${params.date}/${params.doctorId}`, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(userData).token}`
    }
  })

  return response.data
})

export const fetchAppointmentByPatient = createAsyncThunk('appAppointmentPatient/fetchData', async params => {
  const userData = window.localStorage.getItem("userData")

  const response = await axios.get(`https://medsys-backend.onrender.com/appointment/patient/${JSON.parse(userData).id}`, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(userData).token}`
    }
  })

  return response.data
})

export const fetchAppointmentChekOut = createAsyncThunk('appAppointmentCheckOut/fetchData', async params => {
  const userData = window.localStorage.getItem("userData")

  const response = await axios.put(`https://medsys-backend.onrender.com/appointment/checkout/${params.id}`, {}, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(userData).token}`
    }
  })
  await dispatch(fetchAppointmentByPatient())

  return response.data
})

export const checkAppointment = createAsyncThunk('appCheckAppointment/fetchData', async params => {
  const userData = window.localStorage.getItem("userData")

  const response = await axios.post(`https://medsys-backend.onrender.com/appointment/check/${params.appointmentid}/${JSON.parse(userData).id}`, {}, {
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
    date: '',
    doctor: {},
    total: 0,
    params: {},
    allData: [],
    patient: []
  },
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchAppointment.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.data.length

      // state.params = action.payload.params
      state.allData = action.payload.data
    }),
      builder.addCase(fetchAppointmentByPatient.fulfilled, (state, action) => {
        state.patient = action.payload.data
      })
  }
})

export const { handleSelectedDoctor } = appDoctorSlice.actions

export default appDoctorSlice.reducer
