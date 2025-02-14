import React, { useEffect, useState } from 'react';
import {Dimensions, FlatList, ScrollView, Text,TouchableOpacity,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const Home=({route})=>{
  const navigate=useNavigation();
  const{height,width}=Dimensions.get('screen');
  // const[data,setData]=useState(false);
  const[todoShow,settodoShow]=useState([]);
  const[completed,setCompleted]=useState([]);
  console.log(route.params);
useEffect(()=>{
  if(route.params?.newtodo)
  {
    settodoShow((prev)=>[...prev,route.params.newtodo]);
  }
},[route.params?.newtodo]);
  const toggleShow=(item,data)=>{

    if(data)
    {
      const updateTodoShow=[];
      for(let i=0;i<todoShow.length;i++)
      {
        if(todoShow[i].title!==item.title)
        {
         updateTodoShow[updateTodoShow.length]=todoShow[i];
      }
    }
    settodoShow(updateTodoShow);
    const updatedCompleted=[...completed,item];
    setCompleted(updatedCompleted);}
    else{
      const updatedCompleted=[];
     for(let j=0;j<completed.length;j++)
     {
      if(completed[j].title!==item.title)
      {
        updatedCompleted[updatedCompleted.length]=completed[i];
     }
    }
    setCompleted(updatedCompleted);
    const updateTodoShow=[...todoShow,item];
    settodoShow(updateTodoShow);
    console.log(todoShow);
    console.log(completed);
  };
};
  return (
    <View style={{flex:1,backgroundColor:'rgb(240, 240, 240)'}}>
      <View style={{borderWidth:1,borderColor:'rgb(74, 55, 128)',height:height*0.30,width:width,borderBottomLeftRadius:15,borderBottomRightRadius:15,backgroundColor:'rgb(74, 55, 128)',alignItems:'center',alignContent:'center',alignSelf:'center'}}>
      <Text style={{borderWidth:1,height:height*0.05,fontSize:30,fontWeight:'900',textAlign:'center',width:width-200,top:'10%',color:'rgb(240, 240, 240)'}}>To Do App</Text>
      </View>
      <View style={{borderWidth:1,backgroundColor:'#fff',height:height*0.35,width:width-20,alignSelf:'center',bottom:height*0.18,borderRadius:15,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
      <Text style={{borderWidth:1,fontSize:25,height:height*0.04,width:width-35,textAlign:'center'}}>To Do</Text>
        <View style={{borderWidth:1,width:width-35,height:height*0.30}}>
        <FlatList
        data={todoShow}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item})=>{return(
          <ScrollView>
         <View>
          <BouncyCheckbox   size={25} fillColor="green" unfillColor="#FFFFFF" text={item.title} iconStyle={{ borderColor: "green" }} onPress={(isChecked)=>{
                                                                                                                                                      toggleShow(item,isChecked)}}/>
          </View>
          </ScrollView>
        )}}/>
        </View> 
      </View>
      <View style={{borderWidth:1,backgroundColor:'#fff',height:height*0.35,width:width-20,alignSelf:'center',bottom:height*0.15,borderRadius:15,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
      <Text  style={{borderWidth:1,fontSize:25,height:height*0.04,width:width-35,textAlign:'center'}}>Completed</Text>
      <View showsVerticalScrollIndicator={false} style={{borderWidth:1,width:width-35,height:height*0.30}}>
        <FlatList
        data={completed}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item})=>{return(
          <ScrollView>
            <View style={{flexDirection:'row'}}>
            <BouncyCheckbox   size={25} fillColor="green" unfillColor="#FFFFFF" text={item.title} iconStyle={{ borderColor: "green" }} onPress={(isChecked)=>{toggleShow(item,!isChecked)}}/>                                                                                                        
             <Text>{item.title}</Text>                                                                                                      
            </View>
            </ScrollView>
        )}}/>
      </View>
      </View>
      <View style={{borderWidth:0.5,height:height*0.06,bottom:height*0.13,width:width-310,alignSelf:'flex-end',right:'2%',borderRadius:15,backgroundColor:'rgb(74, 55, 128)',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity activeOpacity={0.7} style={{height:height*0.06,width:width-310,alignSelf:'center',justifyContent:'center'}} onPress={()=>navigate.navigate('EditScreen')}><Text style={{fontSize:30,color:'#fff',textAlign:'center'}}>+</Text></TouchableOpacity>
      </View>
    </View>
  );
    };
    export default Home;