import React, {
  Component,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight
} from 'react-native';
import AuthService from './authService';
import moment from 'moment';
import PushPayload from './pushPayload';


class Feed extends Component {

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true
    };
  }

  pressRow(rowData){
    this.props.navigator.push({
      component: PushPayload,
      title: 'Push Payload',
      passProps: {
        pushEvent: rowData
      }
    })

  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableHighlight onPress={()=> this.pressRow(rowData)} underlayColor='#ddd'>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
          borderColor: '#D7D7D7',
          backgroundColor: '#fff',
          borderBottomWidth: 1
        }}>
          <Image source={{uri: rowData.actor.avatar_url}} style={{
            height: 42,
            width: 42,
            borderRadius: 18
          }}/>
          <View style={{
            paddingLeft: 20
          }}>
            <Text>{moment(rowData.created_at).fromNow()}</Text>
            <Text>
              <Text style={{fontWeight: 'bold'}}>
                {rowData.actor.login}
              </Text> pushed to
            </Text>
            <Text>{rowData.payload.ref.replace('refs/heads', '')}</Text>
            <Text>
              at <Text style={{fontWeight: 'bold'}}>{rowData.repo.name}</Text>
            </Text>

          </View>
        </View>
      </TouchableHighlight>
    )
  }

  componentDidMount(){
    this.fetchFeed();
  }

  fetchFeed(){
    let authService = new AuthService();
    authService.getAuthInfo((err, authInfo) =>{
      var url = 'https://api.github.com/users/'
        + authInfo.user.login+ '/received_events';
      fetch(url, {
        headers: authInfo.header
      })
      .then((response) =>response.json())
      .then((responseData) => {

        var feedItems = responseData.filter((ev) => {
          return ev.type === 'PushEvent'
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        });
      });
    });
  }

  render() {

    if(this.state.showProgress){
      return (
          <View style={{
            flex: 1,
            justifyContent: 'center'
          }}>
            <ActivityIndicatorIOS
              size="large"
              animating={true} />
          </View>
        )
    } else {
      return (
          <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingTop: 60,
            paddingBottom: 50
          }}>
            <ListView dataSource={this.state.dataSource}
                      renderRow={this.renderRow.bind(this)} />

          </View>
      )
    }

  }
}


export default Feed;
