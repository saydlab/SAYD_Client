import createDataContext from './createDataContext'
import baseURL from '../api/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage';


const userReducer = (state,action) =>{
    switch (action.type){
        case 'book_new_service':
            return {...state,WalletAmount:action.payload}
        case 'try_local_signin':
            return {...state, user_name: action.payload}
        case 'booked_services':
            return {...state, booked_services: action.payload }
        case 'free_slots':
            return {...state, freeSlots: action.payload}
        case 'schedule_booking':
            return {...state, scheduledBooking: action.payload}
        case 'check_booking':
            return {...state, BookingStatus: action.payload}
        default:
            return {...state}
    }
}

const bookNewService = dispatch => async () =>{
    try {
        const serviceDetails = {
            serviceName: "Massage",
            serviceId: "bcb78019-2f21-4e5d-b10f-f1b8b276dd51",
            bookedUserId: "bcb78019-2f21-4e5d-b10f-f1b8b276dd48",
            partnerId: "b68581ab-f72c-49bc-aeaa-102c27d58e5d",
            scheduledTime: '2021-07-15 12:00 - 13:00',
            serviceAmount: '1200',
            serviceLocation: "Chennai"
        }
        let response = await baseURL.post('/booking', serviceDetails)
        console.log(response.data)
        return
        
    } catch (err) {
        console.log("Book new service error",err)
    }
    
}

const getBookings = dispatch => async () =>{
    try {
        let response = await baseURL.get('/bookings/bcb78019-2f21-4e5d-b10f-f1b8b276dd48')
        console.log("response", response.data)

        dispatch({type: 'booked_services', payload: response.data})
    } catch (error) {
        console.log("Get bookings error", error)
    }
}

const getAvailablePartners = dispatch => async () =>{
    try{
        const data = {
            serviceLocation: "Chennai",
            serviceDate: "2021-07-15",
            serviceName: "Massage",
            serviceId: "bcb78019-2f21-4e5d-b10f-f1b8b276dd50"
        }
        let response = await baseURL.post('/available-partners',data)
        dispatch({type: "free_slots", payload: response.data.freeSlots})
        console.log(response.data.freeSlots)
    }catch(error){
        console.log("Get available partners error", error)
    }
}

const scheduleBooking = dispatch => async () =>{
    try {
        const data = {
            partnerId: "b68581ab-f72c-49bc-aeaa-102c27d58e5d",
            serviceName: "Massage",
            serviceId: "bcb78019-2f21-4e5d-b10f-f1b8b276dd50",
            serviceDate: "2021-07-15",
            serviceSlot: "12"
        }

        let response = await baseURL.post('/schedule-booking', data)
        await dispatch({type: 'schedule_booking', payload: response.data})
    } catch (error) {
        console.log("Schedule booking error", error)
    }
}

const checkBooking = dispatch => async (notificationId) =>{
    try {
        let response  = await baseURL.get(`/check-booking/${notificationId}`)
        let resData = response.data

        if (Object.keys(resData).length > 0){
            await dispatch({type:'check_booking', payload: resData})
        }else{
            await dispatch({type:'check_booking', payload: "Success"})
        }
        
        console.log("Check booking", response.data)
    } catch (error) {
        console.log("Check booking error")
    }
}


export const { Context, Provider } = createDataContext(
    userReducer,
    {
        bookNewService, getBookings, getAvailablePartners,scheduleBooking,
        checkBooking
    },
    {
        booked_services:null, freeSlots: null, BookingStatus: "status", scheduledBooking:null
    }
)