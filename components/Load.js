import * as DocumentPicker from 'expo-document-picker';
import React,{Component} from 'react';
import * as FileSystem from 'expo-file-system';
import StackNavigator from 'react-navigation';
import {STATUS} from '../shared/status';
import {VITAL} from '../shared/vital';
import { Card } from 'react-native-elements';
import {RefreshControl,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import NativeUploady, {
  UploadyContext,
  useItemFinishListener,
  useItemStartListener,
  useItemErrorListener,
} from "@rpldy/native-uploady";
import{ useState, useCallback, useContext } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text,FlatList, StatusBar, Button, ImageBackground, Image } from "react-native";
import { ListItem } from 'react-native-elements';
import { LIST } from '../shared/list';
function RenderItem(props){
  const item=props.item;
  if(item!=null){
    return(
  <Card featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={props.image} >
        <Text style={{fontSize:20,fontWeight:'bold'}} >{`value: ${props.val}`}</Text>
     
  </Card>
    )
  }
  else{
    return(<View></View>)
  }
}

class Load extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
     vital:VITAL,
     v1:String,
     v2:String,
     v3:String,
     v4:String,
     v5:Array,
     refreshing:false
    };

}
static navigationOptions = {
    title: 'Load'
};
componentDidMount(){
  const { navigate } = this.props.navigation;
  if(!STATUS.login){
   navigate('MyForm');
  }
  let token="Bearer "+STATUS.token;
  fetch('http://192.168.1.104:3000/patients/'+STATUS.id,{
    method:"GET",
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
      'Authorization':token
    },
  }).then((responce)=>{
    responce.json().then((result)=>{
      console.log(result);
      this.setState({v1:result.heartrate});
      this.setState({v2:result.oxygen});
      this.setState({v3:result.steps[0]});
      this.setState({v4:result.calories[0]});
      this.setState({v5:result.steps});
       
    }).catch((err)=>{console.log(err);})
  })
}
Upload(){
DocumentPicker.getDocumentAsync({type:"*/*",copyToCacheDirectory:true,multiple:false}).then((resp)=>{
  console.log(resp.uri);
  FileSystem.readAsStringAsync(resp.uri).then((res)=>{
    console.log(res);
    const list=res.split(',');
    console.log(list);
    let arr=[];
    let vital;
    const regex=/shealth.tracker.heart_rate/;
    const isExisting=regex.test(resp.name);
    /**console.log(list[26]);
    console.log(list[26+17+17+17])**/
    if(!isExisting){
      console.log("wrong file");
    }
    else{
    var k=res.split(',').filter((element)=>{
      const reg=/[0-9][0-9]*\.[0-9][0-9]*/;
      const reg2=/-/
      return reg.test(element) && !reg2.test(element);
    });
    console.log('k');
    console.log(k);
    var g =k[0];
    let token="Bearer "+STATUS.token;
    fetch('http://192.168.1.104:3000/patients/'+STATUS.id,{
      method:"PUT",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
        'Authorization':token
      },
     
      body:JSON.stringify({username:STATUS.username,password:STATUS.password,admin:STATUS.admin,heartrate:g})
    }).then((responce)=>{
       responce.json().then((result)=>{
       console.warn("result",result);
       }).catch((err)=>console.log(err))
    })}
  /**   var i;
  for(i=26;i<list.length;i=i+17){
     console.log(list[i]);
    }**/
  }).catch((err)=>console.log(err));
  console.log(resp);
 
}).catch((err)=>console.log(err));
}

Oxygen(){
  DocumentPicker.getDocumentAsync({type:"*/*",copyToCacheDirectory:true,multiple:false}).then((resp)=>{
    console.log(resp.uri);
    FileSystem.readAsStringAsync(resp.uri).then((res)=>{
    const regex=/oxygen/
    console.log(resp.name);
    const isExisting=regex.test(resp.name);
    if(!isExisting){
      console.log("wrong file");
    }
    var k=res.split(',').filter((element)=>{
      const reg=/[0-9][0-9]*\.[0-9][0-9]*/;
      const reg2=/-/
      return reg.test(element) && !reg2.test(element);
    });
  console.log('k');
  console.log(k);
    console.log(res);
    var g =k[0];
    let token="Bearer "+STATUS.token;
    fetch('http://192.168.1.104:3000/patients/'+STATUS.id,{
      method:"PUT",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
        'Authorization':token
      },
     
      body:JSON.stringify({username:STATUS.username,password:STATUS.password,admin:STATUS.admin,oxygen:g})
    }).then((responce)=>{
      responce.json().then((result)=>{
      console.warn("result",result);
    
      }).catch((err)=>console.log(err))
   })
  
  }).catch((err)=>console.log(err));
}).catch((err)=>{console.log(err)});
}
Steps(){
  DocumentPicker.getDocumentAsync({type:"*/*",copyToCacheDirectory:true,multiple:false}).then((resp)=>{
    console.log(resp.uri);
    FileSystem.readAsStringAsync(resp.uri).then((res)=>{
      const regex=/pedometer_day_summary/;
        console.log(resp.name);
        const isExisting=regex.test(resp.name);
        if(!isExisting){
          console.log("wrong file");
        }
        var k=res.split(',').filter((element)=>{
           const reg=/[0-9][0-9]*\.[0-9][0-9]*/;
           const reg2=/-/;
           const reg4=/[a-zA-Z]/
           const reg3=/[0-9][0-9]*/;
          return (reg.test(element) || reg3.test(element) ) && !reg2.test(element) && !reg4.test(element);
        });
        var i;
        var arr=[];
        for(i=10;i<k.length && i<100;i=i+10){
          console.log(k[i]);
          arr.push(k[i]);
        }
        
       // console.log(k);
        var g =k[0];
        let token="Bearer "+STATUS.token;
        fetch('http://192.168.1.104:3000/patients/'+STATUS.id,{
          method:"PUT",
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            'Authorization':token
          },
         
          body:JSON.stringify({username:STATUS.username,password:STATUS.password,admin:STATUS.admin,steps:arr})
        }).then((responce)=>{
          responce.json().then((result)=>{
          console.warn("result",result);
        
          }).catch((err)=>console.log(err))
       })
    }).catch((err)=>{console.log(err)});
  }).catch((err)=>{console.log(err);})
}
logout(){
  const { navigate } = this.props.navigation;
  this.setState({token:''});
  STATUS.login=false;
  this.setState({login:false});
  STATUS.token='';
  navigate('MyForm');
 }
Calories(){
  DocumentPicker.getDocumentAsync({type:"*/*",copyToCacheDirectory:true,multiple:false}).then((resp)=>{
    console.log(resp.ui);
    FileSystem.readAsStringAsync(resp.uri).then((res)=>{
      const regex=/pedometer/;
      console.log(resp.name);
      const isExisting=regex.test(resp.name);
      if(!isExisting){
        console.log("wrong file");
      }
      var k=res.split(',').filter((element)=>{
        const reg=/[0-9][0-9]*\.[0-9][0-9]*/;
        const reg2=/-/;
        const reg4=/[a-zA-Z]/
        const reg3=/[0-9][0-9]*/;
       return (reg.test(element) || reg3.test(element) ) && !reg2.test(element) && !reg4.test(element);
     });
     var i;
     var arr=[];
     console.log(k[16]);
     for(i=16;i<k.length && i <100;i=i+10){
       console.log(k[i]);
       arr.push(k[i]);
     }
     var g =k[0];
     let token="Bearer "+STATUS.token;
     fetch('http://192.168.1.104:3000/patients/'+STATUS.id,{
       method:"PUT",
       headers:{
         Accept:'application/json',
         'Content-Type':'application/json',
         'Authorization':token
       },
      
       body:JSON.stringify({username:STATUS.username,password:STATUS.password,admin:STATUS.admin,calories:arr})
     }).then((responce)=>{
      responce.json().then((result)=>{
      console.warn("result",result);
    
      }).catch((err)=>console.log(err))
   })
     //console.log(k);
    }).catch((err)=>{console.log(err);})
  }).catch((err)=>{console.log(err);})
}


render(){
 
 
return (
  
  <ScrollView >
  <Button  color="purple" hasTVPreferredFocus title="Heart-rate" onPress={this.Upload.bind(this)}/>
  <Button color="purple" title="Oxygen" onPress={this.Oxygen.bind(this)}/>
  <Button color="purple" title="Steps" onPress={this.Steps.bind(this)}/>
  <Button color="purple" title="Calories" onPress={this.Calories.bind(this)}/>
  <RenderItem item={this.state.vital.filter((item)=>item.id==0)[0]} val={this.state.v1} list={this.state.v5} image={require('./images/heart22.jpg')}/>
  <RenderItem item={this.state.vital.filter((item)=>item.id==1)[0]} val={this.state.v2} image={require('./images/oxygen.jpg')}/>
  <RenderItem item={this.state.vital.filter((item)=>item.id==2)[0]} val={this.state.v3} image={require('./images/steps.jpg')}/>
  <RenderItem item={this.state.vital.filter((item)=>item.id==3)[0]}  val={this.state.v4} image={require('./images/calories.jpg')}/>
  <Button
      color="purple"
        title={'logout'}
        style={styles.input}
        onPress={this.logout.bind(this)}
      />
  </ScrollView>
)

}
}
const styles=StyleSheet.create({
  button:{
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:12,
    borderRadius:4,
    elevation:3,
    backgroundColor:'black',
  },
  text:{
    fontSize:16,
    lineHeight:21,
    fontWeight:'bold',
    letterSpacing:0.25,
    color:'white',
  },
});
export default Load;