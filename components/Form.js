
import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet,Text } from 'react-native';
import {STATUS} from '../shared/status';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
class MyForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      login:STATUS.login,
      token:STATUS.token,
      admin:false,
      id:'',
      heart:''
      //store:null
    };
  }
  static navigationOptions = {
    title: 'MyForm'
};
componentDidMount(){
  const { navigate } = this.props.navigation;
  if(STATUS.login){
    navigate('Load');
  }
}
  onLogin() {
    
    const { username, password } = this.state;
    const { navigate } = this.props.navigation;
    
      fetch('http://192.168.1.104:3000/users/login',{
      method:"POST",
      headers:{
      Accept:'application/json',
    'Content-Type':'application/json',
      },
      body: JSON.stringify(this.state)
    }).then((responce)=>{
      responce.json().then((result)=>{
       /**  localStorage.setItem('login',JSON.stringify({
          login:true,
          token:result.token
        }))**/
        var valeur;
        AsyncStorage.setItem('token',result.token);
        AsyncStorage.setItem('id',result.user);
        //AsyncStorage.setItem('login',true);
       // AsyncStorage.setItem('admin',false);
       // AsyncStorage.setItem('password',this.state.password);
        AsyncStorage.setItem('username',result.username);
        AsyncStorage.getItem('username').then(
          (res)=>{valeur=res;console.log(valeur);}).catch(err=>console.log(err))
        STATUS.username=result.username;
       // STATUS.password=this.state.password;
        STATUS.admin=this.state.admin;
        STATUS.id=result.user;
        this.setState({login:true});
        STATUS.login=true;
        this.setState({token:result.token});
        STATUS.token=result.token;
        console.log(this.state.token);
        this.setState({id:result.user});
          console.warn("result",result);
          console.log(this.state.id);
          navigate('Load');
      })
   })
   
    //Alert.alert('Credentials', `${username} + ${password}`);
  }
get(){
  let token="Bearer "+STATUS.token;
  console.log(token);
  fetch('http://192.168.1.104:3000/patients/'+STATUS.id,{
    method:"GET",
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
      'Authorization':token
    },
    authorization:{
       Type:"Bearer Token",
       Token:STATUS.token
    }
  
  }).then((responce)=>{
    responce.text().then((result)=>{
      console.warn("result",result);
    }).catch(err=>console.log(err))
  })
}
logout(){
 this.setState({token:''});
 STATUS.login=false;
 this.setState({login:false});
 STATUS.token='';
}
insert(){
  let token="Bearer "+STATUS.token;
  fetch('http://192.168.1.104:3000/patients/'+STATUS.id,{
    method:"PUT",
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
      'Authorization':token
    },
    body:JSON.stringify({username:STATUS.username,password:STATUS.password,admin:STATUS.admin,firstname:STATUS.firstname,lastname:STATUS.lastname,heartrate:STATUS.heart})
  }).then((responce)=>{
     responce.json().then((result)=>{
     console.warn("result",result);
     }).catch((err)=>console.log(err))
  })
}




  render() {
    return (
      <View style={styles.container}>{ !this.state.login &&  
      <View><TextInput
        value={this.state.username}
        onChangeText={(username) => this.setState({ username })}
        placeholder={'Username'}
        style={styles.input}
      />
      <TextInput
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />
      
      <Button
        title={'Login'}
        color="purple"
        style={styles.input}
        onPress={this.onLogin.bind(this)}
      />
        <TextInput
        value={this.state.heart}
        onChangeText={(heart) => this.setState({ heart })}
        placeholder={'heartrate'}
        style={styles.input}
      />
        <Button
        color="purple"
        title={'insert'}
        style={styles.input}
        onPress={this.insert.bind(this)}
      />
      <Text>{'\n'}</Text>
         <Button
        title={'get'}
        color="purple"
        style={styles.input}
        onPress={this.get.bind(this)}
      /></View>}

  {this.state.login &&      <Button
    color="purple"
        title={'get'}
        style={styles.input}
        onPress={this.get.bind(this)}
      />} 
      
 </View>
  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
export default MyForm;