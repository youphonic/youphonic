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


export const localLogin = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const googleLogin = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/google',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const facebookLogin = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/facebook',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
			.catch(failed => dispatch(authenticated(null)))

export default reducer;
