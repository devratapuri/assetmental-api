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

  // HARDCODED VALUES
  // nub classification will always remain constant. This is not to be changed
  const nubClassificationID = "cGn3HMW8M3t5gMDv-wXa9sseHnA=";
  // you can choose to use the same hardcoded mnemonic for all operations. address: mantle1prx5ch3zc79glpxef0l3h7sl5e7z48znu69sr4
  let userGivenMnemonic =
    "bracket oven album lawn funny faint unfold ripple label thunder century become fiber suffer typical candy drill water remind cactus orbit scan spy cook";

    const name = "Avatar";
    //   const name64 = utf8.encode(name);
      const imageURL =
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg";
    //   const imageURL64 = utf8.encode(imageURL);
      const desc = "3D avatar";
    //   const desc64 = utf8.encode(desc);
      const propertiesArray = ["Kuchbhi"];
    //   const propertiesArray64 = utf8.encode(propertiesArray[0]);

  // set values (change them if restarting all tests from the beginning)
  let username = "randomeusername4";
  let identityImmutables =
    "traitImmutable000:S|string2948, traitImmutable111:S|";
  let identityMetaImmutables =
    "traitMetaImmutable222:S|string96548, traitMetaImmutable333:S|";
  let assetImmutables = "color:S|Blue";
  let assetMetaImmutables =
  `URI:S|${(imageURL)},name:S|${(
          name
        )},description:S|${(desc)},category:S|ZCB0cw`;

  let stringIdentityImmutables = "string0000"; // change this value if you are going to re-run issueIdentity() to create a new identity instance
  let stringIdentityMetaImmutables = "string1111"; // change this value if you are going to re-run issueIdentity() to create a new identity instance
  let stringAssetImmutables = "Blue"; // change this value if you are going to re-run mintAsset() to create a new nft
  let stringAssetMetaImmutables = "Luffy"; // change this value if you are going to re-run mintAsset() to create a new nft

  // static values (no need to change them for every iteration of test)
  let identityMutables =
    "traitMutableIdentity468:S|string540, traitMutableIdentity469:S|"; // change this for multiple issueIdentities calls ?
  let identityMetaMutables =
    "traitMetaMutableIdentity499:S|string945, traitMetaMutableIdentity500:S|"; // change this for multiple issueIdentities calls
  let assetMutables =
    "burn:H|1,lock:H|1";
  let assetMetaMutables =
  `propertyName:S|${(
          JSON.stringify(propertiesArray)
        )},type:S|asset`;    // change this for multiple mintAsset calls

  let stringIdentityMutables = "string541";
  let stringIdentityMetaMutables = "string946";
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
  let generatedAssetClassificationID =
    "devnet-mantle-1.ihb0HiZA3EZTfuExuyXQ4bq9SCM=";
  // after doing mintAsset, search in the REST api (/xprt/assets/assets/all) for a specific classification ID of asset to find the assets's HashID
  let assetHashID = "Y5jpGkkgMykKIjcFZVXnbdl1abQ=";
  let generatedAsset = generatedAssetClassificationID + "|" + assetHashID;

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
      assetMetaImmutables,
      1,
      "umntl",
      "400000",
      "block",
      ""
    );

    // (
    //     "mantle1607j9pgz6ydx468qlusvgcllnrxx3sll0ahhwe",
    //     config.chain_id,
    //     mnemonic1,
    //     identityID1,
    //     identityID1,
    //     assetClsID,
    //     "burn:H|1,lock:H|1",
    //     "color:S|Blue",
    //     `propertyName:S|${base64.encode(
    //       JSON.stringify(propertiesArray64)
    //     )},type:S|asset`,
    //     `URI:S|${base64.encode(imageURL64)},name:S|${base64.encode(
    //       name64
    //     )},description:S|${base64.encode(desc64)},category:S|ZCB0cw`,
    //     0,
    //     "umntl",
    //     "400000",
    //     "block",
    //     "sync"
    //   )

    console.log("Transaction Response: ", res);

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
      identityID1,
      identityID1,
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

    console.log("Transaction Response: ", res);
  };

  const handleQueryAsset = async (assetID) => {
    // const identitiesPromise = await queryIdentitiesControllerObj.queryIdentity();
    console.log("ID of Asset to be queried: ", assetID);
    const result = await queryAssetsControllerObj.queryAssetWithID(assetID);
    console.log("Query Response: ", result);
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
        <button onClick={() => handleCreateNubID(username)}>NubId</button>
        <br></br>
        <button
          onClick={() => handleQueryIdentity(getNubIdFromUsername(username))}
        >
          Query Nub Identity
        </button>
        <br></br>
        <button
          onClick={() => handleDefineIdentity(getNubIdFromUsername(username))}
        >
          Define Id
        </button>
        <br></br>
        <button
          onClick={() =>
            handleQueryClassification(generatedIdentityClassificationID)
          }
        >
          Query Classification of Identity
        </button>
        <br></br>
        <button
          onClick={() => handleIssueIdentity(generatedIdentityClassificationID)}
        >
          Issue Id
        </button>
        <br></br>
        <button onClick={() => handleQueryIdentity(generatedIdentity)}>
          Query Identity
        </button>
        <br></br>
        <button
          onClick={() => handleDefineAsset(getNubIdFromUsername(username))}
        >
          Define Asset
        </button>
        <br></br>
        <button
          onClick={() =>
            handleQueryClassification(generatedAssetClassificationID)
          }
        >
          Query Classification of Asset
        </button>
        <br></br>
        <button onClick={() => handleMintAsset(generatedAssetClassificationID)}>
          Mint Asset
        </button>
        <br></br>
        <button onClick={() => handleQueryAsset(generatedAsset)}>
          Query Asset
        </button>
        <br></br>
        <button
          onClick={() =>
            handleProvisionIdentity(getNubIdFromUsername(username))
          }
        >
          Provision Id
        </button>
        <br></br>
      </header>
    </div>
  );
}

export default App;
