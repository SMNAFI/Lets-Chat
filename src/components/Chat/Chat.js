import React, { useEffect, useState } from 'react';
import './Chat.css';
import MicNoneIcon from '@material-ui/icons/MicNone';
import { IconButton } from '@material-ui/core';
import Message from '../Message/Message';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from '../../features/chatSlice';
import db from '../../firebase/firebase';
import firebase from 'firebase';
import { selectUser } from '../../features/userSlice';
import FlipMove from 'react-flip-move';

const Chat = () => {
    const user = useSelector(selectUser);
    const [input, setInput] = useState('');
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatId) {
            db.collection('chats')
                .doc(chatId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data()
                        }))
                    )
                })
        }
    }, [chatId])

    const sendMessage = e => {
        e.preventDefault();
        
        if(chatName) {
            db.collection('chats').doc(chatId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                uid: user.uid,
                photo: user.photo,
                email: user.email,
                displayName: user.displayName
            })
        }
        else {
            alert('Please select a room first.')
        }

        setInput("");
    }
    return (
        <div className="chat">
            {/* chat header */}
            <div className="chat__header">
                <h4>to: <span className="chat__chanelName">{chatName}</span></h4>
                <strong>Details</strong>
            </div>

            {/* chat messages */}
            <div className="chat__messages">
                <FlipMove>
                    {
                        messages.map(({ id, data }) => <Message key={id} content={data} />)
                    }
                </FlipMove>
            </div>

            {/* chat input */}
            <div className="chat__input">
                <form>
                    <input type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="message" />
                    <button onClick={sendMessage}>Send Message</button>
                </form>

                <IconButton>
                    <MicNoneIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Chat;
