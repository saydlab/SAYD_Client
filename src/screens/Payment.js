import React, { useState, useContext} from 'react'
import {View, Text, ToastAndroid} from 'react-native'
import {Button} from 'react-native-elements'
import {Context as MainContext} from '../context/MainContext'
import {Context as ServiceContext} from '../context/ServiceContext'

const Payment = ({navigation}) =>{

    const {addWalletAmount, payServiceBill, state:{ WalletAmount }} = useContext(MainContext)
    const [serviceBill, setServiceBill] = useState(500)

    console.log("WalletAmount",WalletAmount)

    const makePayment = async () =>{
        await payServiceBill(WalletAmount,serviceBill)
        ToastAndroid.show('Payment made successfully',ToastAndroid.SHORT)
        setTimeout(() => {
            navigation.navigate('HomeTab')
        }, 1500);
    }

    return(
        <View style={{flex:1}}>
            <View style={{height:200,borderColor:'black',borderWidth:1,borderRadius:5 ,margin:5,justifyContent:'center'}} >
                <Text style={{alignSelf:'center',marginBottom:10}} >Pay for your service</Text>
                <Button 
                    title="Pay Rs:500/-" 
                    containerStyle={{position:'absolute',bottom:0,width:'100%'}} 
                    onPress={ makePayment }
                />
            </View>
        </View>
    )
}

export default Payment