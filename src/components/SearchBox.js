import {
  Box,
  InputBase
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    '& input': {
      height: theme.spacing(6),
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: theme.spacing(1),
      boxShadow: `0 2px 10px #eee`,
      padding: theme.spacing(0, 2),
      paddingLeft: theme.spacing(6),
      transition: '.2s',
      '&:focus': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 5px ${theme.palette.secondary.main}20`,
      }
    },
  },
  iconLeft: {
    position: 'absolute',
    left: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-45%)',
  },
}))

function SearchBox({
  value,
  onChange,
  placeholder
}) {
  const classes = useStyles()

  return (
    <Box className={classes.search}>
      <Box className={classes.iconLeft}>
        <SearchIcon />
      </Box>
      <InputBase
        value={value}
        onChange={({ target }) => onChange(target.value)}
        placeholder={placeholder}
        fullWidth
      />
    </Box>
  )
}

export default SearchBox