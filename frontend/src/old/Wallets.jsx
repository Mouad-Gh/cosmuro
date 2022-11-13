import { useWallet } from "@terra-money/wallet-provider";
import { useaddWallet } from "../hooks/useAddWallet";


export const useTerra = async ()=>{
    const { addWallet } = useaddWallet();
    const {
        status,
        network,
        wallets,
        availableConnectTypes,
        connect,
        disconnect,
      } = useWallet();

      //
    const connecterra = async()=>{
        connect(availableConnectTypes[0]);      
        if(status === WalletStatus.WALLET_CONNECTED){
            //call the connect hook
            
            console.log('before',wallets[0]["terraAddress"],wallet,token)
            await addWallet("terra", wallets[0]["terraAddress"]);
            console.log('after',wallets[0]["terraAddress"],wallet,token)
            
        }
    }

    return { connecterra }
    
        

}

export const useStargazeCnx = async ()=>{
    const { addWallet } = useaddWallet();
    if (!window.keplr) {
        alert("Please install keplr extension");
    } else {
        const chainId = "stargaze-1";

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

        await addWallet("stargaze", accounts[0].address);
    
        
    }
}
export const useJunoCnx = async ()=>{
    const { addWallet } = useaddWallet();
    if (!window.keplr) {
        alert("Please install keplr extension");
    } else {
        const chainId = "juno-1";

        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether to allow access if they haven't visited this website.
        // Also, it will request that the user unlock the wallet if the wallet is locked.
        wd =await window.keplr.enable(chainId);
        console.log(wd)
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
    
        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const accounts = await offlineSigner.getAccounts();

        await addWallet("juno", accounts[0].address);
    
        
    }
}