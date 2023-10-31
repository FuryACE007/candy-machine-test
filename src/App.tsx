import React, { useMemo } from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  mplCandyMachine,
  create,
} from "@metaplex-foundation/mpl-candy-machine";
import {
  generateSigner,
  percentAmount,
  some,
  none,
} from "@metaplex-foundation/umi";
import {
  TokenStandard,
  createNft,
} from "@metaplex-foundation/mpl-token-metadata";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "./App.css";
require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  const solNetwork = WalletAdapterNetwork.Devnet;
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [solNetwork]);
  const wallet = useWallet();
  const rpcEndpoint =
    "https://solana-devnet.g.alchemy.com/v2/" + process.env.REACT_APP_API_KEY;
  if (!rpcEndpoint) {
    return <div>Error</div>;
  }
  if(wallet.connected)
    console.log("Wallet object:" + wallet.publicKey);
  else  
    console.log("Wallet not connected");
    
  
  const umi = createUmi(rpcEndpoint).use(mplCandyMachine());

  // Create the Collection NFT.
  const collectionUpdateAuthority = generateSigner(umi);
  const collectionMint = generateSigner(umi);

  const createNftCollection = async () => {
    await createNft(umi, {
      mint: collectionMint,
      authority: collectionUpdateAuthority,
      name: "Consumables",
      uri: "http://localhost:8899/", // to be fetched from the form after uploading the data.
      isCollection: true,
      sellerFeeBasisPoints: percentAmount(1.0, 2), // royality fee of 1.00 %
    }).sendAndConfirm(umi);
  };
  console.log("Collection2mint"+collectionMint);

  createNftCollection();

  const candyMachine = generateSigner(umi); // create a candy machine account
  const createCandyMachine = async () => {
    const candyObj = await create(umi, {
      candyMachine,
      collectionMint: collectionMint.publicKey,
      collectionUpdateAuthority,
      tokenStandard: TokenStandard.NonFungible,
      sellerFeeBasisPoints: percentAmount(1.0, 2), // 1.00%
      itemsAvailable: 10,
      creators: [
        {
          address: umi.identity.publicKey,
          verified: true,
          percentageShare: 100,
        },
      ],
      configLineSettings: some({
        prefixName: "",
        nameLength: 32,
        prefixUri: "",
        uriLength: 200,
        isSequential: false,
      }),
    });
    candyObj.sendAndConfirm(umi);

    // console.log(candyMachine, candyObj);
  };

  createCandyMachine();

  return (
    <ConnectionProvider endpoint={rpcEndpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <div className="App">
            <h1>Hellooo</h1>
            <div>
              <WalletMultiButton />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
