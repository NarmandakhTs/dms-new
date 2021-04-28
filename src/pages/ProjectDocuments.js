import {
  useState,
  useEffect
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { getUserDepartment } from './../redux/auth/selectors'
import { useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Grid,
  Typography,
  Snackbar,
} from '@material-ui/core'
import { DropZoneMultipleDialog } from './../components'
import axios from './../plugins/axios'
import Alert from '@material-ui/lab/Alert'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: '0 2px 2px #00000010'
  },
  cardMedia: {
    height: theme.spacing(30),
  },
}))

function ProjectDocuments(props) {
  const classes = useStyles()
  const department = useSelector(getUserDepartment)
  const params = useParams()
  const [uploadStudentDialog, openUploadStudentDialog] = useState(false)
  const [uploadStudentsSuccess, setUploadStudentsSuccess] = useState(false)
  const [documents, setDocuments] = useState([])
  const path = params.id ? `projects/${params.id}/documents` : 'my/project/documents'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data } = await axios.get(path)

      setDocuments(data)
    } catch (e) {
      // 
    }
  }

  const onUploadStudentsFinish = () => {
    openUploadStudentDialog(false)
    fetchData()
    setUploadStudentsSuccess(true)
  }

  return (
    <Box p={5}>
      <Box mb={5}>
        <Grid
          container
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h4">Documents</Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => openUploadStudentDialog(true)}
              startIcon={<AddIcon />}
              variant="outlined"
              size="large"
            >Add Document</Button>
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        spacing={2}
      >
        {documents.map((document, index) =>
          <Grid
            key={index}
            xs={3}
            item
          >
            {document.name}
          </Grid>
        )}
      </Grid>
      <DropZoneMultipleDialog
        title="Add Documents"
        extensions="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        uploadPath={path}
        open={uploadStudentDialog}
        onFinish={onUploadStudentsFinish}
        onClose={() => openUploadStudentDialog(false)}
      />
      <Snackbar
        open={uploadStudentsSuccess}
        onClose={() => setUploadStudentsSuccess(false)}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert
          onClose={() => setUploadStudentsSuccess(false)}
          severity="success"
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ProjectDocuments