import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert/dist/sweetalert.css';

var config = {
  apiKey: 'AIzaSyAvGnGk-keJftJkcnJkR3J6z6xVqX0mQtE',
  authDomain: 'dezil-artneced.firebaseapp.com',
  databaseURL: 'https://dezil-artneced.firebaseio.com',
  projectId: 'dezil-artneced',
  storageBucket: '',
  messagingSenderId: '402772586093'
};
firebase.initializeApp(config);

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
