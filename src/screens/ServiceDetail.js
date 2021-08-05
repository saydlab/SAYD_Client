import React, { useContext, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import {Button, Divider, Overlay} from 'react-native-elements'
import {Context as ServiceContext} from '../context/ServiceContext'
import DateTimePicker from '@react-native-community/datetimepicker'
import DropDownPicker from 'react-native-dropdown-picker'
import { getDateFromTimestamp } from '../components/getDate'


const ServiceDetail = ({navigation}) =>{

    const { getAvailablePartners, scheduleBooking, checkBooking,
            state:{freeSlots, scheduledBooking, BookingStatus} } = useContext(ServiceContext)

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("Select a slot")
    const [visible, setVisible] = useState(false)
    const [show, setShow] = useState(false)
    const [pollingFlag, setPollingFlag] = useState(false)
    const [clearFlag, setClearFlag] = useState(false)
    const [intervalId, setIntervalId] = useState(null)
    const [bookingScheduled, setBookingScheduled] = useState(false)
    const [scheduling, setScheduling] = useState(false)


    let flag = true
    const slots = [
        "00:00 - 01:00", "01:00 - 02:00", 
        "02:00 - 03:00", "03:00 - 04:00",
        "04:00 - 05:00", "05:00 - 06:00",
        "06:00 - 07:00", "07:00 - 08:00",
        "08:00 - 09:00", "09:00 - 10:00",
        "10:00 - 11:00", "11:00 - 12:00",
        "12:00 - 13:00", "13:00 - 14:00",
        "14:00 - 15:00", "15:00 - 16:00",
        "16:00 - 17:00", "17:00 - 18:00",
        "18:00 - 19:00", "19:00 - 20:00",
        "20:00 - 21:00", "21:00 - 22:00",
        "22:00 - 23:00", "23:00 - 00:00"
    ]

    const bookService = async () =>{
        setVisible(false)
        let tempDate = getDateFromTimestamp(date)
        navigation.navigate('ConfirmBooking', {tempDate, slot:{slotId: value, slotHrs: slots[value]}})
    }

    const confirmWithPartner = async () =>{
        scheduleBooking()
        setPollingFlag(true)
        
    }

    if(scheduledBooking !== null && pollingFlag){
        setScheduling(true)
        let pollingInterval =  setInterval(() => {
            checkBooking(scheduledBooking.id)
        }, 10000)
        setPollingFlag(false)
        setIntervalId(pollingInterval)
        setClearFlag(true)
    }

    if(BookingStatus === "Success" && clearFlag){
        clearInterval(intervalId)
        console.log("Interval cleared")
        setClearFlag(false)
        setTimeout(() => {
            bookService()
        }, 1000);
    }

    const onChange = async (event, selectedDate) => {
        setDate(selectedDate)
        setShow(false)
        await getAvailablePartners()
        setVisible(true)
    }

    let items = []

    if( freeSlots != null && flag){
        let i
        for(i in freeSlots){
            items.push({label: slots[freeSlots[i]], value: freeSlots[i]})
        }
        flag = false
    }
   

    return(
        <View style={{flex:1}}>
            <View style={{ margin:5}} >
                <Text style={{margin:5, fontWeight:'bold', fontSize:20}} >Stress relief head massage</Text>
                <Text style={{marginLeft:10, fontSize:13}} >{'\u2605'} 4.3</Text>
                <Text style={{marginLeft:10, fontSize:13, marginBottom:5}} >{'\u20B9'} 1,200</Text>
                <Divider/>
                <View style={{marginLeft:10, marginTop:10, marginRight:5}} >
                    <View style={{flexDirection:'row'}} >
                        <Text>{'\u2022'}</Text>
                        <Text style={{marginLeft:10}} >Medium pressure full body therapy</Text>
                    </View>
                    <View style={{flexDirection:'row'}} >
                        <Text>{'\u2022'}</Text>
                        <Text style={{marginLeft:10}} >Recommended for : Stress, Tensed muscles, Joint pains</Text>
                    </View>
                    <View style={{flexDirection:'row'}} >
                        <Text>{'\u2022'}</Text>
                        <Text style={{marginLeft:10}} >Benefits: Lower stress levels and anxiety, improves blood circulation, better sleep</Text>
                    </View>
                </View>
            </View>
            {
                show
                ?
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                />
                :
                null
            }
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)} overlayStyle={{padding:20,height:300}}>
                <>
                {
                    scheduling
                    ?
                    <View style={{width:300, alignItems:'center', top:100}} >
                        <ActivityIndicator  size="large" color="blue" style={{alignSelf:'center'}} />
                        <Text style={{marginTop:20}} >We are searching a partner for you...</Text>
                    </View>
                   
                    :
                    <>
                        <View style={{width:300}} >
                            <Text style={{fontSize:15, marginBottom:10}} >Choose preferred slot</Text>
                            <DropDownPicker
                                items = {items}
                                open={open}
                                value={value}
                                setOpen={()=>setOpen(!open)}
                                setValue={(v)=>setValue(v)}
                                placeholder="Select"
                            />
                        </View>
                        <Button 
                            title='Proceed' 
                            onPress={confirmWithPartner} 
                            containerStyle={{marginTop:20, marginBottom:10, position:'absolute', bottom:0, alignSelf:'center'}}
                            type='clear'
                            />
                    </>
                }
                </>
            </Overlay>
            
            <Button title="Schedule Booking" containerStyle={{position:'absolute',bottom:0,width:'100%'}} onPress={()=>setShow(true)} />
        </View>
    )  
}

export default ServiceDetail