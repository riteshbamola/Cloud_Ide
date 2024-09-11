import React from 'react'
import styled from 'styled-components';
import { useFileContext } from '../../filecontext';
import Terminal from './terminal';
function Output() {
  const { selectedFile } = useFileContext();
  return (
    <OutputStyled>
      {!selectedFile ? <p></p> :
        <div className='terminal'>
          <h1>Terminal</h1>
          <Terminal />
        </div>
      }
    </OutputStyled>
  )
}
const OutputStyled = styled.div`
  background-color: #1e1e1e;
  width:40vw;
  padding: 1rem;
  height: 100%;
  
  overflow-y: auto;
  color: white;

  h1 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .terminal-content {
    height: 100%;
  }
`;

export default Output;
