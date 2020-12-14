const initialState = { message: "" };

const notificationReducer = (state=initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return  action.data.message
      case 'REMOVE_NOTIFICATION':
        return  initialState

      default:
        return state
    }
  }

  export const setNotificationMessage = (message) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {message}
    }
}
  export const removeNotificationMessage = (message) => {
    return {
        type: 'REMOVE_NOTIFICATION',
    }
}
  
  
  export default notificationReducer