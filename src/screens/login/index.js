import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          marginTop: 20
        }}
      >
        <Card style={{ width: 300 }}>
          <CardMedia
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="headline"
              component="h2"
              style={{ textAlign: 'center' }}
            >
              LOGIN
            </Typography>
            <Typography component="p" style={{ textAlign: 'center' }}>
              Loign our system for load with boakchin
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                flexDirection: 'column'
              }}
            >
              <TextField
                id="name"
                label="Email"
                value={this.state.email}
                onChange={evt => {
                  return this.setState({ email: evt.target.value });
                }}
                margin="normal"
              />
              <br />
              <TextField
                id="name"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={evt => {
                  return this.setState({ password: evt.target.value });
                }}
                margin="normal"
              />
              <br />
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={this.loginUser}
              >
                Login
              </Button>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Sign Up
            </Button>
            <Button size="small" color="primary">
              Forgot password
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
  // render() {
  //   return (
  //     <Card>
  //       <CardBody>
  //         <CardTitle>Email</CardTitle>
  //         <input
  //           value={this.state.email}
  //           onChange={evt => {
  //             return this.setState({ email: evt.target.value });
  //           }}
  //         />
  //         <CardTitle>Password</CardTitle>
  //         <input
  //           value={this.state.password}
  //           onChange={evt => {
  //             return this.setState({ password: evt.target.value });
  //           }}
  //         />
  //       </CardBody>
  //       <CardBody>
  //         <Dropdown
  //           group
  //           isOpen={this.state.dropdownOpen}
  //           size="sm"
  //           toggle={() => {
  //             this.setState({ dropdownOpen: !this.state.dropdownOpen });
  //           }}
  //         >
  //           <DropdownToggle caret>
  //             {this.state.type === 1 ? 'Admin' : 'Conractor'}
  //           </DropdownToggle>
  //           <DropdownMenu>
  //             <DropdownItem
  //               onClick={() => this.setState({ type: 1, dropdownOpen: false })}
  //             >
  //               Admin
  //             </DropdownItem>
  //             <DropdownItem
  //               onClick={() => this.setState({ type: 2, dropdownOpen: false })}
  //             >
  //               Conractor
  //             </DropdownItem>
  //           </DropdownMenu>
  //         </Dropdown>
  //       </CardBody>
  //       <CardBody>
  //         <Button color="danger" onClick={this.loginUser}>
  //           Login
  //         </Button>
  //       </CardBody>
  //     </Card>
  //   );
  // }
}
export default LoginScreen;
