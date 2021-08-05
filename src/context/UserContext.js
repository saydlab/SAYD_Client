import createDataContext from './createDataContext'
import baseURL from '../api/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage';


const userReducer = (state,action) =>{
    switch (action.type){
        case 'signup':
            return {...state,user_name:action.payload}
        case 'try_local_signin':
            return {...state, user_name: action.payload}
        default:
            return {...state}
    }
}

const signUp = dispatch => async (userData) =>{
    try {
        console.log(userData)
        let response = await baseURL.post('/user', userData)
        console.log(response.data.body)
        
         if(response.status === 200){
            const data = JSON.parse(response.data.body)
             const newUser = {
                 id: data.newUser.data.id,
                 email: data.newUser.data.email,
                 userName: userData.name
             }
             await AsyncStorage.setItem("userData",JSON.stringify(newUser))
             
             await dispatch({type:'signup', payload:newUser.userName})
         }
        //  return
    } catch (err) {
        console.log("Signup error",err)
    }
    
}

const tryLocalSignin = dispatch => async () =>{
    try {
        await AsyncStorage.getItem('userData',async (err, res)=>{
            if(err){
                throw err
            }
            if(res !== null){
                const data = JSON.parse(res)
                await dispatch({type:'try_local_signin', payload:data.userName})
            }
        })
        
    } catch (err) {
        console.log("Try local signin error", err)
    }
}

const logoutUser = dispatch => async () =>{

    await AsyncStorage.removeItem('userData', (err, res)=>{
        if(err){
            console.log(err)
        }
        console.log(res)
    })
}

export const { Context, Provider } = createDataContext(
    userReducer,
    {
        signUp, tryLocalSignin, logoutUser
    },
    {
        user_email:null, user_name:null, user_id:null
    }
)