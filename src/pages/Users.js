import {
  useState,
  useEffect
} from 'react'
import axios from './../plugins/axios'
import {
  Box
} from '@material-ui/core'

function Users() {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])

  useEffect(() => {
    fetchRoles()
    fetchUsers()
  }, [])

  const fetchRoles = async () => {
    try {
      const { data } = await axios.get('roles')

      setRoles(data)
    } catch (e) {
      // 
    }
  }

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('users')

      setUsers(data)
    } catch (e) {
      // 
    }
  }

  return (
    <Box>
      Hello world
    </Box>
  )
}

export default Users