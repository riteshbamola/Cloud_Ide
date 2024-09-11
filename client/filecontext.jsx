// FileContext.js
import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [fileTree, setFileTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [data, setData] = useState("");
  const [fileName, setFileName] = useState("");
  const [roomFile, setRoomFile] = useState(null);

  const isSaved = data === selectedFileContent;
  return (
    <FileContext.Provider
      value={{
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
        fileName,
        setFileName,
        roomFile,
        setRoomFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => useContext(FileContext);
