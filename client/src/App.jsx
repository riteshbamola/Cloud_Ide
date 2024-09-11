import './App.css';
import { useCallback, useEffect, useState } from 'react';
import Terminal from './components/terminal';
import socket from './socket';
import Navbar from './components/Navbar';
import { useFileContext } from '../filecontext';
import Files from './components/Files';
import Editor from './components/Editor';
import styled from 'styled-components';
import Output from './components/Output';
import Room from './components/Room';
import Collaborate from './components/Collaborate';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const {
    fileTree,
    setFileTree,
    setLoading,
    setError,
    loading,
    error,
    selectedFile,
    setSelectedFile,
    selectedFileContent,
    setSelectedFileContent,
    data,
    setData,
    isSaved,
  } = useFileContext();

  const getFileTree = async () => {
    try {
      const response = await fetch('http://localhost:9000/user/files');

      if (!response.ok) {
        throw new Error('Failed to fetch file tree');
      }
      const result = await response.json();
      setFileTree(result.fileTree);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFileContent = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:9000/user/files/content?path=${selectedFile}`);

      if (!response.ok) {
        throw new Error('Failed to fetch file content');
      }
      const result = await response.json();
      setSelectedFileContent(result.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      getFileContent();
    }
  }, [getFileContent, selectedFile]);

  useEffect(() => {
    getFileTree();
  }, []);

  useEffect(() => {
    socket.on('file:refresh', getFileTree);
    return () => {
      socket.off('file:refresh', getFileTree);
    };
  }, []);

  useEffect(() => {
    if (selectedFile && selectedFileContent) {
      setData(selectedFileContent);
    }
  }, [selectedFile, selectedFileContent]);

  useEffect(() => {
    if (data && !isSaved) {
      const timer = setTimeout(() => {
        socket.emit('file:change', {
          path: selectedFile,
          content: data,
        });
      }, 5 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [data, selectedFile, isSaved]);

  useEffect(() => {
    setData('');
  }, [selectedFile]);

  if (loading) {
    return <div>Loading file tree...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <AppStyled>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="codes">
                <Files />
                <div className="code-output">
                  <Editor />
                </div>
                <div className="terminal-panel">
                  <Output />
                </div>
              </div>
            }
          />
          <Route path="/room" element={<Room />} />
          <Route path='/collaborate' element={<Collaborate />} />
        </Routes>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .codes {
    display: flex;
    flex-direction: row;
    flex: 1;
    height: 100%;
  }

  .code-output {
    display: flex;
    flex-direction: column;
    flex: 2;
    padding: 1rem;
    background-color: #272822; // Light gray background
  }

  .terminal-panel {
    flex: 1;
    padding: 1rem;
    background-color: #333;
    color: white;
    border-left: 1px solid white;
  }
`;

export default App;
