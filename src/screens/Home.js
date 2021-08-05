import React,{useState} from 'react'
import {View, Text,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid'


const Home = ({navigation}) =>{

    const [searchItem, setSearchItem] = useState('')
    const services = ["Salon","Spa","Pest control","Massage","Painters","Cleaning","Electricians","Plumbers","Carpenters"]

    return(
        <SafeAreaView style={{flex:1}}>
            <SearchBar
                placeholder="Search for services"
                onChangeText={val=>setSearchItem(val)}
                value={searchItem}
                containerStyle={{padding:0}}
                lightTheme
            />
            <View style={{height:200,backgroundColor:"aliceblue",alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:40}} >Posters</Text>
            </View>
            <FlatGrid 
                    itemDimension={110}
                    data={services}
                    spacing={5}
                    renderItem={({item,index})=>{
                        return(
                            <TouchableOpacity onPress={()=>navigation.navigate("Service")} >
                                <View style={{borderColor:'black',borderWidth:1,borderRadius:5}} >
                                    <Text style={{alignSelf:'center',marginBottom:30,marginTop:30}} >{item}</Text>
                                </View>
                            </TouchableOpacity>
                            
                        )
                    }}
                />
        </SafeAreaView>
    )
}

export default Home