import { View, Text,Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const Home = () => {
  const{height,width}=Dimensions.get('screen');
  const Navigation=useNavigation();
  const[renderItems,setRenderItems]=useState([]);
 const[completedTodo,setCompletedTodo]=useState([]);
const[renderData,setRenderData]=useState(true);
const[getData,setGetData]=useState(true);
const[pendingTodo,setPendingTodo]=useState(false);
const[doneTodo,setDoneTodo]=useState(false);
const[pendingtitle,setPendingTitle]=useState('');
const[pendingdesc,setPendingdesc]=useState('');
const[pendingDate,setPendingDate]=useState('');
const[pendingTime,setPendingTime]=useState('');
const[completedTitle,setCompletedTitle]=useState('');
const[completedDesc,setCompletedDesc]=useState('');
const[completedDate,setCompletedDate]=useState('');
const[completedTime,setCompletedTime]=useState('');
const[todoData,setTodoData]=useState([]);
const[checkPendingControl,setCheckPendingControlled]=useState(false);
const[checkDoneControl,setCheckDoneControlled]=useState(true);
const[todoDeleted,setTodoDeleted]=useState(true);
const[completedTodoDeleted,setCompletedTodoDeleted]=useState(true);
    const fetchData=async()=>{
    let renderData=true;
    try{
      if(!renderItems || renderItems.length===0)
        {
          console.log('data is not fetch now');
        }
      let response=await fetch('http://10.0.2.2:3000/api/todo');
      if(response.ok)
      {
        let data=await response.json();
        if(renderData)
       {setRenderItems(data);
       console.log('renderData',renderItems);
      }
      }
      else{
        console.log('error occur while getting response');
      }
    }
    catch(err)
    {
      if(err)
      {
        console.log('In Catch fetchtodo',err.status);
      }
    }
  
    return()=>{
      renderData=false;
    }
  };
  


useEffect(()=>{
  if(renderData)
  {
    fetchData();
  }
},[]);


    
    const fetchCompletedtodo=async()=>{
      let getData=true;
      try{
        const response=await fetch('http://10.0.2.2:3000/api/fetchCompletedtodo');
        if(response.ok)
        {
          const data=await response.json();
          if(getData)
          {
            console.log('fetch completed record',data);
            setCompletedTodo(data);
          }
        }
        else{
          console.log('error occur while getting response',response.status);
        }
      }
      catch(err)
      {
        if(err)
        {
          console.log('In catch of fetch completed records',err.status);
        }
      }
      return()=>{
      getData=false;
    }
    };
    
  
 useEffect(()=>{
  if(getData)
  {
    fetchCompletedtodo();
  }
},[]);




 const updateTodo= async(record)=>{
  
  if(!record || record.length===0)
  {
    console.log('record isempty');
  }
  else{
    
    const title=record.title;
  const description=record.description;
  const ischecked=record.ischecked;
  const date=record.date;
  const time=record.time;
  console.log('title:=>',title);
  console.log('desc=>',description);
  console.log('ischecked=>',ischecked);
  console.log('date=>',date);
  console.log('time=>',time);
  let passData=true;
   try{
      let response= await fetch('http://10.0.2.2:3000/api/updateRecord',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({title,description,ischecked,date,time}),
      });
      if(response.ok)
      {
        const data=await response.json();
          console.log(' pass data in completed todo ',data);
          fetchCompletedtodo();
          fetchData();
      }
      else{
      const data= await response.json();
        // console.log('error occur while getting response',response.status);
        // console.log('response in else: ',response.json());
        console.log('response in else: ',data);
      }
    }
    catch(err){
     console.log('In catch updateTodo',err); 
    }
  }
    return()=>{
      passData=false;
    }
 };

 const updateCompleteTodo=async(data)=>{
  if(!data || data.length===0)
  {
    console.log('data is empty');
  }
 else{
  const title=data.title;
  const description=data.description;
  const ischecked=data.ischecked;
  const date=data.date;
  const time=data.time;
  console.log('title:=>',title);
  console.log('desc=>',description);
  console.log('ischecked=>',ischecked);
  console.log('date=>',date);
  console.log('time=>',time);
 try{
    console.log('in try block ');
    console.log('title',title);
  console.log('description',description);
      const response=await fetch('http://10.0.2.2:3000/api/completedtodo',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({title,description,ischecked,date,time}),
      });
     
      if(response.ok)
      {
        const data= await response.json();
        console.log('fetch record from updateCompleted todo',data);
        fetchCompletedtodo();
        fetchData();
      }
      else{
        const data= await response.json();
        console.log('fetch record from updateCompleted todo',response.status);
        console.log('fetch record from updateCompleted todo',data);
        console.log('error occur while fetching response with updateCompleted todo');
      }
    }
    catch(err){
      
      console.log('in catch');
      console.log('in catch of updated completed todo',err.message);
      if(err)
      {
        const data= await response.json();
        console.log('fetch record from updateCompleted todo',response.status);
        console.log('fetch record from updateCompleted todo',data);
        console.log('in catch of updated completed todo',err);
      }
    }}
 };

 const updatePendingTodo=(record)=>{
  if(record)
  {
    setTodoData(record);
     setPendingTodo(true);
     setDoneTodo(false);
     setPendingTitle(record.title);
     setPendingdesc(record.description);
     setPendingDate(record.date);
     setPendingTime(record.time);
  }
 };
 const updateDoneTodo=(data)=>{
  if(data)
  {
    setTodoData(data);
     setPendingTodo(false);
     setDoneTodo(true);
     setCompletedTitle(data.title);
     setCompletedDesc(data.description);
     setCompletedDate(data.date);
     setCompletedTime(data.time);

  }
 };

 const deletePendingTodo=async(todoData)=>{
  console.log('data exist in  todo data',todoData);
  try{
    const title=todoData.title;
    const description=todoData.description;
    console.log('title',title);
    console.log('description',description);
    const response=await fetch('http://10.0.2.2:3000/api/deletePendingTodo',{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({title,description}),
    });
    // console.log('response',response.ok);
    if(response.ok)
    {
      const data=await response.json();
      console.log('Delete record successfully',data);
      fetchCompletedtodo();
      fetchData();
      setPendingTodo(false);
    }
    else{
      const data=await response.json();
      console.log('coulnot delete record from pending todo'.data.message);
    }
  }
  catch(err){
    console.log('In Catch ',err);
  }
 };

 
 const deleteCompletedTodo=async(todoData)=>{
  console.log('data exist in completed todo data',todoData);
  try{
    const title=todoData.title;
    const description=todoData.description;
    console.log('title',title);
    console.log('description',description);
    const response=await fetch('http://10.0.2.2:3000/api/deleteCompletedTodo',{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({title,description}),
    });
    // console.log('response',response.ok);
    if(response.ok)
    {
      const data=await response.json();
      console.log('Delete record successfully',data);
      fetchCompletedtodo();
      fetchData();
      setDoneTodo(false);
    }
    else{
      const data=await response.json();
      console.log('coulnot delete record from pending todo'.data.message);
    }
  }
  catch(err){
    console.log('In Catch ',err);
  }
 };


  return (
    <View style={{flex:1,backgroundColor:'rgb(74, 55, 128)'}}>
      <View style={{height:height*0.06,width:width,borderWidth:0.5,backgroundColor:'#f0f8ff',borderBottomRightRadius:10,borderBottomLeftRadius:10,alignSelf:'center',alignContent:'center',alignItems:'center',justifyContent:'center',flexDirection:'row',elevation:24}}>
     
       <Text style={{fontSize:22,fontWeight:'bold'}}> TO DO </Text>
       <Icons name={'file-edit-outline'} size={30} color={'#000'}/>
      </View>
      <View>
      <Text style={{fontSize:22,fontWeight:'bold',top:height*0.09,left:'2%',color:'rgb(240, 240, 240)'}}>Pending:-</Text>
      <View style={{flexDirection:'row',backgroundColor:'#f0f8ff',height:height*0.22,width:width-20,alignSelf:'center',borderRadius:20,top:height*0.10,elevation:24}}>
     <ScrollView style={{borderWidth:0.5,borderRadius:20,margin:5,padding:5}}>
     {renderItems.slice().reverse().map((record,index)=>{   //slice method make copy of array and reverse method reverse the copy array not original array
      return(
      <View key={index}>
      
        <TouchableOpacity onPress={()=>{updateTodo(record);
                                        setDoneTodo(false);
                                        setPendingTodo(false);}}  onLongPress={()=>updatePendingTodo(record)} iconStyle={{borderWidth:2,borderColor:'grey'}}  text={record.title} style={{borderWidth:1,borderColor:'transparent',height:height*0.04,width:width-50,marginTop:'2%',marginBottom:'2%'}}>
          <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',alignContent:'center',justifyContent:'flex-start',height:height*0.04,width:width-50}}>
      <Icons name='checkbox-blank-circle-outline' size={27} color={'rgb(74, 55, 128)'} style={{borderWidth:1,borderColor:'transparent',height:height*0.03}}/>
     <Text style={{borderWidth:1,borderColor:'transparent',fontSize:18,left:'10%',height:height*0.028,width:width-120,color:'rgb(56, 59, 67)'}}>{record.title}</Text>
     </View>
        </TouchableOpacity>
        
      </View>
     )})}
     </ScrollView>
      </View>
      </View>
      {pendingTodo?(<View style={{borderWidth:1,borderColor:'transparent',elevation:24,height:height*0.30,width:width-120,position:'absolute',alignSelf:'center',top:height*0.20,left:'26%',backgroundColor:'#f0f8ff',borderRadius:20}}>
                  <Text style={{textAlign:'center',fontSize:20}}>{pendingTodo?'To Do':'Completed To Do'}</Text>
                  <Text style={{borderWidth:0.2,height:height*0.000,top:'3%'}}/>
                 <View style={{top:'5%',borderWidth:1,borderColor:'transparent',height:height*0.065,width:width-125,justifyContent:'center',alignSelf:'center',alignContent:'center',alignItems:'center'}}>
                  <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.03,width:width-125,textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgb(74, 55, 128)'}}>Title:-</Text>
                   <Text style={{fontSize:17,fontWeight:'500',fontStyle:'italic',textAlign:'center',borderWidth:1,borderColor:'transparent',height:height*0.034,width:width-125}}>{pendingtitle}</Text>
                   </View>
                   <View style={{top:'8%',borderWidth:1,borderColor:'transparent',height:height*0.065,width:width-125,justifyContent:'center',alignSelf:'center',alignContent:'center',alignItems:'center'}}>
                 <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.03,width:width-125,textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgb(74, 55, 128)'}}>Description:-</Text>
                  <Text style={{fontSize:17,fontWeight:'500',fontStyle:'italic',textAlign:'center',borderWidth:1,borderColor:'transparent',height:height*0.034,width:width-125}}>{pendingdesc}</Text>
                  </View>
                  {/* <View style={{borderWidth:0.2,height:height*0.00,width:width-125,top:'6%',alignSelf:'center'}}/> */}
                  <View style={{borderWidth:0.2,height:height*0.055,width:width-125,top:'6%',alignSelf:'center',flexDirection:'row',justifyContent:'space-between'}}>
                   <View style={{borderWidth:0.2,borderColor:'transparent',height:height*0.055,width:width-280,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgb(74, 55, 128)'}}>Date:-</Text>
                    <Text style={{textAlign:'center',fontSize:17,fontWeight:'800'}}>{pendingDate}</Text>
                   </View>
                   <View style={{borderWidth:0.2,borderColor:'transparent',height:height*0.055,width:width-280}}>
                   <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgb(74, 55, 128)'}}>Time:-</Text>
                   <Text style={{textAlign:'center',fontSize:17,fontWeight:'800'}}>{pendingTime}</Text>
                   </View>
                  
                    </View>
                  <View style={{flexDirection:'row' ,borderWidth:1,borderColor:'transparent',justifyContent:'space-between',position:'absolute',bottom:'2%',alignContent:'center',alignItems:'center',alignSelf:'center',height:height*0.04,width:width-180}}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>setPendingTodo(false)} style={{borderWidth:0.2,elevation:10,height:height*0.04,width:width-350,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',borderRadius:10,backgroundColor:'#fff'}}><Text style={{fontSize:17,fontWeight:'800'}}>OK</Text></TouchableOpacity>
                    <TouchableOpacity  activeOpacity={0.6} onPress={()=>{deletePendingTodo(todoData);
                                                                        setTodoDeleted(true);
                    }} style={{borderWidth:0.2,elevation:10,height:height*0.04,width:width-310,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',borderRadius:10,backgroundColor:'#fff'}}><Text style={{fontSize:17,fontWeight:'500'}}>Delete Todo</Text>
                    </TouchableOpacity>
                  </View>
                  </View>):console.log('null')}
                 
      <View>
      <Text style={{fontSize:22,fontWeight:'bold',top:height*0.19,left:'2%',color:'rgb(240, 240, 240)'}}>Completed:-</Text>
      <View style={{flexDirection:'row',backgroundColor:'#f0f8ff',height:height*0.22,width:width-20,alignSelf:'center',borderRadius:20,top:height*0.20,elevation:24}}>
    
     <ScrollView style={{borderWidth:0.5,borderRadius:20,margin:5,padding:5}}>
     {completedTodo.slice().reverse().map((data,index)=>{  //in flatlist inverted prop is used to reverse array
      
      return(
      <View key={index}>
      
      <TouchableOpacity  activeOpacity={0.7} style={{borderWidth:1,borderColor:'transparent',height:height*0.04,width:width-50,marginTop:'2%',marginBottom:'2%'}}  onPress={()=>{updateCompleteTodo(data);
                                                                                                                                                     setDoneTodo(false);
                                                                                                                                                   setPendingTodo(false);}} onLongPress={()=>updateDoneTodo(data)}>
     <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',alignContent:'center',justifyContent:'flex-start',height:height*0.04,width:width-50}}>
      <Icons name='check-circle' size={27} color={'rgb(74, 55, 128)'} style={{borderWidth:1,borderColor:'transparent',height:height*0.03}}/>
     <Text style={{borderWidth:1,borderColor:'transparent',fontSize:18,left:'10%',height:height*0.028,width:width-120,color:'rgb(56, 59, 67)'}}>{data.title}</Text>
     </View>
     </TouchableOpacity> 
  
    </View>
     )})}
     </ScrollView>
      </View>
      </View>
      {doneTodo?(<View style={{borderWidth:1,borderColor:'transparent',elevation:24,height:height*0.32,width:width-120,position:'absolute',alignSelf:'center',top:height*0.5,left:'28%',backgroundColor:'#f0f8ff',borderRadius:20}}>
                  <Text style={{textAlign:'center',fontSize:20}}>{pendingTodo?'To Do':'Completed To Do'}</Text>
                  <Text style={{borderWidth:0.2,height:height*0.000,top:'2%'}}/>
                 <View style={{top:'4%',borderWidth:1,borderColor:'transparent',height:height*0.065,width:width-125,justifyContent:'center',alignSelf:'center',alignContent:'center',alignItems:'center'}}>
                  <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.03,width:width-125,textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgb(74, 55, 128)'}}>Title:-</Text>
                   <Text  style={{fontSize:17,fontWeight:'500',fontStyle:'italic',textAlign:'center',borderWidth:1,borderColor:'transparent',height:height*0.034,width:width-125}}>{completedTitle}</Text>
                   </View>
                   <View style={{top:'5%',borderWidth:1,borderColor:'transparent',height:height*0.065,width:width-125,justifyContent:'center',alignSelf:'center',alignContent:'center',alignItems:'center'}}>
                 <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.03,width:width-125,textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgb(74, 55, 128)'}}>Description:-</Text>
                  <Text style={{fontSize:17,fontWeight:'500',fontStyle:'italic',textAlign:'center',borderWidth:1,borderColor:'transparent',height:height*0.034,width:width-125}}>{completedDesc}</Text>
                  </View>
                  <View style={{borderWidth:0.2,height:height*0.055,width:width-125,top:'7%',alignSelf:'center',flexDirection:'row',justifyContent:'space-between'}}>
                   <View style={{borderWidth:0.2,borderColor:'transparent',height:height*0.055,width:width-280,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgb(74, 55, 128)'}}>Date:-</Text>
                    <Text style={{textAlign:'center',fontSize:17,fontWeight:'800'}}>{completedDate}</Text>
                   </View>
                   <View style={{borderWidth:0.2,borderColor:'transparent',height:height*0.055,width:width-280}}>
                   <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgb(74, 55, 128)'}}>Time:-</Text>
                   <Text style={{textAlign:'center',fontSize:17,fontWeight:'800'}}>{completedTime}</Text>
                   </View>
                  
                    </View>
                  <View style={{flexDirection:'row' ,borderWidth:1,borderColor:'transparent',justifyContent:'space-between',position:'absolute',bottom:'5%',alignContent:'center',alignItems:'center',alignSelf:'center',height:height*0.04,width:width-180}}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>setDoneTodo(false)} style={{borderWidth:0.2,elevation:10,height:height*0.04,width:width-350,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',borderRadius:6,backgroundColor:'#fff'}}><Text style={{fontSize:17,fontWeight:'800'}}>OK</Text></TouchableOpacity>
                    <TouchableOpacity  activeOpacity={0.6} onPress={()=>{deleteCompletedTodo(todoData);
                                                                         setCompletedTodoDeleted(true);
                    }} style={{borderWidth:0.2,elevation:10,height:height*0.04,width:width-310,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',borderRadius:6,backgroundColor:'#fff'}}><Text style={{fontSize:17,fontWeight:'500'}}>Delete Todo</Text></TouchableOpacity>
                  </View>
                  </View>):console.log('null')}
              {/* {completedTodoDeleted?(
                <View style={{borderWidth:0.2,borderColor:'transparent',height:height*0.04,width:width-100,alignSelf:'center',top:'85%',alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',position:'absolute'}}>
                  <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center',color:'#fff'}}>Deleted completed record successfully !!</Text>
                  </View>):null
              } */}
               {/* {todoDeleted?(
                    <View style={{flex:1,backgroundColor:'rgba(42, 45, 46,0.7)',height:height,width:width,position:'absolute'}}>
                <TouchableOpacity activeOpacity={0.88} onPress={()=>setTodoData(false)} style={{top:'45%'}}>
                <View >
                  <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center',color:'#fff'}}>Deleted todo record successfully !!</Text>
                  </View>
                  </TouchableOpacity>
                  </View>):null
              } */}
      <TouchableOpacity onPress={()=>Navigation.navigate('EditScreen')} activeOpacity={0.7} style={{borderWidth:1,height:height*0.055,width:width-360,alignContent:'center',alignItems:'center',alignSelf:'flex-end',justifyContent:'center',right:'2%',borderRadius:20,bottom:'1%',position:'absolute',backgroundColor:'#fff',borderColor:'rgb(252, 252, 250)'}}>
        <Icons name='plus'size={26} color={'#000'} />
      </TouchableOpacity>
    </View>
  
  );
};

export default Home;