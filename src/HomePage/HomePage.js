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
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';


const HomePage = () => {
  const API_KEY = ""
  const systemMessage = { 
    "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
  }
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
  const appendMessageToPDF = async (pdfBlob, messageText) => {
    try {
      // Load the existing PDF document
      const existingPdfBytes = await pdfBlob.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
      // Embed the Helvetica font
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
      // Get the first page of the document
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
  
      // Calculate where to place the text
      const { width, height } = firstPage.getSize();
      const fontSize = 12;
      const textWidth = helveticaFont.widthOfTextAtSize(messageText, fontSize);
      const textHeight = helveticaFont.heightAtSize(fontSize);
  
      // Add text to the bottom of the first page
      firstPage.drawText(messageText, {
        x: 50,
        y: 100, // Fixed position for testing
        size: fontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
  
      // Serialize the PDF to a blob and return it
      const pdfBytes = await pdfDoc.save();
      console.log("PDF modified and saved.");
      return new Blob([pdfBytes], { type: 'application/pdf' });
    } catch (error) {
      console.error("Failed to append message to PDF:", error);
    }
  };
  const uploadUpdatedPDF = async (pdfBlob, fileName) => {
    const formData = new FormData();
    formData.append('file', pdfBlob, fileName);
  
    try {
      const response = await fetch('http://localhost:5001/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Upload successful:", result);
    } catch (error) {
      console.error("Error uploading updated PDF:", error.message);
    }
  };

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