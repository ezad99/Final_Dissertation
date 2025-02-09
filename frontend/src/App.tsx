import {useState, useEffect } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider, Container} from '@mantine/core';
import TextBox from './components/TextBox';

import './App.css'
import {CODE, TEXT, CODE_QUESTION} from '../config';
import {PostCodePayloadModel,PostCodeResponseModel,PostTextPayloadModel, PostTextResponseModel } from './models/apiModels';
import { usePost } from './hooks/usePost';
import CodeEditor from './components/CodeEditor';
import Collapsable from './components/Collapsable';
import SubmitButton from './components/SubmitButton';
import MarkdownRenderer from './components/MarkdownRenderer';
// import CollapsableParent from './components/CollapsableParent';

function App() {
  // State to hold the current value in the textbox
  const [inputValue, setInputValue] =  useState<string>("");

  const [lastSubmittedType, setLastSubmittedType] = useState<number | null>(null);

  // State to hold the question object for the API payload
  const [question,setQuestion] = useState<PostTextPayloadModel>({
    question_type: 1,
    question: ""
  })

  // State to hold the question object for the API payload
  const [,setCode] = useState<PostCodePayloadModel>({
    question_type: 3,
    code: ""
  })

  // State to hold the question object for the API payload
  const [,setCodeQuestion] = useState<PostCodePayloadModel>({
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

  // State to keep track of Code Editor Content
  const [editorContent, setEditorContent] = useState<string>("");

  // State to keep track of the code submitted by the user
  const [,setSubmittedEditorContent] = useState<string>("");
  
  // Handles Code Editor Content Changes
  const handleEditorContentChange = (content: string | undefined) => {
    setEditorContent(content ?? "")
    console.log("Editor content update: ", content)
  }

  // POST data from text 
  // TEXT is the endpoint URL
  // `postText` triggers the post request
  const {responseData: textData, loading: textLoading, error: textError, post: postText} 
  = usePost<PostTextPayloadModel, PostTextResponseModel>(TEXT,
  {"Content-Type": "application/json"})

  // POST data from code
  // CODE is the endpoint URL
  // 'postCode' triggers the post request
  const {responseData: codeData, loading: codeLoading, error: codeError, post: postCode}
  = usePost<PostCodePayloadModel, PostCodeResponseModel>(CODE,
    {"Content-Type": "application/json"}
  )

  // POST data from code
  // CODE_QUESTION is the endpoint URL
  // 'postCodeQuestion' triggers the post request
  const {responseData: codeQuestionData, loading: codeQuestionLoading, error: codeQuestionError, post: postCodeQuestion}
  = usePost<PostCodePayloadModel, PostCodeResponseModel>(CODE_QUESTION,
    {"Content-Type": "application/json"}
  )

  // Handles form submission when a button is clicked
  // Takes `questionType` as an argument to set the type of question being asked.
  const handleTextSubmit = async(questionType: number) => {
    console.log("Submitting value:", inputValue);
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

    setLastSubmittedType(questionType)

    console.log('Received response:', textData);
  }

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

    setLastSubmittedType(questionType)

    console.log('Received response:', codeData)
  }

  // Handle Code submission
  const handleCodeQuestionSubmit = async(questionType: number) => {
    console.log("Submitting value:", inputValue);
    console.log("Submitted code:", editorContent);
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

    setLastSubmittedType(questionType)

    console.log('Received response:', codeQuestionData)
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
      <h2 className='title'>GuruJava</h2>
        <div className='components'>
          <div className="editor">
            <h2 className='titleHeader'>Code Editor</h2>
            {codeLoading && <p>Loading code response...</p>}
            {codeError && <p className='error'>An error occurred: {codeError}</p>}
            <CodeEditor value={editorContent} onChange={handleEditorContentChange}/>
          </div>

          <div className='question'>
            <Collapsable header="How To Write Code">
              <TextBox className='textBox' onChange={handleTextBoxChange} input={inputValue} />
              <SubmitButton onClick={() => handleTextSubmit(1)} />
            </Collapsable>

            <Collapsable header="General Question">
              <TextBox className='textBox' onChange={handleTextBoxChange} input={inputValue} />
              <SubmitButton onClick={() => handleTextSubmit(2)} />
            </Collapsable>

            <Collapsable header="How To Fix Code">
              <p className='questionText'>Add your code you want to be fixed into the code editor</p>
              <SubmitButton onClick={() => handleEditorContentSubmit(3)} />
            </Collapsable>

            <Collapsable header="Question From Code">
              <p className='questionText'>Ask a question for the Code in the Code Editor</p>
              <TextBox className='textBox' onChange={handleTextBoxChange} input={inputValue} />
              <SubmitButton onClick={() => handleCodeQuestionSubmit(4)} />
            </Collapsable>
          <h2 className='titleHeader'>Output</h2>
              <Container className="container">
                  {/* Render text response if available and it was the last submission */}
                  {textLoading && <p>Loading text response...</p>}
                  {textError && <p className='error'>An error occurred: {textError}</p>}
                  {/* Render code question response if available and it was the last submission */}
                  {codeQuestionLoading && <p>Loading code question response...</p>}
                  {codeQuestionError && <p className='error'>An error occurred: {codeQuestionError}</p>}
                  
                  {/* {lastSubmittedType === 1  && textData && (
                      <ReactMarkdown className="react-markdown">
                          {textData.content.content}
                      </ReactMarkdown>
                  )}
                  {lastSubmittedType === 2  && textData && (
                      <ReactMarkdown className="react-markdown">
                          {textData.content.content}
                      </ReactMarkdown>
                  )}
                  {lastSubmittedType === 4 && codeQuestionData && (
                      <ReactMarkdown className="react-markdown">
                          {codeQuestionData.content.content}
                      </ReactMarkdown>
                  )} */}
                  {lastSubmittedType === 1 && textData && (
                    <MarkdownRenderer content={textData.content.content} />
                  )}

                  {lastSubmittedType === 2 && textData && (
                    <MarkdownRenderer content={textData.content.content} />
                  )}

                  {lastSubmittedType === 4 && codeQuestionData && (
                    <MarkdownRenderer content={codeQuestionData.content.content} />
                  )}
            </Container>
          </div>
        </div>
    </div>
  </MantineProvider>
  );
}

export default App;

