import React from 'react';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine"
import './App.css';

function App() {
  // const umi = createUmi('http://localhost:8080').use(mplCandyMachine());
  const rpcEndpoint = 'http//localhost:8899';
  if (!rpcEndpoint) {
    return <div>Error</div>
  }
  return (
    <div className="App">
      <h1>Hellooo</h1>
    </div>
  );
}

export default App;
