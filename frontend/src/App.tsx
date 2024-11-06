import {useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider, Button } from '@mantine/core';
import TextBox from './components/TextBox';
// import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Editor from '@monaco-editor/react';

import './App.css'
import {DATA, TEXT} from '../config';
import DataDisplay from './components/DataDisplay';
import useGet from './hooks/useGet';
import { GetDataModel,getMapData,PostTextPayload, PostTextResponse } from './models/apiModels';
import { usePost } from './hooks/usePost';

function App() {
  const {data, loading, error} = useGet<GetDataModel>(DATA, getMapData);
  // const {textData, textLoading, textError, post} = usePost<PostTextPayload, PostTextResponse>(TEXT,
  //    {"Content-Type": "application/json"})

  const {responseData: textData, loading: textLoading, error: textError, post} = usePost<PostTextPayload, PostTextResponse>(TEXT,
  {"Content-Type": "application/json"})

  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [question,setQuestion] = useState<PostTextPayload>({
    question_type: 1,
    question: "How to make quick sort algorithm"
  })

  const handleTextBoxChange = (value: string) => {
    setInputValue(value);
    console.log("Input value:", value);
  };

  const handleSubmit = async() => {
    console.log("Submitting value:", inputValue);
    setSubmittedValue(inputValue);
    setInputValue('')
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      question: inputValue
    }))

    await post({
      ...question,
      question: inputValue,
    })

    console.log('Received response:', textData);

    // const questionPayload = {
    //   question_type: 1,
    //   question: "How to make quick sort algorithm"
    // };
    // post(questionPayload);

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
         {/* Show loading, error, or response data */}
        <p>Solution:</p>
        {textLoading && <p>Loading solution...</p>}
        {textError && <p>Error: {textError}</p>}
        {textData && <p>{textData.content.content}</p>}
      </div>
    </div>
  </MantineProvider>
   
  );
}

export default App;
