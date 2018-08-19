import React, { Component } from 'react';
import firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
      currentScreen: -1,
      anchorEl: null
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
    const userJSON = DataBase.getUser();
    if (userJSON) {
      this.setState({ user: JSON.parse(userJSON) });
    }
  }

  renderContrainer() {
    const { currentScreen, user } = this.state;
    if (user) {
      switch (currentScreen) {
        case -1:
          return <Dashboard user={user} />;
        case 0:
          return <CreateScreen />;
        case 1:
          return <TendersScreen user={user} />;
        case 2:
          return <ClosedTenderScreen />;
        case 3:
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
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.changeContainer(-1);
            this.setState({ currentScreen: -1 });
          }}
        >
          {title}
        </Button>
      </div>
    );
  };
  handleChange = (event, value) => {
    this.setState({ currentScreen: value });
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { user } = this.state;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className="App">
        <AppBar>
          <Toolbar
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            {this.renderMenu('Dezil-artneced', 1)}
            <div>
              {user && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <Tabs
                    value={this.state.currentScreen}
                    onChange={this.handleChange}
                  >
                    <Tab label="Create" />
                    <Tab label="Tenders" />
                    <Tab label="Closed" />
                  </Tabs>
                  <div>
                    <IconButton
                      aria-owns={open ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={() => {}}>Profile</MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.setState({ user: '', anchorEl: null });
                          DataBase.loginUser('');
                          firebase.auth().signOut();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              )}
            </div>
            {/* {user && (
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
          )} */}
          </Toolbar>
        </AppBar>
        <main className="container">{this.renderContrainer()}</main>
      </div>
    );
  }
}

export default withStyles({})(App);
