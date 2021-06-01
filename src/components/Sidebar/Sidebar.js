import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Sidebar.css'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import SidebarChat from '../SidebarChat/SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase/firebase';

const Sidebar = () => {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        db.collection('chats').onSnapshot(snapshot => setChats(
            snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            ))
        ))
    }, [])

    const addChat = () => {
        const chatName = prompt('Please enter a chat name')

        if (chatName) {
            db.collection('chats').add({
                chatName: chatName
            })
        }
        console.log(chatName);
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar onClick={() => auth.signOut()} src={user.photo} className="sidebar__avatar" />
                <div className="sidebar__input">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div>
            </div>

            <div className="sidebar__chat">
                {
                    chats.map(({ id, data: { chatName } }) =>
                        <SidebarChat key={id} id={id} chatName={chatName} />
                    )
                }

            </div>
            <div className="sidebar__addBtn">
                <IconButton variant="outlined" onClick={addChat} >
                    <AddIcon className="addIcon"/>
            </IconButton>
            </div>
        </div>
    );
};

export default Sidebar;