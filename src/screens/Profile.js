import React, { useState, useContext } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { Button, Image, Divider } from 'react-native-elements'
import {Context as UserContext} from '../context/UserContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

const image = 'https://reactnative.dev/img/tiny_logo.png'

const Profile = () =>{

    const {logoutUser} = useContext(UserContext)

    return(
        <View style={{flex:1}}>
            <Image
                source={{uri: image}}
                style={{ width: 100, height: 100, alignSelf:'center',margin:10 }}
                containerStyle={{alignSelf:'center'}}
                />
            <Text style={{fontSize:18, marginBottom:20, textAlign:'center'}}>Pragadeesh Raj</Text>

            <Divider/>
            <TouchableOpacity> 
            <View style={{margin:10, flexDirection:'row', alignItems:'center'}}>
                <MaterialCommunityIcons name="information" color='black' size={20} />
                <Text style={{fontSize:20, marginLeft:10}} >My Info</Text>
            </View>
            </TouchableOpacity>

            <Divider/>
            <TouchableOpacity>
                <View style={{margin:10,flexDirection:'row', alignItems:'center'}} >
                    <Entypo name="wallet" color='black' size={20} />
                    <Text style={{fontSize:20, marginLeft:10}}>My Wallet</Text>
                </View>
            </TouchableOpacity>
            
            <Divider/>
            <TouchableOpacity>
                <View style={{margin:10,flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons name="reorder-horizontal" color='black' size={20} />
                    <Text style={{fontSize:20, marginLeft:10}}>My Orders</Text>
                </View>
            </TouchableOpacity>
            
            <Divider/>
            <TouchableOpacity>
                <View style={{margin:10,flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons name="logout" color='black' size={20} />
                    <Text style={{fontSize:20, marginLeft:10}}>Logout</Text>
                </View>
            </TouchableOpacity>
            <Divider/>
            {/* <Button title="Logout" type='outline' onPress={logoutUser} /> */}
        </View>
    )
}

export default Profile