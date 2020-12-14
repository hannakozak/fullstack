
const initialState = "my message"

const notificationReducer = (state= initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return  action.data;
      default:
        return state
    }
  }
  
  
  export default notificationReducer