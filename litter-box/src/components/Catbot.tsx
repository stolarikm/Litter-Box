import { FC } from "react";
import CatFactsApiProvider from "../api/cat-facts-api-provider";
import { addResponseMessage, Widget as ChatWidget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import '../App.css';

const Catbot: FC = () => {    
    const handleNewUserMessage = () => {
        //use timeout to simulate reply time
        setTimeout(async () => {
            addResponseMessage((await CatFactsApiProvider.getRandomFact()).text);
        }, 800);
    };

    return (
        <ChatWidget 
            title="Catbot"
            subtitle="Message us anything!"
            handleNewUserMessage={handleNewUserMessage} />
    );
};

export default Catbot;
