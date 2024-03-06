// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import SchedulerWizard from 'src/views/pages/scheduler/SchedulerWizard'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SchedulerWizard />
      </Grid>
    </Grid>
  )
}

export default Home
