import { View, Text,Dimensions, TouchableOpacity,Button,Platform } from 'react-native';
import React, { useState } from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";

const EditableScreen = () => {
    const{height,width}=Dimensions.get('screen');
    const navigation=useNavigation();
    const[error,setError]=useState(false);
    const[title,setTitle]=useState('');
    const[desc,setDesc]=useState('');
    const [date, setDate] = useState(new Date());  //new date() object of j.s. store date or time which user select and when first render it show the actual time or date
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date"); // Can be "date" or "time"
  const[alarm,setAlarm]=useState(false);
  const[calendar,setCalendar]=useState(false);
  const[adjustDate,setAdjustDate]=useState('00/00/0000');
  const[adjustTime,setAdjustTime]=useState('00:00:00');

  const onChange = (event:any, selectedDate:Date) => {
    
    // console.log('event', Date(event.nativeEvent.timestamp));
    console.log('event',event.type==="dismissed"); 
    if ( event.type==="set" && selectedDate) {  
      setDate(selectedDate);
      console.log('selectedDate',selectedDate);  //specify time in universal time 
      console.log('event',event); //specify timestamp means timing in millieseconds when we use date object which specify actual date and time 
      if(mode==="date")
      {setAdjustDate(selectedDate.toLocaleDateString());
        console.log('adjustdate',adjustDate);
      }
      else
    {  setAdjustTime(selectedDate.toLocaleTimeString());
      console.log('adjust time',adjustTime);
    }
     
    }
    else{
      if(mode==="date")
        {
          setAdjustDate('00/00/0000');
        }
        else
      {  
        setAdjustTime('00:00:00');
      }
      
     
     // console.log('event',event);  when user select cancel button even set dismiss or when user press ok button even set with set type 
    }
    setShow(false); // Hide picker after selection
    setAlarm(false);
    setCalendar(false);
  };

 
  
    const handleData=async()=>{
        if(!title || !desc ||adjustDate==='00/00/000' || adjustTime==='00:00:00')
        {
           setError(true);
        }
        else{
          setError(false);
         
          try{
            let response=await fetch('http://10.0.2.2:3000/api/todo',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({title:title,description:desc,date:adjustDate,time:adjustTime}),
            });
            if(response.ok)
            {
              let data=await response.json();
              console.log('stored data in todo table',data);
              navigation.navigate('home');       
            }
            else{
              let data=await response.json();
              console.log('error occur while getting response from server',data);
              console.log('error occur while getting response from server',response.status);
            }
          }
          catch(err){
            if(err)
            {
              console.log('In Catch ',err);
            }
          }
        }
    };
    return (
    <View style={{flex:1,backgroundColor:'#f0f8ff'}}> 
    <View style={{borderWidth:1,borderColor:'transparent',height:height*0.30,width:width,borderBottomLeftRadius:15,borderBottomRightRadius:15,backgroundColor:'rgb(74, 55, 128)'}}>
    <View style={{borderWidth:1,borderColor:'transparent',height:height*0.05,width:width,flexDirection:'row',alignContent:'center',alignItems:'center',alignSelf:'flex-start'}} >
    <TouchableOpacity style={{left:'2%',transform:[{rotate:'270deg'}]}} onPress={()=>navigation.navigate('home')} ><Icons  name={'arrow-up-circle-outline'} size={35} color={'rgb(240, 240, 240)'} /></TouchableOpacity>
    <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.05,fontSize:30,width:width-150,textAlign:'center',fontWeight:'900',color:'rgb(240, 240, 240)',left:'12%'}}>Create To Do</Text>
    </View>
    <Text style={{borderWidth:0.2,height:height*0.000,width:width}}/>
    </View>
      <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.70,width:width-20,borderRadius:15,bottom:height*0.18,alignSelf:'center',backgroundColor:'rgb(240, 240, 240)',elevation:24}}>
       <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.05,width:width-150,top:'4%',left:'2%',textAlign:'left',fontSize:25,fontWeight:'bold',justifyContent:'center',alignContent:'center',alignItems:'center',paddingLeft:'2%'}}>Title:-</Text>
       <TextInput placeholder='Enter Title' value={title} onChangeText={(title)=>setTitle(title)} underlineColor='grey' activeUnderlineColor='rgb(74, 55, 128)' style={{width:width-45,alignSelf:'center',top:'3%'}}/>
       <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.05,width:width-150,top:'8%',left:'2%',textAlign:'left',fontSize:25,fontWeight:'bold',justifyContent:'center',alignContent:'center',alignItems:'center',paddingLeft:'2%'}}>Description:-</Text>
       <TextInput placeholder='Enter Description' value={desc} onChangeText={(desc)=>setDesc(desc)} underlineColor='grey' activeUnderlineColor='rgb(74, 55, 128)' style={{width:width-45,alignSelf:'center',top:'7%'}}/>
       
        {/* <Text style={{top:150}}>{date.toDateString()}</Text>
        <Text style={{top:170}}>{date.toLocaleString()}</Text>
        <Text>{date.toString()}</Text>
         same as  Date(date)
        <Text style={{top:180}}>{date.toLocaleTimeString()}</Text> */}
        <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.05,width:width-150,top:'12%',left:'2%',textAlign:'left',fontSize:25,fontWeight:'bold',justifyContent:'center',alignContent:'center',alignItems:'center',paddingLeft:'2%'}}>Set Date:-</Text>
        <View style={{flexDirection:'row',top:'11%',justifyContent:'space-between',borderWidth:0.2,height:height*0.07,width:width-60,alignSelf:'center',alignContent:'center',alignItems:'center'}}>
       <TouchableOpacity activeOpacity={0.7}  style={{borderWidth:0.2,height:height*0.069,width:width-330,alignContent:'center',alignItems:'center',alignSelf:'flex-start',justifyContent:'center',backgroundColor:'#fff'}} onPress={() =>{ setMode("date");
                                                                                                                                                                                                                                            setShow(true);     
                                                                                                                                                                                                                                            setCalendar(true);
                                                                                                                                                                                                                                            setAlarm(false);
                                                  
       }} ><Icons name={calendar?'calendar':'calendar-outline'} size={35} />
       </TouchableOpacity>
       <View style={{borderWidth:0.2,backgroundColor:'#fff',height:height*0.07,width:width-170,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
       <View style={{height:height*0.05,width:width-220,backgroundColor:'rgb(231, 224, 236)',borderRadius:20,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
           <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'rgb(56, 59, 67)'}}>{adjustDate}</Text>
       </View>
       </View>
       </View>
       <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.05,width:width-150,top:'16%',left:'2%',textAlign:'left',fontSize:25,fontWeight:'bold',justifyContent:'center',alignContent:'center',alignItems:'center',paddingLeft:'2%'}}>Set Time:-</Text>
       <View style={{flexDirection:'row',top:'15%',justifyContent:'space-between',borderWidth:0.2,height:height*0.07,width:width-60,alignSelf:'center',alignContent:'center',alignItems:'center'}}>
       
       < TouchableOpacity activeOpacity={0.7} style={{borderWidth:0.2,height:height*0.07,width:width-330,alignContent:'center',alignItems:'center',alignSelf:'flex-end',justifyContent:'center',backgroundColor:'#fff'}} onPress={() =>{ setMode("time");
                                                  setShow(true);
                                                  setAlarm(true);
                                                  
                                                  
       }} ><Icons name={alarm?'alarm-sharp':'alarm-outline'} size={35}/>
       </TouchableOpacity>
       <View style={{borderWidth:0.2,backgroundColor:'#fff',height:height*0.07,width:width-170,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
       <View style={{height:height*0.05,width:width-220,backgroundColor:'rgb(231, 224, 236)',borderRadius:20,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
        <Text style={{textAlign:'center',fontSize:20,fontWeight:'600',color:'rgb(56, 59, 67)'}}>{adjustTime}</Text>
       </View>
       </View>
       </View>
<View style={{borderWidth:1,position:'absolute'}}>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}  //datetime or date ,time
          display={
            mode === "date"
              ? "spinner" // Use "calendar" for date mode
              : "spinner" // Use "clock" for time mode (or "spinner")
          }
          is24Hour={true}  //by default true 
          onChange={onChange}
          minimumDate={date}
          maximumDate={new Date(2030,11,31)}
        />
      )}
      </View>
   
     
      <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.09,width:width-40,top:'19%',alignSelf:'center',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity style={{alignSelf:'center',height:height*0.06,width:width-210,borderWidth:1,borderColor:'rgb(74, 55, 128)',borderRadius:10,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'rgb(74, 55, 128)'}} onPress={()=>handleData()}><Text style={{textAlign:'center',fontSize:23,fontWeight:'700',color:'#fff'}}>Add</Text></TouchableOpacity>
      </View>
      </View>
      {error&&(<View style={{flex:1,backgroundColor:'rgba(31, 31, 31,0.4)',height:height,width:width,position:'absolute'}}>
        <View style={{borderWidth:0.2,height:height*0.18,width:width-50,borderRadius:10,alignSelf:'center',backgroundColor:'rgb(231, 224, 236)',flexDirection:'column',top:height*0.40,elevation:24}}>
      <View style={{alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',borderWidth:0.2,height:height*0.065,width:width-50,borderTopRightRadius:10,borderTopLeftRadius:10,borderBottomLeftRadius:10,borderBottomRightRadius:10,backgroundColor:'rgb(74, 55, 128)'}}> 
         <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',color:'#fff'}}>Message</Text>
         </View>
      <View style={{borderWidth:1,borderColor:'transparent',height:height*0.128,width:width-52,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
      <Text style={{fontSize:20,fontWeight:'500',textAlign:'center',top:'8%',color:'rgb(56, 59, 67)'}}>Please Fill All The Details</Text>
      <TouchableOpacity style={{borderWidth:0.5,height:height*0.048,width:width-320,top:'17%',alignSelf:'center',borderRadius:10,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#fff',elevation:5}} onPress={()=>setError(false)}><Text style={{fontSize:20,fontWeight:'700',textAlign:'center',color:'rgb(56, 59, 67)'}}>OK</Text></TouchableOpacity>
      </View>
      </View>
      </View>)}
    </View>
  );
};

export default EditableScreen;