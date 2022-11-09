import logo from './logo.svg';
import './App.css';
import {queryIdentities} from "@assetmantle/mantlejs/build/transaction/identity/query";
import config from "@assetmantle/mantlejs/build/config.json"
//  import queryIdentities from "./querry";
 import { mintAsset } from "@assetmantle/mantlejs/build/transaction/assets/mint";
 import { createRandomWallet, createStore, createWallet, decryptStore } from "@assetmantle/mantlejs/build/utilities/keys";

function App() {
  async function test(){ 
  const mnemonic =
  "wage thunder live sense resemble foil apple course spin horse glass mansion midnight laundry acoustic rhythm loan scale talent push green direct brick please";
  console.log("Creating random wallet...");
  let randomWallet =  createRandomWallet("");
  console.log("randomwallet: ", randomWallet);
  let userGivenMnemonic =
    "wage thunder live sense resemble foil apple course spin horse glass mansion midnight laundry acoustic rhythm loan scale talent push green direct brick please";
  console.log("Creating wallet from mnemonic...");

  let wallet = await createWallet(userGivenMnemonic, "");
  console.log("wallet: ", wallet);
  let createdStore = await createStore(wallet.mnemonic, "123123123");

  let keyRes = "";
  if (createdStore.error) {
    console.log(createdStore.error);
  } else {
    console.log("Keystore created with name " + wallet.address + ".json");
    keyRes = createdStore.Response;
  }

  if (createdStore.error) {
    console.log("Unable to store Reason: " + createdStore.error);
  }

  console.log("Reading keystore...");
  let mnemonicRestored = await decryptStore(keyRes, "123123123");
  console.log("mnemonicRestored: ", mnemonicRestored);

  console.log(
    "nub arguments: ",
    wallet.address,
    config.chain_id,
    mnemonic,
    config.nubID,
    25,
    "stake",
    200000,
    "block",
  );

// get the queryIdentities controller object to perform the query
const queryIdentitiesControllerObj = new queryIdentities("http://23.88.102.13:26657");

const handleSubmit = async event => {
        event.preventDefault();
        // const IdentityName = event.target.identityname.value;
        // create double hash
        // const hashGenerate = GetMetaHelper.Hash(GetMetaHelper.Hash(IdentityName));
        // build identityID using nub classificationID and the generated hash
        // const identityID = config.nubClassificationID+'|'+hashGenerate;
        // query identities in the chain associated with the particular identityID
        const identitiesPromise = await queryIdentitiesControllerObj.queryIdentity();
        console.log(identitiesPromise);}
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={test}>try</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
