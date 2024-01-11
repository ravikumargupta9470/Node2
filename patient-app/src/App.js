// src/App.js
import React from 'react';
import Patient from './Patient';

function App() {
  return (
    <div>
      <Patient name="Sanu gupta" fasting="120 mg/L" afterFood="130 mg/L" />
      <Patient name="Manish Roy" fasting="150 mg/L" afterFood="160 mg/L" />
    </div>
  );
}

export default App;
