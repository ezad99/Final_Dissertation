import {useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider, Button } from '@mantine/core';
import TextBox from './components/TextBox';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

import './App.css'
import useFetch from './api';
import { DATA } from '../config';
import DataDisplay from './components/DataDisplay';

function App() {
  const {data, loading, error} = useFetch(DATA);
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');

  const handleTextBoxChange = (value: string) => {
    setInputValue(value);
    // You can perform other actions with the value here
    console.log("Input value:", value);
  };

  const handleSubmit = () => {
    console.log("Submitting value:", inputValue);
    setSubmittedValue(inputValue);
    setInputValue('')
  }

  return (
    <MantineProvider> 
    <div className='app'>
      <div className="editor">
        <DataDisplay data={data} loading={loading} error={error}/>
        <Editor className='code'height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />;
      </div>
      <div className='question'>
        <h2>Question:</h2>
        <TextBox onChange={handleTextBoxChange} input={inputValue} />
        <Button 
          variant="filled" 
          color="grape"
          onClick={handleSubmit}
          >Submit</Button>
        <p>Current Input: {inputValue}</p>
        <p>Submitted Value: {submittedValue}</p>
      </div>
    </div>
  </MantineProvider>
   
  );
}

export default App;
