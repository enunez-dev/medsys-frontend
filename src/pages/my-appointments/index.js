// ** MUI Imports
import { useEffect } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { format } from "date-fns";

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAppointmentByPatient,
  fetchAppointmentChekOut
} from 'src/store/apps/appointment'

const MyAppointments = () => {
  const dispatch = useDispatch()
  const storeAppointment = useSelector(state => state.appointment)

  useEffect(() => {
    dispatch(fetchAppointmentByPatient())
  }, [])

  const handleDelete = (data) => {
    dispatch(fetchAppointmentChekOut({ patientId: 1, id: data.appointment_id })).then(result => {

      dispatch(fetchAppointmentByPatient())
    })
  }

  // fetchAppointmentByPatient
  return (
    <Grid container spacing={4}>
      {storeAppointment.patient.map((item, index) => {
        return (
          <Grid key={index} item xs={12}>
            <Card>
              <CardHeader title={format(new Date(item.date_register_patient), "yyyy/MM/dd")}></CardHeader>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>
                    {item.hour} - {item.fullname} - {item.name}
                  </Typography>
                  <Button size='large' variant='contained' color='error' onClick={() => handleDelete(item)}>
                    Eliminar
                  </Button>
                </div>

              </CardContent>
            </Card>
          </Grid>
        )
      })}

    </Grid>
  )
}

export default MyAppointments
