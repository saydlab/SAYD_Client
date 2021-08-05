import React, { useState, useContext } from 'react'
import {View, Text} from 'react-native'
import {Button} from 'react-native-elements'
import { Context as MainContext} from '../context/MainContext'

const Wallet = () =>{

    const {state:{ WalletAmount }} = useContext(MainContext)

    return(
        <View style={{flex:1}}>
            <Text style={{marginLeft:10, marginTop:10,fontSize:25}} >Your Wallet</Text>
            <View style={{height:130,borderColor:'black',justifyContent:'center', borderWidth:1,marginHorizontal:5,marginVertical:5,borderRadius:5}} >
                <View style={{flexDirection:'row',justifyContent:'space-around'}} >
                    <Text style={{fontSize:20}} >You have</Text>
                    <Text style={{fontSize:20}} >Rs: {WalletAmount}/-</Text>
                </View>
                <View style={{marginTop:20,position:'absolute',bottom:0,alignSelf:'center',marginBottom:5}} >
                    <Button title='Recharge' type='clear' />
                </View>
                
            </View>
        </View>
    )
}

export default Wallet