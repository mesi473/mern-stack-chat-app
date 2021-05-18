import {combineReducers} from 'redux'
const initialState={
    success:null,
    message:[],
    userName:'',
    people_you_may_know:[],
    confirmRequest:'',
    messages:[],
    user:[],
    friends:[],
    isEdited:false,
    isChanged:false,
    isAdded:false,
    timelines:[],
}

const signUpReducer=(state=initialState,action)=>{
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                success:action.payload.success
            }
        case "REGISTER":
            if(action.payload.message){
                return {
                    ...state,
                    message:action.payload.message
                }
            }else if(action.payload.success){
                return {
                    ...state,
                    success:action.payload.success
                }
            }else{
                return state;
            }
        case "CHANGE-STATUS":
            return {
                ...state,
                success:action.payload
            }
        case "ADD_USERNAME":
            return {
                ...state,
                userName:action.payload
            }
        case "FEATCH_PEOPLE_YOU_MAY_KNOW":
            return{
                ...state,
                people_you_may_know:action.payload
            }
        case "FETCH_MESSAGE":
            return{
                ...state,
                messages:action.payload
            }
        case "ACCEPT_REQUEST":
            return{
                ...state
            }
        case "ASK_REQUEST":
            return{
                ...state
            }
        case "USER":
            return{
                ...state,
                user:action.payload
            }
        case "USER-FRIENDS":
            return{
                ...state,
                friends:action.payload
            }
        case "SEND_MESSAGE":
            return{
                ...state
            }
        case "EDIT_PROFILE":
            return{
                ...state,
                isEdited:action.payload
            }
        case "ADD_PROFILE_PIC":
            return{
                ...state,
                isChanged:action.payload
            }
        case "ADD_TIMELINE":
            return{
                ...state,
                isAdded:action.payload
            }
        case "FETCH_TIMELINE":
            return{
                ...state,
                timelines:action.payload
            }
        default:
            return state;
    }
}
export default combineReducers({
    signUpReducer
})