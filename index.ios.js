/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} from 'react-native';

import Login from './login';
import AppContainer from './appContainer';
import AuthService from './authService';

class githubbrowser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    };
  }

  componentDidMount(){
    let authService = new AuthService();
    authService.getAuthInfo((err, authInfo) =>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    })
  }

  onLogin(){
    console.log('successful login');
    this.setState({isLoggedIn: true});
  }

  render() {

    if(this.state.checkingAuth){
      return(
        <View style={styles.container}>
          <ActivityIndicatorIOS animating={true} size="large" style={styles.loader} />
        </View>
      );
    }

    if(this.state.isLoggedIn){
      return (
        <AppContainer />
      )
    } else {
      return (
        <Login onLogin={this.onLogin.bind(this)}/>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('githubbrowser', () => githubbrowser);
