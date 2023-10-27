import React, { useEffect } from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { generateSigner, percentAmount, some, none } from "@metaplex-foundation/umi";
import {
  TokenStandard,
  createNft,
} from "@metaplex-foundation/mpl-token-metadata";
import "./App.css";

function App() {
  const rpcEndpoint =
    "https://solana-devnet.g.alchemy.com/v2/" + process.env.REACT_APP_API_KEY;
  if (!rpcEndpoint) {
    return <div>Error</div>;
  }

  const umi = createUmi(rpcEndpoint).use(mplCandyMachine());
  const collectionUpdateAuthority = generateSigner(umi);
  const collectionMint = generateSigner(umi);
  
  const createNftCollectHandler = async () => {
    await createNft(umi, {
      mint: collectionMint,
      authority: collectionUpdateAuthority,
      name: "Consumables",
      uri: "http://localhost:8899/", // to be fetched from the form after uploading the data.
      isCollection: true,
      sellerFeeBasisPoints: percentAmount(1.0, 2), // royality fee of 1.00 %
    }).sendAndConfirm(umi);
  };

  const candyMachineSettings = {
    hiddenSetting: none,
    configLineSettings: some({
      prefixName: 'Consumables #$ID+1$', // can i remove name from the create token now ?
      nameLength: 0,
      prefixUri: 'https://arweave.net/',
      uriLength: 43,
      isSequential: true,
    }),
    collectionMint: collectionMint.publicKey,
    collectionUpdateAuthority,
    tokenStandard: TokenStandard.NonFungible,
    symbol: "LUCID",
    maxEditionSupply: 10,
    itemsAvailable: 10,
    isMutable: true,
  };

  return (
    <div className="App">
      <h1>Hellooo</h1>
    </div>
  );
}

export default App;
