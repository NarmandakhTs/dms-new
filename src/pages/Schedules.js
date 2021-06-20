import {
  useState,
  useRef
} from 'react'
import {
  Box,
  Button,
  IconButton,
  Container,
  Grid,
  Typography,
} from '@material-ui/core'
import 'tui-calendar/dist/tui-calendar.css'
import { makeStyles } from '@material-ui/core/styles'
import TUICalendar from '@toast-ui/react-calendar'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SchedulesNew from './SchedulesNew'

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: theme.palette.grey[100],
  },
  card: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.spacing(1),
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  cardBody: {
    padding: theme.spacing(1, 2),
    paddingTop: 0,
  },
  labelDot: {
    marginRight: theme.spacing(2),
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
  }
}))

function Schedules() {
  const schedulerRef = useRef()
  const classes = useStyles()
  const [newDialogOpen, setNewDialogOpen] = useState(false)
  const [labels, setLabels] = useState([
    {
      id: 1,
      name: "Яаралтай",
      color: "#ffffff",
      bgColor: "#9e5fff",
      dragBgColor: "#9e5fff",
      borderColor: "#9e5fff"
    },
    {
      id: 2,
      name: "Туршилт",
      color: "#ffffff",
      bgColor: "#00a9ff",
      dragBgColor: "#00a9ff",
      borderColor: "#00a9ff"
    }
  ])
  const [schedules, setSchedules] = useState([
    {
      calendarId: 2,
      category: "time",
      id: 1,
      title: "Бичиг баримт хураалгах",
      body: "Description",
      start: 'Wed Jun 5 2021 02:50:35 GMT+0800',
      end: 'Wed Jun 6 2021 02:50:35 GMT+0800'
    },
    {
      calendarId: 1,
      category: "time",
      id: 2,
      title: "Үзлэг 1",
      body: "Description",
      start: 'Wed Jun 10 2021 02:50:35 GMT+0800',
      end: 'Wed Jun 12 2021 02:50:35 GMT+0800'
    },
    {
      calendarId: 1,
      category: "time",
      id: 3,
      title: "Үзлэг 2",
      body: "Description",
      start: 'Wed Jun 27 2021 02:50:35 GMT+0800',
      end: 'Wed Jun 29 2021 02:50:35 GMT+0800'
    },
    {
      calendarId: 2,
      category: "time",
      id: 1,
      title: "Сэдэв сонгох",
      body: "Төгсөлтийн ажлын сэдэв сонгох",
      start: 'Wed April 26 2021 02:50:35 GMT+0800',
      end: 'Wed Jun 1 2021 02:50:35 GMT+0800'
    },
  ])

  const handleSchedulerStep = stepDirection => {
    const schedulerInstance = schedulerRef.current.getInstance()
    schedulerInstance[stepDirection]()
  }

  const renderCalendarHeader = (
    <Box className={classes.cardHeader}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <IconButton onClick={() => handleSchedulerStep('prev')}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={() => handleSchedulerStep('next')}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
        <Grid>
          <Button
            onClick={() => setNewDialogOpen(true)}
            variant="outlined"
          >Хуваарь нэмэх</Button>
        </Grid>
      </Grid>
    </Box>
  )

  return (
    <Box className={classes.body}>
      <Container maxWidth="xlg">
        <Box py={2}>
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={9}>
              <Box className={classes.card}>
                {renderCalendarHeader}
                <TUICalendar
                  ref={schedulerRef}
                  view="month"
                  useDetailPopup={true}
                  calendars={labels}
                  schedules={schedules}
                />
              </Box>
            </Grid>
            <Grid item xs>
              <Box className={classes.card}>
                <Box className={classes.cardHeader}>
                  <Typography>
                    <Box fontWeight="fontWeightMedium">Төрлүүд</Box>
                  </Typography>
                </Box>
                <Box className={classes.cardBody}>
                  {labels.map((value, index) =>
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      my={1}
                    >
                      <Box
                        className={classes.labelDot}
                        style={{ backgroundColor: value.bgColor }}
                      />
                      <Typography>
                        {value.name}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <SchedulesNew
        onClose={() => setNewDialogOpen(false)}
        open={newDialogOpen}
      />
    </Box>
  )
}

export default Schedules