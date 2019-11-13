import React, { useState, useLayoutEffect } from "react";
import chatStore from '../store/chat';

const SecondPerson = () => {
  const [chatState, setChatState] = useState(chatStore.initialState);

  useLayoutEffect(()=> {
    const subs = chatStore.subscribe(setChatState);
    chatStore.init();

    return () => subs.unsubscribe();
  },[]);

  const onFormSubmit = e => {
    e.preventDefault();
    const messageObject = {
      person: 'second-person',
      text: e.target.elements.messageInput.value.trim(),
    };
    chatStore.sendMessage(messageObject);
    document.getElementById('messageForm').reset();
  };

  return (
    <div className="container">
      <h2 style={{float: 'right'}}>Cortana</h2>
      <div className="chat-box">
        {chatState.data.map(message => (
          <div>
            <p className={message.person}>{message.text}</p>
            <div className="clear"></div>
          </div>
        ))}
      </div>
      <form id="messageForm" onSubmit={onFormSubmit}>
        <input
          type="text"
          id="messageInput"
          name="messageInput"
          required
        />
        <button type="submit">Send</button> <br />
      </form>
      <button className="clear-button" onClick={() => chatStore.clearChat()}>
        Clear Chat
      </button>
    </div>
  );
}

export default SecondPerson;
