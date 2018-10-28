/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './src/components/telas/login';
import Home from './src/components/telas/home';
import Nota from './src/components/telas/nota';
import Criar from './src/components/telas/criar';
import firebase from 'firebase';
const StackNavigator = createStackNavigator({

  Login: {
    screen:Login,
    navigationOptions: {
      header: null
  }
  },
  Home: {
    screen:Home,
    navigationOptions: {
        header: null
    }},
    Criar: {
      screen:Criar,
      navigationOptions: {
        header: null
    }
 },
 Nota: {
    screen:Nota,
    navigationOptions: {
        header: null
    }}
});

type Props = {};
export default class App extends Component<Props> {
  componentWillMount() {
    var config = {
        //API FIREBASE
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
      
}
  render() {
    return (
      <StackNavigator />
    );
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
