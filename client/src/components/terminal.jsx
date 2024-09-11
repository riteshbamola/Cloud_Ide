import React, { useEffect, useRef } from 'react'
import { Terminal as Xterminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import socket from '../socket';
function Terminal() {

  const terminalref = useRef();
  const isRendered = useRef(false)
  useEffect(() => {

    if (isRendered.current) return;
    isRendered.current = true;
    const term = new Xterminal({
      rows: 20,
      cols: 180,
    });
    term.open(terminalref.current);

    term.onData(data => {
      socket.emit('terminal:write', data);

    })
    socket.on('terminal:data', (data) => {
      term.write(data);
    })

    // return () => {
    //   socket.off('terminal:data');
    // }
  }, [])
  return (
    <div ref={terminalref} id='terminal'>

    </div>
  )
}
import { } from '@xterm/xterm'
export default Terminal
