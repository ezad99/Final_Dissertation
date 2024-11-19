import {useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider, Button, Container} from '@mantine/core';
import TextBox from './components/TextBox';
// import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Editor from '@monaco-editor/react';

import './App.css'
import {DATA, TEXT} from '../config';
import DataDisplay from './components/DataDisplay';
import useGet from './hooks/useGet';
import { GetDataModel,getMapData,PostTextPayload, PostTextResponse } from './models/apiModels';
import { usePost } from './hooks/usePost';
import ReactMarkdown from 'react-markdown';

function App() {
  const {data, loading, error} = useGet<GetDataModel>(DATA, getMapData);

  const {responseData: textData, loading: textLoading, error: textError, post} 
  = usePost<PostTextPayload, PostTextResponse>(TEXT,
  {"Content-Type": "application/json"})

  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [question,setQuestion] = useState<PostTextPayload>({
    question_type: 1,
    question: ""
  })

  const handleTextBoxChange = (value: string) => {
    setInputValue(value);
    console.log("Input value:", value);
  };

  const handleSubmit = async(questionType: number) => {
    console.log("Submitting value:", inputValue);
    setSubmittedValue(inputValue);
    setInputValue('')
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      question_type: questionType,
      question: inputValue
    }))

    await post({
      ...question,
      question_type: questionType,
      question: inputValue
    })

    console.log('Received response:', textData);

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
          onClick={() => handleSubmit(1)}
          >How To Write Code</Button>
        <Button 
          className='button'
          variant="filled" 
          color="orange"
          onClick={() => handleSubmit(2)}
          >General Question</Button>
        <Button 
          className='button'
          variant="filled" 
          color="maroon"
          onClick={() => handleSubmit(3)}
          >How To Fix Code</Button>
        <p>Current Input: {inputValue}</p>
        <p>Submitted Value: {submittedValue}</p>
        {/* Show loading, error, or response data */}
        <p>Solution:</p>
        {textLoading && <p>Loading solution...</p>}
        {textError && <p>Error: {textError}</p>}

        {/* Render the markdown response */}
        {textData && (
          <Container className='container'>
            <ReactMarkdown className="react-markdown">{textData.content.content}</ReactMarkdown>
          </Container>
        )}
      </div>
    </div>
  </MantineProvider>
   
  );
}

export default App;
