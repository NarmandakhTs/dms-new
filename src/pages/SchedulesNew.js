import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField
} from '@material-ui/core'
import axios from './../plugins/axios'

function SchedulesNew({
  open,
  onClose
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [labelsIds, setLabelsIds] = useState('')
  const [labels, setLabels] = useState([])
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    fetchLabels()
  }, [])

  const fetchLabels = async () => {
    const { data } = await axios.get('my/graduation/labels')
    setLabels(data)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setErrors({})
    setDisabled(true)

    try {
      // TODO: submit ajildag bolgo
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
    <Dialog open={open}>
      <DialogTitle>Хуваарь нэмэх</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Quisque et nulla tempor, scelerisque quam id, tristique nibh. Vestibulum varius porta quam vel placerat. Sed a sodales est.
          </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={({ target }) => setTitle(target.value)}
            value={title}
            label="Гарчиг"
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            onChange={({ target }) => setDescription(target.value)}
            value={description}
            label="Тайлбар"
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
            <Box mr={2}>
              <Button
                onClick={onClose}
                size="large"
                variant="outlined"
              >Болих</Button>
            </Box>
            <Button
              disabled={disabled}
              color="primary"
              size="large"
              type="submit"
              variant="contained"
            >Хадгалах</Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SchedulesNew