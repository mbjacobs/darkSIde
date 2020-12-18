import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Content, Footer, Button } from 'native-base';
import { FooterBar } from './FooterBar';
import { getDataModel } from './DataModel';

class Scoreboard extends React.Component {
  constructor(props) {
    super (props);
    this.temp = this.props.temp;
  }

  render () {
    return (
      <View style={styles.body}>
        <View style={styles.listContainer}>
          <Text>Scoreboard</Text>
          <FlatList
            data={this.temp}
            renderItem={({item})=>
              <Text>{item}</Text>
            }
          />
        </View>
      </View>
    );
  }
}

export class QuizResultsScreen extends React.Component {
  constructor(props) {
    super (props);

    this.currentUser = this.props.route.params.currentUser;
    this.correctAnswers = this.props.route.params.correctAnswers;
    this.totalAnswers = this.props.route.params.totalAnswers;
    this.totalScore = Math.ceil(this.correctAnswers / this.totalAnswers * 100);
    this.temp = [20, 80, 100];
  }

    render() {
      return (
        <Container>
                <ImageBackground source={require('./images/app-background.jpg')} style={styles.image}>
                <Content>
                <View>
                  <Text style={[styles.screenText, styles.titleMargins]}>Quiz Results</Text>
                  <View style={styles.category_button_container}>
                    <Text style={styles.screenText}>Percent Correct: {this.totalScore} %</Text>
                    <Text style={styles.screenText}>Answers Correct: {this.correctAnswers} / {this.totalAnswers}</Text>
                  </View>
                  <Scoreboard temp={this.temp}></Scoreboard>
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
    screenText: {
      fontSize: 24,
      alignSelf: 'center',
      color: 'white',
      opacity: 0.7
    },
    titleMargins: {
      marginTop: 20,
      marginBottom: 30,
    },
  });