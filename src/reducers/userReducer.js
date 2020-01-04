import { GET_USER, CLEAR_USER } from '../actions/types'

const INITIAL_STATE = {
    userId : null,
    userName : null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case GET_USER:
            return { 
                ...state, 
                userId: action.payload.El, 
                userName: action.payload.w3.U3 
            }
        case CLEAR_USER:
            return {
                ...state, 
                userId: null, 
                userName: null 
            }
        default:
            return state
    }
}