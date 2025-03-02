import { Editor } from "@monaco-editor/react";
import { useRef } from "react";

const CodeEditor = ({value, onChange}: {value: string | undefined; onChange: (value: string | undefined) => void}) => {
    const editorRef = useRef<any>(null);

    const handleEditorOnMount = (editor: any) => {
        editorRef.current = editor; // Stores the editor instance
        editor.focus(); // Set focus on editor when mounted
    }

    const handleEditorChange = (value: string | undefined) => {
        onChange(value); // Pass content to the parent component 
    }

    return (
        <>
            <Editor
                options={{
                    minimap: {
                    enabled: false,
                    },
                }}
                height="76vh"
                theme="vs-dark"
                defaultLanguage="java"
                defaultValue=""
                value={value}
                onMount={handleEditorOnMount}
                onChange={handleEditorChange} // Captures changes in the editor
            />
        </>
    )
}

export default CodeEditor;