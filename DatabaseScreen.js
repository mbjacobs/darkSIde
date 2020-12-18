import React from 'react';
import { StyleSheet, Text, View,
      TextInput, Switch, Image, KeyboardAvoidingView } from 'react-native';
import {Container, Content, Footer, Button} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FooterBar } from './FooterBar';
import { getDataModel } from './DataModel';


export class DatabaseScreen extends React.Component {
    constructor(props) {
      super(props);
      
      let currentUser = this.props.route.params.currentUser;
      console.log(currentUser)
    }

    render() {
      return (
        <Container>
        <Content>
          <Text>Database Screen</Text>
        </Content>
          {/* <FooterBar/> */}
          <Footer style={styles.footer}>
          <Button transparent onPress={() => this.props.navigation.navigate('Main', {currentUser: this.currentUser})}>
            <Image source={require('./icons/icons8-home-30.png')}/>  
          </Button>
          <Button transparent onPress={() => this.props.navigation.navigate('Dictionary', {currentUser: this.currentUser})}>
            <Image source={require('./icons/icons8-book-30.png')}/> 
          </Button>
          <Button transparent onPress={() => this.props.navigation.navigate('Quiz', {currentUser: this.currentUser})}>
            <Image source={require('./icons/icons8-questions-30.png')}/> 
          </Button> 
          <Button transparent onPress={() => this.props.navigation.navigate('Database', {currentUser: this.currentUser})}>
            <Image source={require('./icons/icons8-folder-30.png')}/> 
          </Button>         
        </Footer>
      </Container>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cdb591',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footer: {
      display: 'flex',
      backgroundColor: 'black',
      opacity: 0.5,
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    english_greeting: {
      backgroundColor: '#808080',
      color: '#f5c2cb',
      fontSize: 28
    },
    spanish_greeting: {
      backgroundColor: '#000000',
      color: '#377e22',
      fontSize: 52
    },
    german_greeting: {
      backgroundColor: '#fffd54',
      color: '#000a7b',
      fontSize: 42
    }
  });