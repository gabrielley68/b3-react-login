import React, {Component} from 'react';
import Message from '../Entities/message';
import {withRouter} from "react-router-dom";

const ChatContext = React.createContext();

class ChatProviderClass extends Component{
    constructor(props){
        super(props);
        this.socket = window.io.connect('http://172.30.236.82:4000');
        this.socket.on('chat message', this.onMessage.bind(this));

        this.state = {
            messages: [],
            messagesSeen: 0,
            connectedUsers: []
        };

        this.props.history.listen((location, done) => {
            if(location.pathname === '/chat') {
                this.setState({
                    messagesSeen: 0
                })
            }
        })
    }

    sendMessage(msg, user){
        this.socket.emit('chat message', {msg: msg, user: user});
    }

    onMessage(msg){
        this.setState((state) => {
            let messagesSeenCount = state.messagesSeen;
            if(this.props.location.pathname === '/chat') {
                messagesSeenCount = 0;
            }else {
                messagesSeenCount++;
            }

            let newMessages = state.messages.slice();
            newMessages.push(new Message(msg.msg, msg.user, msg.date));
            return {
                messages : newMessages,
                messagesSeen : messagesSeenCount
            }
        })
    }

    render(){
        const {children} = this.props;

        return (
            <ChatContext.Provider
                value={{
                    messages: this.state.messages,
                    messagesSeen : this.state.messagesSeen,
                    connectedUsers: this.state.connectedUsers,
                    sendMessage: this.sendMessage.bind(this),
                    onMessage: this.onMessage.bind(this),
                }}
            >
                {children}
            </ChatContext.Provider>
        )
    }
}

export const ChatProvider = withRouter(ChatProviderClass);
export const ChatConsumer = ChatContext.Consumer;