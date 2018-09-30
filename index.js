/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'firebase';

const config = {
    databaseURL: "https://reminder-52d26.firebaseio.com/",
    projectId: "reminder-52d26",
};
firebase.initializeApp(config);
AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox=true;
