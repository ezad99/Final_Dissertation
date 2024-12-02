import {useState, useEffect } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider, Button, Container} from '@mantine/core';
import TextBox from './components/TextBox';

import './App.css'
import {CODE, DATA, TEXT, CODE_QUESTION} from '../config';
import DataDisplay from './components/DataDisplay';
import useGet from './hooks/useGet';
import { GetDataModel,getMapData,PostCodePayloadModel,PostCodeResponseModel,PostTextPayloadModel, PostTextResponseModel } from './models/apiModels';
import { usePost } from './hooks/usePost';
import ReactMarkdown from 'react-markdown';
import CodeEditor from './components/CodeEditor';
import Collapsable from './components/Collapsable';

function App() {

  // Array representing all Button Types
  const buttons = [
    { key:1, text: "How To Write Code",  onClick: () => handleTextSubmit(1)},
    { key:2, text: "General Question",  onClick: () => handleTextSubmit(2)},
    { key:3, text: "How To Fix Code",  onClick: () => handleEditorContentSubmit(3)},
  ];

  // Fetch Data for SanityCheck
  const {data, loading, error} = useGet<GetDataModel>(DATA, getMapData);

  // State to hold the current value in the textbox
  const [inputValue, setInputValue] =  useState<string>("");

  // State to keep track of the value submitted by the user
  const [submittedValue, setSubmittedValue] =  useState<string>("");

  const [lastSubmittedType, setLastSubmittedType] = useState<number | null>(null);

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

  // State to hold the question object for the API payload
  const [codeQuestion,setCodeQuestion] = useState<PostCodePayloadModel>({
    question_type: 4,
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

    setLastSubmittedType(1)

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

  // POST data from code
  // CODE is the endpoint URL
  // 'postCodeQuestion' triggers the post request
  const {responseData: codeQuestionData, loading: codeQuestionLoading, error: codeQuestionError, post: postCodeQuestion}
  = usePost<PostCodePayloadModel, PostCodeResponseModel>(CODE_QUESTION,
    {"Content-Type": "application/json"}
  )

  // Handle Code submission
  const handleCodeQuestionSubmit = async(questionType: number) => {
    console.log("Submitting value:", inputValue);
    console.log("Submitted code:", editorContent);
    setSubmittedValue(inputValue); 
    setSubmittedEditorContent(editorContent);
    setInputValue('')
    setCodeQuestion({
      question_type: questionType,
      code: inputValue + editorContent
    })
    
    setDisplayInEditor(false);

    await postCodeQuestion({
      question_type: questionType,
      code: inputValue + editorContent
    })

    setLastSubmittedType(4)

    console.log('Received response:', codeQuestionData)
  }


  return (
    <MantineProvider> 
    <div className='app'>
      <h2 className='title'>GuruJava</h2>
        <div className='components'>
          <div className="editor">
            <h2 >Code Editor</h2>
            {codeLoading && <p>Loading code response...</p>}
            {codeError && <p className='error'>An error occurred: {codeError}</p>}
            <CodeEditor value={editorContent} onChange={handleEditorContentChange}/>
          </div>
          <div className='question'>
            {/* <DataDisplay data={data} loading={loading} error={error}/> */}
            <Collapsable header="How To Write Code">
            <TextBox className='textBox' onChange={handleTextBoxChange} input={inputValue} />
                <Button
                    key={1}
                    className="button"
                    variant="filled"
                    color="rgb(145, 0, 207)"
                    radius="md"
                    size="md"
                    onClick={() => handleTextSubmit(1)}>
                    {"Submit"}
                </Button>
            </Collapsable>
            <Collapsable header="General Question">
            <TextBox className='textBox' onChange={handleTextBoxChange} input={inputValue} />
                <Button
                    key={2}
                    className="button"
                    variant="filled"
                    color="rgb(145, 0, 207)"
                    radius="md"
                    size="md"
                    onClick={() => handleTextSubmit(2)}>
                    {"Submit"}
                </Button>
            </Collapsable>
            <Collapsable header="How To Fix Code">
            <p>Add your code you want to to be fixed into the code editor </p>
                <Button
                    key={3}
                    className="button"
                    variant="filled"
                    color="rgb(145, 0, 207)"
                    radius="md"
                    size="md"
                    onClick={() =>  handleEditorContentSubmit(3)}>
                    {"Submit"}
                </Button>
            </Collapsable>
            <Collapsable header="Question From Code">
            <p>Ask Question from the Code in the Code Editor </p>
            <TextBox className='textBox' onChange={handleTextBoxChange} input={inputValue} />
                <Button
                    key={4}
                    className="button"
                    variant="filled"
                    color="rgb(145, 0, 207)"
                    radius="md"
                    size="md"
                    onClick={() =>  handleCodeQuestionSubmit(4)}>
                    {"Submit"}
                </Button>
            </Collapsable>
            <h2>Output</h2>
              <Container className="container">
                  {/* Render text response if available and it was the last submission */}
                  {textLoading && <p>Loading text response...</p>}
                  {textError && <p className='error'>An error occurred: {textError}</p>}
                  {/* Render code question response if available and it was the last submission */}
                  {codeQuestionLoading && <p>Loading code question response...</p>}
                  {codeQuestionError && <p className='error'>An error occurred: {codeQuestionError}</p>}
                  
                  {lastSubmittedType === 1 && textData && (
                      <ReactMarkdown className="react-markdown">
                          {textData.content.content}
                      </ReactMarkdown>
                  )}
                  {lastSubmittedType === 4 && codeQuestionData && (
                      <ReactMarkdown className="react-markdown">
                          {codeQuestionData.content.content}
                      </ReactMarkdown>
                  )}
            </Container>
          </div>
        </div>
    </div>
  </MantineProvider>
  );
}

export default App;


