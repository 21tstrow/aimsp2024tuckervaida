import React from 'react';
import './AboutPage.css'; // Import CSS file for styling
import ProfilePic1 from "./ProfilePics/ProfilePic1.jpg"
import ProfilePic2 from "./ProfilePics/ProfilePic2.jpeg"
import AnuPic from "./ProfilePics/Anu.jpg"

// Sample data of contributors
const contributors = [
  {
    name: 'John Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: ProfilePic1
  },
  {
    name: 'Jane Smith',
    description:"lorem" ,
    image: ProfilePic2
  },
  {
    name: 'Anushrutha Boyapati',
    description: 'Apart from being a student in computer science, I am also STEM Coding Instructor at iCode Plano currently teaching Unreal Engine 5. Outside of academics, I spend much of my time writing or reading, with my favorite genre fantasy',
    image: AnuPic
  },
  {
    name: 'Jane Smith',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: ProfilePic2
  },
  {
    name: 'Jane Smith',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: ProfilePic2
  },
  {
    name: 'Jane Smith',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: ProfilePic2
  },
  {
    name: 'Jane Smith',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: ProfilePic2
  },
  // Add more contributors as needed
];

function AboutPage() {
  return (
    <div className='about-page'>
      <h1>About Us</h1>
      <div className="contributors-container">
        {contributors.map((contributor, index) => (
          <div key={index} className="contributor">
            <div className="contributor-content">
              <img src={contributor.image} alt={contributor.name} className="contributor-image" />
              <h2>{contributor.name}</h2>
              <p>{contributor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutPage;