import React from 'react'
import { useFileContext } from '../../filecontext';
import FileTree from './tree';
import styled from 'styled-components';
import { FaFileAlt } from "react-icons/fa";
function Files() {
  const { fileTree, setSelectedFile, selectedFile, setFileName } = useFileContext();
  return (
    <FileStyled>
      <h2><FaFileAlt style={{ width: '1vw', height: '2vh' }} />Files</h2>
      <div className="allfiles">
        <FileTree tree={fileTree} setSelectedFile={setSelectedFile} selectedFile={selectedFile} setFileName={setFileName} />
      </div>
    </FileStyled>
  )
}
const FileStyled = styled.div`
  width: 20vw;
  height: 100%;
  border-right: 1px solid #ccc;
  background-color: #333333; // Light background for files panel
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  color:white;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    color: white;
    margin-bottom: 1rem;
    border-bottom:1px solid white;
  }

  .allfiles {
    flex: 1;
    overflow-y: auto;
  }
`;
export default Files;
