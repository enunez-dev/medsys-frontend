import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Specialty
export const fetchSpecialties = createAsyncThunk('appSpecialty/fetchData', async params => {
  const userData = window.localStorage.getItem("userData")

  const response = await axios.get('https://medsys-backend.onrender.com/specialty', {
    headers: {
      'Authorization': `Bearer ${JSON.parse(userData).token}`
    }
  })

  return response.data
})

export const appSpecialtySlice = createSlice({
  name: 'appSpecialty',
  initialState: {
    data: [],
    selected: {},
    total: 0,
    params: {},
    allData: []
  },
  reducers: {
    handleSelectedSpecialty: (state, action) => {
      state.selected = state.data.find(item => item.id == action.payload.specialty)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchSpecialties.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.data.length

      // state.params = action.payload.params
      state.allData = action.payload.data
    })
  }
})

export const { handleSelectedSpecialty } = appSpecialtySlice.actions

export default appSpecialtySlice.reducer
