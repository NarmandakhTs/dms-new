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
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import FilesIcon from './../assets/images/files/files.svg'
import DOCIcon from './../assets/images/files/doc.svg'
import XLSIcon from './../assets/images/files/xls.svg'
import PDFIcon from './../assets/images/files/pdf.svg'

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
    marginTop: theme.spacing(2),
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

function DropZoneMultipleDialog({
  title,
  open,
  extensions,
  uploadPath,
  onClose,
  onFinish,
  icon
}) {
  const classes = useStyles()
  const input = useRef(null)
  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState({})
  const [progresses, setProgresses] = useState([])
  const [uploading, setUploading] = useState(false)

  const browseFile = async e => setFiles([...files, ...e.target.files])

  const uploadFiles = async () => {
    try {
      setErrors({})
      setProgresses([])
      setUploading(true)

      files.forEach(async file => {
        const formData = new FormData()
        formData.append('document', file)

        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          },
          onUploadProgress: event => {
            const { total, loaded } = event
            const progress = Math.round(loaded / total * 100)

            setProgresses([...progresses, progress])
          }
        }

        await axios.post(
          uploadPath,
          formData,
          config
        )
      })

      setFiles([])
      setProgresses([])
      setUploading(false)
      onFinish()
    } catch ({ response }) {
      if (response.status === 422) {
        setErrors(response.data.errors)
        setUploading(false)
      }
    }
  }

  const fileSize = size => {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${['B', 'KB', 'MB', 'GB', 'TB'][i]}`;
  }

  const handleRemoveFile = index => {
    setFiles(files.filter((value, i) => index !== i))
    setProgresses(progresses.filter((value, i) => index !== i))
  }

  const extensionsIcons = {
    doc: PDFIcon,
    docx: DOCIcon,
    xls: XLSIcon,
    xlsx: XLSIcon,
    pdf: PDFIcon
  }

  const fileManager = (
    <>
      <Box my={5}>
        {files.map((file, index) =>
          <Box className={classes.fileManager}>
            <Grid
              container
              spacing={2}
            >
              <Grid item>
                <img
                  width="40"
                  alt={file.name}
                  src={extensionsIcons[file.name.split('.').pop()]}
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
                          {fileSize(file.size)}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progresses[index] ? progresses[index] : 0}
                />
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleRemoveFile(index)}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          startIcon={<AddIcon />}
          onClick={uploadFiles}
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
      <Box>
        <img
          width="80"
          alt="document"
          src={icon ? icon : FilesIcon}
        />
      </Box>
      <label>
        <input
          ref={input}
          className={classes.input}
          onChange={browseFile}
          disabled={uploading}
          type="file"
          accept={extensions}
          multiple
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
              <Box fontWeight="fontWeightRegular">
                {title}
              </Box>
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
        {fileUploader}
        {files.length ? fileManager : null}
      </Box>
    </Dialog>
  )
}

export default DropZoneMultipleDialog