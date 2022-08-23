import React, { Component } from 'react';
import { Authenticator, translations } from '@aws-amplify/ui-react';
import logo from '../images/kingdom-sign-in.gif'
import './index.css'
import CustomCalendar from '../CustomCalendar';
import { FaUserAlt, FaUserPlus } from 'react-icons/fa'
import Header from '../Header';
import { I18n } from 'aws-amplify';

import CalendappContext from '../CalendappContext'

I18n.putVocabularies(translations);
I18n.setLanguage('en');

I18n.putVocabularies({
    en: {
        'Sign In': <div className='SignInContainer'><FaUserAlt className='UserIcon' /> <h3>Sign in</h3></div>,
        'Create Account': <div className='SignInContainer'><FaUserPlus className='NewUserIcon' /> <h3>Create Account</h3></div>,
    },
});

class CustomAuthenticator extends Component {

    static contextType = CalendappContext

    render() {

        const components = {

            Header() {
                return (
                    <div className="UpperHeader">
                        <Header />
                        <div className='HeaderLogin'>
                            <img src={logo} alt="Holding Key..." />
                        </div>
                    </div>
                );
            },

            Footer() {

                return (
                    <footer className='FooterLogin'>
                        <p>
                            &copy; All Rights Reserved
                        </p>
                    </footer>
                );
            },

        }

        return (

            <Authenticator className='Authenticator' components={components} >
                {({ signOut, user }) => {
                    return (
                        <main>
                            <Header signOut={signOut} />
                            <CustomCalendar />
                        </main>
                    )
                }
                }
            </Authenticator>

        );
    }



}

export default CustomAuthenticator;