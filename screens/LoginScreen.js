import React from 'react';
import { 
  View, 
  Image,
  Text, 
  StyleSheet, 
  Platform,
  TextInput,
  Alert,
 } from 'react-native';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import * as FirebaseAPI from '../modules/firebaseAPI';


export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  static navigationOptions = {
    //title: 'Login',
    headerStyle: {
        backgroundColor: '#F85F64',
      },
  };

  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    this.watchAuthState(this.props.navigation)
  }

  watchAuthState(navigation) {
    firebase.auth().onAuthStateChanged(function(user) {
      console.log('onAuthStatheChanged: ', user)
      
      if (user) {
        navigation.navigate('Main');
      }
    });
  }

  createUser() {
    FirebaseAPI.createUser(this.state.email, this.state.password)
  }

  signIn() {
    FirebaseAPI.signInUser(this.state.email, this.state.password)
  }

  render() {
    return (
      <View style={styles.container}>
              <Image
              source={require('../assets/images/white-logo.png')}
              style={{width:150, height:150, marginLeft:'35%'}}
              />
        <View style={styles.textContainer}>
          <Text style={styles.logoText}>LetsParty</Text>
          <TextInput 
            style={styles.loginFormTextInput}
            onChangeText={(text) => this.setState({email: text})}
            placeholder="Email"
            value={this.state.email}
          />
          <TextInput 
            style={styles.loginFormTextInput}
            onChangeText={(text) => this.setState({password: text})}
            placeholder="Password"
            secureTextEntry
            value={this.state.password}
          />
        
        <Button 
            buttonStyle={styles.loginButton}
            onPress={() => this.signIn()}
            title="Sign in"
        />

        <Button 
            buttonStyle={styles.loginButton}
            onPress={() => this.createUser()}
            title="Sign up
            "
        />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F85F64',
  },
  textContainer: {
    flex: 1,
  },
 
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5, 
  },
  
  loginButton: {
    backgroundColor: '#decbca',
    borderRadius: 15,
    height: 45,
    width:'50%',
    marginTop: 10,
    marginLeft: '25%'
  },

  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
    color:'#fff'
  },
});