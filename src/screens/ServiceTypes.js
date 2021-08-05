import React from 'react'
import {View, Text,ScrollView,TouchableOpacity} from 'react-native'


const ServiceTypes = ({navigation}) =>{
    return(
        <ScrollView>
            <View style={{flex:1}}>
                <View style={{height:200,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:30}} >Poster</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate("ServiceList")}>
                    <View style={{
                                height:100,justifyContent:'center',
                                borderColor:'black',borderWidth:1,borderRadius:5,margin:5
                            }}>
                        <Text style={{marginLeft:20, fontSize:25}}>Massage</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{
                                height:100,justifyContent:'center',
                                borderColor:'black',borderWidth:1,borderRadius:5,margin:5
                            }}>
                        <Text style={{marginLeft:20, fontSize:25}} >Spree Specials</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{
                                height:100,justifyContent:'center',
                                borderColor:'black',borderWidth:1,borderRadius:5,margin:5
                            }}>
                        <Text style={{marginLeft:20, fontSize:25}}>Special facial </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ServiceTypes