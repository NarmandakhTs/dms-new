import {
  Box,
  Button,
  Grid,
  Container,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  ResultsTeacher,
  Scorecards
} from './'
import { useSelector } from 'react-redux'
import { getPermissions } from './../redux/auth/selectors'
import GetAppIcon from '@material-ui/icons/GetApp'
import axios from './../plugins/axios'

// TODO: udirdagch bagshiin unelgee
// TODO: uridchilsan hamgaalaltiin unelgee
// TODO: jinhen hamgaalaltiin unelgee
// TODO: niit unelgee

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: '#fbfbfb',
    height: '100vh'
  },
}))

function Results() {
  const classes = useStyles()
  const permissions = useSelector(getPermissions)

  const generate = async () => {
    await axios.post('doc')
  }

  return (
    <Box className={classes.body}>
      <Container>
        <Box pt={4} pb={5}>
          <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography variant="h6">Үнэлгээ</Typography>
            </Grid>
            <Grid item>
              <Button
                href={`${process.env.REACT_APP_API_URL}/api/doc`}
                startIcon={<GetAppIcon />}
                variant="outlined"
                size="large"
              >Тогтоол, шийдвэр</Button>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          direction="column"
          spacing={3}
        >
          <Grid item>
            <Scorecards />
          </Grid>
          <Grid item>
            <ResultsTeacher />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Results