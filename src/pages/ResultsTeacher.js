import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  Typography,
  Grid as MaterialGrid
} from '@material-ui/core'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import { ResultsTeacherForm } from './../forms'
import axios from './../plugins/axios'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  results: {
    backgroundColor: '#fff',
    boxShadow: `0 5px 10px #e5e5e5`,
    overflow: 'hidden',
    borderRadius: 10,
  }
}))

function ResultsTeacher() {
  const classes = useStyles()
  const [students, setStudents] = useState([])
  const [scorecards, setScorecards] = useState([])
  const [formOpen, setFormOpen] = useState('')
  const [columns] = useState([
    {
      name: 'name',
      title: 'Оюутны нэр',
      getCellValue: ({ name, surname }) => (
        <Typography variant="subtitle1">
          {`${surname.charAt(0)}.${name}`}
        </Typography>
      )
    },
    {
      name: 'code',
      title: 'Код',
      getCellValue: ({ code }) => (
        <Typography variant="subtitle1">
          {code}
        </Typography>
      )
    },
    {
      name: 'scorecards',
      title: 'Үнэлгээ',
      getCellValue: ({ scorecards }) => scorecards.length > 0
        ? scorecards.reduce((total, val) => total + parseInt(val.pivot.score), 0)
        : 0
    },
    {
      name: 'add_score',
      title: ' ',
      getCellValue: ({ id }) => (
        <Button
          onClick={() => setFormOpen(id)}
          startIcon={<AddIcon />}
          variant="outlined"
          color="primary"
        >Үнэлгээ өгөх</Button>
      )
    }
  ])
  const [tableColumnExtensions] = useState([
    {
      columnName: 'add_score',
      width: 180
    },
  ])

  useEffect(() => {
    fetchStudents()
    fetchScorecards()
  }, [])

  const fetchStudents = async () => {
    const { data } = await axios.get('my/students')
    setStudents(data)
  }

  const fetchScorecards = async () => {
    const { data } = await axios.get('my/graduation/scorecards/role')
    setScorecards(data)
  }

  const HeaderCell = props => (
    <TableHeaderRow.Cell
      {...props}
      style={{
        backgroundColor: '#efefef'
      }}
    />
  )

  return (
    <Box className={classes.results}>
      {formOpen > 0 && (
        <ResultsTeacherForm
          onSubmit={() => console.log('success')}
          onClose={() => setFormOpen('')}
          open={formOpen}
        />
      )}
      <Box p={2} pl={4}>
        <MaterialGrid
          container
          alignItems="center"
          justify="space-between"
        >
          <MaterialGrid item>
            <Typography variant="subtitle1">
              <Box fontWeight="fontWeightMedium">Багшын үнэлгээ</Box>
            </Typography>
          </MaterialGrid>
        </MaterialGrid>
      </Box>
      <Grid
        rows={students}
        columns={columns}
      >
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow cellComponent={HeaderCell} />
      </Grid>
    </Box>
  )
}

export default ResultsTeacher