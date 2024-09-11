import React, { useState } from 'react';
import styled from 'styled-components';
import { useFileContext } from '../../filecontext';
import { useNavigate } from 'react-router-dom';

function Room() {
  const { fileTree, roomFile, setRoomFile, selectedFile, setSelectedFile } = useFileContext();

  const navigate = useNavigate();

  // Function to handle file selection and navigate to the collaboration room
  const handleFileSelect = (file) => {
    setRoomFile(file);
    setSelectedFile(file);
    // Navigate to a collaboration room with the selected file
    navigate(`/collaborate?id=${file.routeofnode}`);
  };

  const renderTree = (node) => {
    return (
      <FileNode key={node.routeofnode}>
        <FileItem
          onClick={() => !node.isDir && handleFileSelect(node)}
          isDir={node.isDir}
        >
          {node.name}
        </FileItem>
        {node.children && (
          <ChildNodes>
            {node.children.map((child) => renderTree(child))}
          </ChildNodes>
        )}
      </FileNode>
    );
  };

  return (
    <RoomContainer>
      <Title>Select a file to collaborate:</Title>
      <FileTreeContainer>{renderTree(fileTree)}</FileTreeContainer>
      {roomFile && (
        <SelectedFileInfo>
          <span>Collaborating on: </span>
          <strong>{roomFile.name}</strong>
        </SelectedFileInfo>
      )}
    </RoomContainer>
  );
}

// Styled Components
const RoomContainer = styled.div`
  padding: 2rem;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`;

const FileTreeContainer = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

const FileNode = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  margin: 0;
`;

const FileItem = styled.li`
  font-weight: ${(props) => (props.isDir ? 'bold' : 'normal')};
  margin: 0.5rem 0;
  cursor: ${(props) => (props.isDir ? 'default' : 'pointer')};
  color: ${(props) => (props.isDir ? '#2c3e50' : '#34495e')};

  &:hover {
    color: ${(props) => (props.isDir ? '#2c3e50' : '#2980b9')};
    text-decoration: ${(props) => (props.isDir ? 'none' : 'underline')};
  }
`;

const ChildNodes = styled.div`
  padding-left: 20px;
  border-left: 1px solid #ccc;
`;

const SelectedFileInfo = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #d1ecf1;
  color: #0c5460;
  border-left: 5px solid #007b8f;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-right: 0.5rem;
  }
`;

export default Room;
