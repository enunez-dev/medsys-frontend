// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

import Grid from '@mui/material/Grid'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** FullCalendar & App Components Imports
// import Calendar from 'src/views/apps/calendar/Calendar'
import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'

// ** Actions
import {
    addEvent,
    fetchEvents,
    deleteEvent,
    updateEvent,
    handleSelectEvent,
    handleAllCalendars,
    handleCalendarsUpdate
} from 'src/store/apps/calendar'

// ** CalendarColors
const calendarsColor = {
    Personal: 'error',
    Business: 'primary',
    Family: 'warning',
    Holiday: 'success',
    ETC: 'info'
}

const AppCalendar = () => {
    // ** States
    const [calendarApi, setCalendarApi] = useState(null)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
    const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)

    // ** Hooks
    const { settings } = useSettings()
    const dispatch = useDispatch()
    const store = useSelector(state => state.calendar)

    // ** Vars
    const leftSidebarWidth = 260
    const addEventSidebarWidth = 400
    const { skin, direction } = settings
    const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))

    // useEffect(() => {
    //     dispatch(fetchEvents(store.selectedCalendars))
    // }, [dispatch, store.selectedCalendars])
    const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
    const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

    return (
        <Grid container spacing={15}>
            <Grid item xs={12} sm={6}>
                <Calendar
                    store={store}
                    dispatch={dispatch}
                    direction={direction}
                    updateEvent={updateEvent}
                    calendarApi={calendarApi}
                    calendarsColor={calendarsColor}
                    setCalendarApi={setCalendarApi}
                    handleSelectEvent={handleSelectEvent}
                    handleLeftSidebarToggle={handleLeftSidebarToggle}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <AddEventSidebar
                    store={store}
                    dispatch={dispatch}
                    addEvent={addEvent}
                    updateEvent={updateEvent}
                    deleteEvent={deleteEvent}
                    calendarApi={calendarApi}
                    drawerWidth={addEventSidebarWidth}
                    handleSelectEvent={handleSelectEvent}
                    addEventSidebarOpen={addEventSidebarOpen}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                />
            </Grid>
        </Grid>
    )
}

export default AppCalendar
