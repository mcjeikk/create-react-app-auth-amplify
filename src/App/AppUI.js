import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import aws_exports from './aws-exports';

import CustomAuthenticator from '../CustomAuthenticator'

import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';


Amplify.configure(aws_exports);

class AppUI extends Component {

  render() {
    return (
      <React.Fragment>
        <CustomAuthenticator />
        <NotificationContainer />
      </React.Fragment>
    );
  }
}

export default AppUI;
