import "./App.css";

import { queryIdentities } from "@assetmantle/mantlejs/build/transaction/identity/query";
import config from "@assetmantle/mantlejs/build/config.json";
import {
  checkRawLog,
  FindInResponse,
} from "@assetmantle/mantlejs/build/helpers/helper";
//  import queryIdentities from "./querry";
import { mintAsset } from "@assetmantle/mantlejs/build/transaction/assets/mint";
import {
  createRandomWallet,
  createStore,
  createWallet,
  decryptStore,
} from "@assetmantle/mantlejs/build/utilities/keys";
import { cls } from "@assetmantle/mantlejs/build/transaction/classification/query";
import { defineAsset } from "@assetmantle/mantlejs/build/transaction/assets/define";
import { nubIdentity } from "@assetmantle/mantlejs/build/transaction/identity/nub";
import { defineIdentity } from "@assetmantle/mantlejs/build/transaction/identity/define";
import { issueIdentity } from "@assetmantle/mantlejs/build/transaction/identity/issue";
import { provisionIdentity } from "@assetmantle/mantlejs/build/transaction/identity/provision";
import base64 from "base-64";
import utf8 from "utf8";
import sha1 from "js-sha1";
import base64url from "base64url";

function App() {
  //http://23.88.102.13:1317
  let url = config.testURL;
  //console.log(url)
  const queryIdentitiesControllerObj = new queryIdentities(url);
  const assetMint = new mintAsset(url);
  const identityQuery = new queryIdentities(url);
  const assetDefine = new defineAsset(url);
  const clsQuery = new cls(url);
  const identityNub = new nubIdentity(url);
  const identityDefine = new defineIdentity(url);
  const identityIssue = new issueIdentity(url);
  const identityProvision = new provisionIdentity(url);

  const mnemonic =
    "wage thunder live sense resemble foil apple course spin horse glass mansion midnight laundry acoustic rhythm loan scale talent push green direct brick please";

  // updated values
  let userGivenMnemonic =
    "moral neither potato earn solar lamp calm insane blouse blush nose field";
  let username ="username2";
  let identityImmutables = "immutablePropertiesa836:S|identity22847";
  let assetImmutables = "ASSET101:S|num23";

  // nub classification will always remain constant. This is not to be changed
  const nubClassificationID = "cGn3HMW8M3t5gMDv-wXa9sseHnA=";

  window.onload = async () => {
    if (!window.keplr) {
      alert("Please install keplr extension");
    } else {
      const chainId = "cosmoshub-4";

      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether to allow access if they haven't visited this website.
      // Also, it will request that the user unlock the wallet if the wallet is locked.
      await window.keplr.enable(chainId);

      const offlineSigner = window.keplr.getOfflineSigner(chainId);

      // You can get the address/public keys by `getAccounts` method.
      // It can return the array of address/public key.
      // But, currently, Keplr extension manages only one address/public key pair.
      // XXX: This line is needed to set the sender address for SigningCosmosClient.
      const accounts = await offlineSigner.getAccounts();

      // Initialize the gaia api with the offline signer that is injected by Keplr extension.
      // const cosmJS = new SigningCosmosClient(
      //     "https://lcd-cosmoshub.keplr.app",
      //     accounts[0].address,
      //     offlineSigner,
      // );
    }
  };

  function getHash(digest) {
    const hash = sha1.array(digest);
    return base64url.encode(hash) + "=";
  }

  function getIdFromUsername(username) {
    const generatedHashValue = getHash(getHash(username));
    const identityID =
      config.chain_id + "." + nubClassificationID + "|" + generatedHashValue;
    console.log("generated Identity ID: ", identityID);
    return identityID;
  }

  const query = async () => {
    // const identitiesPromise = await queryIdentitiesControllerObj.queryIdentity();
    console.log("nubID string: ", username);
    const identity = await queryIdentitiesControllerObj.queryIdentityWithID(
      getIdFromUsername(username)
    );
    console.log(identity);
  };

  const nubid = async () => {
    let wallet = await createWallet(userGivenMnemonic, "");
    console.log("wallet: ", wallet);

    let result = await identityNub.nub(
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

    console.log("nub function executed");
    console.log("result: ", result);
    let _res = JSON.parse(JSON.stringify(result));
    console.log("_res: ", _res);
    // let check = await checkRawLog(_res.rawLog);
    // console.log("checkrawlog: ", check);
    //console.log(check);
    // if (check) {
    //   console.log("\n\n**TX HASH for nub** :" + _res.transactionHash);
    // } else {
    //   console.log("\n\n**TX failed for nub** :" + _res.rawLog);
    // }
  };

  const defineId = async () => {
    let wallet = await createWallet(userGivenMnemonic, "");

    /* let results = await identityQuery.queryIdentity();
    console.log("results: ", results);
    let listResponse = await FindInResponse("identities", results, username);
    let clsID = listResponse.classificationID + "|" + listResponse.hashID;
    console.log("clsid" + "= " + clsID); */

    let clsID = getIdFromUsername(username);

    let res = await identityDefine.define(
      wallet.address,
      config.chain_id,
      userGivenMnemonic,
      clsID,
      "mutableProperties111:S|identity11543",
      identityImmutables,
      "mutableMetaProperties:S|identity34167",
      "immutableMetaProperties:S|identity45648",
      25,
      "umntl",
      200000,
      "sync",
      ""
    );

    let check = await checkRawLog(res.rawLog);
    if (check) {
      console.log(
        "\n\n**TX HASH for define identity 2** :" + res.transactionHash
      );
    } else {
      console.log("\n\n**TX failed for define identity 2** :" + res.rawLog);
    }

    return clsID;
  };

  const issueId = async () => {
    let wallet = await createWallet(userGivenMnemonic, "");

    let results = await clsQuery.queryClassificationWithID(
      getIdFromUsername(username)
    );
    console.log(results);
    /* 
    let listResponse = await FindInResponse(
      "classifications",
      results,
      "immutableMetaProperties"
    );
    console.log(listResponse + "kuch");
    let classificationID = listResponse.chainID + "." + listResponse.hashID;
    console.log(classificationID);

    let res = await identityIssue.issue(
      wallet.address,
      config.chain_id,
      mnemonic,
      config.testAccountAddress,
      clsID,
      classificationID,
      "mutableProperties111:S|identity11543",
      "immutableProperties:S|identity22662",
      "mutableMetaProperties:S|identity34167",
      "immutableMetaProperties:S|identity45648",
      25,
      "umntl",
      200000,
      "block",
      ""
    ); */

    // console.log(res);
  };

  const provisionId1 = async () => {
    let identityID1 =
      "devnet-mantle-1.cGn3HMW8M3t5gMDv-wXa9sseHnA=|aAUYDVGMcWoh2eYUIoya1HsbOgM=";
    const mnemonic1 =
      "address museum grab dove nominee palace hamster segment wrist light also modify";
    let randomWallet = await createRandomWallet("");
    console.log(randomWallet.address);
    console.log(randomWallet.mnemonic);

    let res = await identityProvision.provision(
      "mantle16qczacumv2dkkx252xqj4fsfxlyev3s3wu5939",
      config.chain_id,
      mnemonic1,
      identityID1,
      randomWallet.address,
      0,
      "umntl",
      200000,
      "block",
      ""
    );

    console.log(res);
    return randomWallet;
  };

  const defineAsset1 = async () => {
    // let wallet = await createWallet(userGivenMnemonic, "");
    // let results = await identityQuery.queryIdentity();
    // console.log(results);
    // let listResponse = await FindInResponse("identities", results, "immutableMetaProperties");
    // let identityID1 = listResponse.classificationID + "|" + listResponse.hashID;

    const name = "Avatar";
    const name64 = utf8.encode(name);
    const imageURL =
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg";
    const imageURL64 = utf8.encode(imageURL);
    const desc = "3D avatar";
    const desc64 = utf8.encode(desc);
    const propertiesArray = ["Kuchbhi"];
    const propertiesArray64 = utf8.encode(propertiesArray[0]);

    let identityID1 =
      "devnet-mantle-1.cGn3HMW8M3t5gMDv-wXa9sseHnA=|nvW7zJXoux-ScWNYsXh8iC8SkLc=";
    console.log(identityID1);
    const mnemonic1 =
      "moral neither potato earn solar lamp calm insane blouse blush nose field";

    let res = await assetDefine.define(
      "mantle1607j9pgz6ydx468qlusvgcllnrxx3sll0ahhwe",
      config.chain_id,
      mnemonic1,
      identityID1,
      "ASSET100:S|num1,burn:H|1",
      assetImmutables,
      "ASSET102:S|num333",
      "ASSET103:S|num46",
      1,
      "umntl",
      "400000",
      "block",
      ""
    );

    console.log(res);

    // check = await checkRawLog(res.rawLog);
    // if (check) {
    //   console.log("\n\n**TX HASH for define assets** :" + res.transactionHash);
    // } else {
    //   console.log("\n\n**TX failed for define assets** :" + res.rawLog);
    // }

    let results = await clsQuery.queryClassification();
    console.log(results);
    let listResponse = await FindInResponse(
      "classifications",
      results,
      "ASSET4"
    );
    let assetClsID = listResponse.chainID + "." + listResponse.hashID;
    console.log(assetClsID);
  };

  const mintAsset1 = async () => {
    let assetClsID = "devnet-mantle-1.JaCsWOJ6pAiublJ8KUb8GxPJcmA=";
    //console.log(assetClsID)
    let identityID1 =
      "devnet-mantle-1.cGn3HMW8M3t5gMDv-wXa9sseHnA=|nvW7zJXoux-ScWNYsXh8iC8SkLc=";
    // console.log(identityID1);

    const name = "Mirage";
    const name64 = utf8.encode(name);
    const imageURL =
      "https://149695847.v2.pressablecdn.com/wp-content/uploads/2022/02/Met-s-b_11zon.jpg";
    const imageURL64 = utf8.encode(imageURL);
    const desc = "Nothing";
    const desc64 = utf8.encode(desc);
    const propertiesArray = ["Anything"];
    const propertiesArray64 = utf8.encode(propertiesArray[0]);
    const mnemonic1 =
      "moral neither potato earn solar lamp calm insane blouse blush nose field";
    // let waddress = await provisionId1();

    let res = await assetMint.mint(
      "mantle1607j9pgz6ydx468qlusvgcllnrxx3sll0ahhwe",
      config.chain_id,
      mnemonic1,
      identityID1,
      identityID1,
      assetClsID,
      "burn:H|1,lock:H|1",
      "color:S|Blue",
      `propertyName:S|${base64.encode(
        JSON.stringify(propertiesArray64)
      )},type:S|asset`,
      `URI:S|${base64.encode(imageURL64)},name:S|${base64.encode(
        name64
      )},description:S|${base64.encode(desc64)},category:S|ZCB0cw`,
      0,
      "umntl",
      "400000",
      "block",
      "sync"
    );

    // {
    //   type: "/xprt/assets/mint/request",
    //   value: {
    //     baseReq: {
    //       from: walletId,
    //       chain_id: "devnet-mantle-1",
    //       memo: "sync",
    //       fees: [{ amount: "0", denom: "umntl" }],
    //       gas: "400000",
    //     },
    //     toID: nubID,
    //     fromID: nubID,
    //     classificationID: "devnet-mantle-1.j0Uuu1ZA7krYEQ036oQVnzmkQVs=",
    //     mutableProperties: "burn:H|1,lock:H|1",
    //     immutableProperties: "color:S|Blue",
    //     mutableMetaProperties: `propertyName:S|${getBase64(
    //       JSON.stringify(propertiesArray)
    //     )},type:S|asset`,
    //     immutableMetaProperties: `URI:S|${getBase64(imageURL)},name:S|${getBase64(
    //       name
    //     )},description:S|${getBase64(desc)},category:S|ZCB0cw`,
    //   },
    // };

    console.log(res);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={query}>Query</button>
        <br></br>
        <button onClick={nubid}>NubId</button>
        <br></br>
        <button onClick={defineId}>Define Id</button>
        <br></br>
        <button onClick={issueId}>Issue Id</button>
        <br></br>
        <button onClick={defineAsset1}>Define Asset</button>
        <br></br>
        <button onClick={provisionId1}>Provision Id</button>
        <br></br>
        <button onClick={mintAsset1}>Mint Asset</button>
        <br></br>
      </header>
    </div>
  );
}

export default App;
