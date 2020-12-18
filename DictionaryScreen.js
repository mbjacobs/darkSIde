import React from 'react';
import { ImageBackground, StyleSheet, Text, View,
      TextInput, Switch, Image, KeyboardAvoidingView, StatusBar} from 'react-native';
import { Container, Content, Footer, Button } from 'native-base';
import { Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FooterBar } from './FooterBar';

import { getDataModel } from './DataModel';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: this.props.index,
      frontSide: this.props.name,
      backSide: this.props.definition,
      isFlipped: false
    }
  }

  componentDidUpdate () {
    if (this.props.index !== this.state.index) {
      this.setState({
        index: this.props.index,
        frontSide: this.props.name,
        backSide: this.props.definition,
      });
    }
  }

   flipCard = () => {
    let temp = this.state.frontSide;
    this.setState({
      index: this.props.index,
      frontSide: this.state.backSide,
      backSide: temp,
      isFlipped: !this.state.isFlipped
    })
  }

  render() {
    return (
      <TouchableOpacity style={styles.card} onPress={this.flipCard}>
        <Text style={styles.cardText}>{this.state.frontSide}</Text>
      </TouchableOpacity>
    );
  }
}

export class DictionaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.dataModel = getDataModel();

    this.currentUser = this.props.route.params.currentUser;
    console.log(this.currentUser)
    
    let allDarkPatterns = this.dataModel.getDarkPatterns();

    this.state = {
      darkPatterns: allDarkPatterns,
      cardIndex: 0,
      cardNumber: 1
    }
  }

  advanceDeck = () => {
    let nextCardIndex = this.state.cardIndex + 1;
    let nextCardNumber = this.state.cardNumber + 1;

    if (nextCardIndex < this.state.darkPatterns.length) {
      this.setState({
        cardIndex: nextCardIndex,
        cardNumber: nextCardNumber
      })
    }
  }

  rewindDeck = () => {
    let nextCardIndex = this.state.cardIndex - 1;
    let nextCardNumber = this.state.cardNumber - 1;

    if (nextCardIndex > 0) {
      this.setState({
        cardIndex: nextCardIndex,
        cardNumber: nextCardNumber
      })
    }
  }

  shuffleCard= () => {
    let randIndex = Math.floor(Math.random() * this.state.darkPatterns.length - 1) + 1;
    this.setState({
      cardIndex: randIndex,
      cardNumber: randIndex + 1
    })
  }

  render() {
    return (
      <Container>
        <ImageBackground source={require('./images/app-background.jpg')} style={styles.image}>
        <Content>
        <View>
          <Text style={styles.screenTitle}>Dark Pattern Dictionary</Text>
          <View style={[styles.cardCounter, styles.button]}><Text style={styles.buttonText}>Card: {this.state.cardNumber} / {this.state.darkPatterns.length}</Text></View>
          <Card 
            index={this.state.cardIndex}
            name={this.state.darkPatterns[this.state.cardIndex].name} 
            definition={this.state.darkPatterns[this.state.cardIndex].description}>
          </Card>
          <View style={styles.navigation}>
            <Entypo name="arrow-bold-left" size={36} color="white" onPress={this.rewindDeck}/>
            <TouchableOpacity style={[styles.button, styles.shuffle]} onPress={this.shuffleCard}>
              <Text style={styles.buttonText}>Shuffle</Text>
            </TouchableOpacity>
            <Entypo name="arrow-bold-right" size={36} color="white" onPress={this.advanceDeck}/>
          </View>
        </View>
      </Content>
      </ImageBackground>
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
          {/* <Button transparent onPress={() => this.props.navigation.navigate('Database', {currentUser: this.currentUser})}>
            <Image source={require('./icons/icons8-folder-30.png')}/> 
          </Button>          */}
        </Footer>
    </Container>
    );
  }
 }

  const styles = StyleSheet.create({
    footer: {
      display: 'flex',
      backgroundColor: 'black',
      opacity: 0.5,
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent:"center"
    },
    screenTitle: {
      fontSize: 24,
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 30,
      color: 'white',
      opacity: 0.7
    },
    button: {
      backgroundColor: '#7151AB',
      padding: 5,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white'
    },
    cardCounter: {
      alignSelf: 'flex-end',
      marginRight: 15,
    },
    card: {
      display: 'flex',
      padding: '10%',
      marginTop: '5%',
      marginLeft: '5%',
      marginRight: '5%',
      height: 275,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#A4B3B6',
      borderRadius: 5
    },
    cardText: {
      alignSelf: 'center',
      fontSize: 20
    },
    navigation: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '5%',
      marginLeft: '5%',
      marginRight: '5%'
    },
    shuffle: {
      alignContent: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 30,
      paddingRight: 30,
    },
  });