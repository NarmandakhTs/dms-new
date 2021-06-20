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
import PDFIcon from './../assets/images/files/pdf.svg'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: theme.spacing(1),
    boxShadow: `0 2px 10px ${theme.palette.grey[200]}`,
  },
  cardDocument: {
    transition: '.2s',
    overflow: 'hidden',
    borderRadius: theme.spacing(1),
    height: theme.spacing(25),
    backgroundColor: '#ccc',
    '& .react-pdf__Document': {
      transition: '.1s',
      margin: theme.spacing(2, 4)
    },
    '& .react-pdf__Page': {
      marginBottom: theme.spacing(1),
      borderRadius: theme.spacing(0.5),
      overflow: 'hidden',
      opacity: 0.5,
      transition: '.3s'
    },
    '& .react-pdf__Page__canvas,& .react-pdf__Page__textContent': {
      width: '100% !important',
      height: 'auto !important'
    },
    '&:hover': {
      zIndex: 99999,
      transform: 'scale(1.1)',
      backgroundColor: '#78a7ff',
      boxShadow: `0 5px 20px #999`,
      '& .react-pdf__Page': {
        opacity: 1
      },
      '& .react-pdf__Document': {
        margin: theme.spacing(1)
      },
    }
  },
  cardTitle: {
    overflow: 'hidden',
    padding: theme.spacing(2)
  }
}))

function ProjectDocuments(props) {
  const classes = useStyles()
  const department = useSelector(getUserDepartment)
  const params = useParams()
  const [uploadStudentDialog, openUploadStudentDialog] = useState(false)
  const [uploadStudentsSuccess, setUploadStudentsSuccess] = useState(false)
  const [documents, setDocuments] = useState([])
  const [numPages, setNumPages] = useState(null);
  const path = params.id ? `projects/${params.id}/documents` : 'my/project/documents'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await axios.get(path)
    setDocuments(data)
  }

  const onUploadStudentsFinish = () => {
    openUploadStudentDialog(false)
    fetchData()
    setUploadStudentsSuccess(true)
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
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
            <Typography variant="h4">Бичиг баримтууд</Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => openUploadStudentDialog(true)}
              startIcon={<AddIcon />}
              variant="outlined"
              size="large"
            >Бичиг баримт оруулах</Button>
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
            <Box className={classes.card}>
              <Box className={classes.cardDocument}>
                <Document
                  file={`${process.env.REACT_APP_API_URL}/api/${document.path}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={1} />
                  <Page pageNumber={2} />
                </Document>
              </Box>
              <Typography
                className={classes.cardTitle}
                variant="subtitle2"
              >
                {document.name}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      <DropZoneMultipleDialog
        title="Add Documents"
        extensions="application/pdf"
        icon={PDFIcon}
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