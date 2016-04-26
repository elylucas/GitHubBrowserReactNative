

import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

import AuthService from './authService';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    };
  }

  onLoginPress(){
    console.log('logging in ' + this.state.username);
    this.setState({showProgress: true});


    let authService = new AuthService();
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, results =>{
      this.setState(Object.assign({
          showProgress: false
        }, results));
        if(results.success && this.props.onLogin) {
          this.props.onLogin();
        }
    });
  }

  render() {
    var errorCtrl = <View />;

    if(!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={styles.error}>The username or password was not valid</Text>
    } else if(!this.state.success && this.state.unknownError){
      errorCtrl = <Text style={styles.error}>An unkown error happened</Text>
    }

    return(
      <View style={styles.container}>
        <Image style={styles.logo}
                source={require('image!Octocat')} />
        <Text style={styles.heading}>Github Browser</Text>
        <TextInput style={styles.input} placeholder="Github username" onChangeText={text=> this.setState({username: text})} autoCapitalize='none' autoCorrect={false}/>
        <TextInput style={styles.input} secureTextEntry={true} placeholder="Github password" onChangeText={text => this.setState({password: text})} />
        <TouchableHighlight style={styles.button} onPress={this.onLoginPress.bind(this)}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
        {errorCtrl}
        <ActivityIndicatorIOS animating={this.state.showProgress} size="large" style={styles.loader}/>

      </View>


    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading:{
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48bbec',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    marginTop: 20
  }
});


export default Login;
