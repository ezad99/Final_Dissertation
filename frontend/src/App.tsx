import {useState, useEffect } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider, Button, Container} from '@mantine/core';
import TextBox from './components/TextBox';

import './App.css'
import {CODE, DATA, TEXT} from '../config';
import DataDisplay from './components/DataDisplay';
import useGet from './hooks/useGet';
import { GetDataModel,getMapData,PostCodePayloadModel,PostCodeResponseModel,PostTextPayloadModel, PostTextResponseModel } from './models/apiModels';
import { usePost } from './hooks/usePost';
import ReactMarkdown from 'react-markdown';
import CodeEditor from './components/CodeEditor';

function App() {

  // Array representing all Button Types
  const buttons = [
    { key:1, text: "How To Write Code", color: "grape", onClick: () => handleTextSubmit(1)},
    { key:2, text: "General Question", color: "orange", onClick: () => handleTextSubmit(2)},
    { key:3, text: "How To Fix Code", color: "maroon", onClick: () => handleEditorContentSubmit(3)},
  ];

  // Fetch Data for SanityCheck
  const {data, loading, error} = useGet<GetDataModel>(DATA, getMapData);

  // State to hold the current value in the textbox
  const [inputValue, setInputValue] =  useState<string>("");

  // State to keep track of the value submitted by the user
  const [submittedValue, setSubmittedValue] =  useState<string>("");

  // State to hold the question object for the API payload
  const [question,setQuestion] = useState<PostTextPayloadModel>({
    question_type: 1,
    question: ""
  })

    // State to hold the question object for the API payload
  const [code,setCode] = useState<PostCodePayloadModel>({
    question_type: 3,
    code: ""
  })

  // Handles changes in the text box input
  // - Updates the `inputValue` 
  const handleTextBoxChange = (value: string) => {
    setInputValue(value);
    console.log("Input value:", value);
  };

  // State to determine whether to display as text or as code
  const [displayInEditor, setDisplayInEditor] = useState<boolean>(false);

  // POST data from text 
  // TEXT is the endpoint URL
  // `postText` triggers the post request
  const {responseData: textData, loading: textLoading, error: textError, post: postText} 
  = usePost<PostTextPayloadModel, PostTextResponseModel>(TEXT,
  {"Content-Type": "application/json"})

  // Handles form submission when a button is clicked
  // Takes `questionType` as an argument to set the type of question being asked.
  const handleTextSubmit = async(questionType: number) => {
    console.log("Submitting value:", inputValue);
    setSubmittedValue(inputValue); // Save the current input value
    setInputValue('') // Clear the input field
    setQuestion({
      question_type: questionType,
      question: inputValue
    })

    console.log(question);

    setDisplayInEditor(false);

    await postText({
      question_type: questionType,
      question: inputValue
    })

    console.log('Received response:', textData);
  }

  // State to keep track of Code Editor Content
  const [editorContent, setEditorContent] = useState<string>("");

  // State to keep track of the code submitted by the user
  const [submittedEditorContent, setSubmittedEditorContent] = useState<string>("");
  
  // Handles Code Editor Content Changes
  const handleEditorContentChange = (content: string | undefined) => {
    setEditorContent(content ?? "")
    console.log("Editor content update: ", content)
  }

  // POST data from code
  // CODE is the endpoint URL
  // 'postCode' triggers the post request
  const {responseData: codeData, loading: codeLoading, error: codeError, post: postCode}
  = usePost<PostCodePayloadModel, PostCodeResponseModel>(CODE,
    {"Content-Type": "application/json"}
  )


  // Handle Code submission
  const handleEditorContentSubmit = async(questionType: number) => {
    console.log("Submitted code:", editorContent);
    setSubmittedEditorContent(editorContent);
    setCode({
      question_type: questionType,
      code: editorContent
    })

    console.log(question);
    
    setDisplayInEditor(true);

    await postCode({
      question_type: questionType,
      code: editorContent
    })

    // Update editor with response
    if (codeData && codeData.content && codeData.content.content) {
      setEditorContent(codeData.content.content); 
    }

    console.log('Received response:', codeData)
  }

  // Effect hook to handle updates to codeData
  useEffect(() => {
    if (displayInEditor && codeData && codeData.content && codeData.content.content) {
      setEditorContent(codeData.content.content);
    }
  }, [codeData, displayInEditor]); // This effect runs whenever textData changes

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
              key={button.key}
              className='button'
              variant="filled"
              color={button.color}
              radius="md"
              size="md"
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          ))}
        </div>
        <p>Current Input: {inputValue}</p>
        <p>Submitted Value: {submittedValue}</p>
        {/* Show loading, error, or response data */}
        <p>Solution:</p>
        {displayInEditor ? (
          // Show response in the Code Editor
          <p>Code Editor Updated</p>
        ) : (
          loading ? (
            <p>{textLoading}</p>
          ) : error ? (
            <p className='error'>An error occurred: {textError}</p>
          ) :
          // Show response in the Container
          textData && (
            <Container className="container">
              <ReactMarkdown className="react-markdown">
                {textData.content.content}
              </ReactMarkdown>
            </Container>
          )
        )}
      </div>
    </div>
  </MantineProvider>
   
  );
}

export default App;
