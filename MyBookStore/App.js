/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */



import React, { Component } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';


function Book(props){
  let book = props.data;
  let title = book.title;
  let author = book.author;
  let imageName = book.imageURL;
  let price = book.price;

  return(
    <View style={{padding: 10, display: 'flex', flexDirection: 'row'}}>
      <Image source={{uri: 'http://localhost:3000' + imageName}} style={{width: 80, height: 130}}/>
      <View>
        <Text style={{fontSize: 15, padding: 10, fontWeight: 'bold', width: 300}}>{title}</Text>
        <Text style={{fontSize: 10, padding: 10}}>{author}</Text>
        <Text style={{fontSize: 10, padding: 10, color: 'red'}}>{price}</Text>
      </View>
    </View>
  );
}

function BodyList(props){
  return(
    <View>
      <FlatList
        data={props.data}
        renderItem={({item}) => <Book data={item}/>}></FlatList>
    </View>
  );
}

function Header(){
  return(
<View style={{display: 'flex', flexDirection: 'column', height: 150, backgroundColor: '#00CCCC'}}>
  <View style={{display: 'flex', flexDirection: 'row', paddingTop: 25, justifyContent: 'space-around', alignItems: 'baseline'}}>
    <TouchableHighlight>
      <View><Text style={{fontSize: 40, fontWeight: 'bold'}}>BookStore Inc.</Text></View>
    </TouchableHighlight>
    <TouchableOpacity>
      <View style={{backgroundColor: '#CCCCCC'}}><Text style={{padding: 10}}>Log in</Text></View>
    </TouchableOpacity>
    <TouchableOpacity>
      <View style={{backgroundColor: '#CCCCCC'}}><Text style={{padding: 10}}>Cart</Text></View>
    </TouchableOpacity>
  </View>
  <View>
    <TextInput style={{backgroundColor: 'white', fontSize: 20, height: 35, margin: 10, padding: 10, marginTop: 20}} placeholder='Search here...'></TextInput>
  </View>
</View>
  );
}

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount(){

    fetch('http://localhost:3000/api/books').then(function(response){
      return response.json();
    }).then(function(result){
      this.setState({
        isLoading: false,
        dataSource: result
      });
    }.bind(this))

  }

  render(){

    if(this.state.isLoading){
      return(
        <View>
          <Header />
          <ActivityIndicator />
        </View>
      );
    }

    return(
      <View>
        <Header />
        <BodyList data = {this.state.dataSource}/>
      </View>
    );
  }
}
