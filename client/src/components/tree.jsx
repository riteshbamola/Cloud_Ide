import React from 'react';
import FolderTree from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import { FaFile, FaFolder, FaFolderOpen } from 'react-icons/fa';
import { HiFolderOpen } from 'react-icons/hi2';
import { DiJavascript1, DiCss3Full, DiHtml5, DiReact } from 'react-icons/di';
import { TbBrandCpp } from 'react-icons/tb';

const FileTree = ({ tree, setSelectedFile, selectedFile, setFileName }) => {
  const onTreeStateChange = (state, event) => {
    console.log('Tree State Changed:', state, event);
  };

  const handleClick = (event) => {
    const { nodeData } = event;
    if (nodeData.isDir) {
      setSelectedFile('');
      setFileName("");

    }
    if (nodeData.routeofnode && !nodeData.children && !nodeData.isDir) {
      setSelectedFile(nodeData.routeofnode);

      setFileName(nodeData.name);
    }
  };

  const FILE_ICONS = {
    js: <DiJavascript1 />,
    css: <DiCss3Full />,
    html: <DiHtml5 />,
    jsx: <DiReact />,
    cpp: <TbBrandCpp />,
  };

  const FileIcon = ({ nodeData }) => {
    if (nodeData.isDir) return null;
    const fileName = nodeData.name;
    const fileExtension = fileName.split('.').pop();
    return FILE_ICONS[fileExtension] || <FaFile />;
  };

  const FolderIcon = ({ nodeData }) => {
    return nodeData.isOpen ? <HiFolderOpen /> : <FaFolder />;
  };

  return (
    <FolderTree
      data={tree}
      onChange={onTreeStateChange}
      onNameClick={handleClick}
      showCheckbox={false}
      indentPixels={20}
      iconComponents={{
        FileIcon,
        FolderIcon,
      }}
    />
  );
};

export default FileTree;
