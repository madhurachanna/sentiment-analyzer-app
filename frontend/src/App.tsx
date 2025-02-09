import React, { useState } from 'react';
import './App.css';
import Input from './components/input'
import { predictSentiment }from './services/api'
import { PredictionResponse } from "./services/types";
import Results from './components/results'

function App() {

  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [results, setResults] = useState<PredictionResponse | null>(null)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await predictSentiment({ text: input })
      setResults(res)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
  }

  return (
    <div className="App custom-scroll">
      <div className="base-app">
        <h1 className="is-size-1 title">Sentiment Analysis Tool</h1>
        <Input
          loading={loading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit} />
        <Results
          results={results} />
      </div>
    </div>
  );
}

export default App;
