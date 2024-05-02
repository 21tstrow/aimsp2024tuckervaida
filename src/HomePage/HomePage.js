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
  const API_KEY = "";
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

  const ChatToPDF = async () => {
    const response = await fetch(pdfAddress);
    const blob = await response.blob();

    const updatedPdfBlob = await appendChatToPDF(blob, messages);
    const pdfUrl = URL.createObjectURL(updatedPdfBlob);
    setPdfAddress(pdfUrl); // Update the PDF URL to point to the updated PDF
  };

  const appendChatToPDF = async (pdfBlob, chatMessages) => {
    try {
        const existingPdfBytes = await pdfBlob.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0]; // Assuming you want to add to the first page
  
        // Load a standard font
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
        // Set up text parameters
        const fontSize = 12;
        let yOffset = firstPage.getHeight() - 40; // Start writing from the top of the page
  
        // Add each message to the PDF
        chatMessages.forEach(message => {
            const text = `${message.sender}: ${message.message}`;
            firstPage.drawText(text, {
                x: 50,
                y: yOffset,
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0)
            });
            yOffset -= 18; // Move down for the next message
        });
  
        // Serialize the PDF to a blob and return it
        const pdfBytes = await pdfDoc.save();
        return new Blob([pdfBytes], { type: 'application/pdf' });
    } catch (error) {
        console.error("Failed to append chat to PDF:", error);
    }
  };


  const handleSend = async (message) => {
    const newMessages = [...messages, { message, sender: "user" }];
    setMessages(newMessages);
    // Simulate response from ChatGPT (replace this with actual API call)
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { message: "This is a simulated response.", sender: "ChatGPT" }]);
    }, 1000);

      // Continue with the existing processMessageToChatGPT function
      setIsTyping(true);
      await processMessageToChatGPT(newMessages);
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

  const handleSaveChatToPDF = async () => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
  
      // Add a page to the PDF document
      const page = pdfDoc.addPage();
  
      // Add the chat history as notes to the PDF
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const notesText = messages.map((message, index) => `${index + 1}. ${message.sender}: ${message.message}`).join('\n');
      page.drawText(notesText, {
        x: 50,
        y: page.getHeight() - 50,
        font: font,
        size: 12,
        color: rgb(0, 0, 0),
      });
  
      // Serialize the PDF
      const pdfBytes = await pdfDoc.save();
  
      // Create a Blob from the PDF bytes
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
      // Create a download link for the Blob
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'ChatHistory.pdf';
  
      // Click the link to trigger the download
      link.click();
    } catch (error) {
      console.error('Error saving chat history to PDF:', error);
    }
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
          <button onClick={handleSaveChatToPDF}>Download Chat History</button>;
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


