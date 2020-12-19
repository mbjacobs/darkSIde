import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './secrets';

class DataModel {
    constructor() {
      if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
      this.usersRef = firebase.firestore().collection('users');
      this.quizResultsRef = firebase.firestore().collection('quiz-results');
      this.darkPatternsRef = firebase.firestore().collection('dark-patterns');
      this.storageRef = firebase.storage().ref();
      this.users = [];
      this.darkPatterns = [];
      this.quizResults = [];
      this.asyncInit();
    }
  
    asyncInit = async () => {
      this.loadUsers();
      this.loadDarkPatterns();
    }
  
    loadUsers = async () => {
      let querySnap = await this.usersRef.get();
      querySnap.forEach(qDocSnap => {
        let key = qDocSnap.id;
        let data = qDocSnap.data();
        data.key = key;
        this.users.push(data);
      });
    }

    loadDarkPatterns = async () => {
      let querySnap = await this.darkPatternsRef.get();
      querySnap.forEach(qDocSnap => {
        let key = qDocSnap.id;
        let data = qDocSnap.data();
        data.key = key;
        this.darkPatterns.push(data);
      });
    }  
  
    getUsers = () => {
      return this.users;
    }

    getDarkPatterns = () => {
      return this.darkPatterns;
    }

    getQuizResults = async (userID) => {
      let querySnap = await this.usersRef.doc(userID).collection('quizResults').orderBy('date').get();
      querySnap.forEach(qDocSnap => {
          let quizResultsObj = qDocSnap.data();
          quizResultsObj.key = qDocSnap.id;
          this.quizResults.push(quizResultsObj);
        });
      return this.quizResults;
    }
  
    createUser = async (email, pass, dispName) => {
      let newUser = {
        email: email,
        password: pass,
        displayName: dispName,
      }
      let newUserDocRef = await this.usersRef.add(newUser);
      let key = newUserDocRef.id;

      newUser.key = key;
      this.users.push(newUser);
      return newUser;
    }

    addScore =  async (userID, userResults) => {
      let quizResultsRef = this.usersRef.doc(userID).collection('quizResults');
      let quizResultsObject = {
        score: userResults.score,
        date: userResults.timestamp
      }
      quizResultsRef.add(quizResultsObject);
    }

    getUserForID = (id) => {
      for (let user of this.users) {
        if (user.key === id) {
          return user;
        }
      }
    }
  }
  
  let theDataModel = undefined;
  
  export function getDataModel() {
    if (!theDataModel) {
      theDataModel = new DataModel();
    }
    return theDataModel;
  }