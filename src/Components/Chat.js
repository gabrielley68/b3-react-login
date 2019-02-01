import React, { Component } from 'react';
import {ClientConsumer} from "../Providers/clientProvider";
import {ChatConsumer} from "../Providers/chatProvider";
import '../Stylesheets/Chat.css';

class Chat extends Component {

    getContent(isLogged, messages, sendMessage, userName){
        if(isLogged){
            let messageList = messages.map(elt => {
               return (
                   <li key={elt.id}>{elt.date}-{elt.user} : {elt.msg}</li>
               );
            });

            return (
                <form onSubmit={e => {e.preventDefault(); sendMessage(e.target.elements.message.value, userName)}}>
                    <ul>{messageList}</ul>
                    <input type="text" name="message"/>
                    <button>Envoyer</button>
                </form>
            )
        }
        else return (
            <span>vous devez être connecté</span>
        )
    }

    render() {
        return (
            <div className="chat">
                <ClientConsumer>
                    {({isLogged, userName}) => (
                        <ChatConsumer>
                            {({messages, sendMessage}) => (
                                this.getContent(isLogged, messages, sendMessage, userName)
                            )}
                        </ChatConsumer>
                    )}
                </ClientConsumer>
            </div>
        );
    }
}

export default Chat;
