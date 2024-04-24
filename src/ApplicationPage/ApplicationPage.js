import React, { useState } from 'react';
import PdfUpload from '../PdfManipulation/PdfUpload';  // Ensure the path is correct
import PdfDisplay from '../PdfManipulation/PdfDisplay';  // Ensure the path is correct
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './ApplicationPage.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "Your_API_Key";  // Replace with your actual API key
const systemMessage = {
  "role": "system",
  "content": "Explain things like you're talking to a software professional with 2 years of experience."
};

function ApplicationPage() {
  const [file, setFile] = useState(null); // State to hold the file URL
  const [textInput, setTextInput] = useState(''); // State to hold the text input
  const [messages, setMessages] = useState([{
    message: "Hello, I'm ChatGPT! Ask me anything!",
    sentTime: "just now",
    sender: "ChatGPT"
  }]);
  const [isTyping, setIsTyping] = useState(false);

  const handleFileChange = (fileUrl) => {
    setFile(fileUrl); // Update the file URL when a new file is uploaded
  };

  const handleTextInputChange = (inputValue) => {
    setTextInput(inputValue); // Update text input as user types
  };

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsTyping(true);
    await processMessageToChatGPT(updatedMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map(msg => ({
      role: msg.sender === "ChatGPT" ? "assistant" : "user",
      content: msg.message
    }));

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages]
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
      } else {
        console.error("No choices found in API response");
      }

    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="application-page">
      <div className='pdf-viewer'>
        <PdfUpload onFileChange={handleFileChange} />
        {file && <PdfDisplay file={file} />}
      </div>
      <div className="chatApp">
        <MainContainer>
          <ChatContainer>
            <MessageList style={{ backgroundColor: "#10384E" }}
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput
              style={{ backgroundColor: "#051926" }}
              placeholder="Type message here"
              onSend={handleSend}
              value={textInput}
              onChange={handleTextInputChange}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default ApplicationPage;
