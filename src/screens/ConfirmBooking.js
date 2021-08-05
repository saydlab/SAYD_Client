import React, {useState, useContext} from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import {Button, Overlay} from 'react-native-elements'
import {Context as ServiceContext} from '../context/ServiceContext'



const ConfirmBooking = ({navigation, route}) =>{
    
    const { bookNewService, scheduleBooking } = useContext(ServiceContext)
    const [visible, setVisible] = useState(false)
    const [ai, setAi] = useState(true)
    const [processText, setProcessText] = useState("Processing...")
    const routeValue = route.params 
    const date = '2021 - 07 - 15'
    const time = routeValue.slot.slotHrs

    const confirmBooking = () =>{
        setVisible(true)
        setTimeout(() => {
            setAi(false)
            setProcessText(`${'\u2705'} Booking Confirmed`)
            setTimeout(() => {
                bookNewService()
                setVisible(false)
                navigation.navigate("Home")
            }, 1000);
        }, 2000)
    }

    return(
        <View style={{flex:1}} >
            <View>
                <Text style={{margin:5, fontWeight:'bold', fontSize:22}}>Review your booking</Text>
                <Text style={{margin:5, fontWeight:'bold', fontSize:20}} >Stress relief head massage</Text>
                <Text style={{marginLeft:10, fontSize:13, marginBottom:5}} >{'\u20B9'} 1,200</Text>
                <Text style={{marginLeft:10, fontSize:17, marginBottom:5}}>Scheduled on:</Text>
                <Text style={{marginLeft:25}} >Date: {date} </Text>
                <Text style={{marginLeft:25}}>Time: {time} hrs</Text>
            </View>
            <Button title='Confirm Booking' containerStyle={{position:'absolute',bottom:0,width:'100%'}} onPress={confirmBooking} />
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)} overlayStyle={{padding:50, width:300,height:150}} >
                <>
                {
                    ai
                    ?
                    <ActivityIndicator  size="large" color="#00ff00" style={{alignSelf:'center'}} />
                    :
                    null
                }
                <Text style={{marginTop:10, alignSelf:'center', fontSize:16}} >{processText} </Text>
                </>
            </Overlay>
        </View>
    )
}

export default ConfirmBooking