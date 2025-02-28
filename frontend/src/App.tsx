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

function App() {
  // State to hold the current value in the textbox
  const [inputValue, setInputValue] =  useState<string>("");

  // State to hold the last question type submitted
  const [lastSubmittedType, setLastSubmittedType] = useState<number | null>(null);

  // State to hold the response history
  const [codeResponseHistory, setCodeResponseHistory] = useState<string[]>([]);
  const [textResponseHistory, setTextResponseHistory] = useState<string[]>([]);
  
  // State to hold the order of the response history
  const [currentCodeResponseIndex, setCurrentCodeResponseIndex] = useState<number | null>(null);
  const [currentTextResponseIndex, setCurrentTextResponseIndex] = useState<number | null>(null);

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

  // State to determine whether to display as text or as code
  const [displayInEditor, setDisplayInEditor] = useState<boolean>(false);

  // State to keep track of Code Editor Content
  const [editorContent, setEditorContent] = useState<string>("");

  // State to keep track of the code submitted by the user
  const [,setSubmittedEditorContent] = useState<string>("");

  // Handles changes in the text box input
  // - Updates the `inputValue` 
  const handleTextBoxChange = (value: string) => {
    setInputValue(value);
    console.log("Input value:", value);
  };
  
  // Handles Code Editor Content Changes
  const handleEditorContentChange = (content: string | undefined) => {
    setEditorContent(content ?? "")
    console.log("Editor content update: ", content)
  };

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

  // Handles Form Submission
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

    console.log("API request sent");

    if (textData) {
      setTextResponseHistory((prev) => [...prev, textData.content.content]);
      setCurrentTextResponseIndex(textResponseHistory.length);

    setLastSubmittedType(questionType)

    console.log('Received response:', textData);
  }
}

  // Handle Code Editor Content Submission
  const handleEditorContentSubmit = async (questionType: number) => {
    console.log("Submitted code:", editorContent);
   
    setCodeResponseHistory((prev) => [...prev, editorContent]);
  
    setSubmittedEditorContent(editorContent);
  
    await postCode({
      question_type: questionType,
      code: editorContent,
    });

    console.log("API request sent for:", questionType);
  
    // // Handle API response when available
    // if (codeData && codeData.content && codeData.content.content) {
    //   setEditorContent(codeData.content.content); // Update editor with new code
  
    //   setCodeResponseHistory((prev) => {
    //     const newHistory = [...prev, codeData.content.content];
    //     return newHistory;
    //   });
  
    //   setCurrentCodeResponseIndex((prev) => (prev === null ? 0 : prev + 1));
    // }
  
    setLastSubmittedType(questionType);
    console.log("Received response:", codeData);
  };
  

  // Handle Code Submission
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

  const handlePreviousTextResponse = () => {
    if (currentTextResponseIndex !== null && currentTextResponseIndex > 0) {
      setCurrentTextResponseIndex((prev) => (prev as number) - 1);
    }
  };
  
  const handleNextTextResponse = () => {
    if (currentTextResponseIndex !== null && currentTextResponseIndex < textResponseHistory.length - 1) {
      setCurrentTextResponseIndex((prev) => (prev as number) + 1);
    }
  };

  const handlePreviousCodeResponse = () => {
    if (currentCodeResponseIndex !== null && currentCodeResponseIndex > 0) {
      setCurrentCodeResponseIndex((prev) => (prev as number) - 1);
      setEditorContent(codeResponseHistory[currentCodeResponseIndex - 1]);
    }
  };
  
  const handleNextCodeResponse = () => {
    if (currentCodeResponseIndex !== null && currentCodeResponseIndex < codeResponseHistory.length - 1) {
      setCurrentCodeResponseIndex((prev) => (prev as number) + 1);
      setEditorContent(codeResponseHistory[currentCodeResponseIndex + 1]);
    }
  };
  

  // Effect hook to handle updates to codeData
  useEffect(() => {
    if (codeData && codeData.content && codeData.content.content) {
      setEditorContent(codeData.content.content); // ✅ Update editor with API response
  
      // Save to history ONLY when a new response comes in
      setCodeResponseHistory((prev) => {
        if (prev[prev.length - 1] !== codeData.content.content) {
          return [...prev, codeData.content.content];
        }
        return prev; // Avoid duplicates
      });
  
      setCurrentCodeResponseIndex((prev) =>
        prev === null ? 0 : codeResponseHistory.length
      );
    }
  }, [codeData]);
  
  useEffect(() => {
    if (textData && textData.content && textData.content.content) {
      setTextResponseHistory((prev) => [...prev, textData.content.content]);
      setCurrentTextResponseIndex((prev) => textResponseHistory.length);
    }
  }, [textData]);

  useEffect(() => {
    if (codeResponseHistory.length > 0) {
      setCurrentCodeResponseIndex(codeResponseHistory.length - 1);
    }
  }, [codeResponseHistory]);
  
  const handleClearEditor = () => {
    setEditorContent("");
     setSubmittedEditorContent("");
  };

  return (
    <MantineProvider> 
    <div className='app'>
      <h2 className='title'>GuruJava</h2>

        {/* Code Editor Section */}
        <div className='components'>
          <div className="editor">
            <h2 className="titleHeader">Code Editor</h2>
            {codeLoading && <p>Loading code response...</p>}
            {codeError && <p className="error">An error occurred: {codeError}</p>}
            <CodeEditor value={editorContent} onChange={handleEditorContentChange}/>
          <div className='code-buttons'> 
              <div className="code-navigation">
                <button className="navigational-button" onClick={handlePreviousCodeResponse} disabled={currentCodeResponseIndex === 0}>← Previous Code</button>
                <button className="navigational-button" onClick={handleNextCodeResponse} disabled={currentCodeResponseIndex === codeResponseHistory.length - 1}>Next Code →</button>
              </div>

              <button className="clear-btn" onClick={handleClearEditor}>Clear Editor</button>
            </div>
          </div>

          {/* Questions Section */}
          <div className='question'>
            <div>
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
            </div>
          
            {/* Output Section */}
            <h2 className='titleHeader'>Output</h2>
            <Container className="container">
                {/* Render text response if available and it was the last submission */}
                {textLoading && <p>Loading text response...</p>}
                {textError && <p className='error'>An error occurred: {textError}</p>}
                {/* Render code question response if available and it was the last submission */}
                {codeQuestionLoading && <p>Loading code question response...</p>}
                {codeQuestionError && <p className='error'>An error occurred: {codeQuestionError}</p>}

                {textResponseHistory.length > 0 && currentTextResponseIndex !== null ? (
                    <MarkdownRenderer content={textResponseHistory[currentTextResponseIndex]} />
                ) : (
                    lastSubmittedType === 1 && textData ? <MarkdownRenderer content={textData.content.content} /> :
                    lastSubmittedType === 2 && textData ? <MarkdownRenderer content={textData.content.content} /> :
                    lastSubmittedType === 4 && codeQuestionData ? <MarkdownRenderer content={codeQuestionData.content.content} /> :
                    null
                )}
            </Container>

              <div className="text-response-navigation">
                <button className="navigational-button" onClick={handlePreviousTextResponse} disabled={currentTextResponseIndex === 0}>← Previous Text</button>
                <button className="navigational-button" onClick={handleNextTextResponse} disabled={currentTextResponseIndex === textResponseHistory.length - 1}>Next Text →</button>
              </div>

          </div>
        </div>
    </div>
  </MantineProvider>
  );
}

export default App;
