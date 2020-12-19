import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Content, Footer, Button } from 'native-base';
import { getDataModel } from './DataModel';

class QuizScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: props.score,
      date: props.date
    }
  }
  render() {
    return (
      <View>
        <View>
            <Text>{this.props.date}</Text>
        </View>
        <View>
          <Text>{this.props.score}</Text>
        </View>
      </View>
    );
  }
}

class Scoreboard extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      scores: this.props.scores,
      highScore: this.props.highScore
    }
  }
  componentDidUpdate () {
    if (this.props.scores !== this.state.scores) {
      this.setState({
        scores: this.props.scores,
        highScore: this.props.highScore
      });
    }
  }
  render () {
    return (
      <View style={styles.quiz_results_container}>
        <Text style={styles.header_text}>Scoreboard</Text>
        <View style={styles.subheader_container}>
          <Text style={styles.subheader_text}>High Score:</Text> 
          <Text style={styles.subheader_text}>{this.state.highScore}%</Text>
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
      this.dataModel = getDataModel();
      this.state = {
        quizResults: [],
        highScore: 0
      }
      this.getQuizResultData(this.quizResults);
    }

    componentDidUpdate = () => {
      if (this.quizResults !== this.state.quizResults) {
        this.setState({
          quizResults: this.quizResults
        })
      }
    }

    getQuizResultData = async (results) => {
      resultsPromise = await this.dataModel.getQuizResults(this.currentUser.key);
      await this.calculateHighScore(resultsPromise, results);
    }

    calculateHighScore = async (resultsPromise, results) => {
      results = resultsPromise  
      let highest = results[0].score;

      for (let i = 0; i < results.length; i++) {
        if (results[i].score > highest) {
          highest = results[i].score;
        }
      }
      this.setState({
        quizResults: results,
        highScore: highest
      })
      return results
    }

    render() {
      return (
        <Container>
          <ImageBackground source={require('./images/app-background.jpg')} style={styles.image}>
          <Content>
          <View>
            <Text style={[styles.header_text, styles.title_margins]}>Quiz Results</Text>
            <View style={styles.quiz_results_container}>
            <Text style={styles.header_text}>This Quiz</Text>
              <View style={styles.subheader_container}>
                <Text style={styles.subheader_text}>Percent Correct:</Text>
                <Text style={styles.subheader_text}>{this.totalScore}%</Text>
              </View>
              <View style={styles.subheader_container}>
                <Text style={styles.subheader_text}>Answers Correct: </Text>
                <Text style={styles.subheader_text}>{this.correctAnswers} / {this.totalAnswers}</Text>
              </View>
            </View>
            <Scoreboard 
              scores={this.state.quizResults} 
              highScore={this.state.highScore}>
            </Scoreboard>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => this.props.navigation.navigate('Quiz', {currentUser: this.currentUser, restart: true})}
            >
              <Text style={styles.buttonText}>Retake Quiz</Text>
            </TouchableOpacity>
          </View>
        </Content>
        </ImageBackground>
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
    header_text: {
      fontSize: 24,
      alignSelf: 'center',
      color: 'white',
      marginBottom: "5%"
    },
    subheader_text: {
      alignSelf: "flex-start",
      color: "white",
      fontSize: 18,
      marginBottom: "2%"
    },
    title_margins: {
      marginTop: 20,
      marginBottom: 30,
    },
    quiz_results_container: {
      backgroundColor: "#A4B3B6",
      borderRadius: 10,
      margin: "5%",
      padding: "5%",
      opacity: 0.85,
    },
    subheader_container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    button: {
      backgroundColor: '#7151AB',
      padding: "5%",
      margin: "5%",
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18
    },
  });