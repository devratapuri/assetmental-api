import "./App.css";

import config from "@assetmantle/mantlejs/build/config.json";
import { FindInResponse } from "@assetmantle/mantlejs/build/helpers/helper";
import { queryIdentities } from "@assetmantle/mantlejs/build/transaction/identity/query";
import { defineAsset } from "@assetmantle/mantlejs/build/transaction/assets/define";
import { queryAssets } from "@assetmantle/mantlejs/build/transaction/assets/query";

import { mintAsset } from "@assetmantle/mantlejs/build/transaction/assets/mint";
import { cls } from "@assetmantle/mantlejs/build/transaction/classification/query";
import { defineIdentity } from "@assetmantle/mantlejs/build/transaction/identity/define";
import { issueIdentity } from "@assetmantle/mantlejs/build/transaction/identity/issue";
import { nubIdentity } from "@assetmantle/mantlejs/build/transaction/identity/nub";
import { provisionIdentity } from "@assetmantle/mantlejs/build/transaction/identity/provision";
import {
  createRandomWallet,
  createWallet,
} from "@assetmantle/mantlejs/build/utilities/keys";
import base64url from "base64url";
import sha1 from "js-sha1";
import { useState } from "react";
import { queryMeta } from "@assetmantle/mantlejs/build/transaction/meta/query";

function App() {
  let url = config.TENDERMINT_REST_URL;
  const queryIdentitiesControllerObj = new queryIdentities(url);
  const queryAssetsControllerObj = new queryAssets(url);

  const assetMint = new mintAsset(url);
  const assetDefine = new defineAsset(url);
  const clsQuery = new cls(url);
  const identityNub = new nubIdentity(url);
  const identityDefine = new defineIdentity(url);
  const identityIssue = new issueIdentity(url);
  const identityProvision = new provisionIdentity(url);
  const queryMeta1 = new queryMeta(url);

  const [username, setUsername] = useState('');
  const [getasset, setGetasset] = useState();
  const [assetClassificationID, setAssetClassificationID] = useState('');
  const [nubID, setnubID] = useState('');
  const [assetID,setAssetID] = useState('');
  const [nameHashID,setnameHashID] = useState('');
  const [URIHashID,setURIID] = useState('');
  const [CatogaryHashID,setCatogaryHashID]= useState('');

  const [name, setName] = useState('');
  const [uri, setUri] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = event => {
    setUsername(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleName = event => {
    setName(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleassetID = event => {
    setAssetClassificationID(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handlequeryassetID = event => {
    setAssetID(event.target.value);

    console.log('value is:', event.target.value);
  };

  const random = async () => {
    const change = await queryMeta1.queryMetaWithID(`${assetID}`);
    console.log(change);
  }
random();
  // nub classification will always remain constant. This is not to be changed
  const nubClassificationID = "cGn3HMW8M3t5gMDv-wXa9sseHnA=";
  // you can choose to use the same hardcoded mnemonic for all operations. address: mantle1prx5ch3zc79glpxef0l3h7sl5e7z48znu69sr4
  let userGivenMnemonic =
    "bracket oven album lawn funny faint unfold ripple label thunder century become fiber suffer typical candy drill water remind cactus orbit scan spy cook";

  //Immutable properties of the Identity for Defining
  let identityImmutables =
    "traitImmutable266:S|string2948, traitImmutable267:S|";
  let identityMetaImmutables =
    "traitMetaImmutable356:S|string96548, traitMetaImmutable357:S|";
    //Immutable Properties for the Identity for Setting
  let stringIdentityImmutables = "string2949"; // change this value if you are going to re-run issueIdentity() to create a new identity instance
  let stringIdentityMetaImmutables = "string96549"; // change this value if you are going to re-run issueIdentity() to create a new identity instance
  // Mutable properties of the Identity for Defining
  let identityMutables =
    "traitMutableIdentity468:S|string540, traitMutableIdentity469:S|"; // change this for multiple issueIdentities calls ?
  let identityMetaMutables =
    "traitMetaMutableIdentity499:S|string945, traitMetaMutableIdentity500:S|"; // change this for multiple issueIdentities calls
    //Immutable Properties for the Identity for Setting
    let stringIdentityMutables = "string541";
    let stringIdentityMetaMutables = "string946";


  //Immutable properties of the asset for Defining
  let assetImmutables = "burn:H|";
  let assetMetaImmutables = "URI:S|";
  //Immutable Properties for the asset for Setting
  let stringAssetImmutables = "Name of the asset"; // change this value if you are going to re-run mintAsset() to create a new nft
  let stringAssetMetaImmutables = "Link for the image of NFT"; // change this value if you are going to re-run mintAsset() to create a new nft

  // Mutable properties of the asset for Defining
  let assetMutables = "traitMutableasset48:S|string7258";
  let assetMetaMutables = "traitMetaMutableasset499:S|string8448"; // change this for multiple mintAsset calls

 //Immutable Properties for the asset for Setting
  let stringAssetMutables = "string72597259";
  let stringAssetMetaMutables = "string84498449";


  // CHANGE THESE VALUES EVERYTIME YOU EXECUTE defineIdentity(), issueIdentity, defineAsset() or mintAsset. ELSE THE NEXT FUNCTION WILL FAIL.
  // after doing defineIdentity, search in the REST api (/xprt/classifications/classifications/all) for a specific immutable propertyName to find the classification ID of Identity
  let generatedIdentityClassificationID =
    "devnet-mantle-1.IJJrWzU--5VbcvpI5tX-zMrLibM=";
  // after doing issueIdentity, search in the REST api (/xprt/identities/identities/all) for a specific classification ID of identity to find the identity's HashID
  let identityHashID = "L1lCsaHBnr7-PKX7QNA1XIWu7FQ=";
  let generatedIdentity =
    generatedIdentityClassificationID + "|" + identityHashID;
  // after doing defineAsset, search in the REST api (/xprt/classifications/classifications/all) for a specific immutable propertyName to find the classification ID of Asset
  
  // after doing mintAsset, search in the REST api (/xprt/assets/assets/all) for a specific classification ID of asset to find the assets's HashID
  
  let assetHashID = "FDaquiEmcZ1_QNh8Y6Hi99h1RPw=";
  let generatedAsset = assetClassificationID + "|" + assetHashID;

  // routine to generate Identity ID from username
  // first function to generate a hash of username
  function getHash(digest) {
    const hash = sha1.array(digest);
    return base64url.encode(hash) + "=";
  }

  // second function to generate identity ID from username using the hash function above
  function getNubIdFromUsername(username) {
    const generatedHashValue = getHash(getHash(username));
    const identityID =
      config.chain_id + "." + nubClassificationID + "|" + generatedHashValue;
    setnubID(identityID);
    return identityID;
  }

  const handleCreateNubID = async (username) => {
    let wallet = await createWallet(userGivenMnemonic, "");
    console.log("username: ", username);

    let res = await identityNub.nub(
      wallet.address,
      config.chain_id,
      wallet.mnemonic,
      username,
      0,
      "umntl",
      200000,
      "block",
      ""
    );

    console.log("Transaction Response: ", res);
  };

  const handleQueryIdentity = async (identityID) => {
    // const identitiesPromise = await queryIdentitiesControllerObj.queryIdentity();
    console.log("ID to be queried: ", identityID);
    const result = await queryIdentitiesControllerObj.queryIdentityWithID(
      identityID
    );
    console.log("Query Response: ", result);
  };

  const handleDefineIdentity = async (definerIdentity) => {
    console.log(
      "ID of the definer who is defining this new Identity: ",
      definerIdentity
    );
    let wallet = await createWallet(userGivenMnemonic, "");
    let res = await identityDefine.define(
      wallet.address,
      config.chain_id,
      userGivenMnemonic,
      definerIdentity,
      identityMutables,
      identityImmutables,
      identityMetaMutables,
      identityMetaImmutables,
      25,
      "umntl",
      200000,
      "block",
      ""
    );

    console.log("Transaction Response: ", res);
  };

  const handleQueryClassification = async (classificationID) => {
    console.log(
      "classification ID to be queried for all details: ",
      classificationID
    );
    let results = await clsQuery.queryClassificationWithID(classificationID);
    console.log("Query Response: ", results);
  };

  const handleIssueIdentity = async (generatedIdentityClassificationID) => {
    console.log(
      "Classification ID of Identity Definition: ",
      generatedIdentityClassificationID
    );
    let wallet = await createWallet(userGivenMnemonic, "");
    let fromID = getNubIdFromUsername(username);
    let res = await identityIssue.issue(
      wallet.address,
      config.chain_id,
      userGivenMnemonic,
      config.testAccountAddress,
      fromID,
      generatedIdentityClassificationID,
      identityMutables + stringIdentityMutables,
      identityImmutables + stringIdentityImmutables,
      identityMetaMutables + stringIdentityMetaMutables,
      identityMetaImmutables + stringIdentityMetaImmutables,
      25,
      "umntl",
      200000,
      "block",
      ""
    );

    console.log("Transaction Response: ", res);
    alert("Transaction Response: ", res.txHash);
  };



  const handleDefineAsset = async (definerIdentity) => {
    let wallet = await createWallet(userGivenMnemonic, "");
    console.log("Identity ID of Definer: ", definerIdentity);

    // execute define asset transaction
    let res = await assetDefine.define(
      wallet.address,
      config.chain_id,
      userGivenMnemonic,
      definerIdentity,
      assetMutables,
      assetImmutables,
      assetMetaMutables,
      `URI:S|,Name:S|,description:S|,category:S|`,
      1,
      "umntl",
      "400000",
      "block",
      ""
    );

    console.log("Transaction Response: ", res);
    alert(`TxHash ${res.txhash}`);

    /* let listResponse = await FindInResponse(
      "classifications",
      results,
      "ASSET4"
    );
    console.log(results); */
  };

  const handleMintAsset = async (assetClassificationID) => {
    console.log(
      "Classification ID of Asset Definition: ",
      assetClassificationID
    );
    let wallet = await createWallet(userGivenMnemonic, "");
    let identityID1 = getNubIdFromUsername(username);

    let res = await assetMint.mint(
      wallet.address,
      config.chain_id,
      userGivenMnemonic,
      identityID1,// From ID
      identityID1,// To id
      assetClassificationID,
      assetMutables + stringAssetMutables,
      assetImmutables + stringAssetImmutables,
      assetMetaMutables + stringAssetMetaMutables,
      assetMetaImmutables + stringAssetMetaImmutables,
      1,
      "umntl",
      "400000",
      "block",
      ""
    );

    console.log("Transaction Response: ", res.txhash);
    alert(`TxHash ${res.txhash}`);
  };

  const handleQueryAsset = async (assetID) => {
    // const identitiesPromise = await queryIdentitiesControllerObj.queryIdentity();
    console.log("ID of Asset to be queried: ", assetID);
    const result = await queryAssetsControllerObj.queryAssetWithID(assetID);

    let _res = JSON.parse(result);
    setGetasset(_res.result.value.assets.value.id.value.idString)
    console.log("Query Response: ", _res.result.value.assets.value.id.value.idString);
  };

  const handleProvisionIdentity = async (identityToProvsion) => {
    let wallet = await createWallet(userGivenMnemonic, "");
    let newWallet = await createRandomWallet("");
    console.log("New wallet address: ", newWallet.address);
    console.log(
      "Identity ID to be provisioning new address to: ",
      identityToProvsion
    );

    let res = await identityProvision.provision(
      wallet.address,
      config.chain_id,
      userGivenMnemonic,
      identityToProvsion,
      newWallet.address,
      0,
      "umntl",
      200000,
      "block",
      ""
    );

    console.log("Transaction Response: ", res);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" class="form-control" placeholder="Enter UserName" name="text" onChange={handleChange} value={username} />
        <button className="button" onClick={() => handleCreateNubID(username)}>NubId</button>
        <br></br>
        <button className="button"
          onClick={() => handleQueryIdentity(getNubIdFromUsername(username))}
        >
          Query Nub Identity
        </button>
        <br></br>
        <div>
          {nubID}
        </div>
        {/* <button className="button"
          onClick={() => handleDefineIdentity(getNubIdFromUsername(username))}
        >
          Define Id
        </button>
        <br></br> */}
        {/* <button className="button"
          onClick={() =>
            handleQueryClassification(generatedIdentityClassificationID)
          }
        >
          Query Classification of Identity
        </button>
        <br></br>
        <button className="button"
          onClick={() => handleIssueIdentity(generatedIdentityClassificationID)}
        >
          Issue Id
        </button>
        <br></br>
        <button className="button" onClick={() => handleQueryIdentity(generatedIdentity)}>
          Query Identity
        </button> */}
        <br></br>
        <button className="button"
          onClick={() => handleDefineAsset(getNubIdFromUsername(username))}
        >
          Define Asset
        </button>
        <br></br>
        <input type="text" class="form-control" placeholder="Enter classificationID" name="text" onChange={handleassetID} value={assetClassificationID} />
        <button className="button"
          onClick={() =>
            handleQueryClassification(assetClassificationID)
          }
        >
          Query Classification of Asset
        </button>
        <br></br>
        <button className="button" onClick={() => handleMintAsset(assetClassificationID)}>
          Mint Asset
        </button>
        <br></br>
        <input type="text" class="form-control" placeholder="Enter Asset ID" name="text" onChange={handlequeryassetID} value={assetID} />
        <button className="button" onClick={() => handleQueryAsset(generatedAsset)}>
          Query Asset
        </button>
        <div>
          {getasset}
        </div>
        <br></br>
        {/* <button
          onClick={() =>
            handleProvisionIdentity(getNubIdFromUsername(username))
          }
        >
          Provision Id
        </button> */}
        <br></br>
      </header>
    </div>
  );
}

export default App;
