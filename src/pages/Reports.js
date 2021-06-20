import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import GetAppIcon from '@material-ui/icons/GetApp'
import axios from './../plugins/axios'

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: theme.spacing(1),
    boxShadow: '0 5px 10px #eee',
  },
  cardDocument: {
    overflow: 'hidden',
    borderRadius: theme.spacing(1),
    height: theme.spacing(25),
    backgroundColor: '#ccc',
    '& .react-pdf__Document': {
      margin: theme.spacing(2, 4)
    },
    '& .react-pdf__Page': {
      marginBottom: theme.spacing(1),
      borderRadius: theme.spacing(0.5),
      overflow: 'hidden',
      opacity: 0.5,
    },
    '& .react-pdf__Page__canvas,& .react-pdf__Page__textContent': {
      width: '100% !important',
      height: 'auto !important'
    },
  },
  cardBody: {
    padding: theme.spacing(1, 2),
  },
  cardTitle: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.h6.fontSize
  }
}))

function Reports() {
  const classes = useStyles()
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const handleDownloadReport = async () => {
    await axios.get('documents/Shiidver_IT_19_20B-Copy.doc.pdf/download')
  }

  return (
    <Container>
      <Box py={3}>
        <Box mb={4}>
          <Typography variant="h5">Тайлангууд</Typography>
        </Box>
        <Grid container>
          <Grid item xs={4}>
            <Box className={classes.card}>
              <Box className={classes.cardDocument}>
                <Document
                  file={`${process.env.REACT_APP_API_URL}/api/documents/Shiidver_IT_19_20B-Copy.doc.pdf`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={1} />
                  <Page pageNumber={2} />
                </Document>
              </Box>
              <Box className={classes.cardBody}>
                <Grid
                  container
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid item>
                    <Typography className={classes.cardTitle}>
                      Тогтоол, шийдвэр
              </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      target="_blank"
                      href={`${process.env.REACT_APP_API_URL}/api/documents/Shiidver_IT_19_20B-Copy.doc.pdf/download`}
                    >
                      <GetAppIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Reports