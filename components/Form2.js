import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import StackNavigator from 'react-navigation';
class MyForm2 extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      admin:false,
      firstname:''
      //login:false,
      //store:null
    };
  }
  static navigationOptions = {
    title: 'MyForm2'
};
  
  onLogin() {
    
    //const { username, password } = this.state;

      fetch('http://192.168.1.104:3000/users/signup',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({username:this.state.username,password:this.state.password,admin:this.state.admin,firstname:this.state.firstname,lastname:this.state.lastname})
    }).then((responce)=>{
       responce.json().then((result)=>{
       console.warn("result",result);
       }).catch((err)=>console.log(err))
    })
    
    //Alert.alert('Credentials', `${username} + ${password}`);
  }

  render() {
    
    return (
      <View style={styles.container}>
        <TextInput
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
             <TextInput
          value={this.state.firstname}
          onChangeText={(firstname) => this.setState({ firstname })}
          placeholder={'First Name'}
          style={styles.input}
        />
         <TextInput
          value={this.state.lastname}
          onChangeText={(lastname) => this.setState({ lastname })}
          placeholder={'Last Name'}
          style={styles.input}
        />
        
        <Button
        color="purple"
          title={'Signup'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}
//175437504926-u8ou3abkulg3cq5u7cp9h2i3vvh4pumg.apps.googleusercontent.com

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
export default MyForm2;