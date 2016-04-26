

import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';

import AuthService from './authService';
import SearchResults from './searchResults';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onSearchPressed(){
    this.props.navigator.push({
      title: 'Results',
      component: SearchResults,
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
  }

  render() {

    return(
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Search Query" onChangeText={text=> this.setState({searchQuery: text})} autoCapitalize='none' autoCorrect={false}/>
        <TouchableHighlight style={styles.button} onPress={this.onSearchPressed.bind(this)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
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


export default Search;
