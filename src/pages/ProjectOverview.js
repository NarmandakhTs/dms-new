import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  Container,
  CircularProgress,
  Typography,
  Grid
} from '@material-ui/core'
import axios from './../plugins/axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const useStyles = makeStyles((theme) => ({
  applyCard: {
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.spacing(1)
  },
  paragraph: {
    lineHeight: '30px',
    color: theme.palette.grey[700]
  }
}))

function ProjectApply() {
  const classes = useStyles()
  const params = useParams()
  const [apply, setApply] = useState(null)

  useEffect(() => {
    fetchApply()
  }, [])

  const fetchApply = async () => {
    const { data } = await axios.get(`projects/${params.id}/apply`)
    setApply(data)
  }

  const getApplyUserInfo = () => {
    const { name, surname, code } = apply.user
    return `${surname.charAt(0)}. ${name} ${code}`
  }

  const getApplyInfo = () => {
    const fromNow = moment().fromNow(apply.created_at)
    return `Applied to project ${fromNow}`
  }

  const handleApplyApproved = async approved => {
    try {
      await axios.post(`projects/${params.id}/apply/approvement`, { approved })
      fetchApply()
    } catch ({ response }) {
      // 
    }
  }

  if (!apply) return null

  return (
    <Box className={classes.applyCard}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <Grid
            container
            spacing={1}
            alignItems="center"
          >
            <Grid item>
              <CheckCircleOutlineIcon />
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="TODO: end oyutnii medeelel haruulah huudasruu usergeh link oruulah"
              >
                {getApplyUserInfo()}
              </Button>
            </Grid>
            <Grid item>
              <Typography
                color="textSecondary"
                variant="captain"
              >
                {getApplyInfo()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={2}
          >
            <Grid item>
              <Button
                onClick={() => handleApplyApproved(false)}
                color="primary"
                size="large"
                variant="outlined"
              >Цуцлах</Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleApplyApproved(true)}
                color="primary"
                size="large"
                variant="contained"
              >Зөвшөөрөх</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

function ProjectOverview() {
  const classes = useStyles()
  const [project, setProject] = useState({})

  useEffect(() => {
    fetchProject()
  }, [])

  const fetchProject = async () => {
    const { data } = await axios.get('my/project')
    setProject(data)
  }

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <ProjectApply />
      </Box>
      <Box>
        <Box mb={2}>
          <Typography variant="h6">Товч танилцуулга</Typography>
        </Box>
        <Typography className={classes.paragraph}>
          {project.overview}
        </Typography>
      </Box>
    </Container>
  )
}

export default ProjectOverview