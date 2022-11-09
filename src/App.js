import logo from './logo.svg';
import './App.css';
import {queryIdentities} from "@assetmantle/mantlejs/build/transaction/identity/query";
import config from "@assetmantle/mantlejs/build/config.json"
import { checkRawLog, FindInResponse } from "@assetmantle/mantlejs/build/helpers/helper";
//  import queryIdentities from "./querry";
 import { mintAsset } from "@assetmantle/mantlejs/build/transaction/assets/mint";
 import { createRandomWallet, createStore, createWallet, decryptStore } from "@assetmantle/mantlejs/build/utilities/keys";
 import { cls } from "@assetmantle/mantlejs/build/transaction/classification/query";
 import { defineAsset } from "@assetmantle/mantlejs/build/transaction/assets/define";
 import { nubIdentity } from "@assetmantle/mantlejs/build/transaction/identity/nub";
 import { defineIdentity } from "@assetmantle/mantlejs/build/transaction/identity/define";

function App() {
  //http://23.88.102.13:1317
  let url = config.testURL;
  const queryIdentitiesControllerObj = new queryIdentities(url);
  const assetMint = new mintAsset(url);
  const identityQuery = new queryIdentities(url);
  const assetDefine = new defineAsset(url);
  const clsQuery = new cls(url);
  const identityNub = new nubIdentity(url);

  async function nub(
    address,
    chain_id,
    mnemonic,
    nubID,
    fee,
    token,
    gas,
    mode,
  ) {
    return new Promise(async function (resolve) {
      let result = await identityNub.nub(address, chain_id, mnemonic, nubID, fee, token, gas, mode, "");
      resolve(result);
    })}

  async function test(){ 
  
  const mnemonic =
  "wage thunder live sense resemble foil apple course spin horse glass mansion midnight laundry acoustic rhythm loan scale talent push green direct brick please";
  
  let randomWallet =  createRandomWallet("");
  let userGivenMnemonic =
    "wage thunder live sense resemble foil apple course spin horse glass mansion midnight laundry acoustic rhythm loan scale talent push green direct brick please";

  let wallet = await createWallet(userGivenMnemonic, "");
  // let createdStore = await createStore(wallet.mnemonic, "123123123");

  // let keyRes = "";
  // if (createdStore.error) {
  //   console.log(createdStore.error);
  // } else {
  //   console.log("Keystore created with name " + wallet.address + ".json");
  //   keyRes = createdStore.Response;
  // }

  // if (createdStore.error) {
  //   console.log("Unable to store Reason: " + createdStore.error);
  // }

  // console.log("Reading keystore...");
  // let mnemonicRestored = await decryptStore(keyRes, "123123123");
  // console.log("mnemonicRestored: ", mnemonicRestored);
  // let results = await queryIdentitiesControllerObj.queryIdentity();
  // let listResponse = await FindInResponse("identities", results, "immutableMetaProperties");
  // let identityID1 = listResponse.classificationID + "|" + listResponse.hashID;
  // results = await queryIdentitiesControllerObj.queryIdentity();
  // let identityID2 = listResponse.classificationID + "|" + listResponse.hashID;
  // console.log(
  //   "nub arguments: ",
  //   wallet.address,
  //   config.chain_id,
  //   mnemonic,
  //   config.nubID,
  //   25,
  //   "stake",
  //   200000,
  //   "block",
  // );
  let result = await (nub(
    wallet.address,
    config.chain_id,
    mnemonic,
    config.nubID,
    0,
    "stake",
    200000,
    "block",
  ));
  console.log("nub function executed");
  let _res = JSON.parse(JSON.stringify(result));
  console.log(_res)
  let check = await checkRawLog(_res.rawLog);
  if (check) {
    console.log("\n\n**TX HASH for nub** :" + _res.transactionHash);
  } else {
    console.log("\n\n**TX failed for nub** :" + _res.rawLog);
  }
  
  // res = await assetDefine.define(
  //   wallet.address,
  //   config.chain_id,
  //   mnemonic,
  //   identityID1,
  //   "ASSET1:S|num1,burn:H|1",
  //   "ASSET2:S|",
  //   "ASSET3:S|num3",
  //   "ASSET4:S|num4",
  //   25,
  //   "stake",
  //   200000,
  //   "block",
  //   "",
  // );
  let results = await clsQuery.queryClassification();
  console.log(results);
  let listResponse = await FindInResponse("classifications", results, "ASSET4");
  let assetClsID = listResponse.chainID + "." + listResponse.hashID;
  console.log(assetClsID);
  let res = await identityDefine.define(
    wallet.address,
    config.chain_id,
    mnemonic,
    clsID,
    "mutableProperties111:S|identity11543",
    "immutableProperties:S|identity22662",
    "mutableMetaProperties:S|identity34167",
    "immutableMetaProperties:S|identity45648",
    25,
    "stake",
    200000,
    "block",
    "",
  );
  check = await checkRawLog(res.rawLog);
  if (check) {
    console.log("\n\n**TX HASH for define identity 1** :" + res.transactionHash);
  } else {
    console.log("\n\n**TX failed for define identity 1** :" + res.rawLog);
  }

  results = awai
  // let res = await assetMint.mint(
  //   wallet.address,
  //   config.chain_id,
  //   mnemonic,
  //   identityID1,
  //   identityID2,
  //   assetClsID,
  //   "ASSET1:S|num1,burn:H|1",
  //   "ASSET2:S|num2",
  //   "ASSET3:S|num3",
  //   "ASSET4:S|num4",
  //   25,
  //   "stake",
  //   200000,
  //   "block",
  //   "",
  // );
  // console.log(res);

// get the queryIdentities controller object to perform the query

  }

  const handleSubmit = async event => {
    event.preventDefault();
    // const IdentityName = event.target.identityname.value;
    // create double hash
    // const hashGenerate = GetMetaHelper.Hash(GetMetaHelper.Hash(IdentityName));
    // build identityID using nub classificationID and the generated hash
    // const identityID = config.nubClassificationID+'|'+hashGenerate;
    // query identities in the chain associated with the particular identityID
    const queryIdentitiesControllerObj = new queryIdentities(url);
    const identitiesPromise = await queryIdentitiesControllerObj.queryIdentity();
    const identity = await queryIdentitiesControllerObj.queryIdentityWithID("-2liw_QnWqaWZUv1QIfaEW__BHc=")
    console.log(identity);}


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
