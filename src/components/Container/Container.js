import React from 'react';
import Chat from '../Chat/Chat';
import Sidebar from '../Sidebar/Sidebar';
import './Container.css'

const Container = () => {
    return (
        <div className="main_container">
            <Sidebar />
            <Chat/>
        </div>
    );
};

export default Container;