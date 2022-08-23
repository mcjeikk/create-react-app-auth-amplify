import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './App/aws-exports';




Amplify.configure(aws_exports);
class App extends Component {

  handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg);
    alert(arg)
  }

  render() {
    return (
      <div className="App">
        <AmplifySignOut />
        
      </div>
    );
  }
}

export default withAuthenticator(App);
