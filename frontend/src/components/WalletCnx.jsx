import { useEffect, useState , useRef } from "react";
import { useWallet, WalletStatus,useConnectedWallet } from "@terra-money/wallet-provider";

import { useAuthContext } from "../hooks/useAuthContext";
import { useDisconnectWallet } from "../hooks/useDisconnectWallet";
import ModalConnection from "./ModalConnection";
import { useAddWallet } from "../hooks/useAddWallet";

const WalletCnx = () => {

  //call the isconnecting
  const { isLoading } = useAddWallet();
    console.log(isLoading)
    const { wallet, token } = useAuthContext();
    //
    const {disconnectWallet} = useDisconnectWallet();


    const [show, setshow] = useState(false);
    //const [walletAdress, setWalletAdress] = useState(null);

    const ref = useRef(null);

    //open/close Modal
    const [open, setOpen] =useState(false);

    
    //click outside
    useEffect(() => {
      const handleClickOutside = (event)=>{
        if (ref.current && !ref.current.contains(event.target)) {
            setshow(false);
          }
      }
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, [show]);
    
    
    const {
        status,
        network,
        wallets,
        availableConnectTypes,
        connect,
        disconnect,
      } = useWallet();

    const connectClick =  ()=>{
        
        setOpen(true);
        console.log(open)
        
        
    }
    const disconnectClick = ()=>{
        disconnect();
        setshow(false);
        disconnectWallet();
    }

    //to chose the blockchain logo svg to render : Terra station / Keplr
    const Blockchain = ()=>  {
        if(wallet.type.toLowerCase()==="terra"){
            return (<svg className="h-6" xmlns="http://www.w3.org/2000/svg" x="0" y="0" enableBackground="new 0 0 1172 886"  version="1.1" viewBox="0 0 1172 886" xmlSpace="preserve" >
                        <path fill="#2845AD" d="M461.1 119.9c38.9-16 81.2-21.2 122.9-22.5 62.8.8 127.1 8.8 184.4 35.8 45 20.8 82.5 55.1 112.1 94.3-9.3-6.8-14.6-17.8-22.9-25.7-15.2-14.5-28.8-31.9-48.9-39.8-19.8-6.8-41.1-8.5-61.9-7.5-52.1 3.7-102.9 17.7-152 35.2-53.9 21.2-108.1 47.2-148.3 90.1-8 8-12.7 18.6-20.5 26.7-18.4-12.5-36.3-27.4-47.2-47.1-.5-1-1.6-3.1-2.1-4.2 33.8-15.8 66.7-35.2 92.6-62.4 13.4-14.5 25.9-34.8 19-55.1-4.1-11.7-17.5-13.2-27.2-17.8m144.4 405.9c50.5 18.6 101.5 35.8 153.2 50.7 45.3 12.3 91.6 24.3 138.8 24-4.9 11.9-10.7 23.4-17.3 34.4a541.51 541.51 0 00-118.7 54.8c-22.8 14.9-46 31.5-59.4 55.8-5.4 9.5-5.5 20.7-2.6 30.9-.6.7-1.8 2-2.3 2.7-16.2 4.2-33.1 13.2-50 6.7-28.3-9.1-51.6-29.1-71.1-50.8-23.8-28.2-43.3-62.5-45.7-100-.7-35.3 21.3-66.1 47.1-88.1 8.8-7.6 18.5-14.3 28-21.1z"></path>
                        <path fill="#5494F8" d="M429.7 122c10.3-2.5 20.9-1.1 31.4-2 9.7 4.6 23.1 6.1 27.2 17.7 6.8 20.3-5.6 40.6-19 55.1-25.9 27.2-58.8 46.6-92.6 62.4.5 1 1.5 3.1 2.1 4.2-3.9-2.7-8.7-1.2-12.6.6-25.7 11.5-52.5 20.5-80 27-10.6 2.2-21.3 4.5-32.2 3.3 0-6.3 4.4-11.3 7-16.7 26-47.1 62-88 105.4-119.9 19.2-13.8 39.4-28.3 63.3-31.7m165.1 67.7c49-17.5 99.8-31.5 152-35.2 20.8-1 42.1.7 61.9 7.5 20.1 8 33.7 25.4 48.9 39.8 8.3 7.9 13.6 19 22.9 25.7 4.8 2.4 6.5 8.4 9.9 12.4 69.4 98.2 85.9 231.2 42.9 343.5-4.2 15-23 15.6-35.8 17.1-47.3.3-93.5-11.7-138.8-24-51.7-14.9-102.7-32.1-153.2-50.7-47.7-18.8-94.1-42.1-134.1-74.5-25-21.4-48.2-48.2-54.5-81.4-4.2-17.3-1.6-35.5 4.9-51.8 1.6-3.8 4.2-7.4 4.2-11.6 7.9-8.1 12.5-18.7 20.5-26.7 40.2-42.9 94.4-68.9 148.3-90.1M237.4 325.5l2 .8c15 18.3 30.3 36.5 45.4 54.6 31.8 36.4 59 76.4 84.5 117.4 35.7 55 67.7 115.3 74.2 181.5.6 35.7.8 71.7-5 107.1-10.3 2.6-20.5-4-29.7-8-68.7-37-124.8-96.6-158.3-167.2-42.1-88.5-47.1-194.1-13.1-286.2m642.8 309.4c9.1-2.4 18.2-6 27.8-5.6 2.6 6.6-2.4 12.2-5.5 17.6-30.2 48.8-71.4 90.8-120.3 120.9-16.4 10.3-33.9 21.7-54 20.7-9.6.7-18.9-3.4-26-9.7-1.2.1-3.8.3-5 .4.6-.7 1.8-2 2.3-2.7-2.8-10.2-2.7-21.5 2.6-30.9 13.4-24.3 36.6-40.9 59.4-55.8 37.2-23.1 77.1-41.5 118.7-54.9z"></path>
                        <path fill="none" d="M186 43H986V843H186z"></path>
                    </svg>)
        }
        return (<svg  xmlns="http://www.w3.org/2000/svg" className="h-6  pr-1" viewBox="0 0 256 256" >
            <defs>
              <linearGradient id="linearGradient-1"  x1="7.272%" x2="93.886%" y1="5.601%" y2="92.985%" >
                <stop offset="0%" stopColor="#3BA4CE"></stop>
                <stop offset="52.085%" stopColor="#7868C8"></stop>
                <stop offset="100%" stopColor="#B54BC1"></stop>
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g>
                <rect width="256"  height="256" x="0" y="0" fill="url(#linearGradient-1)" rx="64" ></rect>
                <path fill="#FFF" d="M67 54.75L95.4172414 54.75 95.4172414 119.496204 152.675862 54.75 190 54.75 123.18131 127.75 190 200.75 152.675862 200.75 95.4172414 136.003796 95.4172414 200.75 67 200.75z"></path>
              </g>
            </g>
          </svg>);
    } 

    return ( <div className="absolute top-1 right-[50px] md:relative md:inset-0">
        
        { (!wallet) ? 
            (<button className="select-none  flex items-center px-2 py-1 rounded-md border-solid border-violet md:border-2  " onClick={connectClick}>
            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 md:w-5 h-8 md:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>
                <span className="hidden md:block whitespace-nowrap  ml-1">{isLoading? 'isConnecting...' : "Connect Wallet" }</span>
            
            </button>)
            : 
            (<button className="select-none  flex items-center px-2 py-1 rounded-md border-solid border-violet md:border-2  " onClick={()=>setshow(true)}>
            
                <Blockchain />
                <span className="hidden md:block whitespace-nowrap  ml-1">{`${wallet.adress.substring(0, 5)}***${wallet.adress.substring(wallet.adress.length-4, wallet.adress.length-1)}`}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="10" viewBox="0 0 256 256" > <path fill="none" d="M0 0H256V256H0z"></path> <path d="M215.4 92.9A8 8 0 00208 88H48a8 8 0 00-7.4 4.9 8.4 8.4 0 001.7 8.8l80 80a8.2 8.2 0 0011.4 0l80-80a8.4 8.4 0 001.7-8.8z"></path></svg>
            </button>)
            
        }
        { show && <div ref={ref} className="absolute z-50 right-0 top-0 opacity-100 popIn rounded-md px-2 py-1 bg-[#09061A] w-72 md:w-80 min-h-fit">
            <ul className="">
                <div className="inline-flex items-center font-azonix">
                    <Blockchain />
                    <div className="flex flex-col ">
                        <span className="text-sm">wallet profile</span>
                        <span className="text-[#e5e5e5] font-sans text-xs">{`${wallet.adress.substring(0, 5)}***${wallet.adress.substring(wallet.adress.length-4, wallet.adress.length-1)}`}</span>
                    </div>
                </div>
                <hr className="text-[#e5e5e5]" />
                <div className="mt-3 inline-flex items-center gap-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
                    <button className="" onClick={disconnectClick}>Diconnect</button>
                    
                </div>
            </ul>
        </div> }
        <ModalConnection open={open} close={setOpen} />
    </div> );
}
 
export default WalletCnx;