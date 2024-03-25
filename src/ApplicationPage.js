import React from 'react';

function ApplicationPage() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="application-page">
      <h1>Application Page</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default ApplicationPage;