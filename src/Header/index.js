import React, { Component } from 'react';
import './index.css'
import headerLogo from '../images/calendar_icon.png'
import CalendappContext from '../CalendappContext'
import Utils from '../Utils';

class Header extends Component {

    static contextType = CalendappContext

    static signOutMethod = null

    constructor(props) {
        super(props)
        this.signOutMethod = props.signOut
    }

    render() {

        let { setEvents, user } = this.context

        const onClickLogo = async (props) => {
            props.preventDefault();

            let events = await Utils.getEvents(user.email)

            setEvents(events)

        }

        return (

            <header className='MainHeader'>

                <img onClick={onClickLogo} alt="Logo" src={headerLogo} />

                {this.props.signOut && (
                    <button className='ButtonLogout' onClick={this.props.signOut}>Sign Out</button>
                )}

            </header>

        );
    }



}

export default Header;