import React from 'react';
import ReactDOM from 'react-dom/client';

import { Digraph, Edge, Node } from 'graphviz-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
    <Digraph width="120px">
      <Node id="A" color="forestgreen" />
      <MyNode />
      <Edge targets={['A', 'B']} />
    </Digraph>
  );
}

function MyNode() {
  return <Node id="B" />;
}
