const initialState = { message: "" };

const notificationReducer = (state=initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION': {
        return  action.content
      }
      case 'REMOVE_NOTIFICATION':
        return  initialState

      default:
        return state
    }
  }

  export const setNotificationMessage = (message, time) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        content: {message, time}
      })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' })
      }, time*1000)
     }
  }

  export const removeNotificationMessage = (message) => {
    return {
        type: 'REMOVE_NOTIFICATION',
    }
}
  
  
  export default notificationReducer