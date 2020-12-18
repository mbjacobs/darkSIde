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
      this.darkPatternsRef = firebase.firestore().collection('dark-patterns');
      this.storageRef = firebase.storage().ref();
      this.users = [];
      this.darkPatterns = [];
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
  
    createUser = async (email, pass, dispName) => {
      // assemble the data structure
      let newUser = {
        email: email,
        password: pass,
        displayName: dispName
      }
  
      // add the data to Firebase (user collection)
      let newUserDocRef = await this.usersRef.add(newUser);
  
      // get the new Firebase ID and save it as the local "key"
      let key = newUserDocRef.id;
      newUser.key = key;
      this.users.push(newUser);
      return newUser;
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