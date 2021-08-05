import React from 'react'
import {View, Text,TouchableOpacity} from 'react-native'


const Service = ({navigation}) =>{

    return(
        <View style={{flex:1}}>
            <View style={{height:150,backgroundColor:'aliceblue',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:30}}>Poster</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("ServiceTypes")} >
                <View 
                    style={{
                        height:100,justifyContent:'center',
                        borderColor:'black',borderWidth:1,borderRadius:5,margin:5
                    }}>
                    <Text style={{marginLeft:20, fontSize:25}} >Salon Service</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    )
}

export default Service