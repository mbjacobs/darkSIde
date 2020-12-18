import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Content, Footer, Button } from 'native-base';
import { FooterBar } from './FooterBar';
import { getDataModel } from './DataModel';

class Score {
  constructor(s) {
      this.score = s;
      this.key = s;
  }
}

function getQuizScores() {
  let quizScores = [];
  let fakeScores = [20, 80, 100];
  for (let i = 0;i < fakeScores.length; i++) {
    console.log(fakeScores[i])
    quizScores.push(new Score(fakeScores[i]));
  }    
  return quizScores;
}

class QuizScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: props.score,
    }
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemRankContainer}>
            <Text style={styles.itemRank}>Date</Text>
        </View>
        <View style={styles.itemTextContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>{this.props.score}</Text>
        </View>
      </View>
    );
  }
}

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
              <QuizScore score={item.score} key={item.key}/>
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
    this.quizScoreArray = getQuizScores();
  }

    render() {
      return (
        <Container>
                <ImageBackground source={require('./images/app-background.jpg')} style={styles.image}>
                <Content>
                <View>
                  <Text style={[styles.screenText, styles.titleMargins]}>Quiz Results</Text>
                  <View style={styles.quiz_results_container}>
                    <Text style={styles.screenText}>Percent Correct: {this.totalScore}%</Text>
                    <Text style={styles.screenText}>Answers Correct: {this.correctAnswers} / {this.totalAnswers}</Text>
                    <Scoreboard temp={this.quizScoreArray}></Scoreboard>
                  </View>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => this.props.navigation.navigate('Quiz', {currentUser: this.currentUser, restart: true})}>Retake Quiz</Text>
                  </TouchableOpacity>
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
    quiz_results_container: {
      backgroundColor: "#A4B3B6",
      borderRadius: 10,
      margin: "5%",
      padding: "5%"
    },
    button: {
      backgroundColor: '#7151AB',
      padding: 5,
      margin: "5%",
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  });