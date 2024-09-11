import React from 'react'
import Editor from './Editor'
import { useCallback, useEffect, useState } from 'react';
import { useFileContext } from '../../filecontext';
function Collaborate() {
  const { fileTree, roomFile, setRoomFile, selectedFile, setSelectedFile, setLoading,
    setError,
    loading,
    error, selectedFileContent,
    setSelectedFileContent, } = useFileContext();
  const gettingFileContent = useCallback(async () => {
    try {
      // Assuming roomFile is an object and the file path is stored in a `path` property
      const filePath = roomFile?.path || roomFile; // Adjust this line according to your data structure

      const response = await fetch(`http://localhost:9000/user/files/content?path=${encodeURIComponent(filePath)}`);

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
  }, [roomFile, setSelectedFileContent, setError, setLoading]);

  useEffect(() => {
    if (selectedFile) {
      getFileContent();
    }
  }, [getFileContent, selectedFile]);
  return (
    <div>
      <Editor />

    </div>
  )
}

export default Collaborate
