import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid as MaterialGrid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import {
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { getPermissions } from './../redux/auth/selectors'
import { SearchBox } from './../components'
import FolderIcon from '@material-ui/icons/Folder'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';

const useStyles = makeStyles((theme) => ({
  sideBar: {
    backgroundColor: `${theme.palette.primary.main}05`,
    borderRight: `1px solid ${theme.palette.primary.main}20`,
    padding: theme.spacing(3),
    position: 'fixed',
    top: 0,
    bottom: 0,
  },
  list: {
    padding: 0,
  },
  listItem: {
    borderRadius: theme.spacing(0.5),
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: `${theme.palette.primary.main}20`,
    },
  },
  listItemText: {
    minWidth: theme.spacing(25)
  },
}))

function Documents() {
  const classes = useStyles()
  const userPermissions = useSelector(getPermissions)
  const [selectedDirectoryIndex, setSelectedDirectoryIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [directories, setDirectories] = useState([
    {
      name: '20-21 оны намрын улирал...',
      icon: <FolderIcon />,
    },
  ])
  const [documents, setDocuments] = useState([
    {
      name: 'B170930106_diploma',
      size: '50MB',
      directory_name: 'B170930106',
      updated_at: 'Saturday, May 29, 2021',
    },
    {
      name: 'Танилцуулга',
      size: '50MB',
      directory_name: 'B170930106',
      updated_at: 'Saturday, May 29, 2021',
    },
    {
      name: 'B170930001_diploma',
      size: '100MB',
      directory_name: 'B170930001',
      updated_at: 'Saturday, May 29, 2021',
    },
    {
      name: 'Танилцуулга',
      size: '50MB',
      directory_name: 'B170930001',
      updated_at: 'Saturday, May 29, 2021',
    },
    {
      name: 'B170930010_diploma',
      size: '24MB',
      directory_name: 'B170930010',
      updated_at: 'Saturday, May 29, 2021',
    },
    {
      name: 'Танилцуулга',
      size: '50MB',
      directory_name: 'B170930010',
      updated_at: 'Saturday, May 29, 2021',
    },
  ])
  const [tableColumnExtensions] = useState([
    {
      columnName: 'name',
      width: '50%',
    },
  ])
  const [columns] = useState([
    {
      name: 'name',
      title: 'Нэр',
      getCellValue: ({ name }) => (
        <Box
          display="flex"
          alignItems="center"
        >
          <DescriptionOutlinedIcon color="disabled" />
          <Box ml={2}>
            <a
              target="_blank"
              href={`${process.env.REACT_APP_API_URL}/api/documents/${name}.pdf`}
            >
              {name}
            </a>
          </Box>
        </Box>
      ),
    },
    {
      name: 'size',
      title: 'Хэмжээ',
    },
    {
      name: 'updated_at',
      title: 'Шинэчилсэн',
    },
    {
      name: 'directory_name',
      title: 'Хавтас',
    },
  ])

  const GroupCellContent = ({ row }) => (
    <Box display="inline-grid">
      <Box
        display="flex"
        alignItems="center"
      >
        <FolderOutlinedIcon color="disabled" />
        <Box ml={2}>
          {row.value}
        </Box>
      </Box>
    </Box>
  )

  const isUserPermitted = (permission, permissions = []) => {
    const requiredPermissions = [...permissions, permission].filter(val => val !== undefined)
    return requiredPermissions.every(val => userPermissions.includes(val))
  }

  return (
    <MaterialGrid container>
      <MaterialGrid item xs={3}>
        <Box className={classes.sideBar}>
          <Box mb={3}>
            <Typography variant="h5">Бичиг баримтууд</Typography>
          </Box>
          <List
            component="nav"
            className={classes.list}
          >
            <ListItem>
              <Typography
                color="textSecondary"
                variant="subtitle2"
              >Folders</Typography>
            </ListItem>
            {directories.map((item, index) => {
              return isUserPermitted(item.permission, item.permissions) && (
                <ListItem
                  key={index}
                  className={classes.listItem}
                  selected={selectedDirectoryIndex === index}
                  onClick={() => setSelectedDirectoryIndex(index)}
                  button
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    className={classes.listItemText}
                    primary={item.name}
                  />
                </ListItem>
              )
            })}
          </List>
        </Box>
      </MaterialGrid>
      <MaterialGrid item xs>
        <Container>
          <Box py={3}>
            <MaterialGrid
              container
              alignItems="center"
              justify="space-between"
            >
              <MaterialGrid item xs={5}>
                <SearchBox
                  value={search}
                  onChange={setSearch}
                  placeholder="Хайлт хийх..."
                />
              </MaterialGrid>
            </MaterialGrid>
          </Box>
        </Container>
        <Divider />
        <Grid
          rows={documents}
          columns={columns}
        >
          <GroupingState grouping={[{ columnName: 'directory_name' }]} />
          <IntegratedGrouping />
          <Table columnExtensions={tableColumnExtensions} />
          <TableHeaderRow />
          <TableGroupRow
            contentComponent={GroupCellContent}
          />
        </Grid>
      </MaterialGrid>
    </MaterialGrid>
  )
}

export default Documents