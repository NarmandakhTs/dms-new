import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  Grid as MaterialGrid,
  Typography
} from '@material-ui/core'
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui'
import {
  useRouteMatch,
  useParams,
  Link
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import axios from './../plugins/axios'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  approvalStatus: {
    '&.MuiChip-outlined': {
      color: theme.palette.warning.main,
      borderColor: theme.palette.warning.main
    },
    '&.MuiChip-outlinedPrimary': {
      color: theme.palette.success.main,
      borderColor: theme.palette.success.main
    },
    '&.MuiChip-outlinedSecondary': {
      color: theme.palette.error.main,
      borderColor: theme.palette.error.main
    }
  },
  requestTitle: {
    marginRight: theme.spacing(2),
    '& > a': {
      color: theme.palette.grey[900],
      textDecoration: 'none'
    }
  }
}))

function ProjectRequests() {
  const classes = useStyles()
  const params = useParams()
  const { url } = useRouteMatch()
  const [requests, setRequests] = useState([])
  const [approvalStatus] = useState({
    true: {
      label: 'Зөвшөөрөгдсөн',
      color: 'primary'
    },
    false: {
      label: 'Цуцлагдсан',
      color: 'secondary'
    },
    null: {
      label: 'Хүлээгдэж байна',
      color: 'default'
    }
  })
  const [tableColumnExtensions] = useState([
    {
      columnName: 'title',
      width: '80%',
    },
    {
      columnName: 'approved',
      align: 'center',
    },
  ])
  const [columns] = useState([
    {
      name: 'title',
      title: 'Гарчиг',
      getCellValue: ({ id, title, created_at }) => (
        <Box
          display="flex"
          alignItems="center"
        >
          <Box className={classes.requestTitle}>
            <Typography
              component={Link}
              to={`${url}/${id}`}
            >
              {title}
            </Typography>
          </Box>
          <Typography
            color="textSecondary"
            variant="captain"
          >
            {moment().fromNow(created_at)}
          </Typography>
        </Box >
      ),
    },
    {
      name: 'approved',
      title: 'Төлөв',
      getCellValue: ({ approved }) => (
        <Chip
          className={classes.approvalStatus}
          color={approvalStatus[approved].color}
          label={approvalStatus[approved].label}
          variant="outlined"
        />
      ),
    },
  ])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const path = params.id ? `projects/${params.id}/requests` : 'my/project/requests'
    const { data } = await axios.get(path)
    setRequests(data)
  }

  return (
    <Container>
      <Box my={3}>
        <Box mb={5}>
          <MaterialGrid
            container
            justify="space-between"
          >
            <MaterialGrid item>
              <Typography variant="h6">Requests</Typography>
              <Typography color="textSecondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </MaterialGrid>
            <MaterialGrid item>
              <Button
                component={Link}
                to={`${url}/new`}
                color="primary"
                size="large"
                variant="outlined"
              >Create Request</Button>
            </MaterialGrid>
          </MaterialGrid>
        </Box>
        <Grid
          rows={requests}
          columns={columns}
        >
          <Table columnExtensions={tableColumnExtensions} />
          <TableHeaderRow />
        </Grid>
      </Box>
    </Container>
  )
}

export default ProjectRequests