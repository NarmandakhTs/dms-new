import { useState } from 'react'
import axios from './../plugins/axios'
import {
  Box,
  Button,
  TextField,
  Grid
} from '@material-ui/core'

function RequestDiscussionForm({
  onSuccess,
  requestId
}) {
  const [discussion, setDiscussion] = useState('')
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    setErrors({})
    setDisabled(true)

    try {
      await axios.post(`my/project/requests/{id}/discussions`, {
        discussion
      })

      setDiscussion('')
      setDisabled(true)
    } catch ({ response }) {
      if (response.status === 422) {
        setErrors(response.data)
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
      <Grid
        container
        spacing={2}
      >
        <Grid item xs>
          <TextField
            {...errorMessage('discussion')}
            onChange={({ target }) => setDiscussion(target.value)}
            value={discussion}
            placeholder="Enter discussion..."
            variant="outlined"
            fullWidth
            multiline
            rows={6}
          />
        </Grid>
        <Grid item>
          <Button
            disabled={disabled}
            color="primary"
            size="large"
            type="submit"
            variant="outlined"
          >Хадгалах</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default RequestDiscussionForm