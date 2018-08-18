import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from 'reactstrap';
import firebase from 'firebase';
import DataBase from '../../database';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'user@example.com',
      password: '123456',
      dropdownOpen: false,
      type: 1
    };
  }

  loginDone = data => {
    firebase
      .database()
      .ref('/users/' + data.user.uid)
      .once('value')
      .then(snapshot => {
        this.props.onLogin({
          userId: data.user.uid,
          type: snapshot.val().type,
          address: snapshot.val().address
        });
      });
  };

  loginUser = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        console.log(data);
        this.loginDone(data);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Email</CardTitle>
          <input
            value={this.state.email}
            onChange={evt => {
              return this.setState({ email: evt.target.value });
            }}
          />
          <CardTitle>Password</CardTitle>
          <input
            value={this.state.password}
            onChange={evt => {
              return this.setState({ password: evt.target.value });
            }}
          />
        </CardBody>
        <CardBody>
          <Dropdown
            group
            isOpen={this.state.dropdownOpen}
            size="sm"
            toggle={() => {
              this.setState({ dropdownOpen: !this.state.dropdownOpen });
            }}
          >
            <DropdownToggle caret>
              {this.state.type === 1 ? 'Admin' : 'Conractor'}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => this.setState({ type: 1, dropdownOpen: false })}
              >
                Admin
              </DropdownItem>
              <DropdownItem
                onClick={() => this.setState({ type: 2, dropdownOpen: false })}
              >
                Conractor
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardBody>
        <CardBody>
          <Button color="danger" onClick={this.loginUser}>
            Login
          </Button>
        </CardBody>
      </Card>
    );
  }
}
export default LoginScreen;
