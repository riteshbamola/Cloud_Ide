import React, { useState, useEffect, useCallback } from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import { useFileContext } from '../../filecontext';
import { FaFileAlt } from 'react-icons/fa';
import debounce from 'lodash/debounce'; // Install lodash if you haven't
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
function Editor() {
  const { selectedFile, data, setData, fileName } = useFileContext();

  // Debounce the setData function to reduce frequent state updates
  const debouncedSetData = useCallback(debounce((newValue) => {
    setData(newValue);
  }, 300), [setData]);
  const getFileMode = (fileName) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'java':
        return 'java';
      case 'rb':
        return 'ruby';
      // Add more cases as needed
      default:
        return 'text';
    }
  };
  return (
    <EditorStyled>
      <p><FaFileAlt style={{ width: '1vw', height: '2vh' }} /> {selectedFile ? fileName : ''}</p>

      {!selectedFile ? <p>Select a file </p> : (
        <AceEditor
          value={data}
          onChange={debouncedSetData}
          placeholder="Start writing your code..."
          mode={getFileMode(fileName)}
          theme="monokai"
          name="codeEditor"
          fontSize={14}
          width="40vw"
          height="80vh"
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      )}
    </EditorStyled>
  );
}

const EditorStyled = styled.div`
flex: 2;
 background-color: black;
  display: flex;
  flex-direction: column;
  background-color: #272822; // Monokai background
  padding: 1rem;
  color: white;

  p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    border-bottom:1px solid white;
  }
`;




export default Editor;
