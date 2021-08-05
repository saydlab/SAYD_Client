import React, { useState, useContext, useEffect } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Context as ServiceContext} from '../context/ServiceContext'


const Bookings = ({navigation}) =>{

    const {getBookings,state:{booked_services}} = useContext(ServiceContext)
    console.log(booked_services)

    useEffect(() =>{
        navigation.addListener('focus', ()=> getBookings())
    },[navigation])

    return(
        <>
        {
            booked_services !== null
            ?
            booked_services.map(service=>{
                return(
                    <TouchableOpacity key={service.id}>
                        <View style={{
                                height:80,backgroundColor:'aliceblue',margin:5,
                                borderRadius:5,
                                elevation: 10,
                                }} >
                            <Text style={{marginLeft:10,marginTop:10,fontSize:20}}>Massage</Text>
                            <Text style={{marginLeft:10,marginTop:10,fontSize:13}}> Scheduled on 27 - 07 - 2021 12:00 - 13:00 hrs</Text>
                        </View>
                    </TouchableOpacity> 
                )
            })
            :
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <Text>Bookings</Text>
            </View>
                
        }
        
        </>
    )
}

export default Bookings