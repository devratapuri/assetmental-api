import { AssetMantle
 } from "@assetmantle/mantlejs/build/utilities/mantleJS";
 import Request from "request"; 
import * as config from "@assetmantle/mantlejs/build/config.json";



 export default class queryIdentities extends AssetMantle{

    
    queryIdentities= async ()  => {
        let path = this.path;
        let option = {
            method: "GET",
            url: path+config.queryIdentityPath,
            headers:{}
        };
        return new Promise(function (resolve,reject){
            Request(option, async function () {
               if (error) {
                   reject(error);
               }
               let result = JSON.parse(res.body);
               let list = result.result.value.identies.value.list;
               resolve(list);
           });
       }).catch(function (error){
           console.log("promise rejected: ",error);
           return error;
       });
    };

   
 }