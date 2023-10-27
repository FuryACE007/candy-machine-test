import React from 'react';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine"
import { generateSigner } from '@metaplex-foundation/umi';
import { TokenStandard } from "@metaplex-foundation/mpl-token-metadata"
import './App.css';

function App() {
  const rpcEndpoint = 'http//localhost:8899';
  if (!rpcEndpoint) {
    return <div>Error</div>
  }

  const umi = createUmi(rpcEndpoint).use(mplCandyMachine());

  const collectionUpdateAuthority = generateSigner(umi);


  const candyMachineSettings = {
    tokenStandard: TokenStandard.NonFungible,
    symbol: 'LUCID',
    maxEditionSupply: 10,
    isMutable: true,
  }

  return (
    <div className="App">
      <h1>Hellooo</h1>
    </div>
  );
}

export default App;
