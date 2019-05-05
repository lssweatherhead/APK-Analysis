import React from 'react';
import './App.css';
import AnalysisIndex from './pages/analysis-index';


function App() {
  return (
    <div className="App container">
      <div className="jumbotron">
        <h1 className="display-4">APK Analysis Tool</h1>
      </div>
      <AnalysisIndex />
    </div>
  );
}

export default App;
