import React, { useState } from 'react';
import PdfUpload from '../PdfManipulation/PdfUpload';
import PdfDisplay from '../PdfManipulation/PdfDisplay';
import PdfResizer from '../PdfManipulation/PdfResizer';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './ApplicationPage.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const PDF_ADDRESS = `${process.env.PUBLIC_URL}/uploads/Paper1.pdf`; // Global variable holding the PDF address

const API_KEY = "API_KEY"; // Put your own API key to run this code
const systemMessage = { 
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}



function ApplicationPage() {
  const [inputString, setInputString] = useState('');
  const [userInput, setUserInput] = useState('');
  const [selectedText, setSelectedText] = useState('');
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

  const handlePdfResized = (resizedPdfBlob) => {
    setResizedFile(resizedPdfBlob);
    // You can perform additional actions with the resized PDF blob if needed
    console.log("Resized PDF blob:", resizedPdfBlob);
  };

  const handleTextInputChange = (inputValue) => {
    // Update textInput state directly with the input value
    setTextInput(inputValue);
};

  function handleTextSelect(selectedText) {
  // Check if selectedText is not null
  if (selectedText !== "") {
      // Prefix the selected text with "Please explain: "
      const prefixedText = "Please explain: " + selectedText;
    
      // Update the textInput state
      setTextInput(prefixedText);
  }
  // Update the selectedText state regardless of whether it is null
  setSelectedText(selectedText);
  }

const handleSend = async (message) => {
  // If you want to prepend "Please explain: " to the user's message

  const newMessage = {
      message: message,
      direction: 'outgoing',
      sender: "user",
  };

  const newMessages = [...messages, newMessage];
  setMessages(newMessages);

  // Continue with the existing processMessageToChatGPT function
  setIsTyping(true);
  await processMessageToChatGPT(newMessages);
};

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });
  
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };
  
    console.log("API Request Body:", apiRequestBody); // Log request body
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data); // Log API response
  
      if (data.choices && data.choices.length > 0) {
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
      } else {
        console.error("No choices found in API response");
      }
  
      setIsTyping(false);
    } catch (error) {
      console.error("Error fetching data:", error.message); // Log fetch error
      setIsTyping(false);
    }
  }

// The line between the HTML code denotes the other part of the application page (ChatBox) 

  return (
    <div className="application-page">
      <div className='pdf-viewer'>
        <div className="pdf-display-section">
          <PdfResizer file={PDF_ADDRESS} onPdfResized={handlePdfResized} />
          <PdfDisplay file={PDF_ADDRESS} onTextSelect={handleTextSelect}/>
        </div>
      </div>

    <div className="chatApp">
        <MainContainer>
          <ChatContainer>       
            <MessageList style={{ backgroundColor: "#10384E" }}
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput
              style={{ backgroundColor: "#051926" }}
              placeholder="Type message here"
              onSend={handleSend}
              value={textInput}  // Bind value to textInput state
              onChange={handleTextInputChange}  // Update textInput state when input box value changes
            />    
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default ApplicationPage