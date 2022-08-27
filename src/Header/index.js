import React, { Component } from 'react';
import './index.css'
import headerLogo from '../images/calendar_icon.png'
import CalendappContext from '../CalendappContext'

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

                <img alt="Logo" src={headerLogo} />

                {this.props.signOut && (
                    <button className='ButtonLogout' onClick={this.props.signOut}>Sign Out</button>
                )}

            </header>

        );
    }



}

export default Header;