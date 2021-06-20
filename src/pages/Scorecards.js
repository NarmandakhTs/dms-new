import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  Chip,
  Grid as MaterialGrid,
  Typography
} from '@material-ui/core'
import {
  TreeDataState,
  CustomTreeData,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import { ScorecardsForm } from './../forms'
import axios from './../plugins/axios'
import moment from 'moment'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  scorecards: {
    backgroundColor: '#fff',
    boxShadow: `0 5px 10px #e5e5e5`,
    overflow: 'hidden',
    borderRadius: 10,
  }
}))

function Scorecards() {
  const classes = useStyles()
  const [formOpen, setFormOpen] = useState(false)
  const [scorecards, setScorecards] = useState([])
  const [columns] = useState([
    {
      name: 'name',
      title: 'Гарчиг',
      getCellValue: ({ name }) => (
        <Typography variant="subtitle1">
          {name}
        </Typography>
      ),
    },
    {
      name: 'when',
      title: 'Огноо',
      getCellValue: ({ when }) => (
        <Typography variant="subtitle2">
          {when && moment(when).format('MM/DD/YYYY')}
        </Typography>
      )
    },
    {
      name: 'score',
      title: 'Оноо',
      getCellValue: ({ score }) => (
        <Chip
          color="primary"
          variant="outlined"
          label={score}
        />
      )
    },
    {
      name: 'updated_at',
      title: 'Шинэчлэгдсэн',
      getCellValue: ({ updated_at }) => moment(updated_at).format('MM/DD/YYYY'),
    },
  ])
  const [tableColumnExtensions] = useState([
    {
      columnName: 'when',
      width: 100
    },
    {
      columnName: 'score',
      align: 'center',
      width: 200
    },
    {
      columnName: 'updated_at',
      width: 150
    },
  ])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await axios.get('my/graduation/scorecards')
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
    <Box className={classes.scorecards}>
      <Box p={2} pl={4}>
        <MaterialGrid
          container
          alignItems="center"
          justify="space-between"
        >
          <MaterialGrid item>
            <Typography variant="subtitle1">
              <Box fontWeight="fontWeightMedium">Онооны задаргаа</Box>
            </Typography>
          </MaterialGrid>
          <MaterialGrid item>
            <Button
              onClick={() => setFormOpen(true)}
              startIcon={<AddIcon />}
              variant="outlined"
              color="primary"
              size="large"
            >Нэмэх</Button>
            <ScorecardsForm
              onSubmit={() => {
                setFormOpen(false)
                fetchData()
              }}
              onClose={() => setFormOpen(false)}
              open={formOpen}
            />
          </MaterialGrid>
        </MaterialGrid>
      </Box>
      <Grid
        rows={scorecards}
        columns={columns}
      >
        <TreeDataState />
        <CustomTreeData
          getChildRows={(row, rootRows) => {
            const childRows = rootRows.filter(r => r.scorecard_id === (row ? row.id : null))
            return childRows.length ? childRows : null
          }}
        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow cellComponent={HeaderCell} />
        <TableTreeColumn
          for="name"
        />
      </Grid>
    </Box>
  )
}

export default Scorecards