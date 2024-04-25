import React, { useState, useEffect } from 'react';
import ImageTile from '../ImageTile/ImageTile.js';
import SearchBar from '../SearchBar/SearchBar.js';
import './HomePage.css';
import '../SearchBar/SearchBar.css';
import plusImage from '../components/Plus.png';
import PdfUpload from '../PdfManipulation/PdfUpload';
import PdfDisplay from '../PdfManipulation/PdfDisplay';
import PdfResizer from '../PdfManipulation/PdfResizer';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '../ApplicationPage/ApplicationPage.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const HomePage = () => {
  const [pdfAddress, setPdfAddress] = useState(`${process.env.PUBLIC_URL}/uploads/Paper1.pdf`);
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
  const [searchQuery, setSearchQuery] = useState('');
  const [imageTilesData, setImageTilesData] = useState([]);
  const [showHelloWorld, setShowHelloWorld] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5001/public/uploads')
      .then(response => response.json())
      .then(data => setImageTilesData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handlePdfResized = (resizedPdfBlob) => {
    setResizedFile(resizedPdfBlob);
    console.log("Resized PDF blob:", resizedPdfBlob);
  };

  const handleTextInputChange = (inputValue) => {
    setTextInput(inputValue);
  };

  function handleTextSelect(selectedText) {
    if (selectedText !== "") {
      const prefixedText = "Please explain: " + selectedText;
      setTextInput(prefixedText);
    }
    setSelectedText(selectedText);
  }

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      direction: 'outgoing',
      sender: "user",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObject.message
    }));

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [{ role: "system", content: "Your example environment" }, ...apiMessages]
    };
  
    console.log("API Request Body:", apiRequestBody);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer API_KEY",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsTyping(false);
    }
  }

  const handleImageTileClick = (title) => {
    console.log({title})
    setPdfAddress(`${process.env.PUBLIC_URL}/uploads/${title}`);
    setShowHelloWorld(true);
  };

  const handleUploadClick = () => {
    setShowHelloWorld(false);
  };

  if (showHelloWorld) {
    return (
      <div className="application-page">
        <div className='pdf-viewer'>
          <PdfResizer file={pdfAddress} onPdfResized={handlePdfResized} />
          <PdfDisplay file={pdfAddress} onTextSelect={handleTextSelect}/>
        </div>
        <div className="chatApp">
          <MainContainer>
            <ChatContainer>
              <MessageList style={{ backgroundColor: "#10384E" }} typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
                {messages.map((message, i) => <Message key={i} model={message} />)}
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

  return (
    <div className="homepage">
      <div className="search-bar-wrapper-homepage">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="image-tiles-wrapper">
        {imageTilesData.map((imageTileData, index) => (
          <div key={index} onClick={() => handleImageTileClick(imageTileData.title)} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ImageTile title={imageTileData.title} imageUrl={imageTileData.imageUrl} file={imageTileData.file} />
          </div>
        ))}
        <div onClick={handleUploadClick} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ImageTile title="Upload Files" imageUrl={plusImage} isUploadTile />
        </div>
      </div>
    </div>
  );
};

export default HomePage;