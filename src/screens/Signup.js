import React,{useState, useContext, useEffect} from 'react'
import {SafeAreaView, View, Text, TextInput, Keyboard,TouchableWithoutFeedback} from 'react-native'
import {Input, Divider, Icon, Overlay, Button} from 'react-native-elements'
import CalendarPicker from 'react-native-calendar-picker';
import {Context as UserContext} from '../context/UserContext'

const Signup = ({navigation}) =>{

    const [showCalendar, setShowCalendar] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [dob, setDob] = useState("DOB")
    const {signUp} = useContext(UserContext)
    // useEffect(()=>{
    //     navigation.addListener('focus', () =>{
    //         setInput(createRef())
    //     })
    // })

    const signUpUser = async () =>{
        await signUp({name, email, phone_no:phoneNo, date_of_birth:dob})
    }

    return(
        <SafeAreaView style={{flex:1}} >
            <View>
                <Text style={{alignSelf:'center', fontSize:22, marginTop:10}} >SAYD</Text>
                <Input 
                    placeholder='Name' 
                    leftIcon={{ type: 'material-community', name: 'face-profile' }}
                    onChangeText={(val)=>setName(val)} />
                <Input 
                    placeholder='Email' 
                    leftIcon={{ type: 'material-community', name: 'email' }}
                    onChangeText={(val)=>setEmail(val)} />
                <Input 
                    placeholder='Phone' 
                    leftIcon={{ type: 'material-community', name: 'cellphone' }}
                    onChangeText={(val)=>setPhoneNo(val)} />
                <TouchableWithoutFeedback onPress={()=>setShowCalendar(true)} >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start',alignItems: 'center'}} >
                    <Icon name='heartbeat' type='font-awesome' style={{padding: 10,}} />
                    <Text style={{fontSize:17,color:'gray'}} >{dob}</Text>
                </View>
                </TouchableWithoutFeedback>
                <Divider style={{marginHorizontal:10,height:1,backgroundColor:'gray'}} />
                <Button containerStyle={{marginTop:20}} type='clear' title='Sign Up to SAYD' onPress={signUpUser} />
                {
                    showCalendar
                    ?
                    <Overlay isVisible={showCalendar} onBackdropPress={()=>setShowCalendar(!setShowCalendar)} >
                        <CalendarPicker onDateChange={(date)=>{
                            setDob(date.format('YYYY-MM-DD'))
                            setShowCalendar(false)
                            }} />
                    </Overlay>
                    :
                    null
                }
            </View>
        </SafeAreaView>
    )
}

export default Signup