import React from 'react';
import './App.css';
import WorldClock from './WorldClock'; // Import the WorldClock component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the World Clock App</h1>
      </header>
      <main>
        <WorldClock /> {/* Render the WorldClock component here */}
      </main>
    </div>
  );
}

export default App;
