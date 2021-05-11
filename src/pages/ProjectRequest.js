import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { RequestDiscussionForm } from './../forms'
import { useSelector } from 'react-redux'
import { getUser } from './../redux/auth/selectors'
import BlockIcon from '@material-ui/icons/Block'
import CheckIcon from '@material-ui/icons/Check'
import axios from './../plugins/axios'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  description: {
    lineHeight: `calc(${theme.typography.body1.fontSize} * 170 / 100)`,
  },
  successButton: {
    '&.MuiButton-contained': {
      backgroundColor: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.success.dark,
      },
    },
    '&.MuiButton-outlined': {
      color: theme.palette.success.main,
      borderColor: theme.palette.success.light,
      '&:hover': {
        borderColor: theme.palette.success.dark,
      },
    }
  },
  declinedButton: {
    '&.MuiButton-contained': {
      backgroundColor: theme.palette.error.main,
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
    '&.MuiButton-outlined': {
      color: theme.palette.error.main,
      borderColor: theme.palette.error.light,
      '&:hover': {
        borderColor: theme.palette.error.dark,
      },
    }
  }
}))

function ProjectRequest() {
  const classes = useStyles()
  const params = useParams()
  const user = useSelector(getUser)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fromNow, setFromNow] = useState('')
  const [approverId, setApproverId] = useState('')
  const [approved, setApproved] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const setData = ({
    title,
    description,
    approver_id,
    approved,
    created_at
  }) => {
    setTitle(title)
    setDescription(description)
    setFromNow(moment().fromNow(created_at))
    setApproverId(approver_id)
    setApproved(approved)
  }

  const fetchData = async () => {
    const path = params.id
      ? `projects/${params.id}/requests/${params.sid}`
      : `my/project/requests/${params.sid}`

    const data = await axios.get(path)
    setData(data)
  }

  const handleApproved = async approved => {
    try {
      const { data } = await axios.post(
        `projects/${params.id}/requests/${params.sid}/approvement`,
        { approved }
      )
      setData(data)
    } catch ({ response }) {
      // 
    }
  }

  const renderHeader = (
    <Grid
      container
      justify="space-between"
    >
      <Grid item>
        <Typography variant="h5">
          {title}
        </Typography>
        <Box mt={1}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {fromNow}
          </Typography>
        </Box>
      </Grid>
      {user.id === approverId && (
        <Grid item>
          <Grid
            container
            spacing={2}
          >
            <Grid item>
              <Button
                disabled={approved}
                onClick={() => handleApproved(false)}
                startIcon={<BlockIcon />}
                className={approved === false && classes.declinedButton}
                variant="outlined"
                color="primary"
                size="large"
              >
                {approved ? 'Declined' : 'Decline'}

              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={approved === false}
                onClick={() => handleApproved(true)}
                startIcon={<CheckIcon />}
                className={approved && classes.successButton}
                variant={approved ? 'outlined' : 'contained'}
                color="primary"
                size="large"
              >
                {approved ? 'Approved' : 'Approve'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )

  const renderOverview = (
    <>
      <Typography>
        <Box
          fontWeight="fontWeightMedium"
          marginBottom={1}
        >Тайлбар</Box>
      </Typography>
      <Typography
        className={classes.description}
        color="textSecondary"
      >
        {description}
      </Typography>
    </>
  )

  const renderDiscussions = (
    <>
      <RequestDiscussionForm />
    </>
  )

  return (
    <Container maxWidth="md">
      <Box py={3}>
        {renderHeader}
        <Box my={3}>
          <Divider />
        </Box>
        <Grid
          container
          spacing={3}
        >
          <Grid item xs={8}>
            {renderOverview}
            <Box my={3}>
              <Divider />
            </Box>
            {renderDiscussions}
          </Grid>
          <Grid item xs>
            <Divider orientation="vertical" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default ProjectRequest