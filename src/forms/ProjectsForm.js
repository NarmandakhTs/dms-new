import { useState } from 'react'
import {
  Box,
  Button,
  TextField
} from '@material-ui/core'
import axios from './../plugins/axios'

function ProjectsForm() {
  const [name, setName] = useState('')
  const [overview, setOverview] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [errors, setErrors] = useState({})

  const reset = () => {
    setName('')
    setOverview('')
    setDisabled(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setErrors({})
    setDisabled(true)

    try {
      await axios.post('projects/new', {
        name,
        overview
      })

      reset()
    } catch ({ response }) {
      if (response.status === 422) {
        setErrors(response.data.errors)
        setDisabled(false)
      }
    }
  }

  const errorMessage = name => ({
    error: !!errors[name],
    helperText: errors[name]
  })

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        {...errorMessage('name')}
        value={name}
        onChange={({ target }) => setName(target.value)}
        label="Нэр"
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <TextField
        {...errorMessage('overview')}
        value={overview}
        onChange={({ target }) => setOverview(target.value)}
        label="Товч танилцуулга"
        margin="normal"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
      />
      <Box
        mt={3}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          disabled={disabled}
          type="submit"
          size="large"
          variant="contained"
          color="primary"
        >Хадгалах</Button>
      </Box>
    </form>
  )
}

export default ProjectsForm