import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from '../../firebase/firebase';
import './Login.css'

const Login = () => {
    
    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch(error => {
            alert(error.message);
        })
    }

    return (
        <div className="login">
            <h1>Let's Chat</h1>
            <Button onClick={signIn}>Sign in</Button>
        </div>
    );
};

export default Login;