import React from 'react';
import './AboutPage.css'; // Import CSS file for styling
import ProfilePic1 from "./ProfilePics/ProfilePic1.jpg"
import ProfilePic2 from "./ProfilePics/ProfilePic2.jpeg"

// Sample data of contributors
const contributors = [
  {
    name: 'John Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: ProfilePic1
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