// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Calendar from 'src/views/pages/scheduler/Calendar'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchSpecialties,
  handleSelectedSpecialty
} from 'src/store/apps/specialty'

import {
  fetchDoctorBySpecialty,
  handleSelectedDoctor
} from 'src/store/apps/doctor'

const steps = [
  {
    title: 'Especialidad',
    subtitle: 'Seleccionar especialidad'
  },
  {
    title: 'Médico',
    subtitle: 'Seleccionar médico'
  },
  {
    title: 'Agendar',
    subtitle: 'Seleccionar fecha y hora'
  },
]

const defaultAccountValues = {
  email: '',
  username: '',
  password: '',
  'confirm-password': ''
}

const defaultPersonalValues = {
  country: '',
  language: [],
  'last-name': '',
  'first-name': ''
}

const defaultSpecialtyValues = {
  specialty: ''
}

const defaultDoctorValues = {
  doctor: ''
}

const defaultSocialValues = {
  google: '',
  twitter: '',
  facebook: '',
  linkedIn: ''
}

const accountSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  'confirm-password': yup
    .string()
    .required()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
})

const personalSchema = yup.object().shape({
  country: yup.string().required(),
  'last-name': yup.string().required(),
  'first-name': yup.string().required(),
  language: yup.array().min(1).required()
})

const specialtySchema = yup.object().shape({
  specialty: yup.string().required()
})

const doctorSchema = yup.object().shape({
  doctor: yup.string().required()
})

const socialSchema = yup.object().shape({
  google: yup.string().required(),
  twitter: yup.string().required(),
  facebook: yup.string().required(),
  linkedIn: yup.string().required()
})

const StepperLinearWithValidation = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)

  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })
  const storeSpecialty = useSelector(state => state.specialty)
  const storeDoctor = useSelector(state => state.doctor)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSpecialties())
  }, [])

  useEffect(() => {
    if (storeSpecialty.selected.id) {
      dispatch(fetchDoctorBySpecialty({ id: storeSpecialty.selected.id }))
    }
  }, [storeSpecialty.selected])



  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  })

  const {
    reset: specialtyReset,
    control: specialtyControl,
    handleSubmit: handleSpecialtySubmit,
    formState: { errors: specialtyErrors }
  } = useForm({
    defaultValues: defaultSpecialtyValues,
    resolver: yupResolver(specialtySchema)
  })

  const {
    reset: doctorReset,
    control: doctorControl,
    handleSubmit: handleDoctorSubmit,
    formState: { errors: doctorErrors }
  } = useForm({
    defaultValues: defaultDoctorValues,
    resolver: yupResolver(doctorSchema)
  })

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    socialReset({ google: '', twitter: '', facebook: '', linkedIn: '' })
    accountReset({ email: '', username: '', password: '', 'confirm-password': '' })
    personalReset({ country: '', language: [], 'last-name': '', 'first-name': '' })
    specialtyReset({ specialty: '' })
    doctorReset({ doctor: '' })
  }

  const onSubmit = (data) => {
    if (activeStep == 0) {
      dispatch(handleSelectedSpecialty(data))
    }
    if (activeStep == 1) {
      dispatch(handleSelectedDoctor(data))
    }
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  // Handle Password
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  // Handle Confirm Password
  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showPassword2: !state.showPassword2 })
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleSpecialtySubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[0].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    error={Boolean(specialtyErrors.specialty)}
                    htmlFor='stepper-linear-specialty-language'
                    id='stepper-linear-specialty-language-label'
                  >
                    Especialidad
                  </InputLabel>
                  <Controller
                    name='specialty'
                    control={specialtyControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        onChange={onChange}
                        id='stepper-linear-specialty-language'
                        value={value}
                        error={Boolean(specialtyErrors.specialty)}
                        labelId='stepper-linear-specialty-language-label'
                        input={<OutlinedInput label='Especialidad' id='stepper-linear-select-multiple-language' />}
                      >
                        {storeSpecialty.data.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                  {specialtyErrors.specialty && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-specialty-language-helper'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' disabled>
                  Atras
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Siguiente
                </Button>
              </Grid>
            </Grid>
          </form >
        )
      case 1:
        return (
          <form key={1} onSubmit={handleDoctorSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    error={Boolean(doctorErrors.doctor)}
                    htmlFor='stepper-linear-doctor'
                    id='stepper-linear-doctor'
                  >
                    Médico
                  </InputLabel>
                  <Controller
                    name='doctor'
                    control={doctorControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        onChange={onChange}
                        id='stepper-linear-doctor'
                        value={value}
                        error={Boolean(doctorErrors.language)}
                        labelId='stepper-linear-doctor'
                        input={<OutlinedInput label='Medico' id='stepper-linear-select-multiple-language' />}
                      >
                        {storeDoctor.data.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.id}>{item.fullname}</MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                  {doctorErrors.doctor && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-doctor-language-helper'>
                      Campo requerido
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Atras
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Siguiente
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  NOTA!
                </Typography>
                <Typography variant='caption' component='p' style={{ color: "red", }}>
                  Al seleccionar la hora de la cita, ya quedaría agendado.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Calendar />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Atras
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {}
              if (index === activeStep) {
                labelProps.error = false
                if (
                  (accountErrors.email ||
                    accountErrors.username ||
                    accountErrors.password ||
                    accountErrors['confirm-password']) &&
                  activeStep === 0
                ) {
                  labelProps.error = true
                } else if (
                  (personalErrors.country ||
                    personalErrors.language ||
                    personalErrors['last-name'] ||
                    personalErrors['first-name']) &&
                  activeStep === 1
                ) {
                  labelProps.error = true
                } else if (
                  (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
                  labelProps.error = true
                } else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default StepperLinearWithValidation
