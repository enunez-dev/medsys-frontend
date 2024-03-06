// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import { format } from "date-fns";

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Next Import
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { toast } from 'react-hot-toast'

import {
  fetchAppointment,
  checkAppointment
} from 'src/store/apps/appointment'

const capitalize = string => string && string[0].toUpperCase() + string.slice(1)

const defaultState = {
  url: '',
  title: '',
  guests: [],
  allDay: true,
  description: '',
  endDate: new Date(),
  calendar: 'Business',
  startDate: new Date(),
  specialty: {},
  doctor: {},
}

const AddEventSidebar = props => {
  // ** Props
  const {
    store,
    addEvent,
    updateEvent,
    drawerWidth,
    calendarApi,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle
  } = props

  // ** States
  const [values, setValues] = useState(defaultState)
  const storeSpecialty = useSelector(state => state.specialty)
  const storeDoctor = useSelector(state => state.doctor)
  const storeAppointment = useSelector(state => state.appointment)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAppointment({
      date: format(values.startDate, "yyyy-MM-dd"),
      doctorId: storeDoctor.selected.id
    }))
  }, [values.startDate])

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    clearErrors()
    dispatch(handleSelectEvent(null))
    handleAddEventSidebarToggle()
  }

  const onSubmit = data => {
    const modifiedEvent = {
      url: values.url,
      display: 'block',
      title: data.title,
      end: values.endDate,
      allDay: values.allDay,
      start: values.startDate,
      extendedProps: {
        calendar: capitalize(values.calendar),
        guests: values.guests && values.guests.length ? values.guests : undefined,
        description: values.description.length ? values.description : undefined
      }
    }
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      dispatch(addEvent(modifiedEvent))
    } else {
      dispatch(updateEvent({ id: store.selectedEvent.id, ...modifiedEvent }))
    }
    calendarApi.refetchEvents()
    handleSidebarClose()
  }

  const handleDeleteEvent = () => {
    if (store.selectedEvent) {
      dispatch(deleteEvent(store.selectedEvent.id))
    }

    // calendarApi.getEventById(store.selectedEvent.id).remove()
    handleSidebarClose()
  }

  const handleStartDate = date => {
    if (date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }

  const resetToStoredValues = useCallback(() => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent
      setValue('title', event.title || '')
      setValues({
        url: event.url || '',
        title: event.title || '',
        allDay: event.allDay,
        guests: event.extendedProps.guests || [],
        description: event.extendedProps.description || '',
        calendar: event.extendedProps.calendar || 'Business',
        endDate: event.end !== null ? event.end : event.start,
        startDate: event.start !== null ? event.start : new Date()
      })
    }
  }, [setValue, store.selectedEvent])

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValues(defaultState)
  }, [setValue])
  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues()
    } else {
      resetToEmptyValues()
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])

  const PickersComponent = forwardRef(({ ...props }, ref) => {
    return (
      <TextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })

  const RenderSidebarFooter = () => {
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Update
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToStoredValues}>
            Reset
          </Button>
        </Fragment>
      )
    }
  }

  const handleCheck = (data) => {
    dispatch(checkAppointment({
      appointmentid: data.appointment_id
    })).then((response) => {
      toast.success('Agendado correctamente');
      router.push('/my-appointments')
    })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Typography variant='h6'>
          Especialidad:
        </Typography>
        <Typography variant='subtitle2'>
          {storeSpecialty.selected.name}
        </Typography>
      </Grid>
      <Grid item xs={12} >
        <Typography variant='h6'>
          Medico:
        </Typography>
        <Typography variant='subtitle2'>
          {storeDoctor.selected.fullname}
        </Typography>
      </Grid>
      <Grid item xs={12} >
        <Typography variant='h6'>
          Fecha:
        </Typography>
        <Typography variant='subtitle2'>
          <div style={{
            padding: 5,
            borderRadius: 5,
            color: '#fff',
            backgroundImage: `linear-gradient(98deg, #9155FD, #C6A7FE 94%)`
          }}>
            {format(values.startDate, "yyyy-MM-dd")}
          </div>
        </Typography>
      </Grid>

      {storeAppointment.data.map((item, index) => {
        return (
          <Grid key={index} item xs={12} sm={4} >
            <Button disabled={item.patient_id ? true : false} size='large' fullWidth variant='outlined' color='secondary' onClick={() => handleCheck(item)}>
              {item.hour}
            </Button>
          </Grid>
        )
      })}

    </Grid>
  )
}

export default AddEventSidebar
