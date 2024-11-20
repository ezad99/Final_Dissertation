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
import { GetDataModel,getMapData,PostTextPayloadModel, PostTextResponseModel } from './models/apiModels';
import { usePost } from './hooks/usePost';
import ReactMarkdown from 'react-markdown';
import CodeEditor from './components/CodeEditor';

function App() {

  // Array representing all Button Types
  const buttons = [
    { text: "How To Write Code", color: "grape", type: 1 },
    { text: "General Question", color: "orange", type: 2 },
    { text: "How To Fix Code", color: "maroon", type: 3 },
  ];

  // Fetch Data for SanityCheck
  const {data, loading, error} = useGet<GetDataModel>(DATA, getMapData);

  // POST data from text 
  // TEXT is the endpoint URL
  // `post` triggers the post request
  const {responseData: textData, loading: textLoading, error: textError, post} 
  = usePost<PostTextPayloadModel, PostTextResponseModel>(TEXT,
  {"Content-Type": "application/json"})

  // State to hold the current value in the textbox
  const [inputValue, setInputValue] = useState('');

  // State to keep track of the value submitted by the user
  const [submittedValue, setSubmittedValue] = useState('');

  // State to hold the question object for the API payload
  const [question,setQuestion] = useState<PostTextPayloadModel>({
    question_type: 1,
    question: ""
  })

  // Handles changes in the text box input
  // - Updates the `inputValue` 
  const handleTextBoxChange = (value: string) => {
    setInputValue(value);
    console.log("Input value:", value);
  };

  // Handles form submission when a button is clicked
  // Takes `questionType` as an argument to set the type of question being asked.
  const handleSubmit = async(questionType: number) => {
    console.log("Submitting value:", inputValue);
    setSubmittedValue(inputValue); // Save the current input value
    setInputValue('') // Clear the input field
    setQuestion({
      question_type: questionType,
      question: inputValue
    })

    await post({
      question_type: questionType,
      question: inputValue
    })

    console.log('Received response:', textData);
  }

  const [editorContent, setEditorContent] = useState<string | undefined>("");
  
  const handleEditorContentChange = (content: string | undefined) => {
    setEditorContent(content)
    console.log("Editor content update: ", content)
  }

  const manipulateCode = () => {
    if (editorContent) {
      // Add Comments
      const updatedCode = `// Modified Code\n${editorContent}`;
      
      // Update the editor with the modified code
      setEditorContent(updatedCode);
    }
  }

  return (
    <MantineProvider> 
    <div className='app'>
      <div className="editor">
        <CodeEditor value={editorContent} onChange={handleEditorContentChange}/>
      </div>
      <div className='question'>
        <DataDisplay data={data} loading={loading} error={error}/>
        <h2>Question:</h2>
        <TextBox className='textBox' onChange={handleTextBoxChange} input={inputValue} />
        <div className="button-container">
          {buttons.map((button) => (
            <Button
              key={button.type}
              className='button'
              variant="filled"
              color={button.color}
              radius="md"
              size="md"
              onClick={() => handleSubmit(button.type)}
            >
              {button.text}
            </Button>
          ))}
            <Button
              key={99}
              className='button'
              variant="filled"
              color="darkblue"
              radius="md"
              size="md"
              onClick={manipulateCode}
            >
              Manipulate Code
            </Button>
        </div>
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
