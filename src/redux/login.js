import axios from 'axios'

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

const LOGOUT_USER = 'LOGOUT_USER'
export const logout_user = user => ({
  type: LOGOUT_USER, user
})

const reducer = (state=null, action) => {
  switch(action.type) {
    case AUTHENTICATED:
      return action.user
  	case 	LOGOUT_USER:
  		return action.user
  	default: return state;
  }
}

// persists user to db upon oAuth/passport login
export const saveUser = (info) =>
  dispatch =>
    axios.post('/api/users', info)
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

// local login using passport
export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

// logs out user and removes from 'auth' on redux store
export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

// puts logged in user upon redux store as 'auth'
export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
			.catch(failed => dispatch(authenticated(null)))

export default reducer;
