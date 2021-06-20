import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import axios from './../plugins/axios'

function ResultsTeacherForm({
  open,
  onClose,
  onSubmit
}) {
  const [scorecards, setScorecards] = useState([])
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    fetchUserScorecards()
  }, [])

  const getUserScorecardById = (items = [], id) => {
    const item = items.find(val => val.id === id)
    return item !== undefined ? item : false
  }

  const fetchUserScorecards = async () => {
    const {
      scorecards,
      user_scorecards
    } = await axios.get(`users/${open}/scorecards`)

    setScorecards(scorecards.map(val => {
      let userScorecard = getUserScorecardById(user_scorecards, val.id)
      return ({
        id: val.id,
        name: val.name,
        maxScore: val.score,
        score: userScorecard ? userScorecard.pivot.score : ''
      })
    }))
  }

  const handleInputChange = (index, value) => {
    var copyScorecards = scorecards
    if (copyScorecards[index].maxScore >= value) {
      copyScorecards[index].score = value
      setScorecards([...copyScorecards])
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setErrors({})
    setDisabled(true)

    try {
      await axios.post(`my/students/${open}/scorecards`, {
        scorecards: scorecards.map(val => ({
          scorecard_id: val.id,
          score: val.score
        })),
        detachIds: scorecards.map(val => val.id)
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

  return (
    <Dialog open={open > 0}>
      <DialogTitle>Үнэлгээ өгөх</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan dignissim nibh, eu feugiat ex tempus et.
          </DialogContentText>
        <form onSubmit={handleSubmit}>
          {scorecards.map((val, index) =>
            <TextField
              key={val.id}
              onChange={({ target }) => handleInputChange(index, target.value)}
              value={val.score}
              label={val.name}
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                inputProps: {
                  min: 0,
                  max: val.maxScore
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography color="textSecondary">
                      {val.maxScore} /
                     </Typography>
                  </InputAdornment>
                )
              }}
            />
          )}
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
            >Хадгалах</Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ResultsTeacherForm