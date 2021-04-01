import axios from './../plugins/axios'
import { useSelector } from 'react-redux'
import { getUserDepartment } from './../redux/auth/selectors'
import {
  useState,
  useEffect
} from 'react'
import {
  SortingState,
  IntegratedSorting,
  SelectionState,
  IntegratedSelection,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Snackbar,
  Grid as MaterialGrid,
} from '@material-ui/core'
import { Header } from './../layouts/App'
import Alert from '@material-ui/lab/Alert'
import AddIcon from '@material-ui/icons/Add'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PublishIcon from '@material-ui/icons/Publish';
import { StudentsNew } from './'

function StudentInfo({ name, surname }) {
  return (
    <MaterialGrid
      container
      spacing={2}
      alignItems="center"
    >
      <MaterialGrid item>
        <Avatar>T</Avatar>
      </MaterialGrid>
      <MaterialGrid item>
        {`${surname} ${name}`}
      </MaterialGrid>
    </MaterialGrid>
  )
}

function StudentActions() {
  return (
    <MaterialGrid
      container
      alignItems="center"
    >
      <MaterialGrid item>
        <IconButton>
          <VisibilityIcon />
        </IconButton>
      </MaterialGrid>
    </MaterialGrid>
  )
}

function Students() {
  const department = useSelector(getUserDepartment)
  const [loading, setLoading] = useState(true)
  const [uploadStudentDialog, openUploadStudentDialog] = useState(false)
  const [uploadStudentsSuccess, setUploadStudentsSuccess] = useState(false)
  const [selection, setSelection] = useState([])
  const [students, setStudents] = useState([])
  const [columns] = useState([
    {
      name: 'info',
      title: 'Овог нэр',
      getCellValue: ({ name, surname }) => (
        <StudentInfo
          name={name}
          surname={surname}
        />
      ),
    },
    {
      name: 'code',
      title: 'Оюутны код'
    },
    {
      name: 'phone_number',
      title: 'Утасны дугаар'
    },
    {
      name: 'actions',
      title: 'Actions',
      getCellValue: () => <StudentActions />,
    },
  ])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`departments/${department}/students`)

      setStudents(data)
      setLoading(false)
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
    <>
      <Header
        title="Students"
        breadcrumbs={[
          { label: 'App', to: '/' },
          { label: 'Students' },
        ]}
        actions={
          <MaterialGrid
            container
            spacing={1}
            alignItems="center"
          >
            <MaterialGrid item>
              <Button
                onClick={() => openUploadStudentDialog(true)}
                startIcon={<PublishIcon />}
                variant="outlined"
                color="primary"
              >Upload Users</Button>
            </MaterialGrid>
            <MaterialGrid item>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                color="primary"
              >Add Users</Button>
            </MaterialGrid>
          </MaterialGrid>
        }
      />
      <Box bgcolor="white">
        {loading && <LinearProgress />}
        <Grid
          rows={students}
          columns={columns}
        >
          <SortingState
            defaultSorting={[{
              columnName: 'code',
              direction: 'asc'
            }]}
            columnExtensions={[{
              columnName: 'actions',
              sortingEnabled: false
            }]}
          />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={10}
          />
          <IntegratedSorting />
          <IntegratedSelection />
          <IntegratedPaging />
          <Table columnExtensions={[{
            columnName: 'actions',
            width: 100
          }]} />
          <TableHeaderRow showSortingControls />
          <TableSelection showSelectAll />
          <PagingPanel
            pageSizes={[10, 25]}
          />
        </Grid>
        <StudentsNew
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
    </>
  )
}

export default Students