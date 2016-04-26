import React, {
  Component,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';


class SearchResults extends Component {

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


  renderRow(rowData, sectionId, rowId) {
    return (
      <View style={{
        flex: 1,
        borderColor: '#D7D7D7',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 20
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600'
        }}>
          {rowData.full_name}
        </Text>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 20
        }}>
          <View style={styles.repoCell}>
            <Image source={require('image!star')} style={styles.repoCellIcon} />
            <Text style={styles.repoCellLabel}>{rowData.stargazers_count}</Text>
          </View>

          <View style={styles.repoCell}>
            <Image source={require('image!fork')} style={styles.repoCellIcon} />
            <Text style={styles.repoCellLabel}>{rowData.forks}</Text>
          </View>

          <View style={styles.repoCell}>
            <Image source={require('image!inbox')} style={styles.repoCellIcon} />
            <Text style={styles.repoCellLabel}>{rowData.open_issues}</Text>
          </View>
        </View>
      </View>
    )
  }

  componentDidMount(){
    this.doSearch();
  }

  doSearch(){
    let url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(this.props.searchQuery);
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          repositories: responseData.repositories,
          dataSource: this.state.dataSource.cloneWithRows(responseData.items)
        });
      })
      .finally(()=> {
        this.setState({
          showProgress: false
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

let styles = StyleSheet.create({
  repoCell: {
    width: 50,
    alignItems: 'center'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
  repoCellLabel: {
    textAlign: 'center'
  }
});


export default SearchResults;
