import React from 'react';
import { StyleSheet, Text, View,
      TextInput, Switch, Image, KeyboardAvoidingView, StatusBar} from 'react-native';
import {Container, Header, Content, Footer, Title, Icon, Button} from 'native-base';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class FooterBar extends React.Component {
  render () {
    return (
        <Footer>
        <Button transparent onPress={() => this.props.navigation.navigate('Main')}>
          <Image
            source={require('./icons/icons8-home-30.png')} //static images always within project
          />  
        </Button>
        <Button transparent onPress={() => this.props.navigation.navigate('Dictionary')}>
          <Image
              source={require('./icons/icons8-book-30.png')} //static images always within project
            /> 
        </Button>
        <Button transparent onPress={() => this.props.navigation.navigate('Quiz')}>
          <Image
              source={require('./icons/icons8-questions-30.png')} //static images always within project
            /> 
        </Button> 
        <Button transparent onPress={() => this.props.navigation.navigate('Database')}>
          <Image
              source={require('./icons/icons8-folder-30.png')} //static images always within project
            /> 
        </Button>         
      </Footer>
    ); 
  }
}