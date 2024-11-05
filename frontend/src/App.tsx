import {useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider, Button } from '@mantine/core';
import TextBox from './components/TextBox';
// import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Editor from '@monaco-editor/react';

import './App.css'
import {DATA} from '../config';
import DataDisplay from './components/DataDisplay';
import useGet from './hooks/useGet';
import { DataModel,mapData } from './models/apiModels';

function App() {
  const {data, loading, error} = useGet<DataModel>(DATA, mapData);

  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');

  const handleTextBoxChange = (value: string) => {
    setInputValue(value);
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
        <Editor className='code'height="90vh" defaultLanguage="java" defaultValue="// some comment" />;
      </div>
      <div className='question'>
        <h2>Question:</h2>
        <TextBox className='textBox' onChange={handleTextBoxChange} input={inputValue} />
        <Button 
          className='button'
          variant="filled" 
          color="grape"
          onClick={handleSubmit}
          >Submit</Button>
        <p>Current Input: {inputValue}</p>
        <p>Submitted Value: {submittedValue}</p>
        <p>Solution: </p>
      </div>
    </div>
  </MantineProvider>
   
  );
}

export default App;
