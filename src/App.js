import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

import Dashboard from './screens/dashboard';
import TendersScreen from './screens/tenders';
import ClosedTenderScreen from './screens/closed-tenders';
import PorfileScreen from './screens/profile';
import CreateScreen from './screens/create';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  renderContrainer() {
    const { currentScreen } = this.state;
    switch (currentScreen) {
      case 1:
        return <Dashboard />;
      case 2:
        return <CreateScreen />;
      case 3:
        return <TendersScreen />;
      case 4:
        return <ClosedTenderScreen />;
      case 5:
        return <PorfileScreen />;
      default:
        return <Dashboard />;
    }
  }

  changeContainer = index => {
    this.setState({ currentScreen: index });
  };

  renderMenu = (title, index) => {
    return (
      <a
        href="#"
        className="pure-menu-heading pure-menu-link"
        onClick={() => {
          this.changeContainer(index);
        }}
      >
        {title}
      </a>
    );
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          {this.renderMenu('Truffle Box Admin', 1)}
          <a href="#" className="pure-menu-heading pure-menu-link" />
          <div className="navbar-right">
            {this.renderMenu('Create', 2)}
            {this.renderMenu('Tenders', 3)}
            {this.renderMenu('Closed', 4)}
            {this.renderMenu('Profile', 5)}
          </div>
        </nav>

        <main className="container">{this.renderContrainer()}</main>
      </div>
    );
  }
}

export default App;
