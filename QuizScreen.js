import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Content, Footer, Button } from 'native-base';
import { ProgressBar, Colors } from 'react-native-paper';
import { FooterBar } from './FooterBar';
import { getDataModel } from './DataModel';

export class QuizScreen extends React.Component {
  constructor(props) {
    super(props);
    this.dataModel = getDataModel();
    this.currentUser = this.props.route.params.currentUser;
    let allDarkPatterns = this.dataModel.getDarkPatterns();

    this.state = {
      darkPatterns: allDarkPatterns,
      currentCardIndex: Math.floor(Math.random() * allDarkPatterns.length - 1) + 1, //Randomize first card
      answerChoices: ["None", "None", "None"],
      question: "",
      numQuestionsAnswered: 0,
      numQuestionsCorrect: 0
    }
  }

  componentDidMount = () => {
    console.log("in componentDidMount")
    console.log("Card index at start:", this.state.currentCardIndex)
    if (this.state.numQuestionsAnswered === 0) {
      this.setQuizData();
      console.log("Card index after setQuizData:", this.state.currentCardIndex);
    }
    console.log("Card index at end:", this.state.currentCardIndex);
  }

  componentDidUpdate = () => {
    console.log("in componentDidUpdate")
    console.log("Card index:", this.state.currentCardIndex)

    // if (this.state.currentCardIndex !== 0) {
    //   this.setState({
    //     question: this.state.darkPatterns[this.state.currentCardIndex].description,
    //   });
    // }
  }

  shuffleCard = async () => {
    console.log("in shuffleCard")
    console.log("Card index at start:", this.state.currentCardIndex);
    console.log(this.state.darkPatterns.length)
    let randIndex = Math.floor(Math.random() * this.state.darkPatterns.length - 1) + 1;
    console.log("Rand index: ", randIndex)
    this.setState({
      currentCardIndex: randIndex,
      cardNumber: randIndex + 1
    });
    console.log("Card index at end:", this.state.currentCardIndex)
    console.log("Card name:", this.state.darkPatterns[this.state.currentCardIndex].name)
  }

  advanceQuiz = async (selectedAnswer) => {
    console.log("in advanceQuiz")
    console.log("Card index at start:", this.state.currentCardIndex)
    //Score answer
    console.log("Selected answer:", selectedAnswer);
    await this.scoreAnswer(selectedAnswer);

    console.log("Num correct: ", this.state.numQuestionsCorrect)
    console.log("Num answered: ", this.state.numQuestionsAnswered)

    
    //Update the counters for number of questions correct and answered

    //Checks whether all quiz questions have been answered.
    //If the index of the current quiz question is equal to the total number of quiz questions, 
    //perform final calculations and route to the Quiz Results screen.
    if (this.state.numQuestionsAnswered === this.state.darkPatterns.length) {
      this.props.navigation.navigate('QuizResults', {currentUser: this.currentUser, 
        correctAnswers: this.state.numQuestionsCorrect,
        totalAnswers: this.state.numQuestionsAnswered
      })
    } else {
      console.log("Card index:", this.state.currentCardIndex)
      await this.shuffleCard();
      console.log("Card index:", this.state.currentCardIndex)
      this.setQuizData();
    }
    console.log("Card index at end:", this.state.currentCardIndex);
  }

  completeQuiz = () => {

  }

  setQuizData = () => {
    console.log("in setQuizData");
    console.log("Card index at start:", this.state.currentCardIndex);
    this.setQuestion();
    this.setAnswerChoices();
    console.log("Card index at end:", this.state.currentCardIndex);
  }

  setQuestion = () => {
    console.log("in setQuestion");
    console.log("Card index at start:", this.state.currentCardIndex);
    console.log("Card name:", this.state.darkPatterns[this.state.currentCardIndex].name);

    let quizQuestion = this.state.darkPatterns[this.state.currentCardIndex].description;
    this.setState({
      question: quizQuestion,
    },  this.setAnswerChoices());
    console.log("Card index at end:", this.state.currentCardIndex);
  }

  setAnswerChoices = () => {
    console.log("in setAnswerChoices");
    console.log("Card index at start:", this.state.currentCardIndex);
    let newAnswerChoices = [];
    let tempDarkPatterns = this.state.darkPatterns;
    //Ensure one of the answer choices is the correct answer
    newAnswerChoices.push(tempDarkPatterns[this.state.currentCardIndex].name)

    //For the remaining answer choices, select random dark patterns as options
    for (let i = 0; i < this.state.answerChoices.length - 1; i++) {
      let randIndex = Math.floor(Math.random() * this.state.darkPatterns.length - 1) + 1;
      let isExistingAnswer = newAnswerChoices.includes(tempDarkPatterns[randIndex].name);
      if (isExistingAnswer === false) {
        newAnswerChoices.push(tempDarkPatterns[randIndex].name);
      } else {
        i--; //Make the loop run again because answer choice was not valid
      }
    }
    
    //Shuffle the array to randomize the order of the answer choices
    newAnswerChoices.sort(() => Math.random() - 0.5)
    
    this.setState({
      answerChoices: newAnswerChoices
    })
    console.log("Card index at end:", this.state.currentCardIndex);
  }

  scoreAnswer = async (selectedAnswer) => {
    console.log("In scoreAnswer")
    console.log("Card index at start: ", this.state.currentCardIndex)
    console.log(this.state.darkPatterns[this.state.currentCardIndex].name)
    console.log(selectedAnswer)
    let newNumQuestionsCorrect = this.state.numQuestionsCorrect;
    if (selectedAnswer === this.state.darkPatterns[this.state.currentCardIndex].name) {
      newNumQuestionsCorrect += 1;
      console.log({newNumQuestionsCorrect})
    }

    this.setState({
      numQuestionsCorrect: newNumQuestionsCorrect,
      numQuestionsAnswered: this.state.numQuestionsAnswered + 1
    }, console.log(this.state.numQuestionsCorrect))

    console.log("Card index at end: ", this.state.currentCardIndex)
  }

  render() {
    return (
      <Container>
      <ImageBackground source={require('./images/app-background.jpg')} style={styles.image}>
        <Content>
          <View style={styles.header}>
          <Text style={styles.screenTitle}>Quiz</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.quiz_question_container}>
              <Text style={styles.question_text}>{this.state.question}</Text>
            </View>
            <View style={styles.quiz_options_container}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.advanceQuiz(this.state.answerChoices[0])}
              >
                <Text style={styles.button_text}>{this.state.answerChoices[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.advanceQuiz(this.state.answerChoices[1])}
              >
                <Text style={styles.button_text}>{this.state.answerChoices[1]}</Text>        
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.advanceQuiz(this.state.answerChoices[2])}
              >
                <Text style={styles.button_text}>{this.state.answerChoices[2]}</Text>
              </TouchableOpacity> 
            </View>  
          </View>
          <View style={styles.progress_container}>
            <Text>Quiz Progress:</Text>
            <ProgressBar 
              progress={this.state.numQuestionsAnswered/this.state.darkPatterns.length} 
              color={"#033769"}
              style={styles.progress_bar}
            />          
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
        </Button> */}
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
      backgroundColor: 'white',
      padding: 10,
      marginBottom: 5,
      borderRadius: 10,
      width: 233
    },
    button_text: {
      textAlign: 'center'
    },
    quiz_question_container: {
      backgroundColor: 'white',
      height: 160,
      width: 233,
      borderRadius: 5,
      padding: "5%"
    },
    question_text: {
      fontSize: 16,
    },
    quiz_options_container: {
      display: "flex",
      flexDirection: "column",
      marginTop: "3%",
      justifyContent: "space-evenly"
    },
    card: {
      display: 'flex',
      paddingTop: "5%",
      marginLeft: '5%',
      marginRight: '5%',
      height: 330,
      alignItems: 'center',
      backgroundColor: '#A4B3B6',
      borderRadius: 5
    },
    cardText: {
      alignSelf: 'center',
      fontSize: 20
    },
    progress_container: {
      backgroundColor: '#A4B3B6',
      marginTop: '5%',
      marginLeft: '5%',
      marginRight: '5%',
      height: 55,
      borderRadius: 5,
      padding: "3%"
    },
    progress_bar: {
      marginTop: "3%"
    }
  });