import './App.css';
import React, { Component } from 'react';
import { CalendappContextProvider } from '../CalendappContext';
import AppUI from './AppUI';
import { Authenticator, View } from '@aws-amplify/ui-react';

class App extends Component {

    render() {
        return (
            <CalendappContextProvider>
                <AppUI />
            </CalendappContextProvider>
        );
    }
}

export default App;
