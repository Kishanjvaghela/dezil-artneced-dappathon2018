import React, { Component } from 'react';
import firebase from 'firebase';

import getWeb3 from './utils/getWeb3';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';
import DataBase from './database';

import Dashboard from './screens/dashboard';
import TendersScreen from './screens/tenders';
import ClosedTenderScreen from './screens/closed-tenders';
import PorfileScreen from './screens/profile';
import CreateScreen from './screens/create';
import LoginScreen from './screens/login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      storageValue: 0,
      web3: null,
      currentScreen: 2
    };
    this.renderMenu = this.renderMenu.bind(this);
    this.changeContainer = this.changeContainer.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  componentDidMount() {
    this.setState({ user: JSON.parse(DataBase.getUser()) });
  }

  renderContrainer() {
    const { currentScreen, user } = this.state;
    if (user) {
      switch (currentScreen) {
        case 1:
          return <Dashboard user={user} />;
        case 2:
          return <CreateScreen />;
        case 3:
          return <TendersScreen user={user} />;
        case 4:
          return <ClosedTenderScreen />;
        case 5:
          return <PorfileScreen />;
        default:
          return <Dashboard />;
      }
    } else {
      return (
        <LoginScreen
          onLogin={user => {
            DataBase.loginUser(JSON.stringify(user));
            this.setState({ user });
          }}
        />
      );
    }
  }

  changeContainer = index => {
    this.setState({ currentScreen: index });
  };

  renderMenu = (title, index, action) => {
    return (
      <a
        href="#"
        className="pure-menu-heading pure-menu-link"
        onClick={() => {
          if (action) {
            action();
          } else {
            this.changeContainer(index);
          }
        }}
      >
        {title}
      </a>
    );
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          {this.renderMenu('Truffle Box Admin', 1)}
          <a href="#" className="pure-menu-heading pure-menu-link" />
          {user && (
            <div className="navbar-right">
              {user.type === 1 && this.renderMenu('Create', 2)}
              {this.renderMenu('Tenders', 3)}
              {this.renderMenu('Closed', 4)}
              {this.renderMenu('Logout', 5, () => {
                this.setState({ user: '' });
                DataBase.loginUser('');
                firebase.auth().signOut();
              })}
            </div>
          )}
        </nav>

        <main className="container">{this.renderContrainer()}</main>
      </div>
    );
  }
}

export default App;
