import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import aws_exports from './aws-exports';

import Header from '../Header';
import CustomAuthenticator from '../CustomAuthenticator'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';// a plugin!

import CustomViewCalendarPlugin from '../CustomCalendarView'

Amplify.configure(aws_exports);

class AppUI extends Component {

  render() {
    return (
      <React.Fragment>
        {/* <Header/> */}
        <CustomAuthenticator />
      </React.Fragment>
    );
  }
}

export default AppUI;
