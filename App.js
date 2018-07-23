import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,TextInput ,Button , StyleSheet} from 'react-native';
import apiKey from './config.js';


export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list:['banana','apple'],
      newTodo:'',
      temp:{},
      city:''
    }
    this._handleSubmit = this._handleSubmit.bind(this);
  }

   componentDidMount(){
    return fetch(`http://api.openweathermap.org/data/2.5//weather?q=Seoul&units=imperial&APPID=${apiKey}`)
    .then((response) => response.json())

    .then((responseJson) => {
      console.log({temp:responseJson});
      this.setState({temp:responseJson.main});
   });
  }
  _handleSubmit () {
    const preList = this.state.list;

    preList.push(this.state.newTodo);

    this.setState({list:preList})
  }


  render(){

    return(
      <View style={{flex: 1, paddingTop:30}}>
        <Text style={styles.header}>TodoList</Text>
        <TextInput
          style={{height: 40}}
          placeholder="My Todo!"
          onChangeText={(text) => this.setState({newTodo:text})}
        />
        <Button
            onPress={this._handleSubmit}
            title="submit"
            backgroundColor="#ff7777"
            accessibilityLabel="submit button"
          />
        <FlatList
          data={this.state.list}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text>{this.state.temp.temp}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor:'#bad7df',
    padding: 8,
    width: 320,
    textAlign: 'center',
    fontWeight: '500'
  },
  submitBtn: {

  },
  temp:{

  }
})

