import React, { Component } from 'react';
import './index.css'
import headerLogo from '../images/calendar_icon.png'
import { TiThMenu, TiArrowLeftOutline } from "react-icons/ti";
import CalendappContext from '../CalendappContext'
import { useAuthenticator } from '@aws-amplify/ui-react';


class Header extends Component {

    static contextType = CalendappContext

    static signOutMethod = null

    constructor(props) {
        super(props)
        this.signOutMethod = props.signOut
    }

    render() {

        return (

            <header className='MainHeader'>

                {this.props.signOut && (
                <div className='MainMenu'>
                    <TiThMenu />
                    {/* <TiArrowLeftOutline /> */}
                </div>
                )}

                <img alt="Logo" src={headerLogo} />

                {this.props.signOut && (
                    <button className='ButtonLogout' onClick={this.props.signOut}>Sign Out</button>
                )}

            </header>

        );
    }



}

export default Header;