import React from 'react';
import './AboutPage.css'; // Import CSS file for styling
import ProfilePic1 from "./ProfilePics/ProfilePic1.jpg"
import ProfilePic2 from "./ProfilePics/ProfilePic2.jpeg"
import AnuPic from "./ProfilePics/Anu.jpg"
import AndyPic from "./ProfilePics/Andy.JPEG"
import picaims from "./ProfilePics/picaims.png"
import HimaPic from "./ProfilePics/HimaPic.JPG"
import TuckPick from "./ProfilePics/Tucker Pic.png"
import VaidaPic from "./ProfilePics/Vaida.jpg"

// Sample data of contributors
const contributors = [
  {
    name: 'Tucker Strow',
    description: "I'm a mentor for the project. I am a senior studying Finance :)",
    image: TuckPick
  },
  {
    name: 'Oluwadamilare Sunmola',
    description:"I am a Computer Science student at the University Of Texas At Dallas, i like watching boxing and MMA matches" ,
    image: ProfilePic2
  },
  {
    name: 'Anushrutha Boyapati',
    description: 'Apart from being a student in computer science, I am also STEM Coding Instructor at iCode Plano currently teaching Unreal Engine 5.',
    image: AnuPic
  },
  {
    name: 'Anirudh Vayalali',
    description: 'I am a Computer Science student at UT Dallas, pursuing a specialization in Artificial Intelligence and Machine Learning technologies. In addition to these interests, I like to do graphic design freelancing in my free time, using Adobe Illustrator.',
    image: AndyPic
  },
  {
    name: 'Sailekha Sivasamy',
    description: 'I am a computer science major, and am passionate about programming and machine learning. Outside of technology, I like listening to different music genres and playing tennis.',
    image: picaims
  },
  {
    name: 'Hima Nagi Reddy',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: HimaPic
  },
  {
    name: 'Vaida Patil',
    description: 'I like Pav Bhaji',
    image: VaidaPic
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