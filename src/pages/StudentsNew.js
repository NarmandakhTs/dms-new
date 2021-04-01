import {
  useState,
  useRef
} from 'react'
import {
  Box,
  Button,
  Dialog,
  Grid,
  Typography,
  IconButton,
  LinearProgress,
} from '@material-ui/core'
import axios from './../plugins/axios'
import { useSelector } from 'react-redux'
import { getUserDepartment } from './../redux/auth/selectors'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import FileIcon from './../assets/images/xls.svg'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(3),
    marginTop: 0,
    padding: theme.spacing(2),
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: `${theme.palette.primary.main}50`,
    background: `${theme.palette.primary.main}10`,
    borderRadius: theme.shape.borderRadius,
  },
  fileUploader: {
    textAlign: 'center',
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  },
  fileManager: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    boxShadow: `0 2px 10px ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
  },
  dividerWithText: {
    display: 'inline',
    position: 'relative',
    color: theme.palette.grey[500],
    '&::before': {
      content: '""',
      background: theme.palette.grey[300],
      display: 'block',
      width: 100,
      left: -110,
      height: 1,
      top: '50%',
      position: 'absolute'
    },
    '&::after': {
      content: '""',
      background: theme.palette.grey[300],
      display: 'block',
      width: 100,
      right: -110,
      height: 1,
      top: '50%',
      position: 'absolute'
    }
  },
  successfulButton: {
    backgroundColor: theme.palette.success.main
  },
  input: {
    display: 'none'
  },
}))

function StudentsNew({ open, onClose, onFinish }) {
  const department = useSelector(getUserDepartment)
  const classes = useStyles()
  const input = useRef(null)
  const [file, setFile] = useState('')
  const [errors, setErrors] = useState({})
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const browseFile = async e => setFile(e.target.files[0])

  const uploadFile = async () => {
    try {
      setErrors({})
      setProgress(0)
      setUploading(true)

      const formData = new FormData()
      formData.append('file', file)

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        },
        onUploadProgress: event => {
          const { total, loaded } = event
          const progress = Math.round(loaded / total * 100)

          setProgress(progress)
        }
      }

      await axios.post(
        `departments/${department}/students`,
        formData,
        config
      )

      setFile('')
      setUploading(false)
      onFinish()
    } catch ({ response }) {
      if (response.status === 422) {
        setErrors(response.data.errors)
        setUploading(false)
      }
    }
  }

  const fileSize = () => {
    var i = Math.floor(Math.log(file.size) / Math.log(1024));
    return `${(file.size / Math.pow(1024, i)).toFixed(2) * 1} ${['B', 'KB', 'MB', 'GB', 'TB'][i]}`;
  }


  const fileManager = (
    <>
      <Box className={classes.fileManager}>
        <Grid
          container
          spacing={2}
        >
          <Grid item>
            <img
              width="40"
              alt="document"
              src={FileIcon}
            />
          </Grid>
          <Grid item xs>
            <Box mb={1}>
              <Grid
                container
                alignItems="center"
                justify="space-between"
              >
                <Grid item>
                  <Typography variant="subtitle2">
                    <Box fontWeight="fontWeightRegular">
                      {file.name}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    <Box fontWeight="fontWeightRegular">
                      {fileSize()}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => setFile('')}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          startIcon={<AddIcon />}
          onClick={uploadFile}
          disabled={uploading}
          variant="contained"
          color="primary"
          size="large"
        >Хадгалах</Button>
      </Box>
    </>
  )

  const fileUploader = (
    <Box className={classes.fileUploader}>
      <img
        width="80"
        alt="document"
        src={FileIcon}
      />
      <Typography>
        <Box fontWeight="fontWeightLight">Drag and Drop your file here</Box>
      </Typography>
      <Box>
        <Typography className={classes.dividerWithText}>OR</Typography>
      </Box>
      <label>
        <input
          ref={input}
          className={classes.input}
          onChange={browseFile}
          disabled={uploading}
          type="file"
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
        <Button
          disabled={uploading}
          variant="outlined"
          color="primary"
          size="large"
          component="span"
        >Файл оруулах</Button>
      </label>
    </Box>
  )

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <Box p={3} pt={1} pr={1} pb={1}>
        <Grid
          container
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h6">
              <Box fontWeight="fontWeightRegular">Upload Users</Box>
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.wrapper}>
        {file ? fileManager : fileUploader}
      </Box>
    </Dialog>
  )
}

export default StudentsNew