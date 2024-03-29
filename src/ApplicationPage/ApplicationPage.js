import React, { useState } from 'react';
import PdfUpload from '../PdfManipulation/PdfUpload';
import PdfDisplay from '../PdfManipulation/PdfDisplay';
import PdfResizer from '../PdfManipulation/PdfResizer';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './ApplicationPage.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';


const API_KEY = "API_KEY";
// Put your own API key to run this code
const systemMessage = { 
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}


function ApplicationPage() {
  const [file, setFile] = useState(null);
  const [resizedFile, setResizedFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handlePdfResized = (resizedPdf) => {
    setResizedFile(resizedPdf);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };


  const handleTextSelect = (selectedText) => {
    setTextInput(selectedText); // Update input value with selected text
  };


  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }

// The line between the HTML code denotes the other part of the application page (ChatBox) 

  return (
    <div className="application-page">
      <div className='pdf-viewer'>
        <div className="pdf-upload-section">
          <h2>PDF Upload</h2>
          <PdfUpload onFileChange={handleFileChange} />
        </div>
        <div className="pdf-display-section">
          <h2>PDF Display</h2>
          <PdfResizer file={file} onPdfResized={handlePdfResized} />
          <PdfDisplay file={resizedFile || file} onTextSelect={handleTextSelect} />
        </div>
    </div>

    <div className="App">
      <div style={{ position:"relative", height: "900px", width: "600px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
    </div>
  );
}

export default ApplicationPage;










/*
return (
    <div className="application-page">
      <div className='pdf-viewer'>
        <div className="pdf-upload-section">
          <h2>PDF Upload</h2>
          <PdfUpload onFileChange={handleFileChange} />
        </div>
        <div className="pdf-display-section">
          <h2>PDF Display</h2>
          <PdfResizer file={file} onPdfResized={handlePdfResized} />
          <PdfDisplay file={resizedFile || file} onTextSelect={handleTextSelect} />
        </div>
      </div>

    // Distinction between the two sides of our application page

      <div className="api-section">
        <div className="api-content">
          <h2>OpenAI API</h2>
          <div className="api-input">
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              placeholder="Enter text for OpenAI API"
            />
            <button onClick={handleApiSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
  */

