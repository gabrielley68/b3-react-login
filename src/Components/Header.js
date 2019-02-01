import React, { Component } from 'react';
import {ClientConsumer} from "../Providers/clientProvider";
import {ChatConsumer} from "../Providers/chatProvider";

class Header extends Component {

    playAudio(){
        let audio = new Audio('https://www.memoclic.com/medias/sons-wav/1/289.mp3');
        audio.play();
    }

    render() {
        return (
            <header>
                <ClientConsumer>
                    {({isLogged, login, logout, userName}) => (
                        <>
                            <ChatConsumer>
                                {({messagesSeen}) => (
                                    <div className={messagesSeen ? "shake" : ""}>
                                        Bonjour {isLogged ? userName : 'invité'}
                                        <span>, il y a {messagesSeen} messages non lus</span>
                                        {messagesSeen > 0 ? this.playAudio() : ''}
                                    </div>
                                )}
                            </ChatConsumer>
                            <button onClick={() => isLogged ? logout() : ''}>{isLogged ? 'logout' : 'login'}</button>
                        </>
                    )}
                </ClientConsumer>
            </header>
        );
    }
}

export default Header;
