import React from 'react'
import {View, Text,ScrollView,TouchableOpacity} from 'react-native'


const ServiceList = ({navigation}) =>{
    return(
        <ScrollView>
            <View style={{flex:1}}>
                <View style={{height:200,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:30}} >Poster</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate("ServiceDetail")}>
                    <View style={{
                                height:100,
                                borderColor:'black',borderWidth:1,borderRadius:5,margin:5
                            }}>
                        <Text style={{marginLeft:10, marginTop:10, fontSize:20}}>Stress relief head massage</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{
                                height:100,
                                borderColor:'black',borderWidth:1,borderRadius:5,margin:5
                            }}>
                        <Text style={{marginLeft:10, marginTop:10, fontSize:20}}>Neck and shoulder massage</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{
                                height:100,
                                borderColor:'black',borderWidth:1,borderRadius:5,margin:5
                            }}>
                        <Text style={{marginLeft:10, marginTop:10, fontSize:20}}>Head to foot therapy</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ServiceList