import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  TextField
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useParams } from 'react-router-dom'
import axios from './../plugins/axios'

function ProjectRequestForm() {
  const params = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [approverId, setApproverId] = useState('')
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const path = params.id ? `projects/${params.id}/users` : 'my/project/users'
    const { data } = await axios.get(path)
    setUsers(data)
  }

  const reset = () => {
    setTitle('')
    setDescription('')
    setApproverId('')
    setDisabled(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setErrors({})
    setDisabled(true)

    try {
      const path = params.id ? `projects/${params.id}/requests` : 'my/project/requests'
      await axios.post(path, {
        title,
        description,
        approverId
      })

      reset()
    } catch ({ response }) {
      if (response.status = 422) {
        setErrors(response.data)
        setDisabled(false)
      }
    }
  }

  const handleAutocomplete = (e, option) => {
    const value = !!option ? option.id : ''
    setApproverId(value)
  }

  const errorMessage = name => ({
    error: !!errors[name],
    helperText: errors[name]
  })

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        {...errorMessage('title')}
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        label="Гарчиг"
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <TextField
        {...errorMessage('description')}
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        label="Тайлбар"
        margin="normal"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
      />
      <Autocomplete
        onChange={handleAutocomplete}
        options={users}
        getOptionLabel={(option) => `${option.surname} ${option.name}`}
        // TODO: renderOption deer user image haruulah
        renderInput={(params) =>
          <TextField
            {...params}
            label="Хүлээн авагч"
            variant="outlined"
            margin="normal"
          />
        }
      />
      <Box
        mt={3}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          disabled={disabled}
          color="primary"
          type="submit"
          variant="outlined"
          size="large"
        >Хадгалах</Button>
      </Box>
    </form>
  )
}

export default ProjectRequestForm