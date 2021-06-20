import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import axios from './../plugins/axios'

function ScorecardsForm({
  open,
  onClose,
  onSubmit
}) {
  const [scorecards, setScorecards] = useState([])
  const [scorecardId, setScorecardId] = useState('')
  const [roles, setRoles] = useState([])
  const [roleId, setRoleId] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [score, setScore] = useState('')
  const [when, setWhen] = useState(null)
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    fetchScorecards()
    fetchRoles()
  }, [])

  const fetchScorecards = async () => {
    const { data } = await axios.get('my/graduation/scorecards')
    setScorecards(data)
  }

  const fetchRoles = async () => {
    const { data } = await axios.get('roles')
    setRoles(data)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setErrors({})
    setDisabled(true)

    try {
      const {
        data
      } = await axios.post('my/graduation/scorecards', {
        name,
        code,
        score,
        when,
        scorecardId,
        roleId
      })

      setDisabled(false)
      onSubmit()
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
      <DialogTitle>Онооны задаргаа нэмэх</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan dignissim nibh, eu feugiat ex tempus et.
          </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            {...errorMessage('name')}
            onChange={({ target }) => setName(target.value)}
            value={name}
            label="Гарчиг"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            {...errorMessage('code')}
            onChange={({ target }) => setCode(target.value)}
            value={code}
            label="Код"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            {...errorMessage('score')}
            onChange={({ target }) => setScore(target.value)}
            value={score}
            label="Оноо"
            variant="outlined"
            margin="normal"
            type="number"
            fullWidth
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              {...errorMessage('when')}
              onChange={setWhen}
              value={when}
              label="Огноо"
              inputVariant="outlined"
              variant="inline"
              margin="normal"
              disableToolbar
              disablePast
              fullWidth
            />
          </MuiPickersUtilsProvider>
          <FormControl
            margin="normal"
            variant="outlined"
            fullWidth
          >
            <InputLabel>Онооны задаргаа</InputLabel>
            <Select
              onChange={({ target }) => setScorecardId(target.value)}
              value={scorecardId}
            >
              {scorecards.map(val =>
                <MenuItem
                  key={val.id}
                  value={val.id}
                >
                  {val.name}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl
            margin="normal"
            variant="outlined"
            fullWidth
          >
            <InputLabel>Үүрэг</InputLabel>
            <Select
              onChange={({ target }) => setRoleId(target.value)}
              value={roleId}
            >
              {roles.map(val =>
                <MenuItem
                  key={val.id}
                  value={val.id}
                >
                  {val.title}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <Box
            my={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box mr={2}>
              <Button
                onClick={onClose}
                color="primary"
              >Болих</Button>
            </Box>
            <Button
              disabled={disabled}
              color="primary"
              variant="outlined"
              size="large"
              type="submit"
            >Нэмэх</Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog >
  )
}

export default ScorecardsForm