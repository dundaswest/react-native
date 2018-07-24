import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,TextInput ,Button , StyleSheet,Image } from 'react-native';
import apiKey from './config.js';
import { Font } from 'expo';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list:['banana','apple'],
      city:'San Diego',
      temp:{},
      description:'',
      icon: '',
      isReady: false
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this._getInfo = this._getInfo.bind(this);
  }
  componentWillMount() {

    (async() => {

    await Font.loadAsync({

      'Sans-regular': require('./assets/fonts/Sans-regular.ttf')

    });

    this.setState({ isReady: true});

    })();
  }
   componentDidMount(){
     /*
    Font.loadAsync({
      'Sans-regular': require('./assets/fonts/Sans-regular.ttf')
    });
    */
    let city = this.state.city
    return fetch(`http://api.openweathermap.org/data/2.5//weather?q=${city}&units=imperial&APPID=${apiKey}`)
    .then((response) => response.json())

    .then((responseJson) => {
      console.log(responseJson)
      this.setState({temp:responseJson.main});
      this.setState({description:responseJson.weather[0].description.toUpperCase()});
      this.setState({icon:responseJson.weather[0].icon});
   });

  }
  _getInfo(city) {
    fetch(`http://api.openweathermap.org/data/2.5//weather?q=${city}&units=imperial&APPID=${apiKey}`)
    .then((response) => response.json())

    .then((responseJson) => {
      console.log(responseJson)
      this.setState({temp:responseJson.main});
      this.setState({description:responseJson.weather[0].description.toUpperCase()})
   });
  }
  _handleSubmit () {
    const preList = this.state.list;

    preList.push(this.state.city);
    this.setState({list:preList});
    this._getInfo(this.state.city)
  }


  render(){
    if(!this.state.isReady) {
      return <Text>Loading</Text>
    }
    return(
      <View style={{flex: 1, paddingTop:30, alignItems: 'center',backgroundColor:'#e0fcff'}}>
        <Text style={styles.header}>Today's Weather</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Enter City!"
          onChangeText={(text) => this.setState({city:text})}
        />
        <Button style={styles.submitBtn}
            onPress={this._handleSubmit}
            title="submit"
            accessibilityLabel="submit button"
          />

       {/*<FlatList
          data={this.state.list}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
       */}
        <Text style={styles.city}>City {this.state.city}</Text>
        <Image  style={{width: 125, height: 125}} source={{ uri:`http://openweathermap.org/img/w/${this.state.icon}.png`}} />
        <Text style={styles.temp}>"{this.state.description}"</Text>
        <Text style={styles.temp}>{this.state.temp.temp}°</Text>
        <Text style={styles.temp}>H {this.state.temp.temp_max}°</Text>
        <Text style={styles.temp}>L {this.state.temp.temp_min}°</Text>
        <Text style={styles.temp}>Humidity {this.state.temp.humidity}%</Text>
        <Text style={styles.temp}>Pressure {this.state.temp.pressure} hPa</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontFamily:'Sans-regular',
    height: 60,
    backgroundColor:'#5ac8d8',
    padding: 8,
    width: 320,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 35,
    color:'#f6f6f6',

  },
  icon: {
    width: 80,
    height: 80
  },
  submitBtn: {
    backgroundColor:'#1E6738',
    borderRadius:10,
    borderWidth: 1,
  },
  city: {
    fontWeight: '500',
    fontSize: 24,
    fontFamily:'Sans-regular',
    flexDirection: 'column',
    paddingTop:20,
  },
  temp:{
    paddingTop:15,
    fontSize: 20,
    fontFamily:'Sans-regular',
  }
})

