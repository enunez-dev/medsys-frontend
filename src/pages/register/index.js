// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import DatePicker from 'react-datepicker'
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'

import { useAuth } from 'src/hooks/useAuth'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterV1 = () => {
  // const [check, setCheck] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setRepeatShowPassword] = useState(false)

  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const auth = useAuth()

  const schema = yup.object().shape({
    fullName: yup.string().required('Campo requerido').min(5, 'Nombre muy corto'),
    email: yup.string().required('Campo requerido').email('Correo inválido'),
    password: yup.string().required('Campo requerido').min(5),
    repeatPassword: yup.string().required('Campo requerido'),
    check: yup.boolean().isTrue()
  })

  const defaultValues = {
    fullName: '',
    email: '',
    birthday: new Date(),
    sex: 'M',
    password: '',
    repeatPassword: '',
    check: false
  }

  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })

  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    console.log(data)
    if (data.password != data.repeatPassword) {
      setError('repeatPassword', {
        type: 'manual',
        message: 'Las contraseñas no coinciden'
      })
    }
    else {
      auth.register(data, () => {
      })
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, mb: 1.5 }}>
              Una nueva experiencia 🚀
            </Typography>
            <Typography variant='body2'>Create una cuenta para agendar tu cita!</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='fullName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    type='text'
                    label='Nombre completo'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.fullName)}
                    placeholder=''
                  />
                )}
              />
              {errors.fullName && <FormHelperText sx={{ color: 'error.main' }}>{errors.fullName.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    fullWidth
                    type='email'
                    label='Correo electronico'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder=''
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='birthday'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <DatePickerWrapper sx={{ mb: 4 }}>
                    <Box className='demo-space-x'>
                      <DatePicker
                        selected={value}
                        id='basic-input'
                        popperPlacement={'bottom-end'}
                        onChange={onChange}
                        placeholderText='Click to select a date'
                        customInput={<CustomInput fullWidth label='Fecha de nacimiento' />}
                      />
                    </Box>
                  </DatePickerWrapper>
                )}
              />
              {errors.birthday && <FormHelperText sx={{ color: 'error.main' }}>{errors.birthday.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth >
              <Controller
                name='sex'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <Typography>Sexo</Typography>
                    <RadioGroup
                      row
                      value={value}
                      onChange={onChange}
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' }, display: 'flex', justifyContent: 'space-around' }}
                    >
                      <FormControlLabel value='M' label='Másculino' control={<Radio />} />
                      <FormControlLabel value='F' label='Femenino' control={<Radio />} />
                    </RadioGroup>
                  </>
                )}
              />
              {errors.sex && <FormHelperText sx={{ color: 'error.main' }}>{errors.sex.message}</FormHelperText>}
            </FormControl>
            <Box sx={{ mb: 4, }}>

            </Box>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Contraseña
              </InputLabel>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label='Password'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Repita contraseña
              </InputLabel>
              <Controller
                name='repeatPassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label='Repita contraseña'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.repeatPassword)}
                    type={showRepeatPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setRepeatShowPassword(!showRepeatPassword)}
                        >
                          <Icon icon={showRepeatPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.repeatPassword && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  {errors.repeatPassword.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControlLabel
              control={
                <>
                  <Controller
                    name='check'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Checkbox
                        size='small'

                        // color={color}
                        name='check'
                        checked={value}
                        onChange={onChange}
                        sx={{ ml: 2, mr: 1, mt: -2 }}
                      />
                    )}
                  />
                </>
              }

              // control={}
              label={
                <Fragment>
                  <span>Acepto las </span>
                  <LinkStyled href='/' onClick={e => e.preventDefault()}>
                    política de privacidad & terminos
                  </LinkStyled>
                  {errors.check && (
                    <FormHelperText sx={{ color: 'error.main' }} id=''>
                      Aceptar los terminos.
                    </FormHelperText>
                  )}
                </Fragment>
              }
            />

            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
              CREAR
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ mr: 2 }}>
                Ya tiene una cuenta?
              </Typography>
              <Typography variant='body2'>
                <LinkStyled href='/login'>ingresa!</LinkStyled>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
RegisterV1.getLayout = page => <BlankLayout>{page}</BlankLayout>
RegisterV1.guestGuard = true

export default RegisterV1
