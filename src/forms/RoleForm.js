import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from './../plugins/axios'

const useStyles = makeStyles((theme) => ({
  permissionsGroup: {
  }
}))

function RoleForm() {
  const classes = useStyles()
  const [permissions, setPermissions] = useState([])
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [errors, setErrors] = useState([])
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    fetchPermissions()
  }, [])

  const fetchPermissions = async () => {
    try {
      const { data } = await axios.get('permissions')

      setPermissions(data)
      setDisabled(false)
    } catch (e) {
      // 
    }
  }

  const handleStore = async e => {
    e.preventDefault()

    setDisabled(true)

    const params = {
      title,
      code,
      permissions: permissions.reduce((filtered, value) => {
        if (value.checked) filtered.push(value.id)
        return filtered
      }, [])
    }

    try {
      await axios.post('roles', params)

      setDisabled(false)
    } catch ({ response }) {
      if (response.status === 422) {
        console.log(response)
      }
    }
  }

  const handlePermissionChange = (checked, index) => {
    let copyPermissions = permissions
    copyPermissions[index].checked = checked
    setPermissions(copyPermissions)
  }

  return (
    <form onSubmit={handleStore}>
      <Grid
        container
        spacing={2}
      >
        <Grid item xs>
          <TextField
            onChange={({ target }) => setTitle(target.value)}
            value={title}
            label="Title"
            placeholder="Жишээ: Админ, Багш"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            onChange={({ target }) => setCode(target.value)}
            value={code}
            label="Code"
            placeholder="Жишээ: admin, hello-world"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Grid>
      </Grid>
      <Box className={classes.permissionsGroup}>
        <Grid container>
          {/* TODO: Permissions-iig angilaj haruulah */}
          {permissions.map((permission, index) =>
            <Grid
              key={index}
              xs={4}
              item
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                    checked={permissions.checked}
                    onChange={({ target }) => handlePermissionChange(
                      target.checked,
                      index
                    )}
                  />
                }
                label={permission.title}
              />
            </Grid>
          )}
        </Grid>
      </Box>
      <Box
        mt={3}
        mb={1}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          disabled={disabled}
          color="primary"
          variant="contained"
          type="submit"
        >Хадгалах</Button>
      </Box>
    </form>
  )
}

export default RoleForm